import type { Meta, StoryObj } from "@storybook/react-vite";

import { TerminalPalette } from "../../../src/components/code-surface/terminal-palette.tsx";

const meta = {
  title: "Patterns/TerminalPalette",
  component: TerminalPalette,
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TerminalPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
