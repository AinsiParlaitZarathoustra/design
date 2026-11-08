<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /**
   * Local adapter for `Pill` (`src/components/ui/pill.tsx`, lot f7 dependency):
   * a rounded-full chip. `xs` (20px) is the default; `sm` (24px) stands on its
   * own. `raised` floats over content with `shadow-sm` instead of an outline.
   */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    size?: "xs" | "sm";
    trailingAction?: boolean;
    surface?: "default" | "raised";
    class?: string;
    children?: Snippet;
  }

  let {
    size = "xs",
    trailingAction = false,
    surface = "default",
    class: className,
    children,
    ...rest
  }: Props = $props();

  const SPACING: Record<"xs" | "sm", Record<"default" | "trailingAction", [string, string]>> = {
    xs: { default: ["gap-1.5", "px-2"], trailingAction: ["gap-1", "ps-2 pe-0.5"] },
    sm: { default: ["gap-2", "px-3"], trailingAction: ["gap-1", "ps-2 pe-1"] },
  };
  const [gap, padding] = $derived(SPACING[size][trailingAction ? "trailingAction" : "default"]);
</script>

<span
  data-slot="pill"
  {...rest}
  class={cn(
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
  )}
>
  {@render children?.()}
</span>
