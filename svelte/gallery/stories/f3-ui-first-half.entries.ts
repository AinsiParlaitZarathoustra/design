import type { Component } from "svelte";
import Stories from "./f3-ui-first-half-stories.svelte";

// Entries of the f3-ui-first-half lot. Each id is the source story's id from
// `storybook-static/index.json`; the scenario is the `story` prop.
const entry = (id: string, title: string, name: string) => ({
  id,
  title,
  name,
  component: Stories as Component<Record<string, unknown>>,
  props: { story: id },
  status: "porté" as const,
});

export default [
  entry("components-agenticon--external-monochrome", "Components/AgentIcon", "External Monochrome"),
  entry("components-agenticon--external-colour", "Components/AgentIcon", "External Colour"),
  entry("components-agenticon--monogram", "Components/AgentIcon", "Monogram"),
  entry("components-accordion--default", "Components/Accordion", "Default"),
  entry("components-accordion--open", "Components/Accordion", "Open"),
  entry("components-accordion--multiple", "Components/Accordion", "Multiple"),
  entry("components-accordion--disabled", "Components/Accordion", "Disabled"),
  entry("components-accordion--long-text", "Components/Accordion", "Long Text"),
  entry("components-accordion--many-items", "Components/Accordion", "Many Items"),
  entry("components-atlasmark--default", "Components/AtlasMark", "Default"),
  entry("components-atlasmark--sizes", "Components/AtlasMark", "Sizes"),
  entry("components-atlasmark--inks", "Components/AtlasMark", "Inks"),
  entry("components-atlasmark--badge", "Components/AtlasMark", "Badge"),
  entry("components-atlasmark--wordmark", "Components/AtlasMark", "Wordmark"),
  entry("components-atlasmark--badge-tones", "Components/AtlasMark", "Badge Tones"),
  entry("components-atlasmark--lockups", "Components/AtlasMark", "Lockups"),
  entry("components-avatarstack--default", "Components/AvatarStack", "Default"),
  entry("components-avatarstack--empty", "Components/AvatarStack", "Empty"),
  entry("components-avatarstack--single", "Components/AvatarStack", "Single"),
  entry("components-avatarstack--large", "Components/AvatarStack", "Large"),
  entry("components-avatarstack--many-items", "Components/AvatarStack", "Many Items"),
  entry("components-avatar--default", "Components/Avatar", "Default"),
  entry("components-avatar--with-image", "Components/Avatar", "With Image"),
  entry("components-avatar--error-state", "Components/Avatar", "Error"),
  entry("components-avatar--sizes", "Components/Avatar", "Sizes"),
  entry("components-avatar--group", "Components/Avatar", "Group"),
  entry("components-avatar--many-items", "Components/Avatar", "Many Items"),
];
