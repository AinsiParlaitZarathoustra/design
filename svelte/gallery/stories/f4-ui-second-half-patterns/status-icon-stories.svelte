<script lang="ts">
  import PriorityIcon, { type Priority } from "../../../src/lots/f4-ui-second-half-patterns/priority-icon.svelte";
  import StatusIcon, {
    type SessionStatusKind,
  } from "../../../src/lots/f4-ui-second-half-patterns/status-icon.svelte";

  interface Props {
    story?: string;
  }

  let { story = "priorities" }: Props = $props();

  const STATUSES: SessionStatusKind[] = ["queued", "live", "done", "failed"];
  const PRIORITIES: Priority[] = ["none", "low", "medium", "high", "urgent"];
  const MANY: [string, SessionStatusKind, Priority][] = [
    ["Refactor settings", "live", "high"],
    ["Fix flaky terminal test", "failed", "urgent"],
    ["Port the timeline", "done", "medium"],
    ["Theme import", "queued", "low"],
    ["Bump Rust", "done", "none"],
  ];
</script>

{#if story === "default"}
  <StatusIcon status="live" />
{:else if story === "error"}
  <StatusIcon status="failed" />
{:else if story === "all-statuses"}
  <div class="flex flex-col gap-2">
    {#each STATUSES as status (status)}
      <span class="label inline-flex items-center gap-2">
        <StatusIcon {status} />
        {status}
      </span>
    {/each}
  </div>
{:else if story === "priorities"}
  <div class="flex flex-col gap-2">
    {#each PRIORITIES as priority (priority)}
      <span class="label inline-flex items-center gap-2">
        <PriorityIcon {priority} />
        {priority}
      </span>
    {/each}
  </div>
{:else if story === "many-items"}
  <div class="flex w-80 flex-col">
    {#each MANY as [title, status, priority] (title)}
      <div class="flex items-center gap-2 border-b border-border-subtle px-2 py-1.5 last:border-0">
        <PriorityIcon {priority} />
        <StatusIcon {status} />
        <span class="label truncate">{title}</span>
      </div>
    {/each}
  </div>
{/if}
