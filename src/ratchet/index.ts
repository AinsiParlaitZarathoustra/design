import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { ATLAS_PREFIX_RULE, RULES, type RatchetRule } from "./rules.ts";

export { ATLAS_PREFIX_RULE, RULES, type RatchetRule } from "./rules.ts";

/**
 * `@tryatlas/design/ratchet`: the design-system ratchet as a function a
 * consumer calls from its own test, so desktop, web and docs hold one set of
 * rules at zero.
 *
 *   import { formatViolations, runRatchet } from "@tryatlas/design/ratchet";
 *
 *   it("holds the design system at zero", () => {
 *     const violations = runRatchet({
 *       cwd: repoRoot,
 *       roots: ["src/features", "src/components"],
 *       exemptFiles: { "src/x/brand.tsx": "Shape 2. A third party's logo colours…" },
 *     });
 *     expect(violations, formatViolations(violations)).toEqual([]);
 *   });
 *
 * The exits are deliberate friction. A whole file goes in `exemptFiles` (or a
 * folder in `exemptDirs`) with a real argument next to it: the file DEFINES
 * the scale, or its colours are not Atlas's to choose (a brand mark, a palette
 * the user picks from). A single site gets `ratchet-allow: <reason>` in a
 * comment on its line or anywhere in the comment block above it. Both are
 * checked: a reason that is too short, an exemption whose path is gone and an
 * exemption that no longer suppresses anything are violations too.
 */

export interface RatchetOptions {
  /** Directories to scan, relative to `cwd`. */
  roots: string[];
  /** The directory paths are relative to. Defaults to `process.cwd()`. */
  cwd?: string;
  /** Whole files, relative to `cwd`, each with the argument for exempting it. */
  exemptFiles?: Record<string, string>;
  /** Whole directories, same bar as `exemptFiles`. */
  exemptDirs?: Record<string, string>;
  /** Also ban `--atlas-…` variable names (ADR-0027's contract step). */
  banAtlasPrefix?: boolean;
  /** Which files to read. Defaults to `.ts`, `.tsx` and `.css`. */
  include?: RegExp;
}

export interface RatchetViolation {
  /** A rule id, or one of the exemption checks: `thin-allow-reason`,
   *  `thin-exemption-reason`, `missing-exemption`, `idle-exemption`. */
  rule: string;
  /** Relative to `cwd`, with forward slashes. */
  file: string;
  /** 1-based; absent for a whole-file finding. */
  line?: number;
  /** The text that matched, or the reason that was too short. */
  match: string;
  instead: string;
}

const ALLOW_MARKER = /ratchet-allow:\s*(.*)$/;
// `{/*` too: in TSX, a comment above markup is a JSX expression.
const COMMENT_LINE = /^\s*(?:\{?\/\*|\/\/|\*)/;
const MIN_ALLOW_REASON = 20;
const MIN_EXEMPTION_REASON = 40;

function walk(dir: string, include: RegExp): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, include));
    else if (include.test(entry.name)) out.push(full);
  }
  return out;
}

/** The marker governing line `i`: on the line itself, or in the contiguous
 *  comment block above it (a formatter decides where a long value wraps). */
function markerFor(lines: string[], i: number): RegExpExecArray | null {
  const own = ALLOW_MARKER.exec(lines[i]!);
  if (own) return own;
  for (let j = i - 1; j >= 0 && COMMENT_LINE.test(lines[j]!); j--) {
    const found = ALLOW_MARKER.exec(lines[j]!);
    if (found) return found;
  }
  return null;
}

export function runRatchet(options: RatchetOptions): RatchetViolation[] {
  const cwd = options.cwd ?? process.cwd();
  const include = options.include ?? /\.(ts|tsx|css)$/;
  const exemptFiles = options.exemptFiles ?? {};
  const exemptDirs = options.exemptDirs ?? {};
  const rules: readonly RatchetRule[] = options.banAtlasPrefix
    ? [...RULES, ATLAS_PREFIX_RULE]
    : RULES;
  const violations: RatchetViolation[] = [];
  const relative = (file: string) => path.relative(cwd, file).split(path.sep).join("/");
  const violates = (file: string) => {
    const text = readFileSync(file, "utf8");
    return rules.some((rule) => text.match(rule.pattern) !== null);
  };

  const files = options.roots.flatMap((root) => walk(path.join(cwd, root), include));
  for (const file of files) {
    const where = relative(file);
    if (where in exemptFiles) continue;
    if (Object.keys(exemptDirs).some((dir) => where.startsWith(`${dir.replace(/\/+$/, "")}/`))) {
      continue;
    }
    // Line by line, so one allowed site does not exempt its neighbours.
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      const marker = markerFor(lines, i);
      if (marker) {
        // Without the comment's own closer: `*/` would count toward the length.
        const reason = marker[1]!.replace(/\*\/\}?\s*$/, "").trim();
        if (reason.length < MIN_ALLOW_REASON) {
          violations.push({
            rule: "thin-allow-reason",
            file: where,
            line: i + 1,
            match: reason,
            instead: `a \`ratchet-allow:\` reason of ${MIN_ALLOW_REASON}+ characters that argues the case`,
          });
        }
        return;
      }
      for (const rule of rules) {
        for (const match of line.match(rule.pattern) ?? []) {
          violations.push({
            rule: rule.id,
            file: where,
            line: i + 1,
            match,
            instead: rule.instead,
          });
        }
      }
    });
  }

  const exemptions: Array<[string, string, "file" | "dir"]> = [
    ...Object.entries(exemptFiles).map(([p, r]) => [p, r, "file"] as [string, string, "file"]),
    ...Object.entries(exemptDirs).map(([p, r]) => [p, r, "dir"] as [string, string, "dir"]),
  ];
  for (const [where, reason, kind] of exemptions) {
    const full = path.join(cwd, where);
    const finding = (rule: string, instead: string, match = where) =>
      violations.push({ rule, file: where, match, instead });
    if (reason.trim().length < MIN_EXEMPTION_REASON) {
      finding(
        "thin-exemption-reason",
        "an argument: the file defines the scale, or its colours are not Atlas's to choose",
        reason,
      );
    }
    const exists =
      existsSync(full) &&
      (kind === "file" ? statSync(full).isFile() : statSync(full).isDirectory());
    if (!exists) {
      finding("missing-exemption", "delete the entry, or fix the path");
      continue;
    }
    const earning = kind === "file" ? violates(full) : walk(full, include).some(violates);
    if (!earning) {
      finding("idle-exemption", "delete the entry and let the file be scanned");
    }
  }
  return violations;
}

/** The violations as a failure message: one line each, then what to write. */
export function formatViolations(violations: RatchetViolation[]): string {
  if (violations.length === 0) return "No design-system violations.";
  const lines = violations.map(
    (v) => `  ${v.file}${v.line ? `:${v.line}` : ""}  ${v.rule}  ${JSON.stringify(v.match)}`,
  );
  const advice = [...new Map(violations.map((v) => [v.rule, v.instead])).entries()].map(
    ([rule, instead]) => `  ${rule}: ${instead}`,
  );
  return [
    `${violations.length} design-system violation(s):`,
    ...lines,
    "",
    "Use instead:",
    ...advice,
    "",
    "If a value truly cannot come from the scale, put `ratchet-allow: <why>` in a",
    "comment on the line or the block above it, and make the reason an argument.",
  ].join("\n");
}
