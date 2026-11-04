import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { highlightRanges } from "../../../src/components/code-surface/code-surface.ts";
import { FindBar, type FindBarProps } from "../../../src/components/code-surface/find-bar.tsx";

const TEXT = "format once, then format again; formatDuration formats.";

/** The bar over a real string, counting what it finds. */
function Live(props: Partial<FindBarProps>) {
  const [query, setQuery] = useState(props.query ?? "");
  const [replace, setReplace] = useState("");
  const [replaceOpen, setReplaceOpen] = useState(props.replaceOpen ?? false);
  const [index, setIndex] = useState<number | null>(0);
  const count = highlightRanges(TEXT, query).length;
  return (
    <FindBar
      onClose={() => {}}
      {...props}
      onNext={() => {
        props.onNext?.();
        setIndex((i) => ((i ?? -1) + 1) % Math.max(count, 1));
      }}
      onPrevious={() => {
        props.onPrevious?.();
        setIndex((i) => ((i ?? 0) - 1 + count) % Math.max(count, 1));
      }}
      query={query}
      onQueryChange={(q) => {
        props.onQueryChange?.(q);
        setQuery(q);
        setIndex(0);
      }}
      matchCount={props.matchCount ?? count}
      matchIndex={props.matchIndex === undefined ? (count ? index : null) : props.matchIndex}
      {...(props.onReplaceChange
        ? { replace, onReplaceChange: setReplace, replaceOpen, onReplaceOpenChange: setReplaceOpen }
        : {})}
    />
  );
}

const meta = {
  title: "Patterns/FindBar",
  component: FindBar,
  args: {
    query: "format",
    onQueryChange: fn(),
    onNext: fn(),
    onPrevious: fn(),
    onClose: fn(),
  },
  render: (args) => <Live {...args} />,
  decorators: [
    (Story) => (
      <div className="flex max-w-xl justify-end">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FindBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Matches: Story = {
  args: { onToggle: fn() },
  play: async ({ args, canvasElement }) => {
    const field = within(canvasElement).getByRole("textbox", { name: "Find" });
    await userEvent.click(field);
    await userEvent.keyboard("{Enter}");
    await expect(args.onNext).toHaveBeenCalled();
    await userEvent.keyboard("{Shift>}{Enter}{/Shift}");
    await expect(args.onPrevious).toHaveBeenCalled();
    await userEvent.keyboard("{Escape}");
    await expect(args.onClose).toHaveBeenCalled();
  },
};

export const NoResults: Story = { args: { query: "kubernetes", onToggle: fn() } };

export const InvalidRegex: Story = {
  args: { query: "format(", invalid: true, regexp: true, matchCount: 0, onToggle: fn() },
};

export const Replace: Story = {
  args: {
    onToggle: fn(),
    onReplaceChange: fn(),
    replaceOpen: true,
    onReplace: fn(),
    onReplaceAll: fn(),
  },
};

/** The terminal's: no options, no replace. */
export const FindOnly: Story = { args: { placeholder: "Search output…" } };

export const SelectAll: Story = {
  args: { query: "", onToggle: fn(), onSelectAll: fn() },
  play: async ({ args, canvasElement }) => {
    const field = within(canvasElement).getByRole("textbox", { name: "Find" });
    await userEvent.type(field, "format");
    await userEvent.keyboard("{Alt>}{Enter}{/Alt}");
    await expect(args.onSelectAll).toHaveBeenCalledTimes(1);
  },
};
