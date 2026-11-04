import type { Meta, StoryObj } from "@storybook/react-vite";
import { GoChevron } from "../../../src/components/ui/go-chevron.tsx";

interface DemoProps {
  label?: string;
}

/** The chevron reacts to whichever ancestor carries `group/go`; here, the row. */
function Row({ label = "Open session" }: DemoProps) {
  return (
    <a
      href="#go"
      className="group/go flex w-72 items-center justify-between gap-2 rounded-md border border-border px-3 py-2 transition-colors duration-fast ease-out-strong hover:bg-element-hover"
    >
      <span className="label truncate">{label}</span>
      <GoChevron className="text-muted-foreground" />
    </a>
  );
}

const meta = {
  title: "Components/GoChevron",
  component: Row,
  args: { label: "Open session" },
  parameters: {
    docs: {
      description: {
        component:
          'A chevron that says "this opens something". Hover the row that carries `group/go` and it opens into an arrow. Hover-only; focus and touch show it at rest.',
      },
    },
  },
} satisfies Meta<typeof Row>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bare: Story = { render: () => <GoChevron /> };

export const LongText: Story = {
  args: { label: "Refactor the settings panel so every row reads from one store selector" },
};

export const ManyItems: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      {["Sessions", "Projects", "Members", "Usage", "Billing"].map((label) => (
        <Row key={label} label={label} />
      ))}
    </div>
  ),
};
