import type { Component } from "svelte";

export interface StoryEntry {
  /** The source story's exact id from `storybook-static/index.json`. */
  id: string;
  title: string;
  name: string;
  // Stories take their scenario as a prop (`story="sizes"`), so one component
  // backs a whole family instead of one wrapper file per story.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Component<any>;
  props?: Record<string, unknown>;
  /** `page` for stories that paint a portal (an open dialog). */
  mode?: "element" | "page";
  appearance?: "dark" | "light";
  status: "porté" | "écart identifié" | "bloqué";
}
