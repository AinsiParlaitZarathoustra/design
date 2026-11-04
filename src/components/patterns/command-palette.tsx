"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  type Ref,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react";

import {
  CommandDialog,
  CommandDialogPopup,
  CommandEmpty,
  CommandFooter,
  CommandFooterHint,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandItemIcon,
  CommandPanel,
  CommandShortcut,
  CommandSubmenuChevron,
} from "../../ui/command.tsx";
import { Icon } from "../../ui/icon.tsx";
import { Kbd, KbdGroup } from "../../ui/kbd.tsx";
import { Skeleton } from "../ui/skeleton.tsx";
import { Spinner } from "../ui/spinner.tsx";
import {
  type CommandPaletteGroup,
  type CommandPaletteItem,
  filterCommandGroups,
  optionId,
  selectableIds,
  useListHighlight,
} from "./command-list.ts";

/**
 * The palettes ⌘K, ⌘P and the new-tab palette are, on the `Command` shell
 * (`src/ui/command.tsx`). Copied from desktop's `command-palette-content.tsx`
 * and the view stack in `command-palette.tsx` (ADR-0027), with the stores
 * left behind: everything arrives as props.
 *
 * Three layers, each usable alone:
 *
 *   CommandList         the rows. Controlled (`activeId`), never takes focus,
 *                       never listens for keys — so an editor that keeps DOM
 *                       focus (a slash or mention picker) can drive it.
 *   CommandPaletteView  the field, the list and the key legend, with the
 *                       keyboard model. No dialog: a host dialog that swaps
 *                       views (desktop's ⌘K ⇄ ⌘P) mounts one per view.
 *   CommandPalette      the dialog, the filter and the submenu stack.
 *
 * The keyboard model: the field keeps focus and names the highlighted row as
 * its active descendant; ↑/↓ step the highlight over the enabled rows,
 * wrapping; Enter runs it; Backspace on an empty field, or Escape, goes back
 * out of a submenu. A new query highlights the first row again. The pointer
 * highlights a row only when it actually moves.
 *
 * No open, close or highlight animation, on purpose: a palette opens hundreds
 * of times a day, and motion on a keyboard action reads as latency. Nothing
 * moves, so there is nothing for reduced motion to take away.
 */

/** The rows, grouped, with the keyboard highlight the caller owns. */
function CommandList({
  id,
  groups,
  activeId,
  onPoint,
  onRun,
  emptyMessage = "No results",
  loading = false,
  size,
  className,
  ref,
  ...aria
}: {
  /** The listbox's id: the field's `aria-controls`, and the root of every
   *  row's id (`optionId(id, item.id)`). */
  id: string;
  /** The listbox's name. A list driven by a plain field (not a `combobox`)
   *  needs one; inside the palette the field names it. */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  groups: ReadonlyArray<CommandPaletteGroup>;
  /** The highlighted row's `item.id`. */
  activeId: string | null;
  /** From a row's `onPointerMove`: hand it to `useListHighlight().pointTo`. */
  onPoint?: (itemId: string, x: number, y: number) => void;
  /** A click on an enabled row. */
  onRun: (item: CommandPaletteItem) => void;
  emptyMessage?: ReactNode;
  /** With no rows yet, three placeholder rows; with rows, nothing extra. */
  loading?: boolean;
  size?: "default" | "tall";
  className?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  const empty = groups.every((g) => g.items.length === 0);

  // Keep the highlight on screen as ↑/↓ walk past the list's edge.
  useLayoutEffect(() => {
    if (activeId === null) return;
    document.getElementById(optionId(id, activeId))?.scrollIntoView?.({ block: "nearest" });
  }, [id, activeId]);

  if (empty && loading) {
    return (
      <div data-slot="command-list-loading" className="flex flex-col gap-1 px-2 pb-2">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-9 rounded-lg" />
        ))}
      </div>
    );
  }
  if (empty) return <CommandEmpty>{emptyMessage}</CommandEmpty>;

  return (
    <CommandPanel ref={ref} id={id} size={size} className={className} {...aria}>
      {groups.map((group, index) => {
        if (group.items.length === 0) return null;
        const rows = group.items.map((item) => (
          <CommandRow
            key={item.id}
            id={optionId(id, item.id)}
            item={item}
            active={item.id === activeId}
            onPoint={onPoint ? (x, y) => onPoint(item.id, x, y) : undefined}
            onRun={onRun}
          />
        ));
        if (!group.label) return <div key={group.id}>{rows}</div>;
        const labelId = optionId(id, `group-${group.id}`);
        return (
          <div
            key={group.id}
            role="group"
            aria-labelledby={labelId}
            className={index > 0 ? "pt-2" : undefined}
          >
            <CommandGroupLabel id={labelId}>{group.label}</CommandGroupLabel>
            {rows}
          </div>
        );
      })}
    </CommandPanel>
  );
}

/** One row: icon, title (and description), then timestamp, trailing,
 *  shortcut and a submenu's chevron on the right. */
function CommandRow({
  id,
  item,
  active,
  onPoint,
  onRun,
}: {
  id: string;
  item: CommandPaletteItem;
  active: boolean;
  onPoint?: (x: number, y: number) => void;
  onRun: (item: CommandPaletteItem) => void;
}) {
  const title = <span className="truncate text-foreground">{item.title ?? item.label}</span>;
  return (
    <CommandItem
      id={id}
      active={active}
      disabled={item.disabled}
      onPointerMove={onPoint ? (e) => onPoint(e.clientX, e.clientY) : undefined}
      // Keep focus in the field: a mousedown on a row would blur it.
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        if (!item.disabled) onRun(item);
      }}
    >
      {item.icon && <CommandItemIcon>{item.icon}</CommandItemIcon>}
      {item.description ? (
        <span className="flex min-w-0 flex-1 flex-col">
          {title}
          <span className="min-w-0 truncate text-sm text-muted-foreground">{item.description}</span>
        </span>
      ) : (
        <span className="flex min-w-0 flex-1 items-center">{title}</span>
      )}
      {item.trailing}
      {item.timestamp && (
        <span className="ms-auto min-w-12 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
          {item.timestamp}
        </span>
      )}
      {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
      {item.groups && <CommandSubmenuChevron />}
    </CommandItem>
  );
}

/** The key legend: Navigate, then Enter, Backspace and Esc as they apply,
 *  and `trailing` at the far end. */
function CommandHints({
  actionLabel,
  backLabel,
  escapeLabel = "Close",
  extra,
  trailing,
}: {
  /** The Enter hint's label; omitted, the hint is left out. */
  actionLabel?: string;
  /** The Backspace hint's label; omitted, the hint is left out. */
  backLabel?: string;
  escapeLabel?: string;
  /** More hints, after Backspace. */
  extra?: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <CommandFooter>
      <div className="flex items-center gap-4">
        <CommandFooterHint>
          <KbdGroup>
            <Kbd variant="soft" size="sm">
              <Icon icon={ArrowUp} size="sm" />
            </Kbd>
            <Kbd variant="soft" size="sm">
              <Icon icon={ArrowDown} size="sm" />
            </Kbd>
          </KbdGroup>
          <span>Navigate</span>
        </CommandFooterHint>
        {actionLabel !== undefined && (
          <CommandFooterHint>
            <Kbd variant="soft" size="sm">
              Enter
            </Kbd>
            <span>{actionLabel}</span>
          </CommandFooterHint>
        )}
        {backLabel !== undefined && (
          <CommandFooterHint>
            <Kbd variant="soft" size="sm">
              Backspace
            </Kbd>
            <span>{backLabel}</span>
          </CommandFooterHint>
        )}
        {extra}
        <CommandFooterHint>
          <Kbd variant="soft" size="sm">
            Esc
          </Kbd>
          <span>{escapeLabel}</span>
        </CommandFooterHint>
      </div>
      {trailing}
    </CommandFooter>
  );
}

/** True while an IME is composing: Enter and the arrows belong to it. */
function isComposing(e: KeyboardEvent) {
  return e.nativeEvent.isComposing || e.keyCode === 229;
}

/** Takes focus once on mount, and again after the frames in which a host
 *  dialog's focus trap reacts to the previous view's field unmounting. */
function useClaimFocus(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    ref.current?.focus();
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      ref.current?.focus();
      inner = requestAnimationFrame(() => ref.current?.focus());
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [ref, enabled]);
}

interface CommandPaletteViewProps {
  /** The rows to show, already filtered (`filterCommandGroups`). */
  groups: ReadonlyArray<CommandPaletteGroup>;
  query: string;
  onQueryChange: (query: string) => void;
  /** Enter, or a click, on an enabled row. */
  onRun: (item: CommandPaletteItem) => void;
  placeholder?: string;
  /** Shown when there are no rows. */
  emptyMessage?: ReactNode;
  /** No rows yet and more to come: placeholder rows and a spinner. */
  loading?: boolean;
  /** The Enter hint's label; omitted, the hint is left out. */
  actionLabel?: string;
  escapeLabel?: string;
  /** Backspace on an empty field calls this, and its hint shows (a
   *  submenu's way out). */
  onBack?: () => void;
  /**
   * A step that runs on the field's text rather than a row (a clone URL, a
   * new project's name): ⌘/Ctrl+Enter always calls it, and Enter does when
   * no row is highlighted.
   */
  onSubmit?: (opts: { mod: boolean }) => void;
  /** Replaces the magnifier: a submenu's back arrow. */
  startAddon?: ReactNode;
  /** At the field's right end: a step's primary action ("Create ⌘ Enter"). */
  endAddon?: ReactNode;
  /** At the far end of the key legend (⌘P's "Reindex"). */
  footerTrailing?: ReactNode;
  /** Leave the legend out. */
  hints?: boolean;
  size?: "default" | "tall";
  disabled?: boolean;
  /** Take focus on mount (default). Off when the host places focus itself. */
  claimFocus?: boolean;
  /** The listbox's id; generated when omitted. */
  listId?: string;
}

/** The field, the list and the legend, with the keyboard model. */
function CommandPaletteView(props: CommandPaletteViewProps) {
  const { groups, query, onQueryChange, onRun, onBack, onSubmit, loading = false } = props;
  const generatedId = useId();
  const listId = props.listId ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const ids = selectableIds(groups);
  const highlight = useListHighlight(ids, query);
  const hasRows = groups.some((g) => g.items.length > 0);

  // A new query starts at the top of the list.
  useLayoutEffect(() => {
    panelRef.current?.scrollTo?.({ top: 0 });
  }, [query]);

  useClaimFocus(inputRef, props.claimFocus ?? true);

  const findActive = () =>
    groups.flatMap((g) => g.items).find((i) => i.id === highlight.active && !i.disabled);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isComposing(e)) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      e.preventDefault();
      highlight.step(e.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && onSubmit) {
      e.preventDefault();
      onSubmit({ mod: true });
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const item = findActive();
      if (item) onRun(item);
      else onSubmit?.({ mod: false });
      return;
    }
    if (e.key === "Backspace" && query === "" && onBack) {
      e.preventDefault();
      onBack();
    }
  };

  return (
    <div data-slot="command-palette-view" className="flex min-h-0 flex-1 flex-col">
      <CommandInput
        ref={inputRef}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={props.placeholder}
        disabled={props.disabled}
        aria-expanded={hasRows}
        aria-controls={hasRows ? listId : undefined}
        aria-activedescendant={
          hasRows && highlight.active !== null ? optionId(listId, highlight.active) : undefined
        }
        startAddon={props.startAddon}
        endAddon={
          (loading || props.endAddon) && (
            <>
              {loading && <Spinner size="lg" label="Loading" />}
              {props.endAddon}
            </>
          )
        }
      />
      <CommandList
        ref={panelRef}
        id={listId}
        groups={groups}
        activeId={highlight.active}
        onPoint={highlight.pointTo}
        onRun={onRun}
        emptyMessage={props.emptyMessage}
        loading={loading}
        size={props.size}
      />
      {(props.hints ?? true) && (
        <CommandHints
          actionLabel={props.actionLabel}
          backLabel={onBack ? "Back" : undefined}
          escapeLabel={props.escapeLabel}
          trailing={props.footerTrailing}
        />
      )}
    </div>
  );
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The root's rows. A row with `groups` is a submenu. */
  groups: ReadonlyArray<CommandPaletteGroup>;
  /** The dialog's accessible name. */
  title?: string;
  placeholder?: string;
  /** The placeholder inside a submenu that names none. */
  submenuPlaceholder?: string;
  /** Shown when nothing matches; a function gets the query. */
  emptyMessage?: ReactNode | ((query: string) => ReactNode);
  /** The Enter hint's label. */
  actionLabel?: string;
  /** Filter and rank the rows by the query (default). Off, the rows are
   *  shown as given — for a caller that searches elsewhere (a backend). */
  filter?: boolean;
  /** The query, for a caller that searches elsewhere. Uncontrolled when
   *  omitted; either way it starts empty on every open. */
  onQueryChange?: (query: string) => void;
  /** Rows are on their way: placeholder rows and a spinner. */
  loading?: boolean;
  /** Called with every row run, before its own `onSelect`. */
  onRun?: (item: CommandPaletteItem) => void;
  hints?: boolean;
  size?: "default" | "tall";
}

/**
 * ⌘K: the dialog, the filter and the submenu stack, over `CommandPaletteView`.
 *
 * Running a row: a disabled row does nothing; a submenu row drills in, its
 * query starting empty (Backspace or Escape restores the parent's); any other row asks to close (unless `keepOpen`), then calls
 * `onRun` and its own `onSelect`. Escape and Backspace-on-empty go back out
 * of a submenu; Escape at the root closes. The query and the stack live in
 * the dialog's popup, which unmounts on close, so every open starts fresh.
 */
function CommandPalette({
  open,
  onOpenChange,
  title = "Command palette",
  ...props
}: CommandPaletteProps) {
  // Escape is the dialog's (Base UI dismisses before a keydown on the field
  // could stop it), so the open view registers its way back here, and the
  // dismissal is cancelled while there is somewhere to go back to.
  const back = useRef<(() => void) | null>(null);
  return (
    <CommandDialog
      open={open}
      onOpenChange={(next, details) => {
        if (!next && details.reason === "escape-key" && back.current) {
          details.cancel();
          back.current();
          return;
        }
        onOpenChange(next);
      }}
    >
      <CommandDialogPopup title={title} data-slot="command-palette">
        <CommandPaletteStack {...props} backRef={back} onClose={() => onOpenChange(false)} />
      </CommandDialogPopup>
    </CommandDialog>
  );
}

function CommandPaletteStack({
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
}: Omit<CommandPaletteProps, "open" | "onOpenChange" | "title"> & {
  backRef: React.RefObject<(() => void) | null>;
  onClose: () => void;
}) {
  const [query, setQueryState] = useState("");
  const [stack, setStack] = useState<ReadonlyArray<{ item: CommandPaletteItem; query: string }>>(
    [],
  );
  const setQuery = (next: string) => {
    setQueryState(next);
    onQueryChange?.(next);
  };
  const top = stack[stack.length - 1];
  const pop = () => {
    if (!top) return;
    setStack(stack.slice(0, -1));
    setQuery(top.query);
  };
  // Only a submenu has somewhere to go back to.
  useLayoutEffect(() => {
    backRef.current = top ? pop : null;
    return () => {
      backRef.current = null;
    };
  });

  const current = top?.item.groups ?? groups;
  const shown = filter ? filterCommandGroups(current, query) : current;

  const run = (item: CommandPaletteItem) => {
    if (item.disabled) return;
    if (item.groups) {
      setStack([...stack, { item, query }]);
      setQuery("");
      return;
    }
    if (!item.keepOpen) onClose();
    onRun?.(item);
    item.onSelect?.();
  };

  return (
    <CommandPaletteView
      // A new view is a new list: its highlight starts at its top.
      key={`${stack.length}:${top?.item.id ?? "root"}`}
      groups={shown}
      query={query}
      onQueryChange={setQuery}
      onRun={run}
      placeholder={top ? (top.item.placeholder ?? submenuPlaceholder) : placeholder}
      emptyMessage={typeof emptyMessage === "function" ? emptyMessage(query) : emptyMessage}
      loading={loading}
      actionLabel={actionLabel}
      onBack={top ? pop : undefined}
      startAddon={
        top ? (
          <button
            type="button"
            aria-label="Back"
            onMouseDown={(e) => e.preventDefault()}
            onClick={pop}
            className="flex cursor-pointer items-center text-muted-foreground hover:text-foreground"
          >
            <Icon icon={ArrowLeft} size="lg" />
          </button>
        ) : undefined
      }
      hints={hints}
      size={size}
    />
  );
}

export { CommandHints, CommandList, CommandPalette, CommandPaletteView, CommandRow };
export type { CommandPaletteProps, CommandPaletteViewProps };
