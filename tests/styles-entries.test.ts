import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * `styles-core.css` is `styles.css` without the built-in themes, for an app
 * that writes the theme variables itself. The two are separate files rather
 * than one importing the other so `styles.css` stays exactly what it was; this
 * keeps them from drifting apart: same imports, same `@source`, in the same
 * order, minus `themes.css`.
 */
const ROOT = path.join(import.meta.dirname, "..");
const directives = (file: string) =>
  [
    ...readFileSync(path.join(ROOT, "src/styles", file), "utf8").matchAll(
      /^@(import|source) .+;$/gm,
    ),
  ].map((m) => m[0]);

describe("the stylesheet entries", () => {
  it("styles-core.css is styles.css minus themes.css", () => {
    const full = directives("styles.css");
    expect(full).toContain('@import "./themes.css";');
    expect(directives("styles-core.css")).toEqual(
      full.filter((d) => d !== '@import "./themes.css";'),
    );
  });

  it("are both exported", () => {
    const { exports } = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));
    expect(exports["./styles.css"]).toBe("./src/styles/styles.css");
    expect(exports["./styles-core.css"]).toBe("./src/styles/styles-core.css");
  });
});
