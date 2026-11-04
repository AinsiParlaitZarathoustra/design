import type { Meta, StoryObj } from "@storybook/react-vite";
import { GitBranch, Pencil, X } from "lucide-react";
import { expect, within } from "storybook/test";
import { Pill } from "../../../src/components/ui/pill.tsx";
import { Spinner } from "../../../src/components/ui/spinner.tsx";
import { StatusDot } from "../../../src/components/ui/status-dot.tsx";
import { Icon } from "../../../src/ui/icon.tsx";
import { IconButton } from "../../../src/ui/icon-button.tsx";

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

/** `size`: `xs` (20px, the default) and `sm` (24px, `text-xs`). */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Pill>
        <GitBranch />
        xs
      </Pill>
      <Pill size="sm">
        <GitBranch />
        sm
      </Pill>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const [xs, sm] = canvasElement.querySelectorAll<HTMLElement>("span.rounded-full");
    await expect(xs!.getBoundingClientRect().height).toBe(20);
    await expect(sm!.getBoundingClientRect().height).toBe(24);
  },
};

/** `trailingAction`: a pill that ends in its own button, the composer's queued
 *  prompt. The end padding tightens so the 16px remove button sits evenly in
 *  the curve. */
export const TrailingAction: Story = {
  render: () => (
    <div className="flex flex-wrap gap-1.5">
      {["Run the tests again", "Then open a PR into the version branch"].map((text) => (
        <Pill key={text} size="sm" trailingAction render={<div />} className="max-w-64">
          <button
            type="button"
            className="flex min-w-0 cursor-pointer items-center gap-1 hover:text-foreground"
          >
            <Icon icon={Pencil} size="xs" className="text-muted-foreground" />
            <span className="truncate">{text}</span>
          </button>
          <IconButton icon={X} label="Remove from queue" size="2xs" shape="round" />
        </Pill>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const pill = canvasElement.querySelector<HTMLElement>("div.rounded-full")!;
    const remove = within(pill).getByRole("button", { name: "Remove from queue" });
    const right = pill.getBoundingClientRect().right - remove.getBoundingClientRect().right;
    const top = remove.getBoundingClientRect().top - pill.getBoundingClientRect().top;
    // The button sits as far from the end as from the top: centred in the curve.
    await expect(Math.abs(right - top)).toBeLessThanOrEqual(0.5);
  },
};

/** `surface="raised"`: a status floating over a dimmed panel (the composer's
 *  "Syncing" lock). No outline; `shadow-sm` lifts it instead. */
export const Raised: Story = {
  render: () => (
    <div className="relative flex h-28 w-96 items-center justify-center rounded-xl border border-border bg-card">
      <div className="absolute inset-0 rounded-xl bg-background/40" />
      <Pill size="sm" surface="raised" className="relative">
        <Spinner size="xs" label="" />
        Syncing tryatlas/design…
      </Pill>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const pill = canvasElement.querySelector<HTMLElement>("span.rounded-full")!;
    const style = getComputedStyle(pill);
    // A fully transparent outline: the computed colour's alpha is 0.
    await expect(style.borderTopColor).toMatch(/,\s*0\)$/);
    await expect(style.boxShadow).not.toBe("none");
  },
};
