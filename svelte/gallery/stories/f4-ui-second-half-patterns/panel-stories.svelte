<script lang="ts">
  import { Download } from "lucide-svelte";
  import DotMatrix from "../../../src/lots/f4-ui-second-half-patterns/dot-matrix.svelte";
  import Panel from "../../../src/lots/f4-ui-second-half-patterns/panel.svelte";
  import IconButton from "../../../src/ui/icon-button.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const SERIES = [8, 14, 9, 22, 30, 14, 4, 26, 31, 19, 24, 40, 12, 8, 33, 37, 28, 45, 20, 11];
  const STAGGER_TITLES = ["Tokens", "Sessions", "Spend"];
  const STAGGER_DELAYS = [0, 0.05, 0.1];
  const SUBTITLE = "Last 20 days, every project";
  const TITLE = "Tokens by day";
  const noop = () => {};
</script>

{#if story === "stagger"}
  <div class="grid w-200 grid-cols-3 gap-3">
    {#each STAGGER_DELAYS as delay, i (delay)}
      <Panel
        class=""
        {delay}
        title={STAGGER_TITLES[i]}
        subtitle={SUBTITLE}
        onExpand={noop}
        onFilter={noop}
      >
        <DotMatrix values={SERIES.slice(i * 2)} />
      </Panel>
    {/each}
  </div>
{:else if story === "untitled"}
  <Panel class="w-96">
    <DotMatrix values={SERIES} />
  </Panel>
{:else if story === "with-actions"}
  <Panel class="w-96" title={TITLE} subtitle={SUBTITLE} onExpand={noop} onFilter={noop}>
    {#snippet actions()}
      <IconButton icon={Download} label="Export CSV" size="sm" shape="round" />
    {/snippet}
    <DotMatrix values={SERIES} />
  </Panel>
{:else if story === "empty"}
  <Panel class="w-96" title={TITLE} subtitle={SUBTITLE} onExpand={noop} onFilter={noop}>
    <div class="flex h-24 items-center justify-center">
      <span class="caption">No sessions in this period</span>
    </div>
  </Panel>
{:else if story === "long-text"}
  <Panel
    class="w-96"
    title="Tokens by day across every attached project and every agent in this workspace"
    subtitle="Includes cached input, which is billed at a tenth of the rate, and excludes sessions still running"
    onExpand={noop}
    onFilter={noop}
  >
    <DotMatrix values={SERIES} />
  </Panel>
{:else}
  <Panel class="w-96" title={TITLE} subtitle={SUBTITLE} onExpand={noop} onFilter={noop}>
    <DotMatrix values={SERIES} />
  </Panel>
{/if}
