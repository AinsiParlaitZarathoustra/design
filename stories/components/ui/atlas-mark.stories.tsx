import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
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

/**
 * `tone="app-icon"`: the app icon's black tile with a white mark, the same in
 * every theme, beside the default theme-inked tile.
 */
export const BadgeTones: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AtlasBadge data-testid="theme" />
      <AtlasBadge data-testid="app-icon" tone="app-icon" />
      <AtlasBadge tone="app-icon" className="size-12 [&_svg]:size-6" />
    </div>
  ),
  play: async ({ canvas }) => {
    const icon = getComputedStyle(canvas.getByTestId("app-icon"));
    // ratchet-allow: the computed values of the app icon's fixed tile, asserted against.
    await expect(icon.backgroundColor).toBe("rgb(0, 0, 0)");
    // ratchet-allow: the computed white of its mark, as above.
    await expect(icon.color).toBe("rgb(255, 255, 255)");
    await expect(canvas.getByTestId("theme")).not.toHaveAttribute("data-tone");
  },
};

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
