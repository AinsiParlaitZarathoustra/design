import type { Meta, StoryObj } from "@storybook/react-vite";
import { MeterCard, StatCard, StatGrid } from "../../../src/components/patterns/stat-card.tsx";

const series = (seed: number) =>
  Array.from({ length: 30 }, (_, i) =>
    Math.round(Math.abs(Math.sin((i + seed) / 4)) * 30 + (i % 3) * 4),
  );

const meta = {
  title: "Patterns/StatCard",
  component: StatCard,
  args: { label: "Tokens", value: "1.24M", trend: 0.08, series: series(2) },
  argTypes: { series: { control: false } },
  // A cell has no edge of its own; `StatGrid` draws it.
  render: (args) => (
    <StatGrid className="w-56">
      <StatCard {...args} />
    </StatGrid>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "The dashboard's number cells. `StatCard` is a headline figure with a neutral trend chip and a dot-matrix of the period; `MeterCard` is one part of a whole with a segment meter; `StatGrid` holds them as one hairline-split card.",
      },
    },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithBadge: Story = { args: { label: "Spend", badge: "est.", value: "$182.40" } };
export const Empty: Story = { args: { value: "0", trend: null, series: Array(30).fill(0) } };
export const LongText: Story = {
  args: { label: "Tokens across every attached project", badge: "est.", value: "1,240,118,442" },
};

export const Grid: Story = {
  render: () => (
    <StatGrid className="w-200 grid-cols-2 md:grid-cols-4">
      <StatCard label="Tokens" value="1.24M" trend={0.08} series={series(1)} />
      <StatCard label="Sessions" value="48" trend={-0.03} series={series(5)} />
      <StatCard label="Spend" badge="est." value="$182.40" trend={0} series={series(9)} />
      <StatCard label="Agents" value="6" trend={null} series={series(3)} />
    </StatGrid>
  ),
};

export const Meters: Story = {
  // A component finding, left for its owner. axe aria-meter-name: MeterCard does not pass its
  // label to its SegmentMeter, which is a role="meter" with no accessible name.
  parameters: { a11y: { test: "todo" } },
  render: () => (
    <StatGrid className="w-200 grid-cols-2 md:grid-cols-4">
      <MeterCard label="Input" value="612K" share={0.49} hue="blue" />
      <MeterCard label="Output" value="148K" share={0.12} hue="purple" />
      <MeterCard label="Cache read" value="455K" share={0.37} hue="green" />
      <MeterCard label="Cache write" value="25K" share={0.02} hue="orange" />
    </StatGrid>
  ),
};

export const MeterNoHue: Story = {
  // A component finding, left for its owner. axe aria-meter-name: MeterCard does not pass its
  // label to its SegmentMeter, which is a role="meter" with no accessible name.
  parameters: { a11y: { test: "todo" } },
  render: () => (
    <StatGrid className="w-56">
      <MeterCard label="Context used" value="128K" share={0.64} />
    </StatGrid>
  ),
};
