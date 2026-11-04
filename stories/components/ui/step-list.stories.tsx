import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { StepList } from "../../../src/components/ui/step-list.tsx";
import type { StepListStep, StepStatus } from "../../../src/components/ui/step-list.tsx";

const STEPS = [
  { id: "commit", label: "Commit", detail: "Tighten the composer's drop ring" },
  { id: "push", label: "Push", detail: "origin/ship-button" },
  { id: "pr", label: "Open pull request", detail: "into main" },
];

const at = (...status: StepStatus[]): StepListStep[] =>
  STEPS.map((s, i) => ({ ...s, status: status[i] ?? "pending" }));

const meta = {
  title: "Components/StepList",
  component: StepList,
  args: { steps: at("done", "running", "pending") },
  decorators: [
    (Story) => (
      <div className="w-80 rounded-lg border border-border-subtle px-3 py-2">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "A multi-step action in place, in the session timeline's language: the status glyph, the step, what it acts on. A failed step shows its complaint under the list and, with `onRetry`, a retry from there. Desktop's Commit, push & PR progress.",
      },
    },
  },
} satisfies Meta<typeof StepList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Running: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("status")).toHaveTextContent("Push…");
  },
};

/** Every step still pending: the run has been asked for and nothing has
 *  reported yet, so the status line says "Starting…" (`startingMessage`). */
export const Starting: Story = {
  args: { steps: at() },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("status")).toHaveTextContent("Starting…");
  },
};

export const Done: Story = {
  args: { steps: at("done", "done", "done"), doneMessage: "Opened pull request 12." },
};

export const Failed: Story = {
  args: {
    steps: at("done", "failed", "pending"),
    error: "! [rejected] ship-button -> ship-button (non-fast-forward)",
    onRetry: fn(),
    retryLabel: "Retry push",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const failed = canvasElement.querySelector<HTMLElement>('[data-status="failed"]')!;
    const done = canvasElement.querySelector<HTMLElement>('[data-status="done"]')!;
    await expect(getComputedStyle(failed).color).not.toBe(getComputedStyle(done).color);
    await userEvent.click(canvas.getByRole("button", { name: "Retry push" }));
    await expect(args.onRetry).toHaveBeenCalledOnce();
  },
};

function LiveDemo() {
  const [status, setStatus] = useState<StepStatus[]>(["done", "failed"]);
  return (
    <StepList
      steps={at(...status)}
      error={status.includes("failed") ? "Authentication failed for origin" : null}
      retryLabel="Retry push"
      onRetry={() => setStatus(["done", "done", "running"])}
    />
  );
}

/** The steps advancing as a run would drive them; a retry resumes at the failed step. */
export const Live: Story = {
  tags: ["!autodocs"],
  render: () => <LiveDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Retry push" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Open pull request…");
    await expect(canvas.queryByRole("button")).toBeNull();
  },
};
