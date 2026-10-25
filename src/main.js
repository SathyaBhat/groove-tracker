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
  selected: albums[0],
  selectedSide: 0,
  isPlaying: false,
  playing: null,
  trackKey: "",
  query: "",
  genre: "All genres",
  syncFrequency: "Weekly",
  toast: "",
  history: JSON.parse(localStorage.getItem("groove-history") || "[]"),
  apiAvailable: false,
  stats: null,
  discogs: { connected: false, username: null },
  remoteListenId: null
};

const app = document.querySelector("#app");
const discogsResult = new URLSearchParams(window.location.search).get("discogs");

if (discogsResult) {
  state.toast = discogsResult === "connected"
    ? "Discogs connected — sync your collection when you’re ready."
    : "Discogs connection was cancelled.";
  window.history.replaceState({}, "", window.location.pathname);
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

// Which track of the side being played is on now, from the time since tracking started.
// Tracks without a known length count as 3 minutes, the same estimate the server uses for scrobbles.
function currentTrack() {
  const { album, side, startedAt } = state.playing;
  const { tracks, trackSeconds = [] } = album.sides[side];
  const elapsed = (Date.now() - startedAt) / 1000;
  let end = 0;
  for (let index = 0; index < tracks.length; index += 1) {
    end += trackSeconds[index] || 180;
    if (elapsed < end) return { index, title: tracks[index], total: tracks.length, finished: false };
  }
  return { index: tracks.length - 1, title: tracks[tracks.length - 1], total: tracks.length, finished: true };
}

setInterval(() => {
  if (!state.isPlaying || !state.playing || state.page !== "home") return;
  const current = currentTrack();
  const key = `${current.index}:${current.finished}`;
  if (key === state.trackKey) return;
  state.trackKey = key;
  render();
}, 1000);

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
      state.selected = syncedAlbums[0];
      void hydrateSelectedRecord(syncedAlbums[0].serverId);
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
    if (!response.ok) return;
    const { record } = await response.json();
    if (!record) return;
    const hydrated = asUiAlbum(record);
    const index = albums.findIndex(album => String(album.id) === String(serverId));
    if (index >= 0) albums[index] = hydrated;
    if (String(state.selected.id) === String(serverId)) {
      state.selected = hydrated;
      state.selectedSide = 0;
      render();
    }
  } catch {
    // A collection card still works with its cached summary if release details cannot load.
  }
}

function albumCard(album) {
  return `<button class="album-card ${state.selected.id === album.id ? "is-selected" : ""}" data-album="${album.id}">
    <span class="album-art" style="--cover:url('${album.cover}'); --c1:${album.colors[0]}; --c2:${album.colors[1]}"></span>
    <span class="album-meta">
      <strong>${album.title}</strong>
      <small>${album.artist}</small>
    </span>
    ${state.selected.id === album.id ? `<span class="card-check">${icon("check")}</span>` : ""}
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

function homePage() {
  const view = listeningView();
  const recent = view.history.slice(0, 3);
  const week = view.days.slice(-7);
  const weekMax = Math.max(...week.map(day => day.seconds), 1);
  const nowPlaying = state.isPlaying && state.playing;
  const current = nowPlaying ? currentTrack() : null;
  const sameSide = nowPlaying && state.playing.album.id === state.selected.id && state.playing.side === state.selectedSide;
  const selectedSide = state.selected.sides[state.selectedSide];
  const trackNote = nowPlaying
    ? current.finished
      ? `${icon("check")}<span>Side finished — tap to stop tracking</span>`
      : `<i class="pulse"></i><span>Now playing · ${current.index + 1} of ${current.total}<strong>${current.title}${state.playing.album.id === state.selected.id ? "" : ` — ${state.playing.album.title}`}</strong></span>`
    : `${icon("note")}<span>Starts with<strong>${selectedSide.tracks[0] || "—"}</strong></span>`;
  return layout(`<div class="page home-page">
    <header class="page-head">
      <div>
        <p class="eyebrow">${timeGreeting()}, Sathya</p>
        <h1>What’s spinning?</h1>
      </div>
      <button class="sync-button" data-action="sync">${icon("sync")}<span>Sync collection</span></button>
    </header>

    <section class="now-playing ${nowPlaying ? "is-playing" : ""}">
      <div class="playing-image-wrap">
        <div class="record-shadow"></div>
        <div class="big-record ${nowPlaying ? "spinning" : ""}" style="--c1:${state.selected.colors[0]};--c2:${state.selected.colors[1]}"><span></span></div>
        <span class="now-cover" style="--cover:url('${state.selected.cover}')"></span>
      </div>
      <div class="now-info">
        <span class="status-pill"><i></i>${nowPlaying ? "Now playing" : "Ready to play"}</span>
        <p class="eyebrow">${state.selected.artist}</p>
        <h2>${state.selected.title}</h2>
        <p class="release-meta">${state.selected.year} · ${state.selected.format} · ${state.selected.genre}</p>
        <div class="side-selector" role="group" aria-label="Choose record side">
          ${state.selected.sides.map((side, index) => `<button class="${state.selectedSide === index ? "selected" : ""}" data-side="${index}"><span>${side.name}</span><small>${side.length}</small></button>`).join("")}
        </div>
        <button class="primary-button" data-action="track">
          ${icon(nowPlaying ? "note" : "play")}<span>${nowPlaying ? "Tracking this side" : `Start tracking ${state.selected.sides[state.selectedSide].name}`}</span>
        </button>
        <p class="current-track ${nowPlaying ? "is-live" : ""}">${trackNote}</p>
      </div>
      <div class="queue-panel">
        <div class="queue-head"><span>${state.selected.sides[state.selectedSide].name} queue</span><small>${state.selected.sides[state.selectedSide].tracks.length} tracks</small></div>
        <ol>
          ${state.selected.sides[state.selectedSide].tracks.map((track, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span><strong>${track}</strong><small>${sameSide && !current.finished && i === current.index ? "playing" : ""}</small></li>`).join("")}
        </ol>
      </div>
    </section>

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
  app.innerHTML = pages[state.page]();
  attachEvents();
  if (state.toast) setTimeout(() => { state.toast = ""; render(); }, 3200);
}

function selectAlbum(id, navigate = false) {
  state.selected = albums.find(album => String(album.id) === String(id)) || albums[0];
  state.selectedSide = 0;
  if (navigate) state.page = "home";
  render();
  if (state.selected.serverId) void hydrateSelectedRecord(state.selected.serverId);
}

function attachEvents() {
  document.querySelectorAll("[data-page]").forEach(button => button.addEventListener("click", () => {
    state.page = button.dataset.page;
    render();
  }));
  document.querySelectorAll("[data-album]").forEach(button => button.addEventListener("click", () => selectAlbum(button.dataset.album, state.page !== "home")));
  document.querySelectorAll("[data-side]").forEach(button => button.addEventListener("click", () => {
    state.selectedSide = Number(button.dataset.side);
    render();
  }));
  document.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", async () => {
    if (button.dataset.action === "track") {
      state.isPlaying = !state.isPlaying;
      if (state.isPlaying) {
        state.playing = { album: state.selected, side: state.selectedSide, startedAt: Date.now() };
        state.trackKey = "0:false";
        const now = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
        state.history.unshift({ album: state.selected, side: state.selectedSide, startedAt: `Today, ${now}`, at: new Date().toISOString() });
        localStorage.setItem("groove-history", JSON.stringify(state.history));
        state.toast = `${state.selected.sides[state.selectedSide].name} is now being tracked`;
        if (state.selected.serverId) {
          const side = state.selected.sides[state.selectedSide].name.replace("Side ", "");
          fetch("api/listens", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ collectionReleaseId: state.selected.serverId, side })
          })
            .then(response => response.ok ? response.json() : Promise.reject(new Error("Unable to save listen")))
            .then(({ listen }) => { state.remoteListenId = listen.id; void loadStats(); })
            .catch(() => {
              state.toast = "Tracking locally — the server could not save this listen.";
              render();
            });
        }
      } else {
        state.playing = null;
        state.toast = "Tracking stopped — the play has been saved";
        if (state.remoteListenId) {
          fetch(`api/listens/${state.remoteListenId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "stopped" })
          }).catch(() => {});
          state.remoteListenId = null;
        }
      }
      render();
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

render();
checkApi();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
