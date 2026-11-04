import type { Meta, StoryObj } from "@storybook/react-vite";
import { GitPullRequest, Plus } from "lucide-react";
import { PageHeader, SectionHeader } from "../../../src/components/patterns/section-header.tsx";
import { Button } from "../../../src/ui/button.tsx";
import { Icon } from "../../../src/ui/icon.tsx";

const meta = {
  title: "Patterns/SectionHeader",
  component: SectionHeader,
  args: { title: "Recent sessions", description: "The last seven days, newest first" },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    action: { control: false },
    icon: { control: false },
  },
  decorators: [(Story) => <div className="w-120">{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component:
          "`SectionHeader` is the eyebrow above a group of rows or cards: it labels a group, so it is not a heading. `PageHeader` is the title block at the top of a page, with at most one primary action.",
      },
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TitleOnly: Story = { args: { description: undefined } };
export const WithAction: Story = {
  args: {
    action: (
      <Button variant="ghost" size="sm">
        View all
      </Button>
    ),
  },
};
/** `icon` before the title, in the eyebrow's ink; `title` as a node, here
 *  with a count after the words. */
export const WithIcon: Story = {
  args: {
    icon: GitPullRequest,
    title: (
      <>
        Pull requests <span className="ml-1 tabular-nums text-foreground">3</span>
      </>
    ),
    description: "Waiting for your review",
  },
};
export const LongText: Story = {
  args: {
    title: "Sessions shared with you by teammates in every project you can read",
    description:
      "Includes sessions from projects attached read-only; the agent asks before it writes to any of them",
  },
};

export const Page: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Usage"
        description="Tokens, sessions and spend across the workspace"
        action={
          <Button size="sm">
            <Icon icon={Plus} size="sm" />
            New budget
          </Button>
        }
      />
      <PageHeader
        title="A page title long enough that it has to truncate at the edge of its column"
        description="And a description that is also long enough to truncate rather than wrap onto a second line"
      />
    </div>
  ),
};
