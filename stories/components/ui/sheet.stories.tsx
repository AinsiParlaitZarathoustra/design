import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../src/components/ui/sheet.tsx";
import { Button } from "../../../src/ui/button.tsx";
import { Input } from "../../../src/ui/input.tsx";

interface DemoProps {
  defaultOpen?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  title?: string;
  description?: string;
  showCloseButton?: boolean;
}

function Demo({
  defaultOpen = false,
  side = "right",
  title = "Session details",
  description = "The name, projects and access for this session.",
  showCloseButton = true,
}: DemoProps) {
  return (
    <Sheet defaultOpen={defaultOpen}>
      <SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger>
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-1.5 px-4">
          <span className="label">Name</span>
          <Input defaultValue="Refactor the settings panel" aria-label="Name" />
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const meta = {
  title: "Components/Sheet",
  component: Demo,
  args: { defaultOpen: false, side: "right", showCloseButton: true },
  argTypes: { side: { control: "inline-radio", options: ["top", "right", "bottom", "left"] } },
  parameters: {
    docs: {
      description: {
        component:
          "A panel that slides in from an edge, on the `z-drawer` layer over a soft scrim. For a task that needs the page behind it in view; a decision that blocks is a `Dialog`.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Open on load, for screenshots. */
export const Open: Story = { args: { defaultOpen: true }, tags: ["!autodocs"] };
export const Left: Story = { args: { defaultOpen: true, side: "left" }, tags: ["!autodocs"] };
export const Bottom: Story = { args: { defaultOpen: true, side: "bottom" }, tags: ["!autodocs"] };
export const LongText: Story = {
  args: {
    defaultOpen: true,
    title: "Allow this agent to read every project attached to the session?",
    description:
      "Access is read-only. The agent asks again before it writes anything, and you can revoke access from the session's project list at any time. Projects added later inherit this choice until you change it.",
  },
  tags: ["!autodocs"],
};
