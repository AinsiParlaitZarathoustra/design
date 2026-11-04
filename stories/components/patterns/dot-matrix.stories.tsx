import type { Meta, StoryObj } from "@storybook/react-vite";
import { DotMatrix, SegmentMeter } from "../../../src/components/patterns/dot-matrix.tsx";
import { HUES } from "../../../src/lib/hue.ts";

const WEEKS = [
  12, 18, 9, 22, 30, 14, 4, 26, 31, 19, 24, 40, 12, 8, 33, 37, 28, 45, 20, 11, 6, 29, 41, 35, 38,
  52, 18, 9,
];

const meta = {
  title: "Patterns/DotMatrix",
  component: DotMatrix,
  args: { values: WEEKS, rows: 7, maxColumns: 60 },
  argTypes: { values: { control: "object" } },
  decorators: [(Story) => <div className="w-72">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component:
          "The usage view's chart primitives. `DotMatrix` is a sparkline as a dot matrix, one column per period with a baseline that is always lit; `null` is an undefined day and dims the baseline. `SegmentMeter` is a share as lit ticks, achromatic unless given an identity `hue`.",
      },
    },
  },
} satisfies Meta<typeof DotMatrix>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** All zeros: only the baseline shows, so a quiet period still reads as a period. */
export const Empty: Story = { args: { values: Array(28).fill(0) } };
/** `null` days (no denominator) dim the baseline; zero days keep it. */
export const WithGaps: Story = {
  args: { values: [4, 8, null, null, 6, 0, 0, 12, 9, null, 14, 18, 10, 7] },
};
export const ManyItems: Story = {
  args: { values: Array.from({ length: 120 }, (_, i) => Math.abs(Math.sin(i / 6)) * 40 + (i % 5)) },
};

export const Meter: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      {[0, 0.04, 0.38, 0.72, 1].map((v) => (
        <div key={v} className="flex flex-col gap-1">
          <span className="caption tabular-nums">{Math.round(v * 100)}%</span>
          <SegmentMeter value={v} />
        </div>
      ))}
    </div>
  ),
};

/** A hue is the identity of what is measured, never the magnitude. */
export const MeterHues: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      {HUES.map((hue, i) => (
        <div key={hue} className="flex flex-col gap-1">
          <span className="caption">{hue}</span>
          <SegmentMeter value={0.15 + i * 0.09} hue={hue} />
        </div>
      ))}
    </div>
  ),
};
