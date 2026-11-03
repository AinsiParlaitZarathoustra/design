import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { ScrollFade, useScrollEdges } from "../../src/ui/scroll-fade.tsx";

function FadedList({ rows }: { rows: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const edges = useScrollEdges(ref, [rows]);
  return (
    <div className="relative w-72 overflow-hidden rounded-md border border-border bg-card">
      <div ref={ref} className="h-56 overflow-auto">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="label border-b border-border-subtle px-3 py-1.5">
            Row {i + 1}
          </div>
        ))}
      </div>
      <ScrollFade at="top" visible={edges.top} className="from-card" />
      <ScrollFade at="bottom" visible={edges.bottom} className="from-card" />
    </div>
  );
}

const meta = {
  title: "Primitives/ScrollFade",
  component: ScrollFade,
  args: { at: "bottom", visible: true },
  parameters: {
    docs: {
      description: {
        component:
          "Edge fades for a scroll container. A fade shows only while there is more to scroll; the caller supplies the gradient colour (`from-card`), because only it knows what paints behind the list.",
      },
    },
  },
} satisfies Meta<typeof ScrollFade>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Scroll the list: the top fade appears once the first row has gone. */
export const Default: Story = { render: () => <FadedList rows={30} /> };

/** Nothing to scroll, so no fade dims the last row. */
export const ShortList: Story = { render: () => <FadedList rows={4} /> };
