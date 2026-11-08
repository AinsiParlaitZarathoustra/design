/**
 * Post-processes `svelte-package` output: the theme generator writes its
 * registry with explicit `.ts` specifiers (so Bun, tsc and the source tree all
 * resolve the same file), and `svelte-package` copies that specifier into a
 * `.js` file. Consumers need `.js` there.
 *
 *   bun scripts/fix-dist.ts
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve(import.meta.dirname, "../dist");

let rewritten = 0;
function walk(dir: string) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(js|d\.ts)$/.test(entry)) continue;
    const source = readFileSync(full, "utf8");
    const next = source
      .replace(/(from\s+["'][^"']+)\.ts(["'])/g, "$1.js$2")
      .replace(/(import\(\s*["'][^"']+)\.ts(["']\s*\))/g, "$1.js$2");
    if (next !== source) {
      writeFileSync(full, next);
      rewritten += 1;
    }
  }
}

walk(DIST);
console.log(`fix-dist: rewrote ${rewritten} file(s)`);
