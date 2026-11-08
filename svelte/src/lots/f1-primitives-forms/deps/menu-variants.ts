import { cn } from "../../../lib/utils";

/**
 * The menu recipes of `src/ui/menu-variants.ts` and `src/ui/dropdown-menu.tsx`
 * (lot f1 dependency, declared in the report): the popup surface, a row, its
 * shortcut and the rule between two groups.
 *
 * Plain functions rather than `cva`: the highlight sits in the middle of a
 * row's class list, so a `cva` recipe would reorder the item's class attribute.
 */

interface MenuRecipeProps {
  /** Composed last, as `cn` composes it on the components. */
  className?: Parameters<typeof cn>[number];
}

/** The popup surface, as `DropdownMenuContent` draws it. */
export function menuContentVariants({ className }: MenuRecipeProps = {}) {
  return cn(
    "max-h-(--available-height) min-w-[11rem] overflow-y-auto overflow-x-hidden",
    "rounded-lg p-0.5",
    "bg-popover border border-border text-foreground shadow-md",
    "origin-[var(--transform-origin)] animate-scale-in outline-none",
    "data-ending-style:animate-scale-out motion-reduce:data-ending-style:animate-fade-out",
    className,
  );
}

/** A row, as `DropdownMenuItem` draws it. */
export function menuItemVariants({ className }: MenuRecipeProps = {}) {
  return cn(
    "group/dropdown-menu-item relative flex items-center gap-2 rounded px-2 py-1",
    "text-xs cursor-pointer select-none outline-none",
    "text-secondary-foreground",
    "focus:bg-element-hover focus:text-foreground",
    "data-[inset]:pl-6",
    "data-[variant=destructive]:text-error data-[variant=destructive]:focus:text-error",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
    "has-[>svg:first-child]:gap-1.5",
    className,
  );
}

/** The keys at a row's end. It brightens with its row. */
export function menuShortcutVariants({ className }: MenuRecipeProps = {}) {
  return cn(
    "ml-auto pl-3 text-3xs text-disabled",
    "group-focus/dropdown-menu-item:text-secondary-foreground",
    className,
  );
}
