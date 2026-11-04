import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { userEvent, within } from "storybook/test";
import {
  type CommandAction,
  CommandMenu,
  useCommandMenu,
} from "../../../src/components/shell/command-menu.tsx";
import { Button } from "../../../src/ui/button.tsx";
import { Kbd } from "../../../src/ui/kbd.tsx";
import { ACTIONS, MANY_ACTIONS, StoryLinks } from "./fixtures.tsx";

interface DemoProps {
  actions: CommandAction[];
  defaultOpen?: boolean;
  placeholder?: string;
}

/** `useCommandMenu` binds ⌘K; the button opens it too. */
function Demo({ actions, defaultOpen = false, placeholder }: DemoProps) {
  const { open, setOpen } = useCommandMenu();
  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen, setOpen]);
  return (
    <StoryLinks>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Jump to anything
        <Kbd>⌘K</Kbd>
      </Button>
      <CommandMenu open={open} onOpenChange={setOpen} actions={actions} placeholder={placeholder} />
    </StoryLinks>
  );
}

const type =
  (text: string): Story["play"] =>
  async () => {
    const input = await within(document.body).findByRole("combobox");
    await userEvent.type(input, text);
  };

const meta = {
  title: "Shell/CommandMenu",
  component: Demo,
  args: { actions: ACTIONS, defaultOpen: false },
  argTypes: { actions: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "⌘K: actions grouped and filtered by label, on the `Command` primitives. The field keeps focus; ↑/↓ move the highlight, Enter runs it. An action with `to` navigates through `LinkProvider`. `useCommandMenu()` binds ⌘K and returns the open state.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true }, tags: ["!autodocs"] };
export const Filtered: Story = {
  args: { defaultOpen: true },
  play: type("se"),
  tags: ["!autodocs"],
};
export const Empty: Story = {
  // A component finding, left for its owner. axe aria-required-children: with no matches the
  // listbox holds only the empty message, no option.
  parameters: { a11y: { test: "todo" } },
  args: { defaultOpen: true },
  play: type("kubernetes"),
  tags: ["!autodocs"],
};
export const ManyItems: Story = {
  args: { defaultOpen: true, actions: MANY_ACTIONS },
  tags: ["!autodocs"],
};
export const LongText: Story = {
  args: {
    defaultOpen: true,
    placeholder: "Search sessions, projects, people, pull requests, memory and settings…",
    actions: [
      {
        id: "long",
        label:
          "Approve every pending tool call in this session and continue the run without asking again",
        group: "Actions",
        shortcut: "⌘⇧↵",
      },
      ...ACTIONS,
    ],
  },
  tags: ["!autodocs"],
};
