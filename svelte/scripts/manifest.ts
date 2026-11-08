/**
 * The contract inventory (step 0B): every public export of `@tryatlas/design`
 * 0.1.15 and every story in its built `index.json`, with the Svelte port's
 * status, evidence and reverse links.
 *
 *   bun scripts/manifest.ts
 *
 * Writes `manifest.json` (for scripts) and `MANIFEST.md` (for a reader). The
 * source tree is read-only; the pinned SHA comes from `git rev-parse HEAD` in
 * `ATLAS_SOURCE` (default: ../../design).
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.resolve(process.env.ATLAS_SOURCE ?? path.join(ROOT, "../../design"));

const ENTRIES = [
  { entry: ".", file: "src/index.ts" },
  { entry: "./variants", file: "src/variants.ts" },
  { entry: "./theme", file: "src/theme/index.ts" },
  { entry: "./session", file: "src/session.ts" },
  { entry: "./blocks", file: "src/components/blocks/index.ts" },
  { entry: "./timeline-calendar", file: "src/components/blocks/timeline-calendar.tsx" },
  { entry: "./checkpoint-trace", file: "src/components/blocks/checkpoint-trace.tsx" },
  { entry: "./animations", file: "src/lib/infinite-animations.ts" },
  { entry: "./ratchet", file: "src/ratchet/index.ts" },
];

/** What the Svelte port exports, and where. Keep in step with `src/index.ts`. */
const PORTED_EXPORTS: Record<string, { module: string; tests?: string[] }> = {
  Icon: { module: "src/ui/icon.svelte", tests: ["tests/primitives.test.ts"] },
  ICON_SIZES: { module: "src/ui/icon.svelte", tests: ["tests/primitives.test.ts"] },
  ICON_STROKE_WIDTH: { module: "src/ui/icon.svelte", tests: ["tests/primitives.test.ts"] },
  Button: { module: "src/ui/button.svelte", tests: ["tests/primitives.test.ts"] },
  buttonVariants: { module: "src/ui/button-variants.ts", tests: ["tests/primitives.test.ts"] },
  IconButton: { module: "src/ui/icon-button.svelte", tests: ["tests/primitives.test.ts"] },
  iconButtonVariants: { module: "src/ui/icon-button-variants.ts" },
  Input: { module: "src/ui/input.svelte", tests: ["tests/input.test.ts"] },
  inputVariants: { module: "src/ui/input-variants.ts", tests: ["tests/input.test.ts"] },
  Kbd: { module: "src/ui/kbd.svelte", tests: ["tests/primitives.test.ts"] },
  KbdCombo: { module: "src/ui/kbd-combo.svelte", tests: ["tests/primitives.test.ts"] },
  KbdKeys: { module: "src/ui/kbd-keys.svelte" },
  Badge: { module: "src/ui/badge.svelte", tests: ["tests/primitives.test.ts"] },
  badgeVariants: { module: "src/ui/badge-variants.ts" },
  kbdVariants: { module: "src/ui/kbd-variants.ts" },
  Hint: { module: "src/ui/hint.svelte" },
  Spinner: { module: "src/components/ui/spinner.svelte", tests: ["tests/tab-strip.test.ts"] },
  Dialog: { module: "src/ui/dialog/dialog.svelte", tests: ["tests/dialog.test.ts"] },
  DialogClose: { module: "src/ui/dialog/dialog-close.svelte", tests: ["tests/dialog.test.ts"] },
  DialogContent: { module: "src/ui/dialog/dialog-content.svelte", tests: ["tests/dialog.test.ts"] },
  DialogDescription: { module: "src/ui/dialog/dialog-description.svelte", tests: ["tests/dialog.test.ts"] },
  DialogFooter: { module: "src/ui/dialog/dialog-footer.svelte", tests: ["tests/dialog.test.ts"] },
  DialogHeader: { module: "src/ui/dialog/dialog-header.svelte", tests: ["tests/dialog.test.ts"] },
  DialogTitle: { module: "src/ui/dialog/dialog-title.svelte", tests: ["tests/dialog.test.ts"] },
  DialogTrigger: { module: "src/ui/dialog/dialog-trigger.svelte", tests: ["tests/dialog.test.ts"] },
  TabStrip: { module: "src/components/layout/tab-strip.svelte", tests: ["tests/tab-strip.test.ts"] },
  cn: { module: "src/lib/utils.ts", tests: ["tests/primitives.test.ts"] },
  IconSize: { module: "src/ui/icon.svelte" },
  TabStripItem: { module: "src/components/layout/tab-strip-logic.ts" },
};

/** The stories the gallery renders, with the evidence each one carries. */
const PORTED_STORIES: Record<
  string,
  { mode: "element" | "page"; tests?: string[]; appearance?: "dark" | "light" }
> = {
  "primitives-button--default": { mode: "element" },
  "primitives-button--variants": { mode: "element" },
  "primitives-button--sizes": { mode: "element" },
  "primitives-button--secondary": { mode: "element" },
  "primitives-button--outline": { mode: "element" },
  "primitives-button--ghost": { mode: "element" },
  "primitives-button--destructive": { mode: "element" },
  "primitives-button--ghost-destructive": { mode: "element" },
  "primitives-button--disabled": { mode: "element" },
  "primitives-button--loading": { mode: "element" },
  "primitives-button--with-icon": { mode: "element" },
  "primitives-button--pressed": { mode: "element" },
  "primitives-button--long-text": { mode: "element" },
  "primitives-input--default": { mode: "element", tests: ["tests/input.test.ts"] },
  "primitives-input--filled": { mode: "element", tests: ["tests/input.test.ts"] },
  "primitives-input--sizes": { mode: "element" },
  "primitives-input--disabled": { mode: "element" },
  "primitives-input--invalid": { mode: "element" },
  "primitives-input--long-text": { mode: "element" },
  "primitives-input--with-icon": { mode: "element" },
  "primitives-dialog--default": { mode: "element", tests: ["tests/dialog.test.ts"] },
  "primitives-dialog--open": { mode: "page", tests: ["tests/dialog.test.ts"] },
  "primitives-dialog--destructive": { mode: "page", tests: ["tests/dialog.test.ts"] },
  "primitives-dialog--without-close-button": { mode: "page", tests: ["tests/dialog.test.ts"] },
  "primitives-dialog--long-text": { mode: "page" },
  "primitives-dialog--media": { mode: "page" },
  "primitives-dialog--large-blurred": { mode: "page" },
  "layout-tabstrip--default": { mode: "element", tests: ["tests/tab-strip.test.ts"] },
  "layout-tabstrip--states": { mode: "element", tests: ["tests/tab-strip.test.ts"] },
  "layout-tabstrip--unfocused": { mode: "element", tests: ["tests/tab-strip.test.ts"] },
  "layout-tabstrip--none-active": { mode: "element", tests: ["tests/tab-strip.test.ts"] },
  "layout-tabstrip--overflow": { mode: "element", tests: ["tests/tab-strip.test.ts"] },
  "layout-tabstrip--empty": { mode: "element" },
  "layout-tabstrip--behaviour-opt-outs": { mode: "element", tests: ["tests/tab-strip.test.ts"] },
  "layout-tabstrip--drag-to-reorder": { mode: "element" },
  "layout-tabstrip--light": { mode: "element", appearance: "light" },
  "primitives-badge--default": { mode: "element", tests: ["tests/primitives.test.ts"] },
  "primitives-badge--variants": { mode: "element" },
  "primitives-badge--sizes": { mode: "element" },
  "primitives-badge--with-icon": { mode: "element" },
  "primitives-badge--long-text": { mode: "element" },
  "primitives-badge--empty": { mode: "element" },
  "primitives-kbd--default": { mode: "element", tests: ["tests/primitives.test.ts"] },
  "primitives-kbd--sizes": { mode: "element" },
  "primitives-kbd--combo": { mode: "element", tests: ["tests/primitives.test.ts"] },
  "primitives-kbd--variants": { mode: "element" },
  "primitives-kbd--platforms": { mode: "element" },
  "primitives-kbd--long-text": { mode: "element" },
  "primitives-icon--default": { mode: "element", tests: ["tests/primitives.test.ts"] },
  "primitives-icon--sizes": { mode: "element" },
  "primitives-icon--muted": { mode: "element" },
  "primitives-icon--beside-text": { mode: "element" },
};

/** A small, explicit map for the families still to port; a wave owns them. */
function waveFor(file: string): string {
  if (file.includes("/ui/")) return "B — primitives et formulaires";
  if (/dialog|popover|tooltip|menu|select|command|color-picker/.test(file)) return "B — overlays et menus";
  if (file.includes("/layout/") || file.includes("/shell/")) return "C — layout et shell";
  if (file.includes("/components/ui/") || file.includes("/patterns/")) return "C — galerie et patterns";
  if (/session|comms|code-surface|canvas/.test(file)) return "C — surfaces de produit";
  if (/blocks|globe|dither|marquee|animation/.test(file)) return "C — blocs optionnels";
  return "B/C — à répartir";
}

interface StoryReport {
  story: string;
  theme: string;
  appearance: string;
  scale: string;
  status: string;
  percent: number;
}

const reportPath = path.join(ROOT, "screenshots/report.json");
const reports: StoryReport[] = existsSync(reportPath)
  ? (JSON.parse(readFileSync(reportPath, "utf8")).cases as StoryReport[])
  : [];

function evidenceFor(id: string) {
  const cases = reports.filter((entry) => entry.story === id);
  return {
    captures: cases.length,
    identical: cases.filter((entry) => entry.status === "identical").length,
    withinNoise: cases.filter((entry) => entry.status === "within-noise").length,
    differs: cases.filter((entry) => entry.status === "differs").length,
    blocked: cases.filter((entry) => entry.status === "blocked").length,
    maxPercent: cases.reduce((max, entry) => Math.max(max, entry.percent), 0),
  };
}

const index = JSON.parse(readFileSync(path.join(SOURCE, "storybook-static/index.json"), "utf8")) as {
  entries: Record<
    string,
    {
      id: string;
      name: string;
      title: string;
      type: string;
      importPath?: string;
      exportName?: string;
    }
  >;
};

const stories = Object.values(index.entries).filter((entry) => entry.type === "story");

const storyFiles = new Map<string, string>();
for (const story of stories) {
  if (story.importPath) storyFiles.set(story.id, story.importPath);
}

function readStorySource(story: { id: string; importPath?: string }) {
  if (!story.importPath) return "";
  const full = path.join(SOURCE, story.importPath);
  return existsSync(full) ? readFileSync(full, "utf8") : "";
}

const sources = new Map<string, string>();
for (const story of stories) {
  const file = (story.importPath ?? "").replace(/^\.\//, "");
  if (file && !sources.has(file)) sources.set(file, readStorySource(story));
}

const storyRows = stories.map((story) => {
  const source = readStorySource(story);
  const globalMatch = source.match(/globals:\s*\{([^}]*)\}/);
  const play = /\bplay\s*:/.test(source);
  const render = /\brender\s*:/.test(source);
  const ported = PORTED_STORIES[story.id];
  const evidence = evidenceFor(story.id);
  let status: string;
  if (!ported) status = "non porté";
  else if (evidence.blocked > 0) status = "bloqué";
  else if (evidence.captures > 0 && evidence.differs === 0) status = "vérifié";
  // Below 0.01 % a diff is one glyph's antialiasing, not a structural change;
  // it stays visible as `écart identifié` rather than being called verified.
  else if (evidence.captures > 0 && evidence.maxPercent < 0.01) status = "écart identifié";
  else status = "porté";
  return {
    id: story.id,
    title: story.title,
    name: story.name,
    file: story.importPath?.replace(/^\.\//, "") ?? null,
    exportName: story.exportName ?? null,
    play,
    customRender: render,
    globals: globalMatch?.[1].trim() ?? null,
    svelte: ported ? `gallery ?story=${story.id}` : null,
    mode: ported?.mode ?? null,
    appearance: ported?.appearance ?? null,
    status,
    evidence,
    tests: ported?.tests ?? [],
    owner: ported ? "lot témoin" : waveFor(story.importPath ?? ""),
  };
});

interface ExportRow {
  name: string;
  entries: string[];
  source: string | null;
  svelte: string | null;
  status: string;
  stories: string[];
  tests: string[];
  kind: "value" | "type";
}

const exportMap = new Map<string, ExportRow>();

// Enumerate with the TypeScript checker, not a runtime import: `export *` and
// `export type` are part of the public contract, and only the checker sees
// them. The runtime subset is the symbols that also carry a value flag.
const config = ts.readConfigFile(path.join(SOURCE, "tsconfig.json"), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, SOURCE);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const checker = program.getTypeChecker();

function resolve(symbol: ts.Symbol): ts.Symbol {
  return symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
}

for (const entry of ENTRIES) {
  const file = path.join(SOURCE, entry.file);
  if (!existsSync(file)) continue;
  const sourceFile = program.getSourceFile(file);
  if (!sourceFile) {
    console.warn(`manifest: ${entry.file} is not in the source program`);
    continue;
  }
  const moduleSymbol =
    checker.getSymbolAtLocation(sourceFile) ??
    (sourceFile as ts.SourceFile & { symbol?: ts.Symbol }).symbol;
  if (!moduleSymbol) continue;
  for (const symbol of checker.getExportsOfModule(moduleSymbol)) {
    const name = symbol.getName();
    if (name === "default") continue;
    const target = resolve(symbol);
    const kind = target.flags & ts.SymbolFlags.Value ? "value" : "type";
    const row = exportMap.get(name) ?? {
      name,
      entries: [],
      source: entry.file,
      svelte: null,
      status: "non porté",
      stories: [],
      tests: [],
      kind,
    };
    if (!row.entries.includes(entry.entry)) row.entries.push(entry.entry);
    exportMap.set(name, row);
  }
}

for (const row of exportMap.values()) {
  const ported = PORTED_EXPORTS[row.name];
  if (ported) {
    row.svelte = ported.module;
    row.status = ported.tests?.length ? "vérifié" : "porté";
    row.tests = ported.tests ?? [];
  }
  // Reverse links only through imports: a component name appears in prose and
  // in `argsTypes` all over the corpus, which made every story look related.
  const importPattern = new RegExp(
    `import\\s*\\{[^}]*\\b${row.name}\\b[^}]*\\}\\s*from`,
    "s",
  );
  for (const story of storyRows) {
    const source = sources.get(story.file ?? "");
    if (source && importPattern.test(source)) row.stories.push(story.id);
  }
}

const exportsRows = [...exportMap.values()].sort((a, b) => a.name.localeCompare(b.name));

const assets = [
  {
    kind: "css",
    path: "src/styles/styles.css",
    status: "vérifié",
    note: "copié du SHA ; importé par la galerie et le consommateur",
  },
  {
    kind: "css",
    path: "src/styles/styles-core.css",
    status: "vérifié",
    note: "copié du SHA",
  },
  {
    kind: "css",
    path: "src/styles/themes.css",
    status: "vérifié",
    note: "généré : `bun run theme:check` passe sur les 15 thèmes",
  },
  {
    kind: "tokens",
    path: "keys.toml",
    status: "vérifié",
    note: "source unique, réutilisée sans modification",
  },
  {
    kind: "themes",
    path: "themes/*.toml",
    status: "vérifié",
    note: "15 thèmes, résolution testée sur les 30 combinaisons",
  },
  {
    kind: "theme-engine",
    path: "src/theme/*.ts",
    status: "vérifié",
    note: "copié du SHA ; tests de résolution importés",
  },
  {
    kind: "notices",
    path: "THIRD_PARTY_NOTICES.md",
    status: "vérifié",
    note: "copié du SHA, distribué dans le tarball",
  },
  {
    kind: "license",
    path: "LICENSE",
    status: "vérifié",
    note: "Apache-2.0, copié du SHA",
  },
];

const coverage = {
  exports: {
    total: exportsRows.length,
    ported: exportsRows.filter((row) => row.status !== "non porté").length,
    verified: exportsRows.filter((row) => row.status === "vérifié").length,
    missing: exportsRows.filter((row) => row.status === "non porté").length,
  },
  stories: {
    total: storyRows.length,
    ported: storyRows.filter((row) => row.status !== "non porté").length,
    verified: storyRows.filter((row) => row.status === "vérifié").length,
    missing: storyRows.filter((row) => row.status === "non porté").length,
  },
};

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  source: {
    repo: SOURCE,
    sha: execFileSync("git", ["rev-parse", "HEAD"], { cwd: SOURCE }).toString().trim(),
    package: "@tryatlas/design",
    version: JSON.parse(readFileSync(path.join(SOURCE, "package.json"), "utf8")).version,
    license: "Apache-2.0",
    storybook: {
      entries: Object.keys(index.entries).length,
      stories: stories.length,
      files: storyFiles.size,
    },
  },
  target: {
    package: "@tryatlas/design-svelte",
    version: "0.1.15",
    worktree: path.resolve(ROOT, ".."),
    gallery: "bun run dev → http://localhost:6100/?story=<id>&theme=<theme>&appearance=dark|light&scale=0.9|1|1.15|1.3",
    screenshots: path.relative(ROOT, path.join(ROOT, "screenshots")),
  },
  coverage,
  exports: exportsRows,
  stories: storyRows,
  assets,
};

writeFileSync(path.join(ROOT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

const lines = [
  "# Manifeste de migration — @tryatlas/design 0.1.15 → @tryatlas/design-svelte",
  "",
  `Généré le ${manifest.generatedAt} depuis \`${SOURCE}\` au SHA \`${manifest.source.sha}\`.`,
  "",
  "## Couverture",
  "",
  "| Contrat | Total | Portés | Vérifiés | Non portés |",
  "|---|---:|---:|---:|---:|",
  `| Exports publics | ${coverage.exports.total} | ${coverage.exports.ported} | ${coverage.exports.verified} | ${coverage.exports.missing} |`,
  `| Stories | ${coverage.stories.total} | ${coverage.stories.ported} | ${coverage.stories.verified} | ${coverage.stories.missing} |`,
  "",
  "## Exports (racine, variantes, thème, session, blocs, animations, ratchet)",
  "",
  "| Export | Entrées | Source | Svelte | Statut | Stories | Tests |",
  "|---|---|---|---|---|---|---|",
  ...exportsRows.map(
    (row) =>
      `| \`${row.name}\` | ${row.entries.join(", ")} | ${row.source} | ${row.svelte ?? "—"} | ${row.status} | ${row.stories.length} | ${row.tests.join(", ") || "—"} |`,
  ),
  "",
  "## Stories",
  "",
  "| id | Titre | Fichier | Svelte | Statut | Preuves | Propriétaire |",
  "|---|---|---|---|---|---|---|",
  ...storyRows.map(
    (row) =>
      `| \`${row.id}\` | ${row.title} / ${row.name} | ${row.file ?? "—"} | ${row.svelte ?? "—"} | ${row.status} | ${row.evidence.captures ? `${row.evidence.identical}/${row.evidence.captures} identiques, max ${row.evidence.maxPercent.toFixed(3)} %` : "—"} | ${row.owner} |`,
  ),
  "",
  "## Fondations et ressources",
  "",
  "| Type | Chemin | Statut | Note |",
  "|---|---|---|---|",
  ...assets.map((row) => `| ${row.kind} | \`${row.path}\` | ${row.status} | ${row.note} |`),
  "",
];

writeFileSync(path.join(ROOT, "MANIFEST.md"), lines.join("\n"));
console.log(
  `manifest: ${coverage.exports.total} exports (${coverage.exports.verified} vérifiés), ` +
    `${coverage.stories.total} stories (${coverage.stories.verified} vérifiées), ` +
    `${coverage.stories.missing} stories non portées`,
);
