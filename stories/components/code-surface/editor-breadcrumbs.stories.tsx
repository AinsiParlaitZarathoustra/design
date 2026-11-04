import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { pathSegments } from "../../../src/components/code-surface/code-surface.ts";
import { EditorBreadcrumbs } from "../../../src/components/code-surface/editor-breadcrumbs.tsx";

const ROOT = "/Users/me/atlas";

const meta = {
  title: "Patterns/EditorBreadcrumbs",
  component: EditorBreadcrumbs,
  args: { segments: pathSegments(`${ROOT}/src/lib/time-ago.ts`, ROOT) },
  decorators: [
    (Story) => (
      <div className="flex h-control-lg max-w-md items-center border-b border-border px-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EditorBreadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Short: Story = {};

/** The middle folds into one ellipsis; its tooltip lists the hidden folders. */
export const Collapsed: Story = {
  args: {
    segments: pathSegments(
      `${ROOT}/src/features/editor/components/settings/file-surface-chrome.tsx`,
      ROOT,
    ),
    dirty: true,
  },
};

export const Clickable: Story = {
  args: {
    segments: pathSegments(`${ROOT}/src/features/editor/lib/file-path.ts`, ROOT),
    onSelect: fn(),
  },
};
