import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import { expect, waitFor } from "storybook/test";

import { SessionTimeline } from "../../../src/components/session/session-timeline.tsx";
import type { SessionView } from "../../../src/components/session/session-view.ts";
import { ModelMark } from "../../../src/components/ui/model-badge.tsx";
import { Button } from "../../../src/ui/button.tsx";
import {
  cancelledSession,
  erroredSession,
  hugeOutputCalls,
  hugeTurnsSession,
  longSession,
  manyToolCallsSession,
  streamingSession,
  streamingSource,
  toolCall,
  truncatedBodiesTurn,
  webShapedSession,
} from "./fixtures.ts";

const REHYPE = [rehypeHighlight];

/** A bounded scroller, so the window has a scroll root to grow against. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="region"
      aria-label="Session"
      tabIndex={0}
      className="h-160 max-w-3xl overflow-auto pr-2"
    >
      {children}
    </div>
  );
}

const meta = {
  title: "Session/SessionTimeline",
  component: SessionTimeline,
  args: { session: longSession(), rehypePlugins: REHYPE },
  argTypes: {
    session: { control: false },
    rehypePlugins: { control: false },
    renderMarkdown: { control: false },
    renderDiff: { control: false },
    commentSlot: { control: false },
    errorAction: { control: false },
    agentMark: { control: false },
    grow: { control: "inline-radio", options: ["down", "up"] },
  },
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "A whole session: a head that says where it stands, then each turn on a hairline rail with a node per turn. Long sessions are windowed (real DOM rows, grown near the edge), never virtualised.",
      },
    },
  },
} satisfies Meta<typeof SessionTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Long: Story = {};

/** Appends to the streaming answer every 30ms and starts over at the end. */
function Streamer() {
  const [length, setLength] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLength((n) => (n >= streamingSource.length ? 0 : n + 12)), 30);
    return () => clearInterval(id);
  }, []);
  const base = streamingSession();
  const last = base.turns.at(-1)!;
  const session: SessionView = {
    ...base,
    turns: [
      ...base.turns.slice(0, -1),
      {
        ...last,
        items: last.items.map((item) =>
          item.kind === "text" && item.id === base.streaming?.itemId
            ? { ...item, text: streamingSource.slice(0, length) }
            : item,
        ),
      },
    ],
  };
  return <SessionTimeline session={session} rehypePlugins={REHYPE} />;
}

export const Streaming: Story = { render: () => <Streamer /> };

export const Errored: Story = {
  args: {
    session: erroredSession(),
    errorAction: (
      <Button size="sm" variant="destructive-outline">
        Sign in
      </Button>
    ),
  },
};

export const Disconnected: Story = {
  args: {
    session: {
      ...longSession(2),
      phase: "failed",
      error: {
        kind: "disconnected",
        message: "The agent disconnected. Send a message to restart it.",
      },
    },
  },
};

export const Cancelled: Story = { args: { session: cancelledSession() } };

export const ManyToolCalls: Story = { args: { session: manyToolCallsSession() } };

function hugeSession(): SessionView {
  const base = hugeTurnsSession(2_000);
  const last = base.turns.at(-1)!;
  return {
    ...base,
    turns: [
      ...base.turns.slice(0, -1),
      {
        ...last,
        items: [
          ...last.items,
          ...hugeOutputCalls().map((call) => ({ kind: "tool" as const, call })),
        ],
      },
    ],
  };
}

export const HugeOutput: Story = {
  args: { session: hugeSession() },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('[data-slot="turn-row"]').length).toBeLessThan(200);
  },
};

export const LiveFromTheBottom: Story = { args: { session: hugeTurnsSession(400), grow: "up" } };

export const WebShaped: Story = { args: { session: webShapedSession() } };

/** The host draws its own title above (web's masthead), so the timeline starts at the first turn. */
export const WithoutHeading: Story = {
  args: { session: webShapedSession(), heading: false },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.textContent).not.toContain("Session complete");
  },
};

/** Two prompted turns, then one the agent started on its own (a scheduled follow-up). */
function agentStartedSession(): SessionView {
  const base = longSession(3);
  const [, , last] = base.turns;
  return { ...base, turns: [...base.turns.slice(0, 2), { ...last!, user: undefined }] };
}

/** The agent's own mark on the node of the turn it started, in place of the sparkle. */
export const AgentMark: Story = {
  args: {
    session: agentStartedSession(),
    agentMark: <ModelMark family="claude" className="size-4" />,
  },
  play: async ({ canvasElement }) => {
    // The prompted turns keep the person glyph, so the glyph classes are there to find.
    await expect(canvasElement.querySelectorAll("svg.lucide-user")).toHaveLength(2);
    await expect(canvasElement.querySelectorAll("svg.lucide-sparkles")).toHaveLength(0);
  },
};

export const Phone: Story = {
  globals: { viewport: { value: "phone" } },
};

/** 400 turns; turn 300 holds a folded run of eight calls. */
function deepLinkSession(): SessionView {
  const base = hugeTurnsSession(400);
  return {
    ...base,
    turns: base.turns.map((t, i) =>
      i === 300
        ? {
            ...t,
            items: Array.from({ length: 8 }, (_, n) => ({
              kind: "tool" as const,
              call: toolCall({ id: `deep:${n}`, kind: "read", title: `Read file-${n}.ts` }),
            })),
          }
        : t,
    ),
  };
}

/**
 * A comment link to a call in a folded run, far past the window: the host
 * holds the run and the card open, and the turn is drawn so it can scroll there.
 */
export const DeepLinkToFoldedCall: Story = {
  render: (args) => {
    const [runs, setRuns] = useState<ReadonlySet<string>>(() => new Set(["deep:5"]));
    const [cards, setCards] = useState<ReadonlySet<string>>(() => new Set(["deep:5"]));
    useEffect(() => {
      document.querySelector('[data-tool-call-id="deep:5"]')?.scrollIntoView({ block: "center" });
    }, []);
    return (
      <SessionTimeline
        {...args}
        session={deepLinkSession()}
        openToolRunIds={runs}
        onOpenToolRunIdsChange={setRuns}
        openToolCallIds={cards}
        onOpenToolCallIdsChange={setCards}
      />
    );
  },
  play: async ({ canvasElement }) => {
    await waitFor(() =>
      expect(canvasElement.querySelector('[data-tool-call-id="deep:5"]')).not.toBeNull(),
    );
    const card = canvasElement.querySelector('[data-tool-call-id="deep:5"]')!;
    await expect(card.querySelector("button")!.getAttribute("aria-expanded")).toBe("true");
    await expect(canvasElement.querySelectorAll('[data-slot="turn-row"]').length).toBeGreaterThan(
      300,
    );
  },
};

/** A truncated prompt and answer, with "Read the rest" passed through the timeline. */
export const ReadTheRest: Story = {
  args: {
    session: { ...webShapedSession(), turns: [truncatedBodiesTurn()] },
    onLoadBody: () => {},
  },
};

/** The host holds only the card: closing it keeps the turn drawn under the reader. */
export const DeepLinkThenClose: Story = {
  render: (args) => {
    const [cards, setCards] = useState<ReadonlySet<string>>(() => new Set(["deep:5"]));
    return (
      <SessionTimeline
        {...args}
        session={deepLinkSession()}
        openToolCallIds={cards}
        onOpenToolCallIdsChange={setCards}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const toggle = () =>
      canvasElement.querySelector<HTMLButtonElement>('[data-tool-call-id="deep:5"] button')!;
    await waitFor(() => expect(toggle()).not.toBeNull());
    toggle().click();
    await waitFor(() => expect(toggle().getAttribute("aria-expanded")).toBe("false"));
    await expect(canvasElement.querySelectorAll('[data-slot="turn-row"]').length).toBeGreaterThan(
      300,
    );
  },
};

/** 400 turns; turn 300's answer carries a checkpoint, far past the first 80 drawn. */
function checkpointDeepSession(): SessionView {
  const base = hugeTurnsSession(400);
  return {
    ...base,
    turns: base.turns.map((t, i) =>
      i === 300
        ? {
            ...t,
            checkpoints: [
              {
                id: "deep:checkpoint",
                at: t.user?.at,
                commitSha: "7c1e9a04b2d5",
                subject: "sidebar: keep the pinned sort stable",
                branch: "uzayermasud/pinned-first",
                linkState: "linked" as const,
                insertions: 18,
                deletions: 6,
                files: ["src/features/sidebar/sort.ts"],
              },
            ],
          }
        : t,
    ),
  };
}

/** Built once: a new session each render would rebuild every turn. */
const deepCheckpoint = checkpointDeepSession();

/**
 * A comment link to a checkpoint in turn 301 of 400: `revealItemId` draws its
 * turn though only the first 80 are drawn on load, and the host scrolls there.
 */
export const RevealItem: Story = {
  render: (args) => {
    useEffect(() => {
      document.querySelector('[data-slot="checkpoint"]')?.scrollIntoView({ block: "center" });
    }, []);
    return <SessionTimeline {...args} session={deepCheckpoint} revealItemId="deep:checkpoint" />;
  },
  play: async ({ canvasElement }) => {
    await waitFor(() =>
      expect(canvasElement.querySelector('[data-slot="checkpoint"]')).not.toBeNull(),
    );
    await expect(canvasElement.textContent).toContain("sidebar: keep the pinned sort stable");
  },
};
