import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../src/components/ui/alert-dialog.tsx";
import { expect, userEvent, waitFor } from "storybook/test";
import { Button } from "../../../src/ui/button.tsx";

interface DemoProps {
  defaultOpen?: boolean;
  title?: string;
  description?: string;
  action?: string;
  destructive?: boolean;
}

function Demo({
  defaultOpen = false,
  title = "Delete this session?",
  description = "Its transcript and checkpoints go with it. This cannot be undone.",
  action = "Delete",
  destructive = true,
}: DemoProps) {
  return (
    <AlertDialog defaultOpen={defaultOpen}>
      <AlertDialogTrigger render={<Button variant="outline" />}>Delete session</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={destructive ? "destructive" : "default"}>
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const meta = {
  title: "Components/AlertDialog",
  component: Demo,
  args: { defaultOpen: false, destructive: true },
  parameters: {
    docs: {
      description: {
        component:
          "A dialog that must be answered: no backdrop dismiss, no close button. `AlertDialogAction` defaults to the solid destructive fill; pass another `variant` when the action is not destructive.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Open on load, for screenshots. */
export const Open: Story = { args: { defaultOpen: true }, tags: ["!autodocs"] };

export const NotDestructive: Story = {
  args: {
    defaultOpen: true,
    destructive: false,
    title: "Leave the organisation?",
    description: "You can rejoin from an invite link.",
    action: "Leave",
  },
  tags: ["!autodocs"],
};

export const LongText: Story = {
  args: {
    defaultOpen: true,
    title: "Delete this session and every fork, checkpoint and shared link that was made from it?",
    description:
      "Everyone in the organisation loses access to the transcript, the checkpoints and the shared links. Forks made from this session are deleted with it. Usage already recorded stays on the organisation's bill. This cannot be undone.",
    action: "Delete everything",
  },
  tags: ["!autodocs"],
};

/**
 * The parts, composed by hand: `AlertDialogPortal` and `AlertDialogOverlay`
 * are what `AlertDialogContent` renders for you.
 */
export const Parts: Story = {
  tags: ["!autodocs"],
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogPortal>
        <AlertDialogOverlay />
      </AlertDialogPortal>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard changes?</AlertDialogTitle>
          <AlertDialogDescription>
            Three files have edits that are not saved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep editing</AlertDialogCancel>
          <AlertDialogAction>Discard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

/**
 * `blur` frosts the page behind the scrim (the same `SCRIM_BLUR` as
 * `DialogContent blur`), and `dismissOnBackdrop` lets a click on the scrim
 * cancel, for a prompt where walking away is also an answer.
 */
export const BlurredDismissible: Story = {
  tags: ["!autodocs"],
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger render={<Button variant="outline" />}>Discard changes</AlertDialogTrigger>
      <AlertDialogContent blur dismissOnBackdrop>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard changes?</AlertDialogTitle>
          <AlertDialogDescription>
            Three files have edits that are not saved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep editing</AlertDialogCancel>
          <AlertDialogAction>Discard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvas }) => {
    const overlay = await waitFor(() => {
      const el = document.querySelector<HTMLElement>('[data-slot="alert-dialog-overlay"]');
      if (!el) throw new Error("not open yet");
      return el;
    });
    await expect(getComputedStyle(overlay).backdropFilter).toContain("blur");
    const layer = document.querySelector<HTMLElement>('[data-slot="alert-dialog-backdrop-close"]')!;
    await expect(layer).toHaveAttribute("aria-hidden", "true");
    await expect(layer).toHaveAttribute("tabindex", "-1");
    // A point on the scrim, well outside the dialog, lands on the close layer.
    const hit = document.elementFromPoint(8, 8);
    await expect(hit).toBe(layer);
    await userEvent.click(hit!);
    await waitFor(() =>
      expect(document.querySelector('[data-slot="alert-dialog-content"]')).toBeNull(),
    );
    // Open again, so the story ends showing the blurred scrim.
    await userEvent.click(canvas.getByRole("button", { name: "Discard changes" }));
    await waitFor(() =>
      expect(document.querySelector('[data-slot="alert-dialog-content"]')).not.toBeNull(),
    );
  },
};
