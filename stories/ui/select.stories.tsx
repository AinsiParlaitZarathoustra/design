import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cpu } from "lucide-react";
import { useState } from "react";
import { fn, userEvent, within } from "storybook/test";
import { Icon } from "../../src/ui/icon.tsx";
import { Select, type SelectProps } from "../../src/ui/select.tsx";

const MODELS = [
  { value: "fast", label: "Fast", description: "Quick edits and questions" },
  { value: "balanced", label: "Balanced", description: "The default for most work" },
  { value: "deep", label: "Deep", description: "Long refactors and planning" },
] as const;

function Stateful(props: SelectProps<string>) {
  const [value, setValue] = useState(props.value);
  return (
    <div className="min-h-56">
      <Select
        {...props}
        value={value}
        onValueChange={(next) => {
          setValue(next);
          props.onValueChange(next);
        }}
      />
    </div>
  );
}

const open: Story["play"] = async ({ canvasElement }) => {
  await userEvent.click(within(canvasElement).getByRole("combobox"));
};

const meta = {
  title: "Primitives/Select",
  component: Select,
  args: {
    value: "balanced",
    options: MODELS,
    onValueChange: fn(),
    size: "md",
    variant: "bordered",
    shape: "default",
    indicator: true,
    disabled: false,
    "aria-label": "Model",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    variant: { control: "inline-radio", options: ["bordered", "ghost"] },
    shape: { control: "inline-radio", options: ["default", "pill"] },
    options: { control: false },
  },
  render: (args) => <Stateful {...args} />,
  parameters: {
    docs: {
      description: {
        component:
          "One choice from a list, in a menu-styled popup. `bordered` is a form field; `ghost` sits in a toolbar or settings row. Options are data, not children.",
      },
    },
  },
} satisfies Meta<SelectProps<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { play: open, tags: ["!autodocs"] };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Pill: Story = { args: { shape: "pill" } };
export const Small: Story = { args: { size: "sm" } };
export const Disabled: Story = { args: { disabled: true } };
export const Placeholder: Story = { args: { placeholder: "Mixed" } };
export const WithIcon: Story = { args: { leading: <Icon icon={Cpu} size="sm" /> } };
export const NoIndicator: Story = { args: { indicator: false }, play: open, tags: ["!autodocs"] };
export const LongText: Story = {
  args: {
    value: "a",
    className: "max-w-48",
    options: [
      { value: "a", label: "A model name long enough to truncate in the trigger" },
      { value: "b", label: "Short" },
    ],
  },
};
