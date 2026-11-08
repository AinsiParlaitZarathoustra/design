// The server-safe entry, `@tryatlas/design-svelte/variants`: the class
// recipes and `cn` with no DOM and no Svelte runtime, the counterpart of the
// React package's `variants` entry.

export { buttonVariants } from "./ui/button-variants";
export { iconButtonVariants } from "./ui/icon-button-variants";
export { badgeVariants } from "./ui/badge-variants";
export { inputVariants } from "./ui/input-variants";
export { kbdVariants } from "./ui/kbd-variants";
export { cn } from "./lib/utils";

// The rest of the source variants entry: Badge, Icon and the menu, callout, link, tabs and toggle variants.
export type {
  BadgeProps,
  IconProps,
} from "./lots/exports-20261108/props";
export { linkVariants } from "./lots/f4-ui-second-half-patterns/text-link-variants";
export { tabsListVariants } from "./lots/f4-ui-second-half-patterns/tabs/tabs-variants";
export { toggleVariants } from "./lots/f1-primitives-forms/toggle-variants";
export { default as Badge } from "./ui/badge.svelte";
export { default as Icon } from "./ui/icon.svelte";
export {
  ICON_SIZES,
  ICON_STROKE_WIDTH,
} from "./ui/icon.svelte";
export type { IconSize } from "./ui/icon.svelte";
export type { MenuHighlight } from "./lots/f2-overlays-menus/menu-variants";
export { calloutVariants } from "./lots/f3-ui-first-half/callout-variants";
export {
  menuContentVariants,
  menuItemVariants,
  menuLabelVariants,
  menuShortcutVariants,
} from "./lots/f2-overlays-menus/menu-variants";
