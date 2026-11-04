/**
 * SessionView fixtures for the session stories and tests. Pure and
 * deterministic: fixed timestamps from one base, no clock, no randomness, so
 * a builder called twice returns identical JSON. Not shipped.
 */
import type {
  AgentItem,
  BodyLoad,
  SessionView,
  ToolCallView,
  ToolKind,
  ToolStatus,
  TurnView,
} from "../../../src/components/session/session-view.ts";

const BASE = Date.UTC(2026, 9, 14, 9, 30, 0);

/** The base time plus `seconds`, as ISO. */
export function at(seconds: number): string {
  return new Date(BASE + seconds * 1000).toISOString();
}

const KINDS: ToolKind[] = [
  "read",
  "edit",
  "execute",
  "search",
  "fetch",
  "delete",
  "move",
  "think",
  "other",
];
const STATUSES: ToolStatus[] = [
  "completed",
  "completed",
  "completed",
  "failed",
  "running",
  "pending",
];

const NAMES: Record<ToolKind, string> = {
  read: "Read",
  edit: "Edit",
  execute: "Bash",
  search: "Grep",
  fetch: "WebFetch",
  delete: "Delete",
  move: "Move",
  think: "TodoWrite",
  other: "mcp__linear__get_issue",
};

const TITLES: Record<ToolKind, (n: number) => string> = {
  read: (n) => `Read src/features/chat/row-${n}.tsx`,
  edit: (n) => `Edit src/features/chat/row-${n}.tsx`,
  execute: (n) => `bun run test src/lib/case-${n}.test.ts`,
  search: (n) => `Search "useWindow" in src (${n})`,
  fetch: () => "Fetch https://example.com/docs/streaming",
  delete: (n) => `Delete src/legacy/old-${n}.ts`,
  move: (n) => `Move src/a-${n}.ts to src/b-${n}.ts`,
  think: () => "Update the plan",
  other: () => "Get issue ATL-878",
};

/** One call, with sensible defaults for whatever `overrides` leaves out. */
export function toolCall(overrides: Partial<ToolCallView> & { id: string }): ToolCallView {
  const kind = overrides.kind ?? "read";
  return {
    name: NAMES[kind],
    kind,
    status: "completed",
    at: at(0),
    durationMs: 640,
    ...overrides,
  };
}

/** One turn, with a prompt and a short answer unless `overrides` says otherwise. */
export function turn(overrides: Partial<TurnView> & { key: string }): TurnView {
  return {
    user: {
      id: `${overrides.key}:user`,
      text: "Make the sidebar sort pinned sessions first.",
      at: at(0),
    },
    items: [
      {
        kind: "text",
        id: `${overrides.key}:answer`,
        text: "Done: pinned sessions now sort above the rest.",
        model: "claude-opus-4-5",
        at: at(30),
      },
    ],
    outcome: { kind: "finished", stopReason: "end_turn" },
    durationMs: 30_000,
    ...overrides,
  };
}

function answer(i: number): string {
  return [
    `## Step ${i + 1}`,
    "",
    `Moved the sort into \`sortSessions\` so the list and the jump menu agree (pass ${i + 1}).`,
    "",
    "- pinned sessions first",
    "- then unread, newest first",
    "- snoozed sessions last",
    "",
    "```ts",
    "export function sortSessions(rows: Row[]): Row[] {",
    "  return [...rows].sort((a, b) => rank(a) - rank(b) || b.at - a.at)",
    "}",
    "```",
  ].join("\n");
}

function callsFor(turnIndex: number): ToolCallView[] {
  return Array.from({ length: turnIndex % 4 }, (_, j) => {
    const kind = KINDS[(turnIndex + j) % 4]!;
    return toolCall({
      id: `t${turnIndex}:call${j}`,
      kind,
      title: TITLES[kind](turnIndex),
      at: at(turnIndex * 120 + 10 + j),
      durationMs: 300 + ((turnIndex * 7 + j * 13) % 40) * 100,
      paths:
        kind === "read" || kind === "edit" ? [`src/features/chat/row-${turnIndex}.tsx`] : undefined,
      input: { text: `{"path":"src/features/chat/row-${turnIndex}.tsx"}` },
      output: {
        text: Array.from({ length: 6 }, (_, k) => `line ${k + 1} of the result`).join("\n"),
      },
      diffs:
        kind === "edit"
          ? [
              {
                path: `src/features/chat/row-${turnIndex}.tsx`,
                insertions: 2,
                deletions: 1,
                patch: [
                  "@@ -1,3 +1,4 @@",
                  " import { sortSessions } from './sort'",
                  "-const rows = sessions",
                  "+const rows = sortSessions(sessions)",
                  "+const pinned = rows.filter((r) => r.pinned)",
                ].join("\n"),
              },
            ]
          : undefined,
    });
  });
}

function longTurn(i: number): TurnView {
  const items: AgentItem[] = [
    ...callsFor(i).map((call): AgentItem => ({ kind: "tool", call })),
    {
      kind: "text",
      id: `t${i}:answer`,
      text: answer(i),
      model: "claude-opus-4-5",
      at: at(i * 120 + 60),
    },
  ];
  return turn({
    key: `t${i}`,
    user: {
      id: `t${i}:user`,
      text: `Pass ${i + 1}: keep the session list sorted the same way everywhere.`,
      at: at(i * 120),
    },
    items,
    durationMs: 20_000 + i * 1_000,
  });
}

const META = {
  title: "Sort pinned sessions first",
  ref: "ses-5123",
  agent: "Claude Code",
  model: "claude-opus-4-5",
  branch: "uzayermasud/pinned-first",
  workspace: "atlas",
  startedAt: at(0),
};

/** `turns` turns, each a prompt, 0 to 3 tool calls and an answer with a heading, a list and a fence. */
export function longSession(turns = 60): SessionView {
  return {
    meta: { ...META, counts: { messages: turns * 2 } },
    phase: "done",
    turns: Array.from({ length: turns }, (_, i) => longTurn(i)),
  };
}

/** About 3 KB of markdown: a table and ts, rust and bash fences. */
export const streamingSource = [
  "## Where the time goes",
  "",
  "The transcript re-parsed **every block** on every frame, so a long answer cost",
  "more the longer it got. Splitting it into top-level blocks fixes that: a",
  "finished block's source never changes, so it never re-parses.",
  "",
  "| Stage | Before | After |",
  "| --- | --- | --- |",
  "| Split | whole source per frame | the tail only |",
  "| Parse | every block | the trailing block |",
  "| Highlight | every fence | closed fences, once |",
  "",
  "The split keeps a carry between frames:",
  "",
  "```ts",
  "export function splitIncremental(source: string, prev: BlockSplit): BlockSplit {",
  "  if (!source) return EMPTY_SPLIT",
  "  const reusable = prev.windowStart > 0 && source.startsWith(prev.source.slice(0, prev.windowStart))",
  "  if (!reusable) return finish(source, splitFrom(source, 0, [], []))",
  "  return finish(source, splitFrom(source, prev.windowStart, prev.blocks, prev.starts))",
  "}",
  "```",
  "",
  "On the Rust side the delta is appended to the message in place:",
  "",
  "```rust",
  "pub fn apply(&mut self, delta: SessionDelta) {",
  "    match delta {",
  "        SessionDelta::TextChunk { message_id, text } => {",
  "            if let Some(m) = self.messages.iter_mut().find(|m| m.id == message_id) {",
  "                m.content.push_str(&text);",
  "            }",
  "        }",
  "        _ => {}",
  "    }",
  "}",
  "```",
  "",
  "To check it locally:",
  "",
  "```bash",
  "bun run test src/lib/markdown-blocks.test.ts",
  "cargo test -p atlas-agent-wire --test contract",
  "```",
  "",
  "1. Stream a long answer and watch the frame times.",
  "2. Scroll back while it streams; nothing above the tail should re-render.",
  "3. Switch the theme; code recolours without a re-render.",
  "",
  "> A block that has settled is byte-identical every frame, which is the whole trick.",
  "",
  "That is the change. The remaining cost is the trailing block itself, which",
  "re-parses at most every 120ms once it passes 2,000 characters.",
  "",
].join("\n");

/** Running: the last turn's last item is text that is still arriving. */
export function streamingSession(): SessionView {
  const base = longSession(3);
  const last = base.turns[2]!;
  const live: TurnView = {
    ...last,
    items: [
      ...last.items.slice(0, -1),
      {
        kind: "text",
        id: "t2:answer",
        text: streamingSource.slice(0, 600),
        model: "claude-opus-4-5",
        at: at(300),
      },
    ],
    outcome: undefined,
    durationMs: undefined,
  };
  return {
    ...base,
    phase: "running",
    turns: [...base.turns.slice(0, 2), live],
    streaming: { itemId: "t2:answer", activity: "text" },
  };
}

/** Failed: the last turn's sign-in expired, after one failed call. */
export function erroredSession(): SessionView {
  const base = longSession(2);
  const last = base.turns[1]!;
  return {
    ...base,
    phase: "failed",
    turns: [
      base.turns[0]!,
      {
        ...last,
        items: [
          {
            kind: "tool",
            call: toolCall({
              id: "t1:failed",
              kind: "execute",
              status: "failed",
              title: "bun run typecheck",
              terminal: {
                command: "bun run typecheck",
                output:
                  "src/a.ts(3,7): error TS2322: Type 'string' is not assignable to type 'number'.",
                exitCode: 2,
              },
            }),
          },
        ],
        outcome: { kind: "failed", error: { kind: "auth", message: "Authentication expired" } },
      },
    ],
  };
}

/** Cancelled by the person mid-turn. */
export function cancelledSession(): SessionView {
  const base = longSession(2);
  return {
    ...base,
    phase: "cancelled",
    turns: [
      base.turns[0]!,
      { ...base.turns[1]!, outcome: { kind: "cancelled", stopReason: "cancelled" } },
    ],
  };
}

/** One turn of `calls` consecutive tool calls across every kind and status. */
export function manyToolCallsSession(calls = 150): SessionView {
  return {
    meta: META,
    phase: "running",
    turns: [
      turn({
        key: "many",
        user: { id: "many:user", text: "Run every check and fix what fails.", at: at(0) },
        items: Array.from({ length: calls }, (_, i): AgentItem => {
          const kind = KINDS[i % KINDS.length]!;
          return {
            kind: "tool",
            call: toolCall({
              id: `many:${i}`,
              kind,
              status: STATUSES[i % STATUSES.length]!,
              title: TITLES[kind](i),
              at: at(i + 1),
              durationMs: 200 + (i % 17) * 150,
            }),
          };
        }),
        outcome: undefined,
        durationMs: undefined,
      }),
    ],
  };
}

const SGR = ["\u001b[32m", "\u001b[31m", "\u001b[33m"];

/** `lines` lines of build output, some coloured. */
function buildLog(lines: number): string {
  return Array.from({ length: lines }, (_, i) =>
    i % 50 === 0
      ? `${SGR[(i / 50) % 3]}[${String(i).padStart(5, "0")}] checkpoint\u001b[0m`
      : `[${String(i).padStart(5, "0")}] compiled src/module-${i % 997}.ts`,
  ).join("\n");
}

function bigPatch(lines: number): string {
  return [
    `@@ -1,${lines / 2} +1,${lines / 2} @@`,
    ...Array.from({ length: lines - 1 }, (_, i) =>
      i % 3 === 0 ? `-  old line ${i}` : i % 3 === 1 ? `+  new line ${i}` : `   same line ${i}`,
    ),
  ].join("\n");
}

/** The calls `hugeOutputSession` holds, for a story that puts them elsewhere. */
export function hugeOutputCalls(lines = 50_000): ToolCallView[] {
  return [
    toolCall({
      id: "huge:terminal",
      kind: "execute",
      title: "bun run build",
      durationMs: 72_400,
      input: { text: buildLog(1_200) },
      terminal: { command: "bun run build", output: buildLog(lines), exitCode: 0 },
    }),
    toolCall({
      id: "huge:patch",
      kind: "edit",
      title: "Edit src/generated/table.ts",
      paths: ["src/generated/table.ts"],
      diffs: [
        {
          path: "src/generated/table.ts",
          insertions: 1000,
          deletions: 1000,
          patch: bigPatch(3_000),
        },
      ],
    }),
    toolCall({
      id: "huge:binary",
      kind: "read",
      title: "Read assets/screenshot.png",
      paths: ["assets/screenshot.png"],
      output: { text: null, binary: true, bytes: 482113 },
    }),
  ];
}

/** One turn: a 50,000-line terminal run, a 3,000-line patch and a binary output. */
export function hugeOutputSession(lines = 50_000): SessionView {
  return {
    meta: META,
    phase: "done",
    turns: [
      turn({
        key: "huge",
        items: hugeOutputCalls(lines).map((call): AgentItem => ({ kind: "tool", call })),
      }),
    ],
  };
}

/** `turns` short turns, for the windowing check. */
export function hugeTurnsSession(turns = 2_000): SessionView {
  return {
    meta: META,
    phase: "done",
    turns: Array.from({ length: turns }, (_, i) =>
      turn({
        key: `h${i}`,
        user: { id: `h${i}:user`, text: `Question ${i + 1}`, at: at(i * 60) },
        items: [{ kind: "text", id: `h${i}:answer`, text: `Answer ${i + 1}.`, at: at(i * 60 + 5) }],
      }),
    ),
  };
}

/** A plan with every status, as the session's plan and as an item. */
export function planSession(): SessionView {
  const plan = [
    { content: "Read the transcript renderer", status: "completed" as const },
    { content: "Port the block splitter", status: "completed" as const },
    { content: "Write StreamingMarkdown", status: "in_progress" as const, priority: "high" },
    { content: "Write ToolCallCard and TurnRow", status: "pending" as const },
    { content: "Write SessionTimeline", status: "pending" as const },
    { content: "Stories and tests", status: "pending" as const },
  ];
  return {
    meta: META,
    phase: "running",
    plan,
    turns: [
      turn({
        key: "plan",
        items: [
          { kind: "plan", id: "plan:items", items: plan },
          { kind: "text", id: "plan:answer", text: "Starting on `StreamingMarkdown`.", at: at(20) },
        ],
        outcome: undefined,
      }),
    ],
  };
}

/** Only what web supplies: no streaming, no attachments, truncated payloads, checkpoints, comments. */
export function webShapedSession(): SessionView {
  return {
    meta: {
      ...META,
      tokens: { input: 182_000, output: 24_000, total: 206_000 },
      context: { used: 88_000, size: 200_000 },
      diffStat: { insertions: 212, deletions: 148, files: 9 },
      counts: { messages: 4, toolCalls: 2, checkpoints: 1 },
    },
    phase: "done",
    turns: [
      {
        key: "turn-1",
        user: { id: "e1", text: "Sort pinned sessions first.", at: at(0) },
        items: [
          {
            kind: "thinking",
            id: "e2",
            text: "The sort lives in two places; unify it first.",
            at: at(5),
          },
          {
            kind: "tool",
            call: toolCall({
              id: "e3",
              name: "Edit",
              kind: "edit",
              title: "Edit src/features/sidebar/sort.ts",
              paths: ["src/features/sidebar/sort.ts"],
              input: {
                text: '{"path":"src/features/sidebar/sort.ts","old_string":"…',
                truncated: true,
                bytes: 18_220,
              },
              output: { text: "The file was updated.", truncated: false, bytes: 21 },
            }),
          },
          {
            kind: "tool",
            call: toolCall({
              id: "e4",
              name: "Bash",
              kind: "execute",
              title: "bun run test",
              output: { text: "✓ 412 tests passed\n…", truncated: true, bytes: 96_400 },
            }),
          },
          {
            kind: "text",
            id: "e5",
            text: "Pinned sessions now sort first in the list and the jump menu.",
            at: at(90),
          },
        ],
        checkpoints: [
          {
            id: "e6",
            at: at(95),
            commitSha: "4f9c2e1a7b3d",
            subject: "sidebar: sort pinned sessions first",
            branch: "uzayermasud/pinned-first",
            linkState: "linked",
            insertions: 212,
            deletions: 148,
            files: Array.from({ length: 15 }, (_, i) => `src/features/sidebar/file-${i + 1}.ts`),
          },
          {
            id: "e7",
            at: at(96),
            commitSha: "9a1b7c0d2e3f",
            subject: "sidebar: tidy",
            branch: "uzayermasud/pinned-first",
            linkState: "orphaned",
            insertions: 4,
            deletions: 2,
            files: ["src/features/sidebar/sort.ts"],
          },
        ],
        outcome: { kind: "finished" },
      },
    ],
    comments: [
      {
        id: "c1",
        anchor: { kind: "message", id: "e5" },
        parentId: null,
        author: { name: "Adib" },
        body: "Does the jump menu read the same sort?",
        createdAt: at(200),
      },
      {
        id: "c2",
        anchor: { kind: "tool_call", id: "e3" },
        parentId: null,
        author: { name: "Guest reviewer", guest: true },
        body: "Nice.",
        createdAt: at(210),
      },
    ],
  };
}

function svg(label: string, fill: string): string {
  // No colour literals: the fill is a CSS system colour keyword.
  const body = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="${fill}"/><text x="32" y="38" font-size="12" text-anchor="middle" fill="Canvas">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(body)}`;
}

/** A turn whose prompt carries two images and a file. */
export const attachmentsTurn: TurnView = turn({
  key: "attach",
  user: {
    id: "attach:user",
    text: "Match these two screenshots, and read the attached spec.",
    at: at(0),
    attachments: [
      {
        kind: "image",
        name: "before.svg",
        mimeType: "image/svg+xml",
        src: svg("before", "GrayText"),
      },
      {
        kind: "image",
        name: "after.svg",
        mimeType: "image/svg+xml",
        src: svg("after", "CanvasText"),
      },
      { kind: "file", name: "sidebar-spec.pdf", mimeType: "application/pdf", bytes: 248_812 },
    ],
  },
});

/**
 * Web's preview-only bodies: the prompt and the answer were stored past the
 * preview, so each says how much more there is. `load` is the app's fetch.
 */
export function truncatedBodiesTurn(load?: { user?: BodyLoad; answer?: BodyLoad }): TurnView {
  return turn({
    key: "turn-9",
    user: {
      id: "tb:prompt",
      text: "Here is the full failing log from CI, every job, so you can see where the sidebar sort first breaks …",
      at: at(0),
      truncated: true,
      bytes: 48_310,
      load: load?.user,
    },
    items: [
      {
        kind: "text",
        id: "tb:answer",
        text: "The sort breaks in two places. First, `byPinned` compares the pinned flag after the date, so …",
        at: at(40),
        truncated: true,
        bytes: 12_870,
        load: load?.answer,
      },
    ],
  });
}

/** A turn whose answer runs well past 400px, and a short one after it, for `clampResponses`. */
export function longAnswerTurn(): TurnView {
  return turn({
    key: "long-answer",
    user: { id: "la:user", text: "Walk me through every place the sort is used.", at: at(0) },
    items: [
      {
        kind: "text",
        id: "la:answer",
        text: Array.from({ length: 4 }, (_, i) => answer(i)).join("\n\n"),
        at: at(30),
      },
      { kind: "text", id: "la:short", text: "That is all of them.", at: at(31) },
    ],
  });
}

/**
 * A finished run of nine calls: four edits (one of them failed), three reads,
 * a search and a test run. For `toolRunSummary="files"`:
 * "2 modified · 3 read +27 −9".
 */
export function editRunTurn(): TurnView {
  const edit = (id: string, path: string, insertions: number, deletions: number, failed = false) =>
    toolCall({
      id,
      name: "Edit",
      kind: "edit",
      status: failed ? "failed" : "completed",
      title: `Edit ${path}`,
      paths: [path],
      diffs: [{ path, insertions, deletions }],
    });
  const read = (id: string, path: string) =>
    toolCall({
      id,
      name: "Read",
      kind: "read",
      status: "completed",
      title: `Read ${path}`,
      paths: [path],
    });
  const calls = [
    read("run:r1", "src/features/sidebar/sort.ts"),
    read("run:r2", "src/features/sidebar/list.tsx"),
    toolCall({
      id: "run:s1",
      name: "Grep",
      kind: "search",
      status: "completed",
      title: "Search sortSessions",
    }),
    edit("run:e1", "src/features/sidebar/sort.ts", 18, 6),
    read("run:r3", "src/features/jump/menu.tsx"),
    edit("run:e2", "src/features/sidebar/sort.ts", 4, 2),
    edit("run:e3", "src/features/jump/menu.tsx", 5, 1),
    edit("run:e4", "src/features/jump/broken.tsx", 40, 40, true),
    toolCall({
      id: "run:x1",
      name: "Bash",
      kind: "execute",
      status: "completed",
      title: "bun run test",
    }),
  ];
  return turn({
    key: "edit-run",
    user: { id: "run:user", text: "Make the jump menu use the sidebar's sort.", at: at(0) },
    items: [
      ...calls.map((call): AgentItem => ({ kind: "tool", call })),
      { kind: "text", id: "run:answer", text: "Both now call `sortSessions`.", at: at(60) },
    ],
  });
}
