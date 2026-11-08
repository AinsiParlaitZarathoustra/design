// Public surface of the f3-ui-first-half lot (components/ui, first half).
// The pilot wires this file into `src/index.ts`.
//
// One named export per public component and public type of the React modules
// this lot ports: accordion, agent-icon, atlas-mark, avatar-stack, avatar,
// breadcrumb, callout, code-block, collapsible, empty-state, go-chevron,
// mailbox-icon, message-square-more-icon, brand-marks (components/ui) and
// data-table, segmented (components/patterns). Internal Svelte components
// (accordion context, avatar stack item, scroll edges, …) stay private, as
// their React counterparts are.

// Accordion
export { default as Accordion } from "./accordion.svelte";
export { default as AccordionItem } from "./accordion-item.svelte";
export { default as AccordionTrigger } from "./accordion-trigger.svelte";
export { default as AccordionContent } from "./accordion-content.svelte";

// AgentIcon
export { default as AgentMonogram } from "./agent-monogram.svelte";
export { default as ExternalAgentMark } from "./external-agent-mark.svelte";
export { monogramTextClass } from "./agent-icon";

// AtlasMark
export { default as AtlasBadge } from "./atlas-badge.svelte";
export { default as AtlasMark } from "./atlas-mark.svelte";
export { default as AtlasWordmark } from "./atlas-wordmark.svelte";
export type { AtlasBadgeTone } from "./atlas-badge.svelte";

// Avatar
export { default as Avatar } from "./avatar.svelte";
export { default as AvatarFallback } from "./avatar-fallback.svelte";
export { default as AvatarImage } from "./avatar-image.svelte";
export { default as AvatarGroup } from "./avatar-group.svelte";
export { default as AvatarGroupCount } from "./avatar-group-count.svelte";
export { default as AvatarStack } from "./avatar-stack.svelte";

// Breadcrumb
export { default as Breadcrumb } from "./breadcrumb.svelte";
export { default as BreadcrumbList } from "./breadcrumb-list.svelte";
export { default as BreadcrumbItem } from "./breadcrumb-item.svelte";
export { default as BreadcrumbLink } from "./breadcrumb-link.svelte";
export { default as BreadcrumbPage } from "./breadcrumb-page.svelte";
export { default as BreadcrumbSeparator } from "./breadcrumb-separator.svelte";
export { default as BreadcrumbEllipsis } from "./breadcrumb-ellipsis.svelte";

// Callout
export { default as Callout } from "./callout.svelte";
export { calloutVariants } from "./callout-variants";

// Code block
export { default as Code } from "./code.svelte";
export { default as CodeFence } from "./code-fence.svelte";
export { default as DiffStat } from "./diff-stat.svelte";
export { formatDiffCount } from "./format-diff-count";

// Collapsible
export { default as Collapsible } from "./collapsible.svelte";
export { default as CollapsibleTrigger } from "./collapsible-trigger.svelte";
export { default as CollapsibleContent } from "./collapsible-content.svelte";

// EmptyState
export { default as EmptyState } from "./empty-state.svelte";

// GoChevron
export { default as GoChevron } from "./go-chevron.svelte";

// MailboxIcon
export { default as MailboxIcon } from "./mailbox-icon.svelte";
export type { MailboxIconHandle } from "./mailbox-icon.svelte";

// MessageSquareMoreIcon
export { default as MessageSquareMoreIcon } from "./message-square-more-icon.svelte";
export type { MessageSquareMoreIconHandle } from "./message-square-more-icon.svelte";

// Brand marks
export { default as ClaudeCodeMark } from "./claude-code-mark.svelte";
export { default as ClaudeMark } from "./claude-mark.svelte";
export { default as CodexMark } from "./codex-mark.svelte";
export { default as CursorAgentMark } from "./cursor-agent-mark.svelte";
export { default as CursorMark } from "./cursor-mark.svelte";
export { default as DiscordMark } from "./discord-mark.svelte";
export { default as GeminiMark } from "./gemini-mark.svelte";
export { default as GitHubMark } from "./github-mark.svelte";
export { default as GoogleMark } from "./google-mark.svelte";
export { default as JetBrainsMark } from "./jetbrains-mark.svelte";
export { default as KiloMark } from "./kilo-mark.svelte";
export { default as OpenAIMark } from "./openai-mark.svelte";
export { default as OpenCodeMark } from "./opencode-mark.svelte";
export { default as XMark } from "./x-mark.svelte";
export { default as ZedMark } from "./zed-mark.svelte";
export type { BrandMarkProps } from "./deps/brand-mark-svg.svelte";

// DataTable
export { default as DataTable } from "./data-table.svelte";
export { default as TableSearch } from "./table-search.svelte";
export type { Column, DataTableSort } from "./data-table-types";

// Segmented
export { default as CompoundFilter } from "./compound-filter.svelte";
export { default as SegmentedIconGroup } from "./segmented-icon-group.svelte";
export { default as UnderlineTabs } from "./underline-tabs.svelte";
export type { UnderlineTabOption } from "./underline-tabs.svelte";
