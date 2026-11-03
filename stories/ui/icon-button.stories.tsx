import type { Meta, StoryObj } from "@storybook/react-vite";
import { Filter, Minus, MoreHorizontal, Plus, RefreshCw, Settings, X } from "lucide-react";
import { IconButton } from "../../src/ui/icon-button.tsx";
import { Hint } from "../../src/ui/tooltip.tsx";

const VARIANTS = ["ghost", "default", "secondary", "outline", "hairline", "destructive"] as const;
const SIZES = ["xs", "sm", "md", "lg"] as const;

const meta = {
  title: "Primitives/IconButton",
  component: IconButton,
  args: {
    icon: Settings,
    label: "Settings",
    variant: "ghost",
    size: "md",
    shape: "square",
    active: false,
    disabled: false,
  },
  argTypes: {
    icon: { control: false },
    variant: { control: "select", options: VARIANTS },
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "inline-radio", options: ["square", "round"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A square, icon-only button. `label` is required and becomes the `aria-label`; wrap it in `Hint` to show the same string.",
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      {VARIANTS.map((variant) => (
        <IconButton key={variant} {...args} variant={variant} label={variant} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      {SIZES.map((size) => (
        <IconButton key={size} {...args} size={size} label={`Size ${size}`} />
      ))}
    </div>
  ),
};

/** `active`: a setting that is on at rest, such as a filter narrowing a list. */
export const Active: Story = { args: { icon: Filter, label: "Filter", active: true } };

export const Pressed: Story = { args: { "aria-pressed": true } };

/** The stepper's shape: a pair of circles reads as one control. */
export const RoundStepper: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <IconButton {...args} icon={Minus} label="Smaller" shape="round" variant="outline" />
      <span className="label tnum w-10 text-center">100%</span>
      <IconButton {...args} icon={Plus} label="Larger" shape="round" variant="outline" />
    </div>
  ),
};

/**
 * Three disabled states. Only the last can reach its hint by keyboard,
 * because it opts into `focusableWhenDisabled`.
 */
export const Disabled: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <IconButton {...args} icon={RefreshCw} label="Refresh" disabled />
      <Hint label="Nothing to refresh yet">
        <IconButton {...args} icon={RefreshCw} label="Refresh" disabled />
      </Hint>
      <Hint label="Nothing to refresh yet">
        <IconButton {...args} icon={RefreshCw} label="Refresh" disabled focusableWhenDisabled />
      </Hint>
    </div>
  ),
};

export const WithHint: Story = {
  render: (args) => (
    <div className="flex items-center gap-1">
      <Hint label="More actions">
        <IconButton {...args} icon={MoreHorizontal} label="More actions" />
      </Hint>
      <Hint label="Close" shortcut="Esc">
        <IconButton {...args} icon={X} label="Close" />
      </Hint>
    </div>
  ),
};
