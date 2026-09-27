import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "./db.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const migration = await fs.readFile(path.join(here, "migrations", "001_initial.sql"), "utf8");

try {
  await db.query(migration);
  console.log("Database schema is up to date.");
} finally {
  await db.end();
}
