"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import { isValidElement, type ReactElement } from "react";
import type { VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils.ts";
import { resolveClassName } from "./button.tsx";
import { iconButtonVariants } from "./icon-button-variants.ts";
import { Icon, type IconSize } from "./icon.tsx";

/** The glyph step that sits inside each square. */
const GLYPH_FOR_SIZE: Record<
  NonNullable<VariantProps<typeof iconButtonVariants>["size"]>,
  IconSize
> = {
  "2xs": "xs",
  xs: "xs",
  sm: "sm",
  md: "sm",
  lg: "md",
};

export interface IconButtonProps
  extends Omit<BaseButton.Props, "children">, VariantProps<typeof iconButtonVariants> {
  /**
   * The glyph. A Lucide component (`icon={Download}`) is drawn through `Icon`
   * at the square's step. An element is drawn as given, for a glyph that is
   * not a plain Lucide icon: a refresh glyph spinning while a read is in
   * flight (an `Icon` with its own class), or one of the package's own
   * (`<RailGlyph open size="xs" />`). Size an element yourself; `iconSize` does not reach it. Prefer `Icon`
   * or a package glyph inside it: a raw Lucide element is not `aria-hidden`
   * or `shrink-0` by default.
   */
  icon: LucideIcon | ReactElement;
  /** Required: an icon-only control has no visible name. */
  label: string;
  /** Override the glyph step. Rarely needed — the square picks a sensible one.
   *  Applies to a Lucide component only. */
  iconSize?: IconSize;
}

/**
 * A square, icon-only button (decision 32), built on `@base-ui/react/button`
 * — see `button.tsx` for why and what that buys.
 *
 * shadcn covers this with `<Button size="icon">`; Atlas gives it its own
 * component because the icon-only control is the single most common thing in
 * this UI (titlebar, every panel header, every row affordance) and it has one
 * rule the text button does not: **it must carry a label**. `label` is required,
 * becomes the `aria-label`, and is what a `Tooltip` wrapper should show.
 *
 * The square is a control height, and the glyph inside is one step down from
 * it, so the icon never crowds its box:
 *
 *     xs 20px → icon xs (10)   sm 24px → icon sm (12)
 *     md 26px → icon sm (12)   lg 32px → icon md (14)
 *
 * `2xs` (16px, icon xs) sits below the ladder: a corner affordance on a tile,
 * not a control in a row. It is too small to be the only way to an action
 * that matters, so keep it for something the tile also exposes elsewhere or
 * that is cheap to redo (removing a staged image).
 *
 * `focusableWhenDisabled` defaults to `false`, same as `Button` — see there.
 * Atlas's own hint system (`Hint` / `HintGroup`, `src/ui/tooltip.tsx`) already
 * puts a tooltip on a disabled icon button explaining why; that tooltip is
 * only reachable by keyboard when the call site opts into
 * `focusableWhenDisabled` explicitly, since most disabled icon buttons in this
 * UI carry no such explanation and keeping them out of the tab order by
 * default is the less surprising choice.
 */
function IconButton({
  className,
  variant,
  size,
  shape,
  active,
  icon,
  label,
  iconSize,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <BaseButton
      data-slot="icon-button"
      type={type}
      aria-label={label}
      className={(state) =>
        cn(iconButtonVariants({ variant, size, shape, active }), resolveClassName(className, state))
      }
      {...props}
    >
      {isValidElement(icon) ? (
        icon
      ) : (
        <Icon icon={icon} size={iconSize ?? GLYPH_FOR_SIZE[size ?? "md"]} />
      )}
    </BaseButton>
  );
}

export { IconButton, iconButtonVariants };
