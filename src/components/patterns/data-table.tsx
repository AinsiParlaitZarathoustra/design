"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from "lucide-react";

import { cn } from "../../lib/utils.ts";
import { Icon } from "../../ui/icon.tsx";
import { ScrollFade, useScrollEdges } from "../../ui/scroll-fade.tsx";

/**
 * The data table, without a table-library
 * dependency — a mock with a dozen rows needs sort-by-column and a search
 * box, and both are twenty lines of state.
 *
 * Shape, after desktop's usage tables: a `card` with an `element-selected`
 * hairline; a toolbar band; a sticky header row of eyebrows; rows divided by
 * `border-subtle` hairlines; and a footer band. Rows highlight on hover and
 * take the `element-selected` wash when chosen. Right-aligned cells are
 * tabular. The body fades at an edge only while there is more past it.
 */

export type Column<T> = {
  id: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  /** Enables the sort toggle. Return a comparable value. */
  sortValue?: (row: T) => string | number;
  align?: "left" | "right";
  className?: string;
};

type Sort = { id: string; dir: "asc" | "desc" } | null;

function DataTable<T>({
  rows,
  columns,
  rowId,
  selectedId,
  onRowClick,
  toolbar,
  footer,
  className,
}: {
  rows: Array<T>;
  columns: Array<Column<T>>;
  rowId: (row: T) => string;
  selectedId?: string;
  onRowClick?: (row: T) => void;
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  const [sort, setSort] = useState<Sort>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const edges = useScrollEdges(scroller, [rows]);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.id === sort.id);
    if (!col?.sortValue) return rows;
    const get = col.sortValue;
    return [...rows].sort((a, b) => {
      const av = get(a);
      const bv = get(b);
      const r = av < bv ? -1 : av > bv ? 1 : 0;
      return sort.dir === "asc" ? r : -r;
    });
  }, [rows, columns, sort]);

  function toggle(id: string) {
    setSort((s) =>
      s?.id === id ? (s.dir === "asc" ? { id, dir: "desc" } : null) : { id, dir: "asc" },
    );
  }

  return (
    <div
      data-slot="data-table"
      className={cn(
        // A container, so columns can hide by the TABLE's width rather than
        // the viewport's — the dock and the interface scale both change one
        // without the other.
        "@container flex min-h-0 flex-col overflow-hidden rounded-lg border border-element-selected bg-card",
        className,
      )}
    >
      {toolbar && (
        <div className="flex h-9 shrink-0 items-center gap-2 border-b border-element-selected px-2">
          {toolbar}
        </div>
      )}

      {/* Both axes: when the fixed columns outgrow the container the table
          scrolls sideways (scrollbars are hidden, so it reads as a pan)
          rather than clipping under the ring. */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div ref={scroller} className="min-h-0 flex-1 overflow-auto">
          <table className="w-full border-separate border-spacing-0 text-xs">
            <thead className="sticky top-0 z-panel">
              <tr>
                {columns.map((col) => {
                  const active = sort?.id === col.id;
                  const sortable = !!col.sortValue;
                  return (
                    <th
                      key={col.id}
                      scope="col"
                      className={cn(
                        "h-control-md border-b border-element-selected bg-card px-3 text-left eyebrow whitespace-nowrap",
                        col.align === "right" && "text-right",
                        sortable && "cursor-pointer select-none hover:text-foreground",
                        col.className,
                      )}
                      onClick={sortable ? () => toggle(col.id) : undefined}
                      aria-sort={
                        active ? (sort.dir === "asc" ? "ascending" : "descending") : undefined
                      }
                    >
                      <span
                        className={cn(
                          "inline-flex items-center gap-1",
                          col.align === "right" && "flex-row-reverse",
                        )}
                      >
                        {col.header}
                        {active && (
                          <Icon
                            icon={sort.dir === "asc" ? ArrowUpIcon : ArrowDownIcon}
                            size="xs"
                            className="size-2.5"
                          />
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => {
                const id = rowId(row);
                const selected = id === selectedId;
                return (
                  <tr
                    key={id}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    aria-selected={selected || undefined}
                    className={cn(
                      "group/row transition-colors duration-fast ease-out-strong",
                      selected ? "bg-element-selected" : "hover:bg-element-hover",
                      onRowClick && "cursor-pointer",
                    )}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={cn(
                          "h-8 border-b border-border-subtle px-3 align-middle",
                          col.align === "right" && "text-right tabular-nums",
                          col.className,
                        )}
                      >
                        {col.cell(row)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ScrollFade at="bottom" visible={edges.bottom} className="from-card" />
      </div>

      {footer && (
        <div className="flex h-control-lg shrink-0 items-center gap-2 border-t border-element-selected px-3 text-2xs text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
}

/** The toolbar search: desktop's usage-table field, a recessed well. */
function TableSearch({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <div className={cn("relative", className)}>
      <Icon
        icon={SearchIcon}
        size="xs"
        className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        type="search"
        className="h-control-md w-50 rounded-md border border-border bg-background pr-2 pl-6 text-xs text-foreground outline-none focus-ring-none placeholder:text-muted-foreground focus:border-border-strong"
        {...props}
      />
    </div>
  );
}

export { DataTable, TableSearch };
