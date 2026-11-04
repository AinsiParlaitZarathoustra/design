import type { Meta, StoryObj } from "@storybook/react-vite";
import { MicIcon, PlusIcon, SmileIcon } from "lucide-react";
import { expect, fn, userEvent, within } from "storybook/test";

import { CommsComposerShell } from "../../../src/components/comms/comms-composer-shell.tsx";
import { IconButton } from "../../../src/ui/icon-button.tsx";

/** The editor slot: desktop's Tiptap field or web's textarea; a plain textarea stands in. */
function Editor({ value = "" }: { value?: string }) {
  return (
    <textarea
      aria-label="Message"
      rows={1}
      defaultValue={value}
      placeholder="Message #design-system"
      className="block w-full resize-none bg-transparent px-[10px] py-[8px] text-base leading-[18px] text-foreground outline-none placeholder:text-disabled"
    />
  );
}

function Chip({ name }: { name: string }) {
  return (
    <span className="flex h-control-md max-w-56 items-center rounded-md border border-border bg-card px-2 text-xs text-secondary-foreground">
      {name}
    </span>
  );
}

const meta = {
  title: "Blocks/Comms/ComposerShell",
  component: CommsComposerShell,
  args: {
    editor: <Editor />,
    toolsStart: <IconButton size="lg" shape="round" icon={PlusIcon} label="Attach a file" />,
    toolsEnd: <IconButton size="lg" shape="round" icon={SmileIcon} label="Emoji" />,
    canSend: false,
    onSend: fn(),
    onCancelReply: fn(),
    onCancelEdit: fn(),
  },
  argTypes: {
    editor: { control: false },
    attachments: { control: false },
    toolsStart: { control: false },
    toolsEnd: { control: false },
    send: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md bg-background pt-10">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "The team-chat composer's frame: one glass-rimmed bar holding the app's editor, tools either side and Send, with a reply or edit strip tucked behind its top. The editor owns Enter; an unhandled Escape cancels the edit, else the reply.",
      },
    },
  },
} satisfies Meta<typeof CommsComposerShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const CanSend: Story = {
  args: { canSend: true, editor: <Editor value="Shipping the composer after lunch." /> },
};

export const Sending: Story = {
  args: { canSend: false, sending: true, sendLabel: "Waiting for uploads…" },
};

export const Replying: Story = {
  args: {
    replyTo: { authorName: "Lin Mei", preview: "Does the presence dot still read on light?" },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox", { name: "Message" }));
    await userEvent.keyboard("{Escape}");
    await expect(args.onCancelReply).toHaveBeenCalledOnce();
  },
};

export const Editing: Story = {
  args: {
    editing: true,
    canSend: true,
    sendLabel: "Save edit",
    editor: <Editor value="The keycap badge reads on light themes now." />,
  },
};

export const WithAttachments: Story = {
  args: {
    canSend: true,
    attachments: (
      <>
        <Chip name="screenshot-light.png" />
        <Chip name="badge-keycap-dark.png" />
      </>
    ),
  },
};

export const ReadOnly: Story = { args: { readOnly: "This channel is archived" } };

export const CustomSend: Story = {
  args: {
    send: <IconButton size="lg" shape="round" icon={MicIcon} label="Record a voice message" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Record a voice message" })).toBeTruthy();
    await expect(canvas.queryByRole("button", { name: "Send" })).toBeNull();
  },
};

export const CustomSendLabel: Story = {
  args: { canSend: true, sendLabel: "Save edit", editing: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Save edit" })).toBeEnabled();
  },
};
