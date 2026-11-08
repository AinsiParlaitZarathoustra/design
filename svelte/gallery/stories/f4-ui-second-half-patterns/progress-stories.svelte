<script lang="ts">
  import Progress from "../../../src/lots/f4-ui-second-half-patterns/progress.svelte";
  import ProgressIndicator from "../../../src/lots/f4-ui-second-half-patterns/progress-indicator.svelte";
  import ProgressLabel from "../../../src/lots/f4-ui-second-half-patterns/progress-label.svelte";
  import ProgressTrack from "../../../src/lots/f4-ui-second-half-patterns/progress-track.svelte";
  import ProgressValue from "../../../src/lots/f4-ui-second-half-patterns/progress-value.svelte";
  import type { ProgressTone } from "../../../src/lots/f4-ui-second-half-patterns/progress-model";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const TONE_ROWS: [string, number, ProgressTone][] = [
    ["Five-hour limit", 34, "success"],
    ["Weekly limit", 78, "warning"],
    ["Opus weekly limit", 96, "error"],
    ["Indexing", 52, "default"],
  ];
  const MANY: [string, number][] = [
    ["Tokens", 82],
    ["Sessions", 48],
    ["Storage", 12],
    ["Seats", 100],
  ];
</script>

{#snippet demo(value: number | null, label: string)}
  <Progress {value} class="w-72">
    <ProgressLabel>{label}</ProgressLabel>
    <ProgressValue />
  </Progress>
{/snippet}

{#if story === "default"}
  {@render demo(42, "Indexing project")}
{:else if story === "empty"}
  {@render demo(0, "Indexing project")}
{:else if story === "complete"}
  {@render demo(100, "Indexed")}
{:else if story === "loading"}
  {@render demo(null, "Waiting for the agent")}
{:else if story === "long-text"}
  {@render demo(64, "Indexing atlas-desktop, design, server and every attached project")}
{:else if story === "bare-track"}
  <Progress value={72} aria-label="Budget" class="w-48">
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  </Progress>
{:else if story === "tones"}
  <div class="flex w-72 flex-col gap-4">
    {#each TONE_ROWS as [label, value, tone] (label)}
      <Progress {value} {tone}>
        <ProgressLabel>{label}</ProgressLabel>
        <ProgressValue />
      </Progress>
    {/each}
  </div>
{:else if story === "many-items"}
  <div class="flex w-72 flex-col gap-4">
    {#each MANY as [label, value] (label)}
      <Progress {value}>
        <ProgressLabel>{label}</ProgressLabel>
        <ProgressValue />
      </Progress>
    {/each}
  </div>
{/if}
