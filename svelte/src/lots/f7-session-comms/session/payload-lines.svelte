<script lang="ts">
  import { cn } from "../../../lib/utils";
  import Button from "../../../ui/button.svelte";
  import { DEFAULT_TOOL_CALL_CARD_LABELS, LINES_INITIAL, LINES_STEP } from "./tool-call-labels";
  import type { LineTone } from "./tool-call-labels";

  /**
   * At most `LINES_INITIAL` lines, the head or the tail, and a button for the
   * next 2,000 (`Lines`). The text is split once per payload by the caller.
   */
  interface Props {
    lines: string[];
    from: "head" | "tail";
    showMore?: (n: number) => string;
    tone?: (line: string) => LineTone;
    /** Lines in the surface's own ink rather than the secondary one. */
    dim?: boolean;
  }

  let {
    lines,
    from,
    showMore = DEFAULT_TOOL_CALL_CARD_LABELS.showMore,
    tone,
    dim = false,
  }: Props = $props();

  let shown = $state(LINES_INITIAL);
  const hidden = $derived(Math.max(0, lines.length - shown));
  const visible = $derived(
    hidden === 0 ? lines : from === "head" ? lines.slice(0, shown) : lines.slice(lines.length - shown),
  );
</script>

{#snippet more()}
  {#if hidden > 0}
    <Button
      variant="ghost"
      size="sm"
      class="w-full rounded-none font-mono"
      onclick={() => (shown += LINES_STEP)}
    >
      {showMore(Math.min(LINES_STEP, hidden))}
    </Button>
  {/if}
{/snippet}

<div data-slot="payload-lines">
  {#if from === "tail"}{@render more()}{/if}
  <!-- svelte-ignore a11y_no_noninteractive_tabindex: focusable, so a keyboard can scroll what a pointer can. -->
  <div tabindex="0" class="max-h-105 overflow-auto py-1">
    <!-- The 2px edge marks which way a change went. The row is `whitespace-pre`, so
         its markup is kept on one line: no text node may precede the line. -->
    {#each visible as line, i (i)}{@const t = tone?.(line)}<div
        data-slot="payload-line"
        class={cn(
          "relative min-w-max px-3 font-mono text-sm leading-relaxed whitespace-pre",
          !dim && "text-secondary-foreground",
          t === "added" && "bg-(--diff-added-background) text-(--diff-added-text)",
          t === "removed" && "bg-(--diff-removed-background) text-(--diff-removed-text)",
          t === "hunk" && "text-muted-foreground",
        )}
      >{#if t === "added" || t === "removed"}<span
            aria-hidden="true"
            class={cn(
              "absolute inset-y-0 left-0 w-0.5",
              t === "added" ? "bg-(--diff-added-text)" : "bg-(--diff-removed-text)",
            )}
          ></span>{/if}{line || " "}</div>{/each}
  </div>
  {#if from === "head"}{@render more()}{/if}
</div>
