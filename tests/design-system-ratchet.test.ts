import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { TRANSITION_ALL_RULE, formatViolations, runRatchet } from "../src/ratchet/index.ts";

/**
 * The package holds its own source to the ratchet it exports, with the
 * `--atlas-` ban on: the package is the first place the unprefixed names are
 * authoritative. `src/styles` is the scale itself and is not scanned, as on
 * desktop; `src/ratchet` spells out the patterns it bans.
 */

const ROOT = path.join(import.meta.dirname, "..");

const EXEMPT_FILES: Record<string, string> = {
  "src/theme/theme-key-registry.ts":
    "Shape 1. The table of Atlas's per-appearance default for every theme key, " +
    "so every entry is a colour literal by construction.",
  "src/theme/color.ts":
    "Shape 1. The colour parser and mixer the resolver is built on. Its literals " +
    "are the identity values of the operations themselves.",
  "src/theme/resolve-theme.test.ts":
    "Shape 1. Fixture themes. A test for the resolver has to hand it colours.",
  "src/components/ui/brand-marks.tsx":
    "Shape 2. Third-party trademarks whose colours are fixed by their brand " +
    "guidelines; a recoloured logo is the wrong logo.",
};

describe("design-system ratchet", () => {
  it("holds the package's own source at zero", () => {
    const violations = runRatchet({
      cwd: ROOT,
      roots: ["src/ui", "src/components", "src/lib", "src/theme", "stories", ".storybook"],
      exemptFiles: EXEMPT_FILES,
      banAtlasPrefix: true,
    });
    expect(violations, formatViolations(violations)).toEqual([]);
  });
});

describe("runRatchet", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "ratchet-"));
  afterAll(() => rmSync(dir, { recursive: true, force: true }));
  const put = (file: string, text: string) => {
    mkdirSync(path.dirname(path.join(dir, file)), { recursive: true });
    writeFileSync(path.join(dir, file), text);
  };
  const rulesOf = (options: Parameters<typeof runRatchet>[0]) =>
    runRatchet({ cwd: dir, ...options }).map((v) => `${v.file}:${v.line ?? "-"} ${v.rule}`);

  put("src/a.tsx", 'const a = "text-[11px] z-50 bg-white"\nconst b = "var(--atlas-border)"\n');
  put(
    "src/b.tsx",
    [
      "// ratchet-allow: a third party's colour, fixed by their brand guidelines",
      'const ok = "#ff0000"',
      'const thin = "#00ff00" // ratchet-allow: because',
      'const closed = "#0000ff" /* ratchet-allow: short but closed */',
    ].join("\n"),
  );
  put("src/clean.tsx", 'const c = "text-sm z-popover"\n');
  put("src/sub/x.tsx", 'const x = "z-[999]"\n');

  it("reports each violation with its line", () => {
    expect(rulesOf({ roots: ["src"], exemptFiles: {} })).toEqual([
      "src/a.tsx:1 arbitrary-text-size",
      "src/a.tsx:1 white-black-utility",
      "src/a.tsx:1 bare-z-index",
      "src/b.tsx:3 thin-allow-reason",
      "src/b.tsx:4 thin-allow-reason",
      "src/sub/x.tsx:1 arbitrary-z-index",
    ]);
  });

  it("bans --atlas- names only when asked", () => {
    expect(rulesOf({ roots: ["src"], banAtlasPrefix: true })).toContain(
      "src/a.tsx:2 atlas-prefixed-variable",
    );
  });

  it("checks the exemptions themselves", () => {
    expect(
      rulesOf({
        roots: ["src"],
        exemptFiles: {
          "src/a.tsx": "too short",
          "src/clean.tsx": "An exemption for a file with nothing in it to exempt.",
          "src/gone.tsx": "An exemption for a file that has since been deleted.",
        },
        // A trailing slash still names the directory.
        exemptDirs: {
          "src/sub/": "A directory whose one file exists to be exempted here.",
        },
      }).filter((line) => !line.startsWith("src/b.tsx")),
    ).toEqual([
      "src/a.tsx:- thin-exemption-reason",
      "src/clean.tsx:- idle-exemption",
      "src/gone.tsx:- missing-exemption",
    ]);
  });
});

describe("runRatchet's rules", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "ratchet-rules-"));
  afterAll(() => rmSync(dir, { recursive: true, force: true }));
  const put = (file: string, text: string) => {
    mkdirSync(path.dirname(path.join(dir, file)), { recursive: true });
    writeFileSync(path.join(dir, file), text);
  };
  const rulesOf = (options: Parameters<typeof runRatchet>[0]) =>
    runRatchet({ cwd: dir, ...options }).map((v) => `${v.file}:${v.line ?? "-"} ${v.rule}`);

  put("src/motion.tsx", 'const m = "transition-all"\nconst s = { transition: "all 200ms" }\n');
  put("src/todo.tsx", "// TODO: something\n");
  put("styles/app.css", ".x { transition: all 200ms; }\n");
  put("index.html", '<div class="transition-all"></div>\n');

  it("ban transition-all by default, the class and the CSS spelling", () => {
    expect(rulesOf({ roots: ["src"] })).toEqual([
      "src/motion.tsx:1 transition-all",
      "src/motion.tsx:2 transition-all",
    ]);
  });

  it("take a consumer's extra rule, under roots unless it has a scope", () => {
    const todo = { id: "no-todo", instead: "file an issue", pattern: /\bTODO\b/g };
    expect(rulesOf({ roots: ["src"], rules: [todo] })).toContain("src/todo.tsx:1 no-todo");
    expect(rulesOf({ roots: ["src"], rules: [{ ...todo, scope: ["styles"] }] })).not.toContain(
      "src/todo.tsx:1 no-todo",
    );
  });

  it("let a rule with a built-in's id replace it, widening its scope to files outside roots", () => {
    expect(
      rulesOf({
        roots: ["src"],
        rules: [{ ...TRANSITION_ALL_RULE, scope: ["src", "styles", "index.html"] }],
      }),
    ).toEqual([
      "src/motion.tsx:1 transition-all",
      "src/motion.tsx:2 transition-all",
      "styles/app.css:1 transition-all",
      // Named directly, so read even though `include` is .ts/.tsx/.css.
      "index.html:1 transition-all",
    ]);
  });

  it("still count an exemption outside roots as earning its keep", () => {
    expect(
      rulesOf({
        roots: ["src/nothing-here"],
        exemptFiles: {
          "src/motion.tsx": "Exempt from outside the scanned roots, on purpose here.",
        },
      }),
    ).toEqual([]);
  });

  it("refuse a pattern without /g", () => {
    expect(() =>
      runRatchet({ cwd: dir, roots: ["src"], rules: [{ id: "x", instead: "y", pattern: /x/ }] }),
    ).toThrow(/must be \/g/);
  });
});
