<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /**
   * The dashboard's cell strip: one `bg-card` block with an `element-selected`
   * hairline, the cells split by 1px gaps over a hairline-coloured backing (which,
   * unlike `divide-x`, survives the strip wrapping on a narrow screen).
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  data-slot="stat-grid"
  {...rest}
  class={cn(
    "grid gap-px overflow-hidden rounded-lg border border-element-selected bg-element-selected",
    className,
  )}
>
  {@render children?.()}
</div>
