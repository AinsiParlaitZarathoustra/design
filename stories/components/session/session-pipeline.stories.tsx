import type { Meta, StoryObj } from "@storybook/react-vite";

import { SessionPipeline } from "../../../src/components/session/session-pipeline.tsx";
import { manyToolCallsSession, planSession } from "./fixtures.ts";

const meta = {
  title: "Session/SessionPipeline",
  component: SessionPipeline,
  args: { session: planSession(), className: "w-96" },
  argTypes: { session: { control: "object" } },
  parameters: {
    docs: {
      description: {
        component:
          "A session as a pipeline: the plan's steps when there is a plan, else every tool call. Done is a filled check, struck through and dimmed; the running step is the one ringed row; later steps sit at 40%. Read by silhouette before colour.",
      },
    },
  },
} satisfies Meta<typeof SessionPipeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlanSteps: Story = {};

export const ToolSteps: Story = { args: { session: manyToolCallsSession(12) } };

export const Empty: Story = {
  args: { session: { meta: { ref: "ses-5124", agent: "Codex" }, phase: "queued", turns: [] } },
};

export const LongText: Story = {
  args: {
    session: {
      ...planSession(),
      meta: {
        title:
          "Rewrite the session sidebar so pinned, unread and snoozed sessions sort into one list",
        agent: "Claude Code",
      },
      plan: [
        {
          content:
            "Edit src/features/sidebar/components/session-list-row-with-pin-and-unread-markers.tsx",
          status: "in_progress",
        },
      ],
    },
  },
};
