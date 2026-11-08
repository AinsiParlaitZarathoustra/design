import type { Component } from "svelte";
import type { StoryEntry } from "../types";
import ModelBadgeStories from "./f4-ui-second-half-patterns/model-badge-stories.svelte";

// The entries of the `f4-ui-second-half-patterns` lot. Each id is the oracle's
// exact id from `storybook-static/index.json`.
const modelBadge = (story: string) => ({
  component: ModelBadgeStories as unknown as Component<Record<string, never>>,
  props: { story },
});

const ENTRIES: StoryEntry[] = [
  { id: "components-modelbadge--default", title: "Components/ModelBadge", name: "Default", status: "porté", ...modelBadge("default") },
  { id: "components-modelbadge--families", title: "Components/ModelBadge", name: "Families", status: "porté", ...modelBadge("families") },
  { id: "components-modelbadge--sizes", title: "Components/ModelBadge", name: "Sizes", status: "porté", ...modelBadge("sizes") },
  { id: "components-modelbadge--unknown", title: "Components/ModelBadge", name: "Unknown", status: "porté", ...modelBadge("unknown") },
  { id: "components-modelbadge--explicit-family", title: "Components/ModelBadge", name: "Explicit Family", status: "porté", ...modelBadge("explicit-family") },
  { id: "components-modelbadge--long-name", title: "Components/ModelBadge", name: "Long Name", status: "porté", ...modelBadge("long-name") },
  { id: "components-modelbadge--marks", title: "Components/ModelBadge", name: "Marks", status: "porté", ...modelBadge("marks") },
];

export default ENTRIES;
