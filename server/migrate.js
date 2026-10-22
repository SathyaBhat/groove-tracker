import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "./db.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(here, "migrations");
const files = (await fs.readdir(migrationsDir)).filter(file => file.endsWith(".sql")).sort();

try {
  // Every migration is safe to run again, so apply them all in order on each start.
  for (const file of files) {
    await db.query(await fs.readFile(path.join(migrationsDir, file), "utf8"));
  }
  console.log("Database schema is up to date.");
} finally {
  await db.end();
}
