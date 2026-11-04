"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "motion/react";
import { Columns2Icon, MoonIcon, PanelLeftIcon, PanelRightIcon, SunIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "../../lib/utils.ts";
import { SPRING_DOCK } from "../../lib/motion.ts";
import { useMeasure } from "../../lib/use-measure.ts";
import { SegmentedIconGroup } from "../patterns/segmented.tsx";
import { IconButton } from "../../ui/icon-button.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip.tsx";
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

/**
 * The application frame: curved panels on a canvas, as the Atlas desktop app
 * draws it.
 *
 *   ┌ canvas ─────────────────────────────────────────────────────┐
 *   │ workspace ▾   ┌──────────────────────────────┐ ┌─ dock ───┐ │
 *   │ ┌─ nav ─────┐ │                              │ │          │ │
 *   │ │           │ │            page              │ │ (raised) │ │
 *   │ └───────────┘ └──────────────────────────────┘ └──────────┘ │
 *   └─────────────────────────────────────────────────────────────┘
 *
 * The canvas is `shell-canvas`, a step DARKER than the page; every panel is
 * a `rounded-xl` segment on the page `background` with an opaque
 * `shell-edge` rule, so the panels read as sheets set into the frame — which
 * is where the depth comes from. The dock is the one panel
 * on `card`, a step up, so a selected record beside the page is visibly the
 * thing in focus.
 *
 * There is no page header bar and no footer strip. Where you are is the lit
 * sidebar row; what a page can do lives in the page's own header.
 *
 * `h-svh overflow-hidden` on the outer frame: the PAGE never scrolls. Scroll
 * lives inside each panel, with `ScrollFade` edges where a panel scrolls.
 */

const STORAGE_KEY = "atlas-sidebar";

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

/**
 * The dock: a panel beside the page that a screen fills by rendering
 * `<Dock>` anywhere in its tree, which portals into the shell's slot. A
 * portal rather than a prop because the shell lives in the layout route and
 * the dock's contents are the screen's own state.
 *
 * Two sizes, owned by the shell so they persist across screens:
 *
 *   compact  the reading width (`DOCK_WIDTH`) beside the page
 *   half     half the work area — the page and the dock share it
 *
 * Widths are measured, not percentages: the work area is the space right of
 * the sidebar, which changes as the rail collapses, so a ResizeObserver
 * gives the half width in pixels.
 */
export type DockMode = "compact" | "half";

const DOCK_MODE_KEY = "atlas-dock";
/** The gap between the page and the dock — the dock's `ml-2`. */
const DOCK_GAP = 8;
/** The compact dock's reading width. Only the dock reads it, so it is a
 *  constant here rather than a token: 23.75rem, which is `w-95`. */
const DOCK_WIDTH = "23.75rem";

type DockContextValue = {
  slot: HTMLElement | null;
  mode: DockMode;
  setMode: (mode: DockMode) => void;
  /** Width of the work area (page + dock), in px. */
  work: number;
};

const DockContext = createContext<DockContextValue>({
  slot: null,
  mode: "compact",
  setMode: () => {},
  work: 0,
});

const useDock = () => useContext(DockContext);

/**
 * Borrow room from the dock for something that will not fit in it — a panel
 * that grows out of a button, say. `expand()` widens a compact dock to half
 * and returns how long to wait before measuring the wider dock (0 when there
 * was nothing to do, or no dock at all: `work` is only measured inside the
 * app shell). The resize is one layout step, not an animation, so that is
 * one frame for the render that applies it. `restore()` puts it back — but only if it was this hook that
 * widened it, and only if nobody has resized it since.
 */
function useDockRoom() {
  const { mode, setMode, work } = useDock();
  const borrowed = useRef(false);
  const expand = useCallback(() => {
    if (work === 0 || mode !== "compact") return 0;
    borrowed.current = true;
    setMode("half");
    // The resize is one layout step now, not a spring; one frame covers the
    // render that applies it.
    return 16;
  }, [mode, setMode, work]);
  const restore = useCallback(() => {
    if (!borrowed.current) return;
    borrowed.current = false;
    if (mode === "half") setMode("compact");
  }, [mode, setMode]);
  return { expand, restore };
}

function Dock({ children }: { children?: React.ReactNode }) {
  const { slot } = useDock();

  if (!slot) return null;

  return createPortal(
    <AnimatePresence initial={false}>
      {children && <DockPanel key="dock">{children}</DockPanel>}
    </AnimatePresence>,
    slot,
  );
}

/**
 * The dock moves by transform, not width. Animating `width` re-lays out the
 * page beside it on every frame, and the page is the busiest thing on
 * screen, often while a session streams. So the layout changes once and the
 * motion is composited:
 *
 *  - Entering, the dock takes its full width at once (the page narrows in
 *    one step) and slides in from 24px right of its place as it fades in,
 *    on `SPRING_DOCK`, which is critically damped.
 *  - Leaving, it is taken out of the flow first (`absolute`, pinned to the
 *    right edge), so the page widens in one step underneath it, and it
 *    slides back out to the right the way it came while fading.
 *  - Changing size (compact ↔ half) is a single layout step, not animated:
 *    tweening it would mean animating width again.
 *
 * Reduced motion drops the slide and keeps the fade. The transform is a full
 * string rather than motion's `x`, which motion can hand to the compositor.
 */
function DockPanel({ children }: { children: React.ReactNode }) {
  const { mode, work } = useDock();
  const isPresent = useIsPresent();
  const still = useReducedMotion();
  const width = mode === "half" && work ? Math.round((work - DOCK_GAP) / 2) : DOCK_WIDTH;
  const away = still ? "translateX(0px)" : "translateX(24px)";

  return (
    <motion.aside
      data-slot="dock"
      data-mode={mode}
      data-panel=""
      initial={{ opacity: 0, transform: away }}
      animate={{ opacity: 1, transform: "translateX(0px)" }}
      exit={{ opacity: 0, transform: away }}
      transition={SPRING_DOCK}
      style={{ width }}
      className={cn(
        "z-panel flex h-full shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card max-lg:hidden",
        isPresent ? "relative ml-2" : "absolute inset-y-0 right-0",
      )}
    >
      <div className="@container flex min-h-0 w-full min-w-95 flex-1 flex-col">{children}</div>
    </motion.aside>
  );
}

const DOCK_SIZES: Array<{ mode: DockMode; icon: LucideIcon; label: string }> = [
  { mode: "compact", icon: PanelRightIcon, label: "Compact panel" },
  { mode: "half", icon: Columns2Icon, label: "Half-width panel" },
];

/** The two dock sizes as one segmented control, for a dock's header. */
function DockSizeToggle({ className }: { className?: string }) {
  const { mode, setMode } = useDock();
  return (
    <SegmentedIconGroup className={className}>
      {DOCK_SIZES.map((s) => (
        <IconButton
          key={s.mode}
          icon={s.icon}
          label={s.label}
          size="xs"
          aria-pressed={mode === s.mode}
          onClick={() => setMode(s.mode)}
        />
      ))}
    </SegmentedIconGroup>
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
 */
function AppShell({
  title,
  header,
  nav,
  footer,
  actions,
  children,
}: {
  /** Shown beside the menu button when the rail is a drawer (below lg). */
  title: string;
  header: ShellSlot;
  nav: React.ReactNode;
  footer: ShellSlot;
  actions: Array<CommandAction>;
  children: React.ReactNode;
}) {
  const [dockSlot, setDockSlot] = useState<HTMLElement | null>(null);
  const [dockMode, setDockModeState] = useState<DockMode>("compact");
  // The work area is the page + dock row; the dock's half width is a
  // fraction of it. Measured through a callback ref, not a ref read once in
  // an effect: when the shell remounts (a hot reload, a route that rebuilds
  // it) the observer must follow the new element, or it keeps reporting the
  // detached one and "half" silently falls back to compact.
  const [workRef, workRect] = useMeasure<HTMLDivElement>();
  const work = Math.round(workRect.width);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DOCK_MODE_KEY);
      if (saved === "half") setDockModeState(saved);
    } catch {
      // ignore
    }
  }, []);

  const setDockMode = useCallback((next: DockMode) => {
    setDockModeState(next);
    try {
      localStorage.setItem(DOCK_MODE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const { open, setOpen } = useCommandMenu();
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      setRailCollapsed(localStorage.getItem(STORAGE_KEY) === "collapsed");
    } catch {
      // ignore
    }
  }, []);

  const setCollapsed = (next: boolean) => {
    setRailCollapsed(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "collapsed" : "open");
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "." && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCollapsed(!railCollapsed);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  const collapsed = railCollapsed && !drawerOpen;

  return (
    <DockContext.Provider
      value={{
        slot: dockSlot,
        mode: dockMode,
        setMode: setDockMode,
        work,
      }}
    >
      <div className="flex h-svh w-full flex-col overflow-hidden bg-sidebar">
        {drawerOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-drawer scrim-soft lg:hidden"
          />
        )}

        {/* Below lg the rail is a drawer, so something has to open it. */}
        <div className="flex h-10 shrink-0 items-center gap-1 px-2 lg:hidden">
          <IconButton
            icon={PanelLeftIcon}
            label="Open navigation"
            size="sm"
            onClick={() => setDrawerOpen(true)}
          />
          <span className="truncate text-xs font-medium">{title}</span>
        </div>

        <div className="flex min-h-0 flex-1 p-2 max-lg:pt-0">
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
                  onClick={() => setCollapsed(true)}
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
                    onClick={() => setCollapsed(false)}
                  />
                )}
              </SidebarFooter>
            </SidebarPanel>
          </Sidebar>

          {/* The work area: the page and the dock share it. */}
          {/* `relative`: a leaving dock is pinned to its right edge. */}
          <div ref={workRef} className="relative flex min-h-0 min-w-0 flex-1">
            <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-background">
              {children}
            </main>

            <div ref={setDockSlot} className="contents" />
          </div>
        </div>

        <CommandMenu open={open} onOpenChange={setOpen} actions={actions} />
      </div>
    </DockContext.Provider>
  );
}

export { AppShell, Dock, DockSizeToggle, ThemeToggle, useDock, useDockRoom };
