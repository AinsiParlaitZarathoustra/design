import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * `canvas.css` themes xyflow by setting the `--xy-*` names its stylesheet
 * reads. A name left out falls back to the library's own fixed palette,
 * which renders fine in one appearance and wrong in the other, so nothing
 * but this list notices. The names are @xyflow/react 12's.
 */

const ROOT = path.join(import.meta.dirname, "..");
const css = readFileSync(path.join(ROOT, "src/styles/canvas.css"), "utf8");

const NAMES = [
  "--xy-background-color",
  "--xy-background-pattern-dots-color",
  "--xy-edge-stroke",
  "--xy-edge-stroke-selected",
  "--xy-edge-label-background-color",
  "--xy-edge-label-color",
  "--xy-connectionline-stroke",
  "--xy-handle-background-color",
  "--xy-handle-border-color",
  "--xy-selection-background-color",
  "--xy-selection-border",
  "--xy-node-background-color",
  "--xy-node-color",
  "--xy-node-border",
  "--xy-node-boxshadow-selected",
  "--xy-node-group-background-color",
  "--xy-resize-background-color",
  "--xy-minimap-background-color",
  "--xy-minimap-mask-background-color",
  "--xy-minimap-mask-stroke-color",
  "--xy-minimap-node-background-color",
  "--xy-minimap-node-stroke-color",
  "--xy-controls-button-background-color",
  "--xy-controls-button-background-color-hover",
  "--xy-controls-button-color",
  "--xy-controls-button-color-hover",
  "--xy-controls-button-border-color",
  "--xy-controls-box-shadow",
  "--xy-attribution-background-color",
];

describe("canvas.css", () => {
  it.each(NAMES)("declares %s", (name) => {
    expect(css).toMatch(new RegExp(`^\\s*${name}:`, "m"));
  });

  it("names theme roles only: no colour literals, no --atlas- names", () => {
    const code = css.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(code).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(code).not.toMatch(/\brgba?\(|\bhsla?\(/);
    expect(css).not.toContain("--atlas-");
  });

  it("is imported by both stylesheet entries", () => {
    for (const entry of ["styles.css", "styles-core.css"]) {
      const text = readFileSync(path.join(ROOT, "src/styles", entry), "utf8");
      expect(text, entry).toContain('@import "./canvas.css";');
    }
  });
});
