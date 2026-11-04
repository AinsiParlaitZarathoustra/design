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
import { expect, fireEvent, fn, userEvent, within } from "storybook/test";
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
  /** Turn off every D24 behaviour, as an app keeping its old ones would. */
  optOut?: boolean;
  /** Reorder by dragging, driven from here through `tabProps`. */
  reorder?: boolean;
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
  optOut = false,
  reorder = false,
  onSelect,
  onClose,
}: DemoProps) {
  const [tabs, setTabs] = useState(items);
  const [dragged, setDragged] = useState<string | null>(null);
  // The order is the app's: a drop moves the dragged tab to the target's place.
  const move = (from: string, to: string) => {
    const next = tabs.filter((t) => t.id !== from);
    const at = next.findIndex((t) => t.id === to);
    const tab = tabs.find((t) => t.id === from);
    if (!tab || at < 0) return;
    next.splice(
      tabs.findIndex((t) => t.id === from) < tabs.findIndex((t) => t.id === to) ? at + 1 : at,
      0,
      tab,
    );
    setTabs(next);
  };
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
        {...(optOut
          ? {
              rovingFocus: false,
              closeOnMiddleClick: false,
              closeOnDelete: false,
              closeLabel: () => "Close tab",
            }
          : {})}
        tabProps={
          reorder
            ? // The browser's own drag and drop here; desktop passes dnd-kit's
              // `useSortable` results the same way.
              (item) => ({
                draggable: true,
                dragging: dragged === item.id,
                onDragStart: (e) => {
                  setDragged(item.id);
                  e.dataTransfer?.setData("text/plain", item.id);
                },
                onDragOver: (e) => e.preventDefault(),
                onDrop: (e) => {
                  e.preventDefault();
                  if (dragged && dragged !== item.id) move(dragged, item.id);
                  setDragged(null);
                },
                onDragEnd: () => setDragged(null),
              })
            : undefined
        }
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

/**
 * Every D24 behaviour turned off, one prop each: `rovingFocus={false}`
 * (every tab its own tab stop, no arrow keys), `closeOnMiddleClick={false}`,
 * `closeOnDelete={false}`, and `closeLabel` naming the × "Close tab". What
 * desktop drew before the strip.
 */
export const BehaviourOptOuts: Story = {
  args: { optOut: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole("tab");
    await expect(tabs.every((t) => t.tabIndex === 0)).toBe(true);
    tabs[0]!.focus();
    await userEvent.keyboard("{ArrowRight}{Delete}");
    await expect(tabs[0]).toHaveFocus();
    await expect(args.onClose).not.toHaveBeenCalled();
    // Queried by attribute: a × is display:none until its tab is hovered or
    // focused, and a hidden element has no computed name.
    await expect(canvasElement.querySelectorAll('button[aria-label="Close tab"]')).toHaveLength(
      TABS.length,
    );
    // Back to rest before axe runs: a keyboard-focused tab shows its ×, a
    // button inside the tab, which axe reports as nested-interactive. That is
    // the strip's, with or without these props (reported separately).
    tabs[0]!.blur();
  },
};

/**
 * Drag to reorder, driven by the host through `tabProps`: the ref, the drag
 * handlers, the transform and `dragging` go on each tab. This story uses the
 * browser's drag and drop; the order lives in the story, as in an app.
 */
export const DragToReorder: Story = {
  args: { reorder: true, plus: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("tab", { name: "app-frame.tsx" });
    const third = canvas.getByRole("tab", { name: "Changes" });
    await fireEvent.dragStart(first);
    await expect(first).toHaveAttribute("data-dragging", "true");
    await fireEvent.dragOver(third);
    await fireEvent.drop(third);
    await expect(canvas.getAllByRole("tab").map((t) => t.dataset.tabId)).toEqual([
      "readme",
      "diff",
      "app",
      "term",
      "docs",
    ]);
  },
};
export const Light: Story = {
  args: { items: [HOME, ...TABS] },
  globals: { appearance: "light" },
};
