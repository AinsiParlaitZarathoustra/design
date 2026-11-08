<script lang="ts">
  import PriorityIcon, { type Priority } from "../../../src/lots/f4-ui-second-half-patterns/priority-icon.svelte";

  interface Props {
    story?: string;
  }

  let { story = "priorities" }: Props = $props();

  const PRIORITIES: Priority[] = ["none", "low", "medium", "high", "urgent"];
</script>

{#if story === "priorities"}
  <div class="flex flex-col gap-2">
    {#each PRIORITIES as priority (priority)}
      <span class="label inline-flex items-center gap-2">
        <PriorityIcon {priority} />
        {priority}
      </span>
    {/each}
  </div>
{/if}
