import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "../../../src/components/ui/skeleton.tsx";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  args: { className: "h-3 w-48" },
  parameters: {
    docs: {
      description: {
        component:
          "A loading placeholder. Pulses opacity only; a moving shimmer repaints the whole list every frame.",
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** A session row while it loads: the shapes of the real row, not a grey block. */
export const Loading: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="flex items-center gap-2 px-2 py-1.5">
          <Skeleton className="size-3.5 rounded-full" />
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 w-10" />
        </div>
      ))}
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2 rounded-md border border-border p-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-3 w-full" />
    </div>
  ),
};
