-- Discogs collection instance ids can exceed the 32-bit integer range.
ALTER TABLE collection_releases
  ALTER COLUMN discogs_instance_id TYPE BIGINT,
  ALTER COLUMN discogs_release_id TYPE BIGINT;
