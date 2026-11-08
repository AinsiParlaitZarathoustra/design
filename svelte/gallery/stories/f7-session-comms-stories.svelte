<script lang="ts">
  import { Plus, Mic, Bold, Italic, Link } from "lucide-svelte";
  import FaceSlightlySmiling from "../../src/lots/f7-session-comms/deps/face-slightly-smiling.svelte";
  import CommsComposerShell from "../../src/lots/f7-session-comms/comms/comms-composer-shell.svelte";
  import CommsConversationRow from "../../src/lots/f7-session-comms/comms/comms-conversation-row.svelte";
  import CommsEditor from "../../src/lots/f7-session-comms/demos/comms-editor.svelte";
  import CommsConversationList from "../../src/lots/f7-session-comms/demos/comms-conversation-list.svelte";
  import CommsMessageRow from "../../src/lots/f7-session-comms/comms/comms-message-row.svelte";
  import CommsDayDivider from "../../src/lots/f7-session-comms/comms/comms-day-divider.svelte";
  import CommsUnreadLine from "../../src/lots/f7-session-comms/comms/comms-unread-line.svelte";
  import CommsTranscript from "../../src/lots/f7-session-comms/demos/comms-transcript.svelte";
  import CommsMessageFocus from "../../src/lots/f7-session-comms/demos/comms-message-focus.svelte";
  import {
    BASE,
    COMMS_REACTION_EMOJI,
    conversationRows,
    message,
    transcript,
  } from "../../src/lots/f7-session-comms/fixtures/comms-fixtures";
  import rehypeHighlight from "rehype-highlight";
  import StreamingMarkdown from "../../src/lots/f7-session-comms/session/streaming-markdown.svelte";
  import StreamingMarkdownStreamer from "../../src/lots/f7-session-comms/demos/streaming-markdown-streamer.svelte";
  import TurnRow from "../../src/lots/f7-session-comms/session/turn-row.svelte";
  import SessionTimeline from "../../src/lots/f7-session-comms/session/session-timeline.svelte";
  import SessionFrame from "../../src/lots/f7-session-comms/demos/session-frame.svelte";
  import SessionTimelineStreamer from "../../src/lots/f7-session-comms/demos/session-timeline-streamer.svelte";
  import SessionTimelineDeepLink from "../../src/lots/f7-session-comms/demos/session-timeline-deep-link.svelte";
  import SessionTimelineDeepClose from "../../src/lots/f7-session-comms/demos/session-timeline-deep-close.svelte";
  import SessionTimelineReveal from "../../src/lots/f7-session-comms/demos/session-timeline-reveal.svelte";
  import ModelMark from "../../src/lots/f4-ui-second-half-patterns/model-mark.svelte";
  import Avatar from "../../src/lots/f3-ui-first-half/avatar.svelte";
  import AvatarFallback from "../../src/lots/f3-ui-first-half/avatar-fallback.svelte";
  import TurnControlledOpen from "../../src/lots/f7-session-comms/demos/turn-controlled-open.svelte";
  import TurnControlledRun from "../../src/lots/f7-session-comms/demos/turn-controlled-run.svelte";
  import TurnReadTheRestHost from "../../src/lots/f7-session-comms/demos/turn-read-the-rest-host.svelte";
  import type {
    AgentItem,
    AttachmentView,
    CheckpointView,
  } from "../../src/lots/f7-session-comms/session/session-view";
  import SessionPipeline from "../../src/lots/f7-session-comms/session/session-pipeline.svelte";
  import ToolCallCard from "../../src/lots/f7-session-comms/session/tool-call-card.svelte";
  import DefaultDiff from "../../src/lots/f7-session-comms/session/default-diff.svelte";
  import ToolCallBox from "../../src/lots/f7-session-comms/demos/tool-call-box.svelte";
  import PlayClick from "../../src/lots/f7-session-comms/demos/play-click.svelte";
  import ToolCallLoading from "../../src/lots/f7-session-comms/demos/tool-call-loading.svelte";
  import type { SessionView } from "../../src/lots/f7-session-comms/session/session-view";
  import {
    at,
    attachmentsTurn,
    cancelledSession,
    editRunTurn,
    erroredSession,
    hugeOutputCalls,
    hugeTurnsSession,
    longAnswerTurn,
    longSession,
    manyToolCallsSession,
    planSession,
    streamingSession,
    streamingSource,
    toolCall,
    truncatedBodiesTurn,
    turn,
    webShapedSession,
  } from "../../src/lots/f7-session-comms/fixtures/session-fixtures";
  import IconButton from "../../src/ui/icon-button.svelte";
  import Button from "../../src/ui/button.svelte";

  interface Props {
    story?: string;
  }

  let { story = "blocks-comms-conversationrow--channel" }: Props = $props();

  const rows = conversationRows();
  const row = (id: string) => rows.find((r) => r.id === id)!;
  /** Counts a callback on the document, so a story's play can be checked from outside. */
  const hook = (key: string) => () => {
    const calls = Number(document.documentElement.dataset[`call${key}`] ?? 0);
    document.documentElement.dataset[`call${key}`] = String(calls + 1);
  };

  /** `onCopy`: counted, and resolves true as the app's clipboard write would. */
  const copyOk = async () => {
    hook("copy")();
    return true;
  };
  const huge = hugeOutputCalls();
  const PATCH = [
    "@@ -1,6 +1,7 @@",
    " import type { Row } from './types'",
    "-export function sortSessions(rows: Row[]) {",
    "-  return rows",
    "+export function sortSessions(rows: Row[]): Row[] {",
    "+  // Pinned, then unread, then everything else.",
    "+  return [...rows].sort((a, b) => rank(a) - rank(b))",
    " }",
  ].join("\n");

  const STATIC_SOURCE = [
    "# Sorting sessions",
    "",
    "Pinned sessions now sort **first**, then unread, then the rest by `lastActivityAt`.",
    "",
    "## What changed",
    "",
    "- The sort moved into `sortSessions`",
    "  - the list reads it",
    "  - so does the jump menu",
    "- Snoozed sessions sink to the end",
    "",
    "1. Pin a session",
    "2. Reload",
    "",
    "- [x] Port the sort",
    "- [ ] Remove the old comparator",
    "",
    "| Group | Order | Notes |",
    "| --- | --- | --- |",
    "| Pinned | 1 | in pin order |",
    "| Unread | 2 | newest first |",
    "| Snoozed | 3 | until they wake |",
    "",
    "> The jump menu used to keep its own copy of the comparator, which is how the two drifted.",
    "",
    "```ts",
    "export function sortSessions(rows: Row[]): Row[] {",
    "  // Pinned, then unread, then everything else.",
    "  return [...rows].sort((a, b) => rank(a) - rank(b) || b.at - a.at)",
    "}",
    "```",
    "",
    "```rust",
    "fn rank(row: &Row) -> u8 {",
    "    if row.pinned { 0 } else if row.unread { 1 } else { 2 }",
    "}",
    "```",
    "",
    "```bash",
    "bun run test src/features/sidebar/sort.test.ts --reporter=dot",
    "```",
    "",
    "See [the sidebar decision](https://example.com/adr/sidebar) for why.",
  ].join("\n");

  const LONG_SOURCE = Array.from({ length: 12 }, () => streamingSource).join("\n\n---\n\n");

  const MINUTE = 60_000;
  const tr = transcript();
  const reactions = tr[2]!.reactions;
  const allCan = { react: true, reply: true, edit: true, delete: true, pin: true };
  /** The message row's callbacks: counted on the document, as the stories' `fn()` mocks are. */
  const rowHandlers = {
    onReact: hook("react"),
    onReply: hook("reply"),
    onEdit: hook("edit"),
    onDelete: hook("delete"),
    onTogglePin: hook("togglePin"),
    onCopyText: hook("copyText"),
    onCopyLink: hook("copyLink"),
    onJumpToReply: hook("jumpToReply"),
    onRetry: hook("retry"),
  };
  const pipelineLongText: SessionView = {
    ...planSession(),
    meta: {
      title: "Rewrite the session sidebar so pinned, unread and snoozed sessions sort into one list",
      agent: "Claude Code",
    },
    plan: [
      {
        content: "Edit src/features/sidebar/components/session-list-row-with-pin-and-unread-markers.tsx",
        status: "in_progress",
      },
    ],
  };
  const pipelineEmpty: SessionView = {
    meta: { ref: "ses-5124", agent: "Codex" },
    phase: "queued",
    turns: [],
  };
  const REHYPE = [rehypeHighlight];

  // Session/TurnRow: the oracle's own fixtures, built once.
  const turnUserAndAnswer = longSession(3).turns[2]!;
  const turnStreaming = streamingSession().turns.at(-1)!;
  const streamingNow = streamingSession().streaming;
  const turnLongPrompt = turn({
    key: "long-prompt",
    user: {
      id: "lp",
      text: Array.from(
        { length: 30 },
        (_, i) => `Line ${i + 1}: the sidebar should keep pinned sessions above unread ones.`,
      ).join("\n\n"),
      at: at(0),
    },
  });
  const turnRetrying = { ...turnStreaming, outcome: undefined };
  const retryingStreaming = {
    activity: "waiting" as const,
    retry: { attempt: 2, maxAttempts: 5, delayMs: 4000, lastError: "overloaded" },
    compacting: true,
  };
  const turnFailed = erroredSession().turns.at(-1)!;
  const turnFailedOther = {
    ...turnFailed,
    outcome: {
      kind: "failed" as const,
      error: { kind: "fatal" as const, message: "The agent exited with code 1." },
    },
  };
  const turnCancelled = cancelledSession().turns.at(-1)!;
  const turnMany = manyToolCallsSession().turns[0]!;
  const turnWeb = webShapedSession().turns[0]!;
  const turnPlan = planSession().turns[0]!;
  const turnEditRun = editRunTurn();
  const turnLongAnswer = longAnswerTurn();
  const turnTruncatedStates = truncatedBodiesTurn({ user: "loading", answer: "failed" });
  const openAttachment = (attachment: AttachmentView, index: number) => {
    void attachment;
    void index;
    hook("openAttachment")();
  };
  const loadBody = hook("loadBody");

  // Session/SessionTimeline: the oracle's own fixtures and stories, built once.
  const timelineLong = longSession();
  const timelineErrored = erroredSession();
  const timelineDisconnected: SessionView = {
    ...longSession(2),
    phase: "failed",
    error: {
      kind: "disconnected",
      message: "The agent disconnected. Send a message to restart it.",
    },
  };
  const timelineCancelled = cancelledSession();
  const timelineMany = manyToolCallsSession();
  const timelineLive = hugeTurnsSession(400);
  const timelineWeb = webShapedSession();
  const timelinePhone = longSession();
  const timelineReadTheRest: SessionView = {
    ...webShapedSession(),
    turns: [truncatedBodiesTurn()],
  };
  function agentStartedSession(): SessionView {
    const base = longSession(3);
    const [, , last] = base.turns;
    return { ...base, turns: [...base.turns.slice(0, 2), { ...last!, user: undefined }] };
  }
  const timelineAgentStarted = agentStartedSession();
  function hugeSession(): SessionView {
    const base = hugeTurnsSession(2_000);
    const last = base.turns.at(-1)!;
    return {
      ...base,
      turns: [
        ...base.turns.slice(0, -1),
        {
          ...last,
          items: [
            ...last.items,
            ...hugeOutputCalls().map((call) => ({ kind: "tool" as const, call })),
          ],
        },
      ],
    };
  }
  const timelineHuge = hugeSession();
  const STATIC_CLASS = "max-w-2xl";
  const rowBase = { reactionEmoji: COMMS_REACTION_EMOJI, can: allCan, ...rowHandlers };
</script>

{#snippet attachButton()}
  <IconButton size="lg" shape="round" icon={Plus} label="Attach a file" />
{/snippet}
{#snippet emojiButton()}
  <IconButton size="lg" shape="round" icon={FaceSlightlySmiling} label="Emoji" />
{/snippet}
{#snippet line(text: string)}
  <p>{text}</p>
{/snippet}
{#snippet box(name: string)}
  <div
    class="flex h-20 max-w-80 items-center justify-center rounded-lg border border-border-subtle bg-card text-xs text-muted-foreground"
  >
    {name}
  </div>
{/snippet}
{#snippet chip(name: string)}
  <span
    class="flex h-control-md max-w-56 items-center rounded-md border border-border bg-card px-2 text-xs text-secondary-foreground"
    >{name}</span
  >
{/snippet}

{#snippet signIn()}
  <Button size="sm" variant="destructive-outline">Sign in</Button>
{/snippet}
{#snippet itemFooter(item: AgentItem | { kind: "user"; id: string })}
  <p class="py-1 font-mono text-2xs text-disabled">
    footer · {item.kind === "tool" ? item.call.id : item.id}
  </p>
{/snippet}
{#snippet checkpointFooter(checkpoint: CheckpointView)}
  {#if checkpoint.id === "e6"}
    <p class="mt-2 text-xs text-muted-foreground">
      <span class="text-secondary-foreground">Adib</span> commented on this
    </p>
  {/if}
{/snippet}
{#snippet reasoningLabel(state: { streaming: boolean })}
  {state.streaming ? "Thinking" : "Reasoning"}
{/snippet}

{#snippet agentDefault()}
  <ModelMark family="claude" class="size-4" />
{/snippet}
{#snippet authorFaceAvatar()}
  <Avatar size="lg">
    <AvatarFallback>UM</AvatarFallback>
  </Avatar>
{/snippet}

{#if story === "blocks-comms-conversationrow--channel"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-general")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--private-channel"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow
      conversation={{ ...row("c-incidents"), unread: 0, mentions: 0 }}
      onSelect={hook("select")}
    />
  </div>
{:else if story === "blocks-comms-conversationrow--selected"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-general")} selected onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--unread"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-design")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--mentions"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("g-review")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--many-unread"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={{ ...row("c-incidents"), mentions: 0 }} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--direct-message-online"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("d-lin")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--direct-message-offline"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("d-kofi")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--group"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("g-named")} onSelect={hook("select")}>
      {#snippet trailing()}
        <span class="shrink-0 text-xs text-muted-foreground tabular-nums">4</span>
      {/snippet}
    </CommsConversationRow>
  </div>
{:else if story === "blocks-comms-conversationrow--archived"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-old")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--long-name"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-long")} onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-conversationrow--list"}
  <div class="w-64 bg-background py-1">
    <CommsConversationList />
  </div>
{:else if story === "blocks-comms-conversationrow--disabled-row"}
  <div class="w-64 bg-background py-1">
    <CommsConversationRow conversation={row("c-design")} disabled onSelect={hook("select")} />
  </div>
{:else if story === "blocks-comms-composershell--empty"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--can-send"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor value="Shipping the composer after lunch." />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--sending"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      sending
      sendLabel="Waiting for uploads…"
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--replying"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      replyTo={{ authorName: "Lin Mei", preview: "Does the presence dot still read on light?" }}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor autofocus />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--replying-to-deleted"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      replyTo={{ authorName: "Lin Mei", preview: "" }}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--editing"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      editing
      canSend
      sendLabel="Save edit"
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor value="The keycap badge reads on light themes now." />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--with-attachments"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
      {#snippet attachments()}
        {@render chip("screenshot-light.png")}
        {@render chip("badge-keycap-dark.png")}
      {/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--read-only"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      readOnly="This channel is archived"
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--custom-send"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
      {#snippet send()}
        <IconButton size="lg" shape="round" icon={Mic} label="Record a voice message" />
      {/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--format-row"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
      {#snippet formatRow()}
        <IconButton size="sm" icon={Bold} label="Bold" />
        <IconButton size="sm" icon={Italic} label="Italic" />
        <IconButton size="sm" icon={Link} label="Link" />
      {/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--drop-active"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      dropActive
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--invalid"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      invalid
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor value="A very long message…" />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--with-popup"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend={false}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor autofocus />{/snippet}
      {#snippet popup()}
        <div
          role="listbox"
          aria-label="Mention"
          class="absolute right-2 bottom-full left-2 z-popover mb-1 rounded-lg border border-border bg-popover p-1 shadow-lg"
        >
          {#each ["Lin Mei", "Sam Ortiz"] as name, i (name)}
            <div
              role="option"
              aria-selected={i === 0}
              class="flex h-control-md items-center rounded px-2 text-xs text-foreground aria-selected:bg-element-selected"
            >
              {name}
            </div>
          {/each}
        </div>
      {/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--editing-with-preview"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      editing
      canSend
      sendLabel="Save edit"
      editPreview="The keycap badge reads on light themes."
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor value="The keycap badge reads on light themes now." />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--render-send"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend
      escapeToCancel={false}
      replyTo={{ authorName: "Lin Mei", preview: "Ship it?" }}
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor value="Yes." autofocus />{/snippet}
      {#snippet renderSend({ canSend: enabled, label, onSend: send })}
        <Button size="sm" disabled={!enabled} onclick={send}>{label}</Button>
      {/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-composershell--custom-send-label"}
  <div class="max-w-md bg-background pt-10">
    <CommsComposerShell
      canSend
      sendLabel="Save edit"
      editing
      onSend={hook("send")}
      onCancelReply={hook("cancelReply")}
      onCancelEdit={hook("cancelEdit")}
      toolsStart={attachButton}
      toolsEnd={emojiButton}
    >
      {#snippet editor()}<CommsEditor />{/snippet}
    </CommsComposerShell>
  </div>
{:else if story === "blocks-comms-messagerow--head"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={message()} head={true}>
      {#snippet body()}{@render line(message().body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--continuation"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={message()} head={true}>
      {#snippet body()}{@render line(message().body)}{/snippet}
    </CommsMessageRow>
    <CommsMessageRow
      {...rowBase}
      message={message({ id: "m-2", seq: 2, at: BASE + MINUTE, body: "And on Dracula." })}
      head={false}
    >
      {#snippet body()}{@render line("And on Dracula.")}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--reply"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={tr[5]!} head={true}>
      {#snippet body()}{@render line(tr[5]!.body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--reply-to-deleted"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={tr[9]!} head={true}>
      {#snippet body()}{@render line(tr[9]!.body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--reply-missing"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={tr[15]!} head={true}>
      {#snippet body()}{@render line(tr[15]!.body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--reactions"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={message({ reactions })} head={true}>
      {#snippet body()}{@render line(message().body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--pinned"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={message({ pinned: true })} head={true}>
      {#snippet body()}{@render line(message().body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--edited"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={message({ editedAt: BASE + MINUTE })} head={true}>
      {#snippet body()}{@render line(message().body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--sending"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={message({ send: "sending" })} head={true}>
      {#snippet body()}{@render line(message().body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--failed"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={message({ send: "failed" })} head={true}>
      {#snippet body()}{@render line(message().body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--deleted"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={message({ deleted: true, reactions })} head={true}>
      {#snippet body()}{@render line(message().body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--integration"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={tr[11]!} head={true}>
      {#snippet body()}{@render line(tr[11]!.body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--integration-via"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={tr[12]!} head={true}>
      {#snippet body()}{@render line(tr[12]!.body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--editing"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={message()} head={true} editing={true}>
      {#snippet body()}{@render line(message().body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--with-attachments"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={message()} head={true}>
      {#snippet body()}{@render line(message().body)}{/snippet}
      {#snippet attachments()}{@render box("screenshot.png")}{/snippet}
      {#snippet references()}{@render box("Session reference")}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--long-name"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={tr[3]!} head={true}>
      {#snippet body()}{@render line(tr[3]!.body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--toolbar-on-focus"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageFocus {...rowBase} message={message({ reactions })} head={true}>
      {#snippet body()}{@render line(message().body)}{/snippet}
    </CommsMessageFocus>
  </div>
{:else if story === "blocks-comms-messagerow--author-name-slot"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow {...rowBase} message={message()} head={true}>
      {#snippet body()}{@render line(message().body)}{/snippet}
      {#snippet authorName()}
        <button type="button" class="cursor-pointer font-semibold hover:underline">Lin Mei</button>
      {/snippet}
    </CommsMessageRow>
    <CommsMessageRow {...rowBase} message={tr[11]!} head={true}>
      {#snippet body()}{@render line(tr[11]!.body)}{/snippet}
      {#snippet authorName()}
        <button type="button">Not a person</button>
      {/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--custom-labels"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsMessageRow
      {...rowBase}
      message={message({ editedAt: BASE + MINUTE, pinned: true, send: "failed", reactions })}
      head={true}
      labels={{
        edited: "modifié",
        failed: "échec de l’envoi",
        retry: "Réessayer",
        pinned: "Épinglé",
        more: "Plus",
      }}
    >
      {#snippet body()}{@render line(message().body)}{/snippet}
    </CommsMessageRow>
  </div>
{:else if story === "blocks-comms-messagerow--transcript"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsTranscript />
  </div>
{:else if story === "blocks-comms-messagerow--unread-line-label"}
  <div class="max-w-xl bg-background px-2 pt-6 pb-2">
    <CommsUnreadLine />
    <CommsUnreadLine label="3 new messages" />
    <CommsDayDivider at={BASE} now={BASE} />
    <CommsDayDivider at={BASE - 24 * 60 * MINUTE} now={BASE} />
  </div>
{:else if story === "session-sessionpipeline--plan-steps"}
  <SessionPipeline session={planSession()} class="w-96" />
{:else if story === "session-sessionpipeline--tool-steps"}
  <SessionPipeline session={manyToolCallsSession(12)} class="w-96" />
{:else if story === "session-sessionpipeline--empty"}
  <SessionPipeline session={pipelineEmpty} class="w-96" />
{:else if story === "session-sessionpipeline--long-text"}
  <SessionPipeline session={pipelineLongText} class="w-96" />
{:else if story === "session-toolcallcard--default"}
  <ToolCallBox>
    <ToolCallCard
      call={toolCall({
        id: "default",
        kind: "read",
        title: "Read",
        paths: ["src/features/sidebar/sort.ts"],
        input: { text: '{"path":"src/features/sidebar/sort.ts"}' },
        output: { text: "export function sortSessions(rows) {\n  return rows\n}" },
      })}
    />
  </ToolCallBox>
{:else if story === "session-toolcallcard--statuses"}
  <ToolCallBox>
    <ToolCallCard
      call={toolCall({ id: "p", kind: "execute", status: "pending", title: "bun run lint" })}
    />
    <ToolCallCard
      call={toolCall({
        id: "r",
        kind: "execute",
        status: "running",
        title: "bun run test",
        durationMs: undefined,
      })}
    />
    <ToolCallCard
      call={toolCall({
        id: "c",
        kind: "search",
        status: "completed",
        title: 'Search "sortSessions"',
        durationMs: 4200,
      })}
    />
    <ToolCallCard
      call={toolCall({
        id: "f",
        kind: "fetch",
        status: "failed",
        title: "Fetch https://example.com",
        durationMs: 72_000,
      })}
    />
  </ToolCallBox>
{:else if story === "session-toolcallcard--diff"}
  <ToolCallBox>
    <ToolCallCard
      defaultOpen
      call={toolCall({
        id: "diff",
        kind: "edit",
        title: "Edit",
        paths: ["src/features/sidebar/sort.ts"],
        diffs: [{ path: "src/features/sidebar/sort.ts", patch: PATCH, insertions: 3, deletions: 2 }],
      })}
    />
  </ToolCallBox>
{:else if story === "session-toolcallcard--new-file"}
  <ToolCallBox>
    <ToolCallCard
      defaultOpen
      call={toolCall({
        id: "new",
        kind: "edit",
        title: "Write",
        paths: ["src/features/sidebar/rank.ts"],
        diffs: [
          {
            path: "src/features/sidebar/rank.ts",
            change: "added",
            insertions: 3,
            deletions: 0,
            newText:
              "export function rank(row: Row): number {\n  return row.pinned ? 0 : row.unread ? 1 : 2\n}\n",
          },
        ],
      })}
    />
  </ToolCallBox>
{:else if story === "session-toolcallcard--terminal"}
  <ToolCallBox>
    <ToolCallCard
      defaultOpen
      call={toolCall({
        id: "term",
        kind: "execute",
        status: "failed",
        title: "bun run typecheck",
        durationMs: 8_400,
        terminal: {
          command: "bun run typecheck",
          output:
            "$ tsc --noEmit\n\u001b[31msrc/sort.ts(3,7): error TS2322:\u001b[0m Type 'string' is not assignable to type 'number'.\n\u001b[2mFound 1 error.\u001b[0m",
          exitCode: 2,
        },
      })}
    />
  </ToolCallBox>
{:else if story === "session-toolcallcard--truncated-payload"}
  <ToolCallBox>
    <ToolCallCard
      defaultOpen
      onLoadPayload={hook("loadPayload")}
      call={toolCall({
        id: "trunc",
        kind: "execute",
        title: "bun run test",
        input: { text: '{"command":"bun run test"}' },
        output: { text: "✓ 412 tests passed\n✓ 18 suites…", truncated: true, bytes: 96_400 },
      })}
    />
  </ToolCallBox>
{:else if story === "session-toolcallcard--truncated-payload-loading"}
  <ToolCallBox>
    <PlayClick text="Load full output">
      <ToolCallLoading />
    </PlayClick>
  </ToolCallBox>
{:else if story === "session-toolcallcard--truncated-payload-states"}
  <ToolCallBox>
    <ToolCallCard
      defaultOpen
      onLoadPayload={hook("loadPayload")}
      call={toolCall({
        id: "trunc-states",
        kind: "edit",
        title: "Edit src/features/sidebar/sort.ts",
        input: {
          text: '{"path":"src/features/sidebar/sort.ts","old_string":"…',
          truncated: true,
          bytes: 18_220,
          load: "loading",
        },
        output: { text: "The file was…", truncated: true, bytes: 4_210, load: "failed" },
      })}
    />
  </ToolCallBox>
{:else if story === "session-toolcallcard--binary"}
  <ToolCallBox>
    <ToolCallCard
      defaultOpen
      call={toolCall({
        id: "bin",
        title: "Read",
        paths: ["assets/screenshot.png"],
        output: { text: null, binary: true, bytes: 482113 },
      })}
    />
  </ToolCallBox>
{:else if story === "session-toolcallcard--empty"}
  <ToolCallBox>
    <ToolCallCard defaultOpen call={toolCall({ id: "empty", kind: "think", title: "Update the plan" })} />
  </ToolCallBox>
{:else if story === "session-toolcallcard--long-title"}
  <ToolCallBox>
    <ToolCallCard
      call={toolCall({
        id: "long",
        kind: "read",
        name: "Read",
        paths: [
          "src/features/sidebar/components/session-list-row-with-pin-and-unread-markers-and-a-very-long-name.tsx",
        ],
        durationMs: 1_240,
      })}
    />
  </ToolCallBox>
{:else if story === "session-toolcallcard--huge-output"}
  <ToolCallBox>
    <PlayClick text="Show 2,000 more lines">
      <ToolCallCard defaultOpen call={huge[0]!} />
    </PlayClick>
  </ToolCallBox>
{:else if story === "session-toolcallcard--huge-diff"}
  <ToolCallBox>
    <ToolCallCard defaultOpen call={huge[1]!} />
  </ToolCallBox>
{:else if story === "session-toolcallcard--default-diff-alone"}
  <ToolCallBox>
    <div class="p-3">
      <DefaultDiff
        diff={{ path: "src/features/sidebar/sort.ts", patch: PATCH, insertions: 3, deletions: 2 }}
      />
    </div>
  </ToolCallBox>
{:else if story === "session-toolcallcard--copy-payloads"}
  <ToolCallBox>
    <PlayClick ariaLabel="Copy">
      <ToolCallCard
        defaultOpen
        onCopy={copyOk}
        call={toolCall({
          id: "copy",
          kind: "execute",
          title: "bun run typecheck",
          input: { text: '{"command":"bun run typecheck"}' },
          terminal: { command: "bun run typecheck", output: "$ tsc --noEmit -p tsconfig.json\n" },
        })}
      />
    </PlayClick>
  </ToolCallBox>
{:else if story === "session-toolcallcard--custom-labels"}
  <ToolCallBox>
    <ToolCallCard
      defaultOpen
      onCopy={copyOk}
      onLoadPayload={hook("loadPayload")}
      labels={{
        copy: "Copier",
        copied: "Copié",
        loadFull: (part, size) => `Charger tout (${part}${size ? `, ${size}` : ""})`,
      }}
      call={toolCall({
        id: "labels",
        kind: "read",
        title: "Read",
        output: { text: "export const x = 1;", truncated: true, bytes: 96_400 },
      })}
    />
  </ToolCallBox>
{:else if story === "session-streamingmarkdown--static"}
  <StreamingMarkdown source={STATIC_SOURCE} rehypePlugins={REHYPE} class={STATIC_CLASS} />
{:else if story === "session-streamingmarkdown--streaming"}
  <StreamingMarkdownStreamer rehypePlugins={REHYPE} />
{:else if story === "session-streamingmarkdown--long"}
  <StreamingMarkdown source={LONG_SOURCE} rehypePlugins={REHYPE} class={STATIC_CLASS} />
{:else if story === "session-streamingmarkdown--untrusted-input"}
  <StreamingMarkdown
    source={'Raw HTML renders as text: <img src="x" onerror="alert(1)">.\n\nA [javascript: link](javascript:alert(1)) loses its href.'}
    rehypePlugins={REHYPE}
    class={STATIC_CLASS}
  />
{:else if story === "session-turnrow--user-and-answer"}
  <TurnRow turn={turnUserAndAnswer} rehypePlugins={REHYPE} class="max-w-3xl" />
{:else if story === "session-turnrow--streaming"}
  <TurnRow
    turn={turnStreaming}
    streaming={streamingNow}
    rehypePlugins={REHYPE}
    class="max-w-3xl"
  />
{:else if story === "session-turnrow--with-attachments"}
  <TurnRow turn={attachmentsTurn} rehypePlugins={REHYPE} class="max-w-3xl" />
{:else if story === "session-turnrow--long-prompt"}
  <TurnRow turn={turnLongPrompt} rehypePlugins={REHYPE} class="max-w-3xl" />
{:else if story === "session-turnrow--clamped-response"}
  <PlayClick text="Show more" focus={false}>
    <TurnRow turn={turnLongAnswer} rehypePlugins={REHYPE} class="max-w-3xl" clampResponses />
  </PlayClick>
{:else if story === "session-turnrow--run-file-summary"}
  <TurnRow
    turn={turnEditRun}
    rehypePlugins={REHYPE}
    class="max-w-3xl"
    toolRunSummary="files"
  />
{:else if story === "session-turnrow--with-thinking"}
  <TurnRow turn={turnWeb} rehypePlugins={REHYPE} class="max-w-3xl" />
{:else if story === "session-turnrow--with-plan"}
  <TurnRow turn={turnPlan} rehypePlugins={REHYPE} class="max-w-3xl" />
{:else if story === "session-turnrow--with-checkpoint"}
  <TurnRow turn={turnWeb} rehypePlugins={REHYPE} class="max-w-3xl" />
{:else if story === "session-turnrow--failed"}
  <TurnRow
    turn={turnFailed}
    rehypePlugins={REHYPE}
    class="max-w-3xl"
    errorAction={signIn}
  />
{:else if story === "session-turnrow--failed-other"}
  <TurnRow turn={turnFailedOther} rehypePlugins={REHYPE} class="max-w-3xl" />
{:else if story === "session-turnrow--cancelled"}
  <TurnRow turn={turnCancelled} rehypePlugins={REHYPE} class="max-w-3xl" />
{:else if story === "session-turnrow--retrying"}
  <TurnRow
    turn={turnRetrying}
    streaming={retryingStreaming}
    rehypePlugins={REHYPE}
    class="max-w-3xl"
  />
{:else if story === "session-turnrow--many-tool-calls"}
  <TurnRow turn={turnMany} rehypePlugins={REHYPE} class="max-w-3xl" />
{:else if story === "session-turnrow--item-footer"}
  <TurnRow
    turn={turnWeb}
    rehypePlugins={REHYPE}
    class="max-w-3xl"
    renderItemFooter={itemFooter}
  />
{:else if story === "session-turnrow--checkpoint-footer"}
  <TurnRow
    turn={turnWeb}
    rehypePlugins={REHYPE}
    class="max-w-3xl"
    renderCheckpointFooter={checkpointFooter}
  />
{:else if story === "session-turnrow--controlled-open-tool-call"}
  <TurnControlledOpen rehypePlugins={REHYPE} />
{:else if story === "session-turnrow--plain-thinking"}
  <TurnRow
    turn={turnWeb}
    rehypePlugins={REHYPE}
    class="max-w-3xl"
    thinkingBody="text"
    thinkingLabel={reasoningLabel}
  />
{:else if story === "session-turnrow--openable-attachments"}
  <TurnRow
    turn={attachmentsTurn}
    rehypePlugins={REHYPE}
    class="max-w-3xl"
    onOpenAttachment={openAttachment}
  />
{:else if story === "session-turnrow--read-the-rest"}
  <TurnReadTheRestHost rehypePlugins={REHYPE} click="second" />
{:else if story === "session-turnrow--read-the-rest-failed"}
  <TurnReadTheRestHost rehypePlugins={REHYPE} click="first" fail />
{:else if story === "session-turnrow--read-the-rest-states"}
  <TurnRow
    turn={turnTruncatedStates}
    rehypePlugins={REHYPE}
    class="max-w-3xl"
    onLoadBody={loadBody}
  />
{:else if story === "session-turnrow--controlled-tool-run"}
  <TurnControlledRun rehypePlugins={REHYPE} />
{:else if story === "session-sessiontimeline--long"}
  <SessionFrame>
    <SessionTimeline session={timelineLong} rehypePlugins={REHYPE} />
  </SessionFrame>
{:else if story === "session-sessiontimeline--streaming"}
  <SessionFrame>
    <SessionTimelineStreamer rehypePlugins={REHYPE} />
  </SessionFrame>
{:else if story === "session-sessiontimeline--errored"}
  <SessionFrame>
    <SessionTimeline session={timelineErrored} rehypePlugins={REHYPE} errorAction={signIn} />
  </SessionFrame>
{:else if story === "session-sessiontimeline--disconnected"}
  <SessionFrame>
    <SessionTimeline session={timelineDisconnected} rehypePlugins={REHYPE} />
  </SessionFrame>
{:else if story === "session-sessiontimeline--cancelled"}
  <SessionFrame>
    <SessionTimeline session={timelineCancelled} rehypePlugins={REHYPE} />
  </SessionFrame>
{:else if story === "session-sessiontimeline--many-tool-calls"}
  <SessionFrame>
    <SessionTimeline session={timelineMany} rehypePlugins={REHYPE} />
  </SessionFrame>
{:else if story === "session-sessiontimeline--huge-output"}
  <SessionFrame>
    <SessionTimeline session={timelineHuge} rehypePlugins={REHYPE} />
  </SessionFrame>
{:else if story === "session-sessiontimeline--live-from-the-bottom"}
  <SessionFrame>
    <SessionTimeline session={timelineLive} rehypePlugins={REHYPE} grow="up" />
  </SessionFrame>
{:else if story === "session-sessiontimeline--web-shaped"}
  <SessionFrame>
    <SessionTimeline session={timelineWeb} rehypePlugins={REHYPE} />
  </SessionFrame>
{:else if story === "session-sessiontimeline--without-heading"}
  <SessionFrame>
    <SessionTimeline session={timelineWeb} rehypePlugins={REHYPE} heading={false} />
  </SessionFrame>
{:else if story === "session-sessiontimeline--agent-mark"}
  <SessionFrame>
    <SessionTimeline
      session={timelineAgentStarted}
      rehypePlugins={REHYPE}
      agentMark={agentDefault}
    />
  </SessionFrame>
{:else if story === "session-sessiontimeline--author-face"}
  <SessionFrame>
    <SessionTimeline
      session={timelineAgentStarted}
      rehypePlugins={REHYPE}
      agentMark={agentDefault}
      authorFace={authorFaceAvatar}
    />
  </SessionFrame>
{:else if story === "session-sessiontimeline--phone"}
  <SessionFrame>
    <SessionTimeline session={timelinePhone} rehypePlugins={REHYPE} />
  </SessionFrame>
{:else if story === "session-sessiontimeline--deep-link-to-folded-call"}
  <SessionFrame>
    <SessionTimelineDeepLink rehypePlugins={REHYPE} />
  </SessionFrame>
{:else if story === "session-sessiontimeline--read-the-rest"}
  <SessionFrame>
    <SessionTimeline
      session={timelineReadTheRest}
      rehypePlugins={REHYPE}
      onLoadBody={() => {}}
    />
  </SessionFrame>
{:else if story === "session-sessiontimeline--deep-link-then-close"}
  <SessionFrame>
    <SessionTimelineDeepClose rehypePlugins={REHYPE} />
  </SessionFrame>
{:else if story === "session-sessiontimeline--reveal-item"}
  <SessionFrame>
    <SessionTimelineReveal rehypePlugins={REHYPE} />
  </SessionFrame>
{/if}
