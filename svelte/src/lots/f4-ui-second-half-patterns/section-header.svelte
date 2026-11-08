<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import Icon from "../../ui/icon.svelte";

  /**
   * The small-caps label above a group of rows or cards. `eyebrow` rather than a
   * heading: this labels a GROUP, and a heading here would compete with the page
   * title. `title` takes text or a snippet; `icon` puts a Lucide glyph before it.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "title"> {
    class?: string;
    title: string | Snippet;
    /** A Lucide Svelte component, as `Icon` takes it. */
    icon?: any;
    description?: string;
    action?: Snippet;
  }

  let { class: className, title, icon, description, action, ...rest }: Props = $props();
</script>

{#snippet titleContent()}
  {#if typeof title === "string"}
    {title}
  {:else}
    {@render title()}
  {/if}
{/snippet}

<div
  data-slot="section-header"
  {...rest}
  class={cn("flex items-end justify-between gap-3 pb-2", className)}
>
  <div class="flex flex-col gap-0.5">
    {#if icon}
      <span class="eyebrow flex min-w-0 items-center gap-1.5">
        <span data-slot="section-header-icon" class="flex shrink-0">
          <Icon {icon} size="sm" />
        </span>
        <span class="min-w-0">{@render titleContent()}</span>
      </span>
    {:else}
      <span class="eyebrow">{@render titleContent()}</span>
    {/if}
    {#if description}
      <span class="caption">{description}</span>
    {/if}
  </div>
  {#if action}
    <div class="shrink-0 pb-0.5">{@render action()}</div>
  {/if}
</div>
