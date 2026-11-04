import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { D23_RENAMES } from "../src/lib/d23-renames.ts";
import { PACKAGE_SENTINEL_CLASS } from "../src/lib/sentinel.ts";
import { DERIVED_VAR_REGISTRY, THEME_KEY_REGISTRY } from "../src/theme/theme-key-registry.ts";

/**
 * `D23_RENAMES` is what a consumer's guard test greps for, so a wrong entry
 * is worse than a missing one: it either flags a name that still works or
 * sends a codemod to a name that renders nothing. Each new name must be one
 * the package's stylesheets declare, and each renamed one must be gone.
 */
const STYLES = path.join(import.meta.dirname, "..", "src/styles");
const css = ["themes.css", "tokens.css", "utilities.css"]
  .map((f) => readFileSync(path.join(STYLES, f), "utf8"))
  .join("\n");
const declared = new Set([...css.matchAll(/(?<![\w-])--([a-z0-9-]+)\s*:/g)].map((m) => m[1]!));
const bridged = new Set([...css.matchAll(/(?<![\w-])--color-([a-z0-9-]+)\s*:/g)].map((m) => m[1]!));

const entries = Object.entries(D23_RENAMES);
const roles = entries.filter(([old]) => !old.startsWith("atlas-"));

describe("D23_RENAMES", () => {
  it("names a declared variable for every entry", () => {
    const missing = entries.filter(([, { variable }]) => !declared.has(variable));
    expect(missing).toEqual([]);
  });

  it("names a bridged utility wherever it names one", () => {
    const missing = entries.filter(([, { utility }]) => utility !== null && !bridged.has(utility));
    expect(missing).toEqual([]);
  });

  it("lists only role names the package no longer declares as variables", () => {
    expect(roles.filter(([old]) => declared.has(old))).toEqual([]);
  });

  it("keeps an old utility only where the package still bridges it", () => {
    for (const [old, { utility }] of roles) {
      expect(bridged.has(old), old).toBe(utility === old);
    }
  });

  it("drops the --atlas- prefix from every theme key and derived variable", () => {
    for (const { cssVar } of [...THEME_KEY_REGISTRY, ...DERIVED_VAR_REGISTRY]) {
      const name = cssVar.slice(2);
      expect(D23_RENAMES[`atlas-${name}`]).toEqual({ variable: name, utility: null });
    }
  });
});

describe("PACKAGE_SENTINEL_CLASS", () => {
  it("is an arbitrary property no stylesheet declares by hand", () => {
    expect(PACKAGE_SENTINEL_CLASS).toBe("[--tryatlas-design-sentinel:1]");
    // The rule must come from Tailwind scanning dist/, never from CSS here.
    expect(css).not.toContain("tryatlas-design-sentinel");
  });
});
