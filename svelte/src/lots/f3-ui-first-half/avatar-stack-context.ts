import { getContext, setContext } from "svelte";

// The stack's shared state: which face the pointer is on, and whether the
// user asked for reduced motion (then every face holds still).

export interface AvatarStackState {
  readonly active: number | null;
  readonly still: boolean;
  enter: (index: number) => void;
  register: () => number;
}

const KEY = Symbol("atlas.avatar-stack");

export function setAvatarStack(state: AvatarStackState) {
  setContext(KEY, state);
}

export function getAvatarStack(): AvatarStackState {
  const state = getContext<AvatarStackState | undefined>(KEY);
  if (!state) throw new Error("AvatarStackItem must be used inside <AvatarStack>.");
  return state;
}
