<script lang="ts">
  import type { Snippet } from "svelte";
  import { Spring } from "svelte/motion";
  import { cn } from "../../../lib/utils";
  import { getLinks } from "../deps/link";
  import { setSidebarState } from "./sidebar";

  /**
   * The left rail, ported from `Sidebar` in `src/components/shell/sidebar.tsx`.
   *
   * Three things make it one object rather than a list of links:
   *
   * 1. THE ACTIVE STATE IS ONE ELEMENT. A single pill sits behind whichever row
   *    is current and springs to the new row, rather than two backgrounds
   *    cross-fading. The React version shares a `layoutId`; here the rail
   *    measures the active row and animates the pill to it on `SPRING_PILL`.
   * 2. WIDTH IS A SPRING. The rail animates between 14rem and 3.25rem on
   *    `SPRING_RAIL`, in rem, so it follows the interface scale.
   * 3. CHILDREN HANG OFF A ROW. See `SidebarItem`.
   */
  interface Props {
    collapsed?: boolean;
    class?: string;
    children: Snippet;
  }

  let { collapsed = false, class: className, children }: Props = $props();

  const links = getLinks();
  let nav = $state<HTMLElement | null>(null);
  let active = $state<{ element: HTMLElement; owner: string } | null>(null);

  const RAIL = { stiffness: 420, damping: 41 };
  const PILL = { stiffness: 560, damping: 48 };

  const reduced = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  // The rail starts where it is: the first width is not a move.
  // svelte-ignore state_referenced_locally
  const rail = new Spring(collapsed ? 3.25 : 14, RAIL);
  $effect(() => {
    rail.set(collapsed ? 3.25 : 14, { instant: reduced() });
  });

  const pill = new Spring({ top: 0, left: 0, width: 0, height: 0 }, PILL);
  let pillShown = $state(false);

  function measure(): void {
    const node = nav;
    const row = active?.element;
    if (!node || !row) {
      pillShown = false;
      return;
    }
    const origin = node.getBoundingClientRect();
    const box = row.getBoundingClientRect();
    const next = {
      top: box.top - origin.top,
      left: box.left - origin.left,
      width: box.width,
      height: box.height,
    };
    // The first placement is not a move: it lands where the row is.
    const first = !pillShown;
    pillShown = true;
    void pill.set(next, { instant: first || reduced() });
  }

  $effect(() => {
    const node = nav;
    const row = active?.element;
    if (!node) return;
    measure();
    if (!row) return;
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    observer.observe(node);
    const onScroll = () => measure();
    node.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => {
      observer.disconnect();
      node.removeEventListener("scroll", onScroll, { capture: true });
    };
  });

  // Track the rail's own width changes too: the row moves with the spring.
  $effect(() => {
    rail.current;
    measure();
  });

  setSidebarState({
    get collapsed() {
      return collapsed;
    },
    get location() {
      return links.location;
    },
    setActive(element, owner) {
      if (element) active = { element, owner };
      else if (active?.owner === owner) active = null;
    },
  });
</script>

<nav
  bind:this={nav}
  data-slot="sidebar"
  data-panel=""
  data-collapsed={collapsed || undefined}
  aria-label="Main"
  style:width="{rail.current}rem"
  class={cn("relative z-panel flex h-full shrink-0 flex-col", className)}
>
  {#if pillShown}
    <span
      aria-hidden="true"
      data-slot="sidebar-pill"
      class="pointer-events-none absolute rounded-md bg-element-selected"
      style:top="{pill.current.top}px"
      style:left="{pill.current.left}px"
      style:width="{pill.current.width}px"
      style:height="{pill.current.height}px"
    ></span>
  {/if}
  {@render children()}
</nav>
