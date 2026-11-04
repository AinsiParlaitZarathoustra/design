"use client";

import { type KeyboardEvent, type ReactNode, useId, useLayoutEffect, useRef } from "react";
import { History, X } from "lucide-react";

import { cn } from "../../lib/utils.ts";
import {
  CommandDialog,
  CommandDialogPopup,
  CommandEmpty,
  CommandFooterHint,
  CommandInput,
  CommandItem,
  CommandItemIcon,
  CommandPanel,
} from "../../ui/command.tsx";
import { Icon } from "../../ui/icon.tsx";
import { Kbd } from "../../ui/kbd.tsx";
import { Spinner } from "../ui/spinner.tsx";
import { optionId, splitHighlights, useListHighlight } from "./command-list.ts";
import { CommandHints } from "./command-palette.tsx";

/**
 * Search over something the host searches: find-in-files (`mode="submit"`,
 * Enter runs the search) and find-in-session (`mode="live"`, the results
 * follow the query). On the same command shell as ⌘K, so the three read as
 * one system; desktop's `search-overlay.tsx` and `chat-search-palette.tsx`
 * are the behaviour it replaces.
 *
 * Props only: the query, the status and the results are the host's, and so
 * are the recent searches (persisting them is the host's job too).
 *
 * The keyboard model is the palette's: the field keeps focus, ↑/↓ step the
 * highlight (wrapping), Enter opens the highlighted result. In submit mode,
 * Enter after an edit (or with no results) searches instead. On the recent
 * searches Enter picks one and Delete forgets it.
 */

/** One search hit. */
export interface SearchResult {
  /** Unique within the results; the highlight is tracked by it. */
  readonly id: string;
  /** The first line: a path, a message's author. */
  readonly title: string;
  /** Right of the title, muted: a line number, a time. */
  readonly meta?: string;
  /** The second line: the matching text. */
  readonly detail?: string;
  /**
   * `[start, end)` ranges into `detail` exactly as passed. A host that trims
   * the text it shows (desktop trims a grep line's leading whitespace) must
   * re-base its match offsets onto the trimmed string.
   */
  readonly highlights?: ReadonlyArray<readonly [number, number]>;
  /** The leading glyph; a document icon by default would be noise, so none. */
  readonly icon?: ReactNode;
  /** Set both lines in the code face (paths, code). */
  readonly mono?: boolean;
}

export type SearchStatus = "idle" | "searching" | "done" | "error";

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The dialog's accessible name. */
  title: string;
  placeholder?: string;
  query: string;
  onQueryChange: (query: string) => void;
  /** `live`: the host filters as the query changes. `submit`: Enter searches. */
  mode?: "live" | "submit";
  /** Submit mode: run the search for this (trimmed) query. */
  onSubmit?: (query: string) => void;
  status: SearchStatus;
  /** Shown in place of the results when `status` is `"error"`. */
  error?: ReactNode;
  results: ReadonlyArray<SearchResult>;
  /** A result picked. The overlay has already asked to close. */
  onOpen: (result: SearchResult) => void;
  /** A match count beside the field ("12", "12 of 40"). */
  count?: ReactNode;
  /** Recent searches, newest first, listed while the query is empty. */
  recent?: ReadonlyArray<string>;
  onPickRecent?: (query: string) => void;
  onForgetRecent?: (query: string) => void;
  onClearRecent?: () => void;
  /** The empty field's hint when there are no recent searches. */
  idleHint?: ReactNode;
  /** Shown when a search is done and found nothing. */
  emptyMessage?: ReactNode;
  /** Under the results: "Showing the first 500 matches". */
  notice?: ReactNode;
  /** At the field's right end: option toggles (match case, regex). */
  endAddon?: ReactNode;
  hints?: boolean;
}

const RECENT_LIMIT = 8;
const RECENT_PREFIX = "recent:";

function SearchOverlay(props: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <CommandDialog open={props.open} onOpenChange={props.onOpenChange}>
      <CommandDialogPopup title={props.title} data-slot="search-overlay" initialFocus={inputRef}>
        <SearchOverlayBody {...props} inputRef={inputRef} />
      </CommandDialogPopup>
    </CommandDialog>
  );
}

function SearchOverlayBody({
  onOpenChange,
  placeholder,
  query,
  onQueryChange,
  mode = "live",
  onSubmit,
  status,
  error,
  results,
  onOpen,
  count,
  recent = [],
  onPickRecent,
  onForgetRecent,
  onClearRecent,
  idleHint,
  emptyMessage = "No results",
  notice,
  endAddon,
  hints = true,
  inputRef,
}: SearchOverlayProps & { inputRef: React.RefObject<HTMLInputElement | null> }) {
  const listId = useId();
  const recentLabelId = `${listId}-recent-label`.replace(/[^A-Za-z0-9_-]/g, "_");
  const panelRef = useRef<HTMLDivElement>(null);
  // Submit mode: the query was edited since the last search, so Enter
  // searches rather than opening a result of the old one. The popup unmounts
  // on close, so every open starts clean.
  const dirty = useRef(false);

  const empty = query.trim() === "";
  const shownRecent = recent.slice(0, RECENT_LIMIT);
  const showingRecent = status !== "error" && empty && status === "idle" && shownRecent.length > 0;
  const showingResults = status !== "error" && !showingRecent && results.length > 0;

  const ids = showingRecent
    ? shownRecent.map((q) => RECENT_PREFIX + q)
    : showingResults
      ? results.map((r) => r.id)
      : [];
  const highlight = useListHighlight(ids, `${query}|${mode}|${showingRecent ? "r" : "q"}`);
  const hasList = ids.length > 0;

  useLayoutEffect(() => {
    panelRef.current?.scrollTo?.({ top: 0 });
  }, [query]);

  useLayoutEffect(() => {
    if (highlight.active === null) return;
    document
      .getElementById(optionId(listId, highlight.active))
      ?.scrollIntoView?.({ block: "nearest" });
  }, [listId, highlight.active]);

  const open = (result: SearchResult) => {
    onOpenChange(false);
    onOpen(result);
  };
  const submit = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    dirty.current = false;
    onSubmit?.(trimmed);
  };
  const pickRecent = (q: string) => {
    onPickRecent?.(q);
    onQueryChange(q);
    if (mode === "submit") submit(q);
  };
  const activeRecent =
    showingRecent && highlight.active?.startsWith(RECENT_PREFIX)
      ? highlight.active.slice(RECENT_PREFIX.length)
      : null;
  const activeResult = showingResults ? results.find((r) => r.id === highlight.active) : undefined;

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      e.preventDefault();
      highlight.step(e.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (e.key === "Delete" && activeRecent !== null) {
      e.preventDefault();
      onForgetRecent?.(activeRecent);
      return;
    }
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (activeRecent !== null) return pickRecent(activeRecent);
    if (mode === "submit" && (dirty.current || results.length === 0)) return submit(query);
    if (activeResult) open(activeResult);
  };

  const enterLabel = showingRecent
    ? "Search"
    : mode === "submit" && (dirty.current || results.length === 0)
      ? "Search"
      : "Open";

  let body: ReactNode = null;
  if (status === "error") {
    body = <p className="px-5 py-10 text-center text-sm text-destructive">{error}</p>;
  } else if (showingRecent) {
    body = (
      <>
        <div className="flex shrink-0 items-center justify-between px-4 pt-1 pb-1.5">
          <span id={recentLabelId} className="text-xs font-medium text-muted-foreground">
            Recent searches
          </span>
          {onClearRecent && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={onClearRecent}
              className="cursor-pointer text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </div>
        <CommandPanel ref={panelRef} id={listId} aria-labelledby={recentLabelId}>
          {shownRecent.map((q) => {
            const key = RECENT_PREFIX + q;
            return (
              <CommandItem
                key={key}
                id={optionId(listId, key)}
                active={highlight.active === key}
                className="group"
                onPointerMove={(e) => highlight.pointTo(key, e.clientX, e.clientY)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pickRecent(q)}
              >
                <CommandItemIcon>
                  <Icon icon={History} size="lg" />
                </CommandItemIcon>
                <span className="min-w-0 flex-1 truncate font-mono text-sm">{q}</span>
                {onForgetRecent && (
                  // Not a button: a button inside an option is a nested
                  // control. Delete is the keyboard's way to forget.
                  <span
                    aria-hidden="true"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation();
                      onForgetRecent(q);
                    }}
                    className="ms-auto flex shrink-0 items-center rounded-sm p-0.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-data-[active]:opacity-100 hover:text-foreground"
                  >
                    <Icon icon={X} size="sm" />
                  </span>
                )}
              </CommandItem>
            );
          })}
        </CommandPanel>
      </>
    );
  } else if (empty && status === "idle") {
    body = idleHint ? <CommandEmpty>{idleHint}</CommandEmpty> : null;
  } else if (showingResults) {
    body = (
      <>
        <CommandPanel ref={panelRef} id={listId} size="tall">
          {results.map((result) => (
            <SearchResultRow
              key={result.id}
              id={optionId(listId, result.id)}
              result={result}
              active={highlight.active === result.id}
              onPoint={(x, y) => highlight.pointTo(result.id, x, y)}
              onOpen={open}
            />
          ))}
        </CommandPanel>
        {notice && <p className="shrink-0 px-5 pb-2 text-xs text-muted-foreground">{notice}</p>}
      </>
    );
  } else if (status === "done") {
    body = <CommandEmpty>{emptyMessage}</CommandEmpty>;
  }

  return (
    <div data-slot="search-overlay-view" className="flex min-h-0 flex-1 flex-col">
      <CommandInput
        ref={inputRef}
        value={query}
        onChange={(e) => {
          dirty.current = true;
          onQueryChange(e.target.value);
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-expanded={hasList}
        aria-controls={hasList ? listId : undefined}
        aria-activedescendant={
          hasList && highlight.active !== null ? optionId(listId, highlight.active) : undefined
        }
        endAddon={
          <>
            {status === "searching" && <Spinner size="lg" label="Searching" />}
            {count !== undefined && (
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{count}</span>
            )}
            {endAddon}
          </>
        }
      />
      {body}
      {hints && (
        <CommandHints
          actionLabel={hasList || (mode === "submit" && !empty) ? enterLabel : undefined}
          extra={
            showingRecent && onForgetRecent ? (
              <CommandFooterHint>
                <Kbd variant="soft" size="sm">
                  Delete
                </Kbd>
                <span>Forget</span>
              </CommandFooterHint>
            ) : undefined
          }
        />
      )}
    </div>
  );
}

/** One result: icon, title and meta on the first line; the matching text,
 *  its matches in the foreground colour, on the second. */
function SearchResultRow({
  id,
  result,
  active,
  onPoint,
  onOpen,
}: {
  id: string;
  result: SearchResult;
  active: boolean;
  onPoint?: (x: number, y: number) => void;
  onOpen: (result: SearchResult) => void;
}) {
  return (
    <CommandItem
      id={id}
      active={active}
      onPointerMove={onPoint ? (e) => onPoint(e.clientX, e.clientY) : undefined}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onOpen(result)}
    >
      {result.icon && <CommandItemIcon>{result.icon}</CommandItemIcon>}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex min-w-0 items-baseline gap-2">
          <span className={cn("min-w-0 truncate", result.mono && "font-mono text-sm")}>
            {result.title}
          </span>
          {result.meta && (
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
              {result.meta}
            </span>
          )}
        </span>
        {result.detail && (
          <span
            className={cn(
              "min-w-0 truncate text-sm text-muted-foreground",
              result.mono && "font-mono",
            )}
          >
            <Highlighted text={result.detail} ranges={result.highlights} />
          </span>
        )}
      </span>
    </CommandItem>
  );
}

/** Colour alone marks a match, as in desktop's file search: a weight step
 *  would widen only the matched glyphs and set the line unevenly. */
function Highlighted({
  text,
  ranges,
}: {
  text: string;
  ranges?: ReadonlyArray<readonly [number, number]>;
}) {
  return splitHighlights(text, ranges).map((segment, i) =>
    segment.match ? (
      <mark key={i} data-match="" className="bg-transparent text-foreground">
        {segment.text}
      </mark>
    ) : (
      segment.text
    ),
  );
}

export { SearchOverlay, SearchResultRow };
export type { SearchOverlayProps };
