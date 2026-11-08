import type { Component } from "svelte";
import type { StoryEntry } from "../types";
import ModelBadgeStories from "./f4-ui-second-half-patterns/model-badge-stories.svelte";
import PillStories from "./f4-ui-second-half-patterns/pill-stories.svelte";
import ProgressStories from "./f4-ui-second-half-patterns/progress-stories.svelte";
import StatusDotStories from "./f4-ui-second-half-patterns/status-dot-stories.svelte";

// The entries of the `f4-ui-second-half-patterns` lot. Each id is the oracle's
// exact id from `storybook-static/index.json`. Each family's scenarios live in
// `f4-ui-second-half-patterns/<family>-stories.svelte`, selected by `story`.
type Scenarios = Component<Record<string, never>>;
const scenarios = (component: unknown, story: string) => ({
  component: component as Scenarios,
  props: { story },
});

const ENTRIES: StoryEntry[] = [
  // ModelBadge
  { id: "components-modelbadge--default", title: "Components/ModelBadge", name: "Default", status: "porté", ...scenarios(ModelBadgeStories, "default") },
  { id: "components-modelbadge--families", title: "Components/ModelBadge", name: "Families", status: "porté", ...scenarios(ModelBadgeStories, "families") },
  { id: "components-modelbadge--sizes", title: "Components/ModelBadge", name: "Sizes", status: "porté", ...scenarios(ModelBadgeStories, "sizes") },
  { id: "components-modelbadge--unknown", title: "Components/ModelBadge", name: "Unknown", status: "porté", ...scenarios(ModelBadgeStories, "unknown") },
  { id: "components-modelbadge--explicit-family", title: "Components/ModelBadge", name: "Explicit Family", status: "porté", ...scenarios(ModelBadgeStories, "explicit-family") },
  { id: "components-modelbadge--long-name", title: "Components/ModelBadge", name: "Long Name", status: "porté", ...scenarios(ModelBadgeStories, "long-name") },
  { id: "components-modelbadge--marks", title: "Components/ModelBadge", name: "Marks", status: "porté", ...scenarios(ModelBadgeStories, "marks") },
  // Pill
  { id: "components-pill--default", title: "Components/Pill", name: "Default", status: "porté", ...scenarios(PillStories, "default") },
  { id: "components-pill--with-icon", title: "Components/Pill", name: "With Icon", status: "porté", ...scenarios(PillStories, "with-icon") },
  { id: "components-pill--removable", title: "Components/Pill", name: "Removable", status: "porté", ...scenarios(PillStories, "removable") },
  { id: "components-pill--status-dots", title: "Components/Pill", name: "Status Dots", status: "porté", ...scenarios(PillStories, "status-dots") },
  { id: "components-pill--many-items", title: "Components/Pill", name: "Many Items", status: "porté", ...scenarios(PillStories, "many-items") },
  { id: "components-pill--long-text", title: "Components/Pill", name: "Long Text", status: "porté", ...scenarios(PillStories, "long-text") },
  { id: "components-pill--as-button", title: "Components/Pill", name: "As Button", status: "porté", ...scenarios(PillStories, "as-button") },
  { id: "components-pill--sizes", title: "Components/Pill", name: "Sizes", status: "porté", ...scenarios(PillStories, "sizes") },
  { id: "components-pill--trailing-action", title: "Components/Pill", name: "Trailing Action", status: "porté", ...scenarios(PillStories, "trailing-action") },
  { id: "components-pill--raised", title: "Components/Pill", name: "Raised", status: "porté", ...scenarios(PillStories, "raised") },
  // Progress
  { id: "components-progress--default", title: "Components/Progress", name: "Default", status: "porté", ...scenarios(ProgressStories, "default") },
  { id: "components-progress--empty", title: "Components/Progress", name: "Empty", status: "porté", ...scenarios(ProgressStories, "empty") },
  { id: "components-progress--complete", title: "Components/Progress", name: "Complete", status: "porté", ...scenarios(ProgressStories, "complete") },
  { id: "components-progress--loading", title: "Components/Progress", name: "Loading", status: "porté", ...scenarios(ProgressStories, "loading") },
  { id: "components-progress--long-text", title: "Components/Progress", name: "Long Text", status: "porté", ...scenarios(ProgressStories, "long-text") },
  { id: "components-progress--bare-track", title: "Components/Progress", name: "Bare Track", status: "porté", ...scenarios(ProgressStories, "bare-track") },
  { id: "components-progress--tones", title: "Components/Progress", name: "Tones", status: "porté", ...scenarios(ProgressStories, "tones") },
  { id: "components-progress--many-items", title: "Components/Progress", name: "Many Items", status: "porté", ...scenarios(ProgressStories, "many-items") },
  // StatusDot
  { id: "components-statusdot--default", title: "Components/StatusDot", name: "Default", status: "porté", ...scenarios(StatusDotStories, "default") },
  { id: "components-statusdot--tones", title: "Components/StatusDot", name: "Tones", status: "porté", ...scenarios(StatusDotStories, "tones") },
  { id: "components-statusdot--sizes", title: "Components/StatusDot", name: "Sizes", status: "porté", ...scenarios(StatusDotStories, "sizes") },
  { id: "components-statusdot--on-an-icon", title: "Components/StatusDot", name: "On An Icon", status: "porté", ...scenarios(StatusDotStories, "on-an-icon") },
];

export default ENTRIES;
