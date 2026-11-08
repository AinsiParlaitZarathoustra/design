import { getContext, setContext } from "svelte";

// The avatar's shared state (port of Base UI's `Avatar` context): the size
// ladder step, and the image's loading status, which decides whether the
// fallback initials show.

export type AvatarSize = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg";
export type AvatarImageStatus = "idle" | "loading" | "loaded" | "error";

export interface AvatarState {
  readonly size: AvatarSize;
  readonly imageStatus: AvatarImageStatus;
  setImageStatus: (status: AvatarImageStatus) => void;
}

const KEY = Symbol("atlas.avatar");

export function setAvatar(state: AvatarState) {
  setContext(KEY, state);
}

export function getAvatar(): AvatarState {
  const state = getContext<AvatarState | undefined>(KEY);
  if (!state) throw new Error("AvatarImage and AvatarFallback must be used inside <Avatar>.");
  return state;
}
