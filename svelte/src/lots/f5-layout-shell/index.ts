// The layout and shell family's public surface. The pilot wires this file into
// `src/index.ts`; components a lot has not landed yet are absent here and are
// listed in the report, rather than exported as placeholders.

export { default as AppFrame } from "./layout/app-frame.svelte";
export type { AppFrameInset, SideDockMode } from "./layout/app-frame";
export { default as SideDock } from "./layout/side-dock.svelte";
export { default as SideDockSizeToggle } from "./layout/side-dock-size-toggle.svelte";
export { useSideDock, useSideDockRoom } from "./layout/app-frame";

export { default as ResizableSplit } from "./layout/resizable-split.svelte";
export { default as ResizablePane } from "./layout/resizable-pane.svelte";
export { default as ResizableHandle } from "./layout/resizable-handle.svelte";
export type {
  ResizableLayout,
  ResizableOrientation,
  ResizablePanelHandle,
} from "./layout/resizable.svelte";

export { default as Sidebar } from "./shell/sidebar.svelte";
export { default as SidebarHeader } from "./shell/sidebar-header.svelte";
export { default as SidebarPanel } from "./shell/sidebar-panel.svelte";
export { default as SidebarBody } from "./shell/sidebar-body.svelte";
export { default as SidebarFooter } from "./shell/sidebar-footer.svelte";
export { default as SidebarGroup } from "./shell/sidebar-group.svelte";
export { default as SidebarItem } from "./shell/sidebar-item.svelte";
export { default as SidebarSearch } from "./shell/sidebar-search.svelte";
export { useSidebar } from "./shell/sidebar";
export type { SidebarChild } from "./shell/sidebar";

export { default as ListDetail } from "./shell/list-detail.svelte";
export { default as ListPane } from "./shell/list-pane.svelte";
export { default as DetailPane } from "./shell/detail-pane.svelte";
export { default as PropertiesPane } from "./shell/properties-pane.svelte";
export { default as PropertyRow } from "./shell/property-row.svelte";

export { default as SettingsShell } from "./shell/settings-shell.svelte";
export { default as RailGroup } from "./shell/rail-group.svelte";
export { default as RailLink } from "./shell/rail-link.svelte";
export type { SettingsNavGroup, SettingsNavItem } from "./shell/settings-nav";

export { default as OrgMark } from "./shell/org-mark.svelte";
export { default as OrgSwitcher } from "./shell/org-switcher.svelte";

export { default as UiScaleControl } from "./shell/ui-scale-control.svelte";
export { default as UiScalePanel } from "./shell/ui-scale-panel.svelte";
export { UI_SCALE_MAX, UI_SCALE_MIN } from "./shell/ui-scale";
export type { UiScaleShortcuts } from "./shell/ui-scale";

export { default as AppShell } from "./shell/app-shell.svelte";
export { default as ThemeToggle } from "./shell/theme-toggle.svelte";
export { default as ProfileMenu } from "./shell/profile-menu.svelte";
export { default as InfoMenu } from "./shell/info-menu.svelte";
export type { InfoLinks } from "./shell/info-menu.svelte";
export { default as AuthSplit } from "./shell/auth-split.svelte";
export { default as AuthAsideCopy } from "./shell/auth-aside-copy.svelte";
export { default as AuthAsideNote } from "./shell/auth-aside-note.svelte";
export { default as PageHeader } from "./deps/page-header.svelte";
export { default as StatusIcon } from "../f4-ui-second-half-patterns/status-icon.svelte";

export { default as Link } from "./deps/Link.svelte";
export { setLinks, getLinks, hrefOf, isAt } from "./deps/link";
export type { LinkLocation, LinksValue } from "./deps/link";
