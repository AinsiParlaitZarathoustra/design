<script lang="ts">
  import MeterCard from "../../../src/lots/f4-ui-second-half-patterns/meter-card.svelte";
  import StatCard from "../../../src/lots/f4-ui-second-half-patterns/stat-card.svelte";
  import StatGrid from "../../../src/lots/f4-ui-second-half-patterns/stat-grid.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const series = (seed: number) =>
    Array.from({ length: 30 }, (_, i) =>
      Math.round(Math.abs(Math.sin((i + seed) / 4)) * 30 + (i % 3) * 4),
    );
  const ZEROS = Array(30).fill(0);
</script>

{#if story === "default"}
  <StatGrid class="w-56">
    <StatCard label="Tokens" value="1.24M" trend={0.08} series={series(2)} />
  </StatGrid>
{:else if story === "with-badge"}
  <StatGrid class="w-56">
    <StatCard label="Spend" badge="est." value="$182.40" trend={0.08} series={series(2)} />
  </StatGrid>
{:else if story === "empty"}
  <StatGrid class="w-56">
    <StatCard label="Tokens" value="0" trend={null} series={ZEROS} />
  </StatGrid>
{:else if story === "long-text"}
  <StatGrid class="w-56">
    <StatCard label="Tokens across every attached project" badge="est." value="1,240,118,442" trend={0.08} series={series(2)} />
  </StatGrid>
{:else if story === "grid"}
  <StatGrid class="w-200 grid-cols-2 md:grid-cols-4">
    <StatCard label="Tokens" value="1.24M" trend={0.08} series={series(1)} />
    <StatCard label="Sessions" value="48" trend={-0.03} series={series(5)} />
    <StatCard label="Spend" badge="est." value="$182.40" trend={0} series={series(9)} />
    <StatCard label="Agents" value="6" trend={null} series={series(3)} />
  </StatGrid>
{:else if story === "meters"}
  <StatGrid class="w-200 grid-cols-2 md:grid-cols-4">
    <MeterCard label="Input" value="612K" share={0.49} hue="blue" />
    <MeterCard label="Output" value="148K" share={0.12} hue="purple" />
    <MeterCard label="Cache read" value="455K" share={0.37} hue="green" />
    <MeterCard label="Cache write" value="25K" share={0.02} hue="orange" />
  </StatGrid>
{:else if story === "meter-no-hue"}
  <StatGrid class="w-56">
    <MeterCard label="Context used" value="128K" share={0.64} />
  </StatGrid>
{/if}
