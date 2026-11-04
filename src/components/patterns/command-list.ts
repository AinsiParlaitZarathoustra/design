"use client";

import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

/**
 * The palettes as data: the items a list shows, how a query filters and ranks
 * them, how the keyboard steps the highlight, and the ids that tie the field
 * to the highlighted row. Pure apart from `useListHighlight`, so the ranking
 * and the stepping are tested without a DOM (`command-list.test.ts`).
 *
 * Copied from desktop's `features/command-palette/lib/command-palette-logic.ts`
 * (ADR-0027): the same ranking, the same wrap-around highlight, the same
 * "a filter that drops the highlighted row lands on the first one".
 */

/** One row a command list can run. */
export interface CommandPaletteItem {
  /** Unique within the list; the highlight is tracked by it. */
  readonly id: string;
  /** The row's text, and the first thing a query matches. */
  readonly label: string;
  /** Replaces `label` on screen (a title with a badge in it); `label` is
   *  still what a query matches. */
  readonly title?: ReactNode;
  /** More text a query matches, after the label: a module's type, a
   *  session's project. An earlier term ranks higher. */
  readonly keywords?: ReadonlyArray<string>;
  /** The muted second line. */
  readonly description?: ReactNode;
  /** The leading glyph, usually `<Icon icon={…} size="lg" />`. */
  readonly icon?: ReactNode;
  /** A chord as glyphs on the right ("⌘⇧N"). */
  readonly shortcut?: string;
  /** An age on the right ("1d ago"). */
  readonly timestamp?: string;
  /** Anything else at the row's right end, before the shortcut. */
  readonly trailing?: ReactNode;
  readonly disabled?: boolean;
  /** Ranked after every match that is not secondary. */
  readonly secondary?: boolean;
  /** The palette stays open after it runs (it opens a child search). */
  readonly keepOpen?: boolean;
  /** What running it does. Called after the palette has asked to close. */
  readonly onSelect?: () => void;
  /** Set, the row is a submenu: running it drills into these groups. */
  readonly groups?: ReadonlyArray<CommandPaletteGroup>;
  /** The field's placeholder inside the submenu. */
  readonly placeholder?: string;
}

/** A labelled run of rows. */
export interface CommandPaletteGroup {
  readonly id: string;
  /** The small muted header; omitted, the rows run on without one. */
  readonly label?: string;
  readonly items: ReadonlyArray<CommandPaletteItem>;
  /** Dropped while a query is typed (a "Recent" group, whose rows the
   *  search finds anyway). */
  readonly hideWhenSearching?: boolean;
}

/** Case- and accent-folded, whitespace-collapsed: what every match compares.
 *  Locale-free on purpose (a Turkish host must still match "GIT" to "git"). */
export function normalizeSearchText(value: string): string {
  return value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/\s+/g, " ").trim();
}

function rankField(field: string, query: string, tokens: ReadonlyArray<string>): number {
  const normalized = normalizeSearchText(field);
  if (normalized.length === 0 || !tokens.every((t) => normalized.includes(t))) return -Infinity;
  if (normalized === query) return 3;
  if (normalized.startsWith(query)) return 2;
  if (normalized.includes(query)) return 1;
  return 0;
}

/** The first term holding every query word decides the rank: an earlier term
 *  ranks higher, and within a term an exact match beats a prefix beats a
 *  substring. */
function rankItem(item: CommandPaletteItem, query: string, tokens: ReadonlyArray<string>): number {
  const terms = [item.label, ...(item.keywords ?? [])].filter((t) => t.length > 0);
  for (const [index, term] of terms.entries()) {
    const rank = rankField(term, query, tokens);
    if (rank !== -Infinity) return 1_000 - index * 100 + rank;
  }
  return 0;
}

/**
 * The groups a query shows. Empty, the groups as given. Typed, every row
 * whose label and keywords together hold every query word, ranked within its
 * group (secondary rows last, then by `rankItem`, then in source order);
 * groups left empty, and `hideWhenSearching` groups, drop out.
 */
export function filterCommandGroups(
  groups: ReadonlyArray<CommandPaletteGroup>,
  query: string,
): CommandPaletteGroup[] {
  const normalized = normalizeSearchText(query);
  if (normalized.length === 0) return [...groups];
  const tokens = normalized.split(" ");
  return groups.flatMap((group) => {
    if (group.hideWhenSearching) return [];
    const items = group.items
      .flatMap((item, index) => {
        const haystack = normalizeSearchText([item.label, ...(item.keywords ?? [])].join(" "));
        if (!tokens.every((t) => haystack.includes(t))) return [];
        return [{ item, index, rank: rankItem(item, normalized, tokens) }];
      })
      .sort(
        (a, b) =>
          Number(a.item.secondary ?? false) - Number(b.item.secondary ?? false) ||
          b.rank - a.rank ||
          a.index - b.index,
      )
      .map((entry) => entry.item);
    return items.length === 0 ? [] : [{ ...group, items }];
  });
}

/** The ids the keyboard can land on, in display order: every row that is
 *  not disabled. */
export function selectableIds(groups: ReadonlyArray<CommandPaletteGroup>): string[] {
  return groups.flatMap((g) => g.items.filter((i) => !i.disabled).map((i) => i.id));
}

/** The highlight one step from `current` through `ids`, wrapping at the ends.
 *  With nothing highlighted, down starts at the top and up at the bottom. */
export function stepHighlight(
  ids: ReadonlyArray<string>,
  current: string | null,
  step: 1 | -1,
): string | null {
  if (ids.length === 0) return null;
  const index = current === null ? -1 : ids.indexOf(current);
  if (index === -1) return step === 1 ? ids[0]! : ids[ids.length - 1]!;
  return ids[(index + step + ids.length) % ids.length]!;
}

/** A row's element id: the list's id and the row's key, reduced to
 *  `[A-Za-z0-9_-]` so it is a safe id whatever the key holds. Look the
 *  element up with `document.getElementById`, never a selector — React's
 *  `useId` ids hold colons. */
export function optionId(listId: string, key: string): string {
  return `${listId}-opt-${key}`.replace(/[^A-Za-z0-9_-]/g, "_");
}

/**
 * The keyboard highlight over a list's selectable ids.
 *
 * `active` is the tracked id while it is still listed, else the first one, so
 * a filter that drops the highlighted row lands on the top rather than on
 * nothing. A change of `resetKey` (the query) starts again at the top.
 * `pointTo` is for `onPointerMove`: it highlights only when the pointer
 * really moved, so a list scrolling under a resting mouse never steals the
 * highlight from the keys.
 */
export function useListHighlight(ids: ReadonlyArray<string>, resetKey?: unknown) {
  const [tracked, setTracked] = useState<string | null>(null);
  const active = tracked !== null && ids.includes(tracked) ? tracked : (ids[0] ?? null);

  const lastKey = useRef(resetKey);
  useLayoutEffect(() => {
    if (Object.is(lastKey.current, resetKey)) return;
    lastKey.current = resetKey;
    setTracked(null);
  }, [resetKey]);

  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  return {
    active,
    setActive: setTracked,
    /** Moves the highlight and returns where it landed. */
    step: (direction: 1 | -1) => {
      const next = stepHighlight(ids, active, direction);
      setTracked(next);
      return next;
    },
    pointTo: (id: string, x: number, y: number) => {
      const last = lastPointer.current;
      lastPointer.current = { x, y };
      if (last && last.x === x && last.y === y) return;
      // A disabled row is not selectable: pointing at it leaves the highlight.
      if (id !== active && ids.includes(id)) setTracked(id);
    },
  };
}

/** One run of text, matched or not. */
export interface HighlightSegment {
  readonly text: string;
  readonly match: boolean;
}

/**
 * Cut `text` at `ranges` (`[start, end)` pairs, as a search backend reports
 * them). Ranges are clamped to the text, empty and inverted ones dropped, and
 * overlapping or touching ones merged, so the segments alternate and join
 * back to `text` exactly. No ranges: one unmatched segment. Empty text: none.
 */
export function splitHighlights(
  text: string,
  ranges: ReadonlyArray<readonly [number, number]> = [],
): HighlightSegment[] {
  if (text.length === 0) return [];
  const clamp = (n: number) => Math.min(Math.max(n, 0), text.length);
  const sorted = ranges
    .map(([s, e]) => [clamp(s), clamp(e)] as [number, number])
    .filter(([s, e]) => e > s)
    .sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [];
  for (const range of sorted) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([...range]);
  }
  const out: HighlightSegment[] = [];
  let at = 0;
  for (const [s, e] of merged) {
    if (s > at) out.push({ text: text.slice(at, s), match: false });
    out.push({ text: text.slice(s, e), match: true });
    at = e;
  }
  if (at < text.length) out.push({ text: text.slice(at), match: false });
  return out;
}
