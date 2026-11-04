import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import {
  CommsDayDivider,
  CommsMessageRow,
  CommsUnreadLine,
} from "../../../src/components/comms/comms-message-row.tsx";
import type { CommsMessageRowProps } from "../../../src/components/comms/comms-message-row.tsx";
import { transcriptRows } from "../../../src/components/comms/comms-view-helpers.ts";
import type { CommsMessageView } from "../../../src/components/comms/comms-view.ts";
import { BASE, COMMS_REACTION_EMOJI, ME, calls, message, transcript } from "./fixtures.ts";

const MINUTE = 60_000;

/** A body slot: the app renders its own markdown; a paragraph stands in. */
const body = (m: CommsMessageView) => <p>{m.body}</p>;

/** An attachment slot: the app renders its own media; a box stands in. */
function AttachmentBox({ name }: { name: string }) {
  return (
    <div className="flex h-20 max-w-80 items-center justify-center rounded-lg border border-border-subtle bg-card text-xs text-muted-foreground">
      {name}
    </div>
  );
}

const handlers = {
  onReact: fn(),
  onReply: fn(),
  onEdit: fn(),
  onDelete: fn(),
  onTogglePin: fn(),
  onCopyText: fn(),
  onCopyLink: fn(),
  onJumpToReply: fn(),
  onRetry: fn(),
};

const reactions = transcript()[2]!.reactions;

const meta = {
  title: "Blocks/Comms/MessageRow",
  component: CommsMessageRow,
  args: {
    message: message(),
    head: true,
    body: <p>{message().body}</p>,
    reactionEmoji: COMMS_REACTION_EMOJI,
    can: { react: true, reply: true, edit: true, delete: true, pin: true },
    ...handlers,
  },
  argTypes: {
    message: { control: "object" },
    body: { control: false },
    attachments: { control: false },
    references: { control: false },
    avatar: { control: false },
    authorName: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl bg-background px-2 pt-6 pb-2">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "One team-chat message, linear: a head row opens a run with the avatar and author line; a continuation shows its time in the gutter on hover. Text, attachments and references are slots. The React / Reply / More toolbar mounts on hover, on focus inside the row, or while one of its menus is open. Colour and opacity only, never a transform.",
      },
    },
  },
} satisfies Meta<typeof CommsMessageRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Head: Story = {};

export const Continuation: Story = {
  render: (args) => (
    <>
      <CommsMessageRow {...args} />
      <CommsMessageRow
        {...args}
        head={false}
        message={message({ id: "m-2", seq: 2, at: BASE + MINUTE, body: "And on Dracula." })}
        body={<p>And on Dracula.</p>}
      />
    </>
  ),
};

export const Reply: Story = {
  args: { message: transcript()[5]!, body: body(transcript()[5]!) },
};

export const ReplyToDeleted: Story = {
  args: { message: transcript()[9]!, body: body(transcript()[9]!) },
};

export const ReplyMissing: Story = {
  args: { message: transcript()[15]!, body: body(transcript()[15]!) },
};

export const Reactions: Story = {
  args: { message: message({ reactions }) },
};

export const Pinned: Story = { args: { message: message({ pinned: true }) } };

export const Edited: Story = { args: { message: message({ editedAt: BASE + MINUTE }) } };

export const Sending: Story = { args: { message: message({ send: "sending" }) } };

export const Failed: Story = { args: { message: message({ send: "failed" }) } };

export const Deleted: Story = {
  args: { message: message({ deleted: true, reactions }) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Message deleted")).toBeTruthy();
    await expect(canvas.queryByText(message().body)).toBeNull();
    await userEvent.hover(canvasElement.querySelector('[data-slot="comms-message-row"]')!);
    await expect(canvas.queryByRole("button", { name: "More" })).toBeNull();
  },
};

export const Integration: Story = {
  args: { message: transcript()[11]!, body: body(transcript()[11]!) },
};

export const IntegrationVia: Story = {
  args: { message: transcript()[12]!, body: body(transcript()[12]!) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Release bot")).toBeTruthy();
    await expect(canvas.getByText("via CI")).toBeTruthy();
    await expect(canvas.getByText("App")).toBeTruthy();
  },
};

export const Editing: Story = { args: { editing: true } };

export const WithAttachments: Story = {
  args: {
    attachments: <AttachmentBox name="screenshot.png" />,
    references: <AttachmentBox name="Session reference" />,
  },
};

export const LongName: Story = {
  args: { message: transcript()[3]!, body: body(transcript()[3]!) },
};

export const ToolbarOnFocus: Story = {
  args: { message: message({ reactions }) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole("button", { name: "More" })).toBeNull();
    // The row takes no tab stop of its own; its first control does.
    await userEvent.tab();
    await waitFor(() => expect(canvas.getByRole("button", { name: "More" })).toBeTruthy());
  },
};

export const AuthorNameSlot: Story = {
  render: (args) => (
    <>
      <CommsMessageRow
        {...args}
        authorName={
          <button type="button" className="cursor-pointer font-semibold hover:underline">
            Lin Mei
          </button>
        }
      />
      {/* An integration ignores the slot: it is never a person card (ADR-0020). */}
      <CommsMessageRow
        {...args}
        message={transcript()[11]!}
        body={body(transcript()[11]!)}
        authorName={<button type="button">Not a person</button>}
      />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Lin Mei" })).toBeTruthy();
    await expect(canvas.queryByText("Not a person")).toBeNull();
  },
};

export const CustomLabels: Story = {
  args: {
    message: message({ editedAt: BASE + MINUTE, pinned: true, send: "failed", reactions }),
    labels: {
      edited: "modifié",
      failed: "échec de l’envoi",
      retry: "Réessayer",
      pinned: "Épinglé",
      more: "Plus",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("modifié")).toBeTruthy();
    await expect(canvas.getByRole("button", { name: "Réessayer" })).toBeTruthy();
  },
};

/** A call row's slot: the app draws its own call card. */
function CallBox() {
  return (
    <div className="mx-10 my-2 flex h-10 items-center rounded-lg border border-border-subtle bg-card px-3 text-xs text-muted-foreground">
      Call
    </div>
  );
}

function TranscriptDemo(args: CommsMessageRowProps) {
  const rows = transcriptRows(transcript(), { me: ME, lastReadSeq: 30, calls: calls() });
  const now = BASE + 8 * 60 * MINUTE;
  return (
    <div>
      {rows.map((row) =>
        row.kind === "day" ? (
          <CommsDayDivider key={row.key} at={row.at} now={now} />
        ) : row.kind === "unread" ? (
          <CommsUnreadLine key={row.key} />
        ) : row.kind === "call" ? (
          <CallBox key={row.key} />
        ) : (
          <CommsMessageRow
            key={row.key}
            {...args}
            message={row.message}
            head={row.head}
            body={body(row.message)}
            can={{
              react: true,
              reply: true,
              pin: true,
              edit: row.message.author.id === ME,
              delete: row.message.author.id === ME,
            }}
          />
        ),
      )}
    </div>
  );
}

export const Transcript: Story = {
  render: (args) => <TranscriptDemo {...args} />,
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('[data-slot="comms-day-divider"]')).toHaveLength(2);
    await expect(canvasElement.querySelector('[data-slot="comms-unread-line"]')).not.toBeNull();
  },
};

export const UnreadLineLabel: Story = {
  render: () => (
    <>
      <CommsUnreadLine />
      <CommsUnreadLine label="3 new messages" />
      <CommsDayDivider at={BASE} now={BASE} />
      <CommsDayDivider at={BASE - 24 * 60 * MINUTE} now={BASE} />
    </>
  ),
};
