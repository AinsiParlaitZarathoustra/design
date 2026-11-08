<script lang="ts">
  import { FolderIcon, GitBranchIcon } from "lucide-svelte";
  import Icon from "../../../ui/icon.svelte";

  /**
   * Where the terminal is: the folder, and the branch with its distance from
   * upstream. Hidden in a pane under 300px wide, the branch under 420px.
   */
  interface Props {
    cwd: string;
    /** `""` is a detached HEAD; unset, not a repository. */
    branch?: string;
    ahead?: number;
    behind?: number;
    /** Uncommitted changes. */
    dirty?: boolean;
  }

  let { cwd, branch, ahead, behind, dirty }: Props = $props();

  const folder = $derived(cwd.split("/").filter(Boolean).pop() ?? cwd);
</script>

<div
  data-slot="terminal-status"
  class="hidden min-w-0 shrink items-center gap-2 text-2xs text-muted-foreground tabular-nums @[300px]:flex"
>
  <span class="flex min-w-0 items-center gap-1" title={cwd}>
    <Icon icon={FolderIcon} size="xs" />
    <span class="truncate">{folder}</span>
  </span>
  {#if branch !== undefined}
    <span class="hidden min-w-0 items-center gap-1 @[420px]:flex">
      <Icon icon={GitBranchIcon} size="xs" />
      <span class="truncate">{branch === "" ? "(detached)" : branch}</span>
      {#if !!ahead}<span title="{ahead} ahead of upstream">↑{ahead}</span>{/if}
      {#if !!behind}<span title="{behind} behind upstream">↓{behind}</span>{/if}
      {#if dirty}
        <span
          role="img"
          aria-label="Uncommitted changes"
          title="Uncommitted changes"
          class="size-1.5 shrink-0 rounded-full bg-warning"
        ></span>
      {/if}
    </span>
  {/if}
</div>
