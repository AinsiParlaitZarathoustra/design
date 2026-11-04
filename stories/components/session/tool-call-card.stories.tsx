import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { DefaultDiff, ToolCallCard } from "../../../src/components/session/tool-call-card.tsx";
import { hugeOutputCalls, toolCall } from "./fixtures.ts";

/** Calls sit in one bordered box, divided by hairlines, as `TurnRow` draws them. */
function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl divide-y divide-border-subtle overflow-hidden rounded-md border border-border">
      {children}
    </div>
  );
}

const meta = {
  title: "Session/ToolCallCard",
  component: ToolCallCard,
  args: {
    call: toolCall({
      id: "default",
      kind: "read",
      title: "Read",
      paths: ["src/features/sidebar/sort.ts"],
      input: { text: '{"path":"src/features/sidebar/sort.ts"}' },
      output: { text: "export function sortSessions(rows) {\n  return rows\n}" },
    }),
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "One tool call: a one-line header (glyph, title, target, then `+n −m` and the duration in the gutter) that opens to the paths, input, output or terminal run, and diffs. Huge payloads render 400 lines and grow by 2,000; a truncated one asks the app to load it.",
      },
    },
  },
} satisfies Meta<typeof ToolCallCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Statuses: Story = {
  render: () => (
    <>
      <ToolCallCard
        call={toolCall({ id: "p", kind: "execute", status: "pending", title: "bun run lint" })}
      />
      <ToolCallCard
        call={toolCall({
          id: "r",
          kind: "execute",
          status: "running",
          title: "bun run test",
          durationMs: undefined,
        })}
      />
      <ToolCallCard
        call={toolCall({
          id: "c",
          kind: "search",
          status: "completed",
          title: 'Search "sortSessions"',
          durationMs: 4200,
        })}
      />
      <ToolCallCard
        call={toolCall({
          id: "f",
          kind: "fetch",
          status: "failed",
          title: "Fetch https://example.com",
          durationMs: 72_000,
        })}
      />
    </>
  ),
};

const PATCH = [
  "@@ -1,6 +1,7 @@",
  " import type { Row } from './types'",
  "-export function sortSessions(rows: Row[]) {",
  "-  return rows",
  "+export function sortSessions(rows: Row[]): Row[] {",
  "+  // Pinned, then unread, then everything else.",
  "+  return [...rows].sort((a, b) => rank(a) - rank(b))",
  " }",
].join("\n");

export const Diff: Story = {
  args: {
    defaultOpen: true,
    call: toolCall({
      id: "diff",
      kind: "edit",
      title: "Edit",
      paths: ["src/features/sidebar/sort.ts"],
      diffs: [{ path: "src/features/sidebar/sort.ts", patch: PATCH, insertions: 3, deletions: 2 }],
    }),
  },
};

export const NewFile: Story = {
  args: {
    defaultOpen: true,
    call: toolCall({
      id: "new",
      kind: "edit",
      title: "Write",
      paths: ["src/features/sidebar/rank.ts"],
      diffs: [
        {
          path: "src/features/sidebar/rank.ts",
          change: "added",
          insertions: 3,
          deletions: 0,
          newText:
            "export function rank(row: Row): number {\n  return row.pinned ? 0 : row.unread ? 1 : 2\n}\n",
        },
      ],
    }),
  },
};

export const Terminal: Story = {
  args: {
    defaultOpen: true,
    call: toolCall({
      id: "term",
      kind: "execute",
      status: "failed",
      title: "bun run typecheck",
      durationMs: 8_400,
      terminal: {
        command: "bun run typecheck",
        output:
          "$ tsc --noEmit\n\u001b[31msrc/sort.ts(3,7): error TS2322:\u001b[0m Type 'string' is not assignable to type 'number'.\n\u001b[2mFound 1 error.\u001b[0m",
        exitCode: 2,
      },
    }),
  },
};

export const TruncatedPayload: Story = {
  args: {
    defaultOpen: true,
    onLoadPayload: fn(),
    call: toolCall({
      id: "trunc",
      kind: "execute",
      title: "bun run test",
      input: { text: '{"command":"bun run test"}' },
      output: { text: "✓ 412 tests passed\n✓ 18 suites…", truncated: true, bytes: 96_400 },
    }),
  },
};

export const Binary: Story = {
  args: {
    defaultOpen: true,
    call: toolCall({
      id: "bin",
      title: "Read",
      paths: ["assets/screenshot.png"],
      output: { text: null, binary: true, bytes: 482113 },
    }),
  },
};

export const Empty: Story = {
  args: {
    defaultOpen: true,
    call: toolCall({ id: "empty", kind: "think", title: "Update the plan" }),
  },
};

export const LongTitle: Story = {
  args: {
    call: toolCall({
      id: "long",
      kind: "read",
      name: "Read",
      paths: [
        "src/features/sidebar/components/session-list-row-with-pin-and-unread-markers-and-a-very-long-name.tsx",
      ],
      durationMs: 1_240,
    }),
  },
};

export const HugeOutput: Story = {
  args: { defaultOpen: true, call: hugeOutputCalls()[0]! },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const terminal = () =>
      canvasElement
        .querySelectorAll('[data-slot="payload-lines"]')[1]!
        .querySelectorAll('[data-slot="payload-line"]');
    await expect(terminal()).toHaveLength(400);
    await userEvent.click(canvas.getByRole("button", { name: "Show 2,000 more lines" }));
    await expect(terminal()).toHaveLength(2400);
  },
};

export const HugeDiff: Story = {
  args: { defaultOpen: true, call: hugeOutputCalls()[1]! },
};

export const DefaultDiffAlone: Story = {
  name: "DefaultDiff",
  render: () => (
    <div className="p-3">
      <DefaultDiff
        diff={{ path: "src/features/sidebar/sort.ts", patch: PATCH, insertions: 3, deletions: 2 }}
      />
    </div>
  ),
};
