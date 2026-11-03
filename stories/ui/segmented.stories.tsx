import type { Meta, StoryObj } from "@storybook/react-vite";
import { Columns2, Rows2 } from "lucide-react";
import { useState } from "react";
import { fn } from "storybook/test";
import { Icon } from "../../src/ui/icon.tsx";
import { Segmented, type SegmentedProps } from "../../src/ui/segmented.tsx";

const MODES = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

function Stateful(props: SegmentedProps<string>) {
  const [value, setValue] = useState(props.value);
  return (
    <Segmented
      {...props}
      value={value}
      onValueChange={(next) => {
        setValue(next);
        props.onValueChange(next);
      }}
    />
  );
}

const meta = {
  title: "Primitives/Segmented",
  component: Segmented,
  args: {
    value: "dark",
    options: MODES,
    onValueChange: fn(),
    disabled: false,
    size: "md",
    "aria-label": "Appearance",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    options: { control: false },
  },
  render: (args) => <Stateful {...args} />,
  parameters: {
    docs: {
      description: {
        component:
          "One choice among a few, all visible. The thumb slides on a spring and is the selected-element fill, never the primary.",
      },
    },
  },
} satisfies Meta<SegmentedProps<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const Disabled: Story = { args: { disabled: true } };

export const WithIcon: Story = {
  args: {
    value: "split",
    "aria-label": "Diff layout",
    options: [
      { value: "split", label: "Split", icon: <Icon icon={Columns2} size="sm" /> },
      { value: "unified", label: "Unified", icon: <Icon icon={Rows2} size="sm" /> },
    ],
  },
};

export const IconOnly: Story = {
  args: {
    value: "split",
    "aria-label": "Diff layout",
    options: [
      { value: "split", label: "Split", icon: <Icon icon={Columns2} size="sm" />, iconOnly: true },
      { value: "unified", label: "Unified", icon: <Icon icon={Rows2} size="sm" />, iconOnly: true },
    ],
  },
};

export const LongText: Story = {
  args: {
    value: "a",
    "aria-label": "Scope",
    options: [
      { value: "a", label: "Only this session" },
      { value: "b", label: "Every session in this project" },
      { value: "c", label: "Everywhere" },
    ],
  },
};
