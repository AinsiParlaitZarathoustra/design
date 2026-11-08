<script lang="ts">
  import DiffStat from "../deps/diff-stat.svelte";
  import type { DiffData } from "./session-view";
  import PayloadFrame from "./payload-frame.svelte";
  import PayloadLines from "./payload-lines.svelte";
  import type { ToolCallCardLabels } from "./tool-call-labels";
  import { diffLines } from "./tool-call-text";

  /**
   * A diff as the patch's lines, tinted by sign, or the old text above the new
   * when there is no patch (`DefaultDiff`). The fallback for the card's `renderDiff`.
   */
  interface Props {
    diff: DiffData;
    labels?: Partial<Pick<ToolCallCardLabels, "showMore">>;
  }

  let { diff, labels }: Props = $props();

  const parts = $derived(diffLines(diff));
  const known = $derived(diff.insertions !== undefined || diff.deletions !== undefined);
</script>

{#snippet diffAside()}
  {#if known}
    <DiffStat added={diff.insertions ?? 0} removed={diff.deletions ?? 0} class="font-mono" />
  {/if}
{/snippet}

<div data-slot="default-diff">
  <PayloadFrame label={diff.path} aside={diffAside}>
    {#snippet children()}
      {#if parts.lines.length > 0}
        <PayloadLines lines={parts.lines} from="head" tone={parts.tone} showMore={labels?.showMore} />
      {:else}
        <p class="px-3 py-1.5 font-mono text-xs text-disabled">No changes recorded.</p>
      {/if}
    {/snippet}
  </PayloadFrame>
</div>
