"use client";

import { ArrowUpIcon, CornerDownRightIcon, PencilIcon, XIcon } from "lucide-react";
import { useState } from "react";
import type { FocusEvent, KeyboardEvent, ReactNode } from "react";

import { cn } from "../../lib/utils.ts";
import { iconButtonVariants } from "../../ui/icon-button-variants.ts";
import { IconButton } from "../../ui/icon-button.tsx";
import { Icon } from "../../ui/icon.tsx";
import { Hint } from "../../ui/tooltip.tsx";
import { Spinner } from "../ui/spinner.tsx";

/**
 * The team-chat composer's frame: desktop's one bar, without the editor.
 *
 * One glass-rimmed capsule is the field: tools on the left, the app's editor,
 * then the right-hand tools and Send, the side controls pinned to the last
 * line as the text grows. A reply or an edit tucks a strip into the top of
 * the bar, behind it, so the two read as one object. Attachments sit inside
 * the bar above the text. At rest the bar is 84% of the column, centred; in
 * use (focused, or holding a draft, files, a reply or an edit) it widens to
 * 89.5%, never the full width, so it never shrinks under something being
 * written.
 *
 * The editor is a slot (desktop's Tiptap field, web's textarea), and it owns
 * Enter. The shell only listens for an Escape nobody handled, which cancels
 * the edit, else the reply.
 */

export interface CommsComposerShellProps {
  /** The text field. It handles Enter. */
  editor: ReactNode;
  /** Chips for files on their way up, above the text. */
  attachments?: ReactNode;
  /** Left of the editor: attach. */
  toolsStart?: ReactNode;
  /** Right of the editor, before Send: emoji, mention, formatting. */
  toolsEnd?: ReactNode;
  /** Replaces the Send button (web's microphone, a "Save edit"). */
  send?: ReactNode;
  /** The message being answered: the strip above the bar. */
  replyTo?: { authorName: string; preview: string } | null;
  onCancelReply?: () => void;
  /** The composer is editing a message rather than writing one. */
  editing?: boolean;
  onCancelEdit?: () => void;
  /** Send is live. */
  canSend: boolean;
  /** Send shows a spinner (uploads still going). */
  sending?: boolean;
  onSend: () => void;
  /** Instead of the bar, a line saying why nothing can be written here. */
  readOnly?: string | null;
  /** Send's name and tooltip: "Save edit", "Waiting for uploads…". */
  sendLabel?: string;
  className?: string;
}

export function CommsComposerShell({
  editor,
  attachments,
  toolsStart,
  toolsEnd,
  send,
  replyTo,
  onCancelReply,
  editing = false,
  onCancelEdit,
  canSend,
  sending = false,
  onSend,
  readOnly,
  sendLabel = "Send",
  className,
}: CommsComposerShellProps) {
  const [focused, setFocused] = useState(false);
  const replying = !editing && Boolean(replyTo);
  const expanded = focused || canSend || Boolean(attachments) || replying || editing;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Escape" || e.defaultPrevented) return;
    if (editing && onCancelEdit) {
      e.preventDefault();
      onCancelEdit();
    } else if (replying && onCancelReply) {
      e.preventDefault();
      onCancelReply();
    }
  };
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
  };

  return (
    <div
      data-slot="comms-composer"
      data-editing={editing || undefined}
      className={cn("relative shrink-0 px-2 pt-1 pb-4", className)}
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
      onKeyDown={readOnly ? undefined : onKeyDown}
    >
      <div
        className={cn(
          "relative mx-auto min-w-[min(100%,24rem)] transition-[width] duration-slow ease-out-strong motion-reduce:transition-none",
          expanded && !readOnly ? "w-[89.5%]" : "w-[84%]",
        )}
      >
        {readOnly ? (
          <p className="flex min-h-[46px] items-center justify-center rounded-composer border border-border-subtle px-4 text-center text-sm text-muted-foreground">
            {readOnly}
          </p>
        ) : (
          <>
            {(editing || replying) && (
              <div
                data-slot="comms-composer-intent"
                className="relative z-0 mx-2 -mb-4 flex animate-fade-in items-center gap-1.5 rounded-t-2xl bg-popover px-3 pt-1.5 pb-5"
              >
                <Icon
                  icon={editing ? PencilIcon : CornerDownRightIcon}
                  size="xs"
                  className="shrink-0 text-muted-foreground"
                />
                <span className="shrink-0 text-2xs font-medium tracking-wide text-muted-foreground uppercase">
                  {editing ? "Editing" : "Replying to"}
                </span>
                <span className="min-w-0 flex-1 truncate text-xs text-secondary-foreground">
                  {!editing && replyTo && `${replyTo.authorName} · ${replyTo.preview}`}
                </span>
                <Hint label={editing ? "Cancel edit" : "Cancel reply"} side="top">
                  <IconButton
                    size="xs"
                    icon={XIcon}
                    label={editing ? "Cancel edit" : "Cancel reply"}
                    onClick={editing ? onCancelEdit : onCancelReply}
                  />
                </Hint>
              </div>
            )}

            <div className="relative z-10 glass-rim rounded-composer">
              {attachments && <div className="flex flex-wrap gap-1.5 px-4 pt-3">{attachments}</div>}
              {/* The side controls sit in 44px rows pinned to the bottom, so
                  they stay on the last line as the text grows. Literal px:
                  the interface scale is a zoom, and rem would drop the line
                  off-centre. */}
              <div className="flex items-end gap-1 px-[8px]">
                {toolsStart && (
                  <div className="flex h-[44px] shrink-0 items-center gap-0.5">{toolsStart}</div>
                )}
                <div className="min-h-[44px] min-w-0 flex-1 py-[5px]">{editor}</div>
                <div className="flex h-[44px] shrink-0 items-center gap-0.5">
                  {toolsEnd}
                  {send ?? (
                    <Hint label={sendLabel} side="top">
                      <button
                        type="button"
                        data-slot="comms-send"
                        aria-label={sendLabel}
                        disabled={!canSend}
                        onClick={onSend}
                        className={cn(
                          iconButtonVariants({ size: "lg", shape: "round" }),
                          "disabled:cursor-not-allowed disabled:opacity-50",
                          canSend && "text-foreground",
                        )}
                      >
                        {sending ? (
                          <Spinner size="md" label="" className="text-current" />
                        ) : (
                          <Icon icon={ArrowUpIcon} size="lg" />
                        )}
                      </button>
                    </Hint>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
