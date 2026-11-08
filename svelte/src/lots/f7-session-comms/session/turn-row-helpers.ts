import type { AgentItem, ToolCallView } from "./session-view";

/**
 * The pure parts of `turn-row.svelte`, ported from the oracle's
 * `turn-row.tsx`: how a turn's items group into runs, what a folded run says,
 * and the clamp's figures. No runes here.
 */

/** "17s", "1m 29s", "1h 3m": a turn's work, in whole seconds (desktop's `formatWorked`). */
export function formatWorked(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

/** A run of more tool calls than this folds behind one line. */
export const FOLD_OVER = 3;

export type TurnBlock =
  | { kind: "item"; item: Exclude<AgentItem, { kind: "tool" }> }
  | { kind: "tools"; key: string; calls: ToolCallView[] };

/** Consecutive tool items become one run. */
export function blocksOf(items: AgentItem[]): TurnBlock[] {
  const blocks: TurnBlock[] = [];
  for (const item of items) {
    if (item.kind === "tool") {
      const last = blocks[blocks.length - 1];
      if (last?.kind === "tools") last.calls.push(item.call);
      else blocks.push({ kind: "tools", key: `tools:${item.call.id}`, calls: [item.call] });
    } else {
      blocks.push({ kind: "item", item });
    }
  }
  return blocks;
}

/** "3 edited · 4 read · 2 ran" — what a folded run did. */
export function summarise(calls: ToolCallView[]): string {
  const count = (...kinds: ToolCallView["kind"][]) =>
    calls.filter((c) => kinds.includes(c.kind)).length;
  const parts: string[] = [];
  const edited = count("edit", "delete", "move");
  if (edited) parts.push(`${edited} edited`);
  if (count("read")) parts.push(`${count("read")} read`);
  if (count("execute")) parts.push(`${count("execute")} ran`);
  if (count("search")) parts.push(`${count("search")} searched`);
  const other = calls.length - edited - count("read", "execute", "search");
  if (other > 0) parts.push(`${other} other`);
  return parts.join(" · ");
}

/**
 * "2 modified · 3 read", and the lines the edits added and removed: what a
 * folded run did to the tree (desktop's session-detail `CallStat`).
 */
export function summariseFiles(calls: ToolCallView[]): {
  text: string;
  added: number;
  removed: number;
} {
  const modified = new Set<string>();
  const read = new Set<string>();
  let added = 0;
  let removed = 0;
  for (const call of calls) {
    if (call.status === "failed") continue;
    if (call.kind === "edit") {
      for (const path of call.paths ?? []) modified.add(path);
      for (const diff of call.diffs ?? []) {
        modified.add(diff.path);
        added += diff.insertions ?? 0;
        removed += diff.deletions ?? 0;
      }
    } else if (call.kind === "read") {
      for (const path of call.paths ?? []) read.add(path);
    }
  }
  const parts: string[] = [];
  if (modified.size) parts.push(`${modified.size} modified`);
  if (read.size) parts.push(`${read.size} read`);
  return { text: parts.join(" · "), added, removed };
}

/** An ISO instant as "09:30"; `null` when absent or unparseable. */
export function timeOf(iso: string | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

/** Lines a prompt shows before "Show more", and their height in the bubble. */
export const USER_MAX_LINES = 12;
export const USER_LINE_HEIGHT = 22;
export const USER_CLAMP_PX = USER_MAX_LINES * USER_LINE_HEIGHT;

/** An answer's clamped height, and how far past it an answer may run before it clamps. */
export const RESPONSE_CLAMP_PX = 340;
export const RESPONSE_CLAMP_SLACK_PX = 60;

/** Files a checkpoint card lists before "+n more". */
export const FILES_SHOWN = 12;
