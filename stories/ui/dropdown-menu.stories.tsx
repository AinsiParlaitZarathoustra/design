import type { Meta, StoryObj } from "@storybook/react-vite";
import { Archive, Copy, MoreHorizontal, Pencil, Pin, Trash2 } from "lucide-react";
import { useState } from "react";
import { expect, screen } from "storybook/test";
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
  menuContentVariants,
  menuItemVariants,
  menuLabelVariants,
  menuShortcutVariants,
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
/** Where a label starts, from the popup's edge. */
function labelStart(row: Element, label: string): number {
  const walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.textContent?.trim() !== label) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    return range.getBoundingClientRect().left - row.getBoundingClientRect().left;
  }
  throw new Error(`no label ${label}`);
}

/**
 * An icon row's label starts where a checkbox or radio row's does: the
 * leading glyph and its gap take the same room as the check's column.
 */
export const IconRowsAlign: Story = {
  args: { defaultOpen: true },
  tags: ["!autodocs"],
  play: async () => {
    const rename = await screen.findByRole("menuitem", { name: /Rename/ });
    const toolCalls = screen.getByRole("menuitemcheckbox", { name: "Show tool calls" });
    const recent = screen.getByRole("menuitemradio", { name: "Most recent" });
    const iconRow = labelStart(rename, "Rename");
    await expect(Math.abs(iconRow - labelStart(toolCalls, "Show tool calls"))).toBeLessThan(0.5);
    await expect(Math.abs(iconRow - labelStart(recent, "Most recent"))).toBeLessThan(0.5);
  },
};

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

const SLASH = [
  { label: "Heading", kbd: "#" },
  { label: "Bullet list", kbd: "-" },
  { label: "Code block", kbd: "```" },
];

/** A list that never takes focus: the field keeps it, ↑↓ move `data-active`. */
function SlashList() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex w-[280px] flex-col gap-1">
      <input
        aria-label="Note"
        aria-controls="slash-list"
        aria-activedescendant={`slash-${active}`}
        defaultValue="/"
        className="rounded border border-border bg-transparent px-2 py-1 text-xs"
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") setActive((i) => (i + 1) % SLASH.length);
          if (e.key === "ArrowUp") setActive((i) => (i - 1 + SLASH.length) % SLASH.length);
        }}
      />
      <div
        id="slash-list"
        role="listbox"
        aria-label="Blocks"
        className={menuContentVariants({ motion: false })}
      >
        <div role="group" aria-labelledby="slash-basic">
          <div id="slash-basic" className={menuLabelVariants()}>
            Basic
          </div>
          {SLASH.map((item, i) => (
            <div
              key={item.label}
              id={`slash-${i}`}
              role="option"
              aria-selected={i === active}
              data-active={i === active ? "" : undefined}
              className={menuItemVariants({ highlight: "active" })}
            >
              {item.label}
              <span
                className={menuShortcutVariants({ highlight: "active", className: "font-mono" })}
              >
                {item.kbd}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The class recipes on a list Base UI does not drive: an editor's slash menu,
 * which must leave focus in the editor. `highlight: "active"` styles the row
 * the caller marks `data-active`; `motion: false` opens it at once.
 */
export const Recipes: Story = {
  tags: ["!autodocs"],
  render: () => <SlashList />,
  play: async ({ canvas, userEvent }) => {
    const field = canvas.getByRole("textbox", { name: "Note" });
    await userEvent.click(field);
    await userEvent.keyboard("{ArrowDown}");
    const row = canvas.getByRole("option", { name: /Bullet list/ });
    await expect(row).toHaveAttribute("data-active");
    await expect(field).toHaveFocus();
    const idle = canvas.getByRole("option", { name: /Heading/ });
    await expect(getComputedStyle(row).backgroundColor).not.toBe(
      getComputedStyle(idle).backgroundColor,
    );
    await expect(canvas.getByRole("listbox").className).not.toContain("animate-scale-in");
  },
};
