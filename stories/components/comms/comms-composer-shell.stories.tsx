import type { Meta, StoryObj } from "@storybook/react-vite";
import { BoldIcon, ItalicIcon, LinkIcon, MicIcon, PlusIcon, SmileIcon } from "lucide-react";
import { expect, fn, userEvent, within } from "storybook/test";

import { CommsComposerShell } from "../../../src/components/comms/comms-composer-shell.tsx";
import { Button } from "../../../src/ui/button.tsx";
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
    formatRow: { control: false },
    popup: { control: false },
    renderSend: { control: false },
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

/** The formatting toggles' row, ruled off under the attachments; it widens the bar. */
export const FormatRow: Story = {
  args: {
    formatRow: (
      <>
        <IconButton size="sm" icon={BoldIcon} label="Bold" />
        <IconButton size="sm" icon={ItalicIcon} label="Italic" />
        <IconButton size="sm" icon={LinkIcon} label="Link" />
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const row = canvasElement.querySelector<HTMLElement>('[data-slot="comms-composer-format"]')!;
    await expect(within(row).getAllByRole("button")).toHaveLength(3);
    await expect(row.closest(".glass-rim")).not.toBeNull();
  },
};

/** Files dragged over the bar: the primary ring and the label. */
export const DropActive: Story = {
  args: { dropActive: true },
  play: async ({ canvasElement }) => {
    const overlay = canvasElement.querySelector<HTMLElement>('[data-slot="comms-composer-drop"]')!;
    await expect(overlay).toHaveTextContent("Drop files to attach");
    await expect(getComputedStyle(overlay).pointerEvents).toBe("none");
    const bar = canvasElement.querySelector<HTMLElement>("[data-drop-active]")!;
    const ref = document.createElement("div");
    ref.className = "border border-primary";
    canvasElement.append(ref);
    const primary = getComputedStyle(ref).borderTopColor;
    ref.remove();
    await expect(getComputedStyle(bar).borderTopColor).toBe(primary);
    // The 2px ring, outside the rim (the rim's own shadow is inset).
    await expect(getComputedStyle(bar).boxShadow).toMatch(/0px 0px 0px 2px/);
  },
};

/** A draft over the length limit: the bar's edge turns red. */
export const Invalid: Story = {
  args: { invalid: true, editor: <Editor value="A very long message…" /> },
  play: async ({ canvasElement }) => {
    const bar = canvasElement.querySelector<HTMLElement>("[data-invalid]")!;
    // The rim's computed edge is the theme's error colour, not the glass edge.
    const ref = document.createElement("div");
    ref.className = "border border-error";
    canvasElement.append(ref);
    const error = getComputedStyle(ref).borderTopColor;
    ref.remove();
    await expect(getComputedStyle(bar).borderTopColor).toBe(error);
  },
};

/** A mention picker in the `popup` slot: in flow above the bar, so the editor keeps focus. */
export const WithPopup: Story = {
  args: {
    popup: (
      <div
        role="listbox"
        aria-label="Mention"
        className="absolute right-2 bottom-full left-2 z-popover mb-1 rounded-lg border border-border bg-popover p-1 shadow-lg"
      >
        {["Lin Mei", "Sam Ortiz"].map((name, i) => (
          <div
            key={name}
            role="option"
            aria-selected={i === 0}
            className="flex h-control-md items-center rounded px-2 text-xs text-foreground aria-selected:bg-element-selected"
          >
            {name}
          </div>
        ))}
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole("textbox", { name: "Message" });
    await userEvent.click(field);
    const list = canvas.getByRole("listbox", { name: "Mention" });
    await expect(list.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      field.getBoundingClientRect().top,
    );
    await expect(field).toHaveFocus();
  },
};

/** Editing, with the message being edited in the strip. */
export const EditingWithPreview: Story = {
  args: {
    editing: true,
    canSend: true,
    sendLabel: "Save edit",
    editPreview: "The keycap badge reads on light themes.",
    editor: <Editor value="The keycap badge reads on light themes now." />,
  },
  play: async ({ canvasElement }) => {
    const strip = canvasElement.querySelector('[data-slot="comms-composer-intent"]')!;
    await expect(strip).toHaveTextContent("The keycap badge reads on light themes.");
  },
};

/** `renderSend` draws Send from the shell's state; `escapeToCancel={false}` leaves Escape to the editor. */
export const RenderSend: Story = {
  args: {
    canSend: true,
    escapeToCancel: false,
    replyTo: { authorName: "Lin Mei", preview: "Ship it?" },
    editor: <Editor value="Yes." />,
    renderSend: ({ canSend, label, onSend }) => (
      <Button size="sm" disabled={!canSend} onClick={onSend}>
        {label}
      </Button>
    ),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Send" }));
    await expect(args.onSend).toHaveBeenCalledOnce();
    await userEvent.click(canvas.getByRole("textbox", { name: "Message" }));
    await userEvent.keyboard("{Escape}");
    await expect(args.onCancelReply).not.toHaveBeenCalled();
  },
};

export const CustomSendLabel: Story = {
  args: { canSend: true, sendLabel: "Save edit", editing: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Save edit" })).toBeEnabled();
  },
};
