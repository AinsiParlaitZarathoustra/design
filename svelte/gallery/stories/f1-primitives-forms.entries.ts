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
const SEGMENTED = "Primitives/Segmented";
const SLIDER = "Primitives/Slider";
const SPLIT_BUTTON = "Primitives/SplitButton";
const SECRET_INPUT = "Primitives/SecretInput";
const CHECKBOX = "Components/Checkbox";
const LABEL = "Components/Label";
const FIELD = "Components/Field";
const INPUT_GROUP = "Components/InputGroup";
const TEXTAREA = "Components/Textarea";
const RADIO_GROUP = "Components/RadioGroup";
const TOGGLE = "Components/Toggle";
const TOGGLE_GROUP = "Components/ToggleGroup";

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
  family("primitives-iconbutton--disabled", ICON_BUTTON, "Disabled", "disabled"),
  family("primitives-iconbutton--with-hint", ICON_BUTTON, "With Hint", "with-hint"),
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
  family("primitives-segmented--default", SEGMENTED, "Default", "segmented-default"),
  family("primitives-segmented--small", SEGMENTED, "Small", "segmented-small"),
  family("primitives-segmented--disabled", SEGMENTED, "Disabled", "segmented-disabled"),
  family("primitives-segmented--no-selection", SEGMENTED, "No Selection", "segmented-no-selection"),
  family("primitives-segmented--with-icon", SEGMENTED, "With Icon", "segmented-with-icon"),
  family("primitives-segmented--icon-only", SEGMENTED, "Icon Only", "segmented-icon-only"),
  family("primitives-segmented--node-labels", SEGMENTED, "Node Labels", "segmented-node-labels"),
  family("primitives-segmented--long-text", SEGMENTED, "Long Text", "segmented-long-text"),
  family("primitives-slider--default", SLIDER, "Default", "slider-default"),
  family("primitives-slider--minimum", SLIDER, "Minimum", "slider-minimum"),
  family("primitives-slider--maximum", SLIDER, "Maximum", "slider-maximum"),
  family("primitives-slider--stepped", SLIDER, "Stepped", "slider-stepped"),
  family("primitives-slider--disabled", SLIDER, "Disabled", "slider-disabled"),
  family("primitives-splitbutton--default", SPLIT_BUTTON, "Default", "splitbutton-default"),
  family("primitives-splitbutton--busy", SPLIT_BUTTON, "Busy", "splitbutton-busy"),
  family("primitives-splitbutton--disabled", SPLIT_BUTTON, "Disabled", "splitbutton-disabled"),
  family("primitives-splitbutton--open", SPLIT_BUTTON, "Open", "splitbutton-open"),
  family("primitives-secretinput--empty", SECRET_INPUT, "Empty", "secretinput-empty"),
  family("primitives-secretinput--configured", SECRET_INPUT, "Configured", "secretinput-configured"),
  family("primitives-secretinput--custom-placeholder", SECRET_INPUT, "Custom Placeholder", "secretinput-custom-placeholder"),
  family("primitives-secretinput--disabled", SECRET_INPUT, "Disabled", "secretinput-disabled"),
  family("primitives-secretinput--invalid", SECRET_INPUT, "Invalid", "secretinput-invalid"),
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
  family("components-radiogroup--default", RADIO_GROUP, "Default", "radiogroup-default"),
  family("components-radiogroup--disabled", RADIO_GROUP, "Disabled", "radiogroup-disabled"),
  family("components-radiogroup--error", RADIO_GROUP, "Error", "radiogroup-error"),
  family("components-radiogroup--long-text", RADIO_GROUP, "Long Text", "radiogroup-long-text"),
  family("components-radiogroup--many-items", RADIO_GROUP, "Many Items", "radiogroup-many-items"),
  family("components-toggle--default", TOGGLE, "Default", "toggle-default"),
  family("components-toggle--pressed", TOGGLE, "Pressed", "toggle-pressed"),
  family("components-toggle--outline", TOGGLE, "Outline", "toggle-outline"),
  family("components-toggle--disabled", TOGGLE, "Disabled", "toggle-disabled"),
  family("components-toggle--with-icon", TOGGLE, "With Icon", "toggle-with-icon"),
  family("components-toggle--sizes", TOGGLE, "Sizes", "toggle-sizes"),
  family("components-toggle--long-text", TOGGLE, "Long Text", "toggle-long-text"),
  family("components-togglegroup--default", TOGGLE_GROUP, "Default", "togglegroup-default"),
  family("components-togglegroup--outline", TOGGLE_GROUP, "Outline", "togglegroup-outline"),
  family("components-togglegroup--joined", TOGGLE_GROUP, "Joined", "togglegroup-joined"),
  family("components-togglegroup--vertical", TOGGLE_GROUP, "Vertical", "togglegroup-vertical"),
  family("components-togglegroup--disabled", TOGGLE_GROUP, "Disabled", "togglegroup-disabled"),
  family("components-togglegroup--multiple", TOGGLE_GROUP, "Multiple", "togglegroup-multiple"),
  family("components-togglegroup--with-text", TOGGLE_GROUP, "With Text", "togglegroup-with-text"),
] satisfies StoryEntry[];
