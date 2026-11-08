<script module lang="ts">
  import type { DeltaTone } from "./delta-chip.svelte";

  export type KpiCell = {
    id: string;
    label: string;
    value: string;
    /** Change against the previous period as a fraction (0.08 is +8%). `null` when there is no previous period. */
    delta?: number | null;
    /** The trend, one value per period, oldest first. */
    spark?: ReadonlyArray<number | null>;
    /** A neutral note under the figure, for spend and other unjudged figures. */
    detail?: string;
    /** Which way is good news for this figure; see `DeltaChip`. */
    tone?: DeltaTone;
  };
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";
  import DeltaChip from "./delta-chip.svelte";
  import DotMatrix from "./dot-matrix.svelte";

  /**
   * A headline band: figures separated by hairlines inside one card, each a
   * caption, the number, its period-over-period chip and the trend that
   * produced it.
   */
  interface Props {
    cells: Array<KpiCell>;
    class?: string;
  }

  let { cells, class: className }: Props = $props();
</script>

<div
  data-slot="kpi-strip"
  class={cn(
    "grid divide-x divide-element-selected rounded-lg border border-element-selected bg-card",
    className,
  )}
  style="grid-template-columns: repeat({cells.length}, minmax(0, 1fr));"
>
  {#each cells as cell (cell.id)}
    <div class="min-w-0 px-3.5 py-3">
      <div class="truncate eyebrow">{cell.label}</div>
      <div class="mt-1.5 flex items-baseline gap-2">
        <span class="truncate text-xl leading-none font-semibold text-foreground tabular-nums">
          {cell.value}
        </span>
        {#if cell.delta !== undefined}
          <DeltaChip delta={cell.delta} tone={cell.tone} />
        {/if}
      </div>
      {#if cell.spark}
        <DotMatrix values={cell.spark} class="mt-2.5" />
      {/if}
      {#if cell.detail}
        <div class="mt-1.5 caption">{cell.detail}</div>
      {/if}
    </div>
  {/each}
</div>
