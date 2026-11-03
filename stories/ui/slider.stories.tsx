import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { Slider, type SliderProps } from "../../src/ui/slider.tsx";

function Stateful(props: SliderProps) {
  const [value, setValue] = useState(props.value);
  return (
    <div className="flex w-72 items-center gap-3">
      <Slider
        {...props}
        value={value}
        onValueChange={(next) => {
          setValue(next);
          props.onValueChange(next);
        }}
      />
      <span className="label tnum w-8 text-right">{value}</span>
    </div>
  );
}

const meta = {
  title: "Primitives/Slider",
  component: Slider,
  args: {
    value: 40,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    onValueChange: fn(),
    onValueCommitted: fn(),
    "aria-label": "Volume",
  },
  render: (args) => <Stateful {...args} />,
  parameters: {
    docs: {
      description: {
        component:
          "One thumb over a track filled with the primary. `onValueChange` fires every step; `onValueCommitted` once, on release.",
      },
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Minimum: Story = { args: { value: 0 } };
export const Maximum: Story = { args: { value: 100 } };
export const Stepped: Story = { args: { min: 0.5, max: 2, step: 0.1, value: 1 } };
export const Disabled: Story = { args: { disabled: true } };
