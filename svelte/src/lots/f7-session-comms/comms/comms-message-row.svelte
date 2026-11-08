<script lang="ts">
  import type { Snippet } from "svelte";
  import { CornerDownRight, Pin, Webhook } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Badge from "../../../ui/badge.svelte";
  import Icon from "../../../ui/icon.svelte";
  import PersonAvatar from "../deps/person-avatar.svelte";
  import StatusDot from "../deps/status-dot.svelte";
  import CommsMessageToolbar from "./comms-message-toolbar.svelte";
  import { DEFAULT_COMMS_MESSAGE_ROW_LABELS } from "./comms-message-labels";
  import type { CommsMessageRowLabels, CommsMessageRowPermissions } from "./comms-message-labels";
  import { formatClock } from "./comms-view-helpers";
  import type { CommsAuthor, CommsMessageView, CommsReaction } from "./comms-view";

  /**
   * One team-chat message, linear (the Discord and Slack shape). Ported from
   * `CommsMessageRow`:
   *
   *     [avatar]  Name · 12:04
   *               body, full width
   *               attachments, references
   *               reaction chips
   *
   * A `head` row opens a run with the avatar and the author line; a
   * continuation drops both and shows its time in the gutter on hover. Text,
   * attachments and references are snippets. The hover toolbar mounts only
   * while the pointer is over the row, focus is inside it, or one of its menus
   * is open. The row takes no `tabindex`. Motion is colour and opacity only.
   */
  export interface CommsMessageRowProps {
    message: CommsMessageView;
    /** Opens a run: the avatar and the author line. */
    head: boolean;
    /** Name a person on a head row. A 1:1 DM can drop it; an integration is always named. */
    showAuthor?: boolean;
    /** The rendered text. */
    body: Snippet;
    attachments?: Snippet;
    /** Session and code references, under the attachments. */
    references?: Snippet;
    /** Replaces the default face on a head row. */
    avatar?: Snippet;
    /** A person's name, as the app draws it. Ignored for an integration. */
    authorName?: Snippet;
    /** The composer is editing this message. */
    editing?: boolean;
    /** The emoji the picker offers, exactly as the server allows them. */
    reactionEmoji: readonly string[];
    can: CommsMessageRowPermissions;
    onReact?: (emoji: string, on: boolean) => void;
    onReply?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onTogglePin?: () => void;
    onCopyText?: () => void;
    onCopyLink?: () => void;
    /** The quote line's jump; for a `missing` parent it pages the parent in. */
    onJumpToReply?: (id: string) => void;
    /** Offered beside "failed to send". */
    onRetry?: () => void;
    labels?: Partial<CommsMessageRowLabels>;
    class?: string;
  }

  let {
    message,
    head,
    showAuthor = true,
    body,
    attachments,
    references,
    avatar,
    authorName,
    editing = false,
    reactionEmoji,
    can,
    onReact,
    onReply,
    onEdit,
    onDelete,
    onTogglePin,
    onCopyText,
    onCopyLink,
    onJumpToReply,
    onRetry,
    labels: labelOverrides,
    class: className,
  }: CommsMessageRowProps = $props();

  const labels: CommsMessageRowLabels = $derived(
    labelOverrides
      ? { ...DEFAULT_COMMS_MESSAGE_ROW_LABELS, ...labelOverrides }
      : DEFAULT_COMMS_MESSAGE_ROW_LABELS,
  );

  let hovered = $state(false);
  let focused = $state(false);
  // A menu moves the pointer and focus into a popup outside this row, so the
  // open flag lives here, above the toolbar that would otherwise unmount.
  let menuOpen = $state(false);

  const deleted = $derived(message.deleted === true);
  const author: CommsAuthor = $derived(message.author);
  const clock = $derived(formatClock(message.at));

  function onFocusOut(event: FocusEvent) {
    const row = event.currentTarget as HTMLElement;
    if (!row.contains(event.relatedTarget as Node | null)) focused = false;
  }
</script>

{#snippet defaultAvatar()}
  {#if author.kind === "integration"}
    <!-- A rounded square, not a circle, so it never reads as a person; no presence dot. -->
    <span
      role="img"
      aria-label={author.name}
      class="flex size-control-lg items-center justify-center overflow-hidden rounded-md bg-muted text-secondary-foreground"
    >
      {#if author.image}
        <img src={author.image} alt="" draggable="false" class="size-full object-cover" />
      {:else}
        <Icon icon={Webhook} size="lg" />
      {/if}
    </span>
  {:else}
    <span class="relative inline-flex shrink-0">
      <PersonAvatar
        name={author.person.name}
        image={author.person.image ?? undefined}
        size="lg"
      />
      {#if author.online !== undefined}
        <StatusDot
          tone={author.online ? "success" : "subtle"}
          size="md"
          cutout="background"
          label={author.online ? "Online" : "Offline"}
          class="absolute -right-px -bottom-px"
        />
      {/if}
    </span>
  {/if}
{/snippet}

{#snippet authorLine()}
  {@const time = new Date(message.at)}
  {#if author.kind === "integration"}
    <!-- ADR-0020: always the badge, and the webhook's real name beside a borrowed one. -->
    <div
      class="flex min-w-0 items-baseline gap-1.5"
      title={labels.postedBy(author.via ?? author.name)}
    >
      <span class="truncate text-sm font-semibold text-foreground">{author.name}</span>
      <Badge variant="outline" size="sm" class="self-center tracking-wider uppercase"
        >{labels.app}</Badge
      >
      {#if author.via}
        <span class="min-w-0 truncate text-2xs text-muted-foreground">{labels.via(author.via)}</span>
      {/if}
      <time
        dateTime={time.toISOString()}
        title={time.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
        class="shrink-0 text-2xs text-disabled tabular-nums">{clock}</time
      >
    </div>
  {:else}
    <div class="flex min-w-0 items-baseline gap-1.5">
      {#if showAuthor}
        <span class="min-w-0 truncate text-sm font-semibold text-foreground">
          {#if authorName}
            {@render authorName()}
          {:else}
            {author.person.name}
          {/if}
        </span>
      {/if}
      <time
        dateTime={time.toISOString()}
        title={time.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
        class="shrink-0 text-2xs text-disabled tabular-nums">{clock}</time
      >
    </div>
  {/if}
{/snippet}

{#snippet replyLine(reply: NonNullable<CommsMessageView["replyTo"]>)}
  <!-- A deleted parent renders as a stub; a merely paged-out one still jumps. -->
  {@const replyDeleted = reply.state === "deleted"}
  {@const live = !replyDeleted && onJumpToReply !== undefined}
  <button
    type="button"
    data-slot="comms-reply-line"
    data-state={reply.state}
    disabled={!live}
    onclick={live ? () => onJumpToReply?.(reply.id) : undefined}
    title={live ? labels.jumpToMessage : undefined}
    class={cn(
      "group/reply flex w-full min-w-0 items-center gap-1 pb-0.5 text-left text-xs text-muted-foreground",
      live && "cursor-pointer",
    )}
  >
    <Icon icon={CornerDownRight} size="xs" class="shrink-0 opacity-50" />
    {#if !replyDeleted}
      <span
        class={cn(
          "shrink-0 font-medium text-secondary-foreground",
          live && "group-hover/reply:underline",
        )}
      >
        {reply.authorName ?? labels.unknownAuthor}
      </span>
    {/if}
    <span class="min-w-0 truncate opacity-80">
      {#if replyDeleted}
        <span class="italic">{labels.originalDeleted}</span>
      {:else if reply.state === "missing"}
        …
      {:else}
        {reply.preview}
      {/if}
    </span>
  </button>
{/snippet}

{#snippet metaLine()}
  {#if message.editedAt || message.pinned || message.send === "sending" || message.send === "failed"}
    <div class="mt-0.5 flex items-center gap-1.5 text-2xs text-disabled">
      {#if message.pinned}
        <span role="img" aria-label={labels.pinned} title={labels.pinned} class="inline-flex">
          <Icon icon={Pin} size="xs" />
        </span>
      {/if}
      {#if message.editedAt}
        <span class="italic">{labels.edited}</span>
      {/if}
      {#if message.send === "sending"}
        <span>{labels.sending}</span>
      {/if}
      {#if message.send === "failed"}
        <span class="text-error">{labels.failed}</span>
      {/if}
      {#if message.send === "failed" && onRetry}
        <button
          type="button"
          onclick={onRetry}
          class="cursor-pointer font-medium text-secondary-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
          >{labels.retry}</button
        >
      {/if}
    </div>
  {/if}
{/snippet}

{#snippet reactions()}
  {#if message.reactions.length > 0}
    <div class="mt-1 flex flex-wrap items-center gap-1">
      {#each message.reactions as reaction (reaction.emoji)}
        {@render reactionChip(reaction)}
      {/each}
    </div>
  {/if}
{/snippet}

{#snippet reactionChip(reaction: CommsReaction)}
  <button
    type="button"
    data-slot="comms-reaction"
    aria-pressed={reaction.mine}
    disabled={!(can.react && onReact)}
    title={labels.reactors(reaction)}
    onclick={can.react && onReact ? () => onReact(reaction.emoji, !reaction.mine) : undefined}
    class={cn(
      "flex h-[21px] items-center gap-1 rounded-full border px-1.5 text-xs leading-none transition-colors",
      can.react && onReact && "cursor-pointer",
      reaction.mine
        ? "border-success/60 bg-success/15 text-foreground"
        : cn(
            "border-border bg-card text-secondary-foreground",
            can.react && onReact && "hover:bg-element-hover",
          ),
    )}
  >
    <span>{reaction.emoji}</span>
    <span class="tabular-nums">{reaction.count}</span>
  </button>
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions: the React row has no role; it takes no tab stop of its own, focus reaches it through its controls. -->
<div
  data-slot="comms-message-row"
  data-message={message.id}
  data-head={head || undefined}
  data-editing={editing || undefined}
  class={cn(
    "group/msg relative flex gap-2 rounded px-1 py-px transition-colors hover:bg-element-hover data-flash:bg-warning-muted",
    head && "mt-3 first:mt-0",
    className,
  )}
  onmouseenter={() => (hovered = true)}
  onmouseleave={() => (hovered = false)}
  onfocusin={() => (focused = true)}
  onfocusout={onFocusOut}
>
  <div class="w-9 shrink-0 pt-0.5">
    {#if head}
      {#if avatar}
        {@render avatar()}
      {:else}
        {@render defaultAvatar()}
      {/if}
    {:else}
      <!-- A continuation shows its own time where the avatar would be, on hover. -->
      <span
        class="hidden justify-end pt-0.75 pr-0.5 text-2xs leading-none text-disabled tabular-nums group-hover/msg:flex"
        >{clock}</span
      >
    {/if}
  </div>

  <div class="min-w-0 flex-1 pb-1">
    {#if message.replyTo}
      {@render replyLine(message.replyTo)}
    {/if}

    {#if head}
      {@render authorLine()}
    {/if}

    {#if deleted}
      <!-- The body is gone from the server: a tombstone, not a hide. -->
      <div class="text-base text-disabled italic">{labels.messageDeleted}</div>
    {:else}
      <div class={cn(message.send === "sending" && "opacity-60")}>
        <div class="min-w-0 text-base text-secondary-foreground">{@render body()}</div>
        {#if attachments}
          <div class="mt-1.5 flex flex-col gap-1.5">{@render attachments()}</div>
        {/if}
        {#if references}
          <div class="mt-1.5 flex flex-col gap-1.5">{@render references()}</div>
        {/if}
        {@render metaLine()}
      </div>
      {@render reactions()}
    {/if}
  </div>

  {#if !deleted && (hovered || focused || menuOpen)}
    <CommsMessageToolbar
      pinned={message.pinned === true}
      {reactionEmoji}
      {can}
      {labels}
      onOpenChange={(open) => (menuOpen = open)}
      {onReact}
      {onReply}
      {onEdit}
      {onDelete}
      {onTogglePin}
      {onCopyText}
      {onCopyLink}
    />
  {/if}
</div>
