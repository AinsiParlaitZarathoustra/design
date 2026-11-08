<script lang="ts">
  import type { Snippet } from "svelte";
  import { PanelLeft } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import IconButton from "../../../ui/icon-button.svelte";
  import { CommandMenu, useCommandMenu, type CommandAction } from "../../f2-overlays-menus/index";
  import AppFrame from "../layout/app-frame.svelte";
  import type { SideDockMode } from "../layout/app-frame";
  import Sidebar from "./sidebar.svelte";
  import SidebarBody from "./sidebar-body.svelte";
  import SidebarFooter from "./sidebar-footer.svelte";
  import SidebarHeader from "./sidebar-header.svelte";
  import SidebarPanel from "./sidebar-panel.svelte";
  import SidebarSearch from "./sidebar-search.svelte";

  /**
   * The frame, filled by the app: what sits in the rail is the caller's, so
   * the shell holds no data and no routes. `header` is the workspace row (an
   * `OrgSwitcher`), `nav` the rail's `SidebarGroup`s, `footer` the rail's
   * bottom tools (`ProfileMenu`, `ThemeToggle`, `UiScaleControl`, `InfoMenu`),
   * and `actions` what ⌘K offers. `header` and `footer` take the rail's
   * collapsed state. Ported from `AppShell` in
   * `src/components/shell/app-shell.tsx`.
   *
   * ⌘. toggles the rail; below `lg` the rail is a drawer, opened from a top
   * bar. The drawer's open state is the one thing kept here.
   */
  interface Props {
    /** Shown beside the menu button when the rail is a drawer (below lg). */
    title: string;
    header: Snippet<[{ collapsed: boolean }]>;
    nav: Snippet;
    footer: Snippet<[{ collapsed: boolean }]>;
    actions: CommandAction[];
    /** Whether the rail is collapsed to its icons. */
    collapsed: boolean;
    onCollapsedChange: (collapsed: boolean) => void;
    /** The dock size the person chose (see `AppFrame`). */
    dockMode: SideDockMode;
    onDockModeChange: (mode: SideDockMode) => void;
    children: Snippet;
  }

  let {
    title,
    header,
    nav,
    footer,
    actions,
    collapsed: railCollapsed,
    onCollapsedChange,
    dockMode,
    onDockModeChange,
    children,
  }: Props = $props();

  const menu = useCommandMenu();
  let drawerOpen = $state(false);

  // ⌘. (or Ctrl+.) toggles the rail, listened on the document as the source does.
  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "." && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      onCollapsedChange(!railCollapsed);
    }
  }

  // The drawer is always the full rail.
  const collapsed = $derived(railCollapsed && !drawerOpen);
</script>

<svelte:document onkeydown={onKeyDown} />

<AppFrame {dockMode} {onDockModeChange}>
  {#snippet overlay()}
    {#if drawerOpen}
      <button
        type="button"
        aria-label="Close navigation"
        onclick={() => (drawerOpen = false)}
        class="fixed inset-0 z-drawer scrim-soft lg:hidden"
      ></button>
    {/if}
    <CommandMenu open={menu.open} onOpenChange={menu.setOpen} {actions} />
  {/snippet}
  {#snippet topBar()}
    <!-- Below lg the rail is a drawer, so something has to open it. -->
    <div class="flex h-10 shrink-0 items-center gap-1 px-2 lg:hidden">
      <IconButton icon={PanelLeft} label="Open navigation" size="sm" onclick={() => (drawerOpen = true)} />
      <span class="truncate text-xs font-medium">{title}</span>
    </div>
  {/snippet}
  {#snippet sidebar()}
    <Sidebar
      {collapsed}
      class={cn(
        "lg:mr-2",
        "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-drawer max-lg:border-r max-lg:border-border max-lg:bg-sidebar max-lg:p-2",
        "max-lg:transition-transform max-lg:duration-slow max-lg:ease-drawer",
        !drawerOpen && "max-lg:-translate-x-full",
      )}
    >
      <SidebarHeader>
        <div class="min-w-0 flex-1">{@render header({ collapsed })}</div>
        {#if !collapsed}
          <IconButton icon={PanelLeft} label="Collapse sidebar" size="sm" onclick={() => onCollapsedChange(true)} />
        {/if}
      </SidebarHeader>

      <SidebarPanel>
        <SidebarSearch onOpen={() => menu.setOpen(true)} />

        <!-- Delegation, not an interactive container: every target inside is a real link.
             Tapping one on mobile has to dismiss the drawer, or the new screen opens underneath it. -->
        <div class="contents" onclickcapture={() => (drawerOpen = false)}>
          <SidebarBody>
            {@render nav()}
          </SidebarBody>
        </div>

        <!-- You on the left; the rail's tools, grouped, on the right. Collapsed, the same pieces stack in the 52px rail. -->
        <SidebarFooter class="justify-between">
          {@render footer({ collapsed })}
          {#if collapsed}
            <IconButton icon={PanelLeft} label="Expand sidebar" size="sm" onclick={() => onCollapsedChange(false)} />
          {/if}
        </SidebarFooter>
      </SidebarPanel>
    </Sidebar>
  {/snippet}
  {@render children()}
</AppFrame>
