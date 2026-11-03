import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../src/ui/button.tsx";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../src/ui/popover.tsx";
import { Switch } from "../../src/ui/switch.tsx";

interface DemoProps {
  defaultOpen?: boolean;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  arrow?: boolean;
  surface?: "default" | "tinted";
  body?: string;
}

function Demo({ defaultOpen, side, align, arrow, surface, body }: DemoProps) {
  return (
    <div className="flex min-h-64 items-start justify-center pt-4">
      <Popover defaultOpen={defaultOpen}>
        <PopoverTrigger render={<Button variant="outline" />}>Notifications</PopoverTrigger>
        <PopoverContent side={side} align={align} arrow={arrow} surface={surface}>
          <PopoverHeader>
            <PopoverTitle>Notifications</PopoverTitle>
            <PopoverDescription>{body}</PopoverDescription>
          </PopoverHeader>
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="label">Desktop alerts</span>
            <Switch checked onCheckedChange={() => {}} aria-label="Desktop alerts" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const meta = {
  title: "Primitives/Popover",
  component: Demo,
  args: {
    defaultOpen: false,
    side: "bottom",
    align: "center",
    arrow: false,
    surface: "default",
    body: "Choose when Atlas tells you a run needs you.",
  },
  argTypes: {
    side: { control: "inline-radio", options: ["top", "bottom", "left", "right"] },
    align: { control: "inline-radio", options: ["start", "center", "end"] },
    surface: { control: "inline-radio", options: ["default", "tinted"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Anchored content that is not a list of commands. `rounded-lg`, `shadow-md`, `z-popover` on the Positioner.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true }, tags: ["!autodocs"] };
export const WithArrow: Story = { args: { defaultOpen: true, arrow: true }, tags: ["!autodocs"] };
export const Tinted: Story = {
  args: { defaultOpen: true, surface: "tinted" },
  tags: ["!autodocs"],
};
export const LongText: Story = {
  args: {
    defaultOpen: true,
    body: "Atlas tells you when a run is waiting for approval, when a long build finishes, when a teammate mentions you in a shared session, and when a scheduled task fails. Each of these can be turned off on its own in Settings.",
  },
  tags: ["!autodocs"],
};
