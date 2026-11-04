import type { Meta, StoryObj } from "@storybook/react-vite";
import { GhostCards } from "../../../src/components/blocks/ghost-cards.tsx";

function SessionCard({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4">
      <span className="label">{title}</span>
      <span className="caption">{meta}</span>
      <div className="mt-3 flex flex-col gap-1.5">
        <div className="h-2 w-3/4 rounded-full bg-muted" />
        <div className="h-2 w-1/2 rounded-full bg-muted" />
      </div>
    </div>
  );
}

const meta = {
  title: "Blocks/GhostCards",
  component: GhostCards,
  args: {
    children: <SessionCard title="Refactor the settings panel" meta="atlas · Maya Chen · 2h ago" />,
  },
  argTypes: { children: { control: false } },
  decorators: [(Story) => <div className="w-96 p-6">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component:
          "Stacked paper: two ghost sheets peek out behind the card, drawn with pseudo-elements so they cost no DOM, and fade out at the bottom so the stack reads as depth. The wrapper must not clip.",
      },
    },
  },
} satisfies Meta<typeof GhostCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const LongText: Story = {
  args: {
    children: (
      <SessionCard
        title="Rewrite the session sidebar so pinned, unread and snoozed sessions sort into one flat list with a project filter"
        meta="atlas-desktop · Maximiliana Wolfeschlegelsteinhausenberger · 2h ago"
      />
    ),
  },
};
