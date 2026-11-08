<script lang="ts">
  import { getResizableGroup, KEY_STEP } from "./resizable.svelte";
  import { cn } from "../../../lib/utils";

  /**
   * The separator between two panes, ported from `ResizableHandle` in
   * `src/components/layout/resizable-split.tsx`. A 1px rule with an invisible
   * ~10px target across its axis; it lights while hovered or dragged.
   *
   * Keyboard, as the library: arrows move it by 5%, Home and End to the ends,
   * Enter collapses or expands the pane before it. Pointer drags move it by the
   * pixels travelled. A change the person made is committed once, when it ends.
   */
  interface Props {
    /** Inert and invisible, but still mounted. */
    hidden?: boolean;
    class?: string;
  }

  let { hidden = false, class: className }: Props = $props();

  const group = getResizableGroup();
  const horizontal = $derived(group.orientation === "horizontal");

  let el = $state<HTMLElement | null>(null);
  let dragging = $state(false);
  // The pane before this handle, by id: the handle's value is its size.
  let leftId = $state<string | null>(null);
  const valueNow = $derived(Math.round(leftId ? (group.layout[leftId] ?? 0) : 0));

  $effect(() => {
    const node = el;
    if (!node) return;
    leftId = (node.previousElementSibling as HTMLElement | null)?.dataset.paneId ?? null;
  });
  let last = 0;
  let moved = false;

  /** The panes either side of this handle, in the DOM. */
  function neighbours(): { left: string; right: string } | null {
    const node = el;
    if (!node) return null;
    const before = node.previousElementSibling as HTMLElement | null;
    const after = node.nextElementSibling as HTMLElement | null;
    const left = before?.dataset.paneId;
    const right = after?.dataset.paneId;
    if (!left || !right) return null;
    return { left, right };
  }

  function nudge(delta: number) {
    const pair = neighbours();
    if (!pair) return false;
    return group.moveSeparator(pair.left, pair.right, delta);
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.defaultPrevented) return;
    const forward = horizontal ? "ArrowRight" : "ArrowDown";
    const back = horizontal ? "ArrowLeft" : "ArrowUp";
    let changed = false;
    switch (event.key) {
      case forward:
        event.preventDefault();
        changed = nudge(KEY_STEP);
        break;
      case back:
        event.preventDefault();
        changed = nudge(-KEY_STEP);
        break;
      case "End":
        event.preventDefault();
        changed = nudge(100);
        break;
      case "Home":
        event.preventDefault();
        changed = nudge(-100);
        break;
      case "Enter": {
        event.preventDefault();
        const pair = neighbours();
        if (!pair) break;
        if (group.isCollapsed(pair.left)) group.expand(pair.left);
        else group.collapse(pair.left);
        changed = true;
        break;
      }
      default:
        return;
    }
    if (changed) group.commit();
  }

  function onpointerdown(event: PointerEvent) {
    if (event.button !== 0 || hidden) return;
    event.preventDefault();
    dragging = true;
    moved = false;
    last = horizontal ? event.clientX : event.clientY;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  function onpointermove(event: PointerEvent) {
    if (!dragging) return;
    const at = horizontal ? event.clientX : event.clientY;
    const travelled = at - last;
    last = at;
    if (travelled === 0 || group.axisPx <= 0) return;
    moved = nudge((travelled / group.axisPx) * 100) || moved;
  }

  function onpointerup(event: PointerEvent) {
    if (!dragging) return;
    dragging = false;
    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
    if (moved) group.commit();
    moved = false;
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<div
  bind:this={el}
  role="separator"
  tabindex="0"
  aria-orientation={horizontal ? "vertical" : "horizontal"}
  aria-valuenow={valueNow}
  aria-valuemin={0}
  aria-valuemax={100}
  data-slot="resizable-handle"
  data-orientation={group.orientation}
  data-separator={dragging ? "active" : "inactive"}
  class={cn(
    "relative shrink-0 bg-border",
    "transition-colors duration-fast ease-out-strong",
    "hover:bg-primary data-[separator=active]:bg-primary",
    "after:absolute after:content-['']",
    horizontal
      ? "w-px cursor-col-resize after:inset-y-0 after:-left-1 after:w-2.5"
      : "h-px cursor-row-resize after:inset-x-0 after:-top-1 after:h-2.5",
    hidden && "pointer-events-none invisible",
    className,
  )}
  {onkeydown}
  {onpointerdown}
  {onpointermove}
  {onpointerup}
  onpointercancel={onpointerup}
></div>
