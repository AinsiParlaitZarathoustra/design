import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { ScrollRail } from "../../../src/components/blocks/scroll-rail.tsx";

function Demo({ paragraphs = 18 }: { paragraphs?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="flex w-150 items-start gap-6">
      <div ref={ref} className="h-80 flex-1 overflow-y-auto rounded-lg border border-border p-4">
        <div className="flex flex-col gap-3">
          {Array.from({ length: paragraphs }, (_, i) => (
            <p key={i} className="body text-secondary-foreground">
              {i + 1}. The agent read the settings panel, moved each hand-rolled row onto
              SettingCard, and ran the typecheck after every file so a broken import surfaced next
              to the change that caused it.
            </p>
          ))}
        </div>
      </div>
      <ScrollRail container={ref} />
    </div>
  );
}

const meta = {
  title: "Blocks/ScrollRail",
  component: Demo,
  args: { paragraphs: 18 },
  parameters: {
    docs: {
      description: {
        component:
          "Reading progress as a ruler: hairline ticks fill top to bottom as a scroll container (not the window) scrolls, with a longer marker and the percentage riding the fill line. `ScrollRail` takes the container's ref.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Scrolled halfway on load. */
export const Halfway: Story = {
  play: async ({ canvasElement }) => {
    const scroller = canvasElement.querySelector<HTMLElement>(".overflow-y-auto");
    if (scroller) scroller.scrollTop = (scroller.scrollHeight - scroller.clientHeight) / 2;
  },
};
/** Nothing to scroll: the rail stays empty. */
export const Empty: Story = { args: { paragraphs: 1 } };
