import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Brain,
  BrainCircuit,
  Code,
  FileText,
  Folder,
  Gauge,
  Globe,
  Map as MapIcon,
  MessageSquare,
  Network,
  Palette,
  Plus,
  ScrollText,
  Settings,
  Terminal,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { fn, userEvent, within } from "storybook/test";

import {
  type CommandPaletteGroup,
  type CommandPaletteItem,
  filterCommandGroups,
  optionId,
  selectableIds,
  useListHighlight,
} from "../../../src/components/patterns/command-list.ts";
import {
  CommandHints,
  CommandList,
  CommandPalette,
  CommandPaletteView,
  CommandRow,
} from "../../../src/components/patterns/command-palette.tsx";
import { CommandPanel } from "../../../src/ui/command.tsx";
import { Button } from "../../../src/ui/button.tsx";
import { Icon } from "../../../src/ui/icon.tsx";
import { Kbd } from "../../../src/ui/kbd.tsx";

const icon = (glyph: typeof Plus) => <Icon icon={glyph} size="lg" />;
const run = fn().mockName("onSelect");

const THEMES = ["Atlas", "Dracula", "Nord", "Solarized", "Gruvbox", "One Dark"];
const PROJECTS = ["atlas", "design", "server", "docs"];

const ACTIONS: CommandPaletteGroup[] = [
  {
    id: "actions",
    label: "Actions",
    items: [
      { id: "new", label: "New session", icon: icon(Plus), shortcut: "⌘N", onSelect: run },
      { id: "file", label: "Go to file", icon: icon(FileText), shortcut: "⌘P", onSelect: run },
      {
        id: "theme",
        label: "Change theme…",
        icon: icon(Palette),
        groups: [
          {
            id: "themes",
            label: "Themes",
            items: THEMES.map((t) => ({ id: `theme-${t}`, label: t, onSelect: run })),
          },
        ],
        placeholder: "Search themes…",
      },
      {
        id: "project",
        label: "Switch project…",
        icon: icon(Folder),
        groups: [
          {
            id: "projects",
            label: "Projects",
            items: PROJECTS.map((p) => ({
              id: `project-${p}`,
              label: p,
              icon: icon(Folder),
              groups: [
                {
                  id: `${p}-actions`,
                  items: [
                    { id: `${p}-open`, label: "Open", onSelect: run },
                    { id: `${p}-reveal`, label: "Reveal in Finder", onSelect: run },
                  ],
                },
              ],
            })),
          },
        ],
      },
      { id: "settings", label: "Settings", icon: icon(Settings), shortcut: "⌘,", onSelect: run },
    ],
  },
  {
    id: "layout",
    label: "Layout",
    items: [
      { id: "split-right", label: "Split right", keywords: ["pane"], onSelect: run },
      { id: "split-down", label: "Split down", keywords: ["pane"], onSelect: run },
      { id: "split-close", label: "Close split", keywords: ["pane"], onSelect: run },
      { id: "split-focus", label: "Focus next split", keywords: ["pane"], onSelect: run },
    ],
  },
];

const RECENT: CommandPaletteGroup = {
  id: "recent",
  label: "Recent Sessions",
  hideWhenSearching: true,
  items: [
    { id: "s1", label: "Refactor the settings panel", timestamp: "2h ago" },
    { id: "s2", label: "Fix the flaky terminal test", timestamp: "1d ago" },
    { id: "s3", label: "Port the session timeline", timestamp: "3d ago" },
  ].map((s) => ({ ...s, icon: icon(MessageSquare), description: "atlas", onSelect: run })),
};

const DISABLED: CommandPaletteGroup[] = [
  {
    id: "actions",
    label: "Actions",
    items: [
      { id: "new", label: "New session", icon: icon(Plus), onSelect: run },
      { id: "push", label: "Push branch", disabled: true, onSelect: run },
      { id: "pr", label: "Open pull request", disabled: true, onSelect: run },
      { id: "settings", label: "Settings", icon: icon(Settings), onSelect: run },
    ],
  },
];

const LONG = "Approve every pending tool call in this session and continue without asking";

const MANY: CommandPaletteGroup[] = Array.from({ length: 10 }, (_, g) => ({
  id: `g${g}`,
  label: `Group ${g + 1}`,
  items: Array.from({ length: 30 }, (_, i) => ({
    id: `g${g}-i${i}`,
    label: `Command ${g * 30 + i + 1}`,
    onSelect: run,
  })),
}));

/** Desktop's new-tab palette (⌘⌥N): its modules, no groups. */
const MODULES: CommandPaletteGroup[] = [
  {
    id: "modules",
    items: [
      ["chat", "New Session", MessageSquare],
      ["canvas", "Spaces", MapIcon],
      ["terminal", "New Terminal", Terminal],
      ["knowledge", "Knowledge", Brain],
      ["knowledge-graph", "Knowledge Graph", Network],
      ["memory", "Memory", BrainCircuit],
      ["browser", "Browser", Globe],
      ["editor", "Untitled Editor", Code],
      ["log", "Log", ScrollText],
      ["usage", "Usage", Gauge],
    ].map(([type, label, glyph]) => ({
      id: type as string,
      label: label as string,
      keywords: [type as string],
      icon: icon(glyph as typeof Plus),
      onSelect: run,
    })),
  },
];

interface DemoProps {
  groups: CommandPaletteGroup[];
  defaultOpen?: boolean;
  title?: string;
  placeholder?: string;
  actionLabel?: string;
  loading?: boolean;
  emptyMessage?: ReactNode;
  opener?: string;
}

/** An opener button and the palette; the button is where focus returns. */
function Demo({ defaultOpen = true, opener = "Open palette", ...props }: DemoProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex min-h-svh items-start justify-center p-8">
      <Button variant="outline" onClick={() => setOpen(true)}>
        {opener} <Kbd>⌘K</Kbd>
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen} {...props} />
    </div>
  );
}

const field = () => within(document.body).findByRole("combobox");
const typeInto =
  (text: string): Story["play"] =>
  async () => {
    await userEvent.type(await field(), text);
  };

const meta = {
  title: "Patterns/CommandPalette",
  component: Demo,
  args: { groups: ACTIONS },
  argTypes: { groups: { control: false } },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "⌘K on the `Command` shell. Rows are data (`CommandPaletteGroup[]`); a row with `groups` is a submenu. The field keeps focus: ↑/↓ step the highlight (wrapping, skipping disabled rows), Enter runs it, Backspace on an empty field or Escape goes back out of a submenu. `CommandPaletteView` is the same without the dialog, and `CommandList` is just the rows, for a picker inside an editor. No open or close animation: it opens hundreds of times a day.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultOpen: false } };

/** Type "split", step down twice (wrapping), and the third match is lit. */
export const Filtered: Story = {
  tags: ["!autodocs"],
  play: async () => {
    await userEvent.type(await field(), "split");
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
  },
};

/** A "Recent Sessions" group that drops out once a query is typed. */
export const WithRecent: Story = { args: { groups: [...ACTIONS, RECENT] }, tags: ["!autodocs"] };

/** "Change theme…" and "Switch project…" drill in; a project drills in again. */
export const NestedPages: Story = {
  tags: ["!autodocs"],
  play: async () => {
    await userEvent.type(await field(), "switch");
    await userEvent.keyboard("{Enter}");
  },
};

export const DisabledItems: Story = { args: { groups: DISABLED }, tags: ["!autodocs"] };
export const Loading: Story = { args: { groups: [], loading: true }, tags: ["!autodocs"] };
export const LoadingWithResults: Story = { args: { loading: true }, tags: ["!autodocs"] };
export const NoItems: Story = { args: { groups: [] }, tags: ["!autodocs"] };
export const NoMatches: Story = { play: typeInto("kubernetes"), tags: ["!autodocs"] };
export const LongLabels: Story = {
  args: {
    groups: [
      {
        id: "long",
        label: "Actions",
        items: [
          { id: "l1", label: LONG, icon: icon(Plus), shortcut: "⌘⇧↵" },
          { id: "l2", label: LONG, description: LONG, icon: icon(MessageSquare), timestamp: "2h" },
        ],
      },
      ...ACTIONS,
    ],
  },
  tags: ["!autodocs"],
};
export const ManyItems: Story = { args: { groups: MANY }, tags: ["!autodocs"] };

/** Desktop's new-tab palette: the same pattern with a title and a placeholder. */
export const NewTab: Story = {
  args: {
    groups: MODULES,
    title: "Open module",
    placeholder: "Open a module…",
    actionLabel: "Open",
    opener: "New tab",
  },
  tags: ["!autodocs"],
};

/** `CommandPaletteView` without a dialog: ⌘P's file list inside a host's own
 *  shell, with a step that runs on the field's text (⌘Enter). */
export const ViewOnly: Story = {
  tags: ["!autodocs"],
  render: () => <ViewOnlyDemo />,
};

function ViewOnlyDemo() {
  const [query, setQuery] = useState("");
  return (
    <div className="flex min-h-svh items-start justify-center p-8">
      <div className="flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
        <CommandPaletteView
          groups={filterCommandGroups(MODULES, query)}
          query={query}
          onQueryChange={setQuery}
          onRun={run}
          placeholder="Open a module…"
          emptyMessage={`No modules match “${query}”`}
          actionLabel="Open"
          claimFocus={false}
          onSubmit={fn().mockName("onSubmit")}
        />
      </div>
    </div>
  );
}

/**
 * `CommandList` driven from a textarea that keeps focus: a slash picker. The
 * textarea owns the keys and passes `activeId`; rows never take focus, and a
 * click on one leaves the caret in the textarea.
 */
export const InlineList: Story = {
  tags: ["!autodocs"],
  render: () => <InlineDemo />,
  play: async ({ canvasElement }) => {
    const textarea = within(canvasElement).getByRole("textbox");
    await userEvent.click(textarea);
    await userEvent.type(textarea, "/s");
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
  },
};

function InlineDemo() {
  const [text, setText] = useState("");
  const listId = "slash-picker";
  const query = text.startsWith("/") ? text.slice(1) : null;
  const groups = query === null ? [] : filterCommandGroups(ACTIONS, query);
  const ids = selectableIds(groups);
  const highlight = useListHighlight(ids, query);
  const pick = (item: CommandPaletteItem) => {
    setText("");
    item.onSelect?.();
  };
  const open = query !== null && ids.length > 0;
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-2 p-8">
      <textarea
        aria-label="Message"
        aria-controls={open ? listId : undefined}
        aria-activedescendant={
          open && highlight.active ? optionId(listId, highlight.active) : undefined
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (!open) return;
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            highlight.step(e.key === "ArrowDown" ? 1 : -1);
          } else if (e.key === "Enter") {
            e.preventDefault();
            const item = groups.flatMap((g) => g.items).find((i) => i.id === highlight.active);
            if (item) pick(item);
          }
        }}
        placeholder="Type / for commands"
        className="h-24 resize-none rounded-lg border border-border bg-background p-3 text-md text-foreground outline-none placeholder:text-muted-foreground"
      />
      {query !== null && (
        <div className="overflow-hidden rounded-xl border border-border bg-popover pt-2 shadow-lg">
          <CommandList
            id={listId}
            groups={groups}
            activeId={highlight.active}
            onPoint={highlight.pointTo}
            onRun={pick}
            emptyMessage="No commands"
          />
          <CommandHints actionLabel="Insert" escapeLabel="Dismiss" />
        </div>
      )}
    </div>
  );
}

/** `CommandRow` in each of its states, outside any list logic. */
export const Rows: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="mx-auto max-w-2xl p-8">
      <div className="overflow-hidden rounded-xl border border-border bg-popover pt-2">
        <CommandPanel aria-label="Row states">
          {(
            [
              [
                { id: "a", label: "Active, with a shortcut", icon: icon(Plus), shortcut: "⌘N" },
                true,
              ],
              [{ id: "b", label: "A submenu", icon: icon(Palette), groups: [] }, false],
              [
                {
                  id: "c",
                  label: "Two lines",
                  description: "atlas · main",
                  icon: icon(MessageSquare),
                  timestamp: "2h ago",
                },
                false,
              ],
              [{ id: "d", label: "Disabled", icon: icon(Settings), disabled: true }, false],
            ] as Array<[CommandPaletteItem, boolean]>
          ).map(([item, active]) => (
            <CommandRow
              key={item.id}
              id={optionId("rows", item.id)}
              item={item}
              active={active}
              onRun={run}
            />
          ))}
        </CommandPanel>
      </div>
    </div>
  ),
};
