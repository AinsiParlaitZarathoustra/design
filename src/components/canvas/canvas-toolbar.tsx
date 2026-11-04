"use client";

import {
  CircleIcon,
  DiamondIcon,
  FrameIcon,
  ImageIcon,
  PanelBottomIcon,
  PanelLeftIcon,
  PanelRightIcon,
  Redo2Icon,
  RectangleHorizontalIcon,
  Settings2Icon,
  SquareIcon,
  StickyNoteIcon,
  TriangleIcon,
  TypeIcon,
  Undo2Icon,
  type LucideIcon,
} from "lucide-react";
import { Fragment, type ReactElement } from "react";
import { cn } from "../../lib/utils.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu.tsx";
import { HintGroup, HintItem } from "../../ui/hint-group.tsx";
import { Icon } from "../../ui/icon.tsx";
import { IconButton } from "../../ui/icon-button.tsx";
import { Hint } from "../../ui/tooltip.tsx";
import { CANVAS_GLASS } from "./canvas-chrome.tsx";
import type { CanvasDock } from "./types.ts";

/**
 * One control in the dock. A tool (`note`, `text`, `frame`, `shape:<kind>`)
 * arms for the next click on the canvas; an `action` (media, image) runs at
 * once and is never pressed.
 */
export interface CanvasToolItem {
  id: string;
  icon: LucideIcon;
  label: string;
  shortcut?: string;
  action?: boolean;
}

/** Spaces' dock: blocks | the contract's four shapes | media. */
export const SPACES_TOOL_GROUPS: CanvasToolItem[][] = [
  [
    { id: "note", icon: StickyNoteIcon, label: "Note" },
    { id: "text", icon: TypeIcon, label: "Text" },
    { id: "frame", icon: FrameIcon, label: "Frame" },
  ],
  [
    { id: "shape:rectangle", icon: SquareIcon, label: "Rectangle" },
    { id: "shape:ellipse", icon: CircleIcon, label: "Ellipse" },
    { id: "shape:diamond", icon: DiamondIcon, label: "Diamond" },
    { id: "shape:triangle", icon: TriangleIcon, label: "Triangle" },
  ],
  [{ id: "media", icon: ImageIcon, label: "Insert image or video", action: true }],
];

/** The local canvas's dock: note and text | its four flowchart shapes | image. */
export const LOCAL_CANVAS_TOOL_GROUPS: CanvasToolItem[][] = [
  [
    { id: "note", icon: StickyNoteIcon, label: "Note" },
    { id: "text", icon: TypeIcon, label: "Text" },
  ],
  [
    { id: "shape:rectangle", icon: SquareIcon, label: "Rectangle" },
    { id: "shape:rounded", icon: RectangleHorizontalIcon, label: "Rounded rectangle" },
    { id: "shape:ellipse", icon: CircleIcon, label: "Ellipse" },
    { id: "shape:diamond", icon: DiamondIcon, label: "Diamond" },
  ],
  [{ id: "image", icon: ImageIcon, label: "Insert image", action: true }],
];

const DOCKS: Array<{ dock: CanvasDock; label: string; icon: LucideIcon }> = [
  { dock: "left", label: "Dock left", icon: PanelLeftIcon },
  { dock: "bottom", label: "Dock bottom", icon: PanelBottomIcon },
  { dock: "right", label: "Dock right", icon: PanelRightIcon },
];

/** A 32px dock square; an armed tool takes the primary tint, as on desktop. */
const DOCK_BUTTON = "rounded-lg text-secondary-foreground aria-pressed:bg-primary/20";

/**
 * The floating tool dock: the app's tool groups, then undo and redo, then
 * (when the app lets it move) where the dock sits.
 *
 * Along the bottom it is a row, centred, and its controls share one sliding
 * tooltip; docked to a side it is a column pinned to that edge's middle, and
 * each tooltip opens away from the edge so it never covers the canvas.
 * Presentational: clicking the armed tool calls `onTool(null)`, and the app
 * decides what arming means.
 */
export function CanvasToolbar({
  groups,
  activeTool,
  onTool,
  onAction,
  history,
  dock,
  onDock,
  disabled = false,
  className,
}: {
  groups: CanvasToolItem[][];
  activeTool: string | null;
  onTool: (id: string | null) => void;
  onAction?: (id: string) => void;
  history?: { canUndo: boolean; canRedo: boolean; onUndo: () => void; onRedo: () => void };
  dock: CanvasDock;
  onDock?: (dock: CanvasDock) => void;
  /** A read-only canvas: the dock stays, so the canvas does not change shape, but nothing works. */
  disabled?: boolean;
  className?: string;
}) {
  const row = dock === "bottom";
  const side = row ? "top" : dock === "left" ? "right" : "left";
  const divider = (
    <div
      aria-hidden="true"
      className={cn("shrink-0 bg-border-subtle", row ? "mx-0.5 h-5 w-px" : "my-0.5 h-px w-5")}
    />
  );

  // A row shares one sliding tooltip; a column, which the group cannot
  // follow, gives each control its own, opening away from the edge.
  const hint = (
    label: string,
    shortcut: string | undefined,
    control: ReactElement<Record<string, unknown>>,
  ) =>
    row ? (
      <HintItem label={shortcut ? `${label} (${shortcut})` : label}>{control}</HintItem>
    ) : (
      <Hint label={label} shortcut={shortcut} side={side}>
        {control}
      </Hint>
    );

  const dockButton = (
    item: { id: string; icon: LucideIcon; label: string; shortcut?: string },
    onClick: () => void,
    opts: { pressed?: boolean; disabled?: boolean } = {},
  ) =>
    hint(
      item.label,
      item.shortcut,
      <IconButton
        icon={item.icon}
        label={item.label}
        size="lg"
        iconSize="lg"
        aria-pressed={opts.pressed}
        disabled={disabled || opts.disabled}
        onClick={onClick}
        className={DOCK_BUTTON}
      />,
    );

  const body = (
    <div
      data-slot="canvas-toolbar"
      data-dock={dock}
      role="toolbar"
      aria-label="Canvas tools"
      aria-orientation={row ? "horizontal" : "vertical"}
      aria-disabled={disabled || undefined}
      className={cn(
        "absolute z-panel flex items-center gap-1 p-1",
        CANVAS_GLASS,
        row
          ? "bottom-3 left-1/2 max-w-[calc(100%-1.5rem)] -translate-x-1/2 flex-row overflow-x-auto [scrollbar-width:none]"
          : "top-1/2 -translate-y-1/2 flex-col",
        dock === "left" && "left-3",
        dock === "right" && "right-3",
        disabled && "pointer-events-none opacity-40",
        className,
      )}
    >
      {groups.map((group, i) => (
        <Fragment key={group.map((t) => t.id).join("|")}>
          {i > 0 && divider}
          {group.map((item) => (
            <Fragment key={item.id}>
              {item.action
                ? dockButton(item, () => onAction?.(item.id))
                : dockButton(item, () => onTool(activeTool === item.id ? null : item.id), {
                    pressed: activeTool === item.id,
                  })}
            </Fragment>
          ))}
        </Fragment>
      ))}

      {history && (
        <>
          {divider}
          {dockButton(
            { id: "undo", icon: Undo2Icon, label: "Undo", shortcut: "⌘Z" },
            history.onUndo,
            {
              disabled: !history.canUndo,
            },
          )}
          {dockButton(
            { id: "redo", icon: Redo2Icon, label: "Redo", shortcut: "⌘⇧Z" },
            history.onRedo,
            { disabled: !history.canRedo },
          )}
        </>
      )}

      {onDock && (
        <>
          {divider}
          <DropdownMenu>
            {hint(
              "Dock position",
              undefined,
              <DropdownMenuTrigger
                disabled={disabled}
                render={
                  <IconButton
                    icon={Settings2Icon}
                    label="Dock position"
                    size="lg"
                    iconSize="lg"
                    className={cn(DOCK_BUTTON, "aria-expanded:bg-element-active")}
                  />
                }
              />,
            )}
            <DropdownMenuContent side={side} align="end" sideOffset={8} className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Dock position</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={dock}
                  onValueChange={(value) => onDock(value as CanvasDock)}
                >
                  {DOCKS.map((d) => (
                    <DropdownMenuRadioItem key={d.dock} value={d.dock}>
                      <Icon icon={d.icon} size="sm" className="text-muted-foreground" />
                      {d.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );

  return row ? <HintGroup side="top">{body}</HintGroup> : body;
}
