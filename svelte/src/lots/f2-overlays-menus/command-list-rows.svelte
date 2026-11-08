<script lang="ts">
  import type { Snippet } from "svelte";
  import Skeleton from "./deps/skeleton.svelte";
  import CommandEmpty from "./command-empty.svelte";
  import CommandGroupLabel from "./command-group-label.svelte";
  import CommandPanel from "./command-panel.svelte";
  import CommandRow from "./command-row.svelte";
  import { optionId, type CommandPaletteGroup, type CommandPaletteItem } from "./command-list";

  /**
   * The rows of a palette, ported from `CommandList`. Controlled (`activeId`): it
   * never takes focus and never listens for keys, so an editor that keeps DOM focus
   * can drive it. With no rows and `loading`, three placeholder rows; with no rows,
   * the empty line.
   */
  interface Props {
    /** The listbox's id: the field's `aria-controls`, and the root of every row's id. */
    id: string;
    groups: ReadonlyArray<CommandPaletteGroup>;
    activeId: string | null;
    onPoint?: (itemId: string, x: number, y: number) => void;
    onRun: (item: CommandPaletteItem) => void;
    emptyMessage?: string;
    loading?: boolean;
    size?: "default" | "tall";
    class?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    children?: Snippet;
  }

  let {
    id,
    groups,
    activeId,
    onPoint,
    onRun,
    emptyMessage = "No results",
    loading = false,
    size,
    class: className,
    ...aria
  }: Props = $props();

  const empty = $derived(groups.every((g) => g.items.length === 0));

  // Keep the highlight on screen as ↑/↓ walk past the list's edge.
  $effect.pre(() => {
    const current = activeId;
    if (current === null) return;
    document.getElementById(optionId(id, current))?.scrollIntoView?.({ block: "nearest" });
  });
</script>

{#if empty && loading}
  <div data-slot="command-list-loading" class="flex flex-col gap-1 px-2 pb-2">
    {#each [0, 1, 2] as i (i)}
      <Skeleton class="h-9 rounded-lg" />
    {/each}
  </div>
{:else if empty}
  <CommandEmpty>{emptyMessage}</CommandEmpty>
{:else}
  <CommandPanel {id} {size} class={className} {...aria}>
    {#each groups as group, index (group.id)}
      {#if group.items.length > 0}
        {#if !group.label}
          <div>
            {#each group.items as item (item.id)}
              <CommandRow
                id={optionId(id, item.id)}
                {item}
                active={item.id === activeId}
                onPoint={onPoint ? (x, y) => onPoint(item.id, x, y) : undefined}
                {onRun}
              />
            {/each}
          </div>
        {:else}
          <div
            role="group"
            aria-labelledby={optionId(id, `group-${group.id}`)}
            class={index > 0 ? "pt-2" : undefined}
          >
            <CommandGroupLabel id={optionId(id, `group-${group.id}`)}>{group.label}</CommandGroupLabel>
            {#each group.items as item (item.id)}
              <CommandRow
                id={optionId(id, item.id)}
                {item}
                active={item.id === activeId}
                onPoint={onPoint ? (x, y) => onPoint(item.id, x, y) : undefined}
                {onRun}
              />
            {/each}
          </div>
        {/if}
      {/if}
    {/each}
  </CommandPanel>
{/if}
