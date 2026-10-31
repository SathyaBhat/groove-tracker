-- Two records with cached tracklists, so the API never needs to call Discogs.
-- Side A of the first record is 3 × 6 seconds, short enough to watch tracks change and the side finish.
INSERT INTO users (handle) VALUES ('local') ON CONFLICT (handle) DO NOTHING;

INSERT INTO collection_releases (
  user_id, discogs_instance_id, discogs_release_id, artist, title, release_year,
  genres, styles, media_format, tracklist, tracklist_fetched_at
)
SELECT u.id, 1001, 2001, 'Khruangbin', 'Con Todo El Mundo', 2018,
  '{Funk / Soul}'::text[], '{Psychedelic}'::text[], 'Vinyl · LP',
  '[{"position":"A1","title":"Cómo Me Quieres","duration":"0:06"},
    {"position":"A2","title":"Lady and Man","duration":"0:06"},
    {"position":"A3","title":"Maria También","duration":"0:06"},
    {"position":"B1","title":"Cómo Te Quiero","duration":"4:10"},
    {"position":"B2","title":"Shida","duration":"3:55"},
    {"position":"B3","title":"Friday Morning","duration":"4:30"}]'::jsonb,
  now()
FROM users u WHERE u.handle = 'local'
UNION ALL
SELECT u.id, 1002, 2002, 'Nina Simone', 'I Put a Spell on You', 1965,
  '{Jazz}'::text[], '{Soul-Jazz}'::text[], 'Vinyl · LP',
  '[{"position":"A1","title":"I Put a Spell on You","duration":"2:36"},
    {"position":"A2","title":"Tomorrow Is My Turn","duration":"2:47"},
    {"position":"B1","title":"Feeling Good","duration":"2:53"},
    {"position":"B2","title":"One September Day","duration":""}]'::jsonb,
  now()
FROM users u WHERE u.handle = 'local';
