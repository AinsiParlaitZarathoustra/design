<script lang="ts">
  import { cn } from "../../lib/utils";
  import DotMatrix from "./dot-matrix.svelte";
  import DeltaChip, { type DeltaTone } from "./delta-chip.svelte";

  /**
   * A headline figure with its trend and a dot-matrix of the period. The trend is
   * the KPI strip's neutral `DeltaChip`, so a figure reads the same on the
   * dashboard as it does anywhere else a KPI is shown.
   */
  interface Props {
    label: string;
    /** A qualifier beside the label, e.g. "est." on a cost. */
    badge?: string;
    value: string;
    /** Change against the previous period as a fraction (0.08 is +8%). */
    trend?: number | null;
    /** Which way is good news for the trend. Neutral by default. */
    trendTone?: DeltaTone;
    series?: ReadonlyArray<number | null>;
    class?: string;
  }

  let { label, badge, value, trend, trendTone, series, class: className }: Props = $props();
</script>

<div class={cn("flex min-w-0 flex-col gap-1.5 bg-card px-3.5 py-3", className)}>
  <!-- Fixed height, so a badge beside one label does not push that card's figure out of line. -->
  <div class="flex h-4 items-center gap-1.5">
    <span class="truncate eyebrow">{label}</span>
    {#if badge}
      <span class="inline-flex h-4 items-center rounded-full border border-element-active px-1.5 text-3xs font-medium text-muted-foreground">{badge}</span>
    {/if}
  </div>
  <div class="flex flex-wrap items-baseline gap-2">
    <span class="text-xl leading-none font-semibold text-foreground tabular-nums">{value}</span>
    {#if trend !== undefined}
      <DeltaChip delta={trend} tone={trendTone} />
    {/if}
  </div>
  {#if series}
    <DotMatrix values={series} class="mt-auto pt-1" />
  {/if}
</div>
