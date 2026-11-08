<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import type { CommentAnchor, DiffData, ToolCallView } from "./session-view";
  import type { CopyPayload } from "./tool-call-labels";
  import ToolCallCard from "./tool-call-card.svelte";
  import { useWindow } from "./use-window.svelte";

  /** A run's calls in one bordered box; past 80, windowed. */
  interface Props {
    calls: ToolCallView[];
    onLoadPayload?: (callId: string, part: "input" | "output") => void;
    renderDiff?: Snippet<[DiffData]>;
    commentSlot?: Snippet<[CommentAnchor]>;
    renderItemFooter?: Snippet<[{ kind: "tool"; call: ToolCallView }]>;
    openIds?: ReadonlySet<string>;
    onOpenIdsChange?: (next: ReadonlySet<string>) => void;
    onCopy?: CopyPayload;
    /** A call to keep drawn (`revealItemId`). */
    revealId?: string;
    class?: string;
  }

  let {
    calls,
    onLoadPayload,
    renderDiff,
    commentSlot,
    renderItemFooter,
    openIds,
    onOpenIdsChange,
    onCopy,
    revealId,
    class: className,
  }: Props = $props();

  const win = useWindow({ count: () => calls.length, grow: "down" });
  // A held or revealed call past the window is still drawn, so the host can scroll to it.
  const end = $derived.by(() => {
    let value = win.end;
    if (openIds || revealId !== undefined) {
      for (let i = calls.length - 1; i >= value; i--) {
        const id = calls[i]!.id;
        if (openIds?.has(id) || id === revealId) {
          value = i + 1;
          break;
        }
      }
    }
    return value;
  });

  function cardOpen(call: ToolCallView): boolean | undefined {
    return openIds ? openIds.has(call.id) : undefined;
  }

  function cardOpenChange(call: ToolCallView, next: boolean) {
    if (!openIds) return;
    const ids = new Set(openIds);
    if (next) ids.add(call.id);
    else ids.delete(call.id);
    onOpenIdsChange?.(ids);
  }
</script>

{#snippet card(call: ToolCallView)}
  <ToolCallCard
    {call}
    open={cardOpen(call)}
    onOpenChange={(next) => cardOpenChange(call, next)}
    {onCopy}
    onLoadPayload={onLoadPayload && ((part) => onLoadPayload(call.id, part))}
    {renderDiff}
    {commentSlot}
  />
{/snippet}

<div
  class={cn(
    "divide-y divide-border-subtle overflow-hidden rounded-md border border-border",
    className,
  )}
>
  {#each calls.slice(0, end) as call (call.id)}
    {#if renderItemFooter}
      <div>
        {@render card(call)}
        {@render renderItemFooter({ kind: "tool", call })}
      </div>
    {:else}
      {@render card(call)}
    {/if}
  {/each}
  {#if end < calls.length}
    <div {@attach win.sentinelRef} aria-hidden="true" class="h-px"></div>
  {/if}
</div>
