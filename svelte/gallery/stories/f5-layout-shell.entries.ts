import type { StoryEntry } from "../types";
import LayoutStories from "./f5-layout-shell-stories.svelte";
import UiScaleStories from "./f5-layout-shell/ui-scale-stories.svelte";
import SidebarControlsStories from "./f5-layout-shell/sidebar-controls-stories.svelte";

/**
 * The layout and shell family's story registry. Each id is the source story's
 * exact id in `storybook-static/index.json`. The status of each story follows
 * its comparison with the React oracle, not the port.
 */
const frame = (story: string) => ({
  component: LayoutStories as never,
  props: { story },
});

const split = (story: string) => ({
  component: LayoutStories as never,
  props: { story },
});

const scale = (story: string) => ({
  component: UiScaleStories as never,
  props: { story },
});

const controls = (story: string) => ({
  component: SidebarControlsStories as never,
  props: { story },
});

const entries: StoryEntry[] = [
  { id: "layout-appframe--default", title: "Layout/AppFrame", name: "Default", status: "porté", ...frame("frame-default") },
  { id: "layout-appframe--with-dock", title: "Layout/AppFrame", name: "With Dock", status: "écart identifié", ...frame("frame-with-dock") },
  { id: "layout-appframe--half-dock", title: "Layout/AppFrame", name: "Half Dock", status: "écart identifié", ...frame("frame-half-dock") },
  { id: "layout-appframe--empty", title: "Layout/AppFrame", name: "Empty", status: "porté", ...frame("frame-empty") },
  { id: "layout-appframe--light", title: "Layout/AppFrame", name: "Light", appearance: "light", status: "écart identifié", ...frame("frame-light") },
  { id: "layout-appframe--titlebar-inset", title: "Layout/AppFrame", name: "Titlebar Inset", status: "écart identifié", ...frame("frame-titlebar-inset") },
  { id: "layout-appframe--phone", title: "Layout/AppFrame", name: "Phone", status: "porté", ...frame("frame-phone") },
  { id: "layout-resizablesplit--horizontal", title: "Layout/ResizableSplit", name: "Horizontal", status: "écart identifié", ...split("horizontal") },
  { id: "layout-resizablesplit--vertical", title: "Layout/ResizableSplit", name: "Vertical", status: "écart identifié", ...split("vertical") },
  { id: "layout-resizablesplit--many-panes", title: "Layout/ResizableSplit", name: "Many Panes", status: "écart identifié", ...split("many-panes") },
  { id: "layout-resizablesplit--collapsed-pane", title: "Layout/ResizableSplit", name: "Collapsed Pane", status: "porté", ...split("collapsed-pane") },
  { id: "layout-resizablesplit--nested", title: "Layout/ResizableSplit", name: "Nested", status: "porté", ...split("nested") },
  { id: "layout-resizablesplit--light", title: "Layout/ResizableSplit", name: "Light", status: "écart identifié", ...split("light") },

  { id: "shell-uiscale--default", title: "Shell/UiScale", name: "Default", status: "écart identifié", ...scale("default") },
  { id: "shell-uiscale--open", title: "Shell/UiScale", name: "Open", status: "écart identifié", ...scale("open") },
  { id: "shell-uiscale--icon-only", title: "Shell/UiScale", name: "Icon Only", status: "écart identifié", ...scale("icon-only") },
  { id: "shell-uiscale--at-minimum", title: "Shell/UiScale", name: "At Minimum", status: "écart identifié", ...scale("at-minimum") },
  { id: "shell-uiscale--panel", title: "Shell/UiScale", name: "Panel", status: "écart identifié", ...scale("panel") },
  { id: "shell-uiscale--with-shortcuts", title: "Shell/UiScale", name: "With Shortcuts", status: "écart identifié", ...scale("with-shortcuts") },

  { id: "shell-sidebarcontrols--default", title: "Shell/SidebarControls", name: "Default", status: "écart identifié", ...controls("default") },
  { id: "shell-sidebarcontrols--profile-open", title: "Shell/SidebarControls", name: "Profile Open", status: "écart identifié", ...controls("profile-open") },
  { id: "shell-sidebarcontrols--info-open", title: "Shell/SidebarControls", name: "Info Open", status: "écart identifié", ...controls("info-open") },
  { id: "shell-sidebarcontrols--info-few-links", title: "Shell/SidebarControls", name: "Info Few Links", status: "écart identifié", ...controls("info-few-links") },
  { id: "shell-sidebarcontrols--long-text", title: "Shell/SidebarControls", name: "Long Text", status: "écart identifié", ...controls("long-text") },
];

export default entries;
