import { getContext, setContext } from "svelte";

/**
 * The split's arithmetic and state, ported from react-resizable-panels v4 as
 * the oracle uses it (`src/components/layout/resizable-split.tsx`). Sizes are
 * percentages of the group's axis. A string is a percentage (`"15"` is 15%),
 * a number is pixels (`15` is 15px), as in v4.
 *
 * The split keeps nothing: the app hands `defaultLayout` in and hears a user
 * change through `onLayoutCommit`. A layout the split settled on by itself (a
 * pane mounting, the window resizing) is not reported.
 */

export type ResizableOrientation = "horizontal" | "vertical";

/** A split's sizes, keyed by pane id, in percent. */
export type ResizableLayout = Record<string, number>;

/** A size as the app writes it: a string is percent, a number is pixels. */
export type ResizableSize = number | string;

export interface ResizablePaneConfig {
  id: string;
  defaultSize?: ResizableSize;
  minSize?: ResizableSize;
  maxSize?: ResizableSize;
  collapsible?: boolean;
  collapsedSize?: ResizableSize;
}

/** The imperative handle a pane writes into `panelRef.current`. */
export interface ResizablePanelHandle {
  collapse(): void;
  expand(): void;
  isCollapsed(): boolean;
  getSize(): { asPercentage: number };
}

/** The size a pane reports to `onResize`. */
export interface ResizablePaneSize {
  asPercentage: number;
}

/** A keyboard step: an arrow key moves a separator by this many percent. */
export const KEY_STEP = 5;

/** A size as a percentage of the axis, or `fallback` when there is no axis yet. */
export function toPercent(size: ResizableSize | undefined, axisPx: number, fallback: number): number {
  if (size === undefined) return fallback;
  if (typeof size === "string") return Number.parseFloat(size);
  return axisPx > 0 ? (size / axisPx) * 100 : fallback;
}

/** The lowest a pane may sit at, its highest, and its collapsed size if it may collapse. */
function bounds(config: ResizablePaneConfig | undefined, axisPx: number) {
  return {
    min: toPercent(config?.minSize, axisPx, 0),
    max: toPercent(config?.maxSize, axisPx, 100),
    collapsed: config?.collapsible ? toPercent(config.collapsedSize, axisPx, 0) : null,
  };
}

/**
 * Move the separator between two neighbouring panes by `delta` percent. The
 * pair's total is kept; each side is held to its bounds, and a collapsible side
 * snaps to its collapsed size once the drag is past the midpoint of the way.
 */
export function moveSeparator(
  layout: ResizableLayout,
  left: ResizablePaneConfig | undefined,
  leftId: string,
  right: ResizablePaneConfig | undefined,
  rightId: string,
  delta: number,
  axisPx: number,
): ResizableLayout {
  const a = layout[leftId] ?? 0;
  const b = layout[rightId] ?? 0;
  const total = a + b;
  const lb = bounds(left, axisPx);
  const rb = bounds(right, axisPx);

  let next = a + delta;
  if (next < lb.min) {
    next = lb.collapsed !== null && next <= (lb.collapsed + lb.min) / 2 ? lb.collapsed : lb.min;
  }
  const rightSize = total - next;
  if (rightSize < rb.min) {
    next =
      rb.collapsed !== null && rightSize <= (rb.collapsed + rb.min) / 2
        ? total - rb.collapsed
        : total - rb.min;
  }
  next = Math.min(Math.max(next, 0), total);
  next = Math.min(Math.max(next, total - rb.max), lb.max);
  return { ...layout, [leftId]: next, [rightId]: total - next };
}

export function layoutChanged(a: ResizableLayout, b: ResizableLayout): boolean {
  return Object.keys(b).some((key) => Math.abs((a[key] ?? 0) - (b[key] ?? 0)) > 1e-9);
}

/**
 * One split's state. Panes and handles read it from context; the split owns
 * the layout, the axis and the change reports.
 */
export class ResizableGroup {
  readonly orientation: ResizableOrientation;
  readonly id: string;
  layout = $state<ResizableLayout>({});
  axisPx = $state(0);
  /** The pane ids in DOM order; set by the split when it lays out. */
  order: string[] = [];
  private configs = new Map<string, ResizablePaneConfig>();
  private listeners = new Map<string, ((size: ResizablePaneSize) => void) | undefined>();
  private expanded = new Map<string, number>();
  private started = false;
  private saved: ResizableLayout | undefined;
  private onCommit: ((layout: ResizableLayout) => void) | undefined;

  constructor(opts: {
    id: string;
    orientation: ResizableOrientation;
    defaultLayout?: ResizableLayout;
    onLayoutCommit?: (layout: ResizableLayout) => void;
  }) {
    this.id = opts.id;
    this.orientation = opts.orientation;
    this.saved = opts.defaultLayout;
    this.onCommit = opts.onLayoutCommit;
  }

  register(config: ResizablePaneConfig, onResize?: (size: ResizablePaneSize) => void): () => void {
    this.configs.set(config.id, config);
    this.listeners.set(config.id, onResize);
    return () => {
      this.configs.delete(config.id);
      this.listeners.delete(config.id);
    };
  }

  config(id: string): ResizablePaneConfig | undefined {
    return this.configs.get(id);
  }

  /** The panes in order, from the DOM, so a neighbour is the next pane along. */
  setOrder(ids: string[]): void {
    this.order = ids;
    if (!this.started && ids.length > 0) {
      this.started = true;
      this.layout = this.initial(ids);
      this.notify(this.layout, {});
    }
  }

  private initial(ids: string[]): ResizableLayout {
    const specified = ids.filter((id) => this.configs.get(id)?.defaultSize !== undefined);
    const free = ids.length - specified.length;
    const used = specified.reduce(
      (sum, id) => sum + toPercent(this.configs.get(id)!.defaultSize, this.axisPx, 0),
      0,
    );
    const share = free > 0 ? Math.max(0, 100 - used) / free : 0;
    const equal = 100 / ids.length;
    if (this.saved && ids.every((id) => id in this.saved!)) {
      const total = ids.reduce((sum, id) => sum + this.saved![id]!, 0) || 1;
      return Object.fromEntries(ids.map((id) => [id, (this.saved![id]! / total) * 100]));
    }
    const out: ResizableLayout = {};
    for (const id of ids) {
      const size = this.configs.get(id)?.defaultSize;
      out[id] = size !== undefined ? toPercent(size, this.axisPx, equal) : free > 0 ? share : equal;
    }
    return out;
  }

  setAxis(px: number): void {
    this.axisPx = px;
  }

  /** The pane after `id` in the order, or the one before it at the end. */
  neighbourOf(id: string): string | null {
    const at = this.order.indexOf(id);
    if (at < 0) return null;
    return this.order[at + 1] ?? this.order[at - 1] ?? null;
  }

  private notify(next: ResizableLayout, previous: ResizableLayout) {
    for (const id of Object.keys(next)) {
      if (Math.abs((next[id] ?? 0) - (previous[id] ?? 0)) > 1e-9 || !(id in previous)) {
        this.listeners.get(id)?.({ asPercentage: next[id] ?? 0 });
      }
    }
  }

  private apply(next: ResizableLayout) {
    const previous = this.layout;
    if (!layoutChanged(previous, next)) return false;
    this.layout = next;
    this.notify(next, previous);
    return true;
  }

  /** A separator dragged or nudged: move the pair by `delta` percent. */
  moveSeparator(leftId: string, rightId: string, delta: number): boolean {
    const next = moveSeparator(
      this.layout,
      this.configs.get(leftId),
      leftId,
      this.configs.get(rightId),
      rightId,
      delta,
      this.axisPx,
    );
    return this.apply(next);
  }

  /**
   * Move a pane to `percent`; its neighbour takes the difference. The pane may
   * sit on either side of the neighbour, so the sign of the move follows the
   * order.
   */
  resizePane(id: string, percent: number): boolean {
    const neighbour = this.neighbourOf(id);
    if (!neighbour) return false;
    const current = this.layout[id] ?? 0;
    const forward = this.order.indexOf(neighbour) > this.order.indexOf(id);
    return forward
      ? this.moveSeparator(id, neighbour, percent - current)
      : this.moveSeparator(neighbour, id, current - percent);
  }

  isCollapsed(id: string): boolean {
    const config = this.configs.get(id);
    if (!config?.collapsible) return false;
    return (this.layout[id] ?? 0) <= toPercent(config.collapsedSize, this.axisPx, 0) + 1e-9;
  }

  collapse(id: string): void {
    const config = this.configs.get(id);
    if (!config?.collapsible || this.isCollapsed(id)) return;
    this.expanded.set(id, this.layout[id] ?? 0);
    const target = toPercent(config.collapsedSize, this.axisPx, 0);
    this.resizePane(id, target);
  }

  expand(id: string): void {
    const config = this.configs.get(id);
    if (!config?.collapsible || !this.isCollapsed(id)) return;
    const remembered = this.expanded.get(id);
    const target = remembered ?? toPercent(config.minSize, this.axisPx, 0);
    this.resizePane(id, target);
  }

  /** A user change has finished: report the layout. */
  commit(): void {
    this.onCommit?.({ ...this.layout });
  }
}

const CONTEXT = Symbol("f5-resizable-split");

export function setResizableGroup(group: ResizableGroup): void {
  setContext(CONTEXT, group);
}

export function getResizableGroup(): ResizableGroup {
  const group = getContext<ResizableGroup | undefined>(CONTEXT);
  if (!group) throw new Error("ResizablePane and ResizableHandle must sit inside ResizableSplit");
  return group;
}
