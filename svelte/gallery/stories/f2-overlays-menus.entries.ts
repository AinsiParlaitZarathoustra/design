import type { Component } from "svelte";
import type { StoryEntry } from "../types";
import Stories from "./f2-overlays-menus-stories.svelte";

const scenario = (story: string) => ({
  component: Stories as unknown as Component<Record<string, never>>,
  props: { story },
});

const entries: StoryEntry[] = [
  { id: "primitives-colorpicker--default", title: "Primitives/ColorPicker", name: "Default", status: "porté", ...scenario("color-picker-default") },
  { id: "primitives-colorpicker--red", title: "Primitives/ColorPicker", name: "Red", status: "porté", ...scenario("color-picker-red") },
  { id: "primitives-colorpicker--black", title: "Primitives/ColorPicker", name: "Black", status: "porté", ...scenario("color-picker-black") },
  { id: "primitives-colorpicker--hue-slider-alone", title: "Primitives/ColorPicker", name: "Hue Slider Alone", status: "porté", ...scenario("color-hue-slider-alone") },
  { id: "primitives-tooltip--default", title: "Primitives/Tooltip", name: "Default", status: "porté", ...scenario("tooltip-default") },
  { id: "primitives-tooltip--open", title: "Primitives/Tooltip", name: "Open", status: "porté", ...scenario("tooltip-open") },
  { id: "primitives-tooltip--open-below", title: "Primitives/Tooltip", name: "Open Below", status: "porté", ...scenario("tooltip-open-below") },
  { id: "primitives-tooltip--long-text", title: "Primitives/Tooltip", name: "Long Text", status: "porté", ...scenario("tooltip-long-text") },
  { id: "primitives-tooltip--hint-row", title: "Primitives/Tooltip", name: "Hint Row", status: "porté", ...scenario("tooltip-hint-row") },
  { id: "primitives-tooltip--hint-keycaps", title: "Primitives/Tooltip", name: "Hint Keycaps", status: "porté", ...scenario("tooltip-hint-keycaps") },
  { id: "primitives-tooltip--exit", title: "Primitives/Tooltip", name: "Exit", status: "porté", ...scenario("tooltip-exit") },
];

export default entries;
