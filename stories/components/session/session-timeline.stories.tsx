import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import { expect } from "storybook/test";

import { SessionTimeline } from "../../../src/components/session/session-timeline.tsx";
import type { SessionView } from "../../../src/components/session/session-view.ts";
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

export const Phone: Story = {
  globals: { viewport: { value: "phone" } },
};
