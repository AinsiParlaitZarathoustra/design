import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * `@tryatlas/design/variants` is the entry a React Server Component imports.
 * Its whole contract is that nothing behind it is a client module: one
 * `"use client"` anywhere in its import graph turns every function exported
 * through it (`buttonVariants`…) into a client reference that throws when a
 * server component calls it. Nothing else notices — it type-checks, builds
 * and renders in Storybook — so this walks the graph from the entry and fails
 * on the first client module it reaches.
 *
 * Only the package's own files are walked. A dependency that is itself a
 * client module (Lucide's glyphs) is fine: a server component may render a
 * client component, it just cannot call into one.
 */

const ROOT = path.join(import.meta.dirname, "..");
const ENTRY = path.join(ROOT, "src", "variants.ts");

const RELATIVE_IMPORT = /^\s*(?:import|export)\b[^"']*?from\s*["'](\.{1,2}\/[^"']+)["']/gm;

function hasUseClient(source: string): boolean {
  // A directive is only a directive in the prologue: before any statement,
  // after comments and blank lines.
  const prologue = source.replace(/^(?:\s|\/\/[^\n]*\n|\/\*[\s\S]*?\*\/)*/, "");
  return /^["']use client["']/.test(prologue);
}

function graph(entry: string): Map<string, string> {
  const seen = new Map<string, string>();
  const queue = [entry];
  while (queue.length) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    const source = readFileSync(file, "utf8");
    seen.set(file, source);
    for (const m of source.matchAll(RELATIVE_IMPORT)) {
      queue.push(path.resolve(path.dirname(file), m[1]!));
    }
  }
  return seen;
}

describe("the server-safe entry (@tryatlas/design/variants)", () => {
  const files = graph(ENTRY);

  it("walks more than the entry itself", () => {
    expect(files.size).toBeGreaterThan(5);
  });

  it('has no "use client" anywhere in its import graph', () => {
    const clientModules = [...files]
      .filter(([, source]) => hasUseClient(source))
      .map(([file]) => path.relative(ROOT, file));
    expect(clientModules).toEqual([]);
  });

  it("is exported from package.json without a client entry in front of it", () => {
    const pkg = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));
    expect(pkg.exports["./variants"]).toEqual({
      types: "./dist/variants.d.ts",
      import: "./dist/variants.js",
    });
  });

  it("catches a client module when there is one", () => {
    expect(hasUseClient('"use client";\n\nexport const x = 1;')).toBe(true);
    expect(hasUseClient("// a comment\n'use client';\n")).toBe(true);
    expect(hasUseClient('export const note = "use client";\n')).toBe(false);
  });
});
