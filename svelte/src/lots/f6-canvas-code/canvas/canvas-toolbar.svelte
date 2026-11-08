<script module lang="ts">
  import type { CanvasDock } from "./types";
  import {
    CircleIcon,
    DiamondIcon,
    FrameIcon,
    ImageIcon,
    PanelBottomIcon,
    PanelLeftIcon,
    PanelRightIcon,
    RectangleHorizontalIcon,
    SquareIcon,
    StickyNoteIcon,
    TriangleIcon,
    TypeIcon,
  } from "lucide-svelte";

  /**
   * One control in the dock. A tool (`note`, `text`, `frame`, `shape:<kind>`)
   * arms for the next click on the canvas; an `action` (media, image) runs at
   * once and is never pressed.
   */
  export interface CanvasToolItem {
    id: string;
    icon: any;
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

  export const CANVAS_DOCKS: Array<{ dock: CanvasDock; label: string; icon: any }> = [
    { dock: "left", label: "Dock left", icon: PanelLeftIcon },
    { dock: "bottom", label: "Dock bottom", icon: PanelBottomIcon },
    { dock: "right", label: "Dock right", icon: PanelRightIcon },
  ];
</script>

<script lang="ts">
  import { Settings2Icon, Redo2Icon, Undo2Icon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import IconButton from "../../../ui/icon-button.svelte";
  import Hint from "../../../ui/hint.svelte";
  import { CANVAS_GLASS } from "./canvas-chrome";
  import HintGroup from "../deps/hint-group.svelte";
  import HintItem from "../deps/hint-item.svelte";
  import DropdownMenu from "../deps/dropdown-menu.svelte";
  import DropdownMenuTrigger from "../deps/dropdown-menu-trigger.svelte";
  import DropdownMenuContent from "../deps/dropdown-menu-content.svelte";
  import DropdownMenuGroup from "../deps/dropdown-menu-group.svelte";
  import DropdownMenuLabel from "../deps/dropdown-menu-label.svelte";
  import DropdownMenuRadioGroup from "../deps/dropdown-menu-radio-group.svelte";
  import DropdownMenuRadioItem from "../deps/dropdown-menu-radio-item.svelte";

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
  interface Props {
    groups: CanvasToolItem[][];
    activeTool: string | null;
    onTool: (id: string | null) => void;
    onAction?: (id: string) => void;
    history?: { canUndo: boolean; canRedo: boolean; onUndo: () => void; onRedo: () => void };
    dock: CanvasDock;
    onDock?: (dock: CanvasDock) => void;
    /** A read-only canvas: the dock stays, so the canvas does not change shape, but nothing works. */
    disabled?: boolean;
    class?: string;
  }

  let {
    groups,
    activeTool,
    onTool,
    onAction,
    history,
    dock,
    onDock,
    disabled = false,
    class: className,
  }: Props = $props();

  const row = $derived(dock === "bottom");
  const side = $derived((row ? "top" : dock === "left" ? "right" : "left") as "top" | "bottom" | "left" | "right");
  // The hint takes a top or bottom side; a column's left and right tooltips
  // open below, not beside, the control.
  const hintSide = $derived((side === "top" ? "top" : "bottom") as "top" | "bottom");
</script>

{#snippet divider()}
  <div aria-hidden="true" class={cn("shrink-0 bg-border-subtle", row ? "mx-0.5 h-5 w-px" : "my-0.5 h-px w-5")}></div>
{/snippet}

{#snippet dockButton(
  item: { id: string; icon: any; label: string; shortcut?: string },
  onclick: () => void,
  opts: { pressed?: boolean; disabled?: boolean; trigger?: boolean } = {},
)}
  {#snippet control()}
    {#if opts.trigger}
      <DropdownMenuTrigger disabled={disabled}>
        {#snippet child({ props })}
          <IconButton
            {...props}
            icon={item.icon}
            label={item.label}
            size="lg"
            iconSize="lg"
            class={cn(DOCK_BUTTON, "aria-expanded:bg-element-active")}
          />
        {/snippet}
      </DropdownMenuTrigger>
    {:else}
      <IconButton
        icon={item.icon}
        label={item.label}
        size="lg"
        iconSize="lg"
        aria-pressed={opts.pressed}
        disabled={disabled || opts.disabled}
        {onclick}
        class={DOCK_BUTTON}
      />
    {/if}
  {/snippet}
  {#if row}
    <HintItem label={item.shortcut ? `${item.label} (${item.shortcut})` : item.label}>
      {@render control()}
    </HintItem>
  {:else}
    <Hint label={item.label} shortcut={item.shortcut} side={hintSide}>
      {@render control()}
    </Hint>
  {/if}
{/snippet}

{#snippet body()}
  <div
    data-slot="canvas-toolbar"
    data-dock={dock}
    role="toolbar"
    aria-label="Canvas tools"
    aria-orientation={row ? "horizontal" : "vertical"}
    aria-disabled={disabled || undefined}
    class={cn(
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
    {#each groups as group, i (group.map((t) => t.id).join("|"))}
      {#if i > 0}{@render divider()}{/if}
      {#each group as item (item.id)}
        {#if item.action}
          {@render dockButton(item, () => onAction?.(item.id))}
        {:else}
          {@render dockButton(item, () => onTool(activeTool === item.id ? null : item.id), {
            pressed: activeTool === item.id,
          })}
        {/if}
      {/each}
    {/each}

    {#if history}
      {@render divider()}
      {@render dockButton(
        { id: "undo", icon: Undo2Icon, label: "Undo", shortcut: "⌘Z" },
        history.onUndo,
        { disabled: !history.canUndo },
      )}
      {@render dockButton(
        { id: "redo", icon: Redo2Icon, label: "Redo", shortcut: "⌘⇧Z" },
        history.onRedo,
        { disabled: !history.canRedo },
      )}
    {/if}

    {#if onDock}
      {@render divider()}
      <DropdownMenu>
        {@render dockButton(
          { id: "dock", icon: Settings2Icon, label: "Dock position" },
          () => {},
          { trigger: true },
        )}
        <DropdownMenuContent {side} align="end" sideOffset={8} class="w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Dock position</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={dock} onValueChange={(value) => onDock(value as CanvasDock)}>
              {#each CANVAS_DOCKS as d (d.dock)}
                <DropdownMenuRadioItem value={d.dock}>
                  <Icon icon={d.icon} size="sm" class="text-muted-foreground" />
                  {d.label}
                </DropdownMenuRadioItem>
              {/each}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    {/if}
  </div>
{/snippet}

{#if row}
  <HintGroup side="top">
    {@render body()}
  </HintGroup>
{:else}
  {@render body()}
{/if}
