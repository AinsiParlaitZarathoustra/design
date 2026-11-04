/**
 * Deterministic data for the CheckpointTrace stories: a seeded generator, so
 * every run (and every screenshot) draws the same week.
 */
import type {
  TraceAuthor,
  TraceCheckpoint,
  TraceSession,
} from "../../../src/components/blocks/checkpoint-trace.tsx";

/** Wednesday 4 November 2026, mid-afternoon (UTC). */
export const NOW = Date.UTC(2026, 10, 4, 15, 30);
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export const PEOPLE: TraceAuthor[] = [
  { id: "priya", name: "Priya Raman" },
  { id: "sam", name: "Sam Okafor" },
  { id: "maya", name: "Maya Chen" },
  { id: "tomas", name: "Tomás Rivera" },
  { id: "aiko", name: "Aiko Tanaka" },
  { id: "jonah", name: "Jonah Weiss" },
];

// Ids chosen so the three land on three different identity hues.
export const PROJECTS = [
  { id: "proj_atlas", name: "atlas" },
  { id: "proj_server", name: "server" },
  { id: "design-system", name: "design" },
];

const AGENTS = ["Claude Code", "Codex", "Atlas"];

const TITLES = [
  "Fix auth redirect after sign-in",
  "Port the session timeline",
  "Virtualize the board",
  "Theme import from VS Code",
  "Wire up the PR surface",
  "Flaky terminal test on Linux",
  "Org switcher keyboard nav",
  "Settle sessions instead of archiving",
  "Cache the model catalogue",
  "Sandbox helper alias on Linux",
  "Comment anchors survive edits",
  "Project picker replaces org switcher",
  "Bound every hop of the start path",
  "Snooze and unread in the sidebar",
];

const COMMITS = [
  "Add failing test for the redirect",
  "Keep the return URL through OAuth",
  "Extract the session adapter",
  "Measure rows instead of guessing",
  "Drop the duplicate CodeMirror copy",
  "Retry the gateway fetch once",
  "Move the badge into the header",
  "Handle an empty catalogue",
  "Tighten the timeout to 8s",
  "Rename chat to session in the UI",
  "Split the store by feature",
  "Fix the focus ring on the switcher",
  "Guard against a null project",
  "Clean up the dead flag",
];

/** Mulberry32: a tiny seeded PRNG. */
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const iso = (t: number) => new Date(t).toISOString();
const hex = (r: () => number) =>
  Array.from({ length: 40 }, () => Math.floor(r() * 16).toString(16)).join("");

function checkpoints(
  r: () => number,
  sessionId: string,
  start: number,
  end: number,
  owner: TraceAuthor,
  helper: TraceAuthor | null,
  count: number,
  branch: string,
): TraceCheckpoint[] {
  const out: TraceCheckpoint[] = [];
  for (let i = 0; i < count; i++) {
    const at = start + ((i + 0.5 + (r() - 0.5) * 0.6) / count) * (end - start);
    // A helper takes the session over for its second half.
    const author = helper && i >= count / 2 ? helper : owner;
    out.push({
      id: `${sessionId}-c${i}`,
      sessionId,
      at: iso(Math.round(at / MIN) * MIN),
      author,
      title: COMMITS[Math.floor(r() * COMMITS.length)]!,
      sha: hex(r),
      branch,
      additions: Math.floor(r() * 220),
      deletions: Math.floor(r() * 90),
      files: 1 + Math.floor(r() * 9),
    });
  }
  return out;
}

/** About forty sessions over the week to `NOW`, six people, three projects. */
export function orgWeek(count = 40, seed = 7): TraceSession[] {
  const r = rng(seed);
  const sessions: TraceSession[] = [];
  for (let i = 0; i < count; i++) {
    const owner = PEOPLE[i % PEOPLE.length]!;
    const project = PROJECTS[Math.floor(r() * PROJECTS.length)]!;
    const live = i < 4;
    const daysAgo = live ? 0 : Math.floor(r() * 7);
    const startHour = 8 + r() * 9;
    let start = NOW - daysAgo * DAY;
    start = start - (start % DAY) + startHour * HOUR;
    if (live) start = NOW - (0.5 + r() * 3.5) * HOUR;
    const duration = (0.4 + r() * 4.5) * HOUR;
    const end = live ? NOW : Math.min(start + duration, NOW - 10 * MIN);
    if (!live && end <= start) start = end - HOUR;
    const helper = r() < 0.25 ? PEOPLE[(i + 1 + Math.floor(r() * 4)) % PEOPLE.length]! : null;
    const produced = r() < 0.12 ? 0 : 1 + Math.floor(r() * 7);
    const id = `s${i}`;
    sessions.push({
      id,
      title: TITLES[i % TITLES.length]!,
      projectId: project.id,
      projectName: project.name,
      agentLabel: AGENTS[i % AGENTS.length]!,
      startedAt: iso(start),
      endedAt: live ? null : iso(end),
      status: live ? "live" : i === 9 ? "error" : "settled",
      participants: helper ? [owner, helper] : [owner],
      checkpoints: checkpoints(r, id, start, end, owner, helper, produced, `${owner.id}/${id}`),
    });
  }
  return sessions;
}

/**
 * One project's sessions on the last day, in the server's shape: no
 * checkpoint titles (the label falls back to the short sha), one commit
 * rebased away (`orphaned`), and one session past the 200-checkpoint cap.
 */
export function projectDay(): TraceSession[] {
  const dayStart = NOW - (NOW % DAY);
  const sessions = orgWeek(60, 11)
    .filter((s) => s.projectId === "proj_atlas" && Date.parse(s.startedAt) >= dayStart - 6 * HOUR)
    .slice(0, 12);
  // The first two sessions that landed anything: one whose branch was
  // deleted (every commit lost), one past the cap.
  const productive = sessions.filter((x) => x.checkpoints.length > 0).map((x) => x.id);
  return sessions.map((x) => ({
    ...x,
    checkpointsTruncated: x.id === productive[1],
    checkpoints: x.checkpoints.map((c) => ({
      ...c,
      title: null,
      linkState: x.id === productive[0] ? ("orphaned" as const) : ("linked" as const),
    })),
  }));
}

/** Sessions all live right now, at different ages. */
export function liveSessions(): TraceSession[] {
  return orgWeek(6, 3).map((s, i) => {
    const start = NOW - (0.75 + i * 0.6) * HOUR;
    const span = NOW - start;
    return {
      ...s,
      startedAt: iso(start),
      endedAt: null,
      status: "live" as const,
      // Spread over the session so far, every one in the past.
      checkpoints: s.checkpoints.map((c, k, all) => ({
        ...c,
        at: iso(start + ((k + 0.5) / all.length) * span * 0.9),
      })),
    };
  });
}

/** One long session that lands a checkpoint every few minutes: clusters. */
export function denseSession(): TraceSession[] {
  const r = rng(5);
  const start = NOW - 4 * HOUR;
  const priya = PEOPLE[0]!;
  const sam = PEOPLE[1]!;
  const burst = (from: number, n: number, every: number, who: TraceAuthor, tag: string) =>
    Array.from({ length: n }, (_, i) => ({
      id: `dense-${tag}${i}`,
      sessionId: "dense",
      at: iso(from + i * every),
      author: who,
      title: COMMITS[Math.floor(r() * COMMITS.length)]!,
      sha: hex(r),
      branch: "priya/dense-burst",
      additions: Math.floor(r() * 60),
      deletions: Math.floor(r() * 20),
      files: 1 + Math.floor(r() * 3),
    }));
  return [
    {
      id: "dense",
      title: "Migrate the board to the new store",
      projectId: "proj_atlas",
      projectName: "atlas",
      agentLabel: "Claude Code",
      startedAt: iso(start),
      endedAt: iso(NOW - 15 * MIN),
      status: "settled",
      participants: [priya, sam],
      checkpoints: [
        ...burst(start + 10 * MIN, 14, 4 * MIN, priya, "a"),
        ...burst(start + 100 * MIN, 9, 3 * MIN, sam, "b"),
        ...burst(start + 170 * MIN, 5, 12 * MIN, priya, "c"),
      ],
    },
    // Neighbours at an ordinary pace, for contrast.
    ...orgWeek(6, 13).map((s, k) => {
      const from = NOW - 3 * HOUR + k * 17 * MIN;
      const end = s.endedAt ? from + (70 + k * 13) * MIN : NOW;
      return {
        ...s,
        startedAt: iso(from),
        endedAt: s.endedAt ? iso(end) : null,
        checkpoints: s.checkpoints
          .map((c, i) => ({ ...c, at: iso(from + (i + 1) * (8 + k * 3) * MIN) }))
          .filter((c) => Date.parse(c.at) <= end),
      };
    }),
  ];
}

/** Titles and names long enough to have to truncate. */
export function longTitles(): TraceSession[] {
  return orgWeek(8, 17).map((s, i) => ({
    ...s,
    title:
      i % 2 === 0
        ? "Rewrite the session sidebar so pinned, unread and snoozed sessions sort into one flat list with a project filter and a settled section"
        : s.title,
    projectName: i % 3 === 0 ? "atlas-desktop-and-the-engine-quarantine-workspace" : s.projectName,
    agentLabel: i % 2 === 1 ? "A very long agent name from an ACP registry" : s.agentLabel,
    participants: i === 0 ? PEOPLE.slice(0, 5) : s.participants,
  }));
}

export const RANGE_WEEK = { from: iso(NOW - 7 * DAY), to: iso(NOW + 6 * HOUR) };
