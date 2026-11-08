<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { menuContentVariants } from "./menu-variants";
  import { portal } from "./portal";

  /**
   * Local adapter for `DropdownMenuContent` (`src/ui/dropdown-menu.tsx`:
   * `Portal > Positioner > Popup`, `@base-ui/react/menu`), lot f1 dependency,
   * declared in the report. The split button is its only caller, so it keeps
   * the one placement that component uses: below its anchor, aligned to the
   * anchor's end, in viewport coordinates as Base UI's positioner places it.
   *
   * The popup takes focus on opening; Escape and a press outside close it, and
   * focus that was inside returns to the trigger.
   */
  interface Props {
    open?: boolean;
    anchor: HTMLElement | null;
    trigger?: HTMLElement | null;
    id?: string;
    class?: string;
    sideOffset?: number;
    children: Snippet;
  }

  let {
    open = $bindable(false),
    anchor,
    trigger = null,
    id,
    class: className,
    sideOffset = 4,
    children,
  }: Props = $props();

  let popupEl = $state<HTMLElement | null>(null);
  let popupSize = $state<{ width: number; height: number } | null>(null);
  let returnFocus = false;

  const placement = $derived.by(() => {
    if (!open || !anchor || !popupSize) return null;
    const box = anchor.getBoundingClientRect();
    const padding = 5;
    const roomBelow = window.innerHeight - (box.top + box.height + sideOffset) - padding;
    const roomAbove = box.top - sideOffset - padding;
    const below = !(popupSize.height > roomBelow && roomAbove > roomBelow);
    const y = below ? box.top + box.height + sideOffset : box.top - sideOffset - popupSize.height;
    // Aligned to the end of the anchor, then kept inside the viewport.
    const wanted = box.left + box.width - popupSize.width;
    const x = Math.min(
      Math.max(wanted, padding),
      Math.max(padding, window.innerWidth - padding - popupSize.width),
    );
    return {
      x: Math.round(x),
      y: Math.round(y),
      origin:
        (below ? `100% -${sideOffset}px` : `100% calc(100% + ${sideOffset}px)`),
      side: below ? "bottom" : "top",
    };
  });

  $effect(() => {
    if (!open) {
      popupSize = null;
      return;
    }
    const element = popupEl;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const border = entry?.borderBoxSize?.[0];
      popupSize = border
        ? { width: border.inlineSize, height: border.blockSize }
        : { width: element.offsetWidth, height: element.offsetHeight };
    });
    observer.observe(element);
    return () => observer.disconnect();
  });

  // The popup takes the focus on opening, and hands it back when it closes.
  $effect(() => {
    if (!open) {
      if (returnFocus) {
        returnFocus = false;
        trigger?.focus({ preventScroll: true });
      }
      return;
    }
    const element = popupEl;
    if (!element) return;
    const frame = requestAnimationFrame(() => element.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(frame);
      if (element.contains(document.activeElement)) returnFocus = true;
    };
  });

  $effect(() => {
    if (!open) return;
    untrack(() => {
      const onPointer = (event: PointerEvent) => {
        const target = event.target;
        if (!(target instanceof Node)) return;
        if (popupEl?.contains(target) || anchor?.contains(target)) return;
        open = false;
      };
      const onKey = (event: KeyboardEvent) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        open = false;
      };
      document.addEventListener("pointerdown", onPointer, true);
      document.addEventListener("keydown", onKey, true);
      return () => {
        document.removeEventListener("pointerdown", onPointer, true);
        document.removeEventListener("keydown", onKey, true);
      };
    });
  });

  function rows(element: HTMLElement): HTMLElement[] {
    return Array.from(element.querySelectorAll<HTMLElement>('[role="menuitem"]')).filter(
      (row) => !row.hasAttribute("data-disabled"),
    );
  }

  function onkeydown(event: KeyboardEvent) {
    if (!popupEl) return;
    const all = rows(popupEl);
    const current = all.indexOf(document.activeElement as HTMLElement);
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        all[(current + 1) % all.length]?.focus();
        return;
      case "ArrowUp":
        event.preventDefault();
        all[current <= 0 ? all.length - 1 : current - 1]?.focus();
        return;
      case "Home":
        event.preventDefault();
        all[0]?.focus();
        return;
      case "End":
        event.preventDefault();
        all[all.length - 1]?.focus();
    }
  }
</script>

{#if open}
  <div
    use:portal
    class="isolate z-popover outline-none fixed left-0 top-0"
    style="transform: translate({placement?.x ?? 0}px, {placement?.y ??
      0}px); opacity: {placement ? 1 : 0}; --transform-origin: {placement?.origin ??
      '100% 0'};"
  >
    <div
      bind:this={popupEl}
      {id}
      role="menu"
      aria-orientation="vertical"
      tabindex="-1"
      data-side={placement?.side ?? "bottom"}
      data-align="end"
      data-slot="dropdown-menu-content"
      class={menuContentVariants({ className })}
      {onkeydown}
    >
      {@render children()}
    </div>
  </div>
{/if}
