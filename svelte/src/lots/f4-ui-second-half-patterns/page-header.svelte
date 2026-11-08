<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /** The title block at the top of a page: name, one line of what it is, and at most one primary action. */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "title"> {
    class?: string;
    title: string;
    description?: string;
    action?: Snippet;
  }

  let { class: className, title, description, action, ...rest }: Props = $props();
</script>

<div
  data-slot="page-header"
  {...rest}
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
