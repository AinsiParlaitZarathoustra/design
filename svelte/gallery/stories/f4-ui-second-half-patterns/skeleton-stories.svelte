<script lang="ts">
  import Skeleton from "../../../src/lots/f4-ui-second-half-patterns/skeleton.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const ROWS = [0, 1, 2, 3, 4, 5];
</script>

{#if story === "default"}
  <Skeleton class="h-3 w-48" />
{:else if story === "loading"}
  <div class="flex w-80 flex-col gap-1">
    {#each ROWS as i (i)}
      <div class="flex items-center gap-2 px-2 py-1.5">
        <Skeleton class="size-3.5 rounded-full" />
        <Skeleton class="h-3 flex-1" />
        <Skeleton class="h-3 w-10" />
      </div>
    {/each}
  </div>
{:else if story === "static-panel"}
  <div class="flex w-72 flex-col gap-3">
    <Skeleton data-testid="default" class="h-6 w-24" />
    <div data-testid="panel" class="flex flex-col gap-2 p-3">
      {#each ROWS as i (i)}
        <Skeleton animated={false} radius="md" class="h-6" style="width: {78 + ((i * 13) % 22)}%;" />
      {/each}
    </div>
  </div>
{:else if story === "card"}
  <div class="flex w-72 flex-col gap-2 rounded-md border border-border p-3">
    <Skeleton class="h-3 w-24" />
    <Skeleton class="h-6 w-32" />
    <Skeleton class="h-3 w-full" />
  </div>
{/if}
