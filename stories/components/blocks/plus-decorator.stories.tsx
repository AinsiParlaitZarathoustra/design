import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusCorners, PlusDecorator } from "../../../src/components/blocks/plus-decorator.tsx";

const meta = {
  title: "Blocks/PlusDecorator",
  component: PlusDecorator,
  args: { corner: "tl" },
  argTypes: { corner: { control: "inline-radio", options: ["tl", "tr", "bl", "br"] } },
  render: (args) => (
    <div className="relative flex h-40 w-72 items-center justify-center border border-border">
      <PlusDecorator {...args} />
      <span className="caption">corner: {args.corner}</span>
    </div>
  ),
  decorators: [(Story) => <div className="p-6">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component:
          "A corner cross-hair, nudged half a pixel so the crossing sits on the border; it makes a bordered panel read as a drawing rather than a card. `PlusCorners` places all four. The parent must be `relative`.",
      },
    },
  },
} satisfies Meta<typeof PlusDecorator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllCorners: Story = {
  render: () => (
    <div className="relative flex h-40 w-72 flex-col items-center justify-center gap-1 border border-border">
      <PlusCorners />
      <span className="eyebrow">Checkpoint 3</span>
      <span className="label">12 files changed</span>
    </div>
  ),
};
