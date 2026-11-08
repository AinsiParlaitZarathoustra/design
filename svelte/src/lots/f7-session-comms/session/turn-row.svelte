<script lang="ts">
  import type { Snippet } from "svelte";
  import type { PluggableList } from "unified";
  import { cn } from "../../../lib/utils";
  import Callout from "../../f3-ui-first-half/callout.svelte";
  import type {
    AgentItem,
    AttachmentView,
    CheckpointView,
    CommentAnchor,
    DiffData,
    StreamingState,
    TurnView,
  } from "./session-view";
  import type { CopyPayload } from "./tool-call-labels";
  import StreamingMarkdown from "./streaming-markdown.svelte";
  import TurnCheckpoint from "./turn-checkpoint.svelte";
  import TurnPlanList from "./turn-plan-list.svelte";
  import { blocksOf, formatWorked } from "./turn-row-helpers";
  import TurnTextItem from "./turn-text-item.svelte";
  import TurnThinkingItem from "./turn-thinking-item.svelte";
  import TurnToolRun from "./turn-tool-run.svelte";
  import TurnUserMessage from "./turn-user-message.svelte";

  /**
   * One turn of a session: the prompt, what the agent did, the commits it made
   * and how it ended. Desktop's transcript turn, as a props-only view.
   *
   * The prompt is a right-aligned bubble, clamped to twelve whole lines behind
   * "Show more". The agent's work reads down the page in order: prose, a folded
   * "Thought process", runs of tool calls (a run longer than three folds behind
   * one counted line), the plan as a checklist. Checkpoints come last, as cards:
   * a commit is a boundary in the session, observed after the work that made
   * it. A failed turn ends on an error callout; an expired sign-in says so and
   * carries the app's action (`errorAction`), since the row cannot route.
   *
   * Nothing here reads a store or fetches. Comments come in through
   * `commentSlot`, anchored to the prompt, each answer, call and checkpoint.
   */
  interface Props {
    turn: TurnView;
    /** The session's streaming state, passed to the last turn only. */
    streaming?: StreamingState;
    /** The app's comment control, beside each anchorable thing. */
    commentSlot?: Snippet<[CommentAnchor]>;
    /** Renders prose. Defaults to `StreamingMarkdown`. */
    renderMarkdown?: Snippet<[string, boolean]>;
    /** For the default prose renderer, e.g. `[rehypeHighlight]`. */
    rehypePlugins?: PluggableList;
    /** A truncated payload's "Load full …". */
    onLoadPayload?: (callId: string, part: "input" | "output") => void;
    renderDiff?: Snippet<[DiffData]>;
    /** Inside a failed turn's callout: what the person can do (sign in again). */
    errorAction?: Snippet;
    /** Under the prompt and under each agent item (each call, in a run), outside any disclosure. */
    renderItemFooter?: Snippet<[AgentItem | { kind: "user"; id: string }]>;
    /** Under each checkpoint card: `renderItemFooter`'s counterpart for commits. */
    renderCheckpointFooter?: Snippet<[CheckpointView]>;
    /** Tool calls held open; a run holding one unfolds. Pair with `onOpenToolCallIdsChange`. */
    openToolCallIds?: ReadonlySet<string>;
    /** A card was toggled: the next set, with its id added or removed. */
    onOpenToolCallIdsChange?: (next: ReadonlySet<string>) => void;
    /** The thinking disclosure's label. Defaults to "Thinking…" while it streams, else "Thought process". */
    thinkingLabel?: Snippet<[{ streaming: boolean }]>;
    /** How an opened thought renders: as plain text (the default) or as markdown. */
    thinkingBody?: "markdown" | "text";
    /** Makes each prompt image and file a button that opens it. */
    onOpenAttachment?: (attachment: AttachmentView, index: number) => void;
    /** Passed to each `ToolCallCard`: Copy on each text payload. */
    onCopyPayload?: CopyPayload;
    /** A truncated prompt's or answer's "Read the rest": asks the app for the whole body. */
    onLoadBody?: (id: string) => void;
    /** Folded runs held open, by call id: set, the host decides alone. */
    openToolRunIds?: ReadonlySet<string>;
    /** A run was toggled: unfolding adds its first call's id, folding removes all of its ids. */
    onOpenToolRunIdsChange?: (next: ReadonlySet<string>) => void;
    /** A tool call to keep drawn, by id, and its folded run unfolded. */
    revealItemId?: string;
    /** Clamps each long answer to 340px behind "Show more". */
    clampResponses?: boolean;
    /** What a folded run's line says after its count: `kinds` (the default) or `files`. */
    toolRunSummary?: "kinds" | "files";
    class?: string;
  }

  let {
    turn,
    streaming,
    commentSlot,
    renderMarkdown,
    rehypePlugins,
    onLoadPayload,
    renderDiff,
    errorAction,
    renderItemFooter,
    renderCheckpointFooter,
    openToolCallIds,
    onOpenToolCallIdsChange,
    thinkingLabel,
    thinkingBody = "text",
    onOpenAttachment,
    onCopyPayload,
    onLoadBody,
    openToolRunIds,
    onOpenToolRunIdsChange,
    revealItemId,
    clampResponses = false,
    toolRunSummary = "kinds",
    class: className,
  }: Props = $props();

  const blocks = $derived(blocksOf(turn.items));
  const outcome = $derived(turn.outcome);
  const live = $derived(!outcome && streaming !== undefined);
  // The first answer carries the model line; the ones after it are the same voice.
  const firstText = $derived(turn.items.find((i) => i.kind === "text"));
  const turnUser = $derived(turn.user);
</script>

{#snippet markdown(source: string, isLive: boolean)}
  {#if renderMarkdown}
    {@render renderMarkdown(source, isLive)}
  {:else}
    <StreamingMarkdown {source} streaming={isLive} {rehypePlugins} />
  {/if}
{/snippet}

{#snippet userMarkdown(source: string)}
  {#if renderMarkdown}
    <div class="prose-session-user">{@render renderMarkdown(source, false)}</div>
  {:else}
    <StreamingMarkdown {source} {rehypePlugins} class="prose-session-user" />
  {/if}
{/snippet}

{#snippet promptFooter()}
  {@render renderItemFooter?.({ kind: "user", id: turnUser?.id ?? "" })}
{/snippet}

<div
  data-slot="turn-row"
  data-turn-key={turn.key}
  class={cn("flex min-w-0 flex-col", className)}
>
  {#if turnUser}
    <TurnUserMessage
      user={turnUser}
      {commentSlot}
      markdown={userMarkdown}
      footer={renderItemFooter ? promptFooter : undefined}
      {onOpenAttachment}
      {onLoadBody}
    />
  {/if}

  {#if turn.durationMs !== undefined && outcome}
    <div
      class="mb-1 flex h-6 items-center border-b border-border-subtle pb-2 text-base text-muted-foreground"
    >
      <span>
        {outcome?.kind === "cancelled" ? "Stopped after" : "Worked for"} <span
          class="tabular-nums">{formatWorked(turn.durationMs)}</span
        >
      </span>
    </div>
  {/if}

  {#each blocks as block (block.kind === "tools" ? block.key : block.item.id)}
    {#if block.kind === "tools"}
      <TurnToolRun
        calls={block.calls}
        {onLoadPayload}
        {renderDiff}
        {commentSlot}
        {renderItemFooter}
        openIds={openToolCallIds}
        onOpenIdsChange={onOpenToolCallIdsChange}
        onCopy={onCopyPayload}
        openRunIds={openToolRunIds}
        onOpenRunIdsChange={onOpenToolRunIdsChange}
        revealId={revealItemId}
        summary={toolRunSummary}
      />
    {:else if block.item.kind === "text"}
      <TurnTextItem
        item={block.item}
        header={block.item === firstText}
        live={streaming?.itemId === block.item.id}
        markdown={markdown}
        {commentSlot}
        {onLoadBody}
        clamp={clampResponses}
      />
      {@render renderItemFooter?.(block.item)}
    {:else if block.item.kind === "thinking"}
      <TurnThinkingItem
        id={block.item.id}
        text={block.item.text}
        live={streaming?.itemId === block.item.id}
        label={thinkingLabel}
        body={thinkingBody}
        markdown={markdown}
        {commentSlot}
      />
      {@render renderItemFooter?.(block.item)}
    {:else}
      <TurnPlanList items={block.item.items} class="py-2" />
      {@render renderItemFooter?.(block.item)}
    {/if}
  {/each}

  {#if live && streaming?.retry}
    <p class="py-1 text-sm text-muted-foreground">
      Retrying ({streaming.retry.attempt}/{streaming.retry.maxAttempts})
    </p>
  {/if}
  {#if live && streaming?.compacting}
    <p class="py-1 text-sm text-muted-foreground">Compacting context</p>
  {/if}

  {#each turn.checkpoints ?? [] as checkpoint (checkpoint.id)}
    <TurnCheckpoint {checkpoint} {commentSlot} />
    {@render renderCheckpointFooter?.(checkpoint)}
  {/each}

  {#if outcome?.kind === "failed"}
    <Callout
      tone="error"
      role="alert"
      class="mt-2"
      action={outcome.error?.kind === "auth" ? errorAction : undefined}
    >
      {#if outcome.error?.kind === "auth"}
        <p class="font-medium">Sign in again to continue</p>
        <p class="mt-0.5 opacity-80">{outcome.error.message}</p>
      {:else}
        {outcome.error?.message ?? "The turn failed."}
      {/if}
    </Callout>
  {/if}
  {#if outcome?.kind === "cancelled"}
    <p class="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
      <span class="h-px w-4 bg-border-strong" aria-hidden="true"></span>
      Cancelled
    </p>
  {/if}
</div>
