/** Every string the tool call card draws beyond the call's own data (`ToolCallCardLabels`). */
export interface ToolCallCardLabels {
  copy: string;
  copied: string;
  /** The button that shows the next `n` lines. */
  showMore: (n: number) => string;
  /** A truncated payload's load button; `size` is formatted ("94.1 KB") when known. */
  loadFull: (part: "input" | "output", size?: string) => string;
  /** The load button after the app's fetch failed; clicking retries. */
  loadFailed?: (part: "input" | "output") => string;
  /** A truncated payload with nothing to load it. */
  truncated: (part: "input" | "output") => string;
  /** A binary payload; `size` is formatted when known. */
  binary: (part: "input" | "output", size?: string) => string;
  /** An opened call that recorded nothing. */
  empty: string;
}

export const DEFAULT_TOOL_CALL_CARD_LABELS: ToolCallCardLabels = {
  copy: "Copy",
  copied: "Copied",
  showMore: (n) => `Show ${n.toLocaleString("en-US")} more lines`,
  loadFull: (part, size) => `Load full ${part}${size ? ` (${size})` : ""}`,
  loadFailed: (part) => `Couldn't load the full ${part}, retry`,
  truncated: (part) => `${part === "input" ? "Input" : "Output"} truncated`,
  binary: (part, size) => `Binary ${part}${size ? `, ${size}` : ""}`,
  empty: "Nothing else was recorded for this call.",
};

/** How long Copy shows that it copied. */
export const COPIED_MS = 1200;
/** At most this many lines of a payload render at first; "Show more" adds the step. */
export const LINES_INITIAL = 400;
export const LINES_STEP = 2000;

/** What a payload's Copy asks the app to put on the clipboard. */
export type CopyPayload = (part: "input" | "output", text: string) => Promise<boolean> | boolean;

export type LineTone = "added" | "removed" | "hunk" | undefined;
