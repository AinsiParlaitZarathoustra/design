import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloudUpload, GitCommitHorizontal, GitPullRequestArrow, Pencil } from "lucide-react";
import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "../../src/ui/dropdown-menu.tsx";
import { SplitButton } from "../../src/ui/split-button.tsx";

const MENU = (
  <>
    <DropdownMenuItem>
      <GitCommitHorizontal />
      Commit
      <DropdownMenuShortcut>⌘↵</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <CloudUpload />
      Commit &amp; push
    </DropdownMenuItem>
    <DropdownMenuItem disabled title="No remote to open a pull request on">
      <GitPullRequestArrow />
      Commit, push &amp; PR
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Pencil />
      Edit pull request…
    </DropdownMenuItem>
  </>
);

const meta = {
  title: "Primitives/SplitButton",
  component: SplitButton,
  args: {
    label: "Commit actions",
    menuLabel: "More commit actions",
    icon: GitCommitHorizontal,
    children: "Commit",
    menu: MENU,
    onClick: fn(),
  },
  argTypes: { menu: { control: false }, icon: { control: false } },
  // Room on the left: the menu is wider than the group and opens aligned to its end.
  decorators: [
    (Story) => (
      <div className="flex min-h-72 items-start justify-end p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "A primary action with its alternatives on an attached ⌄, built from `Button` and `DropdownMenu`: desktop's source-control ship button. The menu opens against the whole group, aligned to its end. `busy` holds both halves; `disabledReason` turns the primary off and says why.",
      },
    },
  },
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Commit" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
    const group = canvas.getByRole("group", { name: "Commit actions" });
    await userEvent.click(canvas.getByRole("button", { name: "More commit actions" }));
    const menu = await screen.findByRole("menu");
    // Lined up with the group's end, not the chevron's (once the scale-in has settled).
    await waitFor(() =>
      expect(
        Math.abs(menu.getBoundingClientRect().right - group.getBoundingClientRect().right),
      ).toBeLessThanOrEqual(1),
    );
    await userEvent.keyboard("{Escape}");
    // Let the exit finish, so axe does not see Base UI's focus guards mid-close.
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
  },
};

export const Busy: Story = {
  args: { busy: true, busyLabel: "Pushing…" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Held (`aria-disabled`) but focusable, so a press that starts a run keeps focus.
    await expect(canvas.getByRole("button", { name: /Pushing…/ })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await expect(canvas.getByRole("button", { name: "More commit actions" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  },
};

export const Disabled: Story = {
  args: { disabledReason: "Nothing staged" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const primary = canvas.getByRole("button", { name: "Commit" });
    await expect(primary).toHaveAttribute("aria-disabled", "true");
    await expect(primary).toHaveAttribute("title", "Nothing staged");
    // A keyboard reaches it, and hears why it is off.
    await userEvent.tab();
    await expect(primary).toHaveFocus();
    await expect(primary).toHaveAccessibleDescription("Nothing staged");
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(canvas.getByRole("button", { name: "More commit actions" })).toBeEnabled();
  },
};

/** Open, for screenshots. */
export const Open: Story = {
  tags: ["!autodocs"],
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "More commit actions" }),
    );
    const row = await screen.findByRole("menuitem", { name: /Commit & push/ });
    await waitFor(() => expect(row).toBeVisible());
  },
};
