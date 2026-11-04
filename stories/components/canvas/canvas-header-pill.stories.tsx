import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, screen, userEvent, within } from "storybook/test";
import { CanvasSurface } from "../../../src/components/canvas/canvas-chrome.tsx";
import { CanvasHeaderPill } from "../../../src/components/canvas/canvas-header-pill.tsx";
import type { CanvasLinkStatus } from "../../../src/components/canvas/types.ts";
import { SWITCHER_PAGES } from "./fixtures.ts";

const STATUS_LABEL: Record<CanvasLinkStatus, string> = {
  live: "Live in #design — every change is shared",
  syncing: "Reconnecting… your edits are kept and sent when the Space is back",
  offline: "Offline — keep drawing; your changes are held and sent when this reconnects",
  archived: "#design is archived — this Space is readable, but takes no edits",
  viewing: "Viewing — this page is full, so your cursor and edits are not shared",
};

interface DemoProps {
  pageName: string;
  pageIcon?: string;
  switcher: boolean;
  status?: CanvasLinkStatus;
  zoom?: number;
  fullscreen?: boolean;
  onOpenPage: (id: string) => void;
  onFit: () => void;
}

function Demo({
  pageName,
  pageIcon,
  switcher,
  status,
  zoom,
  fullscreen,
  onOpenPage,
  onFit,
}: DemoProps) {
  const [pagesOpen, setPagesOpen] = useState(false);
  const [active, setActive] = useState(SWITCHER_PAGES[0]!.id);
  const [scale, setScale] = useState(zoom);
  const [full, setFull] = useState(fullscreen);
  const name = switcher ? SWITCHER_PAGES.find((p) => p.id === active)!.name : pageName;
  return (
    <div className="h-48">
      <CanvasSurface className="rounded-lg border border-border">
        <CanvasHeaderPill
          pageName={name}
          pageIcon={pageIcon}
          pages={switcher ? SWITCHER_PAGES : undefined}
          activePageId={active}
          onOpenPage={(id) => {
            setActive(id);
            onOpenPage(id);
          }}
          status={status}
          statusLabel={status && STATUS_LABEL[status]}
          pagesOpen={pagesOpen}
          onTogglePages={() => setPagesOpen((o) => !o)}
          zoom={scale}
          onZoomIn={() => setScale((z) => (z ?? 1) * 1.2)}
          onZoomOut={() => setScale((z) => (z ?? 1) / 1.2)}
          onZoomReset={() => setScale(1)}
          onFit={onFit}
          fullscreen={full}
          onToggleFullscreen={full === undefined ? undefined : () => setFull((f) => !f)}
        />
      </CanvasSurface>
    </div>
  );
}

const meta = {
  title: "Blocks/Canvas header",
  component: Demo,
  tags: ["autodocs"],
  args: {
    pageName: "Roadmap",
    switcher: true,
    status: "live",
    zoom: 1,
    onOpenPage: fn(),
    onFit: fn(),
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A Space, live: every change is shared. */
export const Live: Story = {};
/** Reconnecting: a spinner where the dot was. */
export const Syncing: Story = { args: { status: "syncing" } };
/** Offline: edits are held. */
export const Offline: Story = { args: { status: "offline" } };
/** The conversation is archived: readable, no edits. */
export const Archived: Story = { args: { status: "archived", zoom: 0.75 } };
/** Present but not sharing. */
export const Viewing: Story = { args: { status: "viewing", zoom: 1.5 } };
/** The local canvas: an emoji, fullscreen, and no zoom readout or switcher. */
export const LocalCanvas: Story = {
  args: {
    pageName: "Architecture",
    pageIcon: "🏗️",
    switcher: false,
    status: undefined,
    zoom: undefined,
    fullscreen: false,
  },
};
/** A name long enough to truncate. */
export const LongPageName: Story = {
  args: {
    switcher: false,
    pageName: "Quarterly planning for the realtime sync rewrite and its rollout to every org",
  },
};
/** The name is the page switcher. */
export const PageSwitcher: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: /switch page/i }));
    const items = await screen.findAllByRole("menuitemradio");
    await expect(items).toHaveLength(3);
  },
};
