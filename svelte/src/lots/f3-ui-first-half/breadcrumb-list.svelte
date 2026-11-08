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

<ol
  data-slot="breadcrumb-list"
  class={cn(
    "flex flex-wrap items-center gap-1 text-xs wrap-break-word text-muted-foreground",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</ol>
