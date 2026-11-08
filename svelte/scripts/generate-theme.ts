/**
 * Generates every derived copy of the theme system from its one hand-edited
 * source, `keys.toml`, and the built-in themes in `themes/` (ADR-0027).
 *
 *   bun scripts/generate-theme.ts           rewrite the generated files
 *   bun scripts/generate-theme.ts --check   fail if any is stale
 *
 * Outputs:
 *   src/theme/theme-key-registry.ts   the TS registry the resolver reads
 *   theme-rules/theme-keys.txt        key + description, read by desktop's Rust
 *   theme-rules/base-rules.txt        the `[[base]]` rules, run by desktop's Rust
 *   src/styles/themes.css             every built-in theme × appearance, resolved
 *   src/styles/default-theme.css      Atlas alone, both appearances, for styles-core.css
 *
 * Ported from desktop's `scripts/generate-theme-keys.mjs`. The two Rust tables
 * are byte-identical to what that script writes — banner included, which is
 * why it still names `crates/atlas-theme/keys.toml`: desktop copies them there
 * verbatim. Desktop keeps the two outputs that need its own tree: the JSON
 * Schema (written by `schemars`) and the table in `docs/reference/theme-keys.md`.
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parse as parseToml } from "smol-toml";
import { themeFromToml } from "../src/theme/parse-theme.ts";
import type { Theme } from "../src/theme/types.ts";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(REPO_ROOT, "keys.toml");
const SOURCE_REL = "keys.toml";
/** What the Rust tables' banner names: their path once desktop copies them. */
const RUST_SOURCE_REL = "crates/atlas-theme/keys.toml";
const RUST_COMMAND = "bun run theme:keys";
const COMMAND = "bun run theme";

export const OUTPUTS = {
  registry: "src/theme/theme-key-registry.ts",
  keyList: "theme-rules/theme-keys.txt",
  baseRules: "theme-rules/base-rules.txt",
  themesCss: "src/styles/themes.css",
  defaultThemeCss: "src/styles/default-theme.css",
};

/** shadcn's font stacks: base tokens with no `[[base]]` rule (desktop's
 *  `FONT_TOKENS`). They pass through the resolver untouched. */
export const FONT_TOKENS = ["font-sans", "font-serif", "font-mono"];

// The source is machine-shaped TOML read by the strict reader below, so its
// entries are loose records; every field is validated in `readSource`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Entry = Record<string, any>;
type Source = ReturnType<typeof readSource>;

/** The eight palette hues a key may name. Mirrored in `atlas-theme`. */
const PALETTE_KEYS = ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "pink"];

/**
 * The closed operation vocabulary. The value is how the transform is spelled in
 * the generated TS; `resolve-theme.ts` applies it to whichever source supplied
 * the colour. Adding an entry here means adding one to the registry preamble
 * below and, if it needs new inputs, to `DerivationContext` — and, because
 * base rules run in Rust too, to `crates/atlas-theme/src/derive.rs`.
 * `amount: false` marks an operation that takes none.
 */
const OPERATIONS: Record<
  string,
  { call: string; amount?: false; docs: (n?: string) => string; prose: (n?: string) => string }
> = {
  alpha: { call: "alpha", docs: (n) => `alpha ${n}`, prose: (n) => `alpha ${n}` },
  lighten: { call: "lighter", docs: (n) => `lighten ${n}`, prose: (n) => `lighten ${n}` },
  toward_background: {
    call: "towardBackground",
    docs: (n) => `mix ${n} → B:background`,
    prose: (n) => `mix ${n} toward base.background`,
  },
  toward_foreground: {
    call: "towardForeground",
    docs: (n) => `mix ${n} → B:foreground`,
    prose: (n) => `mix ${n} toward base.foreground`,
  },
  readable: {
    call: "readableOn",
    amount: false,
    docs: () => "readable: B:foreground or B:background",
    prose: () =>
      "whichever of base.foreground and base.background reads better on it (white or black while foreground itself is derived)",
  },
};

/** `op`/`amount` problems for a key, a derived variable or a base rule. */
function checkOperation(entry: Entry, at: string, problems: string[], { required = false } = {}) {
  if (entry.op === undefined) {
    if (required) problems.push(`${at}: missing \`op\``);
    if (entry.amount !== undefined) problems.push(`${at}: \`amount\` without an \`op\``);
    return;
  }
  const operation = OPERATIONS[entry.op];
  if (!operation) {
    problems.push(
      `${at}: unknown op \`${entry.op}\`; one of ${Object.keys(OPERATIONS).join(", ")}`,
    );
    return;
  }
  if (operation.amount === false) {
    if (entry.amount !== undefined) problems.push(`${at}: \`${entry.op}\` takes no \`amount\``);
    return;
  }
  const amount = Number(entry.amount?.number);
  if (!(amount > 0 && amount <= 1)) problems.push(`${at}: \`amount\` must be in (0, 1]`);
}

/** How a transform is spelled in the generated TS. */
const transformCall = (entry: Entry) => `${OPERATIONS[entry.op].call}(${entry.amount ?? ""})`;

// ─── A very small TOML reader ────────────────────────────────────────────────
// Deliberately not a dependency: `keys.toml` is ours and machine-shaped, and a
// parser for the handful of constructs it uses is shorter than the argument for
// adding a package. It is strict on purpose — anything it does not understand
// is an error with a line number rather than a silently dropped field.

class TomlError extends Error {}

function parseKeysToml(text: string): Entry {
  const lines = text.split("\n");
  const top: Entry = {};
  const arrays: Record<string, Entry[]> = {};
  let table: Entry = top;
  let index = 0;

  const fail = (message: string): never => {
    throw new TomlError(`${SOURCE_REL}:${index + 1}: ${message}`);
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) {
      index += 1;
      continue;
    }
    const arrayTable = trimmed.match(/^\[\[([a-z_]+)\]\]$/);
    if (arrayTable) {
      table = {};
      (arrays[arrayTable[1]] ??= []).push(table);
      index += 1;
      continue;
    }
    if (trimmed.startsWith("[")) fail(`only [[array]] tables are supported, got ${trimmed}`);
    const assignment = trimmed.match(/^([a-z_]+)\s*=\s*(.*)$/);
    if (!assignment) return fail(`expected \`name = value\`, got ${trimmed}`);
    const [, name, rest] = assignment;
    if (name in table) fail(`duplicate field \`${name}\``);
    if (rest.startsWith('"""')) {
      if (rest !== '"""') fail('a multi-line string must open with `"""` alone on the line');
      const body = [];
      index += 1;
      while (index < lines.length && lines[index].trim() !== '"""') {
        body.push(lines[index]);
        index += 1;
      }
      if (index >= lines.length) fail("unterminated multi-line string");
      table[name] = body.join("\n").trim();
      index += 1;
      continue;
    }
    table[name] = parseScalar(rest, fail);
    index += 1;
  }
  return { ...top, ...arrays };
}

function parseScalar(rest: string, fail: (message: string) => never): Entry | string {
  if (rest.startsWith('"')) {
    let out = "";
    let at = 1;
    for (;;) {
      if (at >= rest.length) fail("unterminated string");
      const char = rest[at];
      if (char === '"') break;
      if (char === "\\") {
        const escape = { n: "\n", t: "\t", '"': '"', "\\": "\\" }[rest[at + 1]];
        if (escape === undefined) fail(`unsupported escape \\${rest[at + 1]}`);
        out += escape;
        at += 2;
        continue;
      }
      out += char;
      at += 1;
    }
    const trailing = rest.slice(at + 1).trim();
    if (trailing !== "" && !trailing.startsWith("#"))
      fail(`trailing text after string: ${trailing}`);
    return out;
  }
  const value = rest.split("#")[0].trim();
  if (!/^-?\d+(\.\d+)?$/.test(value)) fail(`unsupported value \`${value}\``);
  // Kept as the source lexeme: the generated TS reproduces it verbatim, so
  // `0.30` would never silently become `0.3`.
  return { number: value };
}

// ─── Reading and validating the source ───────────────────────────────────────

export function readSource() {
  const parsed = parseKeysToml(readFileSync(SOURCE, "utf8"));
  const groups = parsed.group ?? [];
  const keys = parsed.key ?? [];
  const derived = parsed.derived ?? [];
  const baseRules = parsed.base ?? [];
  // The token set is the `[[base]]` list itself — desktop checks the same
  // list against its Rust `BASE_TOKENS`, so one stated order serves both.
  const tokens = new Set<string>(baseRules.map((rule: Entry) => rule.name));
  const problems: string[] = [];
  const seen = new Set<string>();
  const groupNames: string[] = groups.map((group: Entry) => group.name);

  if (groups.length === 0) problems.push("no [[group]] tables");
  for (const group of groups) {
    for (const field of ["name", "description"]) {
      if (typeof group[field] !== "string")
        problems.push(`group ${group.name}: missing \`${field}\``);
    }
  }
  if (new Set(groupNames).size !== groupNames.length) problems.push("duplicate group names");

  let groupIndex = -1;
  for (const key of keys) {
    const at = `key \`${key.name ?? "?"}\``;
    for (const field of ["name", "group", "description", "dark"]) {
      if (typeof key[field] !== "string") problems.push(`${at}: missing \`${field}\``);
    }
    if (typeof key.name !== "string") continue;
    if (seen.has(key.name)) problems.push(`${at}: defined twice`);
    seen.add(key.name);
    if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(key.name)) {
      problems.push(`${at}: not a dotted lower-case role name`);
    }
    const position = groupNames.indexOf(key.group);
    if (position === -1) problems.push(`${at}: unknown group \`${key.group}\``);
    else if (position < groupIndex)
      problems.push(`${at}: group \`${key.group}\` is not contiguous`);
    else groupIndex = position;
    if (key.palette !== undefined && !PALETTE_KEYS.includes(key.palette)) {
      problems.push(`${at}: unknown palette hue \`${key.palette}\``);
    }
    if (key.base !== undefined && !tokens.has(key.base)) {
      problems.push(`${at}: unknown base token \`${key.base}\``);
    }
    if (key.palette === undefined && key.base === undefined) {
      problems.push(`${at}: needs a \`palette\` or a \`base\` source`);
    }
    checkOperation(key, at, problems);
    for (const field of ["dark", "light", "note"]) {
      if (key[field] !== undefined && typeof key[field] !== "string") {
        problems.push(`${at}: \`${field}\` must be a string`);
      }
    }
  }

  // A derived variable is a colour Atlas still writes but no theme may set:
  // it is a pure transform of a key that IS settable. Validated here so a
  // dangling `from` fails the build rather than resolving to `undefined`.
  for (const entry of derived) {
    const at = `derived \`${entry.name ?? "?"}\``;
    for (const field of ["name", "description"]) {
      if (typeof entry[field] !== "string") problems.push(`${at}: missing \`${field}\``);
    }
    if (typeof entry.name !== "string") continue;
    if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(entry.name)) {
      problems.push(`${at}: not a dotted lower-case role name`);
    }
    if (seen.has(entry.name)) problems.push(`${at}: is also a settable key`);
    if ((entry.from === undefined) === (entry.base === undefined)) {
      problems.push(`${at}: needs exactly one of \`from\` (a key) or \`base\` (a base token)`);
    }
    if (entry.from !== undefined && !seen.has(entry.from)) {
      problems.push(`${at}: \`from\` names no key`);
    }
    if (entry.base !== undefined && !tokens.has(entry.base)) {
      problems.push(`${at}: unknown base token \`${entry.base}\``);
    }
    checkOperation(entry, at, problems, { required: true });
  }

  // Base rules: each token once, each sourcing only an earlier rule — which is
  // what lets both interpreters resolve in one pass. (Desktop also checks the
  // list equals its Rust `BASE_TOKENS`, in order.)
  if (tokens.size !== baseRules.length) problems.push("[[base]] names a token twice");
  const earlier = new Set<string>();
  for (const rule of baseRules) {
    const at = `base rule \`${rule.name ?? "?"}\``;
    for (const field of ["name", "description"]) {
      if (typeof rule[field] !== "string") problems.push(`${at}: missing \`${field}\``);
    }
    if (rule.palette !== undefined && !PALETTE_KEYS.includes(rule.palette)) {
      problems.push(`${at}: unknown palette hue \`${rule.palette}\``);
    }
    if (rule.base !== undefined && !earlier.has(rule.base)) {
      problems.push(`${at}: \`base\` must name an earlier rule, got \`${rule.base}\``);
    }
    if (rule.base === undefined && typeof rule.dark !== "string") {
      problems.push(`${at}: needs a \`base\` source or a \`dark\` default`);
    }
    for (const field of ["dark", "light"]) {
      if (rule[field] !== undefined && typeof rule[field] !== "string") {
        problems.push(`${at}: \`${field}\` must be a string`);
      }
      if (typeof rule[field] === "string" && /[\t\n]/.test(rule[field])) {
        problems.push(`${at}: \`${field}\` may not hold a tab or newline`);
      }
    }
    checkOperation(rule, at, problems);
    earlier.add(rule.name);
  }

  problems.push(
    ...cssVarCollisions(
      [...tokens, ...FONT_TOKENS],
      [...keys, ...derived]
        .map((entry: Entry) => entry.name)
        .filter((name) => typeof name === "string"),
    ),
  );

  if (problems.length > 0) {
    throw new TomlError(`${SOURCE_REL} is invalid:\n  ${problems.join("\n  ")}`);
  }

  return {
    groups,
    baseRules: baseRules.map((rule: Entry) => ({
      name: rule.name,
      description: rule.description,
      palette: rule.palette,
      base: rule.base,
      op: rule.op,
      amount: rule.amount?.number,
      dark: rule.dark,
      light: rule.light ?? rule.dark,
    })),
    derived: derived.map((entry: Entry) => ({
      name: entry.name,
      description: entry.description,
      from: entry.from,
      base: entry.base,
      op: entry.op,
      amount: entry.amount?.number,
    })),
    keys: keys.map((key: Entry) => ({
      name: key.name,
      group: key.group,
      description: key.description,
      palette: key.palette,
      base: key.base,
      op: key.op,
      amount: key.amount?.number,
      dark: key.dark,
      light: key.light ?? key.dark,
      note: key.note,
    })),
  };
}

// ─── Shared derivation vocabulary ────────────────────────────────────────────

/**
 * A theme key's CSS variable: its dotted name with `.` and `_` turned into
 * `-`, and no prefix (ADR-0027) — `element.hover` is `--element-hover`.
 * Matches `define()` in the generated registry.
 */
export function cssVar(name: string): `--${string}` {
  return `--${name.replaceAll(".", "-").replaceAll("_", "-")}`;
}

/**
 * Every pair of names that would write one CSS variable. `.` and `_` both
 * become `-`, so `a.b_c` and `a.b.c` collide; and with no prefix, a key can
 * also land on a shadcn base token (`sidebar.border` would be
 * `--sidebar-border`). The second write would silently win, so it is an error.
 */
export function cssVarCollisions(baseTokens: string[], keys: string[]): string[] {
  const problems: string[] = [];
  const byVar = new Map<string, string>();
  for (const token of baseTokens) byVar.set(`--${token}`, `base token \`${token}\``);
  for (const key of keys) {
    const existing = byVar.get(cssVar(key));
    if (existing) problems.push(`${existing} and key \`${key}\` share ${cssVar(key)}`);
    else byVar.set(cssVar(key), `key \`${key}\``);
  }
  return problems;
}

/** Spelled-out source chain, for hovers and the key list. */
function sourceChainLong(key: Entry) {
  return [key.palette && `palette.${key.palette}`, key.base && `base.${key.base}`, "Atlas default"]
    .filter(Boolean)
    .join(" → ");
}

/**
 * The one-line hover an author sees on a key in a TOML editor, and column 2 of
 * `theme-keys.txt`. Composed here so Rust never has to build it.
 */
export function keyDescription(key: Entry) {
  const transform = key.op ? ` Transform: ${OPERATIONS[key.op].prose(key.amount)}.` : "";
  return `${key.description} Source: ${sourceChainLong(key)}.${transform}`;
}

// ─── The generated files ─────────────────────────────────────────────────────

function banner(comment: string, source = SOURCE_REL, command = COMMAND) {
  const lines = [
    `Generated from ${source} — do not edit.`,
    `Run \`${command}\` after editing that file.`,
  ];
  return lines.map((line) => `${comment} ${line}`.trimEnd()).join("\n");
}

const REGISTRY_PREAMBLE = `${banner("//")}

import { withAlpha, lighten, mix, readable } from "./color.ts";

export const PALETTE_KEYS = [
${PALETTE_KEYS.map((hue) => `  "${hue}",`).join("\n")}
] as const;

export type PaletteKey = (typeof PALETTE_KEYS)[number];
export type Appearance = "dark" | "light";
export type ColorTransform = (color: string, context: DerivationContext) => string;

export interface DerivationContext {
  base: Record<string, string>;
  palette: Record<string, string>;
  appearance: Appearance;
}

export interface ThemeKeyRule {
  /** First derivation source after an explicit theme key. */
  palette?: PaletteKey;
  /** Second derivation source after the palette. */
  base?: string;
  /** Per-appearance Atlas default, used only when both sources are absent. */
  atlasDefault: Record<Appearance, string>;
  transform?: ColorTransform;
  description: string;
}

export interface ThemeKeyDefinition<Key extends string = string> {
  key: Key;
  cssVar: \`--\${string}\`;
  rule: ThemeKeyRule;
}

const alpha =
  (amount: number): ColorTransform =>
  (color) =>
    withAlpha(color, amount);
const lighter =
  (amount: number): ColorTransform =>
  (color) =>
    lighten(color, amount);
const towardBackground =
  (amount: number): ColorTransform =>
  (color, { base }) =>
    mix(color, base.background ?? "#000000", amount);
const towardForeground =
  (amount: number): ColorTransform =>
  (color, { base }) =>
    mix(color, base.foreground ?? "#ffffff", amount);
const readableOn =
  (): ColorTransform =>
  (color, { base }) =>
    // Until \`foreground\` exists — only while deriving it — the choice is
    // white or black, since \`background\` cannot be read on itself.
    base.foreground === undefined
      ? readable(color, "#ffffff", "#000000")
      : readable(color, base.foreground, base.background ?? "#000000");

export interface BaseRule {
  token: string;
  palette?: PaletteKey;
  /** An earlier base token this one follows. */
  base?: string;
  /** Per-appearance default, for when neither source answers. */
  atlasDefault?: Record<Appearance, string>;
  transform?: ColorTransform;
  description: string;
}

function rule(
  token: string,
  definition: Omit<BaseRule, "token" | "atlasDefault"> & { dark?: string; light?: string },
): BaseRule {
  const { dark, light = dark, ...rest } = definition;
  return { token, ...rest, ...(dark ? { atlasDefault: { dark, light: light! } } : {}) };
}

/**
 * How each shadcn base token a theme leaves out is derived (ADR-0022), in
 * \`BASE_TOKENS\` order: a rule's \`base\` is always an earlier rule, so one
 * pass resolves the set.
 */
export const BASE_RULE_REGISTRY: readonly BaseRule[] = [
BASE_RULES_BODY
];

function define<const Key extends string>(
  key: Key,
  rule: Omit<ThemeKeyRule, "atlasDefault"> & {
    dark: string;
    light?: string;
  },
): ThemeKeyDefinition<Key> {
  const { dark, light = dark, ...rest } = rule;
  return {
    key,
    cssVar: \`--\${key.replaceAll(".", "-").replaceAll("_", "-")}\`,
    rule: { ...rest, atlasDefault: { dark, light } },
  };
}

/**
 * The public schema-1 theme-key registry. Every key appears once and carries
 * exactly one explicit → palette → base → Atlas-default derivation rule.
 */
export const THEME_KEY_REGISTRY = [`;

const REGISTRY_EPILOGUE = `] as const;

export type ThemeKey = (typeof THEME_KEY_REGISTRY)[number]["key"];

export const THEME_KEY_DEFINITION_BY_KEY = Object.fromEntries(
  THEME_KEY_REGISTRY.map((definition) => [definition.key, definition]),
) as Record<ThemeKey, (typeof THEME_KEY_REGISTRY)[number]>;

export interface DerivedVarDefinition<Name extends string = string> {
  name: Name;
  cssVar: \`--\${string}\`;
  /** The settable key this transforms, or null when it transforms a base token. */
  from: ThemeKey | null;
  /** The base token this transforms, or null when it transforms a key. */
  base: string | null;
  transform: ColorTransform;
  description: string;
}

function derive<const Name extends string>(
  name: Name,
  rule: Omit<DerivedVarDefinition<Name>, "name" | "cssVar">,
): DerivedVarDefinition<Name> {
  return {
    name,
    cssVar: \`--\${name.replaceAll(".", "-").replaceAll("_", "-")}\`,
    ...rule,
  };
}

/**
 * Colours Atlas still writes as custom properties, but that no
 * theme may set: each is a pure transform of a key that IS settable, so a
 * theme author steers it through that key and never restates it. They are
 * deliberately absent from \`theme-keys.txt\` and from the JSON Schema, which is
 * what makes writing one in a theme file an unknown-key warning.
 */
export const DERIVED_VAR_REGISTRY = [
DERIVED_BODY
] as const;

export type DerivedVar = (typeof DERIVED_VAR_REGISTRY)[number]["name"];

export function describeDerivation(definition: ThemeKeyDefinition): string {
  const sources = [
    definition.rule.palette ? \`palette.\${definition.rule.palette}\` : null,
    definition.rule.base ? \`base.\${definition.rule.base}\` : null,
    "Atlas appearance default",
  ].filter(Boolean);
  return sources.join(" → ");
}
`;

function renderBaseRules(baseRules: Entry[]) {
  return baseRules
    .flatMap((entry) => {
      const fields = [];
      if (entry.palette) fields.push(`palette: "${entry.palette}"`);
      if (entry.base) fields.push(`base: "${entry.base}"`);
      if (entry.op) fields.push(`transform: ${transformCall(entry)}`);
      if (entry.dark) fields.push(`dark: "${entry.dark}"`);
      if (entry.dark && entry.light !== entry.dark) fields.push(`light: "${entry.light}"`);
      fields.push(`description: "${entry.description.replaceAll('"', '\\"')}"`);
      return [`  rule("${entry.name}", {`, ...fields.map((field) => `    ${field},`), "  }),"];
    })
    .join("\n");
}

function renderRegistry({ keys, derived, baseRules }: Source) {
  const body = [];
  let group = null;
  for (const key of keys) {
    if (key.group !== group) {
      if (group !== null) body.push("");
      group = key.group;
    }
    if (key.note) {
      body.push("  /**");
      // `trimEnd`: a blank line inside a TOML note would otherwise emit `   * `
      // with a trailing space, which `oxfmt` strips — putting `format:check` and
      // `theme:keys:check` permanently at odds.
      for (const line of key.note.split("\n")) body.push(`   * ${line}`.trimEnd());
      body.push("   */");
    }
    body.push(`  define("${key.name}", {`);
    if (key.palette) body.push(`    palette: "${key.palette}",`);
    if (key.base) body.push(`    base: "${key.base}",`);
    if (key.op) body.push(`    transform: ${transformCall(key)},`);
    body.push(`    dark: "${key.dark}",`);
    body.push(`    light: "${key.light}",`);
    body.push(`    description: "${key.description.replaceAll('"', '\\"')}",`);
    body.push("  }),");
  }
  const derivedBody = derived.flatMap((entry: Entry) => [
    `  derive("${entry.name}", {`,
    `    from: ${entry.from ? `"${entry.from}"` : "null"},`,
    `    base: ${entry.base ? `"${entry.base}"` : "null"},`,
    `    transform: ${transformCall(entry)},`,
    `    description: "${entry.description.replaceAll('"', '\\"')}",`,
    "  }),",
  ]);
  return `${REGISTRY_PREAMBLE.replace("BASE_RULES_BODY", renderBaseRules(baseRules))}\n${body.join("\n")}\n${REGISTRY_EPILOGUE.replace(
    "DERIVED_BODY",
    derivedBody.join("\n"),
  )}`;
}

function renderKeyList({ keys }: Source) {
  const rows = keys.map((key: Entry) => `${key.name}\t${keyDescription(key)}`);
  return `${banner("#", RUST_SOURCE_REL, RUST_COMMAND)}\n#\n# One key per line: the role name, a tab, and the hover text an author sees.\n${rows.join("\n")}\n`;
}

/**
 * One rule per line, tab-separated, for `crates/atlas-theme/src/derive.rs`:
 * token, palette, base, op, amount, dark, light — `-` where a field is absent.
 */
function renderBaseRuleList({ baseRules }: Source) {
  const rows = baseRules.map((entry: Entry) =>
    [entry.name, entry.palette, entry.base, entry.op, entry.amount, entry.dark, entry.light]
      .map((field) => field ?? "-")
      .join("\t"),
  );
  return `${banner("#", RUST_SOURCE_REL, RUST_COMMAND)}\n#\n# token, palette, base, op, amount, dark, light; \`-\` where absent.\n${rows.join("\n")}\n`;
}

// ─── themes.css ──────────────────────────────────────────────────────────────

/** Every built-in theme, Atlas first (the `:root` default), then by file name. */
export function readBuiltinThemes(): Theme[] {
  const dir = path.join(REPO_ROOT, "themes");
  const files = readdirSync(dir)
    .filter((file) => file.endsWith(".toml"))
    .sort((a, b) => (a === "atlas.toml" ? -1 : b === "atlas.toml" ? 1 : a.localeCompare(b)));
  return files.map((file) => {
    try {
      return themeFromToml(parseToml(readFileSync(path.join(dir, file), "utf8")));
    } catch (error) {
      throw new Error(`themes/${file}: ${(error as Error).message}`);
    }
  });
}

type ResolveTheme = typeof import("../src/theme/resolve-theme.ts").resolveTheme;

/**
 * One block per built-in theme × appearance, each the resolver's full
 * `cssVars` — base tokens, theme keys and derived variables — so a consumer
 * that only shows built-in themes runs no colour code. A theme with only one
 * variant resolves the other to it, exactly as the resolver does at runtime.
 */
function renderThemesCss(themes: Theme[], resolveTheme: ResolveTheme): string {
  const blocks: string[] = [];
  for (const theme of themes) {
    for (const appearance of ["dark", "light"] as const) {
      const resolved = resolveTheme(theme, appearance);
      const selector = `[data-theme="${theme.id}"][data-appearance="${appearance}"]`;
      const isDefault = theme.id === "atlas" && appearance === "dark";
      const note =
        resolved.appearance === appearance
          ? ""
          : `/* ${theme.name} has no ${appearance} variant; this is its ${resolved.appearance}. */\n`;
      const body = Object.entries(resolved.cssVars)
        .map(([name, value]) => `  ${name}: ${value};`)
        .join("\n");
      blocks.push(`${note}${isDefault ? ":root,\n" : ""}${selector} {\n${body}\n}`);
    }
  }
  const header = `/* Generated from keys.toml and themes/*.toml — do not edit.
   Run \`${COMMAND}\` after editing either.

   Every built-in theme in both appearances, fully resolved by the TypeScript
   resolver. Select one with \`data-theme="<id>"\` and \`data-appearance="dark|light"\`
   on any element; \`:root\` is Atlas dark. */`;
  return `${header}\n\n${blocks.join("\n\n")}\n`;
}

/**
 * The default theme alone, for `styles-core.css`: Atlas in both appearances as
 * a floor under an app that writes its own theme at runtime, so its first
 * paint (before the app's engine has run) is Atlas rather than unthemed.
 *
 * Every selector is `:root` plus a zero-specificity `:where()`, so anything an
 * app writes at `html:root` (or any selector with a type or a second class)
 * wins whatever the source order. Dark is the floor; the OS's light
 * preference turns it light unless `data-appearance="dark"` says otherwise,
 * and `data-appearance="light"` turns it light whatever the OS says.
 */
function renderDefaultThemeCss(themes: Theme[], resolveTheme: ResolveTheme): string {
  const atlas = themes.find((theme) => theme.id === "atlas");
  if (!atlas) throw new Error("themes/atlas.toml: the default theme is missing");
  const body = (appearance: "dark" | "light", indent: string) =>
    Object.entries(resolveTheme(atlas, appearance).cssVars)
      .map(([name, value]) => `${indent}  ${name}: ${value};`)
      .join("\n");
  const header = `/* Generated from keys.toml and themes/atlas.toml — do not edit.
   Run \`${COMMAND}\` after editing either.

   The default Atlas theme, both appearances, for styles-core.css: a floor
   for an app that writes its theme at runtime, so a first launch paints Atlas
   before that app's engine has run. Every selector is \`:root\` (0,1,0), so
   the app's own block at \`html:root\` wins wherever either sits. Dark unless
   the OS prefers light; \`data-appearance\` on <html> overrides the OS. */`;
  return `${header}

:root {
${body("dark", "")}
}

@media (prefers-color-scheme: light) {
  :root:where(:not([data-appearance="dark"])) {
${body("light", "  ")}
  }
}

:root:where([data-appearance="light"]) {
${body("light", "")}
}
`;
}

// ─── Driver ──────────────────────────────────────────────────────────────────

function read(relative: string): string {
  const full = path.join(REPO_ROOT, relative);
  return existsSync(full) ? readFileSync(full, "utf8") : "";
}

async function loadResolver(): Promise<ResolveTheme> {
  // Imported only now, after the registry it reads has been written: a
  // static import would load the stale one.
  const url = pathToFileURL(path.join(REPO_ROOT, "src/theme/resolve-theme.ts"));
  return (await import(url.href)).resolveTheme;
}

function expectedOutputs(source: Source): Record<string, string> {
  return {
    [OUTPUTS.registry]: renderRegistry(source),
    [OUTPUTS.keyList]: renderKeyList(source),
    [OUTPUTS.baseRules]: renderBaseRuleList(source),
  };
}

/** @returns the outputs that are out of date. */
export async function staleOutputs(): Promise<string[]> {
  const source = readSource();
  const stale = Object.entries(expectedOutputs(source))
    .filter(([relative, contents]) => read(relative) !== contents)
    .map(([relative]) => relative);
  // Both stylesheets are only as current as the registry the resolver reads.
  if (stale.includes(OUTPUTS.registry))
    return [...stale, OUTPUTS.themesCss, OUTPUTS.defaultThemeCss];
  const themes = readBuiltinThemes();
  const resolveTheme = await loadResolver();
  if (read(OUTPUTS.themesCss) !== renderThemesCss(themes, resolveTheme))
    stale.push(OUTPUTS.themesCss);
  if (read(OUTPUTS.defaultThemeCss) !== renderDefaultThemeCss(themes, resolveTheme))
    stale.push(OUTPUTS.defaultThemeCss);
  return stale;
}

async function write(): Promise<void> {
  const source = readSource();
  const themes = readBuiltinThemes();
  const written: string[] = [];
  const put = (relative: string, contents: string) => {
    if (read(relative) === contents) return;
    writeFileSync(path.join(REPO_ROOT, relative), contents);
    written.push(relative);
  };
  for (const [relative, contents] of Object.entries(expectedOutputs(source)))
    put(relative, contents);
  const resolveTheme = await loadResolver();
  put(OUTPUTS.themesCss, renderThemesCss(themes, resolveTheme));
  put(OUTPUTS.defaultThemeCss, renderDefaultThemeCss(themes, resolveTheme));
  console.log(
    written.length === 0
      ? `${source.keys.length} theme keys, ${themes.length} themes; every generated file was already current.`
      : `${source.keys.length} theme keys, ${themes.length} themes; rewrote:\n  ${written.join("\n  ")}`,
  );
}

async function check(): Promise<void> {
  const stale = await staleOutputs();
  if (stale.length === 0) {
    console.log(`theme: every generated file matches ${SOURCE_REL} and themes/.`);
    return;
  }
  console.error(`Stale, ${SOURCE_REL} or themes/ has moved on — run \`${COMMAND}\`:`);
  for (const relative of stale) console.error(`  ${relative}`);
  process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  try {
    await (process.argv.includes("--check") ? check() : write());
  } catch (error) {
    console.error(error instanceof TomlError ? error.message : error);
    process.exitCode = 1;
  }
}
