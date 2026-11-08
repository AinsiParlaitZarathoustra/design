<script module lang="ts">
  /** How a row was selected: `onSelect`'s second argument. */
  export interface CommsConversationSelect {
    newTab: boolean;
    event: MouseEvent;
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { Hash, Lock, Users } from "lucide-svelte";
  import { detectKeyPlatform } from "../../../lib/combo";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import PersonAvatar from "../deps/person-avatar.svelte";
  import StatusDot from "../deps/status-dot.svelte";
  import { unreadBadge } from "./comms-view-helpers";
  import type { CommsConversationRowView } from "./comms-view";

  /**
   * One conversation in the team-chat list: desktop's channel and direct rows,
   * as one props-only view. Ported from `CommsConversationRow`.
   *
   * Every row leads with a fixed-width icon slot (a channel's `#` or lock, a
   * DM's face with its presence dot, a group's glyph), so labels start at the
   * same x whatever the row is. The count is a keycap: a mention and a plain
   * count are told apart by the cap (9+ against 99+) and by `data-tone`.
   */
  interface Props {
    conversation: CommsConversationRowView;
    /** The open conversation: `aria-current`, and the active fill. */
    selected?: boolean;
    /**
     * The row was clicked. `newTab` is ⌘-click on a Mac and Ctrl-click
     * elsewhere; `event` is the click itself.
     */
    onSelect: (id: string, select: CommsConversationSelect) => void;
    /** Replaces the default glyph or face in the icon slot. */
    icon?: Snippet;
    /** After the label, before the badge: a group's member count, a spinner. */
    trailing?: Snippet;
    /** Not selectable: no hover, no `onSelect`, disabled ink. */
    disabled?: boolean;
    class?: string;
  }

  let {
    conversation,
    selected = false,
    onSelect,
    icon,
    trailing,
    disabled = false,
    class: className,
  }: Props = $props();

  const badge = $derived(unreadBadge(conversation.unread, conversation.mentions));
  const unread = $derived(badge !== null);
  const muted = $derived(disabled || Boolean(conversation.archived));
</script>

<button
  type="button"
  data-slot="comms-conversation-row"
  data-kind={conversation.kind}
  aria-current={selected ? "true" : undefined}
  {disabled}
  onclick={(event) =>
    onSelect(conversation.id, {
      newTab: detectKeyPlatform() === "mac" ? event.metaKey : event.ctrlKey,
      event,
    })}
  class={cn(
    "flex w-full min-w-0 items-center gap-2 py-[5px] pr-2.5 pl-3.5 text-left transition-colors",
    disabled
      ? "cursor-not-allowed"
      : selected
        ? "cursor-pointer bg-element-active"
        : "cursor-pointer hover:bg-element-hover",
    className,
  )}
>
  <span class="flex w-7 shrink-0 items-center justify-center">
    {#if icon}
      {@render icon()}
    {:else if conversation.kind === "dm" && conversation.counterpart}
      <span class="relative inline-flex shrink-0">
        <PersonAvatar
          name={conversation.counterpart.name}
          image={conversation.counterpart.image ?? undefined}
          size="xs"
        />
        {#if conversation.counterpart.online !== undefined}
          <StatusDot
            tone={conversation.counterpart.online ? "success" : "subtle"}
            cutout="background"
            label={conversation.counterpart.online ? "Online" : "Offline"}
            class="absolute -right-px -bottom-px"
          />
        {/if}
      </span>
    {:else if conversation.kind === "dm" || conversation.kind === "group"}
      <span
        class="flex size-control-xs items-center justify-center rounded-full bg-card text-muted-foreground"
      >
        <Icon icon={Users} size="sm" />
      </span>
    {:else}
      <Icon icon={conversation.private ? Lock : Hash} size="sm" class="text-disabled" />
    {/if}
  </span>
  <span
    class={cn(
      "min-w-0 flex-1 truncate text-sm",
      muted
        ? "text-disabled"
        : unread
          ? "font-medium text-foreground"
          : selected
            ? "text-foreground"
            : "text-secondary-foreground",
    )}
  >
    {conversation.title}
  </span>
  {@render trailing?.()}
  {#if badge}
    <span
      data-slot="comms-unread-badge"
      data-tone={badge.tone}
      class="inline-flex min-w-[18px] shrink-0 items-center justify-center rounded-full border border-border bg-card px-1.5 font-sans text-2xs leading-[16px] font-semibold tracking-wide text-foreground tabular-nums shadow-sm"
    >
      <span aria-hidden="true">{badge.label}</span>
      <span class="sr-only">{badge.aria}</span>
    </span>
  {/if}
</button>
