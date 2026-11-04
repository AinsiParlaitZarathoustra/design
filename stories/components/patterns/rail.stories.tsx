import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrainIcon, PencilIcon, TrashIcon } from "lucide-react";
import { expect } from "storybook/test";

import { Rail, RailNode } from "../../../src/components/patterns/rail.tsx";
import { Icon } from "../../../src/ui/icon.tsx";

const ROWS = [
  { icon: BrainIcon, title: "Learned: the release branch is 0.4.1", when: "2m ago" },
  { icon: PencilIcon, title: "Updated: CI runs on aarch64 only", when: "1h ago" },
  { icon: TrashIcon, title: "Forgot: the old staging URL", when: "Yesterday" },
];

function History() {
  return (
    <div data-testid="history" className="w-96">
      {ROWS.map((row, i) => (
        <Rail
          key={row.title}
          first={i === 0}
          last={i === ROWS.length - 1}
          node={
            <RailNode>
              <Icon icon={row.icon} size="md" />
            </RailNode>
          }
        >
          <div className="flex min-h-8 flex-col justify-center">
            <span className="label">{row.title}</span>
            <span className="caption">{row.when}</span>
          </div>
        </Rail>
      ))}
    </div>
  );
}

const meta = {
  title: "Patterns/Rail",
  component: History,
  parameters: {
    docs: {
      description: {
        component:
          "The session timeline's rail, for any history drawn the same way: a hairline down a 32px gutter and a `RailNode` per row. `first` and `last` stop the hairline at the end nodes' centres.",
      },
    },
  },
} satisfies Meta<typeof History>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A memory history on the rail. The hairline runs node centre to node centre. */
export const Default: Story = {
  play: async ({ canvas }) => {
    const nodes = [
      ...canvas.getByTestId("history").querySelectorAll<HTMLElement>('[data-slot="rail-node"]'),
    ];
    const lines = nodes.map((n) => n.parentElement!.querySelector<HTMLElement>("[aria-hidden]")!);
    // 16px down the row: a 32px node's centre at a 16px root. (Storybook's
    // 13px root shrinks the rem-sized node, not this px offset; the timeline
    // has drawn it this way all along.)
    const centre = (el: HTMLElement) => el.parentElement!.getBoundingClientRect().top + 16;
    await expect(Math.abs(lines[0]!.getBoundingClientRect().top - centre(nodes[0]!))).toBeLessThan(
      1,
    );
    const last = nodes.length - 1;
    await expect(
      Math.abs(lines[last]!.getBoundingClientRect().bottom - centre(nodes[last]!)),
    ).toBeLessThan(1);
  },
};
