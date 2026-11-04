import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import type { PanelImperativeHandle } from "react-resizable-panels";
import { fn } from "storybook/test";
import {
  ResizableHandle,
  ResizablePane,
  ResizableSplit,
} from "../../../src/components/layout/resizable-split.tsx";
import type {
  ResizableLayout,
  ResizableOrientation,
} from "../../../src/components/layout/resizable-split.tsx";
import { Button } from "../../../src/ui/button.tsx";

function Pane({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex h-full flex-col gap-1 p-3">
      <span className="eyebrow">{title}</span>
      <p className="caption">{body}</p>
    </div>
  );
}

const format = (layout: ResizableLayout | null) =>
  layout
    ? Object.entries(layout)
        .map(([id, size]) => `${id} ${size.toFixed(0)}%`)
        .join(" · ")
    : "nothing yet";

interface DemoProps {
  orientation?: ResizableOrientation;
  panes?: number;
  onLayoutCommit?: (layout: ResizableLayout) => void;
}

/**
 * The app keeps the layout: it hands `defaultLayout` in and hears about a
 * drag through `onLayoutCommit`. The line under the split is that state.
 */
function Demo({ orientation = "horizontal", panes = 2, onLayoutCommit }: DemoProps) {
  const [saved, setSaved] = useState<ResizableLayout | null>(null);
  const titles = ["Sessions", "Transcript", "Files", "Diff"].slice(0, panes);
  return (
    <div className="flex w-full max-w-3xl flex-col gap-2">
      <div className="h-72 overflow-hidden rounded-md border border-border bg-background">
        <ResizableSplit
          id={`story-${orientation}-${panes}`}
          orientation={orientation}
          onLayoutCommit={(layout) => {
            onLayoutCommit?.(layout);
            setSaved(layout);
          }}
        >
          {titles.map((title, i) => (
            <ResizablePaneWithHandle key={title} first={i === 0} id={title.toLowerCase()}>
              <Pane title={title} body="Drag the rule between panes." />
            </ResizablePaneWithHandle>
          ))}
        </ResizableSplit>
      </div>
      <span className="caption">Committed: {format(saved)}</span>
    </div>
  );
}

function ResizablePaneWithHandle({
  first,
  id,
  children,
}: {
  first: boolean;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {!first && <ResizableHandle />}
      <ResizablePane id={id} minSize="15">
        {children}
      </ResizablePane>
    </>
  );
}

/**
 * A pane collapsed through its imperative handle, with its handle hidden but
 * mounted, the way desktop hides its surfaces pane.
 */
function Collapsible() {
  const panel = useRef<PanelImperativeHandle | null>(null);
  const [open, setOpen] = useState(true);
  return (
    <div className="flex w-full max-w-3xl flex-col gap-2">
      <div className="h-72 overflow-hidden rounded-md border border-border bg-background">
        <ResizableSplit id="story-collapsible">
          <ResizablePane id="main" minSize="30">
            <Pane title="Session" body="The main pane." />
          </ResizablePane>
          <ResizableHandle hidden={!open} />
          <ResizablePane
            id="side"
            panelRef={panel}
            defaultSize="35"
            minSize="20"
            collapsible
            collapsedSize={0}
            onResize={(size) => setOpen(size.asPercentage > 0)}
          >
            <Pane title="Surfaces" body="Collapsed, it stays mounted; so does its handle." />
          </ResizablePane>
        </ResizableSplit>
      </div>
      <div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => (open ? panel.current?.collapse() : panel.current?.expand())}
        >
          {open ? "Collapse" : "Expand"} the side pane
        </Button>
      </div>
    </div>
  );
}

const meta = {
  title: "Layout/ResizableSplit",
  component: Demo,
  args: { orientation: "horizontal", panes: 2, onLayoutCommit: fn() },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    panes: { control: { type: "range", min: 2, max: 4 } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Split panes on react-resizable-panels v4, side by side or stacked. The split keeps nothing: the app passes `defaultLayout` in and hears `onLayoutCommit` once per drag, and never for a layout the library settled on by itself. `ResizablePane` takes every `Panel` prop, `panelRef` included, so a pane collapses without unmounting. The handle is a 1px rule with an invisible ~10px target that lights while hovered or dragged; `hidden` makes it inert but keeps it mounted. Sizes: a string is a percentage, a number is pixels.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Vertical: Story = { args: { orientation: "vertical" } };
export const ManyPanes: Story = { args: { panes: 4 } };
/** A pane collapsed and expanded through `panelRef`, its handle hidden while collapsed. */
export const CollapsedPane: Story = { render: () => <Collapsible /> };
/** Desktop's editor: a column split, its lower pane split across. */
export const Nested: Story = {
  render: () => (
    <div className="h-80 w-full max-w-3xl overflow-hidden rounded-md border border-border bg-background">
      <ResizableSplit id="story-outer" orientation="vertical">
        <ResizablePane id="editor" minSize="20">
          <Pane title="Editor" body="Above." />
        </ResizablePane>
        <ResizableHandle />
        <ResizablePane id="bottom" defaultSize="40" minSize="20">
          <ResizableSplit id="story-inner">
            <ResizablePane id="terminal" minSize="20">
              <Pane title="Terminal" body="Left." />
            </ResizablePane>
            <ResizableHandle />
            <ResizablePane id="output" minSize="20">
              <Pane title="Output" body="Right." />
            </ResizablePane>
          </ResizableSplit>
        </ResizablePane>
      </ResizableSplit>
    </div>
  ),
};
export const Light: Story = { globals: { appearance: "light" } };
