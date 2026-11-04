"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../../lib/utils.ts";

type PillSize = "xs" | "sm";
type PillSurface = "default" | "raised";

/** Gap and padding per size. `trailingAction` pulls the end in so a round
 *  16px button at the end sits evenly inside the pill's curve. */
const SPACING: Record<
  PillSize,
  Record<"default" | "trailingAction", [gap: string, padding: string]>
> = {
  xs: { default: ["gap-1.5", "px-2"], trailingAction: ["gap-1", "ps-2 pe-0.5"] },
  sm: { default: ["gap-2", "px-3"], trailingAction: ["gap-1", "ps-2 pe-1"] },
};

export interface PillProps extends useRender.ComponentProps<"span"> {
  /** `xs` (20px, `text-2xs`) is the default. `sm` (24px, `text-xs`) is a pill
   *  that stands on its own: a queued prompt, a status over a panel. */
  size?: PillSize;
  /** The pill ends in its own button (remove, dismiss): the end padding
   *  tightens and the gap closes up. */
  trailingAction?: boolean;
  /** `raised` floats over content (a status over a dimmed panel): no outline,
   *  `shadow-sm` instead, so it reads as a layer above rather than a chip on
   *  the surface. */
  surface?: PillSurface;
}

/**
 * A rounded-full chip: a filter token, a breadcrumb crumb, an agent tag.
 *
 * Distinct from <Badge> by shape and by job. A badge states a fact about a row
 * ("Admin", "Live"). A pill is usually interactive or removable, and its full
 * radius is what says so.
 */
function Pill({
  className,
  render,
  size = "xs",
  trailingAction = false,
  surface = "default",
  ...props
}: PillProps) {
  const [gap, padding] = SPACING[size][trailingAction ? "trailingAction" : "default"];
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(
          // Token order matches the class string from before the variants,
          // so a default pill's `class` attribute is unchanged.
          "inline-flex",
          size === "sm" ? "h-control-sm" : "h-control-xs",
          "w-fit shrink-0 items-center",
          gap,
          "rounded-full border",
          surface === "raised" ? "border-transparent shadow-sm" : "border-border",
          "bg-card",
          padding,
          size === "sm" ? "text-xs" : "text-2xs",
          "font-medium",
          "whitespace-nowrap text-secondary-foreground select-none",
          "[&>svg]:pointer-events-none [&>svg]:size-3",
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: "pill" },
  });
}

export { Pill };
export type { PillSize, PillSurface };
