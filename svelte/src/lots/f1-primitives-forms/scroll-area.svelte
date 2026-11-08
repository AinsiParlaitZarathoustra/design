<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /**
   * A plain overflow container, ported from `ScrollArea` in
   * `src/ui/scroll-area.tsx`: `overflow-auto` and nothing else. `ref` is the
   * element, as React's `forwardRef` exposed it.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
    ref?: HTMLDivElement | null;
  }

  let { class: className, children, ref = $bindable(null), ...rest }: Props = $props();
</script>

<div bind:this={ref} class={cn("overflow-auto", className)} {...rest}>
  {@render children?.()}
</div>
