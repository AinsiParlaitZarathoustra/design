// Props types of the Svelte components. A React `XProps` is the component's own
// props interface; a Svelte component does not export its `Props`, so each
// alias here is `ComponentProps` of the component, named as React names it.

import type { ComponentProps } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import type Badge from "../../ui/badge.svelte";
import type Button from "../../ui/button.svelte";
import type Icon from "../../ui/icon.svelte";
import type IconButton from "../../ui/icon-button.svelte";
import type Input from "../../ui/input.svelte";
import type Kbd from "../../ui/kbd.svelte";
import type KbdKeys from "../../ui/kbd-keys.svelte";
import type DialogContent from "../../ui/dialog/dialog-content.svelte";
import type TabChip from "../../components/layout/tab-chip.svelte";
import type Switch from "../f1-primitives-forms/switch.svelte";
import type Pill from "../f4-ui-second-half-patterns/pill.svelte";
import type Rail from "../f4-ui-second-half-patterns/rail.svelte";
import type NextPage from "../f4-ui-second-half-patterns/next-page.svelte";
import type StatusDot from "../f4-ui-second-half-patterns/status-dot.svelte";
import type StepList from "../f4-ui-second-half-patterns/step-list.svelte";
import type HintOverlay from "../f2-overlays-menus/hint-overlay.svelte";
import type SearchOverlay from "../f2-overlays-menus/search-overlay.svelte";
import type CommandPalette from "../f2-overlays-menus/command-palette.svelte";
import type CommandPaletteView from "../f2-overlays-menus/command-palette-view.svelte";
import type CommandSuggestions from "../f6-canvas-code/code-surface/command-suggestions.svelte";
import type CommandInput from "../f6-canvas-code/code-surface/command-input.svelte";
import type EditorBreadcrumbs from "../f6-canvas-code/code-surface/editor-breadcrumbs.svelte";
import type EditorFrame from "../f6-canvas-code/code-surface/editor-frame.svelte";
import type EditorPreview from "../f6-canvas-code/code-surface/editor-preview.svelte";
import type EditorStatusBar from "../f6-canvas-code/code-surface/editor-status-bar.svelte";
import type FindBar from "../f6-canvas-code/code-surface/find-bar.svelte";
import type TerminalBlock from "../f6-canvas-code/code-surface/terminal-block.svelte";
import type TerminalOutput from "../f6-canvas-code/code-surface/terminal-output.svelte";
import type TerminalStatus from "../f6-canvas-code/code-surface/terminal-status.svelte";
import type TerminalStopControl from "../f6-canvas-code/code-surface/terminal-stop-control.svelte";
import type CommsComposerShell from "../f7-session-comms/comms/comms-composer-shell.svelte";
import type CommsConversationRow from "../f7-session-comms/comms/comms-conversation-row.svelte";
import type CommsDayDivider from "../f7-session-comms/comms/comms-day-divider.svelte";
import type CommsUnreadLine from "../f7-session-comms/comms/comms-unread-line.svelte";
import type DefaultDiff from "../f7-session-comms/session/default-diff.svelte";
import type SessionPipeline from "../f7-session-comms/session/session-pipeline.svelte";
import type ToolCallCard from "../f7-session-comms/session/tool-call-card.svelte";
import type GradualBlur from "../f8-blocks-foundations/blocks/gradual-blur.svelte";
import type InfiniteSlider from "../f8-blocks-foundations/blocks/infinite-slider.svelte";

export type BadgeProps = ComponentProps<typeof Badge>;
export type ButtonProps = ComponentProps<typeof Button>;
export type IconProps = ComponentProps<typeof Icon>;
export type IconButtonProps = ComponentProps<typeof IconButton>;
export type InputProps = ComponentProps<typeof Input>;
export type KbdProps = ComponentProps<typeof Kbd>;
export type KbdKeysProps = ComponentProps<typeof KbdKeys>;
export type SwitchProps = ComponentProps<typeof Switch>;
export type PillProps = ComponentProps<typeof Pill>;
export type RailProps = ComponentProps<typeof Rail>;
export type NextPageProps = ComponentProps<typeof NextPage>;
export type StatusDotProps = ComponentProps<typeof StatusDot>;
export type StepListProps = ComponentProps<typeof StepList>;
export type TabStripTabProps = ComponentProps<typeof TabChip>;
export type HintOverlayProps = ComponentProps<typeof HintOverlay>;
export type SearchOverlayProps = ComponentProps<typeof SearchOverlay>;
export type CommandPaletteProps = ComponentProps<typeof CommandPalette>;
export type CommandPaletteViewProps = ComponentProps<typeof CommandPaletteView>;
export type CommandSuggestionsProps = ComponentProps<typeof CommandSuggestions>;
export type TerminalCommandInputProps = ComponentProps<typeof CommandInput>;
export type EditorBreadcrumbsProps = ComponentProps<typeof EditorBreadcrumbs>;
export type EditorFrameProps = ComponentProps<typeof EditorFrame>;
export type EditorPreviewProps = ComponentProps<typeof EditorPreview>;
export type EditorStatusBarProps = ComponentProps<typeof EditorStatusBar>;
export type FindBarProps = ComponentProps<typeof FindBar>;
export type TerminalBlockProps = ComponentProps<typeof TerminalBlock>;
export type TerminalOutputProps = ComponentProps<typeof TerminalOutput>;
export type TerminalStatusProps = ComponentProps<typeof TerminalStatus>;
export type TerminalStopControlProps = ComponentProps<typeof TerminalStopControl>;
export type CommsComposerShellProps = ComponentProps<typeof CommsComposerShell>;
export type CommsConversationRowProps = ComponentProps<typeof CommsConversationRow>;
export type CommsDayDividerProps = ComponentProps<typeof CommsDayDivider>;
export type CommsUnreadLineProps = ComponentProps<typeof CommsUnreadLine>;
export type DefaultDiffProps = ComponentProps<typeof DefaultDiff>;
export type SessionPipelineProps = ComponentProps<typeof SessionPipeline>;
export type ToolCallCardProps = ComponentProps<typeof ToolCallCard>;
export type GradualBlurProps = ComponentProps<typeof GradualBlur>;
export type InfiniteSliderProps = ComponentProps<typeof InfiniteSlider>;

/** The dialog's width and frame, read from the Svelte dialog panel's props. */
export type DialogContentSize = NonNullable<ComponentProps<typeof DialogContent>["size"]>;
export type DialogContentVariant = NonNullable<ComponentProps<typeof DialogContent>["variant"]>;

/** The palette's size. The Svelte panel takes `default` and `tall`; `compact` is the React name for the inline pickers. */
export type CommandSize = "default" | "compact";

/** A link's props: the anchor's attributes, with the target required. */
export type LinkProps = Omit<HTMLAnchorAttributes, "href"> & { href: string };
