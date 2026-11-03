import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../src/components/ui/collapsible.tsx";
import { Icon } from "../../../src/ui/icon.tsx";

interface DemoProps {
  defaultOpen?: boolean;
  disabled?: boolean;
  count?: number;
}

function Demo({ defaultOpen = false, disabled = false, count = 3 }: DemoProps) {
  return (
    <Collapsible defaultOpen={defaultOpen} disabled={disabled} className="w-72">
      <CollapsibleTrigger className="group label flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-secondary-foreground hover:bg-element-hover hover:text-foreground data-disabled:opacity-50">
        <Icon
          icon={ChevronRight}
          size="sm"
          className="transition-transform duration-fast ease-out-strong group-data-panel-open:rotate-90"
        />
        Earlier tool calls
        <span className="caption ml-auto">{count}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="flex flex-col gap-0.5 py-1 pl-6">
          {Array.from({ length: count }, (_, i) => (
            <li key={i} className="caption">
              read_file src/ui/button.tsx ({i + 1})
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

const meta = {
  title: "Components/Collapsible",
  component: Demo,
  args: { defaultOpen: false, disabled: false, count: 3 },
  parameters: {
    docs: {
      description: {
        component:
          "Base UI's `Collapsible`, unstyled: the trigger and panel take whatever the call site gives them. The story shows the usual disclosure row.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
export const Disabled: Story = { args: { disabled: true } };
export const ManyItems: Story = { args: { defaultOpen: true, count: 12 } };
