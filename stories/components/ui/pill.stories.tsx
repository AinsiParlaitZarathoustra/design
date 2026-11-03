import type { Meta, StoryObj } from "@storybook/react-vite";
import { GitBranch, X } from "lucide-react";
import { Pill, StatusDot } from "../../../src/components/ui/pill.tsx";

const TONES = ["neutral", "success", "warning", "error", "info"] as const;

const meta = {
  title: "Components/Pill",
  component: Pill,
  args: { children: "status:open" },
  parameters: {
    docs: {
      description: {
        component:
          "A rounded-full chip: a filter token, a crumb, an agent tag. Usually interactive or removable, which its full radius says; a fact about a row is a `Badge`. `StatusDot` is the 6px dot that leads a pill, a row or a legend entry.",
      },
    },
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  render: () => (
    <Pill>
      <GitBranch />
      main
    </Pill>
  ),
};

export const Removable: Story = {
  render: () => (
    <Pill>
      project:atlas
      <button
        type="button"
        aria-label="Remove filter"
        className="-mr-1 inline-flex rounded-full text-muted-foreground hover:text-foreground"
      >
        <X className="size-3" />
      </button>
    </Pill>
  ),
};

export const StatusDots: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {TONES.map((tone) => (
        <Pill key={tone}>
          <StatusDot tone={tone} />
          {tone}
        </Pill>
      ))}
    </div>
  ),
};

export const ManyItems: Story = {
  render: () => (
    <div className="flex w-96 flex-wrap gap-1.5">
      {[
        "status:open",
        "project:atlas",
        "agent:codex",
        "author:me",
        "label:design",
        "has:pr",
        "since:7d",
        "model:balanced",
      ].map((t) => (
        <Pill key={t}>{t}</Pill>
      ))}
    </div>
  ),
};

export const LongText: Story = {
  args: { children: "project:atlas-desktop-and-every-fork-made-from-it" },
};

/** `render` swaps the element: a pill that is a button. */
export const AsButton: Story = {
  render: () => (
    <Pill render={<button type="button" className="hover:bg-element-hover" />}>+ Add filter</Pill>
  ),
};
