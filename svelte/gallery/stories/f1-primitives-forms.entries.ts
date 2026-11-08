import type { StoryEntry } from "../types";
import FamilyStories from "./f1-primitives-forms-stories.svelte";

const family = (
  id: string,
  title: string,
  name: string,
  story: string,
  status: StoryEntry["status"] = "porté",
): StoryEntry => ({
  id,
  title,
  name,
  component: FamilyStories as never,
  props: { story },
  status,
});

const ANIMATED = "Primitives/AnimatedIcon";
const ICON_BUTTON = "Primitives/IconButton";

export default [
  family("primitives-animatedicon--off", ANIMATED, "Off", "off"),
  family("primitives-animatedicon--on", ANIMATED, "On", "on"),
  family("primitives-animatedicon--one-shots", ANIMATED, "One Shots", "one-shots"),
  family("primitives-iconbutton--default", ICON_BUTTON, "Default", "default"),
  family("primitives-iconbutton--variants", ICON_BUTTON, "Variants", "variants"),
  family("primitives-iconbutton--sizes", ICON_BUTTON, "Sizes", "sizes"),
  family("primitives-iconbutton--ghost-destructive", ICON_BUTTON, "Ghost Destructive", "ghost-destructive"),
  family("primitives-iconbutton--active", ICON_BUTTON, "Active", "active"),
  family("primitives-iconbutton--pressed", ICON_BUTTON, "Pressed", "pressed"),
  family("primitives-iconbutton--round-stepper", ICON_BUTTON, "Round Stepper", "round-stepper"),
  family("primitives-iconbutton--disabled", ICON_BUTTON, "Disabled", "disabled", "écart identifié"),
  family("primitives-iconbutton--with-hint", ICON_BUTTON, "With Hint", "with-hint", "écart identifié"),
  family("primitives-iconbutton--element-icon", ICON_BUTTON, "Element Icon", "element-icon"),
  family("primitives-iconbutton--tile-remove", ICON_BUTTON, "Tile Remove", "tile-remove"),
  family("primitives-iconbutton--floating", ICON_BUTTON, "Floating", "floating"),
  family("primitives-iconbutton--loading", ICON_BUTTON, "Loading", "loading"),
] satisfies StoryEntry[];
