/**
 * Pure helpers the session blocks share, ported from
 * `src/components/session/session-view-helpers.ts`. The windowing hook lives in
 * `use-window.svelte.ts`. No React here.
 */
import type { SessionPhase, ToolKind } from "./session-view";

const TOOL_KINDS: ReadonlySet<string> = new Set<ToolKind>([
  "read",
  "edit",
  "delete",
  "move",
  "search",
  "execute",
  "think",
  "fetch",
  "other",
]);

/**
 * Agents name their tools differently (Claude Code's `Bash` is ACP's
 * `execute`, its `Grep` a `search`), so a name is folded onto a kind. Keys are
 * lower-cased with spaces, hyphens and underscores removed. Web's table, plus
 * the names ACP agents commonly send.
 */
const KIND_OF: Record<string, ToolKind> = {
  read: "read",
  view: "read",
  cat: "read",
  notebookread: "read",
  edit: "edit",
  multiedit: "edit",
  strreplace: "edit",
  strreplaceeditor: "edit",
  strreplacebasededittool: "edit",
  applypatch: "edit",
  patch: "edit",
  notebookedit: "edit",
  write: "edit",
  create: "edit",
  delete: "delete",
  remove: "delete",
  rm: "delete",
  move: "move",
  mv: "move",
  rename: "move",
  bash: "execute",
  bashoutput: "execute",
  execute: "execute",
  exec: "execute",
  shell: "execute",
  terminal: "execute",
  run: "execute",
  search: "search",
  grep: "search",
  glob: "search",
  find: "search",
  ls: "search",
  list: "search",
  fetch: "fetch",
  webfetch: "fetch",
  websearch: "fetch",
  think: "think",
  todowrite: "think",
  task: "think",
};

/**
 * The `ToolKind` for a call. A valid ACP `acpKind` wins; otherwise the name is
 * folded through the table, and anything unknown is `other`.
 */
export function toolKindOf(name: string, acpKind?: string | null): ToolKind {
  if (acpKind && TOOL_KINDS.has(acpKind)) return acpKind as ToolKind;
  return KIND_OF[name.toLowerCase().replace(/[\s_-]/g, "")] ?? "other";
}

/** The `StatusIcon` glyph for a phase. */
export function statusIconOf(phase: SessionPhase): "queued" | "live" | "done" | "failed" {
  switch (phase) {
    case "running":
    case "waiting":
      return "live";
    case "done":
    case "cancelled":
      return "done";
    case "queued":
      return "queued";
    case "failed":
      return "failed";
  }
}

/** CSI (`ESC [ … final byte`) and OSC (`ESC ] … BEL` or `ESC ] … ESC \`). */
// oxlint-disable-next-line no-control-regex -- the escapes are what it matches
const ANSI = /\u001b\[[0-?]*[ -/]*[@-~]|\u001b\][^\u0007\u001b]*(?:\u0007|\u001b\\)/g;

/** Terminal output without its escape sequences. No colour is kept. */
export function stripAnsi(text: string): string {
  return text.replace(ANSI, "");
}

/** `850ms`, `4.2s`, `1m 12s`, `1h 3m`. */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.max(0, Math.round(ms))}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

/** `512 B`, `4.2 KB`, `1.3 MB`. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
