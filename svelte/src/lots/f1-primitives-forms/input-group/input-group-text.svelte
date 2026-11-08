<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /** Static text in an addon, ported from `InputGroupText`. */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<span
  class={cn(
    "flex items-center gap-2 text-xs text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</span>
