// End-to-end playback checks, run inside the Playwright container by e2e/run.sh.
// CommonJS so NODE_PATH can resolve playwright-core from the shared deps volume.
const { chromium } = require("playwright-core");
const fs = require("node:fs");

const base = "http://localhost:5173/";
const artifacts = "/e2e/artifacts";
fs.mkdirSync(artifacts, { recursive: true });

const results = [];
const pageErrors = [];

async function check(name, fn) {
  try {
    await fn();
    results.push({ name, ok: true });
    console.log(`  ✓ ${name}`);
  } catch (error) {
    results.push({ name, ok: false, error: error.message.split("\n")[0] });
    console.log(`  ✗ ${name}\n      ${error.message.split("\n").slice(0, 3).join("\n      ")}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// textContent, not innerText: innerText applies CSS text-transform (the status pill is uppercase).
async function text(page, selector) {
  return (await page.locator(selector).first().textContent()).trim();
}

async function waitForText(page, selector, expected, timeout = 5000) {
  await page.locator(selector, { hasText: expected }).first().waitFor({ timeout });
}

function watch(page, label) {
  page.on("pageerror", error => pageErrors.push(`${label}: ${error.message}`));
  page.on("console", message => {
    if (message.type() === "error" && !/Failed to load resource/.test(message.text())) pageErrors.push(`${label} console: ${message.text()}`);
  });
  return page;
}

async function api(page, path, options = {}) {
  return page.evaluate(async ([path, options]) => {
    const response = await fetch(path, { headers: { "Content-Type": "application/json" }, ...options });
    return { status: response.status, body: await response.json().catch(() => null) };
  }, [path, options]);
}

async function stopEverything(page) {
  const { body } = await api(page, "api/listens/current");
  if (body?.listen) await api(page, `api/listens/${body.listen.id}`, { method: "PATCH", body: JSON.stringify({ status: "stopped" }) });
}

async function openHome(context, label) {
  const page = watch(await context.newPage(), label);
  await page.goto(base);
  await page.locator(".now-playing").waitFor();
  // Wait for the API check and the playback stream to settle.
  await page.waitForTimeout(800);
  return page;
}

async function loadFromSearch(page, query, title) {
  await page.fill("[data-input='home-search']", query);
  await page.locator("[data-load]", { hasText: title }).click();
  await waitForText(page, ".now-info h2", title);
  await page.locator(".primary-button:not([disabled])").waitFor();
}

(async () => {
  const browser = await chromium.launch();

  console.log("\nAPI-backed playback (desktop 1440×950)");
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 950 } });
  const tab1 = await openHome(desktop, "tab1");
  await stopEverything(tab1);
  await tab1.reload();
  await tab1.waitForTimeout(800);

  await check("home starts on an empty deck with a search box", async () => {
    assert(await tab1.locator(".deck-empty").count() === 1, "no .deck-empty deck");
    assert(await tab1.locator("[data-input='home-search']").isVisible(), "search box not visible");
    assert(await tab1.locator(".big-record").count() === 0, "a record is already on the platter");
  });
  await tab1.screenshot({ path: `${artifacts}/desktop-1-empty.png` });

  await check("search queries the collection and lists matches", async () => {
    await tab1.fill("[data-input='home-search']", "nina");
    await tab1.locator("[data-load]", { hasText: "I Put a Spell on You" }).waitFor({ timeout: 3000 });
    assert(await tab1.locator("[data-load]").count() === 1, `expected 1 result, got ${await tab1.locator("[data-load]").count()}`);
  });
  await tab1.screenshot({ path: `${artifacts}/desktop-2-search.png` });

  await check("no-match search says so", async () => {
    await tab1.fill("[data-input='home-search']", "zzzz");
    await waitForText(tab1, ".search-empty", "No records match", 3000);
  });

  await check("picking a result loads the record with the load animation", async () => {
    await loadFromSearch(tab1, "khruang", "Con Todo El Mundo");
    assert(await tab1.locator(".now-playing.just-loaded").count() === 1, "missing .just-loaded");
    assert(await tab1.locator(".big-record:not(.spinning)").count() === 1, "record should be still before play");
    assert((await text(tab1, ".status-pill")).includes("Ready to play"), "status is not Ready to play");
    assert((await text(tab1, ".current-track strong")) === "Cómo Me Quieres", "first track not shown");
  });
  await tab1.waitForTimeout(800);
  await tab1.screenshot({ path: `${artifacts}/desktop-3-loaded.png` });

  await check("Change record returns to the empty deck", async () => {
    await tab1.click("[data-action='eject']");
    assert(await tab1.locator(".deck-empty").count() === 1, "deck is not empty");
    await loadFromSearch(tab1, "khruang", "Con Todo El Mundo");
  });

  await check("playing a side spins the record and shows now playing / coming next", async () => {
    await tab1.click("[data-action='track']");
    await waitForText(tab1, ".status-pill", "Now playing · Side A");
    assert(await tab1.locator(".big-record.spinning").count() === 1, "record is not spinning");
    assert((await text(tab1, ".track-now strong")) === "Cómo Me Quieres", `now playing is ${await text(tab1, ".track-now strong")}`);
    assert((await text(tab1, ".coming-next strong")) === "Lady and Man", `coming next is ${await text(tab1, ".coming-next strong")}`);
    await tab1.locator("[data-action='stop']:not([disabled])").waitFor({ timeout: 3000 });
  });
  await tab1.waitForTimeout(1200);
  await tab1.screenshot({ path: `${artifacts}/desktop-4-playing.png` });

  await check("the server holds the playing side", async () => {
    const { body } = await api(tab1, "api/listens/current");
    assert(body.listen?.status === "playing" && body.listen.side === "A", `current listen: ${JSON.stringify(body.listen)?.slice(0, 120)}`);
    assert(body.listen.tracks.length === 3, "expected 3 tracks");
  });

  const tab2 = await openHome(desktop, "tab2");
  await check("a new tab shows the same side playing", async () => {
    await waitForText(tab2, ".status-pill", "Now playing · Side A");
    assert((await text(tab2, ".now-info h2")) === "Con Todo El Mundo", "different record in tab 2");
  });

  await check("a reload keeps the side playing", async () => {
    await tab1.reload();
    await waitForText(tab1, ".status-pill", "Now playing · Side A");
  });

  await check("both tabs advance to the next track at the same time", async () => {
    await waitForText(tab1, ".track-now strong", "Lady and Man", 9000);
    await waitForText(tab2, ".track-now strong", "Lady and Man", 2000);
    assert((await text(tab1, ".coming-next strong")) === "Maria También", "coming next did not advance");
    assert(await tab1.locator(".queue-panel li.is-played").count() === 1, "first track not marked played");
  });

  await check("stopping in one tab updates the other over SSE", async () => {
    await tab2.click("[data-action='stop']");
    await waitForText(tab1, ".status-pill", "Ready to play", 3000);
    assert(await tab1.locator(".big-record.spinning").count() === 0, "tab 1 is still spinning");
    const { body } = await api(tab1, "api/listens/current");
    assert(body.listen === null, "server still has a playing listen");
  });
  await tab2.close();

  await check("a side that runs out finishes and suggests the flip", async () => {
    await tab1.locator(".side-selector button", { hasText: "Side A" }).click();
    await tab1.click("[data-action='track']");
    await waitForText(tab1, ".status-pill", "Now playing · Side A");
    await waitForText(tab1, ".coming-next strong", "Flip to Side B", 16000);
    await waitForText(tab1, ".toast", "flip to Side B", 10000);
    assert(await tab1.locator(".side-selector button.selected", { hasText: "Side B" }).count() === 1, "Side B not selected after finish");
    const { body } = await api(tab1, "api/listens/current");
    assert(body.listen === null, "server did not complete the side");
  });

  await check("concurrent starts leave exactly one side playing", async () => {
    const responses = await tab1.evaluate(async () => {
      const ids = (await (await fetch("api/collection")).json()).records.map(record => record.id);
      const start = (id, side) => fetch("api/listens", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ collectionReleaseId: id, side }) }).then(r => r.status);
      return Promise.all([start(ids[0], "B"), start(ids[1], "A"), start(ids[1], "B")]);
    });
    assert(responses.every(status => status === 201), `start statuses: ${responses}`);
    const { body } = await api(tab1, "api/listens/current");
    assert(body.listen?.status === "playing", "nothing playing after concurrent starts");
    await stopEverything(tab1);
  });

  await check("invalid input is rejected", async () => {
    const bad = await api(tab1, "api/listens", { method: "POST", body: JSON.stringify({ collectionReleaseId: "not-a-uuid", side: "A" }) });
    const badSide = await api(tab1, "api/listens/00000000-0000-0000-0000-000000000000", { method: "PATCH", body: JSON.stringify({ status: "playing" }) });
    const missing = await api(tab1, "api/listens/00000000-0000-0000-0000-000000000000", { method: "PATCH", body: JSON.stringify({ status: "stopped" }) });
    assert(bad.status === 400 && badSide.status === 400 && missing.status === 404, `statuses ${bad.status}/${badSide.status}/${missing.status}`);
  });
  await desktop.close();

  console.log("\nPhone layout (390×844)");
  const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobile = await openHome(phone, "phone");
  await check("phone: empty deck, load and play", async () => {
    assert(await mobile.locator(".deck-empty").count() === 1, "no empty deck");
    await mobile.screenshot({ path: `${artifacts}/phone-1-empty.png`, fullPage: false });
    await loadFromSearch(mobile, "khruang", "Con Todo El Mundo");
    await mobile.waitForTimeout(800);
    await mobile.screenshot({ path: `${artifacts}/phone-2-loaded.png` });
    await mobile.click("[data-action='track']");
    await waitForText(mobile, ".status-pill", "Now playing");
    await mobile.waitForTimeout(1200);
    await mobile.screenshot({ path: `${artifacts}/phone-3-playing.png` });
    const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert(overflow <= 0, `page overflows horizontally by ${overflow}px`);
    await stopEverything(mobile);
  });
  await phone.close();

  console.log("\nSample mode (API unavailable)");
  const offline = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await offline.route("**/api/**", route => route.abort());
  const sample = await openHome(offline, "sample");
  await check("sample mode: search sample records and play", async () => {
    assert(await sample.locator(".deck-empty").count() === 1, "no empty deck");
    await loadFromSearch(sample, "rum", "Rumours");
    await sample.click("[data-action='track']");
    await waitForText(sample, ".status-pill", "Now playing · Side A");
  });
  await check("sample mode: reload and a second tab keep playing", async () => {
    await sample.reload();
    await waitForText(sample, ".status-pill", "Now playing · Side A");
    const other = await openHome(offline, "sample-tab2");
    await waitForText(other, ".status-pill", "Now playing · Side A");
    await other.click("[data-action='stop']");
    await waitForText(sample, ".status-pill", "Ready to play", 3000);
  });
  await offline.close();

  await browser.close();

  console.log("");
  if (pageErrors.length) {
    console.log("Page errors:");
    pageErrors.forEach(error => console.log(`  ${error}`));
  }
  const failed = results.filter(result => !result.ok);
  console.log(`${results.length - failed.length}/${results.length} checks passed${pageErrors.length ? `, ${pageErrors.length} page errors` : ""}.`);
  process.exit(failed.length || pageErrors.length ? 1 : 0);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
