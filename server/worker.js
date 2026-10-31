import { db } from "./db.js";
import { syncCollection } from "./collection.js";
import { completeFinishedListens } from "./listens.js";

try {
  const completed = await completeFinishedListens();
  if (completed) console.log(`Marked ${completed} finished ${completed === 1 ? "side" : "sides"} completed.`);

  const due = await db.query(
    `SELECT user_id FROM sync_settings
     WHERE next_sync_at <= now()
       AND EXISTS (SELECT 1 FROM discogs_connections WHERE user_id = sync_settings.user_id)`
  );

  for (const { user_id: userId } of due.rows) {
    try {
      const result = await syncCollection(userId);
      console.log(`Synced ${result.releasesSeen} records for ${userId}.`);
    } catch (error) {
      console.error(`Sync failed for ${userId}: ${error.message}`);
    }
  }
} finally {
  await db.end();
}
