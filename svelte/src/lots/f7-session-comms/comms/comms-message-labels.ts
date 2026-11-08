import type { CommsReaction } from "./comms-view";

/** Every string the message row draws (`CommsMessageRowLabels`). */
export interface CommsMessageRowLabels {
  messageDeleted: string;
  edited: string;
  sending: string;
  failed: string;
  retry: string;
  originalDeleted: string;
  /** The parent of a reply the app could not name. */
  unknownAuthor: string;
  jumpToMessage: string;
  pinned: string;
  /** The integration badge. */
  app: string;
  /** Beside an integration that posted under another name. */
  via: (webhook: string) => string;
  /** An integration's author line, on hover. */
  postedBy: (webhook: string) => string;
  /** A reaction chip's tooltip: who reacted, when the app knows their names. */
  reactors: (reaction: CommsReaction) => string;
  react: string;
  reply: string;
  more: string;
  copyText: string;
  copyLink: string;
  pin: string;
  unpin: string;
  edit: string;
  delete: string;
}

export const DEFAULT_COMMS_MESSAGE_ROW_LABELS: CommsMessageRowLabels = {
  messageDeleted: "Message deleted",
  edited: "edited",
  sending: "sending…",
  failed: "failed to send",
  retry: "Retry",
  originalDeleted: "original message deleted",
  unknownAuthor: "Unknown",
  jumpToMessage: "Jump to message",
  pinned: "Pinned",
  app: "App",
  via: (webhook) => `via ${webhook}`,
  postedBy: (webhook) => `Posted by the “${webhook}” webhook`,
  reactors: (reaction) => `${reaction.count} ${reaction.count === 1 ? "reaction" : "reactions"}`,
  react: "React",
  reply: "Reply",
  more: "More",
  copyText: "Copy text",
  copyLink: "Copy link",
  pin: "Pin for everyone",
  unpin: "Unpin for everyone",
  edit: "Edit",
  delete: "Delete",
};

/** What the person may do to this message. Anything absent is not offered. */
export interface CommsMessageRowPermissions {
  react?: boolean;
  reply?: boolean;
  /** The author only: an admin can delete but never rewrite. */
  edit?: boolean;
  delete?: boolean;
  pin?: boolean;
}
