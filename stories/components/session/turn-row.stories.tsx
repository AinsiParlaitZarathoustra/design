import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import rehypeHighlight from "rehype-highlight";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import type { BodyLoad, TurnView } from "../../../src/components/session/session-view.ts";
import { TurnRow } from "../../../src/components/session/turn-row.tsx";
import type { TurnRowProps } from "../../../src/components/session/turn-row.tsx";
import { Button } from "../../../src/ui/button.tsx";
import {
  longAnswerTurn,
  at,
  attachmentsTurn,
  cancelledSession,
  erroredSession,
  longSession,
  manyToolCallsSession,
  planSession,
  streamingSession,
  truncatedBodiesTurn,
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

/** A long answer clamped to 340px behind "Show more"; the short one after it shows whole. */
export const ClampedResponse: Story = {
  args: { turn: longAnswerTurn(), clampResponses: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const more = await canvas.findByRole("button", { name: "Show more" });
    await expect(
      canvasElement.querySelectorAll('[data-slot="response-clamp"] button'),
    ).toHaveLength(1);
    await userEvent.click(more);
    await expect(canvas.getByRole("button", { name: "Show less" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
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

/** A footer under each checkpoint: web's "X commented on this" line, under the commit it is about. */
export const CheckpointFooter: Story = {
  args: {
    turn: webShapedSession().turns[0]!,
    renderCheckpointFooter: (checkpoint) =>
      checkpoint.id === "e6" ? (
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="text-secondary-foreground">Adib</span> commented on this
        </p>
      ) : null,
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText(/commented on this/)).toBeInTheDocument();
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

const REST =
  " the `byPinned` comparator ran after the date sort, so a pinned session from last week sank below today's. Second, the jump menu kept its own copy of the order. Both now read one `sortSessions`, and a test pins the order.";

/** The app's side of "Read the rest": a fetch that takes a moment, then fails or fills the body in. */
function ReadTheRestHost({ fail, ...args }: TurnRowProps & { fail?: boolean }) {
  const [load, setLoad] = useState<Record<string, BodyLoad | "done">>({});
  const base = truncatedBodiesTurn();
  const state = (id: string) => load[id];
  const shown: TurnView = {
    ...base,
    user: base.user && {
      ...base.user,
      text: state(base.user.id) === "done" ? base.user.text.replace(" …", REST) : base.user.text,
      truncated: state(base.user.id) !== "done",
      load: state(base.user.id) === "done" ? undefined : (state(base.user.id) as BodyLoad),
    },
    items: base.items.map((item) =>
      item.kind === "text"
        ? {
            ...item,
            text: state(item.id) === "done" ? item.text.replace(" …", REST) : item.text,
            truncated: state(item.id) !== "done",
            load: state(item.id) === "done" ? undefined : (state(item.id) as BodyLoad),
          }
        : item,
    ),
  };
  return (
    <TurnRow
      {...args}
      turn={shown}
      onLoadBody={(id) => {
        setLoad((l) => ({ ...l, [id]: "loading" }));
        setTimeout(() => setLoad((l) => ({ ...l, [id]: fail ? "failed" : "done" })), 600);
      }}
    />
  );
}

/** A truncated prompt and answer (web's previews): "Read the rest" asks the app, which fills the body in. */
export const ReadTheRest: Story = {
  args: { turn: truncatedBodiesTurn() },
  render: (args) => <ReadTheRestHost {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [, answer] = canvas.getAllByRole("button", { name: /^Read the rest/ });
    await expect(answer!.textContent).toBe("Read the rest · 12.6 KB");
    await userEvent.click(answer!);
    await waitFor(() =>
      expect(canvas.getAllByRole("button", { name: /^Read the rest/ })).toHaveLength(1),
    );
    await waitFor(() => expect(canvasElement.textContent).toContain("a test pins the order"));
  },
};

/** The fetch failed: the same button retries. */
export const ReadTheRestFailed: Story = {
  args: { turn: truncatedBodiesTurn() },
  render: (args) => <ReadTheRestHost {...args} fail />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByRole("button", { name: /^Read the rest/ })[0]!);
    await waitFor(() =>
      expect(canvas.getByRole("button", { name: "Couldn't load the rest, retry" })).toBeTruthy(),
    );
  },
};

/** Both bodies mid-fetch and failed, as static states. */
export const ReadTheRestStates: Story = {
  args: {
    turn: truncatedBodiesTurn({ user: "loading", answer: "failed" }),
    onLoadBody: fn(),
  },
};

function ControlledRun(args: TurnRowProps) {
  const [runs, setRuns] = useState<ReadonlySet<string>>(() => new Set(["many:6"]));
  return <TurnRow {...args} openToolRunIds={runs} onOpenToolRunIdsChange={setRuns} />;
}

/** The host holds a folded run open by a call it contains, without taking over the cards. */
export const ControlledToolRun: Story = {
  args: { turn: manyToolCallsSession(12).turns[0]! },
  render: (args) => <ControlledRun {...args} />,
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('[data-slot="tool-call-card"]')).toHaveLength(12);
    const head = canvasElement.querySelector<HTMLButtonElement>("button[aria-expanded]")!;
    await expect(head.getAttribute("aria-expanded")).toBe("true");
    await userEvent.click(head);
    await expect(canvasElement.querySelectorAll('[data-slot="tool-call-card"]')).toHaveLength(0);
  },
};
