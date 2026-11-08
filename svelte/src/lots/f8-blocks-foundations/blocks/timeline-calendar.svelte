<script lang="ts" module>
  export interface CalendarDay {
    id: string;
    /** The bright part, e.g. "October 13". */
    date: string;
    /** The quiet part after the slash, e.g. "Today" or "Monday". */
    day: string;
    /** Right-aligned summary of the day: totals, a face stack. */
    meta?: Snippet;
  }

  /** One line of the flattened list: a day's header, or a row under it. */
  export type CalendarItem<T> =
    | ({ kind: "day"; key: string } & CalendarDay)
    | { kind: "row"; key: string; dayId: string; data: T };
</script>

<script lang="ts" generics="T">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { createVirtualizer } from "../deps/virtualizer.svelte";
  import { cubicBezier } from "../deps/ease";

  /**
   * The timeline calendar: the board grouped by day under one sticky date that
   * changes as you scroll into the next day.
   *
   * Virtualized: only the rows near the viewport are mounted. Days are items in
   * the same flat list as the rows. The mounted items are grouped by day into
   * `display: contents` wrappers, a `<section>` named for the day holding its
   * `<h2>` and a `role="list"` of its rows, each row a `listitem` that knows its
   * place in the whole day (`aria-posinset` / `aria-setsize`).
   *
   * One sticky header names the day you are reading. It is pulled up over the
   * first day's own header (`-mt-12`) so at rest there is one date on screen.
   */

  /** Starting guesses, corrected by measurement as items mount. */
  const FIRST_DAY_SIZE = 48;
  const DAY_SIZE = 88;
  const ROW_SIZE = 86;

  const PANEL_EASE = cubicBezier(0.22, 1, 0.36, 1);

  /** The sticky date slides in from the left and fades up, on each day change. */
  function dateIn(_node: Element, { duration }: { duration: number }) {
    return {
      duration,
      easing: PANEL_EASE,
      css: (t: number) => `transform: translateX(${(t - 1) * 6}px); opacity: ${t};`,
    };
  }

  interface Props {
    items: CalendarItem<T>[];
    /** The scroll container. In this shell the window never scrolls, a panel does. */
    root: HTMLElement | null | undefined;
    renderRow: Snippet<[T]>;
    /** Where the dates sit: inset 8px by default, on the column's edge with `flush`. */
    flush?: boolean;
    /**
     * Room after the last row so the last day can scroll up under the sticky
     * header. `true` sizes it as if the list ends the scroller; `"measure"` counts
     * whatever the scroller holds after the calendar.
     */
    endSpace?: boolean | "measure";
    class?: string;
  }

  let {
    items,
    root,
    renderRow,
    flush = false,
    endSpace = true,
    class: className,
  }: Props = $props();

  // The scroller is owned by the parent, so it is missing on the first pass.
  // One flip once it exists gets the virtualizer attached to it.
  let scrollerReady = $state(false);
  $effect(() => {
    if (root) scrollerReady = true;
  });

  const virtualizer = createVirtualizer({
    count: () => items.length,
    getKey: (index) => items[index]?.key ?? index,
    estimateSize: (index) =>
      items[index]?.kind === "day" ? (index === 0 ? FIRST_DAY_SIZE : DAY_SIZE) : ROW_SIZE,
    overscan: 10,
    scrollElement: () => root,
    // A viewport's worth before the scroller has been measured.
    initialRect: { width: 0, height: 900 },
  });

  $effect(() => {
    const element = root;
    if (!element) return;
    return virtualizer.attach(element);
  });

  const virtualRows = $derived(virtualizer.items);

  /** Which day each item belongs to, so the topmost visible one names the header. */
  const dayOfItem = $derived.by(() => {
    const byKey = new Map<string, string>();
    let currentDay: string | null = null;
    for (const item of items) {
      if (item.kind === "day") currentDay = item.id;
      if (currentDay) byKey.set(item.key, currentDay);
    }
    return byKey;
  });

  const days = $derived(
    new Map(
      items
        .filter((i): i is Extract<CalendarItem<T>, { kind: "day" }> => i.kind === "day")
        .map((d) => [d.id, d] as const),
    ),
  );

  /** Each row's place in its day, for `aria-posinset` / `aria-setsize`. */
  const placeOfRow = $derived.by(() => {
    const byKey = new Map<string, { pos: number; size: number }>();
    const perDay = new Map<string, string[]>();
    for (const item of items) {
      if (item.kind !== "row") continue;
      const day = dayOfItem.get(item.key) ?? item.dayId;
      const keys = perDay.get(day);
      if (keys) keys.push(item.key);
      else perDay.set(day, [item.key]);
    }
    for (const keys of perDay.values())
      keys.forEach((key, i) => byKey.set(key, { pos: i + 1, size: keys.length }));
    return byKey;
  });

  // Where the list starts inside the scroller, and the sticky header's height.
  let list: HTMLDivElement | undefined = $state();
  let header: HTMLDivElement | undefined = $state();
  let self: HTMLDivElement | undefined = $state();
  let geometry = $state({ listTop: 0, header: 0 });

  $effect(() => {
    void items;
    void scrollerReady;
    const element = list;
    const scroller = root;
    if (!element || !scroller) return;
    const next = {
      listTop:
        element.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top +
        scroller.scrollTop,
      header: header?.offsetHeight ?? 0,
    };
    if (geometry.listTop !== next.listTop || geometry.header !== next.header) geometry = next;
  });

  // With `endSpace="measure"`, the height of what the scroller holds after the calendar.
  let after = $state(0);
  const measureAfter = $derived(endSpace === "measure");
  const scrollerHeight = $derived(virtualizer.scrollRect?.height);

  /** The index of the last day's header item. */
  const lastDay = $derived.by(() => {
    for (let i = items.length - 1; i >= 0; i--) if (items[i]?.kind === "day") return i;
    return -1;
  });

  // The day of the item under the sticky header's bottom edge, the one being read.
  const line = $derived(virtualizer.scrollOffset + geometry.header - geometry.listTop);
  const reading = $derived(virtualRows.find((v) => v.end > line) ?? virtualRows[0]);
  const readingKey = $derived(reading?.key as string | undefined);
  const currentId = $derived(
    (readingKey ? dayOfItem.get(readingKey) : undefined) ?? [...days.keys()][0],
  );
  const current = $derived(currentId ? days.get(currentId) : undefined);

  // The scroller must be able to go far enough for the last day's own heading to
  // slide fully under the sticky one.
  const lastDayEnd = $derived(lastDay >= 0 ? virtualizer.itemEnd(lastDay) : 0);
  const endHeight = $derived(
    endSpace
      ? Math.max(
          0,
          Math.ceil(
            (virtualizer.scrollRect?.height ?? 0) -
              geometry.header -
              (virtualizer.totalSize - lastDayEnd) -
              (measureAfter ? after : 0),
          ),
        )
      : 0,
  );

  /** Re-measured when the end space changes, and when the list or scroller changes. */
  function measureEnd() {
    const element = self;
    const scroller = root;
    if (!element || !scroller) return;
    const bottom =
      element.getBoundingClientRect().bottom -
      scroller.getBoundingClientRect().top -
      scroller.clientTop +
      scroller.scrollTop;
    const next = Math.max(0, Math.round(scroller.scrollHeight - bottom));
    if (after !== next) after = next;
  }

  $effect(() => {
    void measureAfter;
    void items;
    void scrollerReady;
    void scrollerHeight;
    void endHeight;
    if (measureAfter) measureEnd();
  });

  // And when what follows changes size on its own.
  $effect(() => {
    const element = self;
    const scroller = root;
    if (!measureAfter || !element || !scroller) return;
    const observer = new ResizeObserver(() => measureEnd());
    for (const box of new Set([element.parentElement, scroller.firstElementChild]))
      if (box) observer.observe(box);
    return () => observer.disconnect();
  });

  /** The mounted items, cut into runs by day. */
  const runs = $derived.by(() => {
    const out: { dayId: string; items: typeof virtualRows }[] = [];
    for (const v of virtualRows) {
      const item = items[v.index];
      if (!item) continue;
      const dayId = item.kind === "day" ? item.id : (dayOfItem.get(item.key) ?? item.dayId);
      const run = out.at(-1);
      if (run?.dayId === dayId) run.items.push(v);
      else out.push({ dayId, items: [v] });
    }
    return out;
  });

</script>

{#if items.length > 0 && current}
  <div bind:this={self} data-slot="timeline-calendar" class={className}>
    <!-- The backing bleeds past each side, so nothing scrolling under the date shows
         at its edges. A plain div, not a <header>: its date is hidden from assistive
         tech, which reads the day headings. -->
    <div
      bind:this={header}
      class={cn(
        "h-12",
        "sticky top-0 z-panel flex items-end border-b border-border pb-2.5",
        !flush && "px-2",
        "before:absolute before:-inset-x-4 before:inset-y-0 before:-z-10 before:bg-background",
      )}
    >
      <!-- Keyed, with no presence wrapper: the key change unmounts the old date and
           mounts the new one, which plays the intro. -->
      {#key current.id}
        <div in:dateIn={{ duration: 220 }} class="flex flex-1 items-end justify-between gap-3">
          <span aria-hidden="true" class="text-lg tracking-tight"
            ><span class="font-medium text-foreground">{current.date}</span><!-- {" "}: the source's own space before the slash, which Svelte would trim. -->
            <span class="text-muted-foreground">{" "}/ {current.day}</span></span
          >
          {#if current.meta}{@render current.meta()}{/if}
        </div>
      {/key}
    </div>

    <!-- `isolate`: rows raise their own hover background, and this keeps those
         layers inside the list, under the sticky date. -->
    <div bind:this={list} class="isolate relative -mt-12" style:height="{virtualizer.totalSize}px">
      {#each runs as run (run.dayId)}
        {@const day = days.get(run.dayId)}
        {@const heading = run.items[0] && items[run.items[0].index]?.kind === "day"}
        {@const rows = heading ? run.items.slice(1) : run.items}
        <section aria-label={day ? `${day.date}, ${day.day}` : undefined} class="contents">
          {#if heading && day}
            {@const first = run.items[0]!}
            <div
              data-index={first.index}
              data-day={run.dayId}
              use:virtualizer.measure={first.index}
              class="absolute inset-x-0 top-0"
              style:transform="translateY({first.start}px)"
            >
              <div class={cn(first.index !== 0 && "pt-10")}>
                <h2
                  class={cn(
                    "h-12",
                    "flex items-end justify-between gap-3 border-b border-border pb-2.5",
                    !flush && "px-2",
                  )}
                >
                  <span class="text-lg tracking-tight"
                    ><span class="font-medium text-foreground">{day.date}</span><span class="text-muted-foreground">&nbsp;/ {day.day}</span></span
                  >
                  {#if day.meta}{@render day.meta()}{/if}
                </h2>
              </div>
            </div>
          {/if}
          {#if rows.length > 0}
            <div role="list" class="contents">
              {#each rows as v (v.key)}
                {@const item = items[v.index]}
                {@const where = item?.kind === "row" ? placeOfRow.get(item.key) : undefined}
                {#if item?.kind === "row"}
                  <div
                    data-index={v.index}
                    role="listitem"
                    aria-posinset={where?.pos}
                    aria-setsize={where?.size}
                    use:virtualizer.measure={v.index}
                    class="absolute inset-x-0 top-0"
                    style:transform="translateY({v.start}px)"
                  >
                    <!-- `py-1`: a selected or hovered row's fill sits inside the hairlines. -->
                    <div class="border-b border-border-subtle py-1">
                      {@render renderRow(item.data)}
                    </div>
                  </div>
                {/if}
              {/each}
            </div>
          {/if}
        </section>
      {/each}
    </div>
    {#if endSpace}
      <div aria-hidden="true" data-slot="timeline-calendar-end" style:height="{endHeight}px"></div>
    {/if}
  </div>
{/if}
