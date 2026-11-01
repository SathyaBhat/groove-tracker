// Backfill missing track durations for every connected Discogs account. See server/durations.js.
//
// Usage: node server/backfill-durations.js [--dry-run] [--include-unfetched]
import { db } from "./db.js";
import { backfillDurations } from "./durations.js";

const dryRun = process.argv.includes("--dry-run");
const includeUnfetched = process.argv.includes("--include-unfetched");

try {
  const connections = await db.query("SELECT user_id FROM discogs_connections");
  for (const { user_id: userId } of connections.rows) {
    await backfillDurations(userId, { dryRun, includeUnfetched });
  }
} finally {
  await db.end();
}
