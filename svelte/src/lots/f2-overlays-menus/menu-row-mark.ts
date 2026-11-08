import { cn } from "../../lib/utils";

/** A checkable or selectable row: the mark sits in a left column of its own. Shared by checkbox and radio rows. */
export const menuRowMarkClass = cn(
  "relative flex items-center gap-2 rounded py-1 pr-2 pl-7",
  "text-xs cursor-pointer select-none outline-none",
  "text-secondary-foreground",
  "focus:bg-element-hover focus:text-foreground",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
);
