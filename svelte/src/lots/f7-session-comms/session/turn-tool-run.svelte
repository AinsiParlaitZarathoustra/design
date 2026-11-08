<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import { ChevronRight } from "lucide-svelte";
  import Spinner from "../../../components/ui/spinner.svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import DiffStat from "../deps/diff-stat.svelte";
  import type { CommentAnchor, DiffData, ToolCallView } from "./session-view";
  import type { CopyPayload } from "./tool-call-labels";
  import { TOOL_KIND_ICON } from "./tool-call-card.svelte";
  import TurnToolCalls from "./turn-tool-calls.svelte";
  import { FOLD_OVER, summarise, summariseFiles } from "./turn-row-helpers";

  /**
   * A run of consecutive tool calls. Past three it folds behind one counted
   * line ("3 edited · 4 read · 2 ran"), unless the host holds one of its calls
   * open (`openIds`) or names one (`revealId`); `openRunIds` hands the fold to
   * the host.
   */
  interface Props {
    calls: ToolCallView[];
    onLoadPayload?: (callId: string, part: "input" | "output") => void;
    renderDiff?: Snippet<[DiffData]>;
    commentSlot?: Snippet<[CommentAnchor]>;
    renderItemFooter?: Snippet<[{ kind: "tool"; call: ToolCallView }]>;
    openIds?: ReadonlySet<string>;
    onOpenIdsChange?: (next: ReadonlySet<string>) => void;
    onCopy?: CopyPayload;
    /** Folded runs held open, by call id: the host decides alone when set. */
    openRunIds?: ReadonlySet<string>;
    onOpenRunIdsChange?: (next: ReadonlySet<string>) => void;
    /** A call to keep drawn (`revealItemId`). */
    revealId?: string;
    /** `kinds` (the default) or `files`, desktop's session-detail line. */
    summary?: "kinds" | "files";
  }

  let {
    calls,
    onLoadPayload,
    renderDiff,
    commentSlot,
    renderItemFooter,
    openIds,
    onOpenIdsChange,
    onCopy,
    openRunIds,
    onOpenRunIdsChange,
    revealId,
    summary: summaryKind = "kinds",
  }: Props = $props();

  const foldable = $derived(calls.length > FOLD_OVER);
  // A run holding a call the host opened or revealed unfolds, on mount or when
  // it starts to hold it; folding it again afterwards is the person's call.
  const held = $derived(calls.some((c) => openIds?.has(c.id) || c.id === revealId));
  let open = $state(untrack(() => !foldable || held));
  let wasHeld = $state(untrack(() => held));

  $effect(() => {
    const now = held;
    if (now !== wasHeld) {
      wasHeld = now;
      if (now) open = true;
    }
  });

  // Controlled: the host's set alone decides, and a toggle reports the next set.
  const shown = $derived(
    !foldable || (openRunIds ? calls.some((c) => openRunIds.has(c.id)) : open),
  );

  function toggle() {
    if (!openRunIds) {
      open = !open;
      return;
    }
    const ids = new Set(openRunIds);
    if (shown) {
      for (const c of calls) ids.delete(c.id);
    } else {
      ids.add(calls[0]!.id);
    }
    onOpenRunIdsChange?.(ids);
  }

  const running = $derived(calls.find((c) => c.status === "running"));
  const failed = $derived(calls.some((c) => c.status === "failed"));
  const summaryText = $derived(
    summaryKind === "files"
      ? summariseFiles(calls)
      : { text: summarise(calls), added: 0, removed: 0 },
  );
</script>

<div class="py-1">
  {#if foldable}
    <button
      type="button"
      aria-expanded={shown}
      onclick={toggle}
      class="group/run flex h-6.5 w-full min-w-0 cursor-pointer items-center gap-2 text-left text-base text-muted-foreground transition-colors hover:text-secondary-foreground"
    >
      <span class="flex w-4 shrink-0 justify-center">
        {#if running}
          <Spinner size="sm" label="" />
        {:else}
          <Icon
            icon={TOOL_KIND_ICON[calls[0]!.kind]}
            size="md"
            class={cn(failed && "text-error")}
          />
        {/if}
      </span>
      <!-- While a call runs the line names it; settled, it counts. -->
      <span class="min-w-0 truncate">
        {running ? (running.title ?? running.name) : `${calls.length} tool calls`}
      </span>
      {#if !running && summaryText.text}
        <span class="min-w-0 truncate font-mono text-xs text-disabled">{summaryText.text}</span>
      {/if}
      {#if !running && summaryText.added + summaryText.removed > 0}
        <DiffStat
          added={summaryText.added}
          removed={summaryText.removed}
          class="shrink-0 font-mono text-xs"
        />
      {/if}
      <Icon
        icon={ChevronRight}
        size="md"
        class={cn(
          "ml-auto shrink-0 transition-[transform,opacity] duration-fast",
          shown
            ? "rotate-90 opacity-100"
            : "opacity-0 group-hover/run:opacity-100 group-focus-visible/run:opacity-100",
        )}
      />
    </button>
  {/if}
  {#if shown}
    <TurnToolCalls
      {calls}
      {onLoadPayload}
      {renderDiff}
      {commentSlot}
      {renderItemFooter}
      {openIds}
      {onOpenIdsChange}
      {onCopy}
      {revealId}
      class={cn(foldable && "mt-1")}
    />
  {/if}
</div>
