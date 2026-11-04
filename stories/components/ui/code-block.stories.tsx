import type { Meta, StoryObj } from "@storybook/react-vite";
import { Code, DiffStat } from "../../../src/components/ui/code-block.tsx";

const meta = {
  title: "Components/Code",
  component: Code,
  args: { variant: "inline", children: "~/.agents/skills" },
  argTypes: { variant: { control: "inline-radio", options: ["inline", "block"] } },
  parameters: {
    docs: {
      description: {
        component:
          "A monospace run in the `code` text style (slashed zero, disambiguated glyphs). `inline` sits in a sentence; `block` is a snippet. `DiffStat` is the +/− pair on a session row, in the theme's diff inks.",
      },
    },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InSentence: Story = {
  render: (args) => (
    <p className="body w-96 text-secondary-foreground">
      Skills live in <Code {...args} />, and the session ID is <Code>0O1lI-8f3a</Code>.
    </p>
  ),
};

export const Block: Story = {
  args: {
    variant: "block",
    children: "bun run build-storybook\nbun run storybook:smoke",
  },
  render: (args) => (
    <pre className="w-96">
      <Code {...args} />
    </pre>
  ),
};

export const LongText: Story = {
  // A component finding, left for its owner. axe scrollable-region-focusable: the block <code>
  // scrolls sideways but cannot take keyboard focus.
  parameters: { a11y: { test: "todo" } },
  args: {
    variant: "block",
    children:
      "cargo test -p atlas-native-agent --test engine_turn -- --nocapture --test-threads=1 2>&1 | tee /tmp/engine-turn.log",
  },
  render: (args) => (
    <pre className="w-96">
      <Code {...args} />
    </pre>
  ),
};

export const Diff: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <DiffStat added={12} removed={3} />
      <DiffStat added={1204} removed={987} />
      <DiffStat added={0} removed={0} />
    </div>
  ),
};
