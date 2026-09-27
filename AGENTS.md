# Groove Tracker contributor guide

Groove Tracker is a responsive PWA for recording vinyl listening sessions. It imports a Discogs collection, records the selected record side as a listen, and prepares a per-track Last.fm scrobble queue.

## Project layout

- `src/` — dependency-free Vite frontend. `main.js` owns UI state and API calls; `styles.css` owns the responsive visual design.
- `public/` — installable PWA assets and service worker.
- `server/` — Fastify API, Discogs OAuth client, Postgres access, sync worker, and migrations.
- `server/migrations/` — SQL schema changes. Add a new, numbered migration instead of modifying an already-applied one.
- `docs/` — repository documentation assets, including the README product screenshot.
- `compose.yaml` — local development stack: PostgreSQL, API, Vite PWA, and sync worker.

## Common commands

```sh
npm install
npm run dev                 # PWA at localhost:5173
npm run api                 # API at localhost:3001
npm run db:migrate          # apply Postgres migrations
npm run worker:sync         # run one due-collection sync pass
npm run build               # production frontend build
docker compose up --build   # full local stack
```

Run `npm run build` after frontend changes. Run `node --check server/<file>.js` after server-only changes when a database is unavailable.

## Frontend conventions

- Keep the app framework-free unless a change has a strong reason to introduce a dependency.
- Preserve the warm paper / deep-green / amber visual language and responsive behaviour across phone, tablet, and desktop.
- The app works with sample records when the API is unavailable. Do not remove this fallback.
- API requests are relative (`/api/...`); Vite proxies them to the local API in development.
- When adding stateful actions, keep local UI feedback immediate and let API persistence complete asynchronously where practical.

## API and database conventions

- Use Postgres, not MongoDB. The listening, releases, tracks, syncs, and scrobble jobs are relational data.
- Keep raw Discogs data in JSONB only as a reference/cache; maintain normalized fields for search and analytics.
- Discogs collection sync stores release summaries first. Fetch and cache a release tracklist lazily when the release is selected.
- Starting a listen must save the start time, expected side end time, and one queued scrobble job per track.
- The `worker:sync` process is intended to be invoked hourly. It decides which daily, weekly, or monthly syncs are due.
- The current `local` user is a deliberate single-user development shortcut. Add real app authentication before supporting multiple people.

## Security requirements

- Never commit `.env`, Discogs credentials, OAuth tokens, or database dumps.
- OAuth access tokens and token secrets must be encrypted with `TOKEN_ENCRYPTION_KEY` before entering Postgres.
- Keep Discogs OAuth signing and all third-party secrets server-side. The browser must only use our API.
- Validate all API input and scope reads/writes to the authenticated user when multi-user auth is introduced.

## Discogs and Last.fm work

- Discogs OAuth is implemented in `server/discogs.js`; preserve OAuth 1.0a request signing when changing it.
- The OAuth callback URL is derived from `API_ORIGIN`, while the completion redirect uses `APP_ORIGIN`.
- Last.fm is intentionally not connected yet. Preserve `scrobble_jobs` as the handoff point for a future retrying Last.fm worker.

## Documentation and commits

- Update `README.md` when setup, environment variables, commands, API routes, or Docker behaviour changes.
- If the product UI changes materially, refresh `docs/groove-tracker-home.png` and keep the README image link working.
- Keep commits scoped and use imperative messages, for example: `Add Last.fm scrobble worker`.
