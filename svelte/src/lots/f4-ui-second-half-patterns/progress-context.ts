import { getContext, setContext } from "svelte";
import type { ProgressStatus } from "./progress-model";

/** What the root shares with its parts (Base UI's `ProgressRootContext`). */
export interface ProgressContext {
  readonly status: ProgressStatus;
  readonly percentageValue: number | null;
  readonly formattedValue: string;
  readonly value: number | null | undefined;
  /** The label's id, written by `ProgressLabel` while it is mounted. */
  readonly label: { id: string | undefined };
}

const KEY = Symbol("progress-root");

export function setProgressContext(context: ProgressContext): void {
  setContext(KEY, context);
}

export function getProgressContext(): ProgressContext {
  return getContext<ProgressContext>(KEY);
}

/** The state attributes every part carries (`data-progressing`, `-complete`, `-indeterminate`). */
export function stateAttributes(status: ProgressStatus): Record<string, string | undefined> {
  return {
    "data-progressing": status === "progressing" ? "" : undefined,
    "data-complete": status === "complete" ? "" : undefined,
    "data-indeterminate": status === "indeterminate" ? "" : undefined,
  };
}
