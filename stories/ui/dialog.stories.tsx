import type { Meta, StoryObj } from "@storybook/react-vite";
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
