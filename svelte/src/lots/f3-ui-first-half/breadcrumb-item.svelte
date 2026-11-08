<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<li data-slot="breadcrumb-item" class={cn("inline-flex items-center gap-1", className)} {...rest}>
  {@render children?.()}
</li>
