import type { Meta, StoryObj } from "@storybook/react-vite";
import { DeltaChip, type KpiCell, KpiStrip } from "../../../src/components/patterns/kpi-strip.tsx";

const spark = (seed: number) =>
  Array.from({ length: 28 }, (_, i) =>
    Math.round(Math.abs(Math.sin((i + seed) / 3)) * 40 + (i % 4) * 3),
  );

const CELLS: KpiCell[] = [
  { id: "tokens", label: "Tokens", value: "1.24M", delta: 0.08, spark: spark(1) },
  { id: "sessions", label: "Sessions", value: "48", delta: -0.03, spark: spark(4) },
  { id: "cost", label: "Spend", value: "$182.40", delta: 0, detail: "Estimated from list prices" },
  { id: "agents", label: "Active agents", value: "6", delta: null, spark: spark(9) },
];

const meta = {
  title: "Patterns/KpiStrip",
  component: KpiStrip,
  args: { cells: CELLS },
  argTypes: { cells: { control: "object" } },
  parameters: {
    docs: {
      description: {
        component:
          "A headline band: figures separated by hairlines inside one card, each with an eyebrow, the number, a neutral `DeltaChip` and an optional dot-matrix trend. More tokens is neither good nor bad, so the chip informs without colour.",
      },
    },
  },
} satisfies Meta<typeof KpiStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** No previous period: every chip renders nothing. */
export const NoPreviousPeriod: Story = {
  args: { cells: CELLS.map((c) => ({ ...c, delta: null })) },
};
export const Single: Story = {
  args: { cells: [CELLS[0]!] },
  decorators: [(S) => <div className="w-64">{S()}</div>],
};
export const ManyItems: Story = {
  args: {
    cells: [
      ...CELLS,
      { id: "added", label: "Lines added", value: "12,408", delta: 0.21, spark: spark(2) },
      { id: "removed", label: "Lines removed", value: "4,117", delta: 0.12, spark: spark(6) },
    ],
  },
};
export const LongText: Story = {
  args: {
    cells: [
      {
        id: "a",
        label: "Tokens across every attached project this billing period",
        value: "1,240,118,442",
        delta: 1.42,
        spark: spark(3),
      },
      ...CELLS.slice(1, 3),
    ],
  },
  decorators: [(S) => <div className="w-150">{S()}</div>],
};

export const Chips: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <DeltaChip delta={0.08} />
      <DeltaChip delta={-0.31} />
      <DeltaChip delta={0} />
      <DeltaChip delta={2.4} />
      <span className="caption">(null renders nothing:</span>
      <DeltaChip delta={null} />
      <span className="caption">)</span>
    </div>
  ),
};
