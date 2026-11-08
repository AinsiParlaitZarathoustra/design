<script lang="ts">
  import type { Snippet } from "svelte";
  import { GitCommitHorizontal } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import DiffStat from "../deps/diff-stat.svelte";
  import type { CheckpointView, CommentAnchor } from "./session-view";
  import { FILES_SHOWN } from "./turn-row-helpers";

  /**
   * A commit, as a card: desktop's session checkpoint. An orphaned one says so
   * outright and hides its branch, since the branch no longer holds it.
   */
  interface Props {
    checkpoint: CheckpointView;
    commentSlot?: Snippet<[CommentAnchor]>;
  }

  let { checkpoint, commentSlot }: Props = $props();

  const orphaned = $derived(checkpoint.linkState === "orphaned");
  const files = $derived(checkpoint.files ?? []);
  const known = $derived(checkpoint.insertions !== undefined || checkpoint.deletions !== undefined);
</script>

<div
  data-slot="checkpoint"
  data-link-state={checkpoint.linkState}
  class={cn(
    "mt-2.5 overflow-hidden rounded-md border",
    orphaned ? "border-dashed border-border-strong" : "border-border bg-card",
  )}
>
  <div class="flex items-center gap-2.5 border-b border-border-subtle bg-card px-3 py-2 last:border-b-0">
    <Icon icon={GitCommitHorizontal} size="sm" class="text-muted-foreground" />
    {#if checkpoint.commitSha}
      <span class="shrink-0 font-mono text-xs text-muted-foreground">
        {checkpoint.commitSha.slice(0, 7)}
      </span>
    {/if}
    <span
      class={cn(
        "min-w-0 flex-1 truncate text-sm",
        orphaned ? "text-secondary-foreground" : "text-foreground",
      )}
    >
      {#if checkpoint.subject}
        {checkpoint.subject}
      {:else}
        <span class="text-muted-foreground">
          {orphaned ? "Commit no longer reachable" : "Checkpoint"}
        </span>
      {/if}
    </span>
    {#if orphaned}
      <span
        class="shrink-0 rounded-full bg-warning-muted px-2 py-px font-mono text-2xs text-warning"
        title="This commit is no longer in history: rewritten or squashed. The session record is kept."
      >
        Orphaned
      </span>
    {/if}
    {#if known}
      <DiffStat
        added={checkpoint.insertions ?? 0}
        removed={checkpoint.deletions ?? 0}
        class="shrink-0 font-mono text-xs"
      />
    {/if}
    {#if commentSlot}
      {@render commentSlot({ kind: "checkpoint", id: checkpoint.id })}
    {/if}
  </div>
  {#if files.length > 0}
    <ul class="px-3 py-2">
      {#each files.slice(0, FILES_SHOWN) as file (file)}
        <li class="truncate font-mono text-xs leading-[1.75] text-muted-foreground">
          {file}
        </li>
      {/each}
      {#if files.length > FILES_SHOWN}
        <li class="font-mono text-xs leading-[1.75] text-disabled">
          +{files.length - FILES_SHOWN} more
        </li>
      {/if}
    </ul>
  {/if}
  {#if checkpoint.branch && !orphaned}
    <p class="border-t border-border-subtle px-3 py-1.5 font-mono text-xs text-disabled">
      {checkpoint.branch}
    </p>
  {/if}
</div>
