import type { Meta, StoryObj } from "@storybook/react-vite";
import { Copy, FilePlus, Pencil, Trash2 } from "lucide-react";
import { fireEvent, within } from "storybook/test";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  ContextMenuGroup,
} from "../../src/ui/context-menu.tsx";

function Demo({ disabledItem = false }: { disabledItem?: boolean }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        data-testid="area"
        className="caption flex h-56 w-96 items-center justify-center rounded-md border border-dashed border-border-strong"
      >
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>src/ui/button.tsx</ContextMenuLabel>
          <ContextMenuItem>
            <FilePlus />
            New file
          </ContextMenuItem>
          <ContextMenuItem>
            <Pencil />
            Rename
            <ContextMenuShortcut>F2</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled={disabledItem}>
            <Copy />
            Copy path
            <ContextMenuShortcut>⌥⌘C</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Show hidden files</ContextMenuCheckboxItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Open with</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Editor</ContextMenuItem>
            <ContextMenuItem>Terminal</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

/** Opens the menu at the centre of the area, as a right-click would. */
const rightClick: Story["play"] = async ({ canvasElement }) => {
  const area = within(canvasElement).getByTestId("area");
  const box = area.getBoundingClientRect();
  fireEvent.contextMenu(area, {
    clientX: box.left + box.width / 2,
    clientY: box.top + box.height / 2,
    button: 2,
  });
};

const meta = {
  title: "Primitives/ContextMenu",
  component: Demo,
  args: { disabledItem: false },
  parameters: {
    docs: {
      description: {
        component:
          "The dropdown menu's list, opened by right-click at the pointer. Same surface: `rounded-lg`, `shadow-md`, `z-popover`.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { play: rightClick, tags: ["!autodocs"] };
export const DisabledItem: Story = {
  args: { disabledItem: true },
  play: rightClick,
  tags: ["!autodocs"],
};
