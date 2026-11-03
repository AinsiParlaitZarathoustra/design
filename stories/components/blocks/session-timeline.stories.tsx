import type { Meta, StoryObj } from "@storybook/react-vite";
import { SessionTimeline } from "../../../src/components/blocks/session-timeline.tsx";
import { DONE_ENTRIES, ENTRIES, FAILED_ENTRIES, LONG_ENTRIES } from "./fixtures.ts";

const meta = {
  title: "Blocks/SessionTimeline",
  component: SessionTimeline,
  args: { status: "live", entries: ENTRIES.slice(0, 5), className: "w-96" },
  argTypes: {
    status: { control: "inline-radio", options: ["live", "done", "failed", "queued"] },
    entries: { control: "object" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A session's entries on a dashed rail with quarter-round elbows. The head card carries the session's status glyph, so the rail reads as one story with a conclusion.",
      },
    },
  },
} satisfies Meta<typeof SessionTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Done: Story = { args: { status: "done", entries: DONE_ENTRIES } };
export const Error: Story = { args: { status: "failed", entries: FAILED_ENTRIES } };
export const Empty: Story = { args: { status: "queued", entries: [] } };
export const LongText: Story = { args: { entries: LONG_ENTRIES } };
