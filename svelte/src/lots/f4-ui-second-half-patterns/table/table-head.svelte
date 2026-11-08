<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLThAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /** A column heading. `eyebrow`-cased, never the same weight as the data. */
  interface Props extends Omit<HTMLThAttributes, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<th
  data-slot="table-head"
  {...rest}
  class={cn(
    "h-control-md px-3 text-left align-middle eyebrow whitespace-nowrap",
    "[&:has([role=checkbox])]:w-0 [&:has([role=checkbox])]:pr-0",
    className,
  )}
>
  {@render children?.()}
</th>
