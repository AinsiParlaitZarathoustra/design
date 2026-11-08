import {
  Activity,
  Brain,
  FolderIcon,
  GitPullRequest,
  Inbox,
  LayoutDashboard,
  MessagesSquare,
  Users,
} from "lucide-svelte";

/**
 * Fixture data for the layout and shell stories, ported from
 * `stories/components/shell/fixtures.tsx`. The values are the source's.
 */

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
    { label: "atlas", to: "/projects", search: { p: "atlas" }, icon: FolderIcon },
    { label: "design", to: "/projects", search: { p: "design" }, icon: FolderIcon },
    { label: "server", to: "/projects", search: { p: "server" }, icon: FolderIcon },
  ],
};

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
