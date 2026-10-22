import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required. Copy .env.example to .env and configure PostgreSQL.");
}

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Set DATABASE_SSL=false for a Postgres without TLS, such as the Compose database container.
  ssl: process.env.DATABASE_SSL === "false" || process.env.DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false }
});

export async function getLocalUser() {
  const existing = await db.query("SELECT id, handle FROM users WHERE handle = 'local'");
  if (existing.rows[0]) return existing.rows[0];

  const created = await db.query(
    "INSERT INTO users (handle) VALUES ('local') RETURNING id, handle"
  );
  return created.rows[0];
}
