import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { EditorStatusBar } from "../../../src/components/code-surface/editor-status-bar.tsx";

const meta = {
  title: "Patterns/EditorStatusBar",
  component: EditorStatusBar,
  args: { line: 12, column: 4, language: "TypeScript", eol: "LF", indent: "Spaces: 2" },
  decorators: [
    (Story) => (
      <div className="max-w-xl overflow-hidden rounded-md border border-border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EditorStatusBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selection: Story = { args: { selected: 42 } };
export const Clickable: Story = {
  args: { onPositionClick: fn(), onLanguageClick: fn() },
};
