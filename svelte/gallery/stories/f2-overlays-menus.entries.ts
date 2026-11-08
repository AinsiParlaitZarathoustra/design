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
  { id: "primitives-popover--default", title: "Primitives/Popover", name: "Default", status: "porté", ...scenario("popover-default") },
  { id: "primitives-popover--open", title: "Primitives/Popover", name: "Open", status: "porté", ...scenario("popover-open") },
  { id: "primitives-popover--with-arrow", title: "Primitives/Popover", name: "With Arrow", status: "porté", ...scenario("popover-with-arrow") },
  { id: "primitives-popover--tinted", title: "Primitives/Popover", name: "Tinted", status: "porté", ...scenario("popover-tinted") },
  { id: "primitives-popover--glass", title: "Primitives/Popover", name: "Glass", status: "porté", ...scenario("popover-glass") },
  { id: "primitives-popover--long-text", title: "Primitives/Popover", name: "Long Text", status: "porté", ...scenario("popover-long-text") },
  { id: "primitives-popover--exit", title: "Primitives/Popover", name: "Exit", status: "porté", ...scenario("popover-exit") },
  { id: "primitives-dropdownmenu--default", title: "Primitives/DropdownMenu", name: "Default", status: "porté", ...scenario("dropdownmenu-default") },
  { id: "primitives-dropdownmenu--open", title: "Primitives/DropdownMenu", name: "Open", status: "porté", ...scenario("dropdownmenu-open") },
  { id: "primitives-dropdownmenu--icon-rows-align", title: "Primitives/DropdownMenu", name: "Icon Rows Align", status: "porté", ...scenario("dropdownmenu-icon-rows-align") },
  { id: "primitives-dropdownmenu--disabled-item", title: "Primitives/DropdownMenu", name: "Disabled Item", status: "porté", ...scenario("dropdownmenu-disabled-item") },
  { id: "primitives-dropdownmenu--long-text", title: "Primitives/DropdownMenu", name: "Long Text", status: "porté", ...scenario("dropdownmenu-long-text") },
  { id: "primitives-dropdownmenu--exit", title: "Primitives/DropdownMenu", name: "Exit", status: "porté", ...scenario("dropdownmenu-exit") },
  { id: "primitives-dropdownmenu--recipes", title: "Primitives/DropdownMenu", name: "Recipes", status: "porté", ...scenario("dropdownmenu-recipes") },
];

export default entries;
