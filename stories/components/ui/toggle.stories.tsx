import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, WrapText } from "lucide-react";
import { Toggle } from "../../../src/components/ui/toggle.tsx";

const SIZES = ["sm", "default", "lg"] as const;

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  args: { children: "Wrap lines", variant: "default", size: "default", disabled: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    size: { control: "inline-radio", options: SIZES },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A two-state button. Pressed reads as `element-selected`, the same fill a pressed `Button` uses.",
      },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Pressed: Story = { args: { defaultPressed: true } };
export const Outline: Story = { args: { variant: "outline" } };
export const Disabled: Story = { args: { disabled: true } };

export const WithIcon: Story = {
  render: (args) => (
    <Toggle {...args} defaultPressed>
      <WrapText />
      Wrap lines
    </Toggle>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      {SIZES.map((size) => (
        <Toggle key={size} {...args} size={size} variant="outline" aria-label="Bold">
          <Bold />
        </Toggle>
      ))}
      <Toggle {...args} variant="outline" aria-label="Italic" defaultPressed>
        <Italic />
      </Toggle>
    </div>
  ),
};

export const LongText: Story = {
  args: { children: "Show every tool call the agent made, including the hidden ones" },
};
