import { cn } from "../../lib/utils.ts";
import { HUE_BG, HUE_CHIP } from "../../lib/hue.ts";
import type { LabelTone } from "../../lib/types.ts";

/**
 * The hue-coded identity chip.
 *
 * A hue is an IDENTITY, not a status — `purple` means "the Design label",
 * not "informational". Shaped exactly like a `Badge` (same radius, padding
 * and type), with the hue where a badge has its status tone: the hue's own
 * ink on the hue at 12%. For status use `<Badge>`; for a stable hue for any
 * entity use `hueFor(id)`.
 */
function Tag({
  hue = "grey",
  dot = false,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & { hue?: LabelTone; dot?: boolean }) {
  return (
    <span
      data-slot="tag"
      data-hue={hue}
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1 rounded px-1.5 py-px",
        "text-2xs font-medium whitespace-nowrap select-none",
        HUE_CHIP[hue],
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

/** The bare dot, for a rail item or a legend where the word is already there. */
function HueDot({ hue, className, ...props }: React.ComponentProps<"span"> & { hue: LabelTone }) {
  return (
    <span
      data-slot="hue-dot"
      aria-hidden="true"
      className={cn("size-1.5 shrink-0 rounded-full", HUE_BG[hue], className)}
      {...props}
    />
  );
}

/**
 * A label as it appears inside a dense row: a hue dot and the name, no chip.
 * In a table the chip was the loudest shape in the row; here identity is
 * carried by the dot alone. Use `<Tag>` where a label stands on its own — a
 * header, a detail panel — and this where it is one cell among many.
 */
function LabelMark({
  hue,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & { hue: LabelTone }) {
  return (
    <span
      data-slot="label-mark"
      data-hue={hue}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs whitespace-nowrap text-secondary-foreground",
        className,
      )}
      {...props}
    >
      <HueDot hue={hue} />
      {children}
    </span>
  );
}

export { HueDot, LabelMark, Tag };
