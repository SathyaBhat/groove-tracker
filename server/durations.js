// Backfill missing track durations for cached Discogs releases.
//
// For every collection release whose tracklist has tracks without a duration:
//   1. fetch the release from Discogs again (the pressing may have been edited since it was cached);
//   2. for tracks still missing a duration, copy it from the release's master, matching by title,
//      or by position in the list when both tracklists have the same number of tracks.
// Durations taken from the master are marked with `duration_source: "master"`.
// Records whose tracklist has never been fetched are skipped unless includeUnfetched is set.
import { db } from "./db.js";
import { credentials, flattenTracklist } from "./collection.js";
import { getMaster, getRelease } from "./discogs.js";

// Authenticated Discogs requests are limited to 60 per minute.
const requestDelayMs = 1100;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let lastRequestAt = 0;
async function throttled(request) {
  const wait = lastRequestAt + requestDelayMs - Date.now();
  if (wait > 0) await sleep(wait);
  lastRequestAt = Date.now();
  return request();
}

const hasDuration = track => Boolean(String(track.duration || "").trim());
const missingCount = tracklist => {
  const tracks = flattenTracklist(tracklist);
  return tracks.length ? tracks.filter(track => !hasDuration(track)).length : Infinity;
};

function normalizeTitle(title = "") {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

// Returns a copy of `tracklist` with missing durations filled from `masterTracklist`.
function fillFromMaster(tracklist, masterTracklist) {
  const masterTracks = flattenTracklist(masterTracklist).filter(hasDuration);
  const byTitle = new Map(masterTracks.map(track => [normalizeTitle(track.title), track.duration]));
  const sameLength = flattenTracklist(masterTracklist).length === flattenTracklist(tracklist).length;
  const masterByIndex = flattenTracklist(masterTracklist);
  let index = 0;
  let filled = 0;

  const fill = track => {
    const position = index++;
    if (hasDuration(track)) return track;
    const duration = byTitle.get(normalizeTitle(track.title))
      || (sameLength && hasDuration(masterByIndex[position]) ? masterByIndex[position].duration : null);
    if (!duration) return track;
    filled += 1;
    return { ...track, duration, duration_source: "master" };
  };

  // Walk the same order as flattenTracklist so index matching lines up.
  const result = tracklist.map(track => {
    if (track.sub_tracks?.length) return { ...track, sub_tracks: track.sub_tracks.map(sub => sub.type_ === "heading" ? sub : fill(sub)) };
    if (track.type_ === "heading") return track;
    return fill(track);
  });
  return { tracklist: result, filled };
}

async function backfillRelease(release, auth, dryRun) {
  const label = `${release.artist} – ${release.title} (${release.discogs_release_id})`;
  const detail = await throttled(() => getRelease(auth, release.discogs_release_id));
  let tracklist = detail.tracklist || [];
  let fromMaster = 0;

  const masterId = detail.master_id || release.raw_release?.basic_information?.master_id;
  if (missingCount(tracklist) && tracklist.length && masterId) {
    const master = await throttled(() => getMaster(auth, masterId));
    ({ tracklist, filled: fromMaster } = fillFromMaster(tracklist, master.tracklist || []));
  }

  const total = flattenTracklist(tracklist).length;
  const missing = missingCount(tracklist);
  const before = missingCount(release.tracklist || []);
  if (missing === before) {
    console.log(`  unchanged  ${label}: ${missing}/${total} tracks still without a duration`);
    return false;
  }

  if (!dryRun) {
    await db.query(
      `UPDATE collection_releases
       SET tracklist = $2, tracklist_fetched_at = now(), updated_at = now()
       WHERE id = $1`,
      [release.id, JSON.stringify(tracklist)]
    );
  }
  const note = fromMaster ? `, ${fromMaster} from master ${masterId}` : "";
  const remaining = missing === Infinity ? "no tracklist" : `${missing}/${total} still missing`;
  console.log(`  ${dryRun ? "would update" : "updated"}  ${label}: ${remaining}${note}`);
  return true;
}

export async function backfillDurations(userId, { dryRun = false, includeUnfetched = false } = {}) {
  const connectionResult = await db.query(
    "SELECT * FROM discogs_connections WHERE user_id = $1",
    [userId]
  );
  const connection = connectionResult.rows[0];
  if (!connection) return { candidates: 0, updated: 0 };

  const auth = credentials(connection);
  const releases = await db.query(
    "SELECT * FROM collection_releases WHERE user_id = $1 ORDER BY artist, title",
    [userId]
  );
  const candidates = releases.rows.filter(release =>
    (includeUnfetched || release.tracklist?.length) && missingCount(release.tracklist || [])
  );
  console.log(`${connection.discogs_username}: ${candidates.length} of ${releases.rows.length} records missing durations${dryRun ? " (dry run)" : ""}`);

  let updated = 0;
  for (const release of candidates) {
    try {
      if (await backfillRelease(release, auth, dryRun)) updated += 1;
    } catch (error) {
      console.error(`  failed     ${release.artist} – ${release.title}: ${error.message}`);
    }
  }
  console.log(`${connection.discogs_username}: ${dryRun ? "would update" : "updated"} ${updated} records`);
  return { candidates: candidates.length, updated };
}
