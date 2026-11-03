import type { Meta, StoryObj } from "@storybook/react-vite";
import { AtlasBadge, AtlasMark, AtlasWordmark } from "../../../src/components/ui/atlas-mark.tsx";

const meta = {
  title: "Components/AtlasMark",
  component: AtlasMark,
  args: { className: "size-6" },
  parameters: {
    docs: {
      description: {
        component:
          "Atlas's own mark: three rising strokes in `currentColor`, so it takes the ink of whatever it sits in. `AtlasBadge` puts it in the rounded container above an auth form; `AtlasWordmark` adds the name.",
      },
    },
  },
} satisfies Meta<typeof AtlasMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 text-foreground">
      <AtlasMark className="size-3" />
      <AtlasMark className="size-4" />
      <AtlasMark className="size-6" />
      <AtlasMark className="size-10" />
    </div>
  ),
};

/** `currentColor`: the mark follows the ink around it. */
export const Inks: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AtlasMark className="size-5 text-foreground" />
      <AtlasMark className="size-5 text-secondary-foreground" />
      <AtlasMark className="size-5 text-muted-foreground" />
    </div>
  ),
};

export const Badge: Story = { render: () => <AtlasBadge /> };
export const Wordmark: Story = { render: () => <AtlasWordmark /> };

export const Lockups: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col items-center gap-3">
        <AtlasBadge />
        <span className="heading">Sign in to Atlas</span>
      </div>
      <AtlasWordmark />
    </div>
  ),
};
