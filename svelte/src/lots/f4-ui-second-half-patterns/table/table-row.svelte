<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  interface Props extends Omit<HTMLAttributes<HTMLTableRowElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<tr
  data-slot="table-row"
  {...rest}
  class={cn(
    "border-b border-border-subtle transition-colors duration-fast ease-out-strong",
    "hover:bg-element-hover data-selected:bg-element-selected",
    "last:border-0",
    className,
  )}
>
  {@render children?.()}
</tr>
