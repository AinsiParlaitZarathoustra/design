"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";

import { useLinks } from "../../lib/link.tsx";
import {
  CommandDialog,
  CommandDialogPopup,
  CommandEmpty,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandItemIcon,
  CommandPanel,
  CommandShortcut,
} from "../../ui/command.tsx";
import { Icon } from "../../ui/icon.tsx";

/**
 * ⌘K: a filtered list of actions, on desktop's command shell (`src/ui/
 * command.tsx`) — the same dialog, field, rows and keyboard model as the
 * desktop palette. The field keeps focus; ↑/↓ move the highlight, Enter runs
 * it, and the pointer only highlights where it rests.
 */

export type CommandAction = {
  id: string;
  label: string;
  group: string;
  icon?: LucideIcon;
  shortcut?: string;
  to?: string;
  onSelect?: () => void;
};

function CommandMenu({
  open,
  onOpenChange,
  actions,
  placeholder = "Search sessions, projects, people…",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actions: Array<CommandAction>;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const { navigate } = useLinks();

  // Reset on close, not on open: resetting on open makes the palette flash
  // the full list for a frame before the filter reapplies.
  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = q ? actions.filter((a) => a.label.toLowerCase().includes(q)) : actions;
    const byGroup = new Map<string, Array<CommandAction>>();
    for (const action of matched) {
      const list = byGroup.get(action.group) ?? [];
      list.push(action);
      byGroup.set(action.group, list);
    }
    return [...byGroup.entries()];
  }, [actions, query]);

  // The rows in display order, so the highlight is one index over all groups.
  const flat = useMemo(() => groups.flatMap(([, items]) => items), [groups]);

  function run(action: CommandAction) {
    onOpenChange(false);
    if (action.to) navigate(action.to);
    action.onSelect?.();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (flat.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % flat.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + flat.length) % flat.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const action = flat[active];
      if (action) run(action);
    }
  }

  let index = -1;

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandDialogPopup title="Command menu">
        <CommandInput
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
        <CommandPanel>
          {flat.length === 0 && <CommandEmpty>No matches for “{query}”</CommandEmpty>}
          {groups.map(([group, items]) => (
            <Fragment key={group}>
              <CommandGroupLabel>{group}</CommandGroupLabel>
              {items.map((action) => {
                index += 1;
                const at = index;
                return (
                  <CommandItem
                    key={action.id}
                    active={at === active}
                    onMouseMove={() => setActive(at)}
                    onClick={() => run(action)}
                  >
                    {action.icon && (
                      <CommandItemIcon>
                        <Icon icon={action.icon} size="lg" />
                      </CommandItemIcon>
                    )}
                    <span className="min-w-0 flex-1 truncate">{action.label}</span>
                    {action.shortcut && <CommandShortcut>{action.shortcut}</CommandShortcut>}
                  </CommandItem>
                );
              })}
            </Fragment>
          ))}
        </CommandPanel>
      </CommandDialogPopup>
    </CommandDialog>
  );
}

/** Binds ⌘K / Ctrl+K. Returns the open state so a button can also trigger it. */
function useCommandMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  return { open, setOpen };
}

export { CommandMenu, useCommandMenu };
