"use client";

import { useEffect, useState } from "react";
import { MoonIcon, PanelLeftIcon, SunIcon } from "lucide-react";

import { cn } from "../../lib/utils.ts";
import { IconButton } from "../../ui/icon-button.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip.tsx";
import { AppFrame } from "../layout/app-frame.tsx";
import type { SideDockMode } from "../layout/app-frame.tsx";
import { CommandMenu, useCommandMenu } from "./command-menu.tsx";
import type { CommandAction } from "./command-menu.tsx";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarPanel,
  SidebarSearch,
} from "./sidebar.tsx";

function ThemeToggle({
  appearance,
  onToggle,
}: {
  appearance: "dark" | "light";
  onToggle: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <IconButton
            icon={appearance === "dark" ? SunIcon : MoonIcon}
            label={`Switch to ${appearance === "dark" ? "light" : "dark"} theme`}
            size="sm"
            onClick={onToggle}
          />
        }
      />
      <TooltipContent>Switch to {appearance === "dark" ? "light" : "dark"}</TooltipContent>
    </Tooltip>
  );
}

type ShellSlot = React.ReactNode | ((state: { collapsed: boolean }) => React.ReactNode);

const renderSlot = (slot: ShellSlot, collapsed: boolean) =>
  typeof slot === "function" ? slot({ collapsed }) : slot;

/**
 * The frame, filled by the app: what sits in the rail is the caller's, so the
 * shell holds no data and no routes. `header` is the workspace row (an
 * `OrgSwitcher`), `nav` the rail's `SidebarGroup`s, `footer` the rail's
 * bottom tools (`ProfileMenu`, `ThemeToggle`, `UiScaleControl`, `InfoMenu`),
 * and `actions` what ⌘K offers. `header` and `footer` may be functions of the
 * rail's collapsed state.
 *
 * It is `AppFrame` filled the way the Atlas apps fill it: a collapsible rail
 * with the workspace switcher, search and the navigation; ⌘K; and below `lg`,
 * a drawer opened from a top bar. The rail's collapsed state and the dock's
 * size are the caller's too: the shell reports a change and draws what it is
 * given, so an app remembers them wherever it remembers things. ⌘. toggles
 * the rail. The drawer's open state is the one thing kept here, and nothing
 * should outlive the window it was opened in.
 */
function AppShell({
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
}: {
  /** Shown beside the menu button when the rail is a drawer (below lg). */
  title: string;
  header: ShellSlot;
  nav: React.ReactNode;
  footer: ShellSlot;
  actions: Array<CommandAction>;
  /** Whether the rail is collapsed to its icons. */
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  /** The dock size the person chose (see `AppFrame`). */
  dockMode: SideDockMode;
  onDockModeChange: (mode: SideDockMode) => void;
  children: React.ReactNode;
}) {
  const { open, setOpen } = useCommandMenu();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "." && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onCollapsedChange(!railCollapsed);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [railCollapsed, onCollapsedChange]);

  // The drawer is always the full rail.
  const collapsed = railCollapsed && !drawerOpen;

  return (
    <AppFrame
      dockMode={dockMode}
      onDockModeChange={onDockModeChange}
      overlay={
        <>
          {drawerOpen && (
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-drawer scrim-soft lg:hidden"
            />
          )}
          <CommandMenu open={open} onOpenChange={setOpen} actions={actions} />
        </>
      }
      topBar={
        // Below lg the rail is a drawer, so something has to open it.
        <div className="flex h-10 shrink-0 items-center gap-1 px-2 lg:hidden">
          <IconButton
            icon={PanelLeftIcon}
            label="Open navigation"
            size="sm"
            onClick={() => setDrawerOpen(true)}
          />
          <span className="truncate text-xs font-medium">{title}</span>
        </div>
      }
      sidebar={
        <Sidebar
          collapsed={collapsed}
          className={cn(
            "lg:mr-2",
            "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-drawer max-lg:border-r max-lg:border-border max-lg:bg-sidebar max-lg:p-2",
            "max-lg:transition-transform max-lg:duration-slow max-lg:ease-drawer",
            !drawerOpen && "max-lg:-translate-x-full",
          )}
        >
          <SidebarHeader>
            <div className="min-w-0 flex-1">{renderSlot(header, collapsed)}</div>
            {!collapsed && (
              <IconButton
                icon={PanelLeftIcon}
                label="Collapse sidebar"
                size="sm"
                onClick={() => onCollapsedChange(true)}
              />
            )}
          </SidebarHeader>

          <SidebarPanel>
            <SidebarSearch onOpen={() => setOpen(true)} />

            {/*
              Delegation, not an interactive container: every target inside is a
              real link. Tapping one on mobile has to dismiss the drawer, or the
              new screen opens underneath it.
            */}
            <SidebarBody onClickCapture={() => setDrawerOpen(false)}>{nav}</SidebarBody>

            {/* You on the left; the rail's tools, grouped, on the right.
                Collapsed, the same pieces stack in the 52px rail. */}
            <SidebarFooter className="justify-between">
              {renderSlot(footer, collapsed)}
              {collapsed && (
                <IconButton
                  icon={PanelLeftIcon}
                  label="Expand sidebar"
                  size="sm"
                  onClick={() => onCollapsedChange(false)}
                />
              )}
            </SidebarFooter>
          </SidebarPanel>
        </Sidebar>
      }
    >
      {children}
    </AppFrame>
  );
}

export { AppShell, ThemeToggle };
