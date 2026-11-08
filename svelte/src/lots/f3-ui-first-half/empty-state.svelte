<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import Icon from "../../ui/icon.svelte";

  /**
   * What a pane says when it has nothing to show: one dim glyph, one sentence,
   * and, only when there is a real next step, one action. Say what would be
   * here, not that there is nothing.
   *
   * `icon` takes a Lucide component, drawn through `Icon` at `md`. The React
   * source also takes an element; here that is `iconElement`, a snippet drawn
   * as given (Svelte cannot tell a component from a snippet at runtime).
   */
  interface Props {
    icon?: any;
    iconElement?: Snippet;
    title: string;
    description?: string;
    action?: Snippet;
    class?: string;
    [attribute: string]: unknown;
  }

  let { icon, iconElement, title, description, action, class: className, ...rest }: Props = $props();
</script>

<div
  data-slot="empty-state"
  class={cn("flex flex-col items-center justify-center gap-2 px-6 py-12 text-center", className)}
  {...rest}
>
  {#if icon || iconElement}
    <div
      class="flex size-control-lg items-center justify-center rounded-md border border-border text-muted-foreground"
    >
      {#if iconElement}
        {@render iconElement()}
      {:else if icon}
        <Icon {icon} size="md" />
      {/if}
    </div>
  {/if}
  <div class="flex flex-col gap-1">
    <p class="text-sm font-medium text-foreground">{title}</p>
    {#if description}
      <p class="max-w-[34ch] text-xs text-balance text-muted-foreground">{description}</p>
    {/if}
  </div>
  {#if action}
    <div class="mt-1">{@render action()}</div>
  {/if}
</div>
