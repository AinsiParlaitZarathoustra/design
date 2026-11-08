<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /**
   * A hairline rule, ported from `Separator` in `src/components/ui/separator.tsx`
   * (`@base-ui/react/separator`). Local to this lot: the component is not yet
   * in the Svelte port's `src/ui`. Defaults to `border-subtle`; `strong` marks
   * a boundary between two regions.
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
  class={cn(
    "shrink-0",
    strong ? "bg-border" : "bg-border-subtle",
    orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
    className,
  )}
  {...rest}
></div>
