import type { Meta, StoryObj } from "@storybook/react-vite";
import { GradualBlur } from "../../../src/components/blocks/gradual-blur.tsx";

const LINES = Array.from(
  { length: 24 },
  (_, i) =>
    [
      "Read src/features/settings/components/settings-panel.tsx",
      "The panel renders its rows by hand; moving them onto SettingCard keeps one right edge.",
      "Edited settings-panel.tsx (+84 −61)",
      "Ran bun run typecheck: no errors",
    ][i % 4]!,
);

const meta = {
  title: "Blocks/GradualBlur",
  component: GradualBlur,
  args: {
    position: "bottom",
    height: "5rem",
    strength: 2,
    layers: 5,
    curve: "bezier",
    exponential: true,
  },
  argTypes: {
    position: { control: "inline-radio", options: ["top", "bottom"] },
    curve: { control: "select", options: ["linear", "bezier", "ease-in", "ease-out"] },
    layers: { control: { type: "range", min: 0, max: 8 } },
  },
  // The blur is a sibling of the scroller, not inside it, so it stays on the
  // edge while the content moves under it.
  render: (args) => (
    <div className="relative h-64 w-120 overflow-hidden rounded-lg border border-border bg-background">
      <div role="region" aria-label="Article" tabIndex={0} className="h-full overflow-y-auto">
        <div className="flex flex-col gap-2 p-4">
          {LINES.map((line, i) => (
            <p key={i} className="body">
              {line}
            </p>
          ))}
        </div>
      </div>
      <GradualBlur {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "Progressive blur for a scroll edge: stacked `backdrop-filter` layers, each masked to a band, so text dissolves rather than being curtained off. Every layer is per-frame work; `layers={0}` turns it off. The parent must be positioned.",
      },
    },
  },
} satisfies Meta<typeof GradualBlur>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bottom: Story = {};
export const Top: Story = { args: { position: "top" } };
/** A wash under the blur, so the edge dims as well as softens. */
export const Tinted: Story = { args: { tint: "var(--background)" } };
/** `layers={0}`: the off switch when scrolling regresses. */
export const Off: Story = { args: { layers: 0 } };
