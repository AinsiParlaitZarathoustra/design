import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { CommsConversationRow } from "../../../src/components/comms/comms-conversation-row.tsx";
import { conversationRows } from "./fixtures.ts";

const rows = conversationRows();
const row = (id: string) => rows.find((r) => r.id === id)!;

const meta = {
  title: "Blocks/Comms/ConversationRow",
  component: CommsConversationRow,
  args: { conversation: row("c-general"), onSelect: fn() },
  argTypes: {
    conversation: { control: "object" },
    icon: { control: false },
    trailing: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="w-64 bg-background py-1">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "One conversation in the team-chat list: a fixed icon slot (`#`, a lock, a face with presence, a group glyph), the title, and a keycap count. A mention outranks an unread count and caps at 9+; unread caps at 99+.",
      },
    },
  },
} satisfies Meta<typeof CommsConversationRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Channel: Story = {};

export const PrivateChannel: Story = {
  args: { conversation: { ...row("c-incidents"), unread: 0, mentions: 0 } },
};

export const Selected: Story = { args: { selected: true } };

export const Unread: Story = { args: { conversation: row("c-design") } };

export const Mentions: Story = { args: { conversation: row("g-review") } };

export const ManyUnread: Story = {
  args: { conversation: { ...row("c-incidents"), mentions: 0 } },
};

export const DirectMessageOnline: Story = { args: { conversation: row("d-lin") } };

export const DirectMessageOffline: Story = { args: { conversation: row("d-kofi") } };

export const Group: Story = {
  args: {
    conversation: row("g-named"),
    trailing: <span className="shrink-0 text-xs text-muted-foreground tabular-nums">4</span>,
  },
};

export const Archived: Story = { args: { conversation: row("c-old") } };

export const LongName: Story = { args: { conversation: row("c-long") } };

function ListDemo() {
  const [selected, setSelected] = useState("c-design");
  return (
    <div>
      {rows.map((r) => (
        <CommsConversationRow
          key={r.id}
          conversation={r}
          selected={r.id === selected}
          onSelect={setSelected}
        />
      ))}
    </div>
  );
}

export const List: Story = { render: () => <ListDemo /> };

export const DisabledRow: Story = {
  args: { disabled: true, conversation: row("c-design") },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toBeDisabled();
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onSelect).not.toHaveBeenCalled();
  },
};
