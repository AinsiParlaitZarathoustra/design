<script lang="ts">
  import type { Snippet } from "svelte";
  import { createListHighlight } from "./list-highlight.svelte";
  import {
    optionId,
    selectableIds,
    type CommandPaletteGroup,
    type CommandPaletteItem,
  } from "./command-list";
  import CommandInput from "./command-input.svelte";
  import CommandListRows from "./command-list-rows.svelte";
  import CommandHints from "./command-hints.svelte";
  import Spinner from "../../components/ui/spinner.svelte";

  /**
   * The field, the list and the key legend of a palette, with the keyboard model,
   * ported from `CommandPaletteView`. No dialog: a host that swaps views mounts one
   * per view. The field keeps focus and names the highlighted row; ↑/↓ step the
   * highlight over the enabled rows, wrapping; Enter runs it; Backspace on an empty
   * field goes back; a new query highlights the first row. Nothing animates.
   */
  interface Props {
    groups: ReadonlyArray<CommandPaletteGroup>;
    query: string;
    onQueryChange: (query: string) => void;
    onRun: (item: CommandPaletteItem) => void;
    onBack?: () => void;
    onSubmit?: (opts: { mod: boolean }) => void;
    placeholder?: string;
    emptyMessage?: string;
    loading?: boolean;
    actionLabel?: string;
    escapeLabel?: string;
    startAddon?: Snippet;
    endAddon?: Snippet;
    footerTrailing?: Snippet;
    hints?: boolean;
    size?: "default" | "tall";
    disabled?: boolean;
    claimFocus?: boolean;
    listId?: string;
  }

  let {
    groups,
    query,
    onQueryChange,
    onRun,
    onBack,
    onSubmit,
    placeholder,
    emptyMessage,
    loading = false,
    actionLabel,
    escapeLabel,
    startAddon,
    endAddon,
    footerTrailing,
    hints = true,
    size,
    disabled = false,
    claimFocus = true,
    listId: listIdProp,
  }: Props = $props();

  const uid = $props.id();
  const listId = $derived(listIdProp ?? `command-list-${uid}`);
  const fieldId = $derived(`${listId}-field`);
  const ids = $derived(selectableIds(groups));
  const highlight = createListHighlight(
    () => ids,
    () => query,
  );
  const hasRows = $derived(groups.some((g) => g.items.length > 0));

  // A new query starts at the top of the list.
  $effect.pre(() => {
    void query;
    document.getElementById(listId)?.scrollTo?.({ top: 0 });
  });

  // Takes focus once on mount, and again in the next two frames, while a host
  // dialog's focus trap reacts to the previous view's field leaving.
  $effect(() => {
    if (!claimFocus) return;
    const field = document.getElementById(fieldId) as HTMLInputElement | null;
    field?.focus();
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      field?.focus();
      inner = requestAnimationFrame(() => field?.focus());
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  });

  function findActive(): CommandPaletteItem | undefined {
    return groups
      .flatMap((g) => g.items)
      .find((i) => i.id === highlight.active && !i.disabled);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      highlight.step(event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey) && onSubmit) {
      event.preventDefault();
      onSubmit({ mod: true });
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const item = findActive();
      if (item) onRun(item);
      else onSubmit?.({ mod: false });
      return;
    }
    if (event.key === "Backspace" && query === "" && onBack) {
      event.preventDefault();
      onBack();
    }
  }
</script>

{#snippet endSlot()}
  {#if loading}<Spinner size="lg" label="Loading" />{/if}
  {@render endAddon?.()}
{/snippet}

<div data-slot="command-palette-view" class="flex min-h-0 flex-1 flex-col">
  <CommandInput
    id={fieldId}
    value={query}
    oninput={(event) => onQueryChange(event.currentTarget.value)}
    onkeydown={onKeyDown}
    {placeholder}
    {disabled}
    aria-expanded={hasRows}
    aria-controls={hasRows ? listId : undefined}
    aria-activedescendant={hasRows && highlight.active !== null
      ? optionId(listId, highlight.active)
      : undefined}
    {startAddon}
    endAddon={loading || endAddon ? endSlot : undefined}
  />
  <CommandListRows
    id={listId}
    {groups}
    activeId={highlight.active}
    onPoint={highlight.pointTo}
    {onRun}
    {emptyMessage}
    {loading}
    {size}
  />
  {#if hints}
    <CommandHints
      {actionLabel}
      backLabel={onBack ? "Back" : undefined}
      {escapeLabel}
      trailing={footerTrailing}
    />
  {/if}
</div>
