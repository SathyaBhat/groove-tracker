import { db } from "./db.js";
import { serializeRelease, tracksForSide } from "./collection.js";

// Tracks without a Discogs duration are assumed to be three minutes long.
const fallbackTrackDuration = 180;

function serializeListen(listen, release) {
  return {
    id: listen.id,
    side: listen.side,
    status: listen.status,
    startedAt: listen.started_at,
    expectedEndedAt: listen.expected_ended_at,
    durationEstimated: listen.duration_estimated,
    tracks: listen.tracks,
    record: serializeRelease(release)
  };
}

// Mark sides whose expected end has passed as completed. Pass a userId to limit the update.
export async function completeFinishedListens(userId = null) {
  const result = await db.query(
    `UPDATE listens SET status = 'completed', completed_at = expected_ended_at
     WHERE status = 'playing' AND expected_ended_at <= now()
       AND ($1::uuid IS NULL OR user_id = $1)`,
    [userId]
  );
  return result.rowCount;
}

export async function activeListen(userId) {
  await completeFinishedListens(userId);
  const result = await db.query(
    `SELECT l.*, row_to_json(r) AS release
     FROM listens l JOIN collection_releases r ON r.id = l.collection_release_id
     WHERE l.user_id = $1 AND l.status = 'playing'`,
    [userId]
  );
  const row = result.rows[0];
  return row ? serializeListen(row, row.release) : null;
}

// Stop a playing listen inside an open transaction and cancel scrobbles for tracks that never started.
async function stopPlaying(client, userId, { listenId = null, status = "stopped" } = {}) {
  const stopped = await client.query(
    `UPDATE listens SET status = $3, completed_at = LEAST(now(), expected_ended_at)
     WHERE user_id = $1 AND status = 'playing' AND ($2::uuid IS NULL OR id = $2)
     RETURNING id`,
    [userId, listenId, status]
  );
  const ids = stopped.rows.map(row => row.id);
  if (ids.length) {
    await client.query(
      `UPDATE scrobble_jobs SET status = 'cancelled'
       WHERE listen_id = ANY($1) AND status = 'pending' AND scheduled_at > now()`,
      [ids]
    );
  }
  return ids;
}

async function inTransaction(work) {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// Start a side. Any side that is already playing for this user is stopped first.
export async function startListen(userId, release, side, started) {
  const sideTracks = tracksForSide(release.tracklist, side);
  if (!sideTracks.length) return null;

  const durationEstimated = sideTracks.some(track => !track.durationSeconds);
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

  return inTransaction(async client => {
    // Serialise concurrent starts for the same user so the one-playing index is never violated.
    await client.query("SELECT id FROM users WHERE id = $1 FOR UPDATE", [userId]);
    await stopPlaying(client, userId);
    const listen = await client.query(
      `INSERT INTO listens (
        user_id, collection_release_id, side, started_at, expected_ended_at, duration_estimated, tracks, status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7, CASE WHEN $5::timestamptz <= now() THEN 'completed' ELSE 'playing' END)
      RETURNING *`,
      [userId, release.id, side, started, expectedEnd, durationEstimated, JSON.stringify(tracks)]
    );
    for (const track of tracks) {
      await client.query(
        `INSERT INTO scrobble_jobs (listen_id, track_position, scheduled_at)
         VALUES ($1, $2, $3)`,
        [listen.rows[0].id, track.index, track.startsAt]
      );
    }
    return serializeListen(listen.rows[0], release);
  });
}

export async function stopListen(userId, listenId, status) {
  const ids = await inTransaction(client => stopPlaying(client, userId, { listenId, status }));
  return ids.length > 0;
}
