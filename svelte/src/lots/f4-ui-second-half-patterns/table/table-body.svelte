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

<tbody data-slot="table-body" {...rest} class={cn(className)}>
  {@render children?.()}
</tbody>
