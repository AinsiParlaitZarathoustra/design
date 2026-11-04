import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import {
  CANVAS_EXPORT_FORMATS,
  CanvasActionPill,
} from "../../../src/components/canvas/canvas-action-pill.tsx";
import { CanvasSurface } from "../../../src/components/canvas/canvas-chrome.tsx";
import type { PresencePeer } from "../../../src/components/canvas/types.ts";
import { MANY_PEERS, PEERS, SELF } from "./fixtures.ts";

interface DemoProps {
  peers?: PresencePeer[];
  self: boolean;
  follow: boolean;
  initialFollowing?: string | null;
  followers?: number;
  external: boolean;
  exportable: boolean;
  exporting?: boolean;
  exportLabel?: string;
  onFollow: (id: string | null) => void;
  onOpen: () => void;
  onExport: (id: string) => void;
}

function Demo({
  peers,
  self,
  follow,
  initialFollowing = null,
  followers,
  external,
  exportable,
  exporting,
  exportLabel,
  onFollow,
  onOpen,
  onExport,
}: DemoProps) {
  const [following, setFollowing] = useState(initialFollowing);
  return (
    <div className="h-48">
      <CanvasSurface className="rounded-lg border border-border">
        <CanvasActionPill
          peers={peers}
          self={self ? SELF : undefined}
          following={following}
          onFollow={
            follow
              ? (id) => {
                  setFollowing(id);
                  onFollow(id);
                }
              : undefined
          }
          followers={followers}
          external={external ? { label: "Open in new tab", onOpen } : undefined}
          exportFormats={exportable ? CANVAS_EXPORT_FORMATS : undefined}
          onExport={exportable ? onExport : undefined}
          exporting={exporting}
          exportLabel={exportLabel}
        />
      </CanvasSurface>
    </div>
  );
}

const meta = {
  title: "Blocks/Canvas action pill",
  component: Demo,
  tags: ["autodocs"],
  args: {
    self: true,
    follow: true,
    external: true,
    exportable: true,
    onFollow: fn(),
    onOpen: fn(),
    onExport: fn(),
  },
  argTypes: { peers: { control: false } },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Only you here: your face, the link out, export. */
export const Alone: Story = {};
/** Three peers, each ringed in their hue, then you. */
export const ThreePeers: Story = { args: { peers: PEERS.slice(0, 3) } };
/** Seven peers: four faces, then "+3". */
export const Overflow: Story = { args: { peers: MANY_PEERS } };
/** Riding Kofi's view: his face lifts, ringed in the primary. */
export const Following: Story = { args: { peers: PEERS, initialFollowing: "actor_kofi" } };
/** Two people are riding your view. */
export const FollowedBy: Story = { args: { peers: PEERS.slice(0, 2), followers: 2 } };
/** An export in flight: a spinner, and the menu shut. */
export const Exporting: Story = { args: { peers: PEERS.slice(0, 2), exporting: true } };
/** The local canvas: export alone. */
/** `exportLabel`: export with its name beside the icon. */
export const ExportLabelled: Story = { args: { peers: PEERS.slice(0, 2), exportLabel: "Export" } };

/** Labelled, while exporting: a spinner in the icon's place, the width held. */
export const ExportLabelledExporting: Story = {
  args: { peers: PEERS.slice(0, 2), exportLabel: "Export", exporting: true },
};

export const ExportOnly: Story = { args: { self: false, follow: false, external: false } };
