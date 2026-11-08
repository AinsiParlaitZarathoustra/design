import type { StoryEntry } from "../types";
import Stories from "./f7-session-comms-stories.svelte";

export default [
  { id: "blocks-comms-conversationrow--channel", title: "Blocks/Comms/ConversationRow", name: "Channel", component: Stories as never, props: { story: "blocks-comms-conversationrow--channel" }, status: "porté" },
  { id: "blocks-comms-conversationrow--private-channel", title: "Blocks/Comms/ConversationRow", name: "Private Channel", component: Stories as never, props: { story: "blocks-comms-conversationrow--private-channel" }, status: "porté" },
  { id: "blocks-comms-conversationrow--selected", title: "Blocks/Comms/ConversationRow", name: "Selected", component: Stories as never, props: { story: "blocks-comms-conversationrow--selected" }, status: "porté" },
  { id: "blocks-comms-conversationrow--unread", title: "Blocks/Comms/ConversationRow", name: "Unread", component: Stories as never, props: { story: "blocks-comms-conversationrow--unread" }, status: "porté" },
  { id: "blocks-comms-conversationrow--mentions", title: "Blocks/Comms/ConversationRow", name: "Mentions", component: Stories as never, props: { story: "blocks-comms-conversationrow--mentions" }, status: "porté" },
  { id: "blocks-comms-conversationrow--many-unread", title: "Blocks/Comms/ConversationRow", name: "Many Unread", component: Stories as never, props: { story: "blocks-comms-conversationrow--many-unread" }, status: "porté" },
  { id: "blocks-comms-conversationrow--direct-message-online", title: "Blocks/Comms/ConversationRow", name: "Direct Message Online", component: Stories as never, props: { story: "blocks-comms-conversationrow--direct-message-online" }, status: "porté" },
  { id: "blocks-comms-conversationrow--direct-message-offline", title: "Blocks/Comms/ConversationRow", name: "Direct Message Offline", component: Stories as never, props: { story: "blocks-comms-conversationrow--direct-message-offline" }, status: "porté" },
  { id: "blocks-comms-conversationrow--group", title: "Blocks/Comms/ConversationRow", name: "Group", component: Stories as never, props: { story: "blocks-comms-conversationrow--group" }, status: "porté" },
  { id: "blocks-comms-conversationrow--archived", title: "Blocks/Comms/ConversationRow", name: "Archived", component: Stories as never, props: { story: "blocks-comms-conversationrow--archived" }, status: "porté" },
  { id: "blocks-comms-conversationrow--long-name", title: "Blocks/Comms/ConversationRow", name: "Long Name", component: Stories as never, props: { story: "blocks-comms-conversationrow--long-name" }, status: "porté" },
  { id: "blocks-comms-conversationrow--list", title: "Blocks/Comms/ConversationRow", name: "List", component: Stories as never, props: { story: "blocks-comms-conversationrow--list" }, status: "porté" },
  { id: "blocks-comms-conversationrow--disabled-row", title: "Blocks/Comms/ConversationRow", name: "Disabled Row", component: Stories as never, props: { story: "blocks-comms-conversationrow--disabled-row" }, status: "porté" },
] satisfies StoryEntry[];
