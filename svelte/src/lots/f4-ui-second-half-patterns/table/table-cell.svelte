<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLTdAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  interface Props extends Omit<HTMLTdAttributes, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<td
  data-slot="table-cell"
  {...rest}
  class={cn(
    "h-8 px-3 align-middle whitespace-nowrap",
    "[&:has([role=checkbox])]:w-0 [&:has([role=checkbox])]:pr-0",
    className,
  )}
>
  {@render children?.()}
</td>
