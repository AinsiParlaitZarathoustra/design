import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileText, MessageSquare, Plus, Settings } from "lucide-react";
import {
  CommandDialog,
  CommandDialogPopup,
  CommandEmpty,
  CommandFooter,
  CommandFooterHint,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandItemIcon,
  CommandPanel,
  CommandShortcut,
  CommandSubmenuChevron,
} from "../../src/ui/command.tsx";
import { Button } from "../../src/ui/button.tsx";
import { DialogTrigger } from "../../src/ui/dialog.tsx";
import { Icon } from "../../src/ui/icon.tsx";
import { Kbd } from "../../src/ui/kbd.tsx";

const ROWS = [
  { icon: Plus, label: "New session", shortcut: "⌘N" },
  { icon: MessageSquare, label: "Open session…", submenu: true },
  { icon: FileText, label: "Open file…", shortcut: "⌘P" },
  { icon: Settings, label: "Settings", shortcut: "⌘,", disabled: false },
];

interface DemoProps {
  defaultOpen?: boolean;
  query?: string;
  active?: number;
  empty?: boolean;
  disabledRow?: boolean;
}

function Demo({ defaultOpen, query = "", active = 0, empty, disabledRow }: DemoProps) {
  return (
    <CommandDialog defaultOpen={defaultOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        Open palette <Kbd>⌘K</Kbd>
      </DialogTrigger>
      <CommandDialogPopup title="Command palette">
        <CommandInput
          placeholder="Type a command or search…"
          defaultValue={query}
          aria-label="Command"
          aria-controls="command-demo-list"
        />
        <CommandPanel id="command-demo-list" aria-label="Commands">
          {empty ? (
            <CommandEmpty>No results for “{query}”</CommandEmpty>
          ) : (
            <>
              <CommandGroupLabel>Actions</CommandGroupLabel>
              {ROWS.map((row, i) => (
                <CommandItem
                  key={row.label}
                  active={i === active}
                  disabled={disabledRow && i === ROWS.length - 1}
                >
                  <CommandItemIcon>
                    <Icon icon={row.icon} size="lg" />
                  </CommandItemIcon>
                  {row.label}
                  {row.shortcut && <CommandShortcut>{row.shortcut}</CommandShortcut>}
                  {row.submenu && <CommandSubmenuChevron />}
                </CommandItem>
              ))}
            </>
          )}
        </CommandPanel>
        <CommandFooter>
          <CommandFooterHint>
            <Kbd variant="soft">↑</Kbd>
            <Kbd variant="soft">↓</Kbd>
            Navigate
          </CommandFooterHint>
          <span className="flex items-center gap-4">
            <CommandFooterHint>
              <Kbd variant="soft">↵</Kbd>
              Select
            </CommandFooterHint>
            <CommandFooterHint>
              <Kbd variant="soft">Esc</Kbd>
              Close
            </CommandFooterHint>
          </span>
        </CommandFooter>
      </CommandDialogPopup>
    </CommandDialog>
  );
}

const meta = {
  title: "Primitives/Command",
  component: Demo,
  args: { defaultOpen: false, query: "", active: 0, empty: false, disabledRow: false },
  argTypes: { active: { control: { type: "number", min: 0, max: 3 } } },
  parameters: {
    docs: {
      description: {
        component:
          "The command shell ⌘K, ⌘P and the new-tab palette open. No open animation on purpose: it opens hundreds of times a day. The caller owns the keyboard model and passes `active` to the highlighted row.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true }, tags: ["!autodocs"] };
export const Empty: Story = {
  args: { defaultOpen: true, empty: true, query: "deploy to prod" },
  tags: ["!autodocs"],
};
export const DisabledRow: Story = {
  args: { defaultOpen: true, disabledRow: true },
  tags: ["!autodocs"],
};
