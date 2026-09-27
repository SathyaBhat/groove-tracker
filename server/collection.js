import { db } from "./db.js";
import { decrypt } from "./crypto.js";
import { getCollectionPage, getRelease } from "./discogs.js";

function basicInfo(record) {
  return record.basic_information || {};
}

function artists(info) {
  return (info.artists || []).map(artist => artist.name).join(", ") || "Unknown artist";
}

function mediaFormat(info) {
  return (info.formats || [])
    .map(format => [format.name, ...(format.descriptions || [])].filter(Boolean).join(" · "))
    .join(" / ") || "Vinyl";
}

function credentials(connection) {
  return {
    token: decrypt(connection.access_token),
    tokenSecret: decrypt(connection.access_token_secret)
  };
}

export function parseDuration(duration = "") {
  const parts = duration.split(":").map(Number);
  if (parts.length !== 2 || parts.some(Number.isNaN)) return 0;
  return parts[0] * 60 + parts[1];
}

export function sideForTrack(track) {
  const match = String(track.position || "").trim().match(/^([A-Z])\d*/i);
  return match?.[1]?.toUpperCase() || null;
}

export function tracksForSide(tracklist, side) {
  return (tracklist || [])
    .filter(track => sideForTrack(track) === side)
    .map(track => ({
      title: track.title,
      position: track.position,
      duration: track.duration || "",
      durationSeconds: parseDuration(track.duration)
    }));
}

export async function syncCollection(userId) {
  const connectionResult = await db.query(
    "SELECT * FROM discogs_connections WHERE user_id = $1",
    [userId]
  );
  const connection = connectionResult.rows[0];
  if (!connection) throw new Error("Connect Discogs before synchronising your collection.");

  const syncRun = await db.query(
    "INSERT INTO sync_runs (user_id, status) VALUES ($1, 'running') RETURNING id",
    [userId]
  );
  let seen = 0;

  try {
    let page = 1;
    let totalPages = 1;
    const auth = credentials(connection);

    while (page <= totalPages) {
      const payload = await getCollectionPage(auth, connection.discogs_username, page);
      totalPages = payload.pagination?.pages || 1;

      for (const item of payload.releases || []) {
        const info = basicInfo(item);
        await db.query(
          `INSERT INTO collection_releases (
            user_id, discogs_instance_id, discogs_release_id, artist, title, cover_url,
            release_year, genres, styles, media_format, raw_release, updated_at
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,now())
          ON CONFLICT (user_id, discogs_instance_id) DO UPDATE SET
            discogs_release_id = EXCLUDED.discogs_release_id,
            artist = EXCLUDED.artist,
            title = EXCLUDED.title,
            cover_url = EXCLUDED.cover_url,
            release_year = EXCLUDED.release_year,
            genres = EXCLUDED.genres,
            styles = EXCLUDED.styles,
            media_format = EXCLUDED.media_format,
            raw_release = EXCLUDED.raw_release,
            updated_at = now()`,
          [
            userId,
            item.instance_id,
            info.id,
            artists(info),
            info.title || "Untitled release",
            info.cover_image || info.thumb || null,
            info.year || null,
            info.genres || [],
            info.styles || [],
            mediaFormat(info),
            item
          ]
        );
        seen += 1;
      }
      page += 1;
    }

    await db.query(
      `INSERT INTO sync_settings (user_id, last_synced_at, next_sync_at, updated_at)
       VALUES ($1, now(), now() + interval '1 week', now())
       ON CONFLICT (user_id) DO UPDATE SET
         last_synced_at = now(),
         next_sync_at = CASE frequency
           WHEN 'daily' THEN now() + interval '1 day'
           WHEN 'monthly' THEN now() + interval '1 month'
           ELSE now() + interval '1 week'
         END,
         updated_at = now()`,
      [userId]
    );
    await db.query(
      "UPDATE sync_runs SET status = 'succeeded', releases_seen = $2, completed_at = now() WHERE id = $1",
      [syncRun.rows[0].id, seen]
    );
    return { releasesSeen: seen };
  } catch (error) {
    await db.query(
      "UPDATE sync_runs SET status = 'failed', releases_seen = $2, error_message = $3, completed_at = now() WHERE id = $1",
      [syncRun.rows[0].id, seen, error.message]
    );
    throw error;
  }
}

export async function hydrateRelease(userId, collectionReleaseId) {
  const releaseResult = await db.query(
    "SELECT * FROM collection_releases WHERE id = $1 AND user_id = $2",
    [collectionReleaseId, userId]
  );
  const release = releaseResult.rows[0];
  if (!release) return null;
  if (release.tracklist?.length) return release;

  const connectionResult = await db.query(
    "SELECT * FROM discogs_connections WHERE user_id = $1",
    [userId]
  );
  const connection = connectionResult.rows[0];
  if (!connection) throw new Error("Connect Discogs before fetching a release.");

  const detail = await getRelease(credentials(connection), release.discogs_release_id);
  const updated = await db.query(
    `UPDATE collection_releases
     SET tracklist = $3, tracklist_fetched_at = now(), updated_at = now()
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [collectionReleaseId, userId, detail.tracklist || []]
  );
  return updated.rows[0];
}

export function serializeRelease(release) {
  const tracklist = release.tracklist || [];
  const sides = ["A", "B", "C", "D"]
    .map(side => {
      const tracks = tracksForSide(tracklist, side);
      const durationSeconds = tracks.reduce((total, track) => total + track.durationSeconds, 0);
      return tracks.length ? { side, tracks, durationSeconds } : null;
    })
    .filter(Boolean);

  return {
    id: release.id,
    discogsReleaseId: release.discogs_release_id,
    artist: release.artist,
    title: release.title,
    coverUrl: release.cover_url,
    year: release.release_year,
    genres: release.genres,
    styles: release.styles,
    format: release.media_format,
    sides
  };
}
