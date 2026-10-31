import "./styles.css";

const albums = [
  {
    id: 1,
    artist: "Khruangbin",
    title: "Con Todo El Mundo",
    year: "2018",
    genre: "Psych / Funk",
    format: "LP · 33 RPM",
    cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&w=700&q=85",
    colors: ["#23352e", "#df9f47"],
    sides: [
      { name: "Side A", length: "18:28", tracks: ["Cómo Me Quieres", "Lady and Man", "Maria También", "August 10"] },
      { name: "Side B", length: "20:19", tracks: ["Cómo Te Quiero", "Shida", "Friday Morning", "Rules", "Les Petits Gris"] }
    ]
  },
  {
    id: 2,
    artist: "Nina Simone",
    title: "I Put a Spell on You",
    year: "1965",
    genre: "Jazz / Soul",
    format: "LP · 33 RPM",
    cover: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=700&q=85",
    colors: ["#481f22", "#e3d3a7"],
    sides: [
      { name: "Side A", length: "17:06", tracks: ["I Put a Spell on You", "Tomorrow Is My Turn", "Ne Me Quitte Pas", "Marriage Is for Old Folks"] },
      { name: "Side B", length: "17:52", tracks: ["July Tree", "Gimme Some", "Feeling Good", "One September Day"] }
    ]
  },
  {
    id: 3,
    artist: "Radiohead",
    title: "In Rainbows",
    year: "2007",
    genre: "Alternative",
    format: "2 × LP · 45 RPM",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=85",
    colors: ["#1d2f43", "#d96655"],
    sides: [
      { name: "Side A", length: "20:24", tracks: ["15 Step", "Bodysnatchers", "Nude"] },
      { name: "Side B", length: "22:28", tracks: ["Weird Fishes / Arpeggi", "All I Need", "Faust Arp"] }
    ]
  },
  {
    id: 4,
    artist: "Alice Coltrane",
    title: "Journey in Satchidananda",
    year: "1971",
    genre: "Spiritual Jazz",
    format: "LP · 33 RPM",
    cover: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=700&q=85",
    colors: ["#29335f", "#d8b6d7"],
    sides: [
      { name: "Side A", length: "18:02", tracks: ["Journey in Satchidananda", "Shiva-Loka", "Stopover Bombay"] },
      { name: "Side B", length: "18:49", tracks: ["Something About John Coltrane", "Isis and Osiris"] }
    ]
  },
  {
    id: 5,
    artist: "Fleetwood Mac",
    title: "Rumours",
    year: "1977",
    genre: "Rock",
    format: "LP · 33 RPM",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=700&q=85",
    colors: ["#153a3b", "#e7b646"],
    sides: [
      { name: "Side A", length: "20:06", tracks: ["Second Hand News", "Dreams", "Never Going Back Again", "Don't Stop", "Go Your Own Way", "Songbird"] },
      { name: "Side B", length: "19:48", tracks: ["The Chain", "You Make Loving Fun", "I Don't Want to Know", "Oh Daddy", "Gold Dust Woman"] }
    ]
  },
  {
    id: 6,
    artist: "Sade",
    title: "Love Deluxe",
    year: "1992",
    genre: "R&B / Soul",
    format: "LP · 33 RPM",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=700&q=85",
    colors: ["#682d47", "#f0c4b7"],
    sides: [
      { name: "Side A", length: "21:31", tracks: ["No Ordinary Love", "Feel No Pain", "I Couldn't Love You More", "Like a Tattoo"] },
      { name: "Side B", length: "20:23", tracks: ["Kiss of Life", "Pearls", "Bullet Proof Soul", "Mermaid"] }
    ]
  }
];

const icons = {
  logo: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2.5a13.5 13.5 0 1 0 0 27 13.5 13.5 0 0 0 0-27Zm0 4.2a9.3 9.3 0 1 1 0 18.6 9.3 9.3 0 0 1 0-18.6Zm0 5.3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/></svg>`,
  home: `<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"/></svg>`,
  collection: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.25"/><circle cx="12" cy="12" r="2"/><path d="M3.75 12H2m20 0h-1.75M12 3.75V2m0 20v-1.75"/></svg>`,
  chart: `<svg viewBox="0 0 24 24"><path d="M4 20V10m6 10V4m6 16v-7m4 7H2"/></svg>`,
  settings: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.05.05-2.73 2.73-.05-.05a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56v.07h-3.86v-.07a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.05.05-2.73-2.73.05-.05A1.7 1.7 0 0 0 5 15a1.7 1.7 0 0 0-1.56-1.03h-.07v-3.86h.07A1.7 1.7 0 0 0 5 9.08a1.7 1.7 0 0 0-.34-1.88l-.05-.05 2.73-2.73.05.05a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56v-.07h3.86v.07a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.05-.05 2.73 2.73-.05.05a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03h.07v3.86h-.07A1.7 1.7 0 0 0 19.4 15Z"/></svg>`,
  search: `<svg viewBox="0 0 24 24"><circle cx="10.75" cy="10.75" r="6.75"/><path d="m16 16 4.25 4.25"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>`,
  sync: `<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 0 0-14.9-4.1L3 9m-1-5v5h5m-3 4a8 8 0 0 0 14.9 4.1L21 15m1 5v-5h-5"/></svg>`,
  more: `<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>`,
  check: `<svg viewBox="0 0 24 24"><path d="m5 12 4.5 4.5L19 7"/></svg>`,
  close: `<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>`,
  play: `<svg viewBox="0 0 24 24"><path d="m8 5 11 7-11 7V5Z"/></svg>`,
  note: `<svg viewBox="0 0 24 24"><path d="M9 18V5l10-2v13M9 18a3 3 0 1 1-2-2.83M19 16a3 3 0 1 1-2-2.83"/></svg>`,
};

const state = {
  page: "home",
  // The record loaded on the deck but not playing. null shows the empty turntable.
  selected: null,
  selectedSide: 0,
  justLoaded: false,
  loadingId: null,
  // The side being played. The API owns it; sample mode keeps it in localStorage.
  playback: null,
  pendingStart: false,
  clockOffset: 0,
  trackKey: "",
  homeQuery: "",
  searchResults: [],
  query: "",
  genre: "All genres",
  syncFrequency: "Weekly",
  toast: "",
  history: JSON.parse(localStorage.getItem("groove-history") || "[]"),
  apiAvailable: false,
  stats: null,
  discogs: { connected: false, username: null },
  loadedAt: 0
};

// Records seen through the collection list or search, by id, so any card or result can be loaded.
const knownRecords = new Map(albums.map(album => [String(album.id), album]));
const samplePlaybackKey = "groove-playback";

const app = document.querySelector("#app");
const discogsResult = new URLSearchParams(window.location.search).get("discogs");

if (discogsResult) {
  state.toast = discogsResult === "connected"
    ? "Discogs connected — sync your collection when you’re ready."
    : "Discogs connection was cancelled.";
  window.history.replaceState({}, "", window.location.pathname);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function icon(name) {
  return `<span class="icon icon-${name}">${icons[name]}</span>`;
}

function timeGreeting() {
  const hour = new Date().getHours();
  return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
}

function sideDuration(album, index) {
  const [minutes, seconds] = (album.sides[index]?.length || "").split(":").map(Number);
  return Number.isFinite(minutes) && Number.isFinite(seconds) ? minutes * 60 + seconds : 0;
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes} min`;
}

function formatSideLength(seconds) {
  if (!seconds) return "—";
  const minutes = Math.floor(seconds / 60);
  const remainder = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function formatHours(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  if (!hours) return `${minutes}m`;
  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}

function dayKey(date) {
  const pad = number => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatWhen(iso) {
  const date = new Date(iso);
  const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const days = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0)) / 86400000);
  if (days === 0) return `Today, ${time}`;
  if (days === 1) return `Yesterday, ${time}`;
  return `${date.toLocaleDateString([], { month: "short", day: "numeric" })}, ${time}`;
}

// Listening numbers come from the API when it is available; otherwise from this device's history.
function listeningView() {
  if (state.apiAvailable && state.stats) {
    const stats = state.stats;
    return {
      totalSeconds: stats.totalSeconds,
      sides: stats.sides,
      albumCount: stats.albums,
      topGenre: stats.topGenre,
      days: stats.days,
      topAlbums: stats.topAlbums.map(item => ({ id: item.id, title: item.title, artist: item.artist, cover: item.coverUrl, sides: item.sides })),
      history: stats.history.map(item => ({
        id: item.collectionReleaseId,
        title: item.title,
        artist: item.artist,
        cover: item.coverUrl,
        side: `Side ${item.side}`,
        length: formatSideLength(item.durationSeconds),
        when: formatWhen(item.startedAt)
      })),
      collectionCount: stats.collectionCount
    };
  }

  const history = state.history;
  const perDay = new Map();
  const perAlbum = new Map();
  const perGenre = new Map();
  let totalSeconds = 0;
  for (const item of history) {
    const seconds = sideDuration(item.album, item.side);
    totalSeconds += seconds;
    if (item.at) perDay.set(dayKey(new Date(item.at)), (perDay.get(dayKey(new Date(item.at))) || 0) + seconds);
    perAlbum.set(item.album.id, { album: item.album, sides: (perAlbum.get(item.album.id)?.sides || 0) + 1 });
    perGenre.set(item.album.genre, (perGenre.get(item.album.genre) || 0) + 1);
  }
  const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - index));
    return { date: dayKey(date), seconds: perDay.get(dayKey(date)) || 0 };
  });
  const [genreName, genreSides] = [...perGenre.entries()].sort((a, b) => b[1] - a[1])[0] || [];
  return {
    totalSeconds,
    sides: history.length,
    albumCount: perAlbum.size,
    topGenre: genreName ? { name: genreName, sides: genreSides } : null,
    days,
    topAlbums: [...perAlbum.values()].sort((a, b) => b.sides - a.sides).slice(0, 3)
      .map(({ album, sides }) => ({ id: album.id, title: album.title, artist: album.artist, cover: album.cover, sides })),
    history: history.map(item => ({
      id: item.album.id,
      title: item.album.title,
      artist: item.album.artist,
      cover: item.album.cover,
      side: item.album.sides[item.side].name,
      length: item.album.sides[item.side].length,
      when: item.at ? formatWhen(item.at) : item.startedAt
    })),
    collectionCount: albums.length
  };
}

async function loadStats() {
  try {
    const response = await fetch("api/stats");
    if (!response.ok) return;
    state.stats = await response.json();
    render();
  } catch {
    // Without the API the numbers fall back to this device's history.
  }
}

function now() {
  return Date.now() + state.clockOffset;
}

function formatClock(seconds) {
  const safe = Math.max(Math.floor(seconds), 0);
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function rememberAlbum(album) {
  const existing = knownRecords.get(String(album.id));
  // Never replace a record with a loaded tracklist by its collection summary.
  if (existing?.hydrated && !album.hydrated) return existing;
  knownRecords.set(String(album.id), album);
  const index = albums.findIndex(item => String(item.id) === String(album.id));
  if (index >= 0) albums[index] = album;
  return album;
}

function findAlbum(id) {
  return knownRecords.get(String(id)) || albums.find(album => String(album.id) === String(id)) || null;
}

// The playback shape used by the UI, built from a server listen.
function playbackFromListen(listen) {
  const album = rememberAlbum(asUiAlbum(listen.record));
  const sideIndex = Math.max(album.sides.findIndex(side => side.name === `Side ${listen.side}`), 0);
  return {
    id: listen.id,
    album,
    sideIndex,
    startedAt: Date.parse(listen.startedAt),
    endsAt: Date.parse(listen.expectedEndedAt),
    tracks: listen.tracks.map(track => ({
      title: track.title,
      startsAt: Date.parse(track.startsAt),
      durationSeconds: track.durationSeconds
    }))
  };
}

// The same shape built locally: for sample records, and as the immediate state while the API saves a start.
// Tracks without a known length count as 3 minutes, the estimate the server uses for scrobbles.
function plannedPlayback(album, sideIndex, startedAt) {
  const side = album.sides[sideIndex];
  let offset = 0;
  const tracks = side.tracks.map((title, index) => {
    const durationSeconds = side.trackSeconds?.[index] || 180;
    const track = { title, startsAt: startedAt + offset * 1000, durationSeconds };
    offset += durationSeconds;
    return track;
  });
  return { id: null, album, sideIndex, startedAt, endsAt: startedAt + offset * 1000, tracks };
}

function playbackPosition(playback) {
  const time = now();
  const { tracks } = playback;
  let index = tracks.findIndex((track, i) => time < (tracks[i + 1]?.startsAt ?? playback.endsAt));
  if (index < 0) index = tracks.length - 1;
  const track = tracks[index];
  const trackEnd = tracks[index + 1]?.startsAt ?? playback.endsAt;
  const elapsed = Math.max((time - track.startsAt) / 1000, 0);
  const length = Math.max((trackEnd - track.startsAt) / 1000, 1);
  return {
    index,
    track,
    next: tracks[index + 1] || null,
    elapsed: Math.min(elapsed, length),
    length,
    finished: time >= playback.endsAt
  };
}

// Sample records have no server, so their playback is kept in localStorage and shared between tabs.
function saveSamplePlayback() {
  const playback = state.playback;
  if (playback && !playback.album.serverId) {
    localStorage.setItem(samplePlaybackKey, JSON.stringify({ albumId: playback.album.id, sideIndex: playback.sideIndex, startedAt: playback.startedAt }));
  } else {
    localStorage.removeItem(samplePlaybackKey);
  }
}

function restoreSamplePlayback() {
  try {
    const saved = JSON.parse(localStorage.getItem(samplePlaybackKey) || "null");
    const album = saved && findAlbum(saved.albumId);
    const playback = album?.sides[saved.sideIndex] ? plannedPlayback(album, saved.sideIndex, saved.startedAt) : null;
    if (playback && now() < playback.endsAt) {
      state.playback = playback;
      return;
    }
  } catch {
    // A corrupt saved state is treated as nothing playing.
  }
  state.playback = null;
  localStorage.removeItem(samplePlaybackKey);
}

function applyServerPlayback({ listen, serverTime }) {
  if (serverTime) state.clockOffset = Date.parse(serverTime) - Date.now();
  // The start request's own response is authoritative for the side being started.
  if (state.pendingStart) return;
  const previous = state.playback;
  state.playback = listen ? playbackFromListen(listen) : null;
  if (!listen && previous) {
    state.selected = previous.album;
    state.selectedSide = previous.sideIndex;
  }
  if (previous?.id !== state.playback?.id) void loadStats();
  render();
}

async function refreshPlayback() {
  try {
    const response = await fetch("api/listens/current");
    if (response.ok) applyServerPlayback(await response.json());
  } catch {
    // The event stream will deliver the state once the API is reachable again.
  }
}

// Server-Sent Events keep every open tab on the same side. EventSource reconnects by itself;
// if the server refuses the stream outright, try again after a pause.
let playbackStream = null;

function connectPlaybackStream() {
  if (playbackStream) return;
  if (!("EventSource" in window)) {
    playbackStream = "polling";
    setInterval(refreshPlayback, 15000);
    void refreshPlayback();
    return;
  }
  const source = new EventSource("api/listens/stream");
  playbackStream = source;
  source.addEventListener("playback", event => applyServerPlayback(JSON.parse(event.data)));
  source.addEventListener("error", () => {
    if (source.readyState !== EventSource.CLOSED) return;
    playbackStream = null;
    setTimeout(connectPlaybackStream, 10000);
  });
}

// Each tab finishes the side from the shared start time; the server marks it completed the same way.
function finishSide() {
  const { album, sideIndex } = state.playback;
  const nextSide = album.sides[sideIndex + 1];
  state.playback = null;
  state.selected = album;
  state.selectedSide = nextSide ? sideIndex + 1 : sideIndex;
  state.toast = nextSide ? `${album.sides[sideIndex].name} finished — flip to ${nextSide.name}` : `${album.title} finished`;
  if (album.serverId) void loadStats();
  else saveSamplePlayback();
  render();
}

function updateProgress(position) {
  document.querySelector("[data-track-progress]")?.style.setProperty("--progress", `${(position.elapsed / position.length) * 100}%`);
  const time = document.querySelector("[data-track-time]");
  if (time) time.innerHTML = `<span>${formatClock(position.elapsed)}</span><span>${formatClock(position.length)}</span>`;
}

setInterval(() => {
  const playback = state.playback;
  if (!playback || state.pendingStart) return;
  const position = playbackPosition(playback);
  if (position.finished) return finishSide();
  if (state.page !== "home") return;
  if (`${playback.id}:${position.index}` !== state.trackKey) return render();
  updateProgress(position);
}, 1000);

window.addEventListener("storage", event => {
  if (event.key !== samplePlaybackKey || state.apiAvailable) return;
  const previous = state.playback;
  restoreSamplePlayback();
  if (previous && !state.playback) {
    state.selected = previous.album;
    state.selectedSide = previous.sideIndex;
  }
  render();
});

function asUiAlbum(record) {
  const sides = record.sides?.length
    ? record.sides.map(side => ({
        name: `Side ${side.side}`,
        length: formatSideLength(side.durationSeconds),
        tracks: side.tracks.map(track => track.title),
        trackSeconds: side.tracks.map(track => track.durationSeconds || 0)
      }))
    : [
        { name: "Side A", length: "—", tracks: ["Select this record to load its tracklist"] },
        { name: "Side B", length: "—", tracks: ["Track details will come from Discogs"] }
      ];

  return {
    id: record.id,
    serverId: record.id,
    artist: record.artist,
    title: record.title,
    year: record.year || "—",
    genre: record.styles?.[0] || record.genres?.[0] || "Vinyl",
    format: record.format || "Vinyl",
    cover: record.coverUrl || albums[0].cover,
    colors: ["#23352e", "#df9f47"],
    hydrated: Boolean(record.sides?.length),
    sides
  };
}

async function checkApi() {
  try {
    const [integrationResponse, collectionResponse] = await Promise.all([
      fetch("api/integrations/discogs"),
      fetch("api/collection")
    ]);
    if (!integrationResponse.ok || !collectionResponse.ok) return;

    state.apiAvailable = true;
    state.discogs = await integrationResponse.json();
    const { records } = await collectionResponse.json();
    if (records?.length) {
      const syncedAlbums = records.map(asUiAlbum);
      albums.splice(0, albums.length, ...syncedAlbums);
      knownRecords.clear();
      syncedAlbums.forEach(album => knownRecords.set(String(album.id), album));
      // Sample records and their playback give way to the real collection and the server's state.
      if (state.playback && !state.playback.album.serverId) {
        state.playback = null;
        localStorage.removeItem(samplePlaybackKey);
      }
      if (state.selected && !state.selected.serverId) state.selected = null;
      connectPlaybackStream();
    }
    render();
    void loadStats();
  } catch {
    // The interface remains fully usable with sample data before the API is configured.
  }
}

async function hydrateSelectedRecord(serverId) {
  try {
    const response = await fetch(`api/collection/${serverId}`);
    const { record } = response.ok ? await response.json() : {};
    if (record) {
      const hydrated = rememberAlbum(asUiAlbum(record));
      if (String(state.selected?.id) === String(serverId)) state.selected = hydrated;
    } else if (String(state.selected?.id) === String(serverId)) {
      state.toast = "This record’s tracklist could not be loaded.";
    }
  } catch {
    if (String(state.selected?.id) === String(serverId)) state.toast = "This record’s tracklist could not be loaded.";
  }
  if (String(state.loadingId) === String(serverId)) state.loadingId = null;
  render();
}

// The record on the deck: the side being played, otherwise the loaded record, otherwise none.
function deckAlbum() {
  return state.playback?.album || state.selected;
}

function albumCard(album) {
  const onDeck = String(deckAlbum()?.id) === String(album.id);
  return `<button class="album-card ${onDeck ? "is-selected" : ""}" data-album="${album.id}">
    <span class="album-art" style="--cover:url('${album.cover}'); --c1:${album.colors[0]}; --c2:${album.colors[1]}"></span>
    <span class="album-meta">
      <strong>${album.title}</strong>
      <small>${album.artist}</small>
    </span>
    ${onDeck ? `<span class="card-check">${icon("check")}</span>` : ""}
  </button>`;
}

function layout(content) {
  return `<main class="shell">
    <aside class="sidebar">
      <div class="brand">${icon("logo")}<span>groove tracker</span></div>
      <nav class="nav" aria-label="Main navigation">
        ${navItem("home", "Home", "home")}
        ${navItem("collection", "My collection", "collection")}
        ${navItem("stats", "Your stats", "chart")}
      </nav>
      <div class="sidebar-footer">
        <button class="mini-profile" data-action="profile"><span class="avatar">SB</span><span><strong>Sathya</strong><small>${state.stats?.collectionCount ?? albums.length} records</small></span>${icon("more")}</button>
        <button class="settings-link" data-page="settings">${icon("settings")}Settings</button>
      </div>
    </aside>
    <section class="main-panel">
      <header class="mobile-header">
        <div class="brand">${icon("logo")}<span>groove tracker</span></div>
        <button class="avatar avatar-button" data-action="profile">SB</button>
      </header>
      ${content}
    </section>
    <nav class="mobile-nav" aria-label="Mobile navigation">
      ${mobileNavItem("home", "Home", "home")}
      ${mobileNavItem("collection", "Collection", "collection")}
      ${mobileNavItem("stats", "Stats", "chart")}
      ${mobileNavItem("settings", "Settings", "settings")}
    </nav>
  </main>
  ${state.toast ? `<div class="toast">${icon("check")}${state.toast}</div>` : ""}`;
}

function navItem(page, label, iconName) {
  return `<button class="nav-item ${state.page === page ? "active" : ""}" data-page="${page}">${icon(iconName)}<span>${label}</span></button>`;
}

function mobileNavItem(page, label, iconName) {
  return `<button class="mobile-nav-item ${state.page === page ? "active" : ""}" data-page="${page}">${icon(iconName)}<span>${label}</span></button>`;
}

function searchMatches(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return [...knownRecords.values()]
    .filter(album => `${album.artist} ${album.title}`.toLowerCase().includes(needle))
    .slice(0, 8);
}

function searchResultsMarkup() {
  if (!state.homeQuery.trim()) return "";
  return state.searchResults.map(album => `<li><button data-load="${escapeHtml(album.id)}"><span class="tiny-cover" style="--cover:url('${escapeHtml(album.cover)}')"></span><span><strong>${escapeHtml(album.title)}</strong><small>${escapeHtml(album.artist)}${album.year && album.year !== "—" ? ` · ${escapeHtml(album.year)}` : ""}</small></span>${icon("arrow")}</button></li>`).join("")
    || `<li class="search-empty">No records match “${escapeHtml(state.homeQuery.trim())}”</li>`;
}

function emptyDeck() {
  return `<section class="now-playing deck-empty">
    <div class="playing-image-wrap" aria-hidden="true">
      <div class="platter"><span></span></div>
      <div class="tonearm"><i></i></div>
    </div>
    <div class="now-info">
      <span class="status-pill is-idle"><i></i>Nothing on the turntable</span>
      <h2>Pick a record to play</h2>
      <p class="release-meta">Search your ${state.apiAvailable ? "Discogs collection" : "sample shelf"} to load a record onto the deck.</p>
      <div class="deck-search">
        <label class="search-box">${icon("search")}<input type="search" placeholder="Search artist or album" value="${escapeHtml(state.homeQuery)}" data-input="home-search" autocomplete="off" aria-controls="deck-results"></label>
        <ol class="search-results" id="deck-results" data-search-results>${searchResultsMarkup()}</ol>
      </div>
    </div>
  </section>`;
}

function queueMarkup(side, position) {
  return `<div class="queue-panel">
    <div class="queue-head"><span>${escapeHtml(side.name)} queue</span><small>${side.tracks.length} tracks</small></div>
    <ol>
      ${side.tracks.map((track, i) => {
        const status = !position ? "" : i < position.index ? "played" : i === position.index ? "playing" : i === position.index + 1 ? "next" : "";
        return `<li class="${status ? `is-${status}` : ""}"><span>${String(i + 1).padStart(2, "0")}</span><strong>${escapeHtml(track)}</strong><small>${status === "playing" ? "now" : status === "next" ? "next" : ""}</small></li>`;
      }).join("")}
    </ol>
  </div>`;
}

function deckMarkup() {
  const playback = state.playback;
  const album = deckAlbum();
  if (!album) return emptyDeck();

  const sideIndex = playback ? playback.sideIndex : state.selectedSide;
  const side = album.sides[sideIndex];
  const position = playback ? playbackPosition(playback) : null;
  const loading = !playback && String(state.loadingId) === String(album.id);
  const deckClass = [playback ? "is-playing" : "is-loaded", state.justLoaded ? "just-loaded" : ""].join(" ");
  const record = `<div class="playing-image-wrap">
      <div class="platter"><span></span></div>
      <div class="record-shadow"></div>
      <div class="big-record ${playback ? "spinning" : ""}" style="--c1:${album.colors[0]};--c2:${album.colors[1]}"><span></span></div>
      <span class="now-cover" style="--cover:url('${escapeHtml(album.cover)}')"></span>
      <div class="tonearm"><i></i></div>
    </div>`;
  const heading = `<p class="eyebrow">${escapeHtml(album.artist)}</p>
      <h2>${escapeHtml(album.title)}</h2>
      <p class="release-meta">${escapeHtml(album.year)} · ${escapeHtml(album.format)} · ${escapeHtml(album.genre)}</p>`;

  if (playback) {
    const nextSide = album.sides[sideIndex + 1];
    const comingNext = position.next
      ? `<strong>${escapeHtml(position.next.title)}</strong>`
      : `<strong>${nextSide ? `Flip to ${escapeHtml(nextSide.name)}` : "End of the record"}</strong>`;
    return `<section class="now-playing ${deckClass}">
      ${record}
      <div class="now-info">
        <span class="status-pill"><i></i>Now playing · ${escapeHtml(side.name)}</span>
        ${heading}
        <div class="track-now">
          <p class="eyebrow">Track ${position.index + 1} of ${playback.tracks.length}</p>
          <strong>${escapeHtml(position.track.title)}</strong>
          <div class="track-progress" data-track-progress style="--progress:${(position.elapsed / position.length) * 100}%"><i></i></div>
          <div class="track-time" data-track-time><span>${formatClock(position.elapsed)}</span><span>${formatClock(position.length)}</span></div>
        </div>
        <p class="coming-next"><span>Coming next</span>${comingNext}</p>
        <button class="secondary-button" data-action="stop" ${playback.id || !playback.album.serverId ? "" : "disabled"}>${icon("close")}<span>${playback.id || !playback.album.serverId ? "Stop tracking" : "Saving…"}</span></button>
      </div>
      ${queueMarkup(side, position)}
    </section>`;
  }

  return `<section class="now-playing ${deckClass}">
    ${record}
    <div class="now-info">
      <span class="status-pill"><i></i>Ready to play</span>
      ${heading}
      <div class="side-selector" role="group" aria-label="Choose record side">
        ${album.sides.map((item, index) => `<button class="${sideIndex === index ? "selected" : ""}" data-side="${index}" ${loading ? "disabled" : ""}><span>${escapeHtml(item.name)}</span><small>${item.length}</small></button>`).join("")}
      </div>
      <div class="deck-actions">
        <button class="primary-button" data-action="track" ${loading ? "disabled" : ""}>${icon("play")}<span>${loading ? "Loading tracklist…" : `Play ${escapeHtml(side.name)}`}</span></button>
        <button class="text-button" data-action="eject">Change record</button>
      </div>
      <p class="current-track">${icon("note")}<span>Starts with<strong>${escapeHtml(side.tracks[0] || "—")}</strong></span></p>
    </div>
    ${queueMarkup(side, null)}
  </section>`;
}

function homePage() {
  const view = listeningView();
  const recent = view.history.slice(0, 3);
  const week = view.days.slice(-7);
  const weekMax = Math.max(...week.map(day => day.seconds), 1);
  return layout(`<div class="page home-page">
    <header class="page-head">
      <div>
        <p class="eyebrow">${timeGreeting()}, Sathya</p>
        <h1>What’s spinning?</h1>
      </div>
      <button class="sync-button" data-action="sync">${icon("sync")}<span>Sync collection</span></button>
    </header>

    ${deckMarkup()}

    <section class="section-heading">
      <div><h2>Pick something from your shelf</h2><p>${state.apiAvailable ? `${view.collectionCount} records in your Discogs collection` : "Sample records until your Discogs collection is connected"}</p></div>
      <button class="text-button" data-page="collection">Browse collection ${icon("arrow")}</button>
    </section>
    <section class="shelf-grid">${albums.slice(0, 4).map(albumCard).join("")}</section>

    <section class="lower-grid">
      <div class="recent-listens">
        <div class="section-heading compact"><div><h2>Recently played</h2></div><button class="text-button" data-page="stats">View history ${icon("arrow")}</button></div>
        ${recent.map(item => `<button class="recent-row" data-album="${item.id}"><span class="tiny-cover" style="--cover:url('${item.cover}')"></span><span><strong>${item.title}</strong><small>${item.artist} · ${item.side}</small></span><em>${item.when}</em>${icon("chevron")}</button>`).join("") || `<div class="empty-state">Nothing played yet. Start tracking a side to build your history.</div>`}
      </div>
      <aside class="weekly-card">
        <span class="sparkle">✦</span><p class="eyebrow">This week</p><strong>${formatHours(week.reduce((sum, day) => sum + day.seconds, 0))}</strong><span>of intentional listening</span>
        <div class="week-bars">${week.map(day => `<i style="--h:${Math.max(Math.round(day.seconds / weekMax * 100), 4)}%"></i>`).join("")}</div>
      </aside>
    </section>
  </div>`);
}

function collectionPage() {
  const genres = ["All genres", ...new Set(albums.map(a => a.genre))];
  const filtered = albums.filter(album => {
    const text = `${album.artist} ${album.title} ${album.genre}`.toLowerCase();
    return text.includes(state.query.toLowerCase()) && (state.genre === "All genres" || album.genre === state.genre);
  });
  return layout(`<div class="page collection-page">
    <header class="page-head collection-head">
      <div><p class="eyebrow">Your Discogs collection</p><h1>My records <span>78</span></h1></div>
      <button class="sync-button" data-action="sync">${icon("sync")}<span>Sync collection</span></button>
    </header>
    <div class="collection-tools">
      <label class="search-box">${icon("search")}<input type="search" placeholder="Search artist, album or genre" value="${state.query}" data-input="search"></label>
      <select data-input="genre">${genres.map(genre => `<option ${state.genre === genre ? "selected" : ""}>${genre}</option>`).join("")}</select>
      <button class="sort-button" data-action="sort">Recently added <span>↓</span></button>
    </div>
    <div class="results-line"><span>${filtered.length} records</span><span>synced from Discogs · yesterday at 6:15 AM</span></div>
    <section class="collection-grid">
      ${filtered.map(album => `<article class="collection-record">
        <button class="collection-art" data-album="${album.id}" style="--cover:url('${album.cover}');--c1:${album.colors[0]};--c2:${album.colors[1]}"><span class="vinyl-peek"></span><img src="${album.cover}" alt="" /></button>
        <div class="record-details"><p>${album.artist}</p><h2>${album.title}</h2><small>${album.year} · ${album.genre}</small></div>
        <button class="track-mini" data-album="${album.id}">Track ${icon("arrow")}</button>
      </article>`).join("") || `<div class="empty-state">No records match that search.</div>`}
    </section>
  </div>`);
}

function statsPage() {
  const view = listeningView();
  const max = Math.max(...view.days.map(day => day.seconds), 1);
  const peak = view.days.reduce((best, day, index) => day.seconds > view.days[best].seconds ? index : best, 0);
  const total14 = view.days.reduce((sum, day) => sum + day.seconds, 0);
  const axis = [0, 4, 9, 13].map(index => new Date(`${view.days[index].date}T00:00`).toLocaleDateString([], { month: "short", day: "numeric" }));
  return layout(`<div class="page stats-page">
    <header class="page-head"><div><p class="eyebrow">Your listening room</p><h1>Good music, kept close.</h1></div><button class="period-button">Last 30 days <span>⌄</span></button></header>
    <section class="stat-grid">
      <article><span class="stat-icon amber">${icon("note")}</span><p>Time listening</p><strong>${formatHours(view.totalSeconds)}</strong><small>${view.sides ? "Estimated from record side lengths" : "Nothing tracked yet"}</small></article>
      <article><span class="stat-icon green">${icon("collection")}</span><p>Record sides played</p><strong>${view.sides}</strong><small>${view.sides ? `Across ${view.albumCount} ${view.albumCount === 1 ? "album" : "albums"}` : "Start tracking a side"}</small></article>
      <article><span class="stat-icon pink">${icon("chart")}</span><p>Most played genre</p><strong>${view.topGenre ? view.topGenre.name : "—"}</strong><small>${view.topGenre ? `${view.topGenre.sides} ${view.topGenre.sides === 1 ? "side" : "sides"}` : "No plays yet"}</small></article>
    </section>
    <section class="analytics-grid">
      <article class="chart-card"><div class="card-title"><div><h2>Listening rhythm</h2><p>Time played each day, last 14 days</p></div><span class="chart-total">${formatHours(total14)}</span></div><div class="bar-chart">${view.days.map((day, i) => `<span class="${day.seconds && i === peak ? "highlight" : ""}" style="--value:${Math.max(Math.round(day.seconds / max * 100), 3)}%"></span>`).join("")}</div><div class="chart-axis">${axis.map(label => `<span>${label}</span>`).join("")}</div></article>
      <article class="top-albums"><div class="card-title"><div><h2>On repeat</h2><p>Your most-played records</p></div></div>${view.topAlbums.map((album, i) => `<button data-album="${album.id}"><span class="rank">0${i + 1}</span><span class="tiny-cover" style="--cover:url('${album.cover}')"></span><span><strong>${album.title}</strong><small>${album.artist}</small></span><em>${album.sides} ${album.sides === 1 ? "side" : "sides"}</em></button>`).join("") || `<div class="empty-state">Your most-played records will show up here.</div>`}</article>
    </section>
    <section class="history-card"><div class="card-title"><div><h2>Listening history</h2><p>Every side, carefully saved.</p></div></div>
      ${view.history.map(item => `<div class="history-row"><span class="tiny-cover" style="--cover:url('${item.cover}')"></span><span><strong>${item.artist} — ${item.title}</strong><small>${item.side} · ${item.length} · Scrobble queued</small></span><time>${item.when}</time></div>`).join("") || `<div class="empty-state">No listens yet.</div>`}</section>
  </div>`);
}

function settingsPage() {
  const discogsConnection = state.discogs.connected
    ? `<p>Collection connected as <strong>${state.discogs.username}</strong></p><span class="connected">${icon("check")}Connected</span>`
    : `<p>Connect your collection to bring your records into Groove Tracker.</p><button class="connect-button" data-action="discogs-connect">Connect Discogs ${icon("arrow")}</button>`;
  return layout(`<div class="page settings-page">
    <header class="page-head"><div><p class="eyebrow">Your setup</p><h1>Settings</h1></div></header>
    <section class="settings-stack">
      <article class="settings-card"><div class="service-mark discogs">d</div><div><h2>Discogs</h2>${discogsConnection}</div></article>
      <article class="settings-card"><div class="service-mark lastfm">lfm</div><div><h2>Last.fm</h2><p>Scrobble every track as a side is recorded.</p></div><span class="connected">${icon("check")}Connected</span></article>
      <article class="settings-card frequency-card"><div><h2>Collection refresh</h2><p>Keep your Discogs collection up to date in the background.</p></div><label><span>Refresh</span><select data-input="frequency">${["Daily", "Weekly", "Monthly"].map(freq => `<option ${freq === state.syncFrequency ? "selected" : ""}>${freq}</option>`).join("")}</select></label></article>
      <article class="settings-card"><div><h2>Listening notifications</h2><p>A nudge when it’s time to flip the record.</p></div><button class="toggle on" aria-label="Toggle notifications"><i></i></button></article>
    </section>
  </div>`);
}

function render() {
  const pages = { home: homePage, collection: collectionPage, stats: statsPage, settings: settingsPage };
  if (state.playback) state.trackKey = `${state.playback.id}:${playbackPosition(state.playback).index}`;
  app.innerHTML = pages[state.page]();
  attachEvents();
  if (state.toast) setTimeout(() => { state.toast = ""; render(); }, 3200);
}

// Put a record on the deck. While a side is playing the deck stays on that side.
function loadRecord(id, navigate = false) {
  const album = findAlbum(id);
  if (!album) return;
  if (navigate) state.page = "home";
  if (state.playback) {
    state.toast = String(state.playback.album.id) === String(album.id)
      ? `${state.playback.album.sides[state.playback.sideIndex].name} is already playing`
      : "Stop the current side before changing records";
    render();
    return;
  }
  const changed = String(state.selected?.id) !== String(album.id);
  state.selected = album;
  if (changed) state.selectedSide = 0;
  state.justLoaded = changed;
  state.homeQuery = "";
  state.searchResults = [];
  const needsTracklist = album.serverId && !album.hydrated;
  if (needsTracklist) state.loadingId = album.id;
  render();
  if (changed) setTimeout(() => { state.justLoaded = false; }, 1200);
  if (needsTracklist) void hydrateSelectedRecord(album.serverId);
}

let searchTimer = null;
let searchSequence = 0;

function showSearchResults() {
  const list = document.querySelector("[data-search-results]");
  if (!list) return;
  list.innerHTML = searchResultsMarkup();
  list.querySelectorAll("[data-load]").forEach(button => button.addEventListener("click", () => loadRecord(button.dataset.load)));
}

// Search the whole collection on the server when it is available, otherwise the records on hand.
function searchDeck(query) {
  state.homeQuery = query;
  clearTimeout(searchTimer);
  if (!query.trim() || !state.apiAvailable) {
    state.searchResults = searchMatches(query);
    showSearchResults();
    return;
  }
  const sequence = ++searchSequence;
  searchTimer = setTimeout(async () => {
    try {
      const response = await fetch(`api/collection?${new URLSearchParams({ q: query.trim(), limit: "8" })}`);
      if (!response.ok) throw new Error("Search failed");
      const { records } = await response.json();
      if (sequence !== searchSequence) return;
      state.searchResults = records.map(record => rememberAlbum(asUiAlbum(record)));
    } catch {
      if (sequence !== searchSequence) return;
      state.searchResults = searchMatches(query);
    }
    showSearchResults();
  }, 200);
}

async function startPlayback() {
  const album = state.selected;
  if (!album || state.playback) return;
  const sideIndex = state.selectedSide;
  const side = album.sides[sideIndex];
  state.playback = plannedPlayback(album, sideIndex, now());
  state.toast = `${side.name} is now being tracked`;

  if (!album.serverId) {
    state.history.unshift({ album, side: sideIndex, at: new Date().toISOString() });
    localStorage.setItem("groove-history", JSON.stringify(state.history));
    saveSamplePlayback();
    render();
    return;
  }

  state.pendingStart = true;
  render();
  try {
    const response = await fetch("api/listens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collectionReleaseId: album.serverId, side: side.name.replace("Side ", "") })
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || "The server could not start this side.");
    state.pendingStart = false;
    state.playback = playbackFromListen(body.listen);
    void loadStats();
  } catch (error) {
    state.pendingStart = false;
    state.playback = null;
    state.toast = error.message === "Failed to fetch" ? "The server is unreachable, so this side was not tracked." : error.message;
  }
  render();
}

async function stopPlayback() {
  const playback = state.playback;
  if (!playback) return;
  state.playback = null;
  state.selected = playback.album;
  state.selectedSide = playback.sideIndex;
  state.toast = "Tracking stopped — the play has been saved";

  if (!playback.album.serverId) {
    saveSamplePlayback();
    render();
    return;
  }
  render();
  try {
    const response = await fetch(`api/listens/${playback.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "stopped" })
    });
    // 404 means the side had already finished or another tab stopped it.
    if (!response.ok && response.status !== 404) throw new Error();
    void loadStats();
  } catch {
    state.toast = "The server could not stop this side.";
    await refreshPlayback();
    render();
  }
}

function attachEvents() {
  document.querySelectorAll("[data-page]").forEach(button => button.addEventListener("click", () => {
    state.page = button.dataset.page;
    render();
  }));
  document.querySelectorAll("[data-album]").forEach(button => button.addEventListener("click", () => loadRecord(button.dataset.album, state.page !== "home")));
  document.querySelectorAll("[data-load]").forEach(button => button.addEventListener("click", () => loadRecord(button.dataset.load)));
  document.querySelectorAll("[data-side]").forEach(button => button.addEventListener("click", () => {
    state.selectedSide = Number(button.dataset.side);
    render();
  }));
  document.querySelector("[data-input='home-search']")?.addEventListener("input", event => searchDeck(event.target.value));
  document.querySelector("[data-input='home-search']")?.addEventListener("keydown", event => {
    if (event.key === "Enter" && state.searchResults[0]) loadRecord(state.searchResults[0].id);
    if (event.key === "Escape") {
      event.target.value = "";
      searchDeck("");
    }
  });
  document.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", async () => {
    if (button.dataset.action === "track") await startPlayback();
    if (button.dataset.action === "stop") await stopPlayback();
    if (button.dataset.action === "eject") {
      state.selected = null;
      state.homeQuery = "";
      state.searchResults = [];
      render();
      document.querySelector("[data-input='home-search']")?.focus();
    }
    if (button.dataset.action === "sync") {
      button.classList.add("syncing");
      button.querySelector("span:last-child")?.replaceChildren(document.createTextNode("Syncing…"));
      try {
        if (!state.apiAvailable || !state.discogs.connected) throw new Error("Connect Discogs first.");
        const response = await fetch("api/collection/sync", { method: "POST" });
        if (!response.ok) throw new Error("Collection sync failed.");
        const result = await response.json();
        state.toast = `${result.releasesSeen} records synced from Discogs`;
        await checkApi();
      } catch (error) {
        state.toast = error.message;
      }
      render();
    }
    if (button.dataset.action === "discogs-connect") {
      window.location.assign("api/integrations/discogs/start");
    }
    if (button.dataset.action === "sort") {
      state.toast = "Sorted by recently added";
      render();
    }
    if (button.dataset.action === "profile") {
      state.toast = "Profile settings are coming soon";
      render();
    }
  }));
  document.querySelector("[data-input='search']")?.addEventListener("input", event => {
    state.query = event.target.value;
    render();
    document.querySelector("[data-input='search']")?.focus();
  });
  document.querySelector("[data-input='genre']")?.addEventListener("change", event => {
    state.genre = event.target.value;
    render();
  });
  document.querySelector("[data-input='frequency']")?.addEventListener("change", event => {
    state.syncFrequency = event.target.value;
    state.toast = `Collection refresh set to ${state.syncFrequency.toLowerCase()}`;
    render();
    if (state.apiAvailable) {
      fetch("api/settings/sync-frequency", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frequency: state.syncFrequency.toLowerCase() })
      }).catch(() => {});
    }
  });
  document.querySelector(".toggle")?.addEventListener("click", event => event.currentTarget.classList.toggle("on"));
}

restoreSamplePlayback();
render();
checkApi();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
