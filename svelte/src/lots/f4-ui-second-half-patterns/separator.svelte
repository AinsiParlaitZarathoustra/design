<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /**
   * A hairline rule. Defaults to `border-subtle`, not `border`: a separator
   * inside a card divides things that already share a surface. Pass `strong`
   * where it separates two regions.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
    class?: string;
    orientation?: "horizontal" | "vertical";
    strong?: boolean;
  }

  let { class: className, orientation = "horizontal", strong = false, ...rest }: Props = $props();
</script>

<div
  role="separator"
  aria-orientation={orientation}
  data-slot="separator"
  data-orientation={orientation}
  {...rest}
  class={cn(
    "shrink-0",
    strong ? "bg-border" : "bg-border-subtle",
    orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
    className,
  )}
></div>
