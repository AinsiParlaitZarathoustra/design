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
