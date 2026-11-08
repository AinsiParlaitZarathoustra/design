import type { StoryEntry } from "../types";
import LayoutStories from "./f5-layout-shell-stories.svelte";

/**
 * The layout family's story registry. Each id is the source story's exact id
 * in `storybook-static/index.json`. Statuses follow the comparison: "écart
 * identifié" where the Storybook diff is a few text pixels (see the report).
 * Shell stories join this list when their primitives land.
 */
const frame = (story: string) => ({
  component: LayoutStories as never,
  props: { story },
});

const split = (story: string) => ({
  component: LayoutStories as never,
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
];

export default entries;
