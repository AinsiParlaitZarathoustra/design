import type { Meta, StoryObj } from "@storybook/react-vite";
import { SessionPipeline } from "../../../src/components/blocks/session-pipeline.tsx";
import { DONE_ENTRIES, ENTRIES, FAILED_ENTRIES, LONG_ENTRIES, SESSION } from "./fixtures.ts";

const meta = {
  title: "Blocks/SessionPipeline",
  component: SessionPipeline,
  args: { session: SESSION, entries: ENTRIES, className: "w-96" },
  argTypes: { session: { control: "object" }, entries: { control: "object" } },
  parameters: {
    docs: {
      description: {
        component:
          "A session's tool calls as a pipeline. Done steps are a filled check, struck through and dimmed; the running step is the one ringed row; later steps sit at 40%. Read by silhouette before colour.",
      },
    },
  },
} satisfies Meta<typeof SessionPipeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Done: Story = {
  args: { session: { ...SESSION, status: "done", durationMinutes: 13 }, entries: DONE_ENTRIES },
};
export const Error: Story = {
  args: { session: { ...SESSION, status: "failed" }, entries: FAILED_ENTRIES },
};
export const Empty: Story = {
  args: { session: { ...SESSION, status: "queued", durationMinutes: 0 }, entries: [] },
};
export const LongText: Story = {
  args: {
    session: {
      ...SESSION,
      title:
        "Rewrite the session sidebar so pinned, unread and snoozed sessions sort into one list",
      branch: "uzayermasud/one-sidebar-sessions-first-with-project-filter",
    },
    entries: LONG_ENTRIES,
  },
};
export const ManyItems: Story = {
  args: {
    entries: [
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `m${i}`,
        kind: "tool_call" as const,
        title: `Edit file ${i + 1} of 14`,
        detail: `src/features/settings/components/row-${i + 1}.tsx`,
        at: "10:4" + (i % 10),
        toolStatus: "ok" as const,
      })),
      ...ENTRIES.slice(4),
    ],
  },
};
