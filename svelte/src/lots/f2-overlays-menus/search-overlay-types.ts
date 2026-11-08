import type { Snippet } from "svelte";

/** One search hit. `highlights` are `[start, end)` ranges into `detail`, as passed. */
export interface SearchResult {
  /** Unique within the results; the highlight is tracked by it. */
  readonly id: string;
  /** The first line: a path, a message's author. */
  readonly title: string;
  /** Right of the title, muted: a line number, a time. */
  readonly meta?: string;
  /** The second line: the matching text. */
  readonly detail?: string;
  readonly highlights?: ReadonlyArray<readonly [number, number]>;
  /** The leading glyph. */
  readonly icon?: Snippet;
  /** Set both lines in the code face (paths, code). */
  readonly mono?: boolean;
}

export type SearchStatus = "idle" | "searching" | "done" | "error";
