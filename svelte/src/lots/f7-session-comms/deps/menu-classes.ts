/**
 * The menu recipes of `src/ui/menu-variants.ts` (lot f7 dependency, declared
 * in the report): the content panel, a row, and the separator. The popup's
 * exit motion (`POPUP_EXIT`) is included as the same class string.
 */
export const MENU_CONTENT =
  "max-h-(--available-height) min-w-[11rem] overflow-y-auto overflow-x-hidden rounded-lg p-0.5 bg-popover border border-border text-foreground shadow-md origin-[var(--transform-origin)] animate-scale-in outline-none data-ending-style:animate-scale-out motion-reduce:data-ending-style:animate-fade-out";

export const MENU_ITEM =
  "group/dropdown-menu-item relative flex items-center gap-2 rounded px-2 py-1 text-xs cursor-pointer select-none outline-none text-secondary-foreground focus:bg-element-hover focus:text-foreground data-[inset]:pl-6 data-[variant=destructive]:text-error data-[variant=destructive]:focus:text-error data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 has-[>svg:first-child]:gap-1.5";

export const MENU_SEPARATOR = "-mx-1 my-1 h-px bg-border";
