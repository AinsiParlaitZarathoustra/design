import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FileCodeIcon,
  FileTextIcon,
  GitCompareIcon,
  GlobeIcon,
  HomeIcon,
  PlusIcon,
  TerminalIcon,
} from "lucide-react";
import { useState } from "react";
import { fn } from "storybook/test";
import { TabStrip } from "../../../src/components/layout/tab-strip.tsx";
import type { TabStripItem } from "../../../src/components/layout/tab-strip.tsx";
import { cn } from "../../../src/lib/utils.ts";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../../src/ui/context-menu.tsx";
import { Icon } from "../../../src/ui/icon.tsx";
import { IconButton } from "../../../src/ui/icon-button.tsx";

const glyph = (icon: typeof FileCodeIcon) => <Icon icon={icon} size="md" />;

const TABS: TabStripItem[] = [
  { id: "app", title: "app-frame.tsx", icon: glyph(FileCodeIcon), closable: true },
  { id: "readme", title: "README.md", icon: glyph(FileTextIcon), closable: true, dirty: true },
  { id: "diff", title: "Changes", icon: glyph(GitCompareIcon), closable: true },
  { id: "term", title: "bun run test", icon: glyph(TerminalIcon), closable: true, busy: true },
  { id: "docs", title: "Base UI · Tabs", icon: glyph(GlobeIcon), closable: true },
];

const HOME: TabStripItem = { id: "home", title: "Home", icon: glyph(HomeIcon), pinned: true };

const LONG: TabStripItem = {
  id: "long",
  title: "a-file-name-long-enough-to-truncate-in-the-strip.test.tsx",
  icon: glyph(FileCodeIcon),
  closable: true,
};

const MANY: TabStripItem[] = Array.from({ length: 16 }, (_, i) => ({
  ...TABS[i % TABS.length]!,
  id: `tab-${i}`,
  busy: false,
}));

interface DemoProps {
  items?: TabStripItem[];
  initialActive?: string | null;
  focused?: boolean;
  width?: "full" | "narrow";
  plus?: boolean;
  menu?: boolean;
  onSelect?: (id: string) => void;
  onClose?: (id: string) => void;
}

/** The app's state: the strip draws what it is given and reports the rest. */
function Demo({
  items = TABS,
  initialActive,
  focused = true,
  width = "full",
  plus = true,
  menu = false,
  onSelect,
  onClose,
}: DemoProps) {
  const [tabs, setTabs] = useState(items);
  const [active, setActive] = useState<string | null>(
    initialActive === undefined ? (items[0]?.id ?? null) : initialActive,
  );
  const close = (id: string) => {
    onClose?.(id);
    const i = tabs.findIndex((t) => t.id === id);
    const next = tabs.filter((t) => t.id !== id);
    setTabs(next);
    if (id === active) setActive(next[Math.min(i, next.length - 1)]?.id ?? null);
  };
  const add = () => {
    const id = `new-${tabs.length}-${Date.now()}`;
    setTabs([...tabs, { id, title: "Untitled", icon: glyph(FileTextIcon), closable: true }]);
    setActive(id);
  };

  return (
    <div
      className={cn(
        "flex h-9 items-center rounded-md border border-border bg-background px-1.5",
        width === "narrow" ? "w-80" : "w-full max-w-3xl",
      )}
    >
      <TabStrip
        aria-label="Open files"
        items={tabs}
        activeId={active}
        focused={focused}
        onSelect={(id) => {
          onSelect?.(id);
          setActive(id);
        }}
        onClose={close}
        trailing={
          plus ? <IconButton icon={PlusIcon} label="New tab" size="xs" onClick={add} /> : undefined
        }
        renderTab={
          menu
            ? (item, tab) => (
                <ContextMenu>
                  <ContextMenuTrigger render={tab} />
                  <ContextMenuContent className="min-w-44">
                    <ContextMenuItem disabled={!item.closable} onClick={() => close(item.id)}>
                      Close
                    </ContextMenuItem>
                    <ContextMenuItem
                      onClick={() => {
                        setTabs(tabs.filter((t) => t.id === item.id || !t.closable));
                        setActive(item.id);
                      }}
                    >
                      Close others
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              )
            : undefined
        }
        className="flex-1"
      />
    </div>
  );
}

const meta = {
  title: "Layout/TabStrip",
  component: Demo,
  args: { focused: true, width: "full", plus: true, menu: false, onSelect: fn(), onClose: fn() },
  argTypes: {
    items: { control: false },
    width: { control: "inline-radio", options: ["full", "narrow"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Document tabs as desktop's pane headers draw them: small chips, the active one lit (a step quieter when its pane is not `focused`). Controlled: `items`, `activeId`, `onSelect`, `onClose`. Hover or keyboard focus turns a closable tab's icon into its ×; middle-click and Delete close too. Left/Right/Home/End move focus, Enter or Space opens; focus alone never opens. `dirty` italicises the title, `busy` swaps the icon for a spinner, `pinned` is icon-only with a tooltip and never closes. Only the tabs scroll: edges fade, arrows appear and the wheel scrolls sideways, while `leading` and `trailing` stay put. `renderTab` wraps a tab for a context menu or a drag handle.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Every state at once: pinned, dirty (italic), busy (spinner), a title that truncates. */
export const States: Story = { args: { items: [HOME, ...TABS, LONG] } };
/** The pane beside the focused one: its active tab is a step quieter. */
export const Unfocused: Story = { args: { focused: false } };
/** No tab open: the active id matches nothing, so the first tab is the tab stop. */
export const NoneActive: Story = { args: { initialActive: null } };
/** More tabs than fit: the edges fade, the arrows appear, the wheel scrolls sideways. */
export const Overflow: Story = { args: { items: MANY, initialActive: "tab-12", width: "narrow" } };
/** Right-click a tab: `renderTab` wraps it in a context menu. */
export const ContextMenuOnTabs: Story = { args: { menu: true } };
export const Empty: Story = { args: { items: [] } };
export const Light: Story = {
  args: { items: [HOME, ...TABS] },
  globals: { appearance: "light" },
};
