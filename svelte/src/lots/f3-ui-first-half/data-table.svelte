<script lang="ts" generics="T">
  import type { Snippet } from "svelte";
  import { ArrowDownIcon, ArrowUpIcon } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Icon from "../../ui/icon.svelte";
  import ScrollFade from "./deps/scroll-fade.svelte";
  import { ScrollEdges } from "./deps/scroll-edges.svelte";
  import { nextSort, type Column, type DataTableSort } from "./data-table-types";

  /**
   * The data table, without a table-library dependency: a `card` with an
   * `element-selected` hairline, a toolbar band, a sticky header row of
   * eyebrows, rows divided by hairlines, and a footer band. Sorting is local by
   * default; pass `sort` and `onSortChange` (and `manualSorting`) to own it.
   */
  interface Props {
    rows: T[];
    columns: Column<T>[];
    rowId: (row: T) => string;
    selectedId?: string;
    onRowClick?: (row: T) => void;
    toolbar?: Snippet;
    footer?: Snippet;
    /** What the body says when there are no rows. Without it the body is blank. */
    empty?: Snippet;
    /** The sort, controlled. Leave it out and the table keeps its own. */
    sort?: DataTableSort;
    /** Called with the next sort on a header click, controlled or not. */
    onSortChange?: (next: DataTableSort) => void;
    /** `rows` arrive already sorted (on the server): draw them as given. */
    manualSorting?: boolean;
    class?: string;
  }

  let {
    rows,
    columns,
    rowId,
    selectedId,
    onRowClick,
    toolbar,
    footer,
    empty,
    sort,
    onSortChange,
    manualSorting = false,
    class: className,
  }: Props = $props();

  let localSort = $state<DataTableSort>(null);
  const activeSort = $derived(sort !== undefined ? sort : localSort);

  let scroller: HTMLDivElement | undefined = $state();
  const edges = new ScrollEdges();

  const sorted = $derived.by(() => {
    const current = activeSort;
    if (!current || manualSorting) return rows;
    const column = columns.find((c) => c.id === current.id);
    if (!column?.sortValue) return rows;
    const get = column.sortValue;
    return [...rows].sort((a, b) => {
      const av = get(a);
      const bv = get(b);
      const r = av < bv ? -1 : av > bv ? 1 : 0;
      return current.dir === "asc" ? r : -r;
    });
  });

  $effect(() => {
    // The content is the dependency: new rows change the scroll height.
    void sorted;
    edges.watch(scroller);
  });

  $effect(() => () => edges.destroy());

  function toggle(id: string) {
    const next = nextSort(activeSort, id);
    if (sort === undefined) localSort = next;
    onSortChange?.(next);
  }
</script>

<div
  data-slot="data-table"
  class={cn(
    // A container, so columns can hide by the TABLE's width rather than the viewport's.
    "@container flex min-h-0 flex-col overflow-hidden rounded-lg border border-element-selected bg-card",
    // The scroller's keyboard focus rings the whole card, as InputGroup does.
    "has-[[data-slot=data-table-scroller]:focus-visible]:outline-2 has-[[data-slot=data-table-scroller]:focus-visible]:outline-offset-1 has-[[data-slot=data-table-scroller]:focus-visible]:outline-ring has-[[data-slot=data-table-scroller]:focus-visible]:outline-solid",
    className,
  )}
>
  {#if toolbar}
    <div class="flex h-9 shrink-0 items-center gap-2 border-b border-element-selected px-2">
      {@render toolbar()}
    </div>
  {/if}

  <!-- Both axes: when the fixed columns outgrow the container the table scrolls sideways. -->
  <div class="relative flex min-h-0 flex-1 flex-col">
    <!-- Focusable, so a keyboard can scroll it. -->
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      bind:this={scroller}
      data-slot="data-table-scroller"
      tabindex={0}
      class="min-h-0 flex-1 overflow-auto focus-ring-none"
    >
      <table class="w-full border-separate border-spacing-0 text-xs">
        <thead class="sticky top-0 z-panel">
          <tr>
            {#each columns as col (col.id)}
              {@const active = activeSort?.id === col.id}
              {@const sortable = !!col.sortValue || (manualSorting && !!col.sortable)}
              <th
                scope="col"
                class={cn(
                  "h-control-md border-b border-element-selected bg-card px-3 text-left eyebrow whitespace-nowrap",
                  col.align === "right" && "text-right",
                  sortable && "cursor-pointer select-none hover:text-foreground",
                  col.class,
                )}
                onclick={sortable ? () => toggle(col.id) : undefined}
                aria-sort={active && activeSort
                  ? activeSort.dir === "asc"
                    ? "ascending"
                    : "descending"
                  : undefined}
              >
                <span
                  class={cn(
                    "inline-flex items-center gap-1",
                    col.align === "right" && "flex-row-reverse",
                  )}
                >
                  {#if typeof col.header === "string"}
                    {col.header}
                  {:else}
                    {@render col.header()}
                  {/if}
                  {#if active && activeSort}
                    <Icon
                      icon={activeSort.dir === "asc" ? ArrowUpIcon : ArrowDownIcon}
                      size="xs"
                      class="size-2.5"
                    />
                  {/if}
                </span>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each sorted as row (rowId(row))}
            {@const id = rowId(row)}
            {@const selected = id === selectedId}
            <tr
              onclick={onRowClick ? () => onRowClick(row) : undefined}
              aria-selected={selected || undefined}
              class={cn(
                "group/row transition-colors duration-fast ease-out-strong",
                selected ? "bg-element-selected" : "hover:bg-element-hover",
                onRowClick && "cursor-pointer",
              )}
            >
              {#each columns as col (col.id)}
                <td
                  class={cn(
                    "h-8 border-b border-border-subtle px-3 align-middle",
                    col.align === "right" && "text-right tabular-nums",
                    col.class,
                  )}
                >
                  {@render col.cell(row)}
                </td>
              {/each}
            </tr>
          {/each}
          {#if sorted.length === 0 && empty}
            <tr>
              <td colspan={columns.length} class="h-24 px-3 text-center caption">
                {@render empty()}
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
    <ScrollFade at="bottom" visible={edges.bottom} class="from-card" />
  </div>

  {#if footer}
    <div
      class="flex h-control-lg shrink-0 items-center gap-2 border-t border-element-selected px-3 text-2xs text-muted-foreground"
    >
      {@render footer()}
    </div>
  {/if}
</div>
