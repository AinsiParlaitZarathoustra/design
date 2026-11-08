<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * The title block at the top of a page, ported from `PageHeader` in
   * `src/components/patterns/section-header.tsx`. Adapter for the lot f4
   * pattern; the markup and classes are the source's.
   */
  interface Props {
    title: string;
    description?: string;
    action?: Snippet;
    class?: string;
  }

  let { title, description, action, class: className }: Props = $props();
</script>

<div
  data-slot="page-header"
  class={cn("flex flex-wrap items-end justify-between gap-3 pb-4", className)}
>
  <div class="min-w-0">
    <h1 class="truncate text-xl font-medium tracking-tight text-foreground">{title}</h1>
    {#if description}
      <p class="mt-0.5 truncate text-xs text-muted-foreground">{description}</p>
    {/if}
  </div>
  {#if action}
    <div class="shrink-0">{@render action()}</div>
  {/if}
</div>
