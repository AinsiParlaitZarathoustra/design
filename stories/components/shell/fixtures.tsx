import {
  ActivityIcon,
  BellIcon,
  BookOpenIcon,
  BrainIcon,
  CreditCardIcon,
  FolderIcon,
  GitPullRequestIcon,
  InboxIcon,
  KeyIcon,
  LayoutDashboardIcon,
  MessagesSquareIcon,
  PaletteIcon,
  PlugIcon,
  SettingsIcon,
  ShieldIcon,
  SparklesIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { LinkProvider, type LinkProps, type LinkLocation } from "../../../src/lib/link.tsx";
import type { Organisation } from "../../../src/lib/types.ts";
import type { CommandAction } from "../../../src/components/shell/command-menu.tsx";
import type { SettingsNavGroup } from "../../../src/components/shell/settings-shell.tsx";

/**
 * Fixture data for the shell stories: one Atlas workspace, its people,
 * sessions and projects, and the settings rail. Links never navigate: the
 * story's `LinkProvider` renders an anchor that swallows the click.
 */

function StoryLink({ onClick, ...props }: LinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
    />
  );
}

const noop = () => {};

/** Router-free rendering: links are inert anchors and `location` is fixed. */
export function StoryLinks({
  pathname = "/sessions",
  search,
  children,
}: {
  pathname?: string;
  search?: string;
  children: ReactNode;
}) {
  const location: LinkLocation = { pathname, search };
  return (
    <LinkProvider Link={StoryLink} location={location} navigate={noop}>
      {children}
    </LinkProvider>
  );
}

export const ORGS: Organisation[] = [
  {
    id: "atlas",
    name: "Atlas",
    slug: "atlas",
    initials: "AT",
    memberCount: 14,
    role: "admin",
  },
  {
    id: "northwind",
    name: "Northwind Labs",
    slug: "northwind",
    initials: "NL",
    memberCount: 6,
    role: "developer",
  },
  {
    id: "personal",
    name: "Personal",
    slug: "personal",
    initials: "UM",
    memberCount: 1,
    role: "admin",
  },
];

export const LONG_ORG: Organisation = {
  id: "long",
  name: "The Infrastructure and Developer Productivity Working Group",
  slug: "infra-devprod",
  initials: "ID",
  memberCount: 1284,
  role: "member",
};

export const MANY_ORGS: Organisation[] = [
  ...ORGS,
  ...["Contoso", "Fabrikam", "Initech", "Globex", "Umbrella", "Hooli"].map((name, i) => ({
    id: name.toLowerCase(),
    name,
    slug: name.toLowerCase(),
    initials: name.slice(0, 2).toUpperCase(),
    memberCount: 3 + i * 7,
    role: "member" as const,
  })),
];

export const USER = { name: "Uzayer Masud", email: "uzayer@tryatlas.dev" };

export const NAV = {
  workspace: [
    { icon: InboxIcon, label: "Inbox", to: "/inbox", count: 3 },
    { icon: MessagesSquareIcon, label: "Sessions", to: "/sessions" },
    { icon: GitPullRequestIcon, label: "Pull requests", to: "/pulls", count: 0 },
    { icon: ActivityIcon, label: "Activity", to: "/activity", badge: "live" as const },
  ],
  team: [
    { icon: LayoutDashboardIcon, label: "Dashboard", to: "/dashboard" },
    { icon: BrainIcon, label: "Memory", to: "/memory", badge: "ai" as const },
    { icon: UsersIcon, label: "People", to: "/people" },
  ],
  projects: [
    { label: "atlas", to: "/projects", search: { p: "atlas" }, icon: FolderIcon },
    { label: "design", to: "/projects", search: { p: "design" }, icon: FolderIcon },
    { label: "server", to: "/projects", search: { p: "server" }, icon: FolderIcon },
  ],
};

export const ACTIONS: CommandAction[] = [
  { id: "new", label: "New session", group: "Actions", icon: SparklesIcon, shortcut: "⌘N" },
  { id: "invite", label: "Invite people", group: "Actions", icon: UsersIcon },
  { id: "inbox", label: "Inbox", group: "Go to", icon: InboxIcon, to: "/inbox", shortcut: "G I" },
  {
    id: "sessions",
    label: "Sessions",
    group: "Go to",
    icon: MessagesSquareIcon,
    to: "/sessions",
    shortcut: "G S",
  },
  { id: "memory", label: "Memory", group: "Go to", icon: BrainIcon, to: "/memory" },
  {
    id: "settings",
    label: "Settings",
    group: "Go to",
    icon: SettingsIcon,
    to: "/settings",
    shortcut: "G ,",
  },
  { id: "docs", label: "Read the docs", group: "Help", icon: BookOpenIcon },
];

export const MANY_ACTIONS: CommandAction[] = [
  ...ACTIONS,
  ...[
    "Refactor the settings panel",
    "Port the session timeline",
    "Fix flaky terminal resize test",
    "Theme import from VS Code",
    "Agent profile for Codex",
    "Dock sizes persist across screens",
    "Sidebar unread counts",
    "Command menu highlight scroll",
    "Org switcher submenu",
    "Interface scale presets",
    "Billing page copy",
    "Memory export to markdown",
  ].map((label, i) => ({
    id: `s${i}`,
    label,
    group: "Recent sessions",
    icon: MessagesSquareIcon,
    to: `/sessions/${i}`,
  })),
];

export const SETTINGS_GROUPS: SettingsNavGroup[] = [
  {
    label: "Workspace",
    items: [
      { label: "General", to: "/settings", icon: SettingsIcon },
      { label: "Members", to: "/settings/members", icon: UsersIcon },
      { label: "Integrations", to: "/settings/integrations", icon: PlugIcon },
      { label: "API keys", to: "/settings/keys", icon: KeyIcon },
      { label: "Billing", to: "/settings/billing", icon: CreditCardIcon },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", to: "/settings/profile", icon: UserIcon },
      { label: "Appearance", to: "/settings/appearance", icon: PaletteIcon },
      { label: "Notifications", to: "/settings/notifications", icon: BellIcon },
      { label: "Privacy", to: "/settings/privacy", icon: ShieldIcon },
    ],
  },
];

export const SESSIONS = [
  {
    ref: "ATL-982",
    title: "Refactor the settings panel into containers",
    who: "Uzayer",
    ago: "2m",
  },
  { ref: "ATL-978", title: "Make the built-in browser agent-driven", who: "Adib", ago: "1h" },
  { ref: "ATL-971", title: "Port the session timeline and work log", who: "Uzayer", ago: "3h" },
  { ref: "ATL-966", title: "Dock sizes persist across screens", who: "Maya", ago: "yesterday" },
  { ref: "ATL-960", title: "Theme seeds derive the palette", who: "Adib", ago: "2d" },
];
