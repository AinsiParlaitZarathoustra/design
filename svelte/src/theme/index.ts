/**
 * `@tryatlas/design/theme`: the pure half of the theme engine (ADR-0022,
 * ADR-0027). Reading, resolving and colour maths only — nothing here touches
 * the DOM, so applying a resolved theme stays the app's job.
 */
export { alphaOf, hexOf } from "./values";
export {
  colorToCss,
  contrastRatio,
  hsvToHex,
  lighten,
  mix,
  parseColor,
  readable,
  toHsv,
  withAlpha,
  type HsvColor,
  type RgbaColor,
} from "./color";
export { themeFromToml } from "./parse-theme";
export {
  resolveBase,
  resolveTheme,
  type ResolvedTheme,
  type ThemeOverride,
} from "./resolve-theme";
export * from "./theme-key-registry";
export type * from "./types";
