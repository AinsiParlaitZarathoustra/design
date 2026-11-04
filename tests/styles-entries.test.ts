import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * `styles-core.css` is `styles.css` without the built-in themes, for an app
 * that writes the theme variables itself. The two are separate files rather
 * than one importing the other so `styles.css` stays exactly what it was; this
 * keeps them from drifting apart: same imports, same `@source`, in the same
 * order, with `default-theme.css` (Atlas alone, the first-paint floor) where
 * `styles.css` has `themes.css`.
 */
const ROOT = path.join(import.meta.dirname, "..");
const read = (file: string) => readFileSync(path.join(ROOT, "src/styles", file), "utf8");
const directives = (file: string) =>
  [...read(file).matchAll(/^@(import|source) .+;$/gm)].map((m) => m[0]);

/** The declarations of the first block whose selector line is `selector {`. */
const block = (css: string, selector: string) => {
  const start = css.indexOf(`${selector} {`);
  expect(start, selector).toBeGreaterThanOrEqual(0);
  return css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start)).replace(/\s+/g, "");
};

describe("the stylesheet entries", () => {
  it("styles-core.css is styles.css with default-theme.css for themes.css", () => {
    const full = directives("styles.css");
    expect(full).toContain('@import "./themes.css";');
    expect(directives("styles-core.css")).toEqual(
      full.map((d) => (d === '@import "./themes.css";' ? '@import "./default-theme.css";' : d)),
    );
  });

  /**
   * The floor must lose to whatever the app writes. Desktop writes its resolved
   * theme at `html:root` (0,1,1), and its launch-cache replay can land BEFORE
   * this stylesheet, so source order cannot be relied on: every selector here
   * is `:root` followed only by zero-specificity `:where()`. And it is Atlas,
   * exactly as themes.css resolves it, and no other theme.
   */
  it("default-theme.css is Atlas alone, at :root specificity", () => {
    const css = read("default-theme.css");
    const selectors = [...css.matchAll(/^\s*([:[][^{]*?)\s*\{$/gm)].map((m) => m[1]);
    expect(selectors).toEqual([
      ":root",
      ':root:where(:not([data-appearance="dark"]))',
      ':root:where([data-appearance="light"])',
    ]);
    expect(css).toContain("@media (prefers-color-scheme: light) {");
    expect(css).not.toContain("[data-theme=");

    const themes = read("themes.css");
    const dark = block(themes, '[data-theme="atlas"][data-appearance="dark"]');
    const light = block(themes, '[data-theme="atlas"][data-appearance="light"]');
    expect(block(css, ":root")).toBe(dark);
    expect(block(css, ':root:where(:not([data-appearance="dark"]))')).toBe(light);
    expect(block(css, ':root:where([data-appearance="light"])')).toBe(light);
  });

  it("are both exported", () => {
    const { exports } = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));
    expect(exports["./styles.css"]).toBe("./src/styles/styles.css");
    expect(exports["./styles-core.css"]).toBe("./src/styles/styles-core.css");
  });
});
