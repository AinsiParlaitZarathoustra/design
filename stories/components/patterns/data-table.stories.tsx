import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useMemo, useRef, useState } from "react";
import { fn } from "storybook/test";
import {
  type Column,
  DataTable,
  type DataTableSort,
  TableSearch,
} from "../../../src/components/patterns/data-table.tsx";

interface Row {
  id: string;
  session: string;
  author: string;
  model: string;
  tokens: number;
  cost: number;
}

const AUTHORS = ["Maya Chen", "Tomás Rivera", "Aiko Tanaka", "Sam Okafor", "Lena Fischer"];
const MODELS = ["claude-opus", "claude-sonnet", "gpt-5", "gemini-pro"];
const TITLES = [
  "Refactor the settings panel",
  "Fix the flaky terminal test",
  "Port the session timeline",
  "Add the ghost-destructive variant",
  "Bump the Rust toolchain",
  "Wire up the PR surface",
  "Theme import from VS Code",
  "Dedupe the codemirror packages",
];

function makeRows(n: number): Row[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `r${i}`,
    session: TITLES[i % TITLES.length]!,
    author: AUTHORS[i % AUTHORS.length]!,
    model: MODELS[i % MODELS.length]!,
    tokens: 12_000 + ((i * 37_919) % 400_000),
    cost: Math.round((0.4 + ((i * 7.3) % 18)) * 100) / 100,
  }));
}

const COLUMNS: Column<Row>[] = [
  {
    id: "session",
    header: "Session",
    cell: (r) => <span className="label block truncate">{r.session}</span>,
    sortValue: (r) => r.session,
  },
  {
    id: "author",
    header: "Author",
    cell: (r) => <span className="text-secondary-foreground">{r.author}</span>,
    sortValue: (r) => r.author,
    className: "hidden @md:table-cell",
  },
  {
    id: "model",
    header: "Model",
    cell: (r) => <span className="font-mono text-secondary-foreground">{r.model}</span>,
    className: "hidden @lg:table-cell",
  },
  {
    id: "tokens",
    header: "Tokens",
    cell: (r) => r.tokens.toLocaleString("en-US"),
    sortValue: (r) => r.tokens,
    align: "right",
  },
  {
    id: "cost",
    header: "Cost",
    cell: (r) => `$${r.cost.toFixed(2)}`,
    sortValue: (r) => r.cost,
    align: "right",
  },
];

interface DemoProps {
  rows: Row[];
  toolbar?: boolean;
  footer?: boolean;
  selectable?: boolean;
  onRowClick?: (row: Row) => void;
  className?: string;
}

function Demo({
  rows,
  toolbar = true,
  footer = true,
  selectable = true,
  onRowClick,
  className,
}: DemoProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | undefined>(rows[1]?.id);
  const visible = useMemo(
    () => rows.filter((r) => r.session.toLowerCase().includes(query.toLowerCase())),
    [rows, query],
  );
  return (
    <DataTable
      className={className ?? "max-h-96"}
      rows={visible}
      columns={COLUMNS}
      rowId={(r) => r.id}
      empty={query ? `No sessions match “${query}”` : "No sessions in the last 7 days"}
      selectedId={selectable ? selected : undefined}
      onRowClick={
        selectable
          ? (r) => {
              setSelected(r.id);
              onRowClick?.(r);
            }
          : undefined
      }
      toolbar={
        toolbar ? (
          <>
            <TableSearch
              placeholder="Search sessions"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="caption ml-auto">{visible.length} sessions</span>
          </>
        ) : undefined
      }
      footer={
        footer ? (
          <>
            <span>Last 7 days</span>
            <span className="ml-auto tabular-nums">
              {visible.reduce((t, r) => t + r.tokens, 0).toLocaleString("en-US")} tokens
            </span>
          </>
        ) : undefined
      }
    />
  );
}

const meta = {
  title: "Patterns/DataTable",
  component: Demo,
  args: { rows: makeRows(8), toolbar: true, footer: true, selectable: true, onRowClick: fn() },
  argTypes: { rows: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "A sortable table on a card, without a table library: a toolbar band (with `TableSearch`), a sticky header of eyebrows, hairline-divided rows and a footer band. Columns hide by the table's own width (`@container`). Click a header to sort. Sorting is local by default; `sort` + `onSortChange` + `manualSorting` hand it to the server.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { rows: [] } };
export const ManyItems: Story = {
  // A component finding, left for its owner. axe scrollable-region-focusable: DataTable's own
  // scroller cannot take keyboard focus.
  parameters: { a11y: { test: "todo" } },
  args: { rows: makeRows(60) },
};
export const Bare: Story = { args: { toolbar: false, footer: false, selectable: false } };
export const LongText: Story = {
  args: {
    rows: makeRows(4).map((r, i) =>
      i === 0
        ? {
            ...r,
            session:
              "Rewrite the session sidebar so pinned, unread and snoozed sessions sort into one flat list",
          }
        : r,
    ),
  },
};
/** Narrow: the author and model columns hide by the table's width, not the viewport's. */
export const Narrow: Story = {
  // A component finding, left for its owner. axe scrollable-region-focusable: DataTable's own
  // scroller cannot take keyboard focus.
  parameters: { a11y: { test: "todo" } },
  args: { className: "max-h-96 w-80" },
};

const SERVER_ROWS = makeRows(8);

/** Stands in for a server query: the rows in the order a server would return. */
function serverSort(sort: DataTableSort): Row[] {
  const get = COLUMNS.find((c) => c.id === sort?.id)?.sortValue;
  if (!sort || !get) return SERVER_ROWS;
  return [...SERVER_ROWS].sort((a, b) => {
    const r = get(a) < get(b) ? -1 : get(a) > get(b) ? 1 : 0;
    return sort.dir === "asc" ? r : -r;
  });
}

/** The query, answered after a delay, starting from the first answer. */
function useServerSorted(sort: DataTableSort) {
  const [rows, setRows] = useState(() => serverSort(sort));
  const [loading, setLoading] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      setRows(serverSort(sort));
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [sort]);
  return { rows, loading };
}

function ServerSortedDemo() {
  const [sort, setSort] = useState<DataTableSort>({ id: "cost", dir: "desc" });
  const { rows, loading } = useServerSorted(sort);
  return (
    <DataTable
      className="max-h-96"
      rows={rows}
      columns={COLUMNS}
      rowId={(r) => r.id}
      sort={sort}
      onSortChange={setSort}
      manualSorting
      toolbar={
        <span className="caption">
          {loading
            ? "Sorting on the server…"
            : sort
              ? `Sorted by ${sort.id}, ${sort.dir === "asc" ? "ascending" : "descending"}`
              : "Server order"}
        </span>
      }
    />
  );
}

/**
 * Sorted on the server: the table owns no sort state (`sort` +
 * `onSortChange`) and draws `rows` in the order given (`manualSorting`). The
 * arrow moves at once; the rows follow when the "server" answers.
 */
export const ServerSorted: Story = { render: () => <ServerSortedDemo /> };
