# Groove Tracker

A responsive, installable web app for recording vinyl listening sessions.

The current front-end prototype includes:

- a Discogs-connected collection experience, with album, artist, and genre search
- side-by-side listening tracking and per-side track queues
- a now-playing presentation designed for desktop, tablet, and phone
- locally persisted play history and lightweight listening analytics
- configurable daily, weekly, or monthly collection refresh preferences
- Last.fm scrobble status in the listening flow

## Run locally

```sh
npm install
npm run dev
```

## Production integration seams

The UI currently uses representative collection data so it can run without credentials. The production API should supply the following operations:

| Capability | Suggested endpoint |
| --- | --- |
| Discogs OAuth connection | `POST /api/integrations/discogs/connect` |
| Refresh / fetch collection | `POST /api/collection/sync`, `GET /api/collection` |
| Set background refresh cadence | `PATCH /api/settings/sync-frequency` |
| Begin a side play | `POST /api/listens` |
| Finish or amend a side play | `PATCH /api/listens/:id` |
| Queue individual track scrobbles | server-side worker after `POST /api/listens` |
| Last.fm OAuth connection | `POST /api/integrations/lastfm/connect` |

Discogs and Last.fm tokens should remain server-side. When a side begins, save the selected side’s start time immediately, calculate individual track boundaries from Discogs track durations, then send queued scrobbles via the backend so retries and secret management are reliable.
