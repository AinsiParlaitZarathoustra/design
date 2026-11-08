<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** Where a page sits. The `<nav>` is the landmark; the list is below it. */
  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<nav aria-label="breadcrumb" data-slot="breadcrumb" class={cn(className)} {...rest}>
  {@render children?.()}
</nav>
