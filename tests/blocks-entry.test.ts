import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * `@tryatlas/design/blocks` is the entry a marketing page imports. Its whole
 * point is what it does NOT pull in: the app primitives, Base UI, the session
 * blocks, and cobe at import time. One stray relative import (a block reaching
 * for `components/ui/`) would drag the rest of the package into the page, and
 * one static `import … from "cobe"` would put the globe's renderer in the
 * first-load bundle. Both type-check, build and render; this walks the graph
 * from the entry and fails on either.
 */

const ROOT = path.join(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src");
const BLOCKS = path.join(SRC, "components", "blocks");
const ENTRY = path.join(BLOCKS, "index.ts");

// Static `import … from "x"`, `export … from "x"`, and a bare `import "x"`.
const STATIC_IMPORT = /^\s*(?:(?:import|export)\b[^"';]*?from\s*|import\s+)["']([^"']+)["']/gm;
const DYNAMIC_IMPORT = /\bimport\(\s*["']([^"']+)["']\s*\)/g;

// A value import of cobe; `import type` is erased and allowed.
const STATIC_COBE = /^\s*(?:import|export)\s+(?!type\b)[^;]*?from\s*["']cobe["']/m;

/** The bare specifiers the graph may import statically. */
const ALLOWED_PACKAGES = ["react", "react/jsx-runtime", "react-dom", "motion/react", "cn"];

function graph(entry: string) {
  const files = new Map<string, string>();
  const bare = new Set<string>();
  const dynamic = new Map<string, string[]>();
  const queue = [entry];
  while (queue.length) {
    const file = queue.pop()!;
    if (files.has(file)) continue;
    const source = readFileSync(file, "utf8");
    files.set(file, source);
    for (const m of source.matchAll(STATIC_IMPORT)) {
      const spec = m[1]!;
      if (spec.startsWith(".")) queue.push(path.resolve(path.dirname(file), spec));
      // `import type` is erased at build time.
      else if (!/^\s*(?:import|export)\s+type\b/.test(m[0])) bare.add(spec);
    }
    const found = [...source.matchAll(DYNAMIC_IMPORT)].map((m) => m[1]!);
    if (found.length) dynamic.set(path.relative(SRC, file), found);
  }
  return { files, bare, dynamic };
}

describe("the blocks entry (@tryatlas/design/blocks)", () => {
  const { files, bare, dynamic } = graph(ENTRY);
  const reached = [...files.keys()].map((f) => path.relative(SRC, f));

  it("stays inside components/blocks/ and lib/", () => {
    expect(reached.length).toBeGreaterThan(8);
    expect(reached.filter((f) => !/^(components\/blocks|lib)\//.test(f))).toEqual([]);
  });

  it("imports only react, motion and cn statically", () => {
    expect([...bare].filter((spec) => !ALLOWED_PACKAGES.includes(spec))).toEqual([]);
  });

  it("loads cobe only dynamically, and only from the globe", () => {
    expect(Object.fromEntries(dynamic)).toEqual({ "components/blocks/globe.tsx": ["cobe"] });
    const staticCobe = [...readdirSync(SRC, { recursive: true, encoding: "utf8" })]
      .filter((f) => /\.tsx?$/.test(f))
      .filter((f) => STATIC_COBE.test(readFileSync(path.join(SRC, f), "utf8")));
    expect(staticCobe).toEqual([]);
  });

  it("blocks.css excludes exactly the blocks-directory files the entry does not reach", () => {
    const unreached = readdirSync(BLOCKS)
      .filter((f) => /\.tsx?$/.test(f) && !/\.test\.tsx?$/.test(f) && f !== "index.ts")
      .filter((f) => !files.has(path.join(BLOCKS, f)))
      .map((f) => f.replace(/\.tsx?$/, ""))
      .sort();
    const css = readFileSync(path.join(SRC, "styles", "blocks.css"), "utf8");
    const not = css.match(/@source not "\.\.\/\.\.\/dist\/components\/blocks\/\{([^}]+)\}\.js";/);
    expect(not, "blocks.css has its @source not line").not.toBeNull();
    expect(not![1]!.split(",").sort()).toEqual(unreached);
  });

  it("is exported from package.json, with its stylesheet", () => {
    const { exports } = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));
    expect(exports["./blocks"]).toEqual({
      types: "./dist/components/blocks/index.d.ts",
      import: "./dist/components/blocks/index.js",
    });
    expect(exports["./blocks.css"]).toBe("./src/styles/blocks.css");
  });
});
