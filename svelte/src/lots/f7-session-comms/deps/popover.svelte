<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * Local adapter for `Popover` / `PopoverTrigger` / `PopoverContent` from
   * `src/ui/popover.tsx` (lot f7 dependency, declared in the report).
   *
   * The trigger receives the props that open the popup (`onclick`,
   * `aria-expanded`); the content receives `close`. It opens on the trigger,
   * closes on Escape, on a pointer press outside, and on `close()`. The
   * content is anchored to the trigger, `side` and `align` as in Base UI.
   */
  interface Props {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger: Snippet<[{ onclick: () => void; "aria-expanded": boolean; "aria-haspopup": "dialog" | "menu" }]>;
    children: Snippet<[() => void]>;
    side?: "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    /** `dialog` for a popover, `menu` for the dropdown built on it. */
    role?: "dialog" | "menu";
    class?: string;
  }

  let {
    open = $bindable(false),
    onOpenChange,
    trigger,
    children,
    side = "bottom",
    align = "center",
    sideOffset = 4,
    role = "dialog",
    class: className,
  }: Props = $props();

  let root = $state<HTMLElement | null>(null);

  function set(next: boolean) {
    open = next;
    onOpenChange?.(next);
  }

  function close() {
    set(false);
  }

  function onWindowKeydown(event: KeyboardEvent) {
    if (open && event.key === "Escape") close();
  }

  function onWindowPointerdown(event: PointerEvent) {
    if (open && root && !root.contains(event.target as Node)) close();
  }

  const placement = $derived(
    [
      side === "top" ? `bottom: calc(100% + ${sideOffset}px)` : `top: calc(100% + ${sideOffset}px)`,
      align === "start"
        ? "left: 0"
        : align === "end"
          ? "right: 0"
          : "left: 50%; transform: translateX(-50%)",
    ].join("; "),
  );
</script>

<svelte:window onkeydown={onWindowKeydown} onpointerdown={onWindowPointerdown} />

<span bind:this={root} class="relative inline-flex">
  {@render trigger({
    onclick: () => set(!open),
    "aria-expanded": open,
    "aria-haspopup": role,
  })}
  {#if open}
    <span
      data-slot="popover-content"
      {role}
      style={placement}
      class={cn(
        "absolute z-popover rounded-lg border border-border bg-popover text-popover-foreground shadow-md",
        className,
      )}
    >
      {@render children(close)}
    </span>
  {/if}
</span>
