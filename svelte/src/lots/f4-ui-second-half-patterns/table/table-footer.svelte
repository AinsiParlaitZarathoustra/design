<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  interface Props extends Omit<HTMLAttributes<HTMLTableSectionElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<tfoot
  data-slot="table-footer"
  {...rest}
  class={cn(
    "border-t border-border-subtle font-medium text-secondary-foreground",
    className,
  )}
>
  {@render children?.()}
</tfoot>
