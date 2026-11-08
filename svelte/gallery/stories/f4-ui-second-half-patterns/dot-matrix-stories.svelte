<script lang="ts">
  import DotMatrix from "../../../src/lots/f4-ui-second-half-patterns/dot-matrix.svelte";
  import SegmentMeter from "../../../src/lots/f4-ui-second-half-patterns/segment-meter.svelte";
  import { HUES } from "../../../src/lib/hue";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const WEEKS = [
    12, 18, 9, 22, 30, 14, 4, 26, 31, 19, 24, 40, 12, 8, 33, 37, 28, 45, 20, 11, 6, 29, 41, 35, 38,
    52, 18, 9,
  ];
  const EMPTY = Array(28).fill(0);
  const GAPS: (number | null)[] = [4, 8, null, null, 6, 0, 0, 12, 9, null, 14, 18, 10, 7];
  const MANY = Array.from({ length: 120 }, (_, i) => Math.abs(Math.sin(i / 6)) * 40 + (i % 5));
  const SHARES = [0, 0.04, 0.38, 0.72, 1];
  const GAUGES = [0.12, 0.64, 0.86, 1];
  // The `{#if}` blocks keep the text nodes of "{n}%" apart, as the oracle has them.
</script>

<div class="w-72">
  {#if story === "default"}
    <DotMatrix values={WEEKS} rows={7} maxColumns={60} />
  {:else if story === "empty"}
    <DotMatrix values={EMPTY} rows={7} maxColumns={60} />
  {:else if story === "with-gaps"}
    <DotMatrix values={GAPS} rows={7} maxColumns={60} />
  {:else if story === "many-items"}
    <DotMatrix values={MANY} rows={7} maxColumns={60} />
  {:else if story === "meter"}
    <div class="flex w-72 flex-col gap-3">
      {#each SHARES as v (v)}
        <div class="flex flex-col gap-1">
          <span class="caption tabular-nums">{Math.round(v * 100)}{#if v >= 0}%{/if}</span>
          <SegmentMeter value={v} label="Budget used" />
        </div>
      {/each}
    </div>
  {:else if story === "gauge"}
    <div class="flex w-72 flex-col gap-4">
      {#each GAUGES as v (v)}
        <div class="flex flex-col gap-1.5">
          <span class="caption tabular-nums">{Math.round(v * 100)}{#if v >= 0}% of the context window{/if}</span>
          <SegmentMeter variant="gauge" value={v} label={`Context window, ${Math.round(v * 100)}%`} />
        </div>
      {/each}
      <div class="flex flex-col gap-1.5">
        <span class="caption">No warning band (warnAt 1), 32 ticks</span>
        <SegmentMeter variant="gauge" value={0.7} warnAt={1} segments={32} label="Cache hit rate" />
      </div>
    </div>
  {:else if story === "meter-hues"}
    <div class="flex w-72 flex-col gap-3">
      {#each HUES as hue, i (hue)}
        <div class="flex flex-col gap-1">
          <span class="caption">{hue}</span>
          <SegmentMeter value={0.15 + i * 0.09} {hue} label={hue} />
        </div>
      {/each}
    </div>
  {/if}
</div>
