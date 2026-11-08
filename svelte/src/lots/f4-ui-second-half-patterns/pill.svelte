<script module lang="ts">
  export type PillSize = "xs" | "sm";
  export type PillSurface = "default" | "raised";

  /** Gap and padding per size. `trailingAction` pulls the end in so a round
   *  16px button at the end sits evenly inside the pill's curve. */
  const SPACING: Record<
    PillSize,
    Record<"default" | "trailingAction", [gap: string, padding: string]>
  > = {
    xs: { default: ["gap-1.5", "px-2"], trailingAction: ["gap-1", "ps-2 pe-0.5"] },
    sm: { default: ["gap-2", "px-3"], trailingAction: ["gap-1", "ps-2 pe-1"] },
  };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /**
   * A rounded-full chip: a filter token, a breadcrumb crumb, an agent tag.
   *
   * Distinct from a badge by shape and by job. A badge states a fact about a
   * row. A pill is usually interactive or removable, and its full radius is
   * what says so.
   *
   * `child` is the Svelte form of Base UI's `render`: it receives the pill's
   * props (class and data-slot included) to put on the element it draws.
   */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    /** `xs` (20px, `text-2xs`) is the default. `sm` (24px, `text-xs`) stands on its own. */
    size?: PillSize;
    /** The pill ends in its own button (remove, dismiss): the end padding tightens. */
    trailingAction?: boolean;
    /** `raised` floats over content: no outline, `shadow-sm` instead. */
    surface?: PillSurface;
    class?: string;
    child?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
  }

  let {
    class: className,
    size = "xs",
    trailingAction = false,
    surface = "default",
    child,
    children,
    ...rest
  }: Props = $props();

  const [gap, padding] = $derived(SPACING[size][trailingAction ? "trailingAction" : "default"]);

  const pillProps = $derived({
    ...rest,
    "data-slot": "pill",
    class: cn(
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
  });
</script>

{#if child}
  {@render child(pillProps)}
{:else}
  <span {...pillProps}>{@render children?.()}</span>
{/if}
