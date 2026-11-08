import { cva, type VariantProps } from "class-variance-authority";

/**
 * The callout's recipe (port of `calloutVariants`). Exported for a block that
 * is not a `Callout`: the same strip, on any element.
 *
 * `tucked` is the strip tucked into the top of a composer, for a notice that
 * explains the composer's state. Inset `mx-2` so the composer reads as the
 * wider element, `rounded-t-2xl` to match the composer's rounding, and `-mb-3.5`
 * against `pb-5` so the composer overlaps its lower half. `z-0` keeps it behind
 * a composer that is `relative` on a higher layer.
 *
 * Its fill is always the popover surface: the tone colours only the glyph, the
 * message is muted and truncates to one line, and actions are quiet.
 */
export const calloutVariants = cva("flex text-xs", {
  variants: {
    variant: {
      default: "items-start gap-2 rounded-md border px-3 py-2",
      tucked:
        "relative z-0 mx-2 -mb-3.5 items-center gap-1.5 rounded-t-2xl bg-popover px-3.5 pt-1.5 pb-5",
    },
    tone: {
      neutral: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      tone: "neutral",
      class: "border-border bg-card text-secondary-foreground",
    },
    { variant: "default", tone: "info", class: "border-transparent bg-info-muted text-info" },
    {
      variant: "default",
      tone: "success",
      class: "border-transparent bg-success-muted text-success",
    },
    {
      variant: "default",
      tone: "warning",
      class: "border-transparent bg-warning-muted text-warning",
    },
    {
      variant: "default",
      tone: "error",
      class: "border-transparent bg-error-muted text-error",
    },
  ],
  defaultVariants: { variant: "default", tone: "neutral" },
});

export type CalloutVariants = VariantProps<typeof calloutVariants>;
export type CalloutVariant = NonNullable<CalloutVariants["variant"]>;
export type CalloutTone = NonNullable<CalloutVariants["tone"]>;
