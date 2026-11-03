import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ColorHueSlider, ColorSaturationValuePlane } from "../../src/ui/color-picker.tsx";
import { hsvToHex, type HsvColor } from "../../src/theme/color.ts";

function Picker({ initial }: { initial: HsvColor }) {
  const [hsv, setHsv] = useState(initial);
  const hex = hsvToHex(hsv);
  return (
    <div className="flex w-64 flex-col gap-3">
      <ColorSaturationValuePlane label="Saturation and brightness" value={hsv} onChange={setHsv} />
      <ColorHueSlider label="Hue" value={hsv.h} onChange={(h) => setHsv({ ...hsv, h })} />
      <div className="flex items-center gap-2">
        <span
          className="size-control-sm rounded border border-border"
          style={{ background: hex }}
          aria-hidden
        />
        <code className="code">{hex}</code>
      </div>
    </div>
  );
}

const meta = {
  title: "Primitives/ColorPicker",
  component: ColorSaturationValuePlane,
  args: {
    label: "Saturation and brightness",
    value: { h: 210, s: 0.6, v: 0.9 },
    onChange: () => {},
  },
  render: (args) => <Picker initial={args.value} />,
  parameters: {
    docs: {
      description: {
        component:
          "The two controls a colour picker is made of: a saturation/brightness plane and a hue slider, both HSV, both draggable and keyboard-operable. They draw literal colour whatever the theme.",
      },
    },
  },
} satisfies Meta<typeof ColorSaturationValuePlane>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Red: Story = { args: { value: { h: 0, s: 0.8, v: 0.9 } } };
export const Black: Story = { args: { value: { h: 0, s: 0, v: 0 } } };

export const HueSliderAlone: Story = {
  render: () => {
    const [hue, setHue] = useState(120);
    return (
      <div className="w-64">
        <ColorHueSlider label="Hue" value={hue} onChange={setHue} />
      </div>
    );
  },
};
