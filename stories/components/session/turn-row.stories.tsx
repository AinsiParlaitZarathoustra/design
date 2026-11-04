import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import rehypeHighlight from "rehype-highlight";
import { expect, fn, within } from "storybook/test";

import { TurnRow } from "../../../src/components/session/turn-row.tsx";
import type { TurnRowProps } from "../../../src/components/session/turn-row.tsx";
import { Button } from "../../../src/ui/button.tsx";
import {
  at,
  attachmentsTurn,
  cancelledSession,
  erroredSession,
  longSession,
  manyToolCallsSession,
  planSession,
  streamingSession,
  turn,
  webShapedSession,
} from "./fixtures.ts";

const REHYPE = [rehypeHighlight];

const meta = {
  title: "Session/TurnRow",
  component: TurnRow,
  args: { turn: longSession(3).turns[2]!, rehypePlugins: REHYPE, className: "max-w-3xl" },
  argTypes: {
    turn: { control: "object" },
    rehypePlugins: { control: false },
    renderMarkdown: { control: false },
    renderDiff: { control: false },
    commentSlot: { control: false },
    errorAction: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "One turn: the prompt as a clamped bubble, then the agent's prose, thinking, tool calls (a run longer than three folds) and plan in order, checkpoints last, and how it ended. Props only; comments come in through `commentSlot`.",
      },
    },
  },
} satisfies Meta<typeof TurnRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserAndAnswer: Story = {};

export const Streaming: Story = {
  args: {
    turn: streamingSession().turns.at(-1)!,
    streaming: streamingSession().streaming,
  },
};

export const WithAttachments: Story = { args: { turn: attachmentsTurn } };

export const LongPrompt: Story = {
  args: {
    turn: turn({
      key: "long-prompt",
      user: {
        id: "lp",
        text: Array.from(
          { length: 30 },
          (_, i) => `Line ${i + 1}: the sidebar should keep pinned sessions above unread ones.`,
        ).join("\n\n"),
        at: at(0),
      },
    }),
  },
};

export const WithThinking: Story = { args: { turn: webShapedSession().turns[0]! } };

export const WithPlan: Story = { args: { turn: planSession().turns[0]! } };

export const WithCheckpoint: Story = { args: { turn: webShapedSession().turns[0]! } };

export const Failed: Story = {
  args: {
    turn: erroredSession().turns.at(-1)!,
    errorAction: (
      <Button size="sm" variant="destructive-outline">
        Sign in
      </Button>
    ),
  },
};

export const FailedOther: Story = {
  args: {
    turn: {
      ...erroredSession().turns.at(-1)!,
      outcome: {
        kind: "failed",
        error: { kind: "fatal", message: "The agent exited with code 1." },
      },
    },
  },
};

export const Cancelled: Story = { args: { turn: cancelledSession().turns.at(-1)! } };

export const Retrying: Story = {
  args: {
    turn: { ...streamingSession().turns.at(-1)!, outcome: undefined },
    streaming: {
      activity: "waiting",
      retry: { attempt: 2, maxAttempts: 5, delayMs: 4000, lastError: "overloaded" },
      compacting: true,
    },
  },
};

export const ManyToolCalls: Story = { args: { turn: manyToolCallsSession().turns[0]! } };

/** A footer under the prompt and under each item: where an app puts reactions or a comment count. */
export const ItemFooter: Story = {
  args: {
    turn: webShapedSession().turns[0]!,
    renderItemFooter: (item) => (
      <p className="py-1 font-mono text-2xs text-disabled">
        footer · {item.kind === "tool" ? item.call.id : item.id}
      </p>
    ),
  },
};

function ControlledOpen(args: TurnRowProps) {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set(["many:6"]));
  return <TurnRow {...args} openToolCallIds={open} onOpenToolCallIdsChange={setOpen} />;
}

/** The host holds a call open (a comment jumped to it): its folded run unfolds and the card opens. */
export const ControlledOpenToolCall: Story = {
  args: { turn: manyToolCallsSession(12).turns[0]! },
  render: (args) => <ControlledOpen {...args} />,
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector('[data-tool-call-id="many:6"]');
    await expect(card).not.toBeNull();
    await expect(card!.querySelector("button")!.getAttribute("aria-expanded")).toBe("true");
    await expect(canvasElement.querySelectorAll('[data-slot="tool-call-card"]')).toHaveLength(12);
  },
};

/** An opened thought as plain text, under the app's own label. */
export const PlainThinking: Story = {
  args: {
    turn: webShapedSession().turns[0]!,
    thinkingBody: "text",
    thinkingLabel: ({ streaming }) => (streaming ? "Thinking" : "Reasoning"),
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("button", { name: /Reasoning/ })).toBeTruthy();
  },
};

/** Each prompt image and file opens through the app. */
export const OpenableAttachments: Story = {
  args: { turn: attachmentsTurn, onOpenAttachment: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Open before.svg" })).toBeTruthy();
    await expect(canvas.getByRole("button", { name: /^Open sidebar-spec\.pdf/ })).toBeTruthy();
  },
};
