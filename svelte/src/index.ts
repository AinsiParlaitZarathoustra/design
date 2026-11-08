// The Svelte port's component entry. It mirrors `@tryatlas/design`'s root
// entry family by family; a family that is not ported yet is absent here and
// marked in `manifest.json`, rather than exported as an empty placeholder.

export { default as Icon } from "./ui/icon.svelte";
export { ICON_SIZES, ICON_STROKE_WIDTH, type IconSize } from "./ui/icon.svelte";
export { default as Button } from "./ui/button.svelte";
export { buttonVariants } from "./ui/button-variants";
export { default as IconButton } from "./ui/icon-button.svelte";
export { iconButtonVariants } from "./ui/icon-button-variants";
export { default as Badge } from "./ui/badge.svelte";
export { badgeVariants } from "./ui/badge-variants";
export { default as Input } from "./ui/input.svelte";
export { inputVariants } from "./ui/input-variants";
export { default as Kbd } from "./ui/kbd.svelte";
export { default as KbdCombo } from "./ui/kbd-combo.svelte";
export { default as KbdKeys } from "./ui/kbd-keys.svelte";
export { kbdVariants } from "./ui/kbd-variants";
export { default as Hint } from "./ui/hint.svelte";
export { default as Spinner } from "./components/ui/spinner.svelte";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog/index";
export type { DialogApi, DialogPhase } from "./ui/dialog/context";

export { default as TabStrip } from "./components/layout/tab-strip.svelte";
export type { TabStripItem } from "./components/layout/tab-strip-logic";

export { cn } from "./lib/utils";

// Lot exports, one line per family (the pilot wires each lot index).
export * from "./lots/f5-layout-shell/index";
export * from "./lots/f8-blocks-foundations/index";
export * from "./lots/f4-ui-second-half-patterns/index";
export * from "./lots/f7-session-comms/index";
export * from "./lots/f1-primitives-forms/index";
export * from "./lots/f2-overlays-menus/index";
export * from "./lots/f3-ui-first-half/index";
export * from "./lots/f6-canvas-code/index";
// React's root and "./session" export the session helper only; the code-surface
// helper is internal. The explicit export wins over the two `export *` lines.
export { formatDuration } from "./lots/f7-session-comms/session/session-view-helpers";

// Switch is owned by lot F1 (its stories); F2 carries a private copy, to dedupe later.
export { default as Switch } from "./lots/f1-primitives-forms/switch.svelte";

// Hooks, providers, props types and helpers of the root entry that had no Svelte export yet.
export {
  ACTOR_COLOUR_HUE,
  actorHue,
  PEER_INK,
} from "./lib/actor-hue";
export type {
  BadgeProps,
  ButtonProps,
  CommandPaletteProps,
  CommandPaletteViewProps,
  CommandSize,
  CommandSuggestionsProps,
  CommsComposerShellProps,
  CommsConversationRowProps,
  CommsDayDividerProps,
  CommsUnreadLineProps,
  DialogContentSize,
  DialogContentVariant,
  EditorBreadcrumbsProps,
  EditorFrameProps,
  EditorPreviewProps,
  EditorStatusBarProps,
  FindBarProps,
  HintOverlayProps,
  IconButtonProps,
  IconProps,
  InfiniteSliderProps,
  InputProps,
  KbdKeysProps,
  KbdProps,
  LinkProps,
  NextPageProps,
  PillProps,
  RailProps,
  SearchOverlayProps,
  StatusDotProps,
  StepListProps,
  SwitchProps,
  TabStripTabProps,
  TerminalBlockProps,
  TerminalCommandInputProps,
  TerminalOutputProps,
  TerminalStatusProps,
  TerminalStopControlProps,
  GradualBlurProps,
} from "./lots/exports-20261108/props";
export {
  clampUiScale,
  UI_SCALE_DEFAULT,
  UI_SCALE_PRESETS,
  UI_SCALE_STEP,
} from "./lots/f5-layout-shell/shell/ui-scale";
export { default as CommandHints } from "./lots/f2-overlays-menus/command-hints.svelte";
export { default as CommandList } from "./lots/f2-overlays-menus/command-list-rows.svelte";
export { default as CommandPalette } from "./lots/f2-overlays-menus/command-palette.svelte";
export type {
  CommandPaletteGroup,
  CommandPaletteItem,
  HighlightSegment,
} from "./lots/f2-overlays-menus/command-list";
export { default as CommandPaletteView } from "./lots/f2-overlays-menus/command-palette-view.svelte";
export { default as CommandRow } from "./lots/f2-overlays-menus/command-row.svelte";
export { COMMS_GROUP_WINDOW_MS } from "./lots/f7-session-comms/comms/comms-view-helpers";
export type { CommsUnreadBadge } from "./lots/f7-session-comms/comms/comms-view-helpers";
export { default as ContextMenuRadioGroup } from "./lots/f2-overlays-menus/dropdown-menu-radio-group.svelte";
export { D23_RENAMES } from "./lib/d23-renames";
export type { D23Rename } from "./lib/d23-renames";
export {
  filterCommandGroups,
  normalizeSearchText,
  optionId,
  selectableIds,
  splitHighlights,
  stepHighlight,
} from "./lots/f2-overlays-menus/command-list";
export {
  HINT_ALPHABET,
  HINT_OVERLAY_ATTR,
  HINT_SELECTOR,
  scanHintTargets,
  activateHintTarget,
  generateHintLabels,
} from "./lots/f2-overlays-menus/hint-targets";
export { default as HintOverlay } from "./lots/f2-overlays-menus/hint-overlay.svelte";
export type { HintTarget } from "./lots/f2-overlays-menus/hint-targets";
export { hintTriggerProps } from "./lots/exports-20261108/hint-trigger-props";
export {
  HUE_BG,
  HUE_CHIP,
  hueFor,
} from "./lib/hue";
export { infiniteAnimationFps } from "./lib/infinite-animations";
export { initialsOf } from "./lib/initials";
export { isFocusVisible } from "./lots/f2-overlays-menus/tooltip-context";
export {
  isTooltipWarm,
  markTooltipClosed,
  markTooltipOpen,
  prefersReducedMotion,
  resetTooltipTiming,
  slideTransition,
  TOOLTIP_EASE,
  TOOLTIP_FADE_IN_MS,
  TOOLTIP_FADE_OUT_MS,
  TOOLTIP_OPEN_DELAY,
  TOOLTIP_SLIDE_MS,
  TOOLTIP_WARM_WINDOW,
} from "./ui/tooltip-timing";
export { default as KbdGroup } from "./lots/f2-overlays-menus/deps/kbd-group.svelte";
export type { KeyPlatform } from "./lib/combo";
export type {
  LabelTone,
  Organisation,
  Role,
  Session,
  SessionLabel,
  SessionPriority,
  SessionStatus,
} from "./lib/types";
export type { LinkComponent } from "./lots/f5-layout-shell/deps/link";
export { default as LinkProvider } from "./lots/exports-20261108/link-provider.svelte";
export { linkVariants } from "./lots/f4-ui-second-half-patterns/text-link-variants";
export { default as ModelMark } from "./lots/f4-ui-second-half-patterns/model-mark.svelte";
export { PACKAGE_SENTINEL_CLASS } from "./lib/sentinel";
export {
  PANEL_ENTER,
  PANEL_STAGGER,
} from "./lib/motion";
export {
  platformKey,
  platformKeys,
  splitGlyphCombo,
  detectKeyPlatform,
} from "./lib/combo";
export { default as PopoverClose } from "./lots/exports-20261108/popover-close.svelte";
export {
  resolveColor,
  resolveToken,
  rgbString,
} from "./lib/resolved-color";
export type { Rgb } from "./lib/resolved-color";
export { default as SearchOverlay } from "./lots/f2-overlays-menus/search-overlay.svelte";
export type {
  SearchResult,
  SearchStatus,
} from "./lots/f2-overlays-menus/search-overlay-types";
export { default as SearchResultRow } from "./lots/f2-overlays-menus/search-result-row.svelte";
export type { SessionStatusKind } from "./lots/f4-ui-second-half-patterns/status-icon.svelte";
export { slideGeometry } from "./lots/f1-primitives-forms/hint-group/slide-geometry";
export type { SlideGeometry } from "./lots/f1-primitives-forms/hint-group/slide-geometry";
export type {
  StatusDotCutout,
  StatusDotSize,
} from "./lots/f4-ui-second-half-patterns/status-dot.svelte";
export { tabsListVariants } from "./lots/f4-ui-second-half-patterns/tabs/tabs-variants";
export { default as TerminalOutputLine } from "./lots/f6-canvas-code/code-surface/terminal-output-line.svelte";
export { themeInitScript } from "./lib/theme-script";
export type {
  ThemeSetting,
  Appearance,
} from "./lots/exports-20261108/use-theme.svelte";
export { toggleVariants } from "./lots/f1-primitives-forms/toggle-variants";
export { useLinks } from "./lots/exports-20261108/use-links";
export { useListHighlight } from "./lots/exports-20261108/use-list-highlight.svelte";
export { useMeasure } from "./lots/exports-20261108/use-measure.svelte";
export { useTheme } from "./lots/exports-20261108/use-theme.svelte";
