<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /**
   * The atom every settings surface is built from: a bordered card of divided
   * rows. Each row is a label with an optional description on the left, and
   * exactly one control hard-right.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  data-slot="setting-card"
  {...rest}
  class={cn(
    "divide-y divide-border-subtle overflow-hidden rounded-lg border border-element-selected bg-card",
    className,
  )}
>
  {@render children?.()}
</div>
