import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "../../../src/components/ui/progress.tsx";

interface DemoProps {
  value: number | null;
  label?: string;
}

function Demo({ value, label = "Indexing project" }: DemoProps) {
  return (
    <Progress value={value} className="w-72">
      <ProgressLabel>{label}</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}

const meta = {
  title: "Components/Progress",
  component: Demo,
  args: { value: 42, label: "Indexing project" },
  argTypes: { value: { control: { type: "range", min: 0, max: 100 } } },
  parameters: {
    docs: {
      description: {
        component:
          "A determinate bar: a 4px track in `muted` with the `primary` ink filling it. `ProgressLabel` and `ProgressValue` sit above it; the track and indicator are exported for a bar with no text.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Complete: Story = { args: { value: 100, label: "Indexed" } };
/** `value={null}`: Base UI's indeterminate state. */
export const Loading: Story = { args: { value: null, label: "Waiting for the agent" } };
export const LongText: Story = {
  args: { value: 64, label: "Indexing atlas-desktop, design, server and every attached project" },
};

/** The parts alone: a bare track, as a session row's budget meter. */
export const BareTrack: Story = {
  render: () => (
    <Progress value={72} aria-label="Budget" className="w-48">
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  ),
};

export const ManyItems: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      {[
        ["Tokens", 82],
        ["Sessions", 48],
        ["Storage", 12],
        ["Seats", 100],
      ].map(([label, value]) => (
        <Progress key={label} value={value as number}>
          <ProgressLabel>{label}</ProgressLabel>
          <ProgressValue />
        </Progress>
      ))}
    </div>
  ),
};
