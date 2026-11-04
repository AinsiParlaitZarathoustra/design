import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";

import {
  CommandSuggestions,
  type CommandSuggestion,
} from "../../../src/components/code-surface/command-suggestions.tsx";

const ITEMS: CommandSuggestion[] = [
  { name: "src", kind: "dir" },
  { name: "scripts", kind: "dir" },
  { name: "package.json", kind: "file" },
  { name: "bun", kind: "command" },
];

/** The list on its own, over a stand-in field. In use it comes through `TerminalCommandInput`'s `suggestions`. */
function Anchored() {
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  return (
    <div className="pt-40">
      <div
        ref={setAnchor}
        className="flex h-control-md w-96 items-center rounded-sm border border-border px-2 font-mono text-base text-foreground"
      >
        cd s
      </div>
      <CommandSuggestions
        id="suggestions"
        open
        items={ITEMS}
        activeIndex={1}
        anchor={anchor}
        onSelect={fn()}
        onOpenChange={fn()}
      />
    </div>
  );
}

const meta = {
  title: "Patterns/CommandSuggestions",
  component: CommandSuggestions,
  render: () => <Anchored />,
} satisfies Meta<typeof CommandSuggestions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "suggestions",
    open: true,
    items: ITEMS,
    activeIndex: 1,
    anchor: null,
    onSelect: fn(),
    onOpenChange: fn(),
  },
};
