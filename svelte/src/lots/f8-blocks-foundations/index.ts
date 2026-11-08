// Public entry of the f8 lot (blocks and foundations). The pilot branches it
// into `src/index.ts`; this file only re-exports what the lot ports.

export { default as CheckpointTrace } from "./blocks/checkpoint-trace.svelte";
export { default as TraceAvatar } from "./blocks/trace-avatar.svelte";
export {
  MINUTE,
  HOUR,
  DAY,
  TRACE_ZOOMS,
  checkpointTitle,
} from "./blocks/checkpoint-trace-model";
export { DEFAULT_TRACE_LABELS } from "./blocks/checkpoint-trace.svelte";
export type {
  CheckpointTraceProps,
  TraceDensity,
  TraceLabels,
} from "./blocks/checkpoint-trace.svelte";
export type {
  TraceAuthor,
  TraceCheckpoint,
  TraceGroup,
  TraceGroupBy,
  TraceRange,
  TraceSession,
  TraceZoom,
} from "./blocks/checkpoint-trace-model";
export { default as DashedRails } from "./blocks/dashed-rails.svelte";
export { default as DitherField } from "./blocks/dither-field.svelte";
export { default as GhostCards } from "./blocks/ghost-cards.svelte";
export { default as Globe } from "./blocks/globe.svelte";
export type { GlobeMarker } from "./blocks/globe.svelte";
export { default as GradualBlur } from "./blocks/gradual-blur.svelte";
export type { BlurCurve, BlurEdge } from "./blocks/gradual-blur.svelte";
export { default as InfiniteSlider } from "./blocks/infinite-slider.svelte";
export { default as LogoMarquee } from "./blocks/logo-marquee.svelte";
export type { Logo } from "./blocks/logo-marquee.svelte";
export { default as PlusCorners } from "./blocks/plus-corners.svelte";
export { default as PlusDecorator } from "./blocks/plus-decorator.svelte";
export type { PlusCorner } from "./blocks/plus-decorator.svelte";
export { default as ScrollRail } from "./blocks/scroll-rail.svelte";
export { default as TimelineCalendar } from "./blocks/timeline-calendar.svelte";
export type { CalendarDay, CalendarItem } from "./blocks/timeline-calendar.svelte";

// The foundations' own surface: the theme provider adapter, the HUD surface
// class, and the motion and theme constants the foundations pages read.
export { default as ThemeProvider } from "./deps/theme-provider.svelte";
export { HUD } from "./deps/hud";
export { ClaudeMark, CursorMark, GeminiMark, GitHubMark, OpenAIMark } from "./deps/brand-marks";
export { EASE_PANEL, SPRING_DOCK, SPRING_INDICATOR, SPRING_PILL, SPRING_RAIL } from "../../lib/motion";
export {
  INFINITE_ANIMATIONS,
  INFINITE_ANIMATION_FPS_VAR,
  type InfiniteAnimation,
} from "../../lib/infinite-animations";
export { BASE_RULE_REGISTRY, THEME_KEY_REGISTRY } from "../../theme/theme-key-registry";
