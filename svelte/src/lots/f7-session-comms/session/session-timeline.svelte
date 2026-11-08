<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import { Sparkles, User } from "lucide-svelte";
  import type { PluggableList } from "unified";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import Callout from "../../f3-ui-first-half/callout.svelte";
  import Rail from "../../f4-ui-second-half-patterns/rail.svelte";
  import StatusIcon from "../../f4-ui-second-half-patterns/status-icon.svelte";
  import type {
    AgentItem,
    AttachmentView,
    CheckpointView,
    CommentAnchor,
    DiffData,
    SessionPhase,
    SessionView,
  } from "./session-view";
  import { statusIconOf } from "./session-view-helpers";
  import { heldTurns, turnHolds } from "./session-timeline-helpers";
  import type { CopyPayload } from "./tool-call-labels";
  import TurnRow from "./turn-row.svelte";
  import { useWindow } from "./use-window.svelte";

  /**
   * A whole session, read top to bottom: a head that says where it stands, then
   * every turn on a thin rail in the gutter. Desktop's session timeline: the
   * rail is a hairline with a node per turn, so the shape of the session scans
   * without reading a word and the prose keeps the column.
   *
   * Long sessions are windowed, not virtualised (`useWindow`): real DOM rows,
   * grown as the reader nears the edge, so a fast flick never shows blank
   * space. `grow="up"` is for a live session read newest-first, which opens at
   * the bottom and grows upward without moving what the reader is looking at.
   *
   * Only the first rows on screen fade in, once, as a CSS animation and not at
   * all under reduced motion. A row the window adds while the reader scrolls is
   * already where they are looking and appears as it is.
   *
   * Every other prop goes to each `TurnRow`. A turn holding a call in
   * `openToolCallIds` or `openToolRunIds`, or the item `revealItemId` names, is
   * drawn even past the window, so the host can scroll to it.
   */
  interface Props {
    session: SessionView;
    /**
     * An item to keep drawn, by id: a prompt, an answer, a thought, a plan, a
     * tool call or a checkpoint.
     */
    revealItemId?: string;
    /** The head: the phase, the title and the agent line. `false` for a host that draws its own title. */
    heading?: boolean;
    /** The agent's mark, in the rail node of a turn the agent started on its own. */
    agentMark?: Snippet;
    /** The face of whoever prompted, as the rail node of each turn a person started. */
    authorFace?: Snippet;
    /** `down` (the default) for a record read from the top; `up` for a live session. */
    grow?: "down" | "up";
    class?: string;
    commentSlot?: Snippet<[CommentAnchor]>;
    renderMarkdown?: Snippet<[string, boolean]>;
    rehypePlugins?: PluggableList;
    onLoadPayload?: (callId: string, part: "input" | "output") => void;
    renderDiff?: Snippet<[DiffData]>;
    errorAction?: Snippet;
    renderItemFooter?: Snippet<[AgentItem | { kind: "user"; id: string }]>;
    renderCheckpointFooter?: Snippet<[CheckpointView]>;
    clampResponses?: boolean;
    toolRunSummary?: "kinds" | "files";
    openToolCallIds?: ReadonlySet<string>;
    onOpenToolCallIdsChange?: (next: ReadonlySet<string>) => void;
    thinkingLabel?: Snippet<[{ streaming: boolean }]>;
    thinkingBody?: "markdown" | "text";
    onOpenAttachment?: (attachment: AttachmentView, index: number) => void;
    onCopyPayload?: CopyPayload;
    onLoadBody?: (id: string) => void;
    openToolRunIds?: ReadonlySet<string>;
    onOpenToolRunIdsChange?: (next: ReadonlySet<string>) => void;
  }

  let {
    session,
    grow = "down",
    revealItemId,
    heading = true,
    agentMark,
    authorFace,
    class: className,
    commentSlot,
    renderMarkdown,
    rehypePlugins,
    onLoadPayload,
    renderDiff,
    errorAction,
    renderItemFooter,
    renderCheckpointFooter,
    clampResponses,
    toolRunSummary,
    openToolCallIds,
    onOpenToolCallIdsChange,
    thinkingLabel,
    thinkingBody,
    onOpenAttachment,
    onCopyPayload,
    onLoadBody,
    openToolRunIds,
    onOpenToolRunIdsChange,
  }: Props = $props();

  const HEADING: Record<SessionPhase, string> = {
    queued: "Session queued",
    running: "Session running",
    waiting: "Waiting for you",
    done: "Session complete",
    failed: "Session failed",
    cancelled: "Session cancelled",
  };

  /** Rows that fade in on first render. */
  const ENTRANCE_ROWS = 20;

  /** Opaque, so the hairline behind it does not cross the glyph. */
  const NODE =
    "relative flex size-8 shrink-0 items-center justify-center rounded-full border bg-card";

  const turns = $derived(session.turns);
  const meta = $derived(session.meta);
  // `grow` is the window's direction: read once, when the window is made.
  // svelte-ignore state_referenced_locally
  const win = useWindow({ count: () => turns.length, grow });

  const held = $derived(heldTurns(turns, [openToolCallIds, openToolRunIds], revealItemId));
  // Only the turn holding it hears the id, so a new jump re-renders the turn
  // that held it and the one that does now, not every row.
  const revealKey = $derived(
    revealItemId === undefined ? undefined : turns.find((t) => turnHolds(t, revealItemId))?.key,
  );

  // Only ever widens: closing a held card must not unmount the turn under the
  // reader. A list that shrank past it (another session) starts over.
  let reach = $state<{ first: number; last: number } | null>(untrack(() => held));

  $effect(() => {
    const now = held;
    const length = turns.length;
    const current = untrack(() => reach);
    const stale = current !== null && current.last >= length;
    if (now && (stale || !current || now.first < current.first || now.last > current.last)) {
      reach =
        stale || !current
          ? now
          : { first: Math.min(current.first, now.first), last: Math.max(current.last, now.last) };
    } else if (!now && stale) {
      reach = null;
    }
  });

  const stale = $derived(reach !== null && reach.last >= turns.length);
  const start = $derived(reach && !stale ? Math.min(win.start, reach.first) : win.start);
  const end = $derived(reach && !stale ? Math.max(win.end, reach.last + 1) : win.end);
  // Decided once: the rows on screen at mount. Never the ones a window adds.
  const entering = untrack(() => {
    // svelte-ignore state_referenced_locally
    const first = grow === "up" ? turns.slice(-ENTRANCE_ROWS) : turns.slice(0, ENTRANCE_ROWS);
    return new Set(first.map((t) => t.key));
  });
  const visible = $derived(turns.slice(start, end));
  const firstKey = $derived(turns[0]?.key);
  const lastKey = $derived(turns[turns.length - 1]?.key);
  const details = $derived([meta.agent, meta.model, meta.branch].filter(Boolean) as string[]);
  const drawn = (face: Snippet | undefined) => face !== undefined;
</script>

<div data-slot="session-timeline" class={cn("min-w-0", className)}>
  {#if !heading && session.error}
    <Callout tone="error" role="alert" class="mb-4">
      {session.error.message}
    </Callout>
  {/if}
  {#if heading}
    <Rail first last={turns.length === 0}>
      {#snippet node()}
        <span class={cn(NODE, "border-border-strong/50")}>
          <StatusIcon status={statusIconOf(session.phase)} />
        </span>
      {/snippet}
      <div class="flex min-h-8 flex-col justify-center pb-6">
        <span class="text-base font-medium text-foreground">{HEADING[session.phase]}</span>
        {#if meta.title}
          <span class="mt-0.5 text-sm text-secondary-foreground">{meta.title}</span>
        {/if}
        {#if details.length > 0}
          <span class="mt-0.5 truncate font-mono text-xs text-muted-foreground">
            {details.join(" · ")}
          </span>
        {/if}
        {#if session.error}
          <Callout tone="error" role="alert" class="mt-3">
            {session.error.message}
          </Callout>
        {/if}
      </div>
    </Rail>
  {/if}

  {#if grow === "up" && start > 0}
    <div {@attach win.sentinelRef} aria-hidden="true" class="h-px"></div>
  {/if}
  {#each visible as turn, i (turn.key)}
    <div
      class={cn(entering.has(turn.key) && "session-row-in")}
      style:animation-delay={entering.has(turn.key) ? `${Math.min(i, 8) * 30}ms` : null}
    >
      <Rail first={!heading && turn.key === firstKey} last={turn.key === lastKey}>
        {#snippet node()}
          {#if turn.user && drawn(authorFace)}
            <span class="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-card">
              {@render authorFace?.()}
            </span>
          {:else}
            <span class={cn(NODE, "border-border-strong/50 text-secondary-foreground")}>
              {#if !turn.user && drawn(agentMark)}
                {@render agentMark?.()}
              {:else}
                <Icon icon={turn.user ? User : Sparkles} size="md" />
              {/if}
            </span>
          {/if}
        {/snippet}
        <TurnRow
          {turn}
          streaming={turn.key === lastKey ? session.streaming : undefined}
          revealItemId={turn.key === revealKey ? revealItemId : undefined}
          {commentSlot}
          {renderMarkdown}
          {rehypePlugins}
          {onLoadPayload}
          {renderDiff}
          {errorAction}
          {renderItemFooter}
          {renderCheckpointFooter}
          {clampResponses}
          {toolRunSummary}
          {openToolCallIds}
          {onOpenToolCallIdsChange}
          {thinkingLabel}
          {thinkingBody}
          {onOpenAttachment}
          {onCopyPayload}
          {onLoadBody}
          {openToolRunIds}
          {onOpenToolRunIdsChange}
        />
      </Rail>
    </div>
  {/each}
  {#if grow === "down" && end < turns.length}
    <div {@attach win.sentinelRef} aria-hidden="true" class="h-px"></div>
  {/if}
</div>
