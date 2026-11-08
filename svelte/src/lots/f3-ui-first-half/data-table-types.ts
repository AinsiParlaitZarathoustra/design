import type { Snippet } from "svelte";

/** One column of a `DataTable`. `cell` draws the row's cell. */
export interface Column<T> {
  id: string;
  header: string | Snippet;
  cell: Snippet<[T]>;
  /** Enables the sort toggle. Return a comparable value. */
  sortValue?: (row: T) => string | number;
  /** Enables the sort toggle without a `sortValue`. Only under `manualSorting`. */
  sortable?: boolean;
  align?: "left" | "right";
  class?: string;
}

/** The column a table is sorted by, or `null` for the order given. */
export type DataTableSort = { id: string; dir: "asc" | "desc" } | null;

/** A header click: ascending, then descending, then unsorted. */
export function nextSort(current: DataTableSort, id: string): DataTableSort {
  if (current?.id !== id) return { id, dir: "asc" };
  return current.dir === "asc" ? { id, dir: "desc" } : null;
}
