// The server-safe entry, `@tryatlas/design/variants`. Nothing reachable from
// this file starts with "use client" (a test walks its imports to hold that),
// so a React Server Component can import it and call what it exports: the
// `cva` class recipes, to style a plain element like a primitive (a link
// that looks like a button), `Icon`, `Badge` (a plain span, no hooks), and
// `cn` to compose them.
//
// The root entry re-exports all of these too, but from a server component the
// root is the wrong door: it is a barrel of client modules, so it pulls every
// one into the client graph, and a function exported from a client module
// (`buttonVariants` included) reaches a server component as a client
// reference it cannot call.

export { buttonVariants } from "./ui/button-variants.ts";
export { iconButtonVariants } from "./ui/icon-button-variants.ts";
export { badgeVariants } from "./ui/badge-variants.ts";
export { Badge } from "./ui/badge.tsx";
export type { BadgeProps } from "./ui/badge.tsx";
export { kbdVariants } from "./ui/kbd-variants.ts";
export { inputVariants } from "./ui/input-variants.ts";
export { toggleVariants } from "./components/ui/toggle-variants.ts";
export { tabsListVariants } from "./components/ui/tabs-variants.ts";
export { linkVariants } from "./components/ui/text-link-variants.ts";
export { calloutVariants } from "./components/ui/callout.tsx";
export { Icon, ICON_SIZES, ICON_STROKE_WIDTH } from "./ui/icon.tsx";
export type { IconProps, IconSize } from "./ui/icon.tsx";
export { cn } from "./lib/utils.ts";
