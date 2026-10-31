-- Playback state is owned by the server: at most one listen per user may be playing.

-- Close out sides whose expected end has already passed.
UPDATE listens
SET status = 'completed', completed_at = expected_ended_at
WHERE status = 'playing' AND expected_ended_at <= now();

-- Earlier clients could leave several sides "playing"; keep only the newest.
UPDATE listens l
SET status = 'stopped', completed_at = now()
WHERE l.status = 'playing'
  AND EXISTS (
    SELECT 1 FROM listens newer
    WHERE newer.user_id = l.user_id
      AND newer.status = 'playing'
      AND (newer.started_at, newer.id) > (l.started_at, l.id)
  );

CREATE UNIQUE INDEX IF NOT EXISTS listens_one_playing_per_user_idx
  ON listens (user_id) WHERE status = 'playing';

-- Tracks that never started because a side was stopped early must not be scrobbled.
ALTER TABLE scrobble_jobs DROP CONSTRAINT IF EXISTS scrobble_jobs_status_check;
ALTER TABLE scrobble_jobs ADD CONSTRAINT scrobble_jobs_status_check
  CHECK (status IN ('pending', 'sent', 'failed', 'cancelled'));
