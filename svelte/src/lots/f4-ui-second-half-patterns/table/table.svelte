<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLTableAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /**
   * A data table. A single hairline under the header, no zebra striping, no
   * vertical rules, 2rem rows, and the whole row highlighting on hover. The grid
   * is implied by alignment, not drawn.
   */
  interface Props extends Omit<HTMLTableAttributes, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div data-slot="table-container" class="relative w-full overflow-x-auto">
  <table data-slot="table" {...rest} class={cn("w-full caption-bottom text-xs", className)}>
    {@render children?.()}
  </table>
</div>
