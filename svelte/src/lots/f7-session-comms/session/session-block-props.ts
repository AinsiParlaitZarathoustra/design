import type { ComponentProps } from "svelte";
import type SessionTimeline from "./session-timeline.svelte";
import type StreamingMarkdown from "./streaming-markdown.svelte";
import type TurnRow from "./turn-row.svelte";

/**
 * The public prop types of the session blocks, the counterparts of the
 * oracle's `StreamingMarkdownProps`, `TurnRowProps` and `SessionTimelineProps`.
 * Taken from the components, so they cannot drift from what they accept.
 */

/** The markdown that formats live as it streams (`StreamingMarkdown`). */
export type StreamingMarkdownProps = ComponentProps<typeof StreamingMarkdown>;

/** One turn: the prompt, what the agent did, the commits and how it ended. */
export type TurnRowProps = ComponentProps<typeof TurnRow>;

/** A whole session: the head, then every turn on the rail. */
export type SessionTimelineProps = ComponentProps<typeof SessionTimeline>;
