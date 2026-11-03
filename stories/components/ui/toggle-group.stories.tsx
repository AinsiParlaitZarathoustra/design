import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../../../src/components/ui/toggle-group.tsx";

interface DemoProps {
  variant?: "default" | "outline";
  size?: "sm" | "default" | "lg";
  spacing?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
}

function Demo({
  variant = "default",
  size = "default",
  spacing = 2,
  disabled,
  orientation,
}: DemoProps) {
  return (
    <ToggleGroup
      variant={variant}
      size={size}
      spacing={spacing}
      orientation={orientation}
      disabled={disabled}
      defaultValue={["left"]}
      aria-label="Alignment"
    >
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align centre">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

const meta = {
  title: "Components/ToggleGroup",
  component: Demo,
  args: { variant: "default", size: "default", spacing: 2, disabled: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
    spacing: { control: "inline-radio", options: [0, 2] },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A set of `Toggle`s that share a value. Single choice by default; `multiple` lets several be on. `spacing={0}` joins outline items into one segmented strip.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Outline: Story = { args: { variant: "outline" } };
export const Joined: Story = { args: { variant: "outline", spacing: 0 } };
export const Vertical: Story = { args: { orientation: "vertical" } };
export const Disabled: Story = { args: { disabled: true } };

export const Multiple: Story = {
  render: () => (
    <ToggleGroup multiple variant="outline" defaultValue={["bold", "italic"]} aria-label="Format">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ToggleGroup variant="outline" spacing={0} defaultValue={["7d"]} aria-label="Range">
      {["1d", "7d", "30d", "90d", "All time"].map((r) => (
        <ToggleGroupItem key={r} value={r}>
          {r}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  ),
};
