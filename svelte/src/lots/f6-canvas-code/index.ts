/**
 * The canvas and code-surface family (lot f6), ported from
 * `@tryatlas/design`'s `src/components/canvas` and `src/components/code-surface`.
 * The pilot branches this file into `svelte/src/index.ts`.
 */

// Canvas
export * from "./canvas/canvas-chrome";
export { default as CanvasPill } from "./canvas/canvas-pill.svelte";
export { default as CanvasPillDivider } from "./canvas/canvas-pill-divider.svelte";
export { default as CanvasPillButton } from "./canvas/canvas-pill-button.svelte";
export { default as CanvasStatusChip } from "./canvas/canvas-status-chip.svelte";
export { default as CanvasSurface } from "./canvas/canvas-surface.svelte";
export { default as CanvasDraftBox } from "./canvas/canvas-draft-box.svelte";
export { default as PresenceCursor } from "./canvas/presence-cursor.svelte";
export { default as PresenceLayer } from "./canvas/presence-layer.svelte";
export { default as CanvasMinimap } from "./canvas/canvas-minimap.svelte";
export { default as CanvasActionPill, CANVAS_EXPORT_FORMATS } from "./canvas/canvas-action-pill.svelte";
export type { CanvasExportFormat } from "./canvas/canvas-action-pill.svelte";
export { default as CanvasHeaderPill } from "./canvas/canvas-header-pill.svelte";
export { default as CanvasToolbar, SPACES_TOOL_GROUPS, LOCAL_CANVAS_TOOL_GROUPS } from "./canvas/canvas-toolbar.svelte";
export type { CanvasToolItem } from "./canvas/canvas-toolbar.svelte";
export { default as CanvasPagesPanel } from "./canvas/canvas-pages-panel.svelte";
export type { CanvasPageDropIndicator } from "./canvas/canvas-pages-panel.svelte";
export { default as CanvasNodeFrame } from "./canvas/canvas-node-frame.svelte";
export { default as CanvasNote } from "./canvas/canvas-note.svelte";
export { default as CanvasText } from "./canvas/canvas-text.svelte";
export { default as CanvasShape } from "./canvas/canvas-shape.svelte";
export { default as CanvasFrame } from "./canvas/canvas-frame.svelte";
export { default as CanvasMedia } from "./canvas/canvas-media.svelte";
export { CANVAS_FIELD_CLASS } from "./canvas/canvas-nodes-shared";
export type * from "./canvas/types";

// Code surfaces
export * from "./code-surface/code-surface";
export { default as TerminalPalette } from "./code-surface/terminal-palette.svelte";
export { default as TerminalStopControl } from "./code-surface/terminal-stop-control.svelte";
export { default as TerminalCommandInput } from "./code-surface/command-input.svelte";
export { default as TerminalStatus } from "./code-surface/terminal-status.svelte";
export { default as CommandSuggestions, commandSuggestionId } from "./code-surface/command-suggestions.svelte";
export type { CommandSuggestion } from "./code-surface/command-suggestions.svelte";
export { default as EditorBreadcrumbs } from "./code-surface/editor-breadcrumbs.svelte";
export { default as EditorFrame } from "./code-surface/editor-frame.svelte";
export { default as EditorPreview } from "./code-surface/editor-preview.svelte";
export type { EditorPreviewLine, EditorPreviewToken } from "./code-surface/editor-preview.svelte";
export { default as EditorStatusBar } from "./code-surface/editor-status-bar.svelte";
export { default as FindBar } from "./code-surface/find-bar.svelte";
export type { FindFlag } from "./code-surface/find-bar.svelte";
export { default as TerminalBlock } from "./code-surface/terminal-block.svelte";
export { default as TerminalOutput } from "./code-surface/terminal-output.svelte";
