# Groove Tracker

A responsive, installable web app for recording vinyl listening sessions.

![Groove Tracker dashboard](docs/groove-tracker-home.png)

The current front-end prototype includes:

- a Discogs-connected collection experience, with album, artist, and genre search
- side-by-side listening tracking and per-side track queues
- an empty turntable with a collection search on the home page; picking a record loads it onto the deck
- now playing, track progress, and coming next while a side plays, designed for desktop, tablet, and phone
- playback state held by the API and pushed to every open tab, so a refresh or a new tab shows the same side
- play history and lightweight listening analytics
- configurable daily, weekly, or monthly collection refresh preferences
- Last.fm scrobble status in the listening flow

## Run locally

```sh
npm install
npm run dev
```

## Run the API locally

1. Create a PostgreSQL database named `groove_tracker`.
2. Copy `.env.example` to `.env`, then provide the database URL, Discogs application credentials, a descriptive `DISCOGS_USER_AGENT`, and a 32-byte encryption key.
3. Create a Discogs application and set its callback URL to:

   ```text
   http://localhost:3001/api/integrations/discogs/callback
   ```

4. Run the migration and both processes:

   ```sh
   npm run db:migrate
   npm run api
   npm run dev
   ```

Open Settings in the PWA and choose **Connect Discogs**. The collection sync control calls the API once the account is connected.

## Run with Docker Compose

The Compose stack starts PostgreSQL, the API, the Vite PWA, and an hourly sync worker.

```sh
cp .env.example .env
# Set DISCOGS_CONSUMER_KEY, DISCOGS_CONSUMER_SECRET, and TOKEN_ENCRYPTION_KEY in .env
docker compose up --build
```

The PWA is available at `localhost:5173`, the API at `localhost:3001`, and PostgreSQL at `localhost:5432`. PostgreSQL data is retained in the `postgres-data` Docker volume. To reset only local database data:

```sh
docker compose down -v
```

## Deploy with Dokploy

`compose.dokploy.yaml` is the production stack: PostgreSQL (internal only), the API (runs migrations on start), an nginx-served PWA build (`Dockerfile.web`), and the hourly sync worker. Traefik routes `/api` to the API and everything else to the PWA, so the app stays same-origin. The LAN host serves it at `/`; the tailnet host serves it under `/groove` (the frontend uses relative URLs so one build works for both).

In Dokploy, create a Compose app from this repo, set the compose path to `compose.dokploy.yaml`, and set these environment variables:

| Variable | Purpose |
| --- | --- |
| `GROOVE_TAILNET_HOST` | HTTPS host (Tailscale cert resolver), served at `/groove`. Also used for `APP_ORIGIN` and `API_ORIGIN`; PWA install needs HTTPS. |
| `GROOVE_LAN_HOST` | Plain-HTTP host for the LAN. |
| `POSTGRES_PASSWORD` | Database password. |
| `TOKEN_ENCRYPTION_KEY` | `openssl rand -base64 32`. |
| `DISCOGS_CONSUMER_KEY`, `DISCOGS_CONSUMER_SECRET` | From your Discogs developer app. |

The stack joins the external `dokploy-network` and expects a Traefik `tailscale` cert resolver. The Discogs callback is `https://<GROOVE_TAILNET_HOST>/groove/api/integrations/discogs/callback`.

## API capabilities

| Capability | Endpoint |
| --- | --- |
| Begin Discogs OAuth | `GET /api/integrations/discogs/start` |
| Check Discogs connection | `GET /api/integrations/discogs` |
| Sync / list collection | `POST /api/collection/sync`, `GET /api/collection` |
| Load a release’s sides and tracks | `GET /api/collection/:id` |
| Set background refresh cadence | `PATCH /api/settings/sync-frequency` |
| Begin / stop a side play | `POST /api/listens`, `PATCH /api/listens/:id` |
| Current playback | `GET /api/listens/current` |
| Live playback updates (Server-Sent Events) | `GET /api/listens/stream` |

Discogs tokens are encrypted before storage. The collection sync stores release summaries first, then fetches and caches a release’s tracklist when that record is selected. Starting a side creates a listening session and one pending scrobble job per track.

The API owns playback: each user has at most one side playing, and starting a new side stops the previous one. When a side is stopped early, scrobble jobs for tracks that had not started yet are cancelled. Open tabs receive the full playback state over `/api/listens/stream` whenever a side starts or stops, and work out the current and next track from each track's start time. A side counts as completed once its expected end time passes. Without the API, sample-record playback is kept in `localStorage`.

## Scheduled collection refresh

Run `npm run worker:sync` from your host’s scheduler every hour. It marks finished sides completed, then only syncs users whose selected daily, weekly, or monthly cadence is due. The worker leaves Last.fm jobs in the database for the forthcoming Last.fm worker.
