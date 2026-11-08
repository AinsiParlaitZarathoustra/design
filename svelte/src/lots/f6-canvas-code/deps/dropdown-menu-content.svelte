<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import type { MenuState } from "./menu-state.svelte";
  import { POPUP_EXIT } from "./popup-motion";

  /**
   * The menu's popup: portalled to <body>, placed against the trigger on the
   * `side` and `align` the content asks for, and dismissed by Escape or a press
   * outside it (a press on the trigger is left to the trigger). The surface is
   * `menuContentVariants` as the source writes it.
   */
  interface Props {
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
    class?: string;
    children?: Snippet;
  }

  let { side = "bottom", align = "start", sideOffset = 4, alignOffset = 0, class: className, children }: Props =
    $props();

  const menu = getContext<MenuState>("dropdown-menu");

  let box = $state({ top: 0, left: 0 });

  // The popup is portalled and positioned by hand: its place is computed from
  // the trigger's box on open and on resize, and it is removed on close.
  function place(node: HTMLElement) {
    document.body.append(node);
    const update = () => {
      const trigger = menu.trigger;
      if (!trigger) return;
      const r = trigger.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let top = 0;
      let left = 0;
      if (side === "bottom") top = r.bottom + sideOffset;
      if (side === "top") top = r.top - sideOffset - node.offsetHeight;
      if (side === "bottom" || side === "top") {
        left = align === "end" ? r.right - node.offsetWidth : align === "center" ? r.left + r.width / 2 - node.offsetWidth / 2 : r.left + alignOffset;
      } else {
        top = align === "end" ? r.bottom - node.offsetHeight : align === "center" ? r.top + r.height / 2 - node.offsetHeight / 2 : r.top + alignOffset;
        left = side === "right" ? r.right + sideOffset : r.left - sideOffset - node.offsetWidth;
      }
      // The positioner rounds its place to whole pixels, as the source's does.
      top = Math.round(top);
      left = Math.round(left);
      left = Math.max(8, Math.min(left, vw - node.offsetWidth - 8));
      top = Math.max(8, Math.min(top, vh - node.offsetHeight - 8));
      box = { top, left };
    };
    // Read every frame, as the command list does: the page's own layout can
    // settle after the popup mounts.
    let frame = 0;
    let last = "";
    const track = () => {
      const trigger = menu.trigger;
      if (trigger) {
        const r = trigger.getBoundingClientRect();
        const key = `${r.left}|${r.top}|${r.width}|${r.height}|${node.offsetWidth}|${node.offsetHeight}`;
        if (key !== last) {
          last = key;
          update();
        }
      }
      frame = requestAnimationFrame(track);
    };
    frame = requestAnimationFrame(track);
    window.addEventListener("resize", update);
    const dismiss = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target || node.contains(target) || menu.trigger?.contains(target)) return;
      menu.close();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        menu.close();
        menu.trigger?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
      node.remove();
    };
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const items = Array.from(
      (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([data-disabled]), [role="menuitemradio"]:not([data-disabled])',
      ),
    );
    if (items.length === 0) return;
    event.preventDefault();
    const at = items.indexOf(document.activeElement as HTMLElement);
    const next = event.key === "ArrowDown" ? (at + 1) % items.length : (at - 1 + items.length) % items.length;
    items[next]?.focus();
  }

</script>

{#if menu.open}
  <div class="isolate z-popover fixed outline-none" style="top: {box.top}px; left: {box.left}px;" {@attach place}>
    <div
      data-slot="dropdown-menu-content"
      role="menu"
      tabindex="-1"
      data-side={side}
      data-align={align}
      onkeydown={onKeydown}
      class={cn(
        "max-h-(--available-height) min-w-[11rem] overflow-y-auto overflow-x-hidden",
        "rounded-lg p-0.5",
        "bg-popover border border-border text-foreground shadow-md",
        "origin-[var(--transform-origin)] animate-scale-in outline-none",
        POPUP_EXIT,
        className,
      )}
    >
      {@render children?.()}
    </div>
  </div>
{/if}
