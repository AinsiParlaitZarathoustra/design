import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "../../../src/components/ui/separator.tsx";

const meta = {
  title: "Components/Separator",
  component: Separator,
  args: { orientation: "horizontal", strong: false },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  render: (args) =>
    args.orientation === "vertical" ? (
      <div className="flex h-6 items-center gap-3">
        <span className="label">Sessions</span>
        <Separator {...args} />
        <span className="label">Projects</span>
        <Separator {...args} />
        <span className="label">Members</span>
      </div>
    ) : (
      <div className="flex w-72 flex-col gap-3 rounded-md border border-border p-3">
        <span className="label">Usage this week</span>
        <Separator {...args} />
        <span className="caption">1.2M tokens across 48 sessions</span>
      </div>
    ),
  parameters: {
    docs: {
      description: {
        component:
          "A hairline. `border-subtle` by default, because it divides things that already share a surface; `strong` uses `border` where it separates two regions.",
      },
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Strong: Story = { args: { strong: true } };
export const Vertical: Story = { args: { orientation: "vertical" } };
