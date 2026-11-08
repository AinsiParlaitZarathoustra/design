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
const CHECKBOX = "Components/Checkbox";
const LABEL = "Components/Label";
const FIELD = "Components/Field";
const INPUT_GROUP = "Components/InputGroup";
const TEXTAREA = "Components/Textarea";

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
  family("components-checkbox--default", CHECKBOX, "Default", "checkbox-default"),
  family("components-checkbox--checked", CHECKBOX, "Checked", "checkbox-checked"),
  family("components-checkbox--indeterminate", CHECKBOX, "Indeterminate", "checkbox-indeterminate"),
  family("components-checkbox--disabled", CHECKBOX, "Disabled", "checkbox-disabled"),
  family("components-checkbox--error-state", CHECKBOX, "Error", "checkbox-error-state"),
  family("components-checkbox--long-text", CHECKBOX, "Long Text", "checkbox-long-text"),
  family("components-checkbox--many-items", CHECKBOX, "Many Items", "checkbox-many-items"),
  family("components-label--default", LABEL, "Default", "label-default"),
  family("components-label--with-input", LABEL, "With Input", "label-with-input"),
  family("components-label--with-checkbox", LABEL, "With Checkbox", "label-with-checkbox"),
  family("components-label--disabled", LABEL, "Disabled", "label-disabled"),
  family("components-label--long-text", LABEL, "Long Text", "label-long-text"),
  family("components-field--default", FIELD, "Default", "field-default"),
  family("components-field--disabled", FIELD, "Disabled", "field-disabled"),
  family("components-field--error-state", FIELD, "Error", "field-error-state"),
  family("components-field--long-text", FIELD, "Long Text", "field-long-text"),
  family("components-field--horizontal", FIELD, "Horizontal", "field-horizontal"),
  family("components-field--form", FIELD, "Form", "field-form"),
  family("components-field--choice-card", FIELD, "Choice Card", "field-choice-card"),
  family("components-field--many-errors", FIELD, "Many Errors", "field-many-errors"),
  family("components-inputgroup--default", INPUT_GROUP, "Default", "input-group-default"),
  family("components-inputgroup--disabled", INPUT_GROUP, "Disabled", "input-group-disabled"),
  family("components-inputgroup--autofocused", INPUT_GROUP, "Autofocused", "input-group-autofocused"),
  family("components-inputgroup--clicked", INPUT_GROUP, "Clicked", "input-group-clicked"),
  family("components-inputgroup--error", INPUT_GROUP, "Error", "input-group-error"),
  family("components-inputgroup--long-text", INPUT_GROUP, "Long Text", "input-group-long-text"),
  family("components-inputgroup--with-button", INPUT_GROUP, "With Button", "input-group-with-button"),
  family("components-inputgroup--with-text", INPUT_GROUP, "With Text", "input-group-with-text"),
  family("components-inputgroup--textarea", INPUT_GROUP, "Textarea", "input-group-textarea"),
  family("components-textarea--default", TEXTAREA, "Default", "textarea-default"),
  family("components-textarea--disabled", TEXTAREA, "Disabled", "textarea-disabled"),
  family("components-textarea--error", TEXTAREA, "Error", "textarea-error"),
  family("components-textarea--long-text", TEXTAREA, "Long Text", "textarea-long-text"),
] satisfies StoryEntry[];
