<script lang="ts">
  import Separator from "../../../src/lots/f4-ui-second-half-patterns/separator.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();
</script>

{#if story === "vertical"}
  <div class="flex h-6 items-center gap-3">
    <span class="label">Sessions</span>
    <Separator orientation="vertical" strong={false} />
    <span class="label">Projects</span>
    <Separator orientation="vertical" strong={false} />
    <span class="label">Members</span>
  </div>
{:else}
  <div class="flex w-72 flex-col gap-3 rounded-md border border-border p-3">
    <span class="label">Usage this week</span>
    <Separator strong={story === "strong"} />
    <span class="caption">1.2M tokens across 48 sessions</span>
  </div>
{/if}
