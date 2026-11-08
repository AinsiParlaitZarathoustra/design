<script module lang="ts">
  export type StatusDotTone =
    | "neutral"
    | "subtle"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "primary"
    | "foreground";

  export type StatusDotSize = "xs" | "sm" | "md" | "lg";

  /** The surfaces a `cutout` ring can match. */
  export type StatusDotCutout = "background" | "card" | "popover" | "sidebar" | "panel";

  const TONE: Record<StatusDotTone, string> = {
    neutral: "text-muted-foreground",
    subtle: "text-border-strong",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
    info: "text-info",
    primary: "text-primary",
    foreground: "text-foreground",
  };

  const SIZE: Record<StatusDotSize, string> = {
    xs: "size-1",
    sm: "size-1.5",
    md: "size-2",
    lg: "size-2.5",
  };

  const CUTOUT: Record<StatusDotCutout, string> = {
    background: "ring-2 ring-background",
    card: "ring-2 ring-card",
    popover: "ring-2 ring-popover",
    sidebar: "ring-2 ring-sidebar",
    panel: "ring-2 ring-panel",
  };
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /**
   * A status or presence dot: the small circle that leads a pill, a row or a
   * legend entry, sits on an avatar's corner, or marks an icon as unread. It
   * takes its colour from `tone`, as ink (`bg-current`, or a ring in
   * `border-current` when `hollow`).
   *
   * A dot is decorative unless it is the only place the state is written: give
   * it a `label` and it becomes `role="img"` with that name. Without one it is
   * `aria-hidden`, and the text beside it carries the state.
   */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class"> {
    class?: string;
    tone?: StatusDotTone;
    size?: StatusDotSize;
    /** A ring instead of a disc: the "off" shape. */
    hollow?: boolean;
    /** The surface under the dot, drawn as a 2px ring around it. */
    cutout?: StatusDotCutout;
    /** The state in words, when nothing beside the dot says it. */
    label?: string;
  }

  let {
    class: className,
    tone = "neutral",
    size = "sm",
    hollow = false,
    cutout,
    label,
    ...rest
  }: Props = $props();

  const name = $derived(label ?? rest["aria-label"]);
</script>

<span
  data-slot="status-dot"
  data-tone={tone}
  data-size={size}
  role={name ? "img" : undefined}
  aria-label={name}
  aria-hidden={name ? undefined : "true"}
  {...rest}
  class={cn(
    "inline-block shrink-0 rounded-full",
    SIZE[size],
    TONE[tone],
    hollow ? "border border-current" : "bg-current",
    cutout && CUTOUT[cutout],
    className,
  )}
></span>
