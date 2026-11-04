"use client";

import { createContext, useContext, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronRightIcon, SearchIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "../../lib/utils.ts";
import { hrefOf, isAt, useLinks, type LinkLocation } from "../../lib/link.tsx";
import { EASE_PANEL, SPRING_PILL, SPRING_RAIL } from "../../lib/motion.ts";
import { Icon } from "../../ui/icon.tsx";
import { ScrollFade, useScrollEdges } from "../../ui/scroll-fade.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip.tsx";

/**
 * The left rail, on TanStack Router.
 *
 * Three things make it feel like one object rather than a list of links:
 *
 * 1. THE ACTIVE STATE IS ONE ELEMENT. A single `motion.span` with a shared
 *    `layoutId` renders behind whichever row is current, so navigating
 *    makes it physically slide to the new row rather than cross-fading two
 *    backgrounds. The `railId` comes from `useId` at the rail level so every
 *    row agrees on it.
 *
 * 2. WIDTH IS A SPRING. `motion.nav` animates between `14rem` and
 *    `3.25rem` — rem strings, so the rail follows the interface scale with
 *    no JS multiplication. Labels fade on their own, faster curve so text is
 *    gone before the rail is narrow enough to clip it.
 *
 *    This is a layout animation on purpose; the composited alternatives were
 *    tried on paper and each one shows. The page beside the rail is a
 *    bordered, rounded card whose left edge has to follow the rail's right
 *    edge every frame, and only a width change moves one edge of a box:
 *     - `scaleX` on the rail stretches its glyphs, its text and the panel's
 *       rounded border mid-flight.
 *     - Snapping the rail's layout width and revealing it with `clip-path`
 *       loses the panel's right border for the whole motion, and the glyph
 *       column jumps between its expanded and centred positions.
 *     - Resizing the page once and sliding it with `translateX` either opens
 *       a strip of bare canvas at the page's right edge (expanding) or pushes
 *       its right-aligned controls off-screen (collapsing), then text reflows
 *       in one step at the end.
 *    The cost is bounded: the spring is critically damped (no overshoot, so
 *    no extra frames of reflow), and it plays only on an explicit toggle,
 *    never alongside navigation. Revisit if a profile shows dropped frames
 *    on a large page.
 *
 * 3. CHILDREN HANG OFF A RAIL. A parent with children is a disclosure, not
 *    a destination; its children fade in on a hairline with L-connectors,
 *    and the connector turns to ink on the active one.
 */

const RAIL_WIDTH = "14rem";
const RAIL_WIDTH_COLLAPSED = "3.25rem";

type RailContext = {
  collapsed: boolean;
  railId: string;
  location: LinkLocation;
};
const SidebarContext = createContext<RailContext>({
  collapsed: false,
  railId: "",
  location: { pathname: "" },
});

function useSidebar() {
  return useContext(SidebarContext);
}

function Sidebar({
  collapsed = false,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof motion.nav>, "children"> & {
  collapsed?: boolean;
  children: React.ReactNode;
}) {
  const railId = useId();
  const { location } = useLinks();

  return (
    <SidebarContext.Provider value={{ collapsed, railId, location }}>
      <motion.nav
        data-slot="sidebar"
        data-panel=""
        data-collapsed={collapsed || undefined}
        aria-label="Main"
        initial={false}
        animate={{ width: collapsed ? RAIL_WIDTH_COLLAPSED : RAIL_WIDTH }}
        transition={SPRING_RAIL}
        className={cn("relative z-panel flex h-full shrink-0 flex-col", className)}
        {...props}
      >
        {children}
      </motion.nav>
    </SidebarContext.Provider>
  );
}

/**
 * The workspace row. It sits on the shell's canvas ABOVE the curved panel,
 * as the Atlas desktop app does — the switcher is the frame's, the panel
 * below is the navigation's.
 */
function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex h-10 shrink-0 items-center gap-1 pb-2", className)}
      {...props}
    />
  );
}

/**
 * The curved segment the navigation lives in: search, groups and footer
 * inside one ringed panel on the page's own background, so the rail reads as
 * a surface with depth rather than a strip of links along the window edge.
 */
function SidebarPanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-panel"
      className={cn(
        // The same panel expanded and collapsed: it only changes width, so
        // the rail's spring animates one shape rather than swapping two.
        "flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-background pt-2",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Collapsed, a row is only its glyph, so its name comes back as a tooltip
 * off the rail's edge. Expanded, the label is on screen and this is a
 * pass-through.
 */
function RailTip({ label, children }: { label: string; children: React.ReactElement }) {
  const { collapsed } = useSidebar();
  if (!collapsed) return children;
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

/** The ⌘K affordance. Collapsed, it is just the glyph, in a circle. */
function SidebarSearch({ onOpen }: { onOpen: () => void }) {
  const { collapsed } = useSidebar();
  return (
    <div className="flex justify-center px-2 pb-3">
      {/* The Atlas desktop app's search field (comms-home.tsx): a recessed
          well at the panel's own radius, a quiet glyph and a quiet prompt.
          It opens the command menu rather than filtering in place, so ⌘K
          is announced to assistive tech instead of printed as a chip. */}
      <RailTip label="Jump to anything… ⌘K">
        <button
          type="button"
          onClick={onOpen}
          aria-keyshortcuts="Meta+K"
          aria-label="Jump to anything"
          className={cn(
            "flex h-7 shrink-0 items-center border border-border bg-panel text-xs text-disabled",
            "transition-colors duration-fast ease-out-strong hover:border-border-strong hover:text-muted-foreground",
            collapsed ? "w-7 justify-center rounded-full" : "w-full gap-1.5 rounded-xl px-2.5",
          )}
        >
          <Icon icon={SearchIcon} size="xs" className="shrink-0" />
          {!collapsed && <span className="flex-1 truncate text-left">Jump to anything…</span>}
        </button>
      </RailTip>
    </div>
  );
}

function SidebarBody({ className, children, ...props }: React.ComponentProps<"div">) {
  const scroller = useRef<HTMLDivElement>(null);
  const edges = useScrollEdges(scroller, [children]);
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={scroller}
        data-slot="sidebar-body"
        className={cn("min-h-0 flex-1 overflow-y-auto px-2 pb-2", className)}
        {...props}
      >
        {children}
      </div>
      <ScrollFade at="top" visible={edges.top} className="h-6 from-background" />
      <ScrollFade at="bottom" visible={edges.bottom} className="h-6 from-background" />
    </div>
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { collapsed } = useSidebar();
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "flex items-center gap-1 border-t border-sidebar-border p-2",
        collapsed && "flex-col",
        className,
      )}
      {...props}
    />
  );
}

/** A labelled run of rows. Collapsed, the label becomes a short rule. */
function SidebarGroup({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { label?: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    // Generous air between groups, as the Atlas app spaces its sections:
    // the gap is what makes a group read as a group.
    <div
      data-slot="sidebar-group"
      className={cn(collapsed ? "mb-3" : "mb-6", className)}
      {...props}
    >
      {label &&
        (collapsed ? (
          <div aria-hidden="true" className="mx-auto mb-1.5 h-px w-5 bg-sidebar-border" />
        ) : (
          <div className="px-2 pb-1.5 eyebrow">{label}</div>
        ))}
      <ul className="space-y-px">{children}</ul>
    </div>
  );
}

export type SidebarChild = {
  label: string;
  to: string;
  search?: Record<string, string>;
  icon: LucideIcon;
};

type SidebarItemProps = {
  icon?: LucideIcon;
  /** A rendered glyph — a status icon — where a Lucide icon does not fit. */
  mark?: React.ReactNode;
  label: string;
  to?: string;
  search?: Record<string, string>;
  /** Right-aligned count. Hidden at 0. */
  count?: number;
  /** A one-glyph marker: "AI", a live dot, a beta mark. */
  badge?: "ai" | "live" | "beta";
  /** Makes the row a disclosure. */
  children?: Array<SidebarChild>;
  /** A disclosure that starts open. It still opens itself for an active child. */
  defaultOpen?: boolean;
  /** Considered active when the pathname matches — defaults to `to`. */
  match?: (pathname: string) => boolean;
  className?: string;
};

function SidebarItem({
  icon,
  mark,
  label,
  to,
  search,
  count,
  badge,
  children,
  defaultOpen = false,
  match,
  className,
}: SidebarItemProps) {
  const { collapsed, railId, location } = useSidebar();
  const { Link } = useLinks();
  const still = useReducedMotion();
  const pathname = location.pathname;
  const hasChildren = !!children?.length;
  // A child is active on its path AND its own search params, so five
  // projects that share /projects are not all lit at once.
  const isChildActive = (c: SidebarChild) => isAt(location, c.to, c.search);
  const childActive = hasChildren && children.some(isChildActive);
  const [open, setOpen] = useState(defaultOpen || childActive);

  const selfActive = match ? match(pathname) : to !== undefined && pathname === to;
  // Parents are disclosures, not destinations. Only light the branch when it
  // is closed, so the parent and its child never highlight together.
  const highlighted = hasChildren
    ? (childActive || selfActive) && (!open || collapsed)
    : selfActive;

  const row = (
    <span
      className={cn(
        "relative flex h-7 w-full items-center gap-2 rounded-md px-2 text-xs",
        "transition-colors duration-fast ease-out-strong",
        collapsed && "justify-center px-0",
        highlighted
          ? "font-medium text-foreground"
          : "text-muted-foreground hover:bg-element-hover hover:text-foreground",
        className,
      )}
    >
      {highlighted && (
        <motion.span
          data-slot="sidebar-pill"
          layoutId={railId}
          transition={SPRING_PILL}
          className="absolute inset-0 rounded-md bg-element-selected"
        />
      )}
      {icon ? (
        <Icon icon={icon} size="sm" className="relative z-10" />
      ) : (
        <span className="relative z-10 flex size-3.5 shrink-0 items-center justify-center">
          {mark}
        </span>
      )}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="relative z-10 flex min-w-0 flex-1 items-center gap-2"
          >
            <span className="flex-1 truncate text-left">{label}</span>
            {badge && (
              <span
                className={cn(
                  "rounded-full px-1 text-3xs font-medium",
                  badge === "ai" && "bg-element-active text-foreground",
                  badge === "live" && "bg-success-muted text-success",
                  badge === "beta" && "bg-element-hover text-muted-foreground",
                )}
              >
                {badge === "ai" ? "AI" : badge === "live" ? "●" : "β"}
              </span>
            )}
            {/* Unread is the one number in the rail that asks for you, so it
                is a solid red pill — like a notification badge — not a grey
                whisper. */}
            {count !== undefined && count > 0 && (
              <span className="flex h-4 min-w-4 tabular-nums items-center justify-center rounded-full bg-destructive px-1 text-3xs font-semibold text-destructive-foreground">
                {count}
              </span>
            )}
            {hasChildren && (
              <motion.span
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ duration: 0.18 }}
                className="text-muted-foreground"
              >
                <Icon icon={ChevronRightIcon} size="xs" />
              </motion.span>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );

  return (
    <li>
      {hasChildren && !collapsed ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full text-left outline-none"
        >
          {row}
        </button>
      ) : to ? (
        <RailTip label={label}>
          <Link href={hrefOf(to, search)} className="block outline-none">
            {row}
          </Link>
        </RailTip>
      ) : (
        <RailTip label={label}>{row}</RailTip>
      )}

      {/* Children hang off a rail with L-connectors.

          The list itself does not animate its height. A disclosure in the
          nav is opened many times a day, and growing `height` re-lays out the
          whole rail on every frame, pushing every row below it as it goes.
          Instead the rows below move once, the instant it opens or closes,
          and the children arrive by opacity and a 4px transform, staggered,
          which composite without touching layout. Closing is instant: the
          eye is already on what was clicked, and a collapse would only delay
          it. Reduced motion keeps the fade and drops the slide. */}
      {hasChildren && open && !collapsed && (
        <ul className="relative pl-3.75">
          <span className="absolute top-0 bottom-3 left-3.75 w-px bg-sidebar-border" />
          {children.map((child, index) => {
            const active = isChildActive(child);
            return (
              <motion.li
                key={`${child.to}#${child.label}`}
                initial={{ opacity: 0, transform: still ? "translateX(0px)" : "translateX(-4px)" }}
                animate={{ opacity: 1, transform: "translateX(0px)" }}
                transition={{ delay: index * 0.03, duration: 0.18, ease: EASE_PANEL }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 left-0 h-px w-2.5 transition-colors",
                    active ? "bg-foreground" : "bg-sidebar-border",
                  )}
                />
                {active && <span className="absolute top-1 bottom-1 left-0 w-px bg-foreground" />}
                <Link
                  href={hrefOf(child.to, child.search)}
                  className={cn(
                    "ml-3.5 flex h-7 items-center gap-2 rounded-md px-2 text-xs",
                    "transition-colors duration-fast ease-out-strong",
                    active
                      ? "bg-element-selected font-medium text-foreground"
                      : "text-muted-foreground hover:bg-element-hover hover:text-foreground",
                  )}
                >
                  <Icon icon={child.icon} size="sm" />
                  <span className="truncate">{child.label}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarPanel,
  SidebarSearch,
  useSidebar,
};
