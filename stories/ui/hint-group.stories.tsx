import type { Meta, StoryObj } from "@storybook/react-vite";
import { Copy, GitBranch, RefreshCw, Share2, Trash2 } from "lucide-react";
import { HintGroup, HintItem } from "../../src/ui/hint-group.tsx";
import { IconButton } from "../../src/ui/icon-button.tsx";

const ACTIONS = [
  { icon: RefreshCw, label: "Refresh" },
  { icon: GitBranch, label: "Switch branch" },
  { icon: Copy, label: "Copy link" },
  { icon: Share2, label: "Share with team" },
  { icon: Trash2, label: "Delete" },
];

function Demo({
  side = "bottom",
  disabledLast = false,
}: {
  side?: "top" | "bottom";
  disabledLast?: boolean;
}) {
  return (
    <div className={side === "top" ? "flex min-h-32 items-end" : "flex min-h-32 items-start"}>
      <HintGroup side={side}>
        <div className="flex gap-1 rounded-md border border-border p-1">
          {ACTIONS.map((a, i) => (
            <HintItem key={a.label} label={a.label}>
              <IconButton
                icon={a.icon}
                label={a.label}
                disabled={disabledLast && i === ACTIONS.length - 1}
              />
            </HintItem>
          ))}
        </div>
      </HintGroup>
    </div>
  );
}

const meta = {
  title: "Primitives/HintGroup",
  component: Demo,
  args: { side: "bottom", disabledLast: false },
  argTypes: { side: { control: "inline-radio", options: ["top", "bottom"] } },
  parameters: {
    docs: {
      description: {
        component:
          "A row of icon controls sharing one tooltip that slides between them. Hover one control, then move along the row.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const OpensUpward: Story = { args: { side: "top" } };
export const WithDisabled: Story = { args: { disabledLast: true } };
