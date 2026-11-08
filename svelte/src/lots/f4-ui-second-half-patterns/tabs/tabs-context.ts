import { getContext, setContext } from "svelte";

export type TabsOrientation = "horizontal" | "vertical";
export type TabActivationDirection = "none" | "left" | "right" | "up" | "down";

/** What the root shares with its list, triggers and panels (Base UI's `TabsRootContext`). */
export interface TabsContext {
  readonly value: string | null;
  readonly orientation: TabsOrientation;
  readonly activationDirection: TabActivationDirection;
  readonly rootId: string;
  select: (value: string, direction: TabActivationDirection) => void;
}

const KEY = Symbol("tabs-root");

export function setTabsContext(context: TabsContext): void {
  setContext(KEY, context);
}

export function getTabsContext(): TabsContext {
  return getContext<TabsContext>(KEY);
}

/** A DOM id from a tab value: ids cannot hold spaces, and `aria-controls` takes one id. */
export function slugOf(value: string): string {
  return value.replace(/[^A-Za-z0-9_-]/g, "-");
}

export function tabIdOf(rootId: string, value: string): string {
  return `${rootId}-tab-${slugOf(value)}`;
}

export function panelIdOf(rootId: string, value: string): string {
  return `${rootId}-panel-${slugOf(value)}`;
}
