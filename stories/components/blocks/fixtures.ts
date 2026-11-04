import type { Session, TimelineEntry } from "../../../src/lib/types.ts";

/** Fixture data shared by the block stories: one session and its timeline. */

export const SESSION: Session = {
  id: "s-1042",
  ref: "ATL-1042",
  title: "Move the settings panel onto the shared card",
  agent: "Claude",
  model: "claude-opus",
  branch: "settings-card",
  project: "atlas",
  author: "Maya Chen",
  authorInitials: "MC",
  status: "live",
  tokens: 184_220,
  added: 412,
  removed: 167,
  startedAt: "10:42",
  durationMinutes: 18,
  commentCount: 3,
  labels: [{ name: "settings", tone: "blue" }],
  priority: "medium",
};

export const ENTRIES: TimelineEntry[] = [
  { id: "e1", kind: "prompt", title: "Move the settings panel onto SettingCard", at: "10:42" },
  { id: "e2", kind: "thinking", title: "Planned the change across four files", at: "10:42" },
  {
    id: "e3",
    kind: "tool_call",
    title: "Read settings-panel.tsx",
    detail: "src/features/settings/components",
    at: "10:43",
    toolStatus: "ok",
  },
  {
    id: "e4",
    kind: "tool_call",
    title: "Edit settings-panel.tsx",
    detail: "+84 −61",
    at: "10:46",
    toolStatus: "ok",
  },
  {
    id: "e5",
    kind: "tool_call",
    title: "bun run typecheck",
    detail: "Watching for errors",
    at: "10:51",
    toolStatus: "running",
  },
  { id: "e6", kind: "tool_call", title: "bun run test", at: "—" },
  { id: "e7", kind: "tool_call", title: "Commit the change", at: "—" },
];

export const FAILED_ENTRIES: TimelineEntry[] = [
  ENTRIES[0]!,
  { ...ENTRIES[2]!, at: "10:43" },
  {
    id: "e8",
    kind: "tool_call",
    title: "bun run test",
    detail: "3 failed in settings-card.test.tsx",
    at: "10:49",
    toolStatus: "error",
  },
  { id: "e9", kind: "response", title: "Stopped: the tests fail on main too", at: "10:50" },
];

export const DONE_ENTRIES: TimelineEntry[] = [
  ...ENTRIES.slice(0, 4),
  { ...ENTRIES[4]!, toolStatus: "ok", detail: "No errors" },
  { ...ENTRIES[5]!, toolStatus: "ok", at: "10:53" },
  { ...ENTRIES[6]!, toolStatus: "ok", at: "10:54" },
  { id: "e10", kind: "checkpoint", title: "Checkpoint 2", at: "10:54" },
  { id: "e11", kind: "response", title: "Moved the panel; 14 tests pass", at: "10:55" },
];

export const LONG_ENTRIES: TimelineEntry[] = [
  {
    id: "l1",
    kind: "prompt",
    title:
      "Rewrite the session sidebar so pinned, unread and snoozed sessions all sort into one flat list with a project filter",
    at: "09:12",
  },
  {
    id: "l2",
    kind: "tool_call",
    title: "Edit src/features/sidebar/components/session-list-row-with-pin-and-unread-markers.tsx",
    detail:
      "src/features/sidebar/components/session-list-row-with-pin-and-unread-markers.tsx +212 −148",
    at: "09:20",
    toolStatus: "running",
  },
];
