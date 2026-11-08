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

<thead
  data-slot="table-header"
  {...rest}
  class={cn("[&_tr]:border-b [&_tr]:border-border-subtle", className)}
>
  {@render children?.()}
</thead>
