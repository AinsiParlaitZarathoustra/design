import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "../../../src/components/ui/avatar.tsx";
import { StatusDot, type StatusDotTone } from "../../../src/components/ui/status-dot.tsx";

const TONES: StatusDotTone[] = [
  "neutral",
  "subtle",
  "success",
  "warning",
  "error",
  "info",
  "primary",
  "foreground",
];
const SIZES = ["xs", "sm", "md", "lg"] as const;

const meta = {
  title: "Components/StatusDot",
  component: StatusDot,
  args: { tone: "success", size: "sm", hollow: false },
  argTypes: {
    tone: { control: "select", options: TONES },
    size: { control: "inline-radio", options: SIZES },
    cutout: {
      control: "select",
      options: [undefined, "background", "card", "popover", "sidebar", "panel"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A status or presence dot. The tone is ink (`bg-current`), so it is always a theme token. `hollow` is the off shape, `cutout` rings it in the surface it sits on (an avatar's corner), and `label` names it when nothing beside it says the state.",
      },
    },
  },
} satisfies Meta<typeof StatusDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-2 text-xs text-secondary-foreground">
      {TONES.map((tone) => (
        <div key={tone} className="flex items-center gap-3">
          <StatusDot tone={tone} />
          <StatusDot tone={tone} hollow />
          {tone}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {SIZES.map((size) => (
        <StatusDot key={size} tone="success" size={size} />
      ))}
    </div>
  ),
};

export const Presence: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(
        [
          ["success", "Online"],
          ["warning", "Away"],
          ["subtle", "Offline"],
        ] as const
      ).map(([tone, label]) => (
        <span key={label} className="relative inline-flex">
          <Avatar size="md">
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <StatusDot
            tone={tone}
            size="lg"
            cutout="background"
            label={label}
            className="absolute -right-px -bottom-px"
          />
        </span>
      ))}
    </div>
  ),
};

export const OnAnIcon: Story = {
  render: () => (
    <span className="relative inline-flex text-muted-foreground">
      <Bell className="size-4" />
      <StatusDot tone="primary" label="Unread" className="absolute -top-0.5 -right-0.5" />
    </span>
  ),
};
