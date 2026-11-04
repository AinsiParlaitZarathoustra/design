import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftIcon, FilePlus2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import {
  CanvasPagesPanel,
  type CanvasPageDropIndicator,
} from "../../../src/components/canvas/canvas-pages-panel.tsx";
import type { CanvasPageRow } from "../../../src/components/canvas/types.ts";
import { Icon } from "../../../src/ui/icon.tsx";
import { LOCAL_PAGE_ROWS, LONG_NAME, PAGE_ROWS } from "./fixtures.ts";

interface DemoProps {
  rows: CanvasPageRow[];
  folders: boolean;
  initialCollapsed?: string[];
  dropIndicator?: CanvasPageDropIndicator;
  backLink?: boolean;
  icons?: boolean;
  newPageInside?: boolean;
  deleteMode?: "hover" | "always";
  onOpen: (id: string) => void;
  onToggleFolder: (id: string) => void;
  onCreate: (kind: "page" | "folder") => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onIconClick: (id: string, rect: DOMRect) => void;
  onNewPageInside: (folderId: string) => void;
}

/** The app's state: what is open, what is folded, the rows' names. */
function Demo({
  rows: initialRows,
  folders,
  initialCollapsed = [],
  dropIndicator,
  backLink,
  icons,
  newPageInside,
  deleteMode,
  onOpen,
  onToggleFolder,
  onCreate,
  onRename,
  onDelete,
  onIconClick,
  onNewPageInside,
}: DemoProps) {
  const [rows, setRows] = useState(initialRows);
  const [active, setActive] = useState(initialRows.find((r) => r.kind === "page")?.id ?? null);
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(new Set(initialCollapsed));

  // Flatten as an app does: children of a folded folder are left out.
  const visible = useMemo(() => {
    const out: CanvasPageRow[] = [];
    let hiddenBelow: number | null = null;
    for (const r of rows) {
      const depth = r.depth ?? 0;
      if (hiddenBelow !== null && depth > hiddenBelow) continue;
      hiddenBelow = null;
      out.push(r);
      if (r.kind === "folder" && collapsed.has(r.id)) hiddenBelow = depth;
    }
    return out;
  }, [rows, collapsed]);

  return (
    <div className="h-112 overflow-hidden rounded-lg border border-border">
      <CanvasPagesPanel
        rows={visible}
        activeId={active}
        collapsedIds={collapsed}
        onToggleFolder={(id) => {
          setCollapsed((cur) => {
            const next = new Set(cur);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
          });
          onToggleFolder(id);
        }}
        onOpen={(id) => {
          setActive(id);
          onOpen(id);
        }}
        onCreate={onCreate}
        allowFolders={folders}
        onRename={(id, name) => {
          setRows((cur) => cur.map((r) => (r.id === id ? { ...r, name } : r)));
          onRename(id, name);
        }}
        onDelete={(id) => {
          setRows((cur) => cur.filter((r) => r.id !== id));
          onDelete(id);
        }}
        onIconClick={icons ? onIconClick : undefined}
        dropIndicator={dropIndicator}
        header={
          backLink ? (
            <a
              href="#chat"
              className="flex h-9 shrink-0 items-center gap-1.5 border-b border-border-subtle px-3 text-xs text-secondary-foreground transition-colors duration-fast hover:text-foreground"
            >
              <Icon icon={ArrowLeftIcon} size="sm" />
              Back to design-crit
            </a>
          ) : undefined
        }
        rowActions={
          newPageInside
            ? (row) =>
                row.kind === "folder"
                  ? [
                      {
                        id: "new-inside",
                        label: "New page inside",
                        icon: FilePlus2Icon,
                        onSelect: onNewPageInside,
                      },
                    ]
                  : []
            : undefined
        }
        deleteMode={deleteMode}
      />
    </div>
  );
}

const ONE_PAGE: CanvasPageRow[] = [
  { id: "p-only", kind: "page", name: "Board", subtitle: "Updated just now" },
];

const AUTHORED: CanvasPageRow[] = PAGE_ROWS.map((r) =>
  r.id === "p-roadmap"
    ? { ...r, author: { name: "Ana Ruiz" } }
    : r.id === "p-interviews"
      ? { ...r, author: { name: LONG_NAME } }
      : r,
);

const meta = {
  title: "Blocks/Canvas pages panel",
  component: Demo,
  tags: ["autodocs"],
  args: {
    rows: LOCAL_PAGE_ROWS,
    folders: false,
    icons: true,
    onOpen: fn(),
    onToggleFolder: fn(),
    onCreate: fn(),
    onRename: fn(),
    onDelete: fn(),
    onIconClick: fn(),
    onNewPageInside: fn(),
  },
  argTypes: { rows: { control: false }, dropIndicator: { control: false } },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The local canvas: flat pages with emoji, delete on hover. */
export const Flat: Story = {};
/** Spaces' tree: a folder with a page inside, names over "Updated …". */
export const WithFolders: Story = { args: { rows: PAGE_ROWS, folders: true, icons: false } };
/** The folder folded: its page is left out. */
export const Collapsed: Story = {
  args: { rows: PAGE_ROWS, folders: true, icons: false, initialCollapsed: ["f-research"] },
};
/** One page: there is no delete to offer. */
export const SinglePage: Story = { args: { rows: ONE_PAGE, icons: false } };
/** Nothing yet. */
export const Empty: Story = { args: { rows: [] } };
/** Names long enough to truncate. */
export const LongNames: Story = {
  args: {
    rows: [
      {
        id: "p-long",
        kind: "page",
        name: "Quarterly planning for the realtime sync rewrite and its rollout",
        subtitle: "Updated 5m ago",
      },
      ...PAGE_ROWS.slice(1),
    ],
    folders: true,
    icons: false,
  },
};
/** Dragging: the line above a row. */
export const DropIndicatorBefore: Story = {
  args: {
    rows: PAGE_ROWS,
    folders: true,
    icons: false,
    dropIndicator: { id: "p-retro", where: "before" },
  },
};
/** Dragging: the line below a row. */
export const DropIndicatorAfter: Story = {
  args: {
    rows: PAGE_ROWS,
    folders: true,
    icons: false,
    dropIndicator: { id: "p-roadmap", where: "after" },
  },
};
/** Dragging into a folder: the folder rings. */
export const DropIndicatorInto: Story = {
  args: {
    rows: PAGE_ROWS,
    folders: true,
    icons: false,
    dropIndicator: { id: "f-research", where: "into" },
  },
};
/** The app's back link above the header. */
export const WithBackLink: Story = {
  args: { rows: PAGE_ROWS, folders: true, icons: false, backLink: true },
};
/** Double-click a name, type, Enter: renamed. */
export const Rename: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.dblClick(canvas.getByText("Architecture"));
    const input = await canvas.findByRole("textbox", { name: "Page name" });
    await userEvent.clear(input);
    await userEvent.type(input, "System map{Enter}");
    await expect(args.onRename).toHaveBeenCalledWith("l-arch", "System map");
    await expect(canvas.getByText("System map")).toBeInTheDocument();
  },
};
/** Who created each page, where the app knows it. */
export const WithAuthors: Story = { args: { rows: AUTHORED, folders: true, icons: false } };
/** A folder's own action, revealed on hover. */
export const RowActions: Story = {
  args: { rows: PAGE_ROWS, folders: true, icons: false, newPageInside: true },
};
/** Delete drawn on every row, never hover-revealed. */
export const DeleteAlways: Story = {
  args: { rows: PAGE_ROWS, folders: true, icons: false, deleteMode: "always" },
};
/** The only page cannot be deleted, and says so. */
export const DeleteAlwaysLastPage: Story = {
  args: { rows: ONE_PAGE, icons: false, deleteMode: "always" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", {
      name: "The last page cannot be deleted.",
    });
    await expect(button).toBeDisabled();
  },
};
/** Spaces as desktop ships it: authors, row actions, delete always, a drag in flight. */
export const SpacesFull: Story = {
  args: {
    rows: AUTHORED,
    folders: true,
    icons: false,
    newPageInside: true,
    deleteMode: "always",
    backLink: true,
    dropIndicator: { id: "p-retro", where: "before" },
  },
};
/** A row action acts alone: it neither opens nor folds the row. */
export const RowActionClick: Story = {
  args: { rows: PAGE_ROWS, folders: true, icons: false, newPageInside: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByText("Research"));
    await userEvent.click(canvas.getByRole("button", { name: "New page inside" }));
    await expect(args.onNewPageInside).toHaveBeenCalledWith("f-research");
    await expect(args.onOpen).not.toHaveBeenCalled();
    await expect(args.onToggleFolder).not.toHaveBeenCalled();
  },
};
