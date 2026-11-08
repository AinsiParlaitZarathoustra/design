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

const HINT_GROUP = "Primitives/HintGroup";
const SCROLL_AREA = "Primitives/ScrollArea";
const SCROLL_FADE = "Primitives/ScrollFade";
const SWITCH = "Primitives/Switch";

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
  family("primitives-hintgroup--default", HINT_GROUP, "Default", "hint-default"),
  family("primitives-hintgroup--opens-upward", HINT_GROUP, "Opens Upward", "hint-opens-upward"),
  family("primitives-hintgroup--with-disabled", HINT_GROUP, "With Disabled", "hint-with-disabled"),
  family("primitives-scrollarea--default", SCROLL_AREA, "Default", "scroll-area-default"),
  family("primitives-scrollarea--empty", SCROLL_AREA, "Empty", "scroll-area-empty"),
  family("primitives-scrollfade--default", SCROLL_FADE, "Default", "scroll-fade-default"),
  family("primitives-scrollfade--short-list", SCROLL_FADE, "Short List", "scroll-fade-short-list"),
  family("primitives-switch--off", SWITCH, "Off", "switch-off"),
  family("primitives-switch--on", SWITCH, "On", "switch-on"),
  family("primitives-switch--mixed", SWITCH, "Mixed", "switch-mixed"),
  family("primitives-switch--small", SWITCH, "Small", "switch-small"),
  family("primitives-switch--disabled", SWITCH, "Disabled", "switch-disabled"),
  family("primitives-switch--check-appearance", SWITCH, "Check Appearance", "switch-check-appearance"),
  family("primitives-switch--in-a-settings-row", SWITCH, "In A Settings Row", "switch-in-a-settings-row"),
] satisfies StoryEntry[];
