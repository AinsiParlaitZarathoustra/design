"use client"

import {
  CheckIcon,
  ChevronsUpDownIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
  UserPlusIcon,
} from "lucide-react"
import { cn } from "cn"

import { useLinks } from "../../lib/link.tsx"
import type { Organisation } from "../../lib/types.ts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu.tsx"
import { Icon } from "../../ui/icon.tsx"

/**
 * The workspace switcher, top-left of the rail.
 *
 * This is the single worst thing about the current Atlas web app: to change
 * org you navigate to /dashboard, land on the Organisation tab, and use a
 * `<select>` that sets better-auth's active org — which three other screens
 * then ignore, because they read the org from the URL instead.
 *
 * The answer here:
 *
 *  - The switcher is the FIRST thing in the rail, so the answer to "which
 *    workspace am I in" is in the same place on every screen.
 *  - The parent menu carries the things you reach for while thinking about
 *    the workspace as a whole — Settings, Invite people, Log out — because
 *    that is what you are already looking at.
 *  - Switching is a SUBMENU, not the menu. It is the rarest of the four
 *    actions, and putting five workspaces inline would push Log out off the
 *    bottom the moment someone joins a sixth.
 *  - The submenu is headed by the account email. With several accounts, "which
 *    login is this list for" is the question immediately before "which
 *    workspace", so it is answered first.
 *  - Each workspace carries a numeric shortcut. The check marks the active
 *    one — the number is how you get there without the menu at all.
 */

function OrgMark({
  initials,
  className,
}: {
  initials: string
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-sm",
        "bg-element-emphasis text-3xs font-semibold text-foreground",
        className
      )}
    >
      {initials}
    </span>
  )
}

function OrgSwitcher({
  org,
  orgs,
  email,
  onOrgChange,
  settingsHref,
  membersHref = settingsHref,
  onLogOut,
  className,
  collapsed = false,
}: {
  /** The active workspace. */
  org: Organisation
  orgs: Array<Organisation>
  /** The signed-in account, heading the workspace list. */
  email: string
  onOrgChange: (id: string) => void
  settingsHref: string
  membersHref?: string
  onLogOut?: () => void
  className?: string
  collapsed?: boolean
}) {
  const { Link } = useLinks()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={collapsed ? org.name : undefined}
        className={cn(
          "flex h-8 w-full min-w-0 items-center gap-2 rounded-md px-1",
          "text-left select-none",
          "transition-colors duration-fast ease-out-strong",
          "hover:bg-sidebar-accent data-popup-open:bg-sidebar-accent",
          collapsed && "justify-center px-0",
          className
        )}
      >
        <OrgMark
          initials={org.initials}
          className="size-6 rounded-md text-3xs"
        />
        {!collapsed && (
          <>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-xs font-medium text-foreground">
                {org.name}
              </span>
              <span className="truncate text-3xs text-muted-foreground">
                {org.memberCount} members
              </span>
            </span>
            <Icon
              icon={ChevronsUpDownIcon}
              size="xs"
              className="text-muted-foreground"
            />
          </>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60" sideOffset={4}>
        <DropdownMenuItem render={<Link href={settingsHref} />}>
          <Icon icon={SettingsIcon} size="sm" />
          Settings
          <DropdownMenuShortcut>G then S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href={membersHref} />}>
          <Icon icon={UserPlusIcon} size="sm" />
          Invite and manage members
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            Switch workspace
            <DropdownMenuShortcut>O then W</DropdownMenuShortcut>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-64">
            {/* Which login this list belongs to, before which workspace. */}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="tracking-normal normal-case">
                {email}
              </DropdownMenuLabel>
              {orgs.map((o, i) => (
                <DropdownMenuItem key={o.id} onClick={() => onOrgChange(o.id)}>
                  <OrgMark initials={o.initials} />
                  <span className="flex-1 truncate">{o.name}</span>
                  {o.id === org.id && (
                    <Icon
                      icon={CheckIcon}
                      size="sm"
                      className="text-foreground"
                    />
                  )}
                  <span className="tnum w-3 text-right text-2xs text-disabled">
                    {i + 1}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <Icon icon={PlusIcon} size="sm" />
                Create or join a workspace…
              </DropdownMenuItem>
              <DropdownMenuItem>Add an account…</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={onLogOut}>
          <Icon icon={LogOutIcon} size="sm" />
          Log out
          <DropdownMenuShortcut>⌥ ⇧ Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { OrgMark, OrgSwitcher }
