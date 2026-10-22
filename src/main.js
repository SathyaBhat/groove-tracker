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
  query: "",
  genre: "All genres",
  syncFrequency: "Weekly",
  toast: "",
  history: JSON.parse(localStorage.getItem("groove-history") || "[]"),
  apiAvailable: false,
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

function asUiAlbum(record) {
  const sides = record.sides?.length
    ? record.sides.map(side => ({
        name: `Side ${side.side}`,
        length: formatSideLength(side.durationSeconds),
        tracks: side.tracks.map(track => track.title)
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
        <button class="mini-profile" data-action="profile"><span class="avatar">SB</span><span><strong>Sathya</strong><small>78 records</small></span>${icon("more")}</button>
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
  const recent = state.history.length ? state.history.slice(0, 3) : [
    { album: albums[2], side: 1, startedAt: "Yesterday" },
    { album: albums[5], side: 0, startedAt: "Friday" },
    { album: albums[3], side: 0, startedAt: "Thursday" }
  ];
  const nowPlaying = state.isPlaying;
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
        <p class="scrobble-note">${icon("check")}Each track will be saved & scrobbled to Last.fm</p>
      </div>
      <div class="queue-panel">
        <div class="queue-head"><span>${state.selected.sides[state.selectedSide].name} queue</span><small>${state.selected.sides[state.selectedSide].tracks.length} tracks</small></div>
        <ol>
          ${state.selected.sides[state.selectedSide].tracks.map((track, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span><strong>${track}</strong><small>${i === 0 && nowPlaying ? "playing" : ""}</small></li>`).join("")}
        </ol>
      </div>
    </section>

    <section class="section-heading">
      <div><h2>Pick something from your shelf</h2><p>78 records in your Discogs collection</p></div>
      <button class="text-button" data-page="collection">Browse collection ${icon("arrow")}</button>
    </section>
    <section class="shelf-grid">${albums.slice(0, 4).map(albumCard).join("")}</section>

    <section class="lower-grid">
      <div class="recent-listens">
        <div class="section-heading compact"><div><h2>Recently played</h2></div><button class="text-button" data-page="stats">View history ${icon("arrow")}</button></div>
        ${recent.map(item => `<button class="recent-row" data-album="${item.album.id}"><span class="tiny-cover" style="--cover:url('${item.album.cover}')"></span><span><strong>${item.album.title}</strong><small>${item.album.artist} · ${item.album.sides[item.side].name}</small></span><em>${item.startedAt}</em>${icon("chevron")}</button>`).join("")}
      </div>
      <aside class="weekly-card">
        <span class="sparkle">✦</span><p class="eyebrow">This week</p><strong>4h 12m</strong><span>of intentional listening</span>
        <div class="week-bars"><i style="--h:40%"></i><i style="--h:66%"></i><i style="--h:24%"></i><i style="--h:100%"></i><i style="--h:72%"></i><i style="--h:30%"></i><i style="--h:9%"></i></div>
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
  const totalSeconds = state.history.reduce((sum, item) => sum + sideDuration(item.album, item.side), 0) + 252 * 60;
  const plays = state.history.length + 18;
  return layout(`<div class="page stats-page">
    <header class="page-head"><div><p class="eyebrow">Your listening room</p><h1>Good music, kept close.</h1></div><button class="period-button">Last 30 days <span>⌄</span></button></header>
    <section class="stat-grid">
      <article><span class="stat-icon amber">${icon("note")}</span><p>Time listening</p><strong>${formatDuration(totalSeconds)}</strong><small>↑ 18% from last month</small></article>
      <article><span class="stat-icon green">${icon("collection")}</span><p>Record sides played</p><strong>${plays}</strong><small>Across ${Math.min(12, plays)} albums</small></article>
      <article><span class="stat-icon pink">${icon("chart")}</span><p>Most played genre</p><strong>Soul</strong><small>6 sides this month</small></article>
    </section>
    <section class="analytics-grid">
      <article class="chart-card"><div class="card-title"><div><h2>Listening rhythm</h2><p>Minutes played each day</p></div><span class="chart-total">4h 12m</span></div><div class="bar-chart">${[26, 51, 19, 74, 100, 45, 67, 31, 88, 49, 73, 38, 61, 92].map((h, i) => `<span class="${i === 9 ? "highlight" : ""}" style="--value:${h}%"></span>`).join("")}</div><div class="chart-axis"><span>Sep 1</span><span>Sep 8</span><span>Sep 15</span><span>Sep 22</span></div></article>
      <article class="top-albums"><div class="card-title"><div><h2>On repeat</h2><p>Your most-played records</p></div></div>${albums.slice(0, 3).map((album, i) => `<button data-album="${album.id}"><span class="rank">0${i + 1}</span><span class="tiny-cover" style="--cover:url('${album.cover}')"></span><span><strong>${album.title}</strong><small>${album.artist}</small></span><em>${5 - i} sides</em></button>`).join("")}</article>
    </section>
    <section class="history-card"><div class="card-title"><div><h2>Listening history</h2><p>Every side, carefully saved.</p></div></div>
      ${(state.history.length ? state.history : [{album: albums[0], side: 0, startedAt: "Today, 9:41 AM"}, {album: albums[2], side: 1, startedAt: "Yesterday, 8:17 PM"}, {album: albums[1], side: 0, startedAt: "Sep 24, 6:32 PM"}]).map(item => `<div class="history-row"><span class="tiny-cover" style="--cover:url('${item.album.cover}')"></span><span><strong>${item.album.artist} — ${item.album.title}</strong><small>${item.album.sides[item.side].name} · ${item.album.sides[item.side].length} · Scrobbled</small></span><time>${item.startedAt}</time></div>`).join("")}</section>
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
        const now = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
        state.history.unshift({ album: state.selected, side: state.selectedSide, startedAt: `Today, ${now}` });
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
            .then(({ listen }) => { state.remoteListenId = listen.id; })
            .catch(() => {
              state.toast = "Tracking locally — the server could not save this listen.";
              render();
            });
        }
      } else {
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
