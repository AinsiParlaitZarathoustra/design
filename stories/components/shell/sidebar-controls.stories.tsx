import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, userEvent, within } from "storybook/test";
import {
  InfoMenu,
  type InfoLinks,
  ProfileMenu,
} from "../../../src/components/shell/sidebar-controls.tsx";
import { StoryLinks, USER } from "./fixtures.tsx";

const ALL_LINKS: InfoLinks = {
  docs: "#",
  feedback: "#",
  github: "#",
  discord: "#",
  x: "#",
  download: "#",
  website: "#",
};

interface DemoProps {
  user: { name: string; email: string; image?: string };
  links: InfoLinks;
  privacy?: boolean;
  shortcuts?: boolean;
  onLogOut: () => void;
}

/** The rail footer: you on the left, the help menu on the right. Menus open upward. */
function Demo({ user, links, privacy = true, shortcuts = true, onLogOut }: DemoProps) {
  return (
    <StoryLinks>
      <div className="flex min-h-96 items-end">
        <div className="flex w-56 items-center justify-between rounded-xl border border-border bg-background p-2">
          <ProfileMenu
            user={user}
            accountHref="/settings/profile"
            privacyHref={privacy ? "/settings/privacy" : undefined}
            onLogOut={onLogOut}
          />
          <InfoMenu
            links={links}
            settingsHref="/settings"
            onShortcuts={shortcuts ? () => {} : undefined}
          />
        </div>
      </div>
    </StoryLinks>
  );
}

const openProfile: Story["play"] = async ({ canvasElement }) => {
  await userEvent.click(within(canvasElement).getByRole("button", { name: /Account/ }));
};
const openInfo: Story["play"] = async ({ canvasElement }) => {
  await userEvent.click(within(canvasElement).getByRole("button", { name: "Help and links" }));
};

const meta = {
  title: "Shell/SidebarControls",
  component: Demo,
  args: { user: USER, links: ALL_LINKS, privacy: true, shortcuts: true, onLogOut: fn() },
  argTypes: { links: { control: "object" } },
  parameters: {
    docs: {
      description: {
        component:
          "The rail footer's two menus. `ProfileMenu` is you: your avatar, account settings, privacy, log out. `InfoMenu` is help and the community; a link the caller leaves out is left out of the menu.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ProfileOpen: Story = { play: openProfile, tags: ["!autodocs"] };
export const InfoOpen: Story = { play: openInfo, tags: ["!autodocs"] };
/** Only docs and feedback: the community and download groups drop out. */
export const InfoFewLinks: Story = {
  args: { links: { docs: "#", feedback: "#" }, shortcuts: false },
  play: openInfo,
  tags: ["!autodocs"],
};
export const LongText: Story = {
  args: {
    user: {
      name: "Maximiliana Alexandrovna Konstantinopoulou",
      email: "maximiliana.konstantinopoulou@infrastructure-working-group.example.com",
    },
  },
  play: openProfile,
  tags: ["!autodocs"],
};
