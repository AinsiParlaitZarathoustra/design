import type { StoryEntry } from "../types";
import LayoutStories from "./f5-layout-shell-stories.svelte";
import UiScaleStories from "./f5-layout-shell/ui-scale-stories.svelte";
import SidebarControlsStories from "./f5-layout-shell/sidebar-controls-stories.svelte";
import ListDetailStories from "./f5-layout-shell/list-detail-stories.svelte";
import SettingsShellStories from "./f5-layout-shell/settings-shell-stories.svelte";
import SidebarStories from "./f5-layout-shell/sidebar-stories.svelte";
import OrgSwitcherStories from "./f5-layout-shell/org-switcher-stories.svelte";

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

const listDetail = (story: string) => ({
  component: ListDetailStories as never,
  props: { story },
});

const settings = (story: string) => ({
  component: SettingsShellStories as never,
  props: { story },
});

const sidebar = (story: string) => ({
  component: SidebarStories as never,
  props: { story },
});

const orgSwitcher = (story: string) => ({
  component: OrgSwitcherStories as never,
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
  { id: "shell-listdetail--default", title: "Shell/ListDetail", name: "Default", status: "écart identifié", ...listDetail("default") },
  { id: "shell-listdetail--wide", title: "Shell/ListDetail", name: "Wide", status: "écart identifié", ...listDetail("wide") },
  { id: "shell-listdetail--empty", title: "Shell/ListDetail", name: "Empty", status: "écart identifié", ...listDetail("empty") },
  { id: "shell-listdetail--long-text", title: "Shell/ListDetail", name: "Long Text", status: "écart identifié", ...listDetail("long-text") },
  { id: "shell-listdetail--many-items", title: "Shell/ListDetail", name: "Many Items", status: "écart identifié", ...listDetail("many-items") },

  { id: "shell-settingsshell--default", title: "Shell/SettingsShell", name: "Default", status: "écart identifié", ...settings("default") },
  { id: "shell-settingsshell--empty", title: "Shell/SettingsShell", name: "Empty", status: "écart identifié", ...settings("empty") },
  { id: "shell-settingsshell--long-text", title: "Shell/SettingsShell", name: "Long Text", status: "écart identifié", ...settings("long-text") },
  { id: "shell-settingsshell--many-items", title: "Shell/SettingsShell", name: "Many Items", status: "écart identifié", ...settings("many-items") },
  { id: "shell-settingsshell--rail", title: "Shell/SettingsShell", name: "Rail", status: "écart identifié", ...settings("rail") },
  { id: "shell-sidebar--default", title: "Shell/Sidebar", name: "Default", status: "écart identifié", ...sidebar("default") },
  { id: "shell-sidebar--collapsed", title: "Shell/Sidebar", name: "Collapsed", status: "écart identifié", ...sidebar("collapsed") },
  { id: "shell-sidebar--child-active", title: "Shell/Sidebar", name: "Child Active", status: "écart identifié", ...sidebar("child-active") },
  { id: "shell-sidebar--empty", title: "Shell/Sidebar", name: "Empty", status: "écart identifié", ...sidebar("empty") },
  { id: "shell-sidebar--long-text", title: "Shell/Sidebar", name: "Long Text", status: "écart identifié", ...sidebar("long-text") },
  { id: "shell-sidebar--many-items", title: "Shell/Sidebar", name: "Many Items", status: "écart identifié", ...sidebar("many-items") },

  { id: "shell-orgswitcher--default", title: "Shell/OrgSwitcher", name: "Default", status: "écart identifié", ...orgSwitcher("default") },
  { id: "shell-orgswitcher--open", title: "Shell/OrgSwitcher", name: "Open", status: "écart identifié", ...orgSwitcher("open") },
  { id: "shell-orgswitcher--switch-workspace", title: "Shell/OrgSwitcher", name: "Switch Workspace", status: "écart identifié", ...orgSwitcher("switch-workspace") },
  { id: "shell-orgswitcher--collapsed", title: "Shell/OrgSwitcher", name: "Collapsed", status: "écart identifié", ...orgSwitcher("collapsed") },
  { id: "shell-orgswitcher--long-text", title: "Shell/OrgSwitcher", name: "Long Text", status: "écart identifié", ...orgSwitcher("long-text") },
  { id: "shell-orgswitcher--many-items", title: "Shell/OrgSwitcher", name: "Many Items", status: "écart identifié", ...orgSwitcher("many-items") },
  { id: "shell-orgswitcher--mark", title: "Shell/OrgSwitcher", name: "Mark", status: "écart identifié", ...orgSwitcher("mark") },



];

export default entries;
