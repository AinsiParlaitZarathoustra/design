import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  CANVAS_EXPORT_FORMATS,
  CanvasActionPill,
} from "../../../src/components/canvas/canvas-action-pill.tsx";
import { CanvasStatusChip, CanvasSurface } from "../../../src/components/canvas/canvas-chrome.tsx";
import { CanvasHeaderPill } from "../../../src/components/canvas/canvas-header-pill.tsx";
import { CanvasMinimap } from "../../../src/components/canvas/canvas-minimap.tsx";
import {
  CanvasFrame,
  CanvasMedia,
  CanvasNodeFrame,
  CanvasNote,
  CanvasShape,
  CanvasText,
} from "../../../src/components/canvas/canvas-nodes.tsx";
import { CanvasPagesPanel } from "../../../src/components/canvas/canvas-pages-panel.tsx";
import {
  CanvasToolbar,
  LOCAL_CANVAS_TOOL_GROUPS,
  SPACES_TOOL_GROUPS,
} from "../../../src/components/canvas/canvas-toolbar.tsx";
import { PresenceCursor, PresenceLayer } from "../../../src/components/canvas/presence-cursor.tsx";
import type { CanvasDock } from "../../../src/components/canvas/types.ts";
import {
  BOARD,
  BOARD_BOUNDS,
  IMAGE_SRC,
  LOCAL_PAGE_ROWS,
  PEERS,
  SELF,
  SWITCHER_PAGES,
  type BoardNode,
} from "./fixtures.ts";

/**
 * The blocks put together, as the apps compose them: a board on the dotted
 * surface, the header and action pills, the dock, presence and the minimap.
 * Nothing here pans or zooms; the live canvas is each app's.
 */

function Body({ node }: { node: BoardNode }) {
  switch (node.kind) {
    case "note":
      return <CanvasNote title={node.title} body={node.body} />;
    case "text":
      return <CanvasText text={node.text} />;
    case "shape":
      return <CanvasShape shape={node.shape} label={node.label} />;
    case "frame":
      return <CanvasFrame label={node.label} />;
    case "media":
      return <CanvasMedia state="ready" kind="image" src={IMAGE_SRC} alt="Mountains at dusk" />;
  }
}

function Nodes({
  nodes,
  selected,
  claimed,
}: {
  nodes: BoardNode[];
  selected?: string;
  claimed?: string;
}) {
  return nodes.map((n) => (
    <CanvasNodeFrame
      key={n.id}
      kind={n.kind}
      bounds={n.bounds}
      selected={n.id === selected}
      claimedBy={n.id === claimed ? { hue: PEERS[1]!.hue, name: PEERS[1]!.name } : undefined}
      onAnchorPointerDown={() => {}}
      onResizePointerDown={() => {}}
    >
      <Body node={n} />
    </CanvasNodeFrame>
  ));
}

const at = (x: number, y: number) => ({ transform: `translate3d(${x}px, ${y}px, 0)` });

function SpacesBoard({ empty = false }: { empty?: boolean }) {
  const [tool, setTool] = useState<string | null>(null);
  const [dock, setDock] = useState<CanvasDock>("bottom");
  const [pagesOpen, setPagesOpen] = useState(false);
  const [following, setFollowing] = useState<string | null>(null);
  return (
    <div className="h-[720px]">
      <CanvasSurface>
        {!empty && <Nodes nodes={BOARD} selected="note-2" claimed="s-diamond" />}
        {!empty && (
          <PresenceLayer>
            <PresenceCursor name={PEERS[0]!.name} hue={PEERS[0]!.hue} style={at(300, 330)} />
            <PresenceCursor name={PEERS[1]!.name} hue={PEERS[1]!.hue} style={at(930, 260)} />
          </PresenceLayer>
        )}
        <CanvasHeaderPill
          pageName={SWITCHER_PAGES[0]!.name}
          pages={SWITCHER_PAGES}
          activePageId={SWITCHER_PAGES[0]!.id}
          onOpenPage={() => {}}
          status="live"
          statusLabel="Live in design-crit — every change is shared"
          pagesOpen={pagesOpen}
          onTogglePages={() => setPagesOpen((o) => !o)}
          zoom={1}
          onZoomIn={() => {}}
          onZoomOut={() => {}}
          onZoomReset={() => {}}
          onFit={() => {}}
        />
        <CanvasActionPill
          peers={empty ? [] : PEERS.slice(0, 2)}
          self={SELF}
          following={following}
          onFollow={setFollowing}
          external={{ label: "Open in new tab", onOpen: () => {} }}
          exportFormats={CANVAS_EXPORT_FORMATS}
          onExport={() => {}}
        />
        <CanvasToolbar
          groups={SPACES_TOOL_GROUPS}
          activeTool={tool}
          onTool={setTool}
          onAction={() => {}}
          history={{ canUndo: !empty, canRedo: false, onUndo: () => {}, onRedo: () => {} }}
          dock={dock}
          onDock={setDock}
        />
        {empty ? (
          <CanvasStatusChip role="status">Click a tool, then the canvas</CanvasStatusChip>
        ) : (
          <CanvasMinimap nodes={BOARD_BOUNDS} viewport={{ x: 0, y: 0, w: 1100, h: 640 }} />
        )}
      </CanvasSurface>
    </div>
  );
}

function LocalBoard() {
  const [tool, setTool] = useState<string | null>("shape:rounded");
  const [active, setActive] = useState(LOCAL_PAGE_ROWS[0]!.id);
  const [pagesOpen, setPagesOpen] = useState(true);
  const page = LOCAL_PAGE_ROWS.find((r) => r.id === active)!;
  return (
    <div className="flex h-[720px]">
      {pagesOpen && (
        <CanvasPagesPanel
          rows={LOCAL_PAGE_ROWS}
          activeId={active}
          onOpen={setActive}
          onCreate={() => {}}
          onRename={() => {}}
          onDelete={() => {}}
          onIconClick={() => {}}
        />
      )}
      <div className="min-w-0 flex-1">
        <CanvasSurface>
          <Nodes nodes={BOARD.filter((n) => n.kind !== "frame" && n.id !== "s-triangle")} />
          <CanvasHeaderPill
            pageName={page.name}
            pageIcon={page.icon}
            pagesOpen={pagesOpen}
            onTogglePages={() => setPagesOpen((o) => !o)}
            onFit={() => {}}
            fullscreen={false}
            onToggleFullscreen={() => {}}
          />
          <CanvasActionPill exportFormats={CANVAS_EXPORT_FORMATS} onExport={() => {}} />
          <CanvasToolbar
            groups={LOCAL_CANVAS_TOOL_GROUPS}
            activeTool={tool}
            onTool={setTool}
            onAction={() => {}}
            history={{ canUndo: true, canRedo: true, onUndo: () => {}, onRedo: () => {} }}
            dock="left"
          />
        </CanvasSurface>
      </div>
    </div>
  );
}

function Board({ variant }: { variant: "spaces" | "local" | "empty" }) {
  if (variant === "local") return <LocalBoard />;
  return <SpacesBoard empty={variant === "empty"} />;
}

const meta = {
  title: "Blocks/Canvas board",
  component: Board,
  tags: ["autodocs"],
  args: { variant: "spaces" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A Space: the bottom dock, page pill with zoom, peers, cursors, a claimed shape, the minimap. */
export const Spaces: Story = {};
/** The local canvas: pages open, the dock on the left, export alone. */
export const LocalCanvas: Story = { args: { variant: "local" } };
/** A new page: nothing drawn yet, and a hint where the board would be. */
export const EmptyPage: Story = { args: { variant: "empty" } };
/** A Space on a phone. */
export const Phone: Story = { globals: { viewport: { value: "phone" } } };
