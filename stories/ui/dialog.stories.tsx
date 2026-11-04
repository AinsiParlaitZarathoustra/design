import type { Meta, StoryObj } from "@storybook/react-vite";
import { Image as ImageIcon, X } from "lucide-react";
import { expect, screen, waitFor } from "storybook/test";
import { Button } from "../../src/ui/button.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/ui/dialog.tsx";
import { Icon } from "../../src/ui/icon.tsx";
import { IconButton } from "../../src/ui/icon-button.tsx";
import { Input } from "../../src/ui/input.tsx";
import { Kbd } from "../../src/ui/kbd.tsx";

interface DemoProps {
  defaultOpen?: boolean;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  destructive?: boolean;
}

function Demo({
  defaultOpen = false,
  title = "Rename session",
  description = "The name shows in the sidebar and in shared links.",
  showCloseButton = true,
  destructive = false,
}: DemoProps) {
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
      <DialogContent showCloseButton={showCloseButton}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {!destructive && <Input defaultValue="Refactor the settings panel" aria-label="Name" />}
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button variant={destructive ? "destructive" : "default"} />}>
            {destructive ? "Delete" : "Save"}
            {!destructive && <Kbd variant="inverse">↵</Kbd>}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const meta = {
  title: "Primitives/Dialog",
  component: Demo,
  args: { defaultOpen: false, showCloseButton: true, destructive: false },
  parameters: {
    docs: {
      description: {
        component:
          "A centred modal: `rounded-xl`, `shadow-lg`, the `scrim` on `z-overlay` and the panel on `z-modal`. Compose `DialogContent` with `DialogHeader`, `DialogTitle`, `DialogDescription` and `DialogFooter`.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Open on load, for screenshots. */
export const Open: Story = { args: { defaultOpen: true }, tags: ["!autodocs"] };

export const Destructive: Story = {
  args: {
    defaultOpen: true,
    destructive: true,
    title: "Delete this session?",
    description: "Its transcript and checkpoints go with it. This cannot be undone.",
  },
  tags: ["!autodocs"],
};

export const WithoutCloseButton: Story = {
  args: { defaultOpen: true, showCloseButton: false },
  tags: ["!autodocs"],
};

export const LongText: Story = {
  args: {
    defaultOpen: true,
    title:
      "Allow this agent to read every project attached to the session, including the ones added later?",
    description:
      "Access is read-only. The agent asks again before it writes anything, and you can revoke access from the session's project list at any time. Projects added later inherit this choice until you change it.",
  },
  tags: ["!autodocs"],
};

/** `variant="media"`: the full-bleed viewer desktop opens from an image tile.
 *  Centred by `inset-0 m-auto`, so the scale-in (or a caller's grow-from-tile)
 *  owns the transform; no padding; the page background, not the card. */
export const Media: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger render={<Button variant="outline" />}>Open image</DialogTrigger>
      <DialogContent variant="media" showCloseButton={false} aria-describedby={undefined}>
        <div className="flex h-control-lg shrink-0 items-center gap-2 border-b border-border px-3">
          <DialogTitle className="min-w-0 flex-1 truncate">Image 1 of 3</DialogTitle>
          <DialogClose render={<IconButton icon={X} label="Close" size="sm" />} />
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center bg-muted text-muted-foreground">
          <Icon icon={ImageIcon} size="xl" />
        </div>
      </DialogContent>
    </Dialog>
  ),
  tags: ["!autodocs"],
  play: async () => {
    const popup = await screen.findByRole("dialog");
    await waitFor(() => expect(popup.getAnimations()).toHaveLength(0));
    const style = getComputedStyle(popup);
    // Centred by margins: neither `translate` nor `transform` is in use at rest.
    await expect(style.translate).toBe("none");
    await expect(style.transform).toBe("none");
    await expect(style.paddingTop).toBe("0px");
    const box = popup.getBoundingClientRect();
    const left = box.left;
    const right = window.innerWidth - box.right;
    await expect(Math.abs(left - right)).toBeLessThanOrEqual(1);
    await expect(popup).toHaveAttribute("data-variant", "media");
  },
};
