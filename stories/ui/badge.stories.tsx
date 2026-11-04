import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheck, TriangleAlert } from "lucide-react";
import { Badge } from "../../src/ui/badge.tsx";
import { Icon } from "../../src/ui/icon.tsx";

const VARIANTS = [
  "default",
  "secondary",
  "outline",
  "success",
  "warning",
  "severe",
  "destructive",
  "info",
] as const;

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  args: { children: "Running", variant: "secondary", size: "md" },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    size: { control: "inline-radio", options: ["sm", "md"] },
    children: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A short status word. Not a control, so it sizes to its text. Status tones come from the theme\'s status keys. It has no hooks and no `"use client"`, so a React Server Component renders it: import it from `@tryatlas/design/variants` there.',
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {VARIANTS.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Medium
      </Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Badge {...args} variant="success">
        <Icon icon={CircleCheck} size="xs" />
        Passed
      </Badge>
      <Badge {...args} variant="warning">
        <Icon icon={TriangleAlert} size="xs" />
        Needs review
      </Badge>
    </div>
  ),
};

export const LongText: Story = {
  args: { children: "Waiting for approval from the repository owner" },
};

export const Empty: Story = { args: { children: "" } };
