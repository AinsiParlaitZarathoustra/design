<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /**
   * Local adapter for `StatusDot` (`src/components/ui/status-dot.tsx`). A
   * dot takes its colour from `tone` as ink; a `label` makes it `role="img"`,
   * without one it is `aria-hidden` and the text beside it carries the state.
   */
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
  export type StatusDotCutout = "background" | "card" | "popover" | "sidebar" | "panel";

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class"> {
    tone?: StatusDotTone;
    size?: StatusDotSize;
    /** A ring instead of a disc: the "off" shape. */
    hollow?: boolean;
    /** The surface under the dot, drawn as a 2px ring around it. */
    cutout?: StatusDotCutout;
    /** The state in words, when nothing beside the dot says it. */
    label?: string;
    class?: string;
  }

  let {
    tone = "neutral",
    size = "sm",
    hollow = false,
    cutout,
    label,
    class: className,
    ...rest
  }: Props = $props();

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

  const name = $derived(label ?? (rest["aria-label"] as string | undefined));
</script>

<span
  data-slot="status-dot"
  data-tone={tone}
  data-size={size}
  {...rest}
  role={name ? "img" : undefined}
  aria-label={name || undefined}
  aria-hidden={name ? undefined : "true"}
  class={cn(
    "inline-block shrink-0 rounded-full",
    SIZE[size],
    TONE[tone],
    hollow ? "border border-current" : "bg-current",
    cutout && CUTOUT[cutout],
    className,
  )}
></span>
