import type { Meta, StoryObj } from "@storybook/react-vite";
import { CrosshairIcon, PanelLeftIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { fn } from "storybook/test";
import {
  CanvasDraftBox,
  CanvasPill,
  CanvasPillButton,
  CanvasPillDivider,
  CanvasStatusChip,
  CanvasSurface,
} from "../../../src/components/canvas/canvas-chrome.tsx";
import { Spinner } from "../../../src/components/ui/spinner.tsx";

function Demo({ onFit }: { onFit: () => void }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-80">
      <CanvasSurface className="rounded-lg border border-border">
        <CanvasPill corner="top-left">
          <CanvasPillButton
            icon={PanelLeftIcon}
            label={open ? "Hide pages" : "Show pages"}
            pressed={open}
            onClick={() => setOpen((o) => !o)}
          />
          <CanvasPillDivider />
          <CanvasPillButton
            icon={CrosshairIcon}
            label="Fit to view"
            shortcut="⇧1"
            onClick={onFit}
          />
        </CanvasPill>
        <CanvasPill corner="top-right">
          <CanvasPillButton icon={UploadIcon} label="Upload" disabled />
        </CanvasPill>
        <CanvasPill corner="bottom-left" className="px-2 text-xs text-secondary-foreground">
          bottom-left
        </CanvasPill>
        <CanvasPill corner="bottom-right" className="px-2 text-xs text-secondary-foreground">
          bottom-right
        </CanvasPill>
        <CanvasDraftBox bounds={{ x: 120, y: 90, w: 220, h: 110 }} />
        <CanvasStatusChip role="status">
          <Spinner size="sm" label="" />
          Uploading media…
        </CanvasStatusChip>
      </CanvasSurface>
    </div>
  );
}

const meta = {
  title: "Blocks/Canvas chrome",
  component: Demo,
  tags: ["autodocs"],
  args: { onFit: fn() },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The pieces every canvas is cut from: the dotted surface, a glass pill in
 * each corner, the box a tool drags out, and a status chip.
 */
export const Pieces: Story = {};
