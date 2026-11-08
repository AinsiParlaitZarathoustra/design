<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /**
   * A cluster of icon buttons on one track, ported from `SegmentedIconGroup`
   * in `src/components/patterns/segmented.tsx`. Adapter for the lot f1/f3
   * pattern.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
    orientation?: "horizontal" | "vertical";
    class?: string;
    children?: Snippet;
  }

  let { orientation = "horizontal", class: className, children, ...rest }: Props = $props();
</script>

<div
  role="group"
  data-slot="segmented-icon-group"
  data-orientation={orientation}
  class={cn(
    "flex w-fit items-center gap-0.5 rounded-full border border-border p-0.5",
    "data-[orientation=vertical]:flex-col",
    "[&_[data-slot=icon-button]]:rounded-full",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
