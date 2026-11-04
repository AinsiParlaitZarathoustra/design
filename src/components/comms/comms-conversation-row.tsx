"use client";

import { HashIcon, LockIcon, UsersIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "../../lib/utils.ts";
import { Icon } from "../../ui/icon.tsx";
import { PersonAvatar } from "../patterns/person-avatar.tsx";
import { StatusDot } from "../ui/status-dot.tsx";
import { unreadBadge } from "./comms-view-helpers.ts";
import type { CommsConversationRowView } from "./comms-view.ts";

/**
 * One conversation in the team-chat list: desktop's channel and direct rows,
 * as one props-only view.
 *
 * Every row leads with a fixed-width icon slot (a channel's `#` or lock, a
 * DM's face with its presence dot, a group's glyph), so labels start at the
 * same x whatever the row is. The label lifts to the foreground and medium
 * weight while there is something unread, and to the foreground while
 * selected.
 *
 * The count is a keycap, the `Kbd` look: a mention and a plain count are told
 * apart by the cap (9+ against 99+) and by `data-tone`, not by a saturated
 * fill that would fight the avatar and the name.
 */

export interface CommsConversationRowProps {
  conversation: CommsConversationRowView;
  /** The open conversation: `aria-current`, and the active fill. */
  selected?: boolean;
  onSelect: (id: string) => void;
  /** Replaces the default glyph or face in the icon slot. */
  icon?: ReactNode;
  /** After the label, before the badge: a group's member count, a spinner. */
  trailing?: ReactNode;
  /** Not selectable: no hover, no `onSelect`, disabled ink. */
  disabled?: boolean;
  className?: string;
}

function DefaultIcon({ conversation }: { conversation: CommsConversationRowView }) {
  if (conversation.kind === "dm" && conversation.counterpart) {
    const person = conversation.counterpart;
    return (
      <span className="relative inline-flex shrink-0">
        <PersonAvatar name={person.name} image={person.image ?? undefined} size="xs" />
        {person.online !== undefined && (
          <StatusDot
            tone={person.online ? "success" : "subtle"}
            cutout="background"
            label={person.online ? "Online" : "Offline"}
            className="absolute -right-px -bottom-px"
          />
        )}
      </span>
    );
  }
  if (conversation.kind === "dm" || conversation.kind === "group") {
    return (
      <span className="flex size-control-xs items-center justify-center rounded-full bg-card text-muted-foreground">
        <Icon icon={UsersIcon} size="sm" />
      </span>
    );
  }
  return (
    <Icon icon={conversation.private ? LockIcon : HashIcon} size="sm" className="text-disabled" />
  );
}

export function CommsConversationRow({
  conversation,
  selected = false,
  onSelect,
  icon,
  trailing,
  disabled = false,
  className,
}: CommsConversationRowProps) {
  const badge = unreadBadge(conversation.unread, conversation.mentions);
  const unread = badge !== null;
  const muted = disabled || conversation.archived;
  return (
    <button
      type="button"
      data-slot="comms-conversation-row"
      data-kind={conversation.kind}
      aria-current={selected ? "true" : undefined}
      disabled={disabled}
      onClick={() => onSelect(conversation.id)}
      className={cn(
        "flex w-full min-w-0 items-center gap-2 py-[5px] pr-2.5 pl-3.5 text-left transition-colors",
        disabled
          ? "cursor-not-allowed"
          : selected
            ? "cursor-pointer bg-element-active"
            : "cursor-pointer hover:bg-element-hover",
        className,
      )}
    >
      <span className="flex w-7 shrink-0 items-center justify-center">
        {icon ?? <DefaultIcon conversation={conversation} />}
      </span>
      <span
        className={cn(
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
      {trailing}
      {badge && (
        <span
          data-slot="comms-unread-badge"
          data-tone={badge.tone}
          className="inline-flex min-w-[18px] shrink-0 items-center justify-center rounded-full border border-border bg-card px-1.5 font-sans text-2xs leading-[16px] font-semibold tracking-wide text-foreground tabular-nums shadow-sm"
        >
          <span aria-hidden>{badge.label}</span>
          <span className="sr-only">{badge.aria}</span>
        </span>
      )}
    </button>
  );
}
