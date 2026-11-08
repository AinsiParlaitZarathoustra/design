import { cn } from "../../lib/utils";
import { POPUP_EXIT } from "./popup-motion";

/**
 * `DropdownMenu`'s class recipes, ported from `menu-variants.ts`, for a menu that
 * cannot be a menu proper: a list that renders into an editor's popup root and
 * must never take focus (the slash menu, a mention list), so its rows are
 * highlighted by the caller (`data-active`), not focused.
 *
 * Plain functions rather than `cva`: `cva` appends a variant's classes after the
 * base, and the highlight sits in the middle of the item's list, so a `cva`
 * recipe would reorder the item's class attribute.
 */

/**
 * How a row shows that it is the one Enter would pick. `focus` is the menu's own
 * (focus moves through the rows); `active` reads `data-active`, for a list that
 * leaves focus where it is and marks the row itself.
 */
export type MenuHighlight = "focus" | "active";

interface MenuRecipeProps {
  /** Composed last, as `cn` composes it on the components. */
  className?: Parameters<typeof cn>[number];
}

/**
 * The popup surface, shared by `DropdownMenuContent` and its submenu. `motion:
 * false` drops the scale-in and the exit, for a surface that opens on a keystroke
 * many times a day and should appear at once.
 */
export function menuContentVariants({
  motion = true,
  className,
}: MenuRecipeProps & { motion?: boolean } = {}) {
  return cn(
    "max-h-(--available-height) min-w-[11rem] overflow-y-auto overflow-x-hidden",
    "rounded-lg p-0.5",
    "bg-popover border border-border text-foreground shadow-md",
    motion
      ? ["origin-[var(--transform-origin)] animate-scale-in outline-none", POPUP_EXIT]
      : "origin-[var(--transform-origin)] outline-none",
    className,
  );
}

/** A row. `data-inset`, `data-variant="destructive"` and `data-disabled` style it as on `DropdownMenuItem`. */
export function menuItemVariants({
  highlight = "focus",
  className,
}: MenuRecipeProps & { highlight?: MenuHighlight } = {}) {
  return cn(
    "group/dropdown-menu-item relative flex items-center gap-2 rounded px-2 py-1",
    "text-xs cursor-pointer select-none outline-none",
    "text-secondary-foreground",
    highlight === "active"
      ? "data-active:bg-element-hover data-active:text-foreground"
      : "focus:bg-element-hover focus:text-foreground",
    "data-[inset]:pl-6",
    highlight === "active"
      ? "data-[variant=destructive]:text-error data-[variant=destructive]:data-active:text-error"
      : "data-[variant=destructive]:text-error data-[variant=destructive]:focus:text-error",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
    // A leading glyph: px-2 + the 3.5 glyph + gap-1.5 = the checkbox and radio
    // rows' pl-7, so an icon row's label starts where theirs does.
    "has-[>svg:first-child]:gap-1.5",
    className,
  );
}

/** A group's heading. `data-inset` lines it up with inset rows. */
export function menuLabelVariants({ className }: MenuRecipeProps = {}) {
  return cn("eyebrow px-2 py-1 text-muted-foreground", "data-[inset]:pl-7", className);
}

/** The keys at a row's end. It brightens with its row, so pass the row's `highlight`. */
export function menuShortcutVariants({
  highlight = "focus",
  className,
}: MenuRecipeProps & { highlight?: MenuHighlight } = {}) {
  return cn(
    "ml-auto pl-3 text-3xs text-disabled",
    highlight === "active"
      ? "group-data-active/dropdown-menu-item:text-secondary-foreground"
      : "group-focus/dropdown-menu-item:text-secondary-foreground",
    className,
  );
}

/**
 * The right-click surface, ported from `context-menu.tsx`: the same family of
 * popup, without the dropdown's height cap, clipping its corners instead.
 */
export function contextMenuContentVariants({ className }: MenuRecipeProps = {}) {
  return cn(
    "min-w-[11rem] overflow-hidden rounded-lg p-0.5",
    "bg-popover border border-border text-foreground shadow-md",
    "origin-[var(--transform-origin)] animate-scale-in outline-none",
    POPUP_EXIT,
    className,
  );
}
