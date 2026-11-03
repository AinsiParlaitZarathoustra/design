import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, RefreshCw, Underline } from "lucide-react";
import { IconButton } from "../../src/ui/icon-button.tsx";
import {
  Hint,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../src/ui/tooltip.tsx";

interface DemoProps {
  open?: boolean;
  label?: string;
  shortcut?: string;
  side?: "top" | "bottom" | "left" | "right";
}

/** The composed form, controllable so a screenshot can hold it open. */
function Demo({ open, label = "Refresh", shortcut, side = "top" }: DemoProps) {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <Tooltip open={open}>
        <TooltipTrigger render={<IconButton icon={RefreshCw} label={label} variant="outline" />} />
        <TooltipContent side={side} sideOffset={4}>
          {label}
          {shortcut && <span className="ml-1.5 text-muted-foreground">{shortcut}</span>}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

const meta = {
  title: "Primitives/Tooltip",
  component: Demo,
  args: { label: "Refresh", shortcut: "⌘R", side: "top" },
  argTypes: { side: { control: "inline-radio", options: ["top", "bottom", "left", "right"] } },
  parameters: {
    docs: {
      description: {
        component:
          "A hint for an icon-only control. `Hint` is the one-liner; `Tooltip` / `TooltipTrigger` / `TooltipContent` the composed form. Timing (300ms open delay, a warm window that skips it) comes from `tooltip-timing.ts`.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover the button. */
export const Default: Story = {};

export const Open: Story = { args: { open: true }, tags: ["!autodocs"] };

export const OpenBelow: Story = { args: { open: true, side: "bottom" }, tags: ["!autodocs"] };

export const LongText: Story = {
  args: {
    open: true,
    shortcut: undefined,
    label:
      "Refresh the list of pull requests waiting for your review across every attached project",
  },
  tags: ["!autodocs"],
};

/** `Hint`: hover one, then slide along the row — the warm window skips the delay. */
export const HintRow: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-1">
        <Hint label="Bold" shortcut="⌘B">
          <IconButton icon={Bold} label="Bold" />
        </Hint>
        <Hint label="Italic" shortcut="⌘I">
          <IconButton icon={Italic} label="Italic" />
        </Hint>
        <Hint label="Underline" shortcut="⌘U">
          <IconButton icon={Underline} label="Underline" />
        </Hint>
      </div>
    </TooltipProvider>
  ),
};
