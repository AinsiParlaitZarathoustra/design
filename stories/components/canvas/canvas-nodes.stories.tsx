import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { fn } from "storybook/test";
import { CanvasSurface } from "../../../src/components/canvas/canvas-chrome.tsx";
import {
  CANVAS_FIELD_CLASS,
  CanvasFrame,
  CanvasMedia,
  CanvasNodeFrame,
  CanvasNote,
  CanvasShape,
  CanvasText,
} from "../../../src/components/canvas/canvas-nodes.tsx";
import type { CanvasShapeKind } from "../../../src/components/canvas/types.ts";
import { IMAGE_SRC, LONG_BODY } from "./fixtures.ts";

/** A node on a hand-rolled canvas: absolutely placed by `bounds`. */
function Stage({ children, height = "h-72" }: { children: ReactNode; height?: string }) {
  return (
    <div className={height}>
      <CanvasSurface className="rounded-lg border border-border">{children}</CanvasSurface>
    </div>
  );
}

const SHAPES: CanvasShapeKind[] = ["rectangle", "rounded", "ellipse", "diamond", "triangle"];

const meta = {
  title: "Blocks/Canvas nodes",
  component: CanvasNodeFrame,
  tags: ["autodocs"],
  args: { kind: "note", selected: false },
  parameters: { layout: "padded" },
} satisfies Meta<typeof CanvasNodeFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

const box = { x: 48, y: 40, w: 280, h: 200 };

/** A glass note: icon and title over a long body that fades out. */
export const Note: Story = {
  render: (args) => (
    <Stage>
      <CanvasNodeFrame {...args} kind="note" bounds={box}>
        <CanvasNote title="Offline edits" meta="Edited 5m ago" body={LONG_BODY} />
      </CanvasNodeFrame>
    </Stage>
  ),
};
/** Nothing written yet. */
export const NoteEmpty: Story = {
  render: (args) => (
    <Stage>
      <CanvasNodeFrame {...args} kind="note" bounds={{ ...box, h: 140 }}>
        <CanvasNote title="" icon="💡" empty />
      </CanvasNodeFrame>
    </Stage>
  ),
};
/** Selected: the edge lifts to the primary, with anchors and the resize handle. */
export const NoteSelected: Story = {
  args: { selected: true, onAnchorPointerDown: fn(), onResizePointerDown: fn() },
  render: (args) => (
    <Stage>
      <CanvasNodeFrame {...args} kind="note" bounds={box}>
        <CanvasNote title="Open question" body="Do we show held edits in the header pill?" />
      </CanvasNodeFrame>
    </Stage>
  ),
};
/** A colleague has it selected: outlined in their hue. */
export const NoteClaimed: Story = {
  args: { claimedBy: { hue: "blue", name: "Ana Ruiz" } },
  render: (args) => (
    <Stage>
      <CanvasNodeFrame {...args} kind="note" bounds={box}>
        <CanvasNote title="Open question" body="Do we show held edits in the header pill?" />
      </CanvasNodeFrame>
    </Stage>
  ),
};
/** Editing: the app's inputs, typed to match the static note. */
export const NoteEditing: Story = {
  args: { selected: true },
  render: (args) => (
    <Stage>
      <CanvasNodeFrame {...args} kind="note" bounds={box}>
        <CanvasNote
          title={
            <input
              aria-label="Note title"
              defaultValue="Open question"
              placeholder="Untitled"
              className={CANVAS_FIELD_CLASS.noteTitle}
            />
          }
          body={
            <textarea
              aria-label="Note body"
              defaultValue="Do we show held edits in the header pill?"
              placeholder="Write something…"
              className={`${CANVAS_FIELD_CLASS.noteBody} flex-1`}
            />
          }
        />
      </CanvasNodeFrame>
    </Stage>
  ),
};
/** Free text, selected. */
export const Text: Story = {
  args: { selected: true },
  render: (args) => (
    <Stage height="h-40">
      <CanvasNodeFrame {...args} kind="text" bounds={{ x: 48, y: 48, w: 260, h: 40 }}>
        <CanvasText text="Ship by Friday" />
      </CanvasNodeFrame>
    </Stage>
  ),
};
/** Every shape, the last one selected. */
export const Shapes: Story = {
  render: () => (
    <Stage height="h-48">
      {SHAPES.map((shape, i) => (
        <CanvasNodeFrame
          key={shape}
          kind="shape"
          selected={i === SHAPES.length - 1}
          bounds={{ x: 32 + i * 148, y: 48, w: 120, h: 88 }}
        >
          <CanvasShape shape={shape} label={shape === "triangle" ? "" : shape} />
        </CanvasNodeFrame>
      ))}
    </Stage>
  ),
};
/** A titled frame. */
export const Frame: Story = {
  render: (args) => (
    <Stage>
      <CanvasNodeFrame {...args} kind="frame" bounds={{ x: 48, y: 56, w: 360, h: 180 }}>
        <CanvasFrame label="Sync design" />
      </CanvasNodeFrame>
    </Stage>
  ),
};
/** Media while its bytes load. */
export const MediaLoading: Story = {
  render: (args) => (
    <Stage height="h-56">
      <CanvasNodeFrame {...args} kind="media" bounds={{ x: 48, y: 40, w: 240, h: 150 }}>
        <CanvasMedia state="loading" kind="image" alt="Whiteboard photo" />
      </CanvasNodeFrame>
    </Stage>
  ),
};
/** `loadingLabel`: the wait, in words, under the spinner. */
export const MediaLoadingLabelled: Story = {
  render: (args) => (
    <Stage height="h-56">
      <CanvasNodeFrame {...args} kind="media" bounds={{ x: 48, y: 40, w: 240, h: 150 }}>
        <CanvasMedia
          state="loading"
          kind="image"
          alt="Whiteboard photo"
          loadingLabel="Loading image…"
        />
      </CanvasNodeFrame>
    </Stage>
  ),
};
/** Media that could not be read. */
export const MediaError: Story = {
  render: (args) => (
    <Stage height="h-56">
      <CanvasNodeFrame {...args} kind="media" bounds={{ x: 48, y: 40, w: 240, h: 150 }}>
        <CanvasMedia state="error" kind="image" alt="Whiteboard photo" />
      </CanvasNodeFrame>
    </Stage>
  ),
};
/** An image. */
export const MediaImage: Story = {
  render: (args) => (
    <Stage height="h-56">
      <CanvasNodeFrame {...args} kind="media" bounds={{ x: 48, y: 40, w: 240, h: 150 }}>
        <CanvasMedia state="ready" kind="image" src={IMAGE_SRC} alt="Mountains at dusk" />
      </CanvasNodeFrame>
    </Stage>
  ),
};
/** A selected shape with its four anchors and the resize handle. */
export const SelectedWithAnchors: Story = {
  args: { selected: true, onAnchorPointerDown: fn(), onResizePointerDown: fn() },
  render: (args) => (
    <Stage height="h-56">
      <CanvasNodeFrame {...args} kind="shape" bounds={{ x: 80, y: 48, w: 160, h: 100 }}>
        <CanvasShape shape="rounded" label="Relay" />
      </CanvasNodeFrame>
    </Stage>
  ),
};
