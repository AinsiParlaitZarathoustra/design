<script lang="ts">
  import KpiStrip, { type KpiCell } from "../../../src/lots/f4-ui-second-half-patterns/kpi-strip.svelte";
  import DeltaChip, { type DeltaTone } from "../../../src/lots/f4-ui-second-half-patterns/delta-chip.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const spark = (seed: number) =>
    Array.from({ length: 28 }, (_, i) =>
      Math.round(Math.abs(Math.sin((i + seed) / 3)) * 40 + (i % 4) * 3),
    );

  const CELLS: KpiCell[] = [
    { id: "tokens", label: "Tokens", value: "1.24M", delta: 0.08, spark: spark(1) },
    { id: "sessions", label: "Sessions", value: "48", delta: -0.03, spark: spark(4) },
    { id: "cost", label: "Spend", value: "$182.40", delta: 0, detail: "Estimated from list prices" },
    { id: "agents", label: "Active agents", value: "6", delta: null, spark: spark(9) },
  ];
  const NO_PREVIOUS: KpiCell[] = CELLS.map((c) => ({ ...c, delta: null }));
  const SINGLE: KpiCell[] = [CELLS[0]!];
  const MANY: KpiCell[] = [
    ...CELLS,
    { id: "added", label: "Lines added", value: "12,408", delta: 0.21, spark: spark(2) },
    { id: "removed", label: "Lines removed", value: "4,117", delta: 0.12, spark: spark(6) },
  ];
  const LONG: KpiCell[] = [
    {
      id: "a",
      label: "Tokens across every attached project this billing period",
      value: "1,240,118,442",
      delta: 1.42,
      spark: spark(3),
    },
    ...CELLS.slice(1, 3),
  ];
  const WITH_TONES: KpiCell[] = [
    { id: "merged", label: "Merged", value: "31", delta: 0.18, tone: "up-good", spark: spark(2) },
    {
      id: "cost",
      label: "Cost per session",
      value: "$3.80",
      delta: 0.06,
      tone: "down-good",
      spark: spark(5),
    },
    {
      id: "spend",
      label: "Spend",
      value: "$182.40",
      delta: 0.12,
      detail: "Neither good nor bad",
    },
  ];
  const TONES: DeltaTone[] = ["neutral", "up-good", "down-good"];
</script>

{#if story === "default"}
  <KpiStrip cells={CELLS} />
{:else if story === "no-previous-period"}
  <KpiStrip cells={NO_PREVIOUS} />
{:else if story === "single"}
  <div class="w-64">
    <KpiStrip cells={SINGLE} />
  </div>
{:else if story === "many-items"}
  <KpiStrip cells={MANY} />
{:else if story === "long-text"}
  <div class="w-150">
    <KpiStrip cells={LONG} />
  </div>
{:else if story === "chips"}
  <div class="flex items-center gap-2">
    <DeltaChip delta={0.08} />
    <DeltaChip delta={-0.31} />
    <DeltaChip delta={0} />
    <DeltaChip delta={2.4} />
    <span class="caption">(null renders nothing:</span>
    <DeltaChip delta={null} />
    <span class="caption">)</span>
  </div>
{:else if story === "tones"}
  <div class="grid w-fit grid-cols-[auto_repeat(3,auto)] items-center gap-x-3 gap-y-2">
    {#each TONES as tone (tone)}
      <div class="contents">
        <span class="caption">{tone}</span>
        <DeltaChip delta={0.08} {tone} />
        <DeltaChip delta={-0.12} {tone} />
        <DeltaChip delta={0} {tone} />
      </div>
    {/each}
  </div>
{:else if story === "with-tones"}
  <KpiStrip cells={WITH_TONES} />
{/if}
