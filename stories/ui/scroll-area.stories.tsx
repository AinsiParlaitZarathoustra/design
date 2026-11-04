import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "../../src/ui/scroll-area.tsx";

const ROWS = Array.from({ length: 30 }, (_, i) => `Session ${i + 1}: refactor the settings panel`);

const meta = {
  title: "Primitives/ScrollArea",
  component: ScrollArea,
  parameters: {
    docs: {
      description: { component: "A plain overflow container: `overflow-auto` and nothing else." },
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ScrollArea
      {...args}
      role="region"
      aria-label="Sessions"
      tabIndex={0}
      className="h-48 w-72 rounded-md border border-border"
    >
      {ROWS.map((row) => (
        <div key={row} className="label border-b border-border-subtle px-3 py-1.5">
          {row}
        </div>
      ))}
    </ScrollArea>
  ),
};

export const Empty: Story = {
  render: (args) => (
    <ScrollArea
      {...args}
      className="flex h-48 w-72 items-center justify-center rounded-md border border-border"
    >
      <span className="caption">No sessions yet</span>
    </ScrollArea>
  ),
};
