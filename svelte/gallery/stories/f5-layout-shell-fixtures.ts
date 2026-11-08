import {
  Activity,
  Bell,
  BookOpen,
  Brain,
  CreditCard,
  Folder,
  GitPullRequest,
  Inbox,
  KeyRound,
  LayoutDashboard,
  MessagesSquare,
  Palette,
  Plug,
  Settings,
  Shield,
  Sparkles,
  User,
  Users,
} from "lucide-svelte";
import type { Organisation } from "../../src/lib/types";
import type { CommandAction } from "../../src/lots/f2-overlays-menus/index";

/**
 * Fixture data for the layout and shell stories, ported from
 * `stories/components/shell/fixtures.tsx`. The values are the source's.
 */

export const USER = { name: "Uzayer Masud", email: "uzayer@tryatlas.dev" };

export const NAV = {
  workspace: [
    { icon: Inbox, label: "Inbox", to: "/inbox", count: 3 },
    { icon: MessagesSquare, label: "Sessions", to: "/sessions" },
    { icon: GitPullRequest, label: "Pull requests", to: "/pulls", count: 0 },
    { icon: Activity, label: "Activity", to: "/activity", badge: "live" as const },
  ],
  team: [
    { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
    { icon: Brain, label: "Memory", to: "/memory", badge: "ai" as const },
    { icon: Users, label: "People", to: "/people" },
  ],
  projects: [
    { label: "atlas", to: "/projects", search: { p: "atlas" }, icon: Folder },
    { label: "design", to: "/projects", search: { p: "design" }, icon: Folder },
    { label: "server", to: "/projects", search: { p: "server" }, icon: Folder },
  ],
};

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

export const ACTIONS: CommandAction[] = [
  { id: "new", label: "New session", group: "Actions", icon: Sparkles, shortcut: "⌘N" },
  { id: "invite", label: "Invite people", group: "Actions", icon: Users },
  { id: "inbox", label: "Inbox", group: "Go to", icon: Inbox, to: "/inbox", shortcut: "G I" },
  {
    id: "sessions",
    label: "Sessions",
    group: "Go to",
    icon: MessagesSquare,
    to: "/sessions",
    shortcut: "G S",
  },
  { id: "memory", label: "Memory", group: "Go to", icon: Brain, to: "/memory" },
  {
    id: "settings",
    label: "Settings",
    group: "Go to",
    icon: Settings,
    to: "/settings",
    shortcut: "G ,",
  },
  { id: "docs", label: "Read the docs", group: "Help", icon: BookOpen },
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
    icon: MessagesSquare,
    to: `/sessions/${i}`,
  })),
];

export const SETTINGS_GROUPS = [
  {
    label: "Workspace",
    items: [
      { label: "General", to: "/settings", icon: Settings },
      { label: "Members", to: "/settings/members", icon: Users },
      { label: "Integrations", to: "/settings/integrations", icon: Plug },
      { label: "API keys", to: "/settings/keys", icon: KeyRound },
      { label: "Billing", to: "/settings/billing", icon: CreditCard },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", to: "/settings/profile", icon: User },
      { label: "Appearance", to: "/settings/appearance", icon: Palette },
      { label: "Notifications", to: "/settings/notifications", icon: Bell },
      { label: "Privacy", to: "/settings/privacy", icon: Shield },
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

/** Forty rows: the source's `MANY` for the many-items stories. */
export const MANY_SESSIONS = Array.from({ length: 40 }, (_, i) => SESSIONS[i % SESSIONS.length]!);
