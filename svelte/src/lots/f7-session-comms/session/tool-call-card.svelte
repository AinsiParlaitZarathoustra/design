<script module lang="ts">
  import { ArrowRightLeft, Globe, Pencil, Search, SquareTerminal, Trash2, Wrench } from "lucide-svelte";
  import GlyphBookOpen from "../deps/glyph-book-open.svelte";
  import GlyphBrain from "../deps/glyph-brain.svelte";
  import type { ToolKind } from "./session-view";

  /** One glyph per kind, desktop's tool vocabulary. Shapes only; the one tint is red on failure. */
  export const TOOL_KIND_ICON: Record<ToolKind, any> = {
    read: GlyphBookOpen,
    edit: Pencil,
    delete: Trash2,
    move: ArrowRightLeft,
    search: Search,
    execute: SquareTerminal,
    think: GlyphBrain,
    fetch: Globe,
    other: Wrench,
  };

  /** Kinds whose target is a file, drawn as a dotted link-like run. */
  const FILE_KINDS: ReadonlySet<ToolKind> = new Set(["read", "edit", "delete", "move"]);

  let uid = 0;
</script>

<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import { ChevronRight, CircleX } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import DiffStat from "../deps/diff-stat.svelte";
  import Spinner from "../../../components/ui/spinner.svelte";
  import { formatDuration } from "./session-view-helpers";
  import type { CommentAnchor, DiffData, ToolCallView } from "./session-view";
  import DefaultDiff from "./default-diff.svelte";
  import PayloadBlock from "./payload-block.svelte";
  import TerminalBlock from "./terminal-block.svelte";
  import { DEFAULT_TOOL_CALL_CARD_LABELS } from "./tool-call-labels";
  import type { CopyPayload, ToolCallCardLabels } from "./tool-call-labels";

  /**
   * One tool call: a one-line header you click, and what was recorded behind
   * it (`ToolCallCard`). The line is a sentence (glyph, the call's title, its
   * target) with the figures in a right-hand gutter (`+n −m`, the duration).
   * Opened, it shows the paths, the input and the output (or the terminal run),
   * then each diff. It never fetches: a truncated payload offers
   * `onLoadPayload`, and the app fills it in.
   */
  interface Props {
    call: ToolCallView;
    /** Open on first render. Uncontrolled after that. */
    defaultOpen?: boolean;
    /** Controlled open state; leave undefined for an uncontrolled card. */
    open?: boolean;
    /** Called with the next open state when the header is clicked. */
    onOpenChange?: (open: boolean) => void;
    /** Adds Copy to each whole text payload; resolve `true` once the text is on the clipboard. */
    onCopy?: CopyPayload;
    /** Overrides for the card's strings. */
    labels?: Partial<ToolCallCardLabels>;
    /** A truncated payload's "Load full …" asks the app for the rest. */
    onLoadPayload?: (part: "input" | "output") => void;
    /** Draws each of `call.diffs`. Defaults to `DefaultDiff`. */
    renderDiff?: Snippet<[DiffData]>;
    /** Beside the header, outside the disclosure: the app's comment control. */
    commentSlot?: Snippet<[CommentAnchor]>;
    class?: string;
  }

  let {
    call,
    defaultOpen = false,
    open: openProp,
    onOpenChange,
    onCopy,
    labels: labelOverrides,
    onLoadPayload,
    renderDiff,
    commentSlot,
    class: className,
  }: Props = $props();

  // Open on first render only; uncontrolled after that, as the React card is.
  let openState = $state(untrack(() => defaultOpen));

  const isOpen = $derived(openProp ?? openState);
  const bodyId = `tool-call-body-${(uid += 1)}`;

  function toggle() {
    if (openProp === undefined) openState = !isOpen;
    onOpenChange?.(!isOpen);
  }

  const labels: ToolCallCardLabels = $derived(
    labelOverrides ? { ...DEFAULT_TOOL_CALL_CARD_LABELS, ...labelOverrides } : DEFAULT_TOOL_CALL_CARD_LABELS,
  );
  const failed = $derived(call.status === "failed");
  const running = $derived(call.status === "running");
  const pending = $derived(call.status === "pending");
  const target = $derived(call.title ? undefined : call.paths?.[0]);
  const added = $derived(call.diffs?.reduce((n, d) => n + (d.insertions ?? 0), 0) ?? 0);
  const removed = $derived(call.diffs?.reduce((n, d) => n + (d.deletions ?? 0), 0) ?? 0);
  const empty = $derived(!call.input && !call.output && !call.terminal && !call.diffs?.length);
</script>

<div
  data-slot="tool-call-card"
  data-status={call.status}
  data-tool-call-id={call.id}
  class={cn("min-w-0", className)}
>
  <div
    class="group/row flex h-8 items-center gap-2 bg-card px-3 transition-colors hover:bg-element-hover"
  >
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={isOpen ? bodyId : undefined}
      onclick={toggle}
      title={target ? `${call.title ?? call.name} ${target}` : (call.title ?? call.name)}
      class="group/marker flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
    >
      <span class="flex w-4 shrink-0 justify-center text-muted-foreground">
        {#if running}
          <Spinner size="sm" label="Running" />
        {:else if failed}
          <Icon icon={CircleX} size="md" class="text-error" label="Failed" />
        {:else}
          <Icon icon={TOOL_KIND_ICON[call.kind]} size="md" />
        {/if}
      </span>
      <span
        class={cn(
          "min-w-0 truncate text-sm",
          failed ? "text-error" : pending ? "text-disabled" : "text-secondary-foreground",
        )}
      >
        {call.title ?? call.name}
        {#if target}
          {" "}
          <span
            class={cn(
              "text-disabled",
              FILE_KINDS.has(call.kind) &&
                "underline decoration-dotted underline-offset-3 group-hover/marker:text-secondary-foreground",
            )}
          >
            {target}
          </span>
        {/if}
      </span>
      <span class="ml-auto flex shrink-0 items-center gap-2 font-mono text-xs text-disabled tabular-nums">
        {#if added > 0 || removed > 0}
          <DiffStat {added} {removed} />
        {/if}
        {#if failed}
          <span class="text-error">failed</span>
        {/if}
        {#if call.durationMs !== undefined}
          <span>{formatDuration(call.durationMs)}</span>
        {/if}
      </span>
      <Icon
        icon={ChevronRight}
        size="sm"
        class={cn(
          "shrink-0 text-border-strong transition-transform duration-fast",
          isOpen && "rotate-90",
        )}
      />
    </button>
    {@render commentSlot?.({ kind: "tool_call", id: call.id })}
  </div>

  {#if isOpen}
    <div id={bodyId} class="space-y-2.5 border-t border-border-subtle bg-background px-3 py-3">
      {#if call.paths && call.paths.length > 0}
        <ul class="space-y-0.5 font-mono text-xs text-muted-foreground">
          {#each call.paths as path (path)}
            <li class="truncate">{path}</li>
          {/each}
        </ul>
      {/if}
      {#if call.input}
        <PayloadBlock
          part="input"
          payload={call.input}
          from="head"
          {labels}
          {onCopy}
          onLoad={onLoadPayload && (() => onLoadPayload("input"))}
        />
      {/if}
      {#if call.terminal}
        <TerminalBlock terminal={call.terminal} {labels} {onCopy} />
      {:else if call.output}
        <PayloadBlock
          part="output"
          payload={call.output}
          from="head"
          {labels}
          {onCopy}
          onLoad={onLoadPayload && (() => onLoadPayload("output"))}
        />
      {/if}
      {#each call.diffs ?? [] as diff, i (`${i}:${diff.path}`)}
        <div>
          {#if renderDiff}
            {@render renderDiff(diff)}
          {:else}
            <DefaultDiff {diff} {labels} />
          {/if}
        </div>
      {/each}
      {#if empty}
        <p class="font-mono text-xs text-disabled">{labels.empty}</p>
      {/if}
    </div>
  {/if}
</div>
