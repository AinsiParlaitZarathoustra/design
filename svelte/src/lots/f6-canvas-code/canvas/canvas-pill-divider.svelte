<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * The hairline between groups in a pill. `vertical` is a vertical line,
   * between items in a row; `horizontal` separates items in a column.
   */
  interface Props {
    orientation?: "vertical" | "horizontal";
    class?: string;
  }

  let { orientation = "vertical", class: className }: Props = $props();
</script>

<div
  aria-hidden="true"
  class={cn(
    "shrink-0 bg-border-subtle",
    orientation === "vertical" ? "mx-0.5 h-4 w-px" : "my-0.5 h-px w-5",
    className,
  )}
></div>
