<script module lang="ts">
  /** One action of the menu. `to` navigates through the link provider; `onSelect` runs after. */
  export type CommandAction = {
    id: string;
    label: string;
    group: string;
    /** A Lucide Svelte component, drawn by `Icon`. */
    icon?: any;
    shortcut?: string;
    to?: string;
    onSelect?: () => void;
  };
</script>

<script lang="ts">
  import CommandDialogRoot from "./command-dialog.svelte";
  import CommandDialogPopup from "./command-dialog-popup.svelte";
  import CommandInput from "./command-input.svelte";
  import CommandPanel from "./command-panel.svelte";
  import CommandEmpty from "./command-empty.svelte";
  import CommandGroupLabel from "./command-group-label.svelte";
  import CommandItem from "./command-item.svelte";
  import CommandItemIcon from "./command-item-icon.svelte";
  import CommandShortcut from "./command-shortcut.svelte";
  import Icon from "../../ui/icon.svelte";
  import { getLinks } from "./deps/link-context";

  /**
   * ⌘K: a filtered list of actions, on the command shell. The field keeps focus and
   * names the highlighted row as its active descendant; ↑/↓ move the highlight
   * (wrapping), Enter runs it, and the pointer highlights where it moves. Ported from
   * `command-menu.tsx`. The query and highlight reset when the menu closes.
   */
  interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    actions: CommandAction[];
    placeholder?: string;
  }

  let {
    open,
    onOpenChange,
    actions,
    placeholder = "Search sessions, projects, people…",
  }: Props = $props();

  const links = getLinks();
  const uid = $props.id();
  const listId = `command-menu-${uid}`;
  let query = $state("");
  let active = $state(0);

  // Reset on close, not on open: resetting on open would flash the full list for a
  // frame before the filter reapplies.
  $effect(() => {
    if (open) return;
    query = "";
    active = 0;
  });

  const groups = $derived.by(() => {
    const q = query.trim().toLowerCase();
    const matched = q ? actions.filter((a) => a.label.toLowerCase().includes(q)) : actions;
    const byGroup = new Map<string, CommandAction[]>();
    for (const action of matched) {
      const list = byGroup.get(action.group) ?? [];
      list.push(action);
      byGroup.set(action.group, list);
    }
    return [...byGroup.entries()];
  });

  // The rows in display order, each with its index over all groups, so the highlight
  // is one number across them.
  const rows = $derived.by(() => {
    let at = -1;
    return groups.map(([group, items]) => ({
      group,
      items: items.map((action) => ({ action, at: ++at })),
    }));
  });
  const flat = $derived(groups.flatMap(([, items]) => items));

  // Keep the keyboard highlight on screen as ↑/↓ walk past the list's edge.
  $effect(() => {
    void active;
    document.getElementById(listId)?.querySelector("[data-active]")?.scrollIntoView({ block: "nearest" });
  });

  function run(action: CommandAction) {
    onOpenChange(false);
    if (action.to) links.navigate(action.to);
    action.onSelect?.();
  }

  function onKeyDown(event: KeyboardEvent) {
    if (flat.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      active = (active + 1) % flat.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      active = (active - 1 + flat.length) % flat.length;
    } else if (event.key === "Enter") {
      event.preventDefault();
      const action = flat[active];
      if (action) run(action);
    }
  }
</script>

<CommandDialogRoot {open} {onOpenChange}>
  <CommandDialogPopup title="Command menu">
    <CommandInput
      autofocus
      value={query}
      oninput={(event) => {
        query = event.currentTarget.value;
        active = 0;
      }}
      onkeydown={onKeyDown}
      {placeholder}
      aria-controls={listId}
      aria-activedescendant={flat.length > 0 ? `${listId}-${active}` : undefined}
    />
    <CommandPanel id={listId}>
      {#if flat.length === 0}
        <CommandEmpty>No matches for “{query}”</CommandEmpty>
      {/if}
      {#each rows as row (row.group)}
        <CommandGroupLabel>{row.group}</CommandGroupLabel>
        {#each row.items as { action, at } (action.id)}
          <CommandItem
            id={`${listId}-${at}`}
            active={at === active}
            onmousemove={() => (active = at)}
            onclick={() => run(action)}
          >
            {#if action.icon}
              <CommandItemIcon>
                <Icon icon={action.icon} size="lg" />
              </CommandItemIcon>
            {/if}
            <span class="min-w-0 flex-1 truncate">{action.label}</span>
            {#if action.shortcut}<CommandShortcut>{action.shortcut}</CommandShortcut>{/if}
          </CommandItem>
        {/each}
      {/each}
    </CommandPanel>
  </CommandDialogPopup>
</CommandDialogRoot>
