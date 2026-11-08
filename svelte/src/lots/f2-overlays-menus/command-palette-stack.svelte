<script lang="ts">
  import { ArrowLeft } from "lucide-svelte";
  import Icon from "../../ui/icon.svelte";
  import CommandPaletteView from "./command-palette-view.svelte";
  import { filterCommandGroups, type CommandPaletteGroup, type CommandPaletteItem } from "./command-list";

  /**
   * The query and the submenu stack of a palette, ported from `CommandPaletteStack`.
   * It lives inside the popup, so each open starts fresh. Running a row that holds
   * groups drills into them; Backspace or Escape restores the parent's query.
   */
  interface Props {
    groups: ReadonlyArray<CommandPaletteGroup>;
    placeholder?: string;
    submenuPlaceholder?: string;
    emptyMessage?: string | ((query: string) => string);
    actionLabel?: string;
    filter?: boolean;
    onQueryChange?: (query: string) => void;
    loading?: boolean;
    onRun?: (item: CommandPaletteItem) => void;
    hints?: boolean;
    size?: "default" | "tall";
    backRef: { current: (() => void) | null };
    onClose: () => void;
  }

  let {
    groups,
    placeholder = "Search commands…",
    submenuPlaceholder = "Search…",
    emptyMessage = (q: string) => (q ? `No results for “${q}”` : "No commands"),
    actionLabel = "Select",
    filter = true,
    onQueryChange,
    loading,
    onRun,
    hints,
    size,
    backRef,
    onClose,
  }: Props = $props();

  let query = $state("");
  let stack = $state<ReadonlyArray<{ item: CommandPaletteItem; query: string }>>([]);

  const top = $derived(stack[stack.length - 1]);
  const current = $derived(top?.item.groups ?? groups);
  const shown = $derived(filter ? filterCommandGroups(current, query) : current);

  function setQuery(next: string) {
    query = next;
    onQueryChange?.(next);
  }

  function pop() {
    const back = top;
    if (!back) return;
    stack = stack.slice(0, -1);
    setQuery(back.query);
  }

  // Only a submenu has somewhere to go back to: the dialog asks through this.
  $effect.pre(() => {
    backRef.current = top ? pop : null;
    return () => {
      backRef.current = null;
    };
  });

  function run(item: CommandPaletteItem) {
    if (item.disabled) return;
    if (item.groups) {
      stack = [...stack, { item, query }];
      setQuery("");
      return;
    }
    if (!item.keepOpen) onClose();
    onRun?.(item);
    item.onSelect?.();
  }

  const viewKey = $derived(`${stack.length}:${top?.item.id ?? "root"}`);
</script>

{#snippet backButton()}
  <button
    type="button"
    aria-label="Back"
    onmousedown={(event) => event.preventDefault()}
    onclick={pop}
    class="flex cursor-pointer items-center text-muted-foreground hover:text-foreground"
  >
    <Icon icon={ArrowLeft} size="lg" />
  </button>
{/snippet}

{#key viewKey}
  <CommandPaletteView
    groups={shown}
    {query}
    onQueryChange={setQuery}
    onRun={run}
    placeholder={top ? (top.item.placeholder ?? submenuPlaceholder) : placeholder}
    emptyMessage={typeof emptyMessage === "function" ? emptyMessage(query) : emptyMessage}
    {loading}
    {actionLabel}
    onBack={top ? pop : undefined}
    startAddon={top ? backButton : undefined}
    {hints}
    {size}
  />
{/key}
