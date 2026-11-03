import type { Meta, StoryObj } from "@storybook/react-vite";
import { DashedRails } from "../../../src/components/blocks/dashed-rails.tsx";

const meta = {
  title: "Blocks/DashedRails",
  component: DashedRails,
  args: { fade: false },
  argTypes: { offset: { control: "text" } },
  render: (args) => (
    <section className="relative flex h-72 flex-col items-center justify-center gap-1 border-y border-border-subtle">
      <DashedRails {...args} />
      <span className="eyebrow">Section</span>
      <span className="text-lg font-semibold">Every session, on one board</span>
      <span className="caption">The rails sit in the gutter at every width.</span>
    </section>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Dashed vertical drafting rails in a section's gutter, positioned with `clamp()` or at a fixed `offset`. Dashed, never solid. `fade` masks them out before the next section. The parent must be `relative`.",
      },
    },
  },
} satisfies Meta<typeof DashedRails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Faded: Story = { args: { fade: true } };
export const FixedOffset: Story = { args: { offset: "2rem" } };
