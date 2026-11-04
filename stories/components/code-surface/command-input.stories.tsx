import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  TerminalCommandInput,
  TerminalStatus,
} from "../../../src/components/code-surface/command-input.tsx";
import type { CommandSuggestion } from "../../../src/components/code-surface/command-suggestions.tsx";
import { TerminalStopControl } from "../../../src/components/code-surface/terminal-stop-control.tsx";

const stop = (
  <TerminalStopControl
    active
    onInterrupt={fn()}
    onForceStop={async () => true}
    onForceStopped={fn()}
  />
);
const status = (
  <TerminalStatus cwd="/Users/me/atlas" branch="uzayermasud/atl-874" ahead={2} behind={1} dirty />
);

function Controlled(props: Partial<React.ComponentProps<typeof TerminalCommandInput>>) {
  const [value, setValue] = useState(props.value ?? "");
  return <TerminalCommandInput {...props} value={value} onValueChange={setValue} />;
}

const meta = {
  title: "Patterns/TerminalCommandInput",
  component: TerminalCommandInput,
  args: { value: "", onValueChange: fn() },
  render: (args) => <Controlled {...args} />,
  decorators: [
    (Story) => (
      <div className="max-w-2xl overflow-visible rounded-md border border-border pt-48">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TerminalCommandInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {};
export const Busy: Story = { args: { busy: true, stopControl: stop } };
export const RawMode: Story = { args: { busy: true, rawMode: true, stopControl: stop } };
export const WithStatus: Story = { args: { status, stopControl: stop, busy: true } };

const ITEMS: CommandSuggestion[] = [
  { name: "src", kind: "dir" },
  { name: "scripts", kind: "dir" },
  { name: "stories", kind: "dir" },
  { name: "skills.md", kind: "file" },
  { name: "sed", kind: "command" },
];
const onSelect = fn().mockName("onSelect");

function WithSuggestions() {
  const [value, setValue] = useState("cd s");
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(0);
  return (
    <TerminalCommandInput
      value={value}
      onValueChange={(v) => {
        setValue(v);
        setOpen(true);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        e.preventDefault();
        setActive((i) => (i + (e.shiftKey ? ITEMS.length - 1 : 1)) % ITEMS.length);
      }}
      status={status}
      suggestions={{
        id: "terminal-suggestions",
        open,
        items: ITEMS,
        activeIndex: active,
        onSelect: (item) => {
          onSelect(item);
          setValue(`cd ${item.name}${item.kind === "dir" ? "/" : ""}`);
          setOpen(false);
        },
        onOpenChange: setOpen,
      }}
    />
  );
}

/** `CommandSuggestions` above the field: Tab cycles, a press picks without taking focus. */
export const Suggestions: Story = {
  render: () => <WithSuggestions />,
  play: async ({ canvasElement }) => {
    onSelect.mockClear();
    const field = within(canvasElement).getByRole("combobox", { name: "Command" });
    await userEvent.click(field);
    const option = await within(document.body).findByRole("option", { name: "scripts/" });
    await userEvent.pointer({ keys: "[MouseLeft>]", target: option });
    await expect(field).toHaveFocus();
    await expect(onSelect).toHaveBeenCalledWith({ name: "scripts", kind: "dir" });
    await userEvent.pointer({ keys: "[/MouseLeft]", target: option });
  },
};

/** A narrow pane: the status gives way, the field keeps its room. */
export const NarrowStatus: Story = {
  args: { status, stopControl: stop, busy: true },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};
