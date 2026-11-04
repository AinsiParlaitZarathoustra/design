// The session entry (`@tryatlas/design/session`): the SessionView types, their
// helpers, and the blocks that render them. A separate entry because
// `StreamingMarkdown` needs `react-markdown`, `remark-gfm`, `remark-parse` and
// `unified`, optional peers an app without session views never installs; the
// root entry imports none of them.
//
// Desktop and web each adapt their own session shape onto `SessionView` (the
// field mapping is in `session-view.ts`) and render it with these.

export * from "./components/session/markdown-blocks.ts";
export * from "./components/session/session-pipeline.tsx";
export * from "./components/session/session-timeline.tsx";
export * from "./components/session/session-view-helpers.ts";
export * from "./components/session/session-view.ts";
export * from "./components/session/streaming-markdown.tsx";
export * from "./components/session/tool-call-card.tsx";
export * from "./components/session/turn-row.tsx";
