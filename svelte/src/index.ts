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
