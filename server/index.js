import crypto from "node:crypto";
import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { db, getLocalUser } from "./db.js";
import { decrypt, encrypt } from "./crypto.js";
import {
  authorizationUrl,
  createRequestToken,
  exchangeAccessToken,
  getIdentity
} from "./discogs.js";
import {
  hydrateRelease,
  serializeRelease,
  syncCollection,
  tracksForSide
} from "./collection.js";

const app = Fastify({ logger: true });
const appOrigin = process.env.APP_ORIGIN || "http://localhost:5173";
const apiOrigin = process.env.API_ORIGIN || "http://localhost:3001";

await app.register(cors, { origin: appOrigin });

function nextSyncAt(frequency) {
  const next = new Date();
  if (frequency === "daily") next.setDate(next.getDate() + 1);
  if (frequency === "weekly") next.setDate(next.getDate() + 7);
  if (frequency === "monthly") next.setMonth(next.getMonth() + 1);
  return next;
}

function requireFrequency(frequency) {
  if (!["daily", "weekly", "monthly"].includes(frequency)) {
    const error = new Error("frequency must be daily, weekly, or monthly.");
    error.statusCode = 400;
    throw error;
  }
}

async function localUser() {
  // This is a single-user development identity. Replace it with session auth
  // before exposing the application to more than one person.
  return getLocalUser();
}

async function connectionFor(userId) {
  const result = await db.query(
    "SELECT discogs_username FROM discogs_connections WHERE user_id = $1",
    [userId]
  );
  return result.rows[0] || null;
}

app.get("/api/health", async () => {
  await db.query("SELECT 1");
  return { ok: true };
});

app.get("/api/integrations/discogs", async () => {
  const user = await localUser();
  const connection = await connectionFor(user.id);
  return {
    connected: Boolean(connection),
    username: connection?.discogs_username || null
  };
});

app.get("/api/integrations/discogs/start", async (_request, reply) => {
  const user = await localUser();
  const state = crypto.randomBytes(24).toString("base64url");
  const callbackUrl = `${apiOrigin}/api/integrations/discogs/callback?state=${state}`;
  const requestToken = await createRequestToken(callbackUrl);

  if (!requestToken.oauth_token || !requestToken.oauth_token_secret) {
    throw new Error("Discogs did not return an OAuth request token.");
  }

  await db.query(
    `INSERT INTO discogs_oauth_sessions (
      state, user_id, request_token, request_token_secret, expires_at
    ) VALUES ($1, $2, $3, $4, now() + interval '15 minutes')`,
    [state, user.id, requestToken.oauth_token, encrypt(requestToken.oauth_token_secret)]
  );
  return reply.redirect(authorizationUrl(requestToken.oauth_token));
});

app.get("/api/integrations/discogs/callback", async (request, reply) => {
  const { state, oauth_token: requestToken, oauth_verifier: verifier, denied } = request.query;
  if (denied) return reply.redirect(`${appOrigin}/?discogs=cancelled`);
  if (!state || !requestToken || !verifier) {
    return reply.code(400).send({ error: "Discogs OAuth callback is incomplete." });
  }

  const result = await db.query(
    `SELECT * FROM discogs_oauth_sessions
     WHERE state = $1 AND request_token = $2 AND expires_at > now()`,
    [state, requestToken]
  );
  const session = result.rows[0];
  if (!session) return reply.code(400).send({ error: "This Discogs connection request expired." });

  const access = await exchangeAccessToken({
    requestToken,
    requestTokenSecret: decrypt(session.request_token_secret),
    verifier
  });
  const identity = await getIdentity({
    token: access.oauth_token,
    tokenSecret: access.oauth_token_secret
  });

  const client = await db.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO discogs_connections (
        user_id, discogs_user_id, discogs_username, access_token, access_token_secret, updated_at
      ) VALUES ($1, $2, $3, $4, $5, now())
      ON CONFLICT (user_id) DO UPDATE SET
        discogs_user_id = EXCLUDED.discogs_user_id,
        discogs_username = EXCLUDED.discogs_username,
        access_token = EXCLUDED.access_token,
        access_token_secret = EXCLUDED.access_token_secret,
        updated_at = now()`,
      [
        session.user_id,
        identity.id,
        identity.username,
        encrypt(access.oauth_token),
        encrypt(access.oauth_token_secret)
      ]
    );
    await client.query("DELETE FROM discogs_oauth_sessions WHERE state = $1", [state]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }

  return reply.redirect(`${appOrigin}/?discogs=connected`);
});

app.get("/api/collection", async request => {
  const user = await localUser();
  const { q = "", genre = "", limit = "100", offset = "0" } = request.query;
  const values = [user.id];
  const where = ["user_id = $1"];

  if (q.trim()) {
    values.push(`%${q.trim()}%`);
    where.push(`(artist ILIKE $${values.length} OR title ILIKE $${values.length})`);
  }
  if (genre.trim()) {
    values.push(genre.trim());
    where.push(`($${values.length} = ANY(genres) OR $${values.length} = ANY(styles))`);
  }

  const safeLimit = Math.min(Math.max(Number(limit) || 100, 1), 100);
  const safeOffset = Math.max(Number(offset) || 0, 0);
  values.push(safeLimit, safeOffset);
  const collection = await db.query(
    `SELECT * FROM collection_releases
     WHERE ${where.join(" AND ")}
     ORDER BY artist ASC, title ASC
     LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values
  );

  return { records: collection.rows.map(serializeRelease) };
});

app.get("/api/collection/:collectionReleaseId", async request => {
  const user = await localUser();
  const release = await hydrateRelease(user.id, request.params.collectionReleaseId);
  if (!release) return { error: "Record not found." };
  return { record: serializeRelease(release) };
});

app.post("/api/collection/sync", async (_request, reply) => {
  const user = await localUser();
  const result = await syncCollection(user.id);
  return reply.code(202).send(result);
});

app.patch("/api/settings/sync-frequency", async request => {
  const { frequency } = request.body || {};
  requireFrequency(frequency);
  const user = await localUser();
  const next = nextSyncAt(frequency);
  const result = await db.query(
    `INSERT INTO sync_settings (user_id, frequency, next_sync_at, updated_at)
     VALUES ($1, $2, $3, now())
     ON CONFLICT (user_id) DO UPDATE SET
       frequency = EXCLUDED.frequency,
       next_sync_at = EXCLUDED.next_sync_at,
       updated_at = now()
     RETURNING frequency, last_synced_at, next_sync_at`,
    [user.id, frequency, next]
  );
  return result.rows[0];
});

app.post("/api/listens", async (request, reply) => {
  const { collectionReleaseId, side, startedAt } = request.body || {};
  if (!collectionReleaseId || !/^[A-D]$/.test(side || "")) {
    return reply.code(400).send({ error: "collectionReleaseId and side (A-D) are required." });
  }

  const user = await localUser();
  const release = await hydrateRelease(user.id, collectionReleaseId);
  if (!release) return reply.code(404).send({ error: "Record not found." });

  const sideTracks = tracksForSide(release.tracklist, side);
  if (!sideTracks.length) {
    return reply.code(422).send({ error: `No ${side}-side tracks are available for this release.` });
  }

  const started = startedAt ? new Date(startedAt) : new Date();
  if (Number.isNaN(started.getTime())) {
    return reply.code(400).send({ error: "startedAt must be a valid ISO timestamp." });
  }

  const durationEstimated = sideTracks.some(track => !track.durationSeconds);
  const fallbackTrackDuration = 180;
  let elapsedSeconds = 0;
  const tracks = sideTracks.map((track, index) => {
    const durationSeconds = track.durationSeconds || fallbackTrackDuration;
    const payload = {
      ...track,
      index,
      durationSeconds,
      startsAt: new Date(started.getTime() + elapsedSeconds * 1000).toISOString()
    };
    elapsedSeconds += durationSeconds;
    return payload;
  });
  const expectedEnd = new Date(started.getTime() + elapsedSeconds * 1000);

  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const listen = await client.query(
      `INSERT INTO listens (
        user_id, collection_release_id, side, started_at, expected_ended_at, duration_estimated, tracks
      ) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [user.id, release.id, side, started, expectedEnd, durationEstimated, tracks]
    );
    for (const track of tracks) {
      await client.query(
        `INSERT INTO scrobble_jobs (listen_id, track_position, scheduled_at)
         VALUES ($1, $2, $3)`,
        [listen.rows[0].id, track.index, track.startsAt]
      );
    }
    await client.query("COMMIT");
    return reply.code(201).send({
      listen: listen.rows[0],
      message: "Listening session saved. Track scrobbles are queued."
    });
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
});

app.patch("/api/listens/:listenId", async request => {
  const { status = "completed" } = request.body || {};
  if (!["completed", "stopped"].includes(status)) {
    const error = new Error("status must be completed or stopped.");
    error.statusCode = 400;
    throw error;
  }
  const user = await localUser();
  const result = await db.query(
    `UPDATE listens SET status = $3, completed_at = now()
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [request.params.listenId, user.id, status]
  );
  return result.rows[0] || { error: "Listening session not found." };
});

app.setErrorHandler((error, _request, reply) => {
  app.log.error(error);
  reply.code(error.statusCode || 500).send({ error: error.message || "Unexpected server error." });
});

try {
  await db.query("SELECT 1");
  await app.listen({ port: Number(process.env.PORT || 3001), host: "0.0.0.0" });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
