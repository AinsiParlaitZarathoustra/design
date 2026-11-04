import type { Meta, StoryObj } from "@storybook/react-vite";
import { Archive, Copy, MoreHorizontal, Pencil, Pin, Trash2 } from "lucide-react";
import { IconButton } from "../../src/ui/icon-button.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../src/ui/dropdown-menu.tsx";
import { expectPopupExit } from "../lib/popup-exit.ts";

interface DemoProps {
  defaultOpen?: boolean;
  disabledItem?: boolean;
  longLabel?: boolean;
}

function Demo({ defaultOpen, disabledItem, longLabel }: DemoProps) {
  return (
    <div className="min-h-80">
      <DropdownMenu defaultOpen={defaultOpen}>
        <DropdownMenuTrigger
          render={<IconButton icon={MoreHorizontal} label="Session actions" />}
        />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Session</DropdownMenuLabel>
            <DropdownMenuItem>
              <Pencil />
              {longLabel ? "Rename this session and every fork made from it" : "Rename"}
              <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy />
              Copy link
              <DropdownMenuShortcut>⌘⇧C</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled={disabledItem}>
              <Pin />
              Pin
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem defaultChecked>Show tool calls</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Show thinking</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuRadioGroup defaultValue="recent">
              <DropdownMenuRadioItem value="recent">Most recent</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Archive />
              Move to
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>atlas</DropdownMenuItem>
              <DropdownMenuItem>design</DropdownMenuItem>
              <DropdownMenuItem>server</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem variant="destructive">
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const meta = {
  title: "Primitives/DropdownMenu",
  component: Demo,
  args: { defaultOpen: false, disabledItem: false, longLabel: false },
  parameters: {
    docs: {
      description: {
        component:
          "A list of commands anchored to a trigger (Base UI's `Menu`). Items, checkbox and radio items, labels, separators, shortcuts and submenus.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true }, tags: ["!autodocs"] };
export const DisabledItem: Story = {
  args: { defaultOpen: true, disabledItem: true },
  tags: ["!autodocs"],
};
export const LongText: Story = {
  args: { defaultOpen: true, longLabel: true },
  tags: ["!autodocs"],
};
/** Closing plays the entrance backwards (`scale-out`, 120ms) into the
 *  trigger, then unmounts. Under reduced motion it only fades. */
export const Exit: Story = {
  args: { defaultOpen: true },
  tags: ["!autodocs"],
  play: () => expectPopupExit("dropdown-menu-content"),
};
