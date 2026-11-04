import type { Meta, StoryObj } from "@storybook/react-vite";
import { FolderIcon, MessagesSquareIcon } from "lucide-react";
import { fn } from "storybook/test";
import { OrgSwitcher } from "../../../src/components/shell/org-switcher.tsx";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarPanel,
  SidebarSearch,
  useSidebar,
} from "../../../src/components/shell/sidebar.tsx";
import { InfoMenu, ProfileMenu } from "../../../src/components/shell/sidebar-controls.tsx";
import { StatusIcon } from "../../../src/components/ui/status-icon.tsx";
import { LONG_ORG, NAV, ORGS, StoryLinks, USER } from "./fixtures.tsx";

interface DemoProps {
  collapsed?: boolean;
  pathname?: string;
  search?: string;
  empty?: boolean;
  long?: boolean;
  many?: boolean;
  onOpenSearch?: () => void;
}

/** The footer reads the rail's collapsed state, the way an app's tools do. */
function Footer() {
  const { collapsed } = useSidebar();
  return (
    <>
      <ProfileMenu user={USER} accountHref="/settings/profile" onLogOut={() => {}} />
      {!collapsed && <span className="flex-1" />}
      <InfoMenu links={{ docs: "#", github: "#", discord: "#" }} settingsHref="/settings" />
    </>
  );
}

const LONG_LABEL = "Sessions waiting on your review across every attached project";

function Demo({
  collapsed = false,
  pathname = "/sessions",
  search,
  empty = false,
  long = false,
  many = false,
  onOpenSearch = () => {},
}: DemoProps) {
  return (
    <StoryLinks pathname={pathname} search={search}>
      <div className="flex h-svh bg-sidebar p-2">
        <Sidebar collapsed={collapsed}>
          <SidebarHeader>
            <OrgSwitcher
              org={long ? LONG_ORG : ORGS[0]!}
              orgs={ORGS}
              email={USER.email}
              onOrgChange={() => {}}
              settingsHref="/settings"
              collapsed={collapsed}
            />
          </SidebarHeader>
          <SidebarPanel>
            <SidebarSearch onOpen={onOpenSearch} />
            <SidebarBody>
              {empty ? (
                <p className="caption px-2 py-1">{collapsed ? "" : "Nothing here yet."}</p>
              ) : (
                <>
                  <SidebarGroup label="Workspace">
                    {NAV.workspace.map((item) => (
                      <SidebarItem
                        key={item.to}
                        {...item}
                        label={long && item.to === "/inbox" ? LONG_LABEL : item.label}
                        count={long && item.to === "/inbox" ? 128 : item.count}
                      />
                    ))}
                  </SidebarGroup>
                  <SidebarGroup label="Team">
                    {NAV.team.map((item) => (
                      <SidebarItem key={item.to} {...item} />
                    ))}
                    <SidebarItem
                      icon={FolderIcon}
                      label="Projects"
                      to="/projects"
                      children={NAV.projects}
                    />
                  </SidebarGroup>
                  <SidebarGroup label="Running">
                    <SidebarItem
                      mark={<StatusIcon status="live" />}
                      label="Port the session timeline"
                      to="/sessions/971"
                    />
                    <SidebarItem
                      mark={<StatusIcon status="failed" />}
                      label="Fix flaky terminal test"
                      to="/sessions/964"
                    />
                    {many &&
                      Array.from({ length: 24 }, (_, i) => (
                        <SidebarItem
                          key={i}
                          icon={MessagesSquareIcon}
                          label={`Session ${i + 1}: follow-up work`}
                          to={`/sessions/x${i}`}
                        />
                      ))}
                  </SidebarGroup>
                </>
              )}
            </SidebarBody>
            <SidebarFooter className="justify-between">
              <Footer />
            </SidebarFooter>
          </SidebarPanel>
        </Sidebar>
        <main className="ml-2 flex-1 rounded-xl border border-border bg-background" />
      </div>
    </StoryLinks>
  );
}

const meta = {
  title: "Shell/Sidebar",
  component: Demo,
  args: {
    collapsed: false,
    pathname: "/sessions",
    empty: false,
    long: false,
    many: false,
    onOpenSearch: fn(),
  },
  argTypes: { pathname: { control: "text" }, search: { control: "text" } },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The left rail: `SidebarHeader` on the canvas (the workspace switcher), then one curved `SidebarPanel` holding `SidebarSearch`, a scrolling `SidebarBody` of `SidebarGroup`s of `SidebarItem`s, and the `SidebarFooter`. The active row is one sliding pill; a row with children is a disclosure. `useSidebar()` reads the collapsed state. Links come from `LinkProvider`.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Collapsed: Story = {
  args: { collapsed: true },
};
/** A project is active: its disclosure opens itself and the child carries the ink. */
export const ChildActive: Story = {
  args: { pathname: "/projects", search: "p=design" },
};
export const Empty: Story = {
  args: { empty: true },
};
export const LongText: Story = {
  args: { long: true, pathname: "/inbox" },
};
/** The body scrolls under fades; header and footer stay put. */
export const ManyItems: Story = {
  args: { many: true },
};
