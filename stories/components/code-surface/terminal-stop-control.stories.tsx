import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { TerminalStopControl } from "../../../src/components/code-surface/terminal-stop-control.tsx";

const meta = {
  title: "Patterns/TerminalStopControl",
  component: TerminalStopControl,
  args: {
    active: true,
    onInterrupt: fn(),
    onForceStop: fn(async () => true),
    onForceStopped: fn(),
  },
} satisfies Meta<typeof TerminalStopControl>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click: an interrupt, a wait, then a force stop in the error tone. */
export const Ready: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Stop process (Ctrl+C)" }));
    await expect(args.onInterrupt).toHaveBeenCalledTimes(1);
    await expect(
      canvas.getByRole("button", { name: "Waiting for process to stop" }),
    ).toBeDisabled();
    await waitFor(
      () => expect(canvas.getByRole("button", { name: "Force stop process" })).toBeEnabled(),
      { timeout: 3000 },
    );
  },
};
