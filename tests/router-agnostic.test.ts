import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The package never imports a router. Desktop has none, the web app uses
 * TanStack Router and the docs use Next.js, so a component that reached for
 * one would type-check and build here and then break, or drag a second
 * router in, in every consumer but one. Links go through `LinkProvider`
 * (`src/lib/link.tsx`), which each app fills from its own router.
 *
 * Banned by name rather than by scope: `@tanstack/react-virtual` is a
 * legitimate optional peer, so `@tanstack/` as a whole is not the line.
 */

const ROOT = path.join(import.meta.dirname, "..");

const ROUTERS = [
  "@tanstack/react-router",
  "@tanstack/router",
  "@tanstack/start",
  "@tanstack/react-start",
  "react-router",
  "react-router-dom",
  "next/link",
  "next/navigation",
  "next/router",
  "wouter",
];

// `from "x"`, `import "x"`, `import("x")` and `require("x")`, for x or x/sub.
const IMPORT = /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)["']([^"']+)["']/g;

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sources(full);
    return /\.(ts|tsx)$/.test(entry.name) ? [full] : [];
  });
}

const isRouter = (specifier: string) =>
  ROUTERS.some((r) => specifier === r || specifier.startsWith(`${r}/`));

describe("router-agnostic package", () => {
  it("imports no router anywhere in src", () => {
    const offenders = sources(path.join(ROOT, "src")).flatMap((file) =>
      [...readFileSync(file, "utf8").matchAll(IMPORT)]
        .map((m) => m[1]!)
        .filter(isRouter)
        .map((specifier) => `${path.relative(ROOT, file)} imports ${specifier}`),
    );
    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("recognises a router import when it sees one", () => {
    expect(isRouter("@tanstack/react-router")).toBe(true);
    expect(isRouter("next/navigation")).toBe(true);
    expect(isRouter("react-router-dom")).toBe(true);
    expect(isRouter("@tanstack/react-virtual")).toBe(false);
    expect(isRouter("react-resizable-panels")).toBe(false);
  });
});
