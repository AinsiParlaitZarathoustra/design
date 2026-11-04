// `@tryatlas/design/blocks`: the illustration blocks, for a marketing page
// that wants them without the app primitives, Base UI or the session blocks.
// Its import graph stays inside this directory and `src/lib/` (a test walks
// it), so the only peers it needs are `react` and `motion`; cobe is fetched by
// the globe at runtime, never imported statically. No "use client" here: a
// server component may import this barrel, and each block carries its own
// directive where it needs one. `docs/website-adoption.md` is the guide.
//
// The app blocks in this directory (`ScrollRail`, `TimelineCalendar`,
// `CheckpointTrace`) are not marketing material and stay off this entry.

export { DashedRails } from "./dashed-rails.tsx";
export { DitherField } from "./dither-field.tsx";
export { GhostCards } from "./ghost-cards.tsx";
export { Globe, type GlobeMarker } from "./globe.tsx";
export { GradualBlur, type BlurEdge, type GradualBlurProps } from "./gradual-blur.tsx";
export { InfiniteSlider, type InfiniteSliderProps } from "./infinite-slider.tsx";
export { LogoMarquee, type Logo } from "./logo-marquee.tsx";
export { PlusCorners, PlusDecorator } from "./plus-decorator.tsx";

// The globe reads the appearance from `ThemeProvider`. `themeInitScript` comes
// from a module with no directive, so a server layout can call it.
export { ThemeProvider, useTheme, type Appearance, type ThemeSetting } from "../../lib/theme.tsx";
export { themeInitScript } from "../../lib/theme-script.ts";
