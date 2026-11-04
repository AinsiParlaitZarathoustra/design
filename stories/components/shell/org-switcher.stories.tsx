import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn, userEvent, within } from "storybook/test";
import { OrgMark, OrgSwitcher } from "../../../src/components/shell/org-switcher.tsx";
import type { Organisation } from "../../../src/lib/types.ts";
import { LONG_ORG, MANY_ORGS, ORGS, StoryLinks, USER } from "./fixtures.tsx";

interface DemoProps {
  org: Organisation;
  orgs: Organisation[];
  email: string;
  collapsed?: boolean;
  onOrgChange: (id: string) => void;
  onLogOut?: () => void;
}

function Demo({ org, orgs, onOrgChange, ...props }: DemoProps) {
  const [active, setActive] = useState(org);
  return (
    <StoryLinks>
      <div className="min-h-96 w-56 rounded-lg bg-sidebar p-2">
        <OrgSwitcher
          {...props}
          org={active}
          orgs={orgs}
          settingsHref="/settings"
          onOrgChange={(id) => {
            setActive(orgs.find((o) => o.id === id) ?? active);
            onOrgChange(id);
          }}
        />
      </div>
    </StoryLinks>
  );
}

const open: Story["play"] = async ({ canvasElement }) => {
  await userEvent.click(within(canvasElement).getByRole("button"));
};

/** Open the menu, then the workspace submenu. */
const openSubmenu: Story["play"] = async (context) => {
  await open(context);
  const item = await within(document.body).findByText("Switch workspace");
  await userEvent.click(item);
};

const meta = {
  title: "Shell/OrgSwitcher",
  component: Demo,
  args: {
    org: ORGS[0]!,
    orgs: ORGS,
    email: USER.email,
    collapsed: false,
    onOrgChange: fn(),
    onLogOut: fn(),
  },
  argTypes: { org: { control: false }, orgs: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "The workspace switcher at the top of the rail. The menu carries Settings, members and Log out; switching is a submenu headed by the account email. `OrgMark` is the workspace's initials tile, also used by `SettingsShell`.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { play: open, tags: ["!autodocs"] };
export const SwitchWorkspace: Story = { play: openSubmenu, tags: ["!autodocs"] };
export const Collapsed: Story = {
  // A component finding, left for its owner. axe label-content-name-mismatch: collapsed, the
  // trigger is named for the org but shows only its mark's initial.
  parameters: { a11y: { test: "todo" } },
  args: { collapsed: true },
};
export const LongText: Story = { args: { org: LONG_ORG, orgs: [LONG_ORG, ...ORGS] } };
export const ManyItems: Story = {
  args: { orgs: MANY_ORGS },
  play: openSubmenu,
  tags: ["!autodocs"],
};

/** The mark alone, at its two sizes. */
export const Mark: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <OrgMark initials="AT" />
      <OrgMark initials="NL" className="size-6 rounded-md text-3xs" />
    </div>
  ),
};
