// The f7-session-comms lot's public surface: the ported team-chat and session
// blocks. The pilot re-exports this file from `src/index.ts`.

export { default as CommsComposerShell } from "./comms/comms-composer-shell.svelte";
export type { CommsComposerSendState } from "./comms/comms-composer-shell.svelte";
export { default as CommsConversationRow } from "./comms/comms-conversation-row.svelte";
export type { CommsConversationSelect } from "./comms/comms-conversation-row.svelte";
export { default as CommsMessageRow } from "./comms/comms-message-row.svelte";
export type { CommsMessageRowProps } from "./comms/comms-message-row.svelte";
export { default as CommsDayDivider } from "./comms/comms-day-divider.svelte";
export { default as CommsUnreadLine } from "./comms/comms-unread-line.svelte";
export { DEFAULT_COMMS_MESSAGE_ROW_LABELS } from "./comms/comms-message-labels";
export type { CommsMessageRowLabels, CommsMessageRowPermissions } from "./comms/comms-message-labels";
export { transcriptRows, reactionChips, conversationTitle, unreadBadge, formatClock, formatDayLabel } from "./comms/comms-view-helpers";
export type * from "./comms/comms-view";

export { default as SessionPipeline } from "./session/session-pipeline.svelte";
export { stepsOf } from "./session/session-pipeline.svelte";
export { default as SessionTimeline } from "./session/session-timeline.svelte";
export { default as StreamingMarkdown } from "./session/streaming-markdown.svelte";
export { default as TurnRow } from "./session/turn-row.svelte";
export type {
  SessionTimelineProps,
  StreamingMarkdownProps,
  TurnRowProps,
} from "./session/session-block-props";
export {
  EMPTY_SPLIT,
  hasReferenceDefinitions,
  isIncompleteCodeFence,
  splitIncremental,
  splitTopLevelBlocks,
} from "./session/markdown-blocks";
export type { BlockSplit } from "./session/markdown-blocks";
export * from "./session/session-view-helpers";
export type * from "./session/session-view";
export { useWindow } from "./session/use-window.svelte";
export { default as ToolCallCard, TOOL_KIND_ICON } from "./session/tool-call-card.svelte";
export { default as DefaultDiff } from "./session/default-diff.svelte";
export { DEFAULT_TOOL_CALL_CARD_LABELS } from "./session/tool-call-labels";
export type { ToolCallCardLabels, CopyPayload } from "./session/tool-call-labels";
