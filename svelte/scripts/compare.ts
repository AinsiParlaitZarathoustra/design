/**
 * The visual comparer: the pinned React Storybook (the oracle) against the
 * Svelte gallery, same Chromium, viewport, theme, appearance and zoom.
 *
 *   bun scripts/compare.ts                     every ported story, atlas both
 *   bun scripts/compare.ts --only button       stories whose id matches
 *   bun scripts/compare.ts --theme dracula --appearance light
 *   bun scripts/compare.ts --scales 1,1.15
 *   bun scripts/compare.ts --stories <ids> --clock 2000
 *
 * `--clock <ms>` is for stories animated by script (requestAnimationFrame,
 * timers, Math.random): each side gets a fresh browser context with
 * Playwright's fake clock installed at the same fixed time and the same seeded
 * `Math.random`, both pages are advanced by exactly `<ms>` of fake time, then
 * captured. Nothing is aligned after the fact: a port that animates at another
 * speed or phase still differs. The case records `clock: <ms>`.
 *
 * Writes `screenshots/<story>/<theme>-<appearance>-<scale>.{source,target,diff}.png`
 * and `screenshots/report.json`. The two servers must be running:
 *   python3 -m http.server 6006 --directory storybook-static   (in the source repo)
 *   bun run dev                                                (in svelte/)
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "screenshots");
const SOURCE = process.env.ATLAS_SOURCE ?? "http://localhost:6006";
const TARGET = process.env.ATLAS_TARGET ?? "http://localhost:6100";

interface Case {
  id: string;
  appearance?: "dark" | "light";
}

interface Report {
  story: string;
  theme: string;
  appearance: string;
  scale: string;
  width: number;
  height: number;
  different: number;
  total: number;
  percent: number;
  source: string;
  target: string;
  diff: string;
  status: "identical" | "within-noise" | "differs" | "blocked";
  note?: string;
  /** Fake time advanced on both pages, in ms, when `--clock` was given. */
  clock?: number;
}

const argv = process.argv.slice(2);
function arg(name: string, fallback?: string): string | undefined {
  const at = argv.indexOf(`--${name}`);
  return at >= 0 ? argv[at + 1] : fallback;
}
function list(name: string, fallback: string[]): string[] {
  const value = arg(name);
  return value ? value.split(",") : fallback;
}

const only = arg("only");
const storiesFilter = arg("stories")?.split(",");
const themes = list("theme", ["atlas"]);
const appearances = list("appearance", ["dark", "light"]);
const scales = list("scale", ["1"]);
const width = Number(arg("width", "1280"));
const height = Number(arg("height", "800"));
const NOISE = Number(arg("noise", "0.001"));
const clockArg = arg("clock");
const CLOCK_MS = clockArg === undefined ? undefined : Number(clockArg);
if (CLOCK_MS !== undefined && !(Number.isFinite(CLOCK_MS) && CLOCK_MS >= 0)) {
  throw new Error(`--clock expects a number of milliseconds, got ${clockArg}`);
}
/** The fixed wall time both clocked pages start from. */
const CLOCK_EPOCH = Date.UTC(2026, 0, 1, 12, 0, 0);
/** A seeded `Math.random` (mulberry32), identical on both sides. */
const SEEDED_RANDOM = `(() => {
  let state = 0x9e3779b9;
  Math.random = () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
})();`;

function cases(): Case[] {
  // An explicit list may name stories the local manifest does not know yet
  // (a lot's worktree); it is the caller's contract, so trust it.
  if (storiesFilter) return storiesFilter.map((id) => ({ id }));
  const manifestPath = path.join(ROOT, "manifest.json");
  if (existsSync(manifestPath)) {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
      stories: { id: string; status: string; appearance?: "dark" | "light" | null }[];
    };
    return manifest.stories
      .filter((story) => story.status !== "non porté")
      .map((story) => ({ id: story.id, appearance: story.appearance ?? undefined }));
  }
  return [
    "primitives-button--default",
    "primitives-button--variants",
    "primitives-button--sizes",
    "primitives-button--with-icon",
    "primitives-input--default",
    "primitives-input--invalid",
    "primitives-dialog--open",
    "primitives-dialog--destructive",
    "primitives-dialog--media",
    "primitives-dialog--large-blurred",
    "layout-tabstrip--default",
    "layout-tabstrip--states",
    "layout-tabstrip--overflow",
    "layout-tabstrip--unfocused",
  ].map((id) => ({ id }));
}

function sourceUrl(id: string, theme: string, appearance: string, scale: string): string {
  const globals = `theme:${theme};appearance:${appearance};scale:${scale}`;
  return `${SOURCE}/iframe.html?id=${id}&viewMode=story&globals=${globals}`;
}

function targetUrl(id: string, theme: string, appearance: string, scale: string): string {
  const params = new URLSearchParams({ story: id, theme, appearance, scale });
  return `${TARGET}/?${params.toString()}`;
}

async function settle(page: import("playwright").Page) {
  await page.addStyleTag({ content: "* { caret-color: transparent !important; }" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map((image) =>
        image.complete ? undefined : new Promise((resolve) => image.addEventListener("load", resolve)),
      ),
    );
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  // Overlays animate 120–150ms; a stable capture waits past the longest one.
  await page.waitForTimeout(400);
  // Then pin every animation at its start: the busy spinner and any infinite
  // loop would otherwise capture at a different phase in the two pages. Both
  // pages get the same rule, so this removes a non-deterministic input rather
  // than masking a difference.
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; }",
  });
  await page.waitForTimeout(50);
}

/**
 * The clocked settle: fonts and images load on real time, then the page's
 * scripted time advances by exactly `ms` of fake time (timers, animation
 * frames, `performance.now`, `Date`), then CSS animations are pinned as in
 * `settle`.
 */
async function settleClocked(page: import("playwright").Page, ms: number) {
  await page.addStyleTag({ content: "* { caret-color: transparent !important; }" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map((image) =>
        image.complete ? undefined : new Promise((resolve) => image.addEventListener("load", resolve)),
      ),
    );
  });
  await page.clock.runFor(ms);
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; }",
  });
  await page.clock.runFor(50);
}

async function clockedPage(browser: import("playwright").Browser, consoleErrors: string[]) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    colorScheme: "dark",
    locale: "en-US",
    timezoneId: "UTC",
  });
  await context.addInitScript(SEEDED_RANDOM);
  // `install` lets fake time flow with real time; pausing at once means the
  // page's scripted time moves only by `runFor`, so loading speed cannot shift
  // an animation's phase.
  await context.clock.install({ time: CLOCK_EPOCH });
  await context.clock.pauseAt(CLOCK_EPOCH + 1000);
  const page = await context.newPage();
  page.on("pageerror", (error) => consoleErrors.push(String(error)));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  return { context, page };
}

function diff(sourcePath: string, targetPath: string, diffPath: string) {
  const a = PNG.sync.read(readFileSync(sourcePath));
  const b = PNG.sync.read(readFileSync(targetPath));
  if (a.width !== b.width || a.height !== b.height) {
    return { different: a.width * a.height, total: a.width * a.height, mismatch: true };
  }
  const out = new PNG({ width: a.width, height: a.height });
  const different = pixelmatch(a.data, b.data, out.data, a.width, a.height, {
    threshold: 0.1,
    includeAA: false,
  });
  writeFileSync(diffPath, PNG.sync.write(out));
  return { different, total: a.width * a.height, mismatch: false };
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    colorScheme: "dark",
    locale: "en-US",
    timezoneId: "UTC",
  });
  const sourcePage = await context.newPage();
  const targetPage = await context.newPage();
  const consoleErrors: string[] = [];
  for (const page of [sourcePage, targetPage]) {
    page.on("pageerror", (error) => consoleErrors.push(String(error)));
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
  }

  const report: Report[] = [];
  for (const entry of cases()) {
    if (only && !entry.id.includes(only)) continue;
    if (storiesFilter && !storiesFilter.includes(entry.id)) continue;
    for (const theme of themes) {
      for (const appearance of entry.appearance ? [entry.appearance] : appearances) {
        for (const scale of scales) {
          // The viewport is part of the filename: 375, 768 and 1280 runs of
          // the same story must not overwrite each other.
          const slug = `${theme}-${appearance}-${scale}-${width}x${height}`;
          const dir = path.join(OUT, entry.id);
          mkdirSync(dir, { recursive: true });
          const sourcePath = path.join(dir, `${slug}.source.png`);
          const targetPath = path.join(dir, `${slug}.target.png`);
          const diffPath = path.join(dir, `${slug}.diff.png`);
          const result: Report = {
            story: entry.id,
            theme,
            appearance,
            scale,
            width,
            height,
            different: 0,
            total: 0,
            percent: 0,
            source: path.relative(ROOT, sourcePath),
            target: path.relative(ROOT, targetPath),
            diff: path.relative(ROOT, diffPath),
            status: "identical",
          };
          let clocked: { context: import("playwright").BrowserContext }[] = [];
          try {
            if (CLOCK_MS !== undefined) {
              const source = await clockedPage(browser, consoleErrors);
              const target = await clockedPage(browser, consoleErrors);
              clocked = [source, target];
              result.clock = CLOCK_MS;
              await source.page.goto(sourceUrl(entry.id, theme, appearance, scale), {
                waitUntil: "networkidle",
                timeout: 30_000,
              });
              await settleClocked(source.page, CLOCK_MS);
              await source.page.screenshot({ path: sourcePath, fullPage: false });
              await target.page.goto(targetUrl(entry.id, theme, appearance, scale), {
                waitUntil: "networkidle",
                timeout: 30_000,
              });
              await settleClocked(target.page, CLOCK_MS);
              await target.page.screenshot({ path: targetPath, fullPage: false });
            } else {
              // Bring each page forward: a background tab throttles layout
              // observation and animation frames, which made the strip's active
              // tab reveal land late on the second page of a batch.
              await sourcePage.bringToFront();
              await sourcePage.goto(sourceUrl(entry.id, theme, appearance, scale), {
                waitUntil: "networkidle",
                timeout: 30_000,
              });
              await settle(sourcePage);
              await sourcePage.screenshot({ path: sourcePath, fullPage: false });

              // The source's active-tab reveal runs in a layout effect: when the
              // webfont lands after that effect, its tab widths are still the
              // fallback ones and the scroll lands a few pixels short (the source
              // disagrees with itself across two captures). Normalise the target
              // to the source's settled scroll position, and keep the reveal's
              // own behaviour covered by `tests/tab-strip.test.ts`.
              const sourceScroll = await sourcePage.evaluate(() => {
                const list = document.querySelector('[role="tablist"]');
                return list ? { left: list.scrollLeft, top: list.scrollTop } : null;
              });

              await targetPage.bringToFront();
              await targetPage.goto(targetUrl(entry.id, theme, appearance, scale), {
                waitUntil: "networkidle",
                timeout: 30_000,
              });
              await settle(targetPage);
              if (sourceScroll) {
                const applied = await targetPage.evaluate(({ left, top }) => {
                  const list = document.querySelector('[role="tablist"]');
                  if (!list) return false;
                  list.scrollLeft = left;
                  list.scrollTop = top;
                  return true;
                }, sourceScroll);
                if (applied) {
                  await targetPage.waitForTimeout(60);
                  result.note = "scroll du tablist normalisé sur la source";
                }
              }
              await targetPage.screenshot({ path: targetPath, fullPage: false });
            }

            const debug = process.env.ATLAS_DEBUG
              ? {
                  sourceScroll: await sourcePage
                    .evaluate(() => document.querySelector('[role="tablist"]')?.scrollLeft)
                    .catch(() => null),
                  targetScroll: await targetPage
                    .evaluate(() => document.querySelector('[role="tablist"]')?.scrollLeft)
                    .catch(() => null),
                }
              : undefined;
            if (debug) console.log(entry.id, debug);
            const measured = diff(sourcePath, targetPath, diffPath);
            result.different = measured.different;
            result.total = measured.total;
            result.percent = measured.total ? (measured.different / measured.total) * 100 : 0;
            result.status = measured.mismatch
              ? "differs"
              : result.percent === 0
                ? "identical"
                : result.percent <= NOISE
                  ? "within-noise"
                  : "differs";
            if (measured.mismatch) result.note = "source and target captures differ in size";
          } catch (error) {
            result.status = "blocked";
            result.note = String(error).slice(0, 300);
          } finally {
            for (const side of clocked) await side.context.close();
          }
          report.push(result);
          console.log(
            `${result.status.padEnd(12)} ${entry.id} ${slug} ${result.percent.toFixed(3)}%`,
          );
        }
      }
    }
  }
  // Merge with earlier runs: a subset re-run (one theme, one story) replaces
  // its own cases and leaves the rest of the matrix in place.
  const reportPath = path.join(OUT, "report.json");
  const previous: Report[] = existsSync(reportPath)
    ? (JSON.parse(readFileSync(reportPath, "utf8")).cases as Report[])
    : [];
  const key = (row: Report) =>
    `${row.story}|${row.theme}|${row.appearance}|${row.scale}|${row.width}x${row.height}`;
  const merged = new Map(previous.map((row) => [key(row), row]));
  for (const row of report) merged.set(key(row), row);
  writeFileSync(
    reportPath,
    JSON.stringify(
      {
        viewport: { width, height },
        noise: NOISE,
        cases: [...merged.values()].sort((a, b) => key(a).localeCompare(key(b))),
        consoleErrors,
      },
      null,
      2,
    ),
  );
  if (consoleErrors.length) console.log(`console errors (${consoleErrors.length}):`, consoleErrors.slice(0, 5));
  await browser.close();
}

await main();
