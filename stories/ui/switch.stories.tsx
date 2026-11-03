import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { Switch, type SwitchProps } from "../../src/ui/switch.tsx";

function Stateful(props: SwitchProps) {
  const [checked, setChecked] = useState(props.checked);
  const [mixed, setMixed] = useState(props.mixed);
  return (
    <Switch
      {...props}
      checked={checked}
      mixed={mixed}
      onCheckedChange={(next) => {
        setMixed(false);
        setChecked(next);
        props.onCheckedChange(next);
      }}
    />
  );
}

const meta = {
  title: "Primitives/Switch",
  component: Switch,
  args: {
    checked: false,
    mixed: false,
    disabled: false,
    size: "md",
    onCheckedChange: fn(),
    "aria-label": "Share telemetry",
  },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
  render: (args) => <Stateful key={`${args.checked}-${args.mixed}`} {...args} />,
  parameters: {
    docs: {
      description: {
        component:
          "On/off. Off is the input fill, on is the primary ink — no green, because on is a state, not a success. `mixed` is a setting that differs across a selection.",
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { checked: true } };
export const Mixed: Story = { args: { mixed: true } };
export const Small: Story = { args: { size: "sm", checked: true } };
export const Disabled: Story = { args: { disabled: true, checked: true } };

/** The settings row it is built for. */
export const InASettingsRow: Story = {
  args: { checked: true },
  render: (args) => (
    <div className="flex w-96 items-center justify-between gap-4 rounded-md border border-border p-3">
      <div className="flex flex-col gap-0.5">
        <span className="label">Share telemetry</span>
        <span className="caption">Coarse usage counts. Never prompts, paths or code.</span>
      </div>
      <Stateful {...args} />
    </div>
  ),
};
