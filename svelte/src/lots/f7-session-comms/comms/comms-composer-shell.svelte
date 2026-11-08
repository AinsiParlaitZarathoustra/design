<script module lang="ts">
  /** What `renderSend` gets: the shell's own Send wiring. */
  export interface CommsComposerSendState {
    canSend: boolean;
    sending: boolean;
    label: string;
    onSend: () => void;
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { ArrowUp, CornerDownRight, Pencil, X } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import { iconButtonVariants } from "../../../ui/icon-button-variants";
  import IconButton from "../../../ui/icon-button.svelte";
  import Icon from "../../../ui/icon.svelte";
  import Hint from "../../../ui/hint.svelte";
  import Pill from "../deps/pill.svelte";
  import Spinner from "../../../components/ui/spinner.svelte";

  /**
   * The team-chat composer's frame: desktop's one bar, without the editor.
   * Ported from `CommsComposerShell`.
   *
   * One glass-rimmed capsule is the field: tools on the left, the app's editor,
   * then the right-hand tools and Send, pinned to the last line as the text
   * grows. A reply or an edit tucks a strip into the top of the bar. At rest the
   * bar is 84% of the column, centred; in use it widens to 89.5%.
   *
   * The editor is a snippet, and it owns Enter. The shell listens only for an
   * Escape nobody handled, which cancels the edit, else the reply.
   */
  interface Props {
    /** The text field. It handles Enter. */
    editor: Snippet;
    /** Chips for files on their way up, above the text. */
    attachments?: Snippet;
    /** Left of the editor: attach. */
    toolsStart?: Snippet;
    /** Right of the editor, before Send. */
    toolsEnd?: Snippet;
    /** Replaces the Send button. */
    send?: Snippet;
    /** Draws Send from the shell's state. `send` wins when both are given. */
    renderSend?: Snippet<[CommsComposerSendState]>;
    /** A row under the attachments, ruled off from the text. Widens the bar. */
    formatRow?: Snippet;
    /** In flow at the top of the bar's width box (mentions). */
    popup?: Snippet;
    /** Files are being dragged over: a primary ring and `dropLabel` across the bar. */
    dropActive?: boolean;
    /** What the drop overlay says. */
    dropLabel?: Snippet;
    /** The draft cannot be sent as it is: the bar's edge turns red. */
    invalid?: boolean;
    /** The message being answered: the strip above the bar. */
    replyTo?: { authorName: string; preview: string } | null;
    /** Said in the strip when `replyTo.preview` is empty. */
    replyEmptyLabel?: string;
    onCancelReply?: () => void;
    /** The composer is editing a message rather than writing one. */
    editing?: boolean;
    onCancelEdit?: () => void;
    /** While editing, the strip's text. */
    editPreview?: string | null;
    /** Escape cancels the edit, else the reply. Off when the editor handles Escape itself. */
    escapeToCancel?: boolean;
    /** Send is live. */
    canSend: boolean;
    /** Send shows a spinner (uploads still going). */
    sending?: boolean;
    onSend: () => void;
    /** Instead of the bar, a line saying why nothing can be written here. */
    readOnly?: string | null;
    /** Send's name and tooltip. */
    sendLabel?: string;
    class?: string;
  }

  let {
    editor,
    attachments,
    toolsStart,
    toolsEnd,
    send,
    renderSend,
    formatRow,
    popup,
    dropActive = false,
    dropLabel,
    invalid = false,
    replyTo,
    replyEmptyLabel = "Message deleted",
    onCancelReply,
    editing = false,
    onCancelEdit,
    editPreview,
    escapeToCancel = true,
    canSend,
    sending = false,
    onSend,
    readOnly,
    sendLabel = "Send",
    class: className,
  }: Props = $props();

  let focused = $state(false);
  const replying = $derived(!editing && Boolean(replyTo));
  const expanded = $derived(
    focused || canSend || Boolean(attachments) || Boolean(formatRow) || replying || editing,
  );

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== "Escape" || e.defaultPrevented) return;
    if (editing && onCancelEdit) {
      e.preventDefault();
      onCancelEdit();
    } else if (replying && onCancelReply) {
      e.preventDefault();
      onCancelReply();
    }
  }

  function onFocusOut(e: FocusEvent) {
    const root = e.currentTarget as HTMLElement;
    if (!root.contains(e.relatedTarget as Node | null)) focused = false;
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions: the React frame has no role; Escape is a keyboard fallback for the focused editor. -->
<div
  data-slot="comms-composer"
  data-editing={editing || undefined}
  class={cn("relative shrink-0 px-2 pt-1 pb-4", className)}
  onfocusin={() => (focused = true)}
  onfocusout={onFocusOut}
  onkeydown={readOnly || !escapeToCancel ? undefined : onKeyDown}
>
  <div
    class={cn(
      "relative mx-auto min-w-[min(100%,24rem)] transition-[width] duration-slow ease-out-strong motion-reduce:transition-none",
      expanded && !readOnly ? "w-[89.5%]" : "w-[84%]",
    )}
  >
    {#if readOnly}
      <p
        class="flex min-h-[46px] items-center justify-center rounded-composer border border-border-subtle px-4 text-center text-sm text-muted-foreground"
      >
        {readOnly}
      </p>
    {:else}
      {@render popup?.()}
      {#if editing || replying}
        <div
          data-slot="comms-composer-intent"
          class="relative z-0 mx-2 -mb-4 flex animate-fade-in items-center gap-1.5 rounded-t-2xl bg-popover px-3 pt-1.5 pb-5"
        >
          <Icon
            icon={editing ? Pencil : CornerDownRight}
            size="xs"
            class="shrink-0 text-muted-foreground"
          />
          <span class="shrink-0 text-2xs font-medium tracking-wide text-muted-foreground uppercase">
            {editing ? "Editing" : "Replying to"}
          </span>
          <span class="min-w-0 flex-1 truncate text-xs text-secondary-foreground">
            {#if editing}
              {editPreview}
            {:else if replyTo}
              {#if replyTo.preview.trim()}
                {`${replyTo.authorName} · ${replyTo.preview}`}
              {:else}
                {replyTo.authorName} ·
                <span data-slot="comms-composer-reply-empty" class="text-muted-foreground italic"
                  >{replyEmptyLabel}</span
                >
              {/if}
            {/if}
          </span>
          <Hint label={editing ? "Cancel edit" : "Cancel reply"} side="top">
            <IconButton
              size="xs"
              icon={X}
              label={editing ? "Cancel edit" : "Cancel reply"}
              onclick={editing ? onCancelEdit : onCancelReply}
            />
          </Hint>
        </div>
      {/if}

      <div
        data-drop-active={dropActive || undefined}
        data-invalid={invalid || undefined}
        class={cn(
          "relative z-10 glass-rim rounded-composer",
          // A drop outranks an over-limit edge: it is what the hand is doing now.
          // `!`: `glass-rim` sets the whole border and its own box-shadow; without
          // it neither a plain `border-*` colour nor `ring-*` shows.
          dropActive
            ? "border-primary! ring-2! ring-primary/40"
            : invalid && "border-error!",
        )}
      >
        {#if dropActive}
          <div
            data-slot="comms-composer-drop"
            class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-composer bg-primary/8 backdrop-blur-[1px]"
          >
            <Pill size="sm" surface="raised">
              {#if dropLabel}
                {@render dropLabel()}
              {:else}
                Drop files to attach
              {/if}
            </Pill>
          </div>
        {/if}
        {#if attachments}
          <div class="flex flex-wrap gap-1.5 px-4 pt-3">{@render attachments()}</div>
        {/if}
        {#if formatRow}
          <div
            data-slot="comms-composer-format"
            class="flex flex-wrap items-center gap-0.5 border-b border-border-subtle px-4 pt-1.5 pb-1"
          >
            {@render formatRow()}
          </div>
        {/if}
        <!-- The side controls sit in 44px rows pinned to the bottom, so they stay
             on the last line as the text grows. Literal px: the interface scale is
             a zoom, and rem would drop the line off-centre. -->
        <div class="flex items-end gap-1 px-[8px]">
          {#if toolsStart}
            <div class="flex h-[44px] shrink-0 items-center gap-0.5">{@render toolsStart()}</div>
          {/if}
          <div class="min-h-[44px] min-w-0 flex-1 py-[5px]">{@render editor()}</div>
          <div class="flex h-[44px] shrink-0 items-center gap-0.5">
            {@render toolsEnd?.()}
            <!-- `renderSend` owns the slot outright: when given, no default Send. -->
            {#if send}
              {@render send()}
            {:else if renderSend}
              {@render renderSend({ canSend, sending, label: sendLabel, onSend })}
            {:else}
              <Hint label={sendLabel} side="top">
                <button
                  type="button"
                  data-slot="comms-send"
                  aria-label={sendLabel}
                  disabled={!canSend}
                  onclick={onSend}
                  class={cn(
                    iconButtonVariants({ size: "lg", shape: "round" }),
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    canSend && "text-foreground",
                  )}
                >
                  {#if sending}
                    <Spinner size="md" label="" class="text-current" />
                  {:else}
                    <Icon icon={ArrowUp} size="lg" />
                  {/if}
                </button>
              </Hint>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
