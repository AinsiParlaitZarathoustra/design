import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Code, CodeFence, DiffStat } from "../../../src/components/ui/code-block.tsx";

const meta = {
  title: "Components/Code",
  component: Code,
  args: { variant: "inline", children: "~/.agents/skills" },
  argTypes: { variant: { control: "inline-radio", options: ["inline", "block"] } },
  parameters: {
    docs: {
      description: {
        component:
          "A monospace run in the `code` text style (slashed zero, disambiguated glyphs). `inline` sits in a sentence; `block` is a snippet. `CodeFence` is a fenced block in a message, its language inside the box. `DiffStat` is the +/− pair on a session row, in the theme's diff inks.",
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

/**
 * The opt-ins, one per desktop diffstat: `compact` (the changed-files card),
 * `hideZero` (the checkpoint picker, marker rows), `layout="aligned"` (a
 * tree's column of figures) and `label` (one name for a screen reader).
 */
export const DiffOptions: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3 text-secondary-foreground">
      <div className="flex items-center justify-between gap-4">
        <span className="caption">compact</span>
        <DiffStat
          added={12_480}
          removed={1_204_000}
          compact
          label="12,480 added, 1,204,000 removed"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="caption">hideZero</span>
        <DiffStat added={42} removed={0} hideZero label="42 added, 0 removed" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="caption">layout="aligned"</span>
        {[
          ["src/app.tsx", 4, 1],
          ["src/lib/very-long-name.ts", 1280, 0],
          ["README.md", 0, 37],
        ].map(([path, a, r]) => (
          <div key={path} className="flex items-center justify-between gap-4 text-xs">
            <span className="truncate">{path}</span>
            <DiffStat
              added={a as number}
              removed={r as number}
              layout="aligned"
              compact
              hideZero
              label={`${path}: ${a} added, ${r} removed`}
            />
          </div>
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("group", { name: "12,480 added, 1,204,000 removed" }),
    ).toHaveTextContent("+12k−1.2m");
    // hideZero drops the zero side.
    await expect(canvas.getByRole("group", { name: "42 added, 0 removed" })).toHaveTextContent(
      "+42",
    );
    await expect(canvas.getByRole("group", { name: "42 added, 0 removed" })).not.toHaveTextContent(
      "−",
    );
  },
};

/** `CodeFence`: a message's fenced block, as team chat draws it. The first
 *  holds the `<code class="hljs language-ts">` rehype-highlight makes, whose
 *  own padding and background the fence cancels; the second has no
 *  language, so no label. */
export const Fence: Story = {
  render: () => (
    <div className="flex w-120 flex-col gap-3 text-sm text-foreground">
      <p className="my-0">Can you try this guard before the lookup?</p>
      <CodeFence language="ts">
        <code className="hljs language-ts">
          <span className="hljs-keyword">if</span> (!project){" "}
          <span className="hljs-keyword">return</span> <span className="hljs-literal">null</span>;
          {"\n"}
          <span className="hljs-keyword">const</span> sessions ={" "}
          <span className="hljs-title function_">listSessions</span>(project.
          <span className="hljs-property">id</span>);
        </code>
      </CodeFence>
      <CodeFence>
        <code>bun run test src/ui/kbd.test.tsx</code>
      </CodeFence>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const fence = canvasElement.querySelector<HTMLElement>('[data-slot="code-fence"]')!;
    const code = fence.querySelector("code")!;
    // One box: the highlighter's padding is cancelled inside the fence.
    await expect(getComputedStyle(code).paddingTop).toBe("0px");
    await expect(fence.querySelector('[data-slot="code-fence-language"]')).toHaveTextContent("ts");
  },
};
