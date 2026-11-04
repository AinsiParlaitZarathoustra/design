import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriorityIcon, StatusIcon } from "../../../src/components/ui/status-icon.tsx";

const STATUSES = ["queued", "live", "done", "failed"] as const;
const PRIORITIES = ["none", "low", "medium", "high", "urgent"] as const;

const meta = {
  title: "Components/StatusIcon",
  component: StatusIcon,
  args: { status: "live" },
  argTypes: { status: { control: "inline-radio", options: STATUSES } },
  parameters: {
    docs: {
      description: {
        component:
          "The session status glyph: a hollow ring (queued), a ThinkingOrb (running — the only state that moves), a muted dot (done), an error dot (failed). `PriorityIcon` is priority as stepped bars; only urgent earns colour.",
      },
    },
  },
} satisfies Meta<typeof StatusIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { status: "failed" } };

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {STATUSES.map((status) => (
        <span key={status} className="label inline-flex items-center gap-2">
          <StatusIcon status={status} />
          {status}
        </span>
      ))}
    </div>
  ),
};

export const Priorities: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {PRIORITIES.map((priority) => (
        <span key={priority} className="label inline-flex items-center gap-2">
          <PriorityIcon priority={priority} />
          {priority}
        </span>
      ))}
    </div>
  ),
};

/** Down a column, where the shapes have to be comparable at a glance. */
export const ManyItems: Story = {
  render: () => (
    <div className="flex w-80 flex-col">
      {[
        ["Refactor settings", "live", "high"],
        ["Fix flaky terminal test", "failed", "urgent"],
        ["Port the timeline", "done", "medium"],
        ["Theme import", "queued", "low"],
        ["Bump Rust", "done", "none"],
      ].map(([title, status, priority]) => (
        <div
          key={title}
          className="flex items-center gap-2 border-b border-border-subtle px-2 py-1.5 last:border-0"
        >
          <PriorityIcon priority={priority as (typeof PRIORITIES)[number]} />
          <StatusIcon status={status as (typeof STATUSES)[number]} />
          <span className="label truncate">{title}</span>
        </div>
      ))}
    </div>
  ),
};
