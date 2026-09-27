CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handle TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS discogs_connections (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  discogs_user_id INTEGER NOT NULL,
  discogs_username TEXT NOT NULL,
  access_token JSONB NOT NULL,
  access_token_secret JSONB NOT NULL,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS discogs_oauth_sessions (
  state TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  request_token TEXT NOT NULL,
  request_token_secret JSONB NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sync_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  frequency TEXT NOT NULL DEFAULT 'weekly' CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  last_synced_at TIMESTAMPTZ,
  next_sync_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS collection_releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  discogs_instance_id INTEGER NOT NULL,
  discogs_release_id INTEGER NOT NULL,
  artist TEXT NOT NULL,
  title TEXT NOT NULL,
  cover_url TEXT,
  release_year INTEGER,
  genres TEXT[] NOT NULL DEFAULT '{}',
  styles TEXT[] NOT NULL DEFAULT '{}',
  media_format TEXT,
  raw_release JSONB NOT NULL DEFAULT '{}'::jsonb,
  tracklist JSONB NOT NULL DEFAULT '[]'::jsonb,
  tracklist_fetched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, discogs_instance_id)
);

CREATE INDEX IF NOT EXISTS collection_releases_user_search_idx
  ON collection_releases (user_id, artist, title);

CREATE TABLE IF NOT EXISTS sync_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('running', 'succeeded', 'failed')),
  releases_seen INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  error_message TEXT
);

CREATE TABLE IF NOT EXISTS listens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  collection_release_id UUID NOT NULL REFERENCES collection_releases(id) ON DELETE RESTRICT,
  side TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  expected_ended_at TIMESTAMPTZ NOT NULL,
  duration_estimated BOOLEAN NOT NULL DEFAULT FALSE,
  tracks JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'playing' CHECK (status IN ('playing', 'completed', 'stopped')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS scrobble_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listen_id UUID NOT NULL REFERENCES listens(id) ON DELETE CASCADE,
  track_position INTEGER NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  sent_at TIMESTAMPTZ,
  UNIQUE (listen_id, track_position)
);
