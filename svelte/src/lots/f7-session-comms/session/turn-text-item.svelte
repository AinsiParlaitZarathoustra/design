<script lang="ts">
  import type { Snippet } from "svelte";
  import type { AgentItem, CommentAnchor } from "./session-view";
  import { timeOf } from "./turn-row-helpers";
  import TurnReadRest from "./turn-read-rest.svelte";
  import TurnResponseClamp from "./turn-response-clamp.svelte";

  /**
   * One answer: the model line above the first one, then the prose (clamped
   * behind "Show more" when the turn asks), then "Read the rest" for a preview,
   * with the app's comment control in the gutter.
   */
  interface Props {
    item: Extract<AgentItem, { kind: "text" }>;
    header: boolean;
    live: boolean;
    markdown: Snippet<[string, boolean]>;
    commentSlot?: Snippet<[CommentAnchor]>;
    onLoadBody?: (id: string) => void;
    clamp: boolean;
  }

  let { item, header, live, markdown, commentSlot, onLoadBody, clamp }: Props = $props();

  const at = $derived(timeOf(item.at));
</script>

{#snippet body()}
  {@render markdown(item.text, live)}
{/snippet}

<div class="flex min-w-0 gap-2 py-2" data-comment-anchor={item.id}>
  <div class="min-w-0 flex-1">
    <!-- Provenance in one left-aligned line: the model, then the time. -->
    {#if header && (item.model || at)}
      <div class="flex h-5.5 items-center gap-1.5 font-mono text-2xs text-muted-foreground">
        {#if item.model}<span class="min-w-0 truncate">{item.model}</span>{/if}
        {#if item.model && at}<span aria-hidden="true" class="text-disabled">·</span>{/if}
        {#if at}<span class="shrink-0">{at}</span>{/if}
      </div>
    {/if}
    {#if clamp && !live}
      <TurnResponseClamp>{@render body()}</TurnResponseClamp>
    {:else}
      {@render body()}
    {/if}
    {#if item.truncated}
      {#if onLoadBody}
        <div class="mt-1 flex text-2xs text-muted-foreground">
          <TurnReadRest id={item.id} bytes={item.bytes} load={item.load} onLoad={onLoadBody} />
        </div>
      {:else}
        <p class="mt-1 text-2xs text-disabled">Truncated</p>
      {/if}
    {/if}
  </div>
  {#if commentSlot}
    <div class="shrink-0 self-start">
      {@render commentSlot({ kind: "message", id: item.id })}
    </div>
  {/if}
</div>
