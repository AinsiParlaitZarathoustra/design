<script lang="ts">
  import Button from "../../../ui/button.svelte";
  import Spinner from "../../../components/ui/spinner.svelte";
  import { formatBytes, stripAnsi } from "./session-view-helpers";
  import type { Payload } from "./session-view";
  import PayloadFrame from "./payload-frame.svelte";
  import PayloadLines from "./payload-lines.svelte";
  import PayloadCopy from "./payload-copy.svelte";
  import { DEFAULT_TOOL_CALL_CARD_LABELS } from "./tool-call-labels";
  import type { CopyPayload, ToolCallCardLabels } from "./tool-call-labels";
  import { splitLines } from "./tool-call-text";

  /**
   * One input or output payload (`PayloadBlock`): a binary note, or the frame
   * with its lines, Copy when the whole text is held, and a load button when
   * the payload is truncated and the app can load the rest.
   */
  interface Props {
    part: "input" | "output";
    payload: Payload;
    from: "head" | "tail";
    labels: ToolCallCardLabels;
    onCopy?: CopyPayload;
    onLoad?: () => void;
  }

  let { part, payload, from, labels, onCopy, onLoad }: Props = $props();

  // Output that came from a command carries its escapes even outside a terminal block.
  const text = $derived(payload.text ? stripAnsi(payload.text) : null);
  const lines = $derived(text ? splitLines(text) : []);
  const size = $derived(payload.bytes !== undefined ? formatBytes(payload.bytes) : undefined);
  const loading = $derived(payload.load === "loading");
</script>

{#snippet copyAside()}
  {#if onCopy && text !== null && !payload.truncated}
    <PayloadCopy {part} {text} {onCopy} {labels} />
  {/if}
{/snippet}

{#if payload.binary}
  <p class="font-mono text-xs text-muted-foreground">{labels.binary(part, size)}</p>
{:else}
  <PayloadFrame label={part === "input" ? "Input" : "Output"} aside={copyAside}>
    {#snippet children()}
      {#if lines.length > 0}
        <PayloadLines {lines} {from} showMore={labels.showMore} />
      {/if}
      {#if payload.truncated}
        {#if onLoad}
          <!-- Disabled while the app fetches, but still focusable (`aria-disabled`),
               so keyboard focus stays on the button through the load. -->
          <Button
            variant="ghost"
            size="sm"
            data-load={payload.load}
            data-disabled={loading || undefined}
            aria-disabled={loading || undefined}
            aria-busy={loading || undefined}
            class="w-full rounded-none border-t border-border-subtle font-mono"
            onclick={() => {
              if (!loading) onLoad();
            }}
          >
            {#if loading}<Spinner size="xs" label="" />{/if}
            {payload.load === "failed"
              ? (labels.loadFailed ?? DEFAULT_TOOL_CALL_CARD_LABELS.loadFailed!)(part)
              : labels.loadFull(part, size)}
          </Button>
        {:else}
          <p class="border-t border-border-subtle px-3 py-1.5 font-mono text-xs text-disabled">
            {labels.truncated(part)}
          </p>
        {/if}
      {/if}
    {/snippet}
  </PayloadFrame>
{/if}
