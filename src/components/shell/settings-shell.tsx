"use client"

import { ArrowLeftIcon } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "cn"

import { isAt, useLinks } from "../../lib/link.tsx"
import type { Organisation } from "../../lib/types.ts"
import { Icon } from "../../ui/icon.tsx"
import { ScrollFadeArea } from "../ui/scroll-fade-area.tsx"
import { OrgMark } from "./org-switcher.tsx"

/**
 * Settings is a MODE, not a page: you leave the app, with an explicit way
 * back. Same frame as the app shell — curved nav panel on the canvas,
 * `.micro` group labels, 28px rows — so it reads as the same product with
 * a different table of contents.
 */

export type SettingsNavItem = { label: string; to: string; icon: LucideIcon }

export type SettingsNavGroup = { label: string; items: Array<SettingsNavItem> }

/** A 28px rail row. Shared with the gallery nav. */
function RailLink({
  to,
  icon: Glyph,
  children,
}: {
  to: string
  icon?: LucideIcon
  children: React.ReactNode
}) {
  const { Link, location } = useLinks()
  return (
    <Link
      href={to}
      aria-current={isAt(location, to) ? "page" : undefined}
      className={cn(
        "group/item flex h-7 items-center gap-2 rounded-md px-2 text-2xs",
        "transition-colors duration-fast ease-out-strong",
        "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
        "aria-[current=page]:bg-sidebar-accent aria-[current=page]:font-medium aria-[current=page]:text-foreground"
      )}
    >
      {Glyph && <Icon icon={Glyph} size="sm" />}
      <span className="truncate">{children}</span>
    </Link>
  )
}

function RailGroup({
  label,
  items,
}: {
  label: string
  items: Array<SettingsNavItem>
}) {
  return (
    <div className="mb-3">
      <div className="px-2 pb-1.5 eyebrow">{label}</div>
      <ul className="space-y-px">
        {items.map((item) => (
          <li key={item.to}>
            <RailLink to={item.to} icon={item.icon}>
              {item.label}
            </RailLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Settings, in the same frame as the app: the back link and the workspace sit
 * on the canvas, the section list is a curved nav panel, and the page is a
 * curved panel beside it — so leaving the app for settings changes what is
 * in the panels, not the shape of the window.
 */
function SettingsShell({
  org,
  groups,
  backHref,
  children,
}: {
  org: Pick<Organisation, "name" | "initials">
  /** The rail's sections, e.g. Workspace and Account. */
  groups: Array<SettingsNavGroup>
  /** Where "Back to app" goes. */
  backHref: string
  children: React.ReactNode
}) {
  return (
    <div className="flex h-svh w-full flex-col overflow-hidden bg-sidebar">
      <div className="flex min-h-0 flex-1 gap-2 p-2">
        <nav
          aria-label="Settings"
          data-panel=""
          className="w-settings-nav flex shrink-0 flex-col"
        >
          <div className="flex h-10 shrink-0 items-center pb-2">
            <RailLink to={backHref} icon={ArrowLeftIcon}>
              Back to app
            </RailLink>
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-background">
            <div className="flex items-center gap-2 px-3 pt-3 pb-3">
              <OrgMark
                initials={org.initials}
                className="size-6 rounded-md text-3xs"
              />
              <span className="truncate text-xs font-medium">{org.name}</span>
            </div>
            <ScrollFadeArea fade={24} className="min-h-0 flex-1 px-2 pb-2">
              {groups.map((group) => (
                <RailGroup key={group.label} {...group} />
              ))}
            </ScrollFadeArea>
          </div>
        </nav>

        {/* The ring is on a plain wrapper: ScrollFade masks its own box for
            the edge fades, which would clip a ring drawn on it. */}
        <div className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-xl border border-border bg-background">
          <ScrollFadeArea className="h-full">
            <div className="max-w-settings mx-auto w-full px-5 py-6">
              {children}
            </div>
          </ScrollFadeArea>
        </div>
      </div>
    </div>
  )
}

export { RailGroup, RailLink, SettingsShell }
