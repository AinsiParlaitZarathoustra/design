import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CanvasSurface } from "../../../src/components/canvas/canvas-chrome.tsx";
import { CanvasMinimap } from "../../../src/components/canvas/canvas-minimap.tsx";
import { BOARD_BOUNDS } from "./fixtures.ts";

const meta = {
  title: "Blocks/Canvas minimap",
  component: CanvasMinimap,
  tags: ["autodocs"],
  args: {
    nodes: BOARD_BOUNDS,
    viewport: { x: 0, y: 40, w: 720, h: 420 },
    onNavigate: fn(),
  },
  argTypes: { nodes: { control: false } },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="h-48">
        <CanvasSurface className="rounded-lg border border-border">
          <Story />
        </CanvasSurface>
      </div>
    ),
  ],
} satisfies Meta<typeof CanvasMinimap>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The board, with the viewport over its left half. Click to go there. */
export const Default: Story = {};
/** An empty page: the viewport alone. */
export const Empty: Story = { args: { nodes: [] } };
