import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { CanvasSurface } from "../../../src/components/canvas/canvas-chrome.tsx";
import {
  CanvasToolbar,
  LOCAL_CANVAS_TOOL_GROUPS,
  SPACES_TOOL_GROUPS,
  type CanvasToolItem,
} from "../../../src/components/canvas/canvas-toolbar.tsx";
import type { CanvasDock } from "../../../src/components/canvas/types.ts";

interface DemoProps {
  groups: CanvasToolItem[][];
  dock: CanvasDock;
  movable: boolean;
  history: boolean;
  canUndo: boolean;
  canRedo: boolean;
  disabled: boolean;
  initialTool: string | null;
  onTool: (id: string | null) => void;
  onAction: (id: string) => void;
  onDock: (dock: CanvasDock) => void;
  onUndo: () => void;
  onRedo: () => void;
}

/** The app's state: which tool is armed and where the dock sits. */
function Demo({
  groups,
  dock: initialDock,
  movable,
  history,
  canUndo,
  canRedo,
  disabled,
  initialTool,
  onTool,
  onAction,
  onDock,
  onUndo,
  onRedo,
}: DemoProps) {
  const [tool, setTool] = useState(initialTool);
  const [dock, setDock] = useState(initialDock);
  return (
    <div className="h-112">
      <CanvasSurface className="rounded-lg border border-border">
        <CanvasToolbar
          groups={groups}
          activeTool={tool}
          onTool={(id) => {
            setTool(id);
            onTool(id);
          }}
          onAction={onAction}
          history={history ? { canUndo, canRedo, onUndo, onRedo } : undefined}
          dock={dock}
          onDock={
            movable
              ? (d) => {
                  setDock(d);
                  onDock(d);
                }
              : undefined
          }
          disabled={disabled}
        />
      </CanvasSurface>
    </div>
  );
}

const meta = {
  title: "Blocks/Canvas toolbar",
  component: Demo,
  tags: ["autodocs"],
  args: {
    groups: SPACES_TOOL_GROUPS,
    dock: "bottom",
    movable: true,
    history: true,
    canUndo: true,
    canRedo: false,
    disabled: false,
    initialTool: null,
    onTool: fn(),
    onAction: fn(),
    onDock: fn(),
    onUndo: fn(),
    onRedo: fn(),
  },
  argTypes: { groups: { control: false } },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Spaces' dock along the bottom: a row, centred, with one sliding tooltip. */
export const SpacesBottom: Story = {};
/** Docked left: a column, tooltips opening right. */
export const SpacesLeft: Story = { args: { dock: "left" } };
/** Docked right: tooltips open left, away from the edge. */
export const SpacesRight: Story = { args: { dock: "right" } };
/** The local canvas's dock: its own shapes, image, and no dock menu. */
export const LocalCanvas: Story = {
  args: { groups: LOCAL_CANVAS_TOOL_GROUPS, dock: "left", movable: false, canRedo: true },
};
/** Nothing to undo or redo yet. */
export const HistoryUnavailable: Story = { args: { canUndo: false, canRedo: false } };
/** A read-only page: the dock stays so the canvas keeps its shape, but nothing works. */
export const Disabled: Story = { args: { disabled: true } };
/** Arming a tool presses it; pressing it again disarms it. */
export const ToolArmed: Story = {
  play: async ({ canvasElement, args }) => {
    const note = within(canvasElement).getByRole("button", { name: "Note" });
    await userEvent.click(note);
    await expect(note).toHaveAttribute("aria-pressed", "true");
    await expect(args.onTool).toHaveBeenLastCalledWith("note");
    await userEvent.click(note);
    await expect(note).toHaveAttribute("aria-pressed", "false");
    await expect(args.onTool).toHaveBeenLastCalledWith(null);
  },
};
