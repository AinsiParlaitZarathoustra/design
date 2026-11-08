<script lang="ts">
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { getToastManager, setToastItem } from "./toast-context";
  import type { ToastItem } from "./toast-types";

  /**
   * One toast in the stack, ported from Base UI's `Toast.Root` + `toast.tsx`'s
   * `Toast`. It is anchored bottom right, `--toast-index` back from the front:
   * each toast behind the first is scaled down and peeks out by `--peek`, and
   * the whole stack is cut to the frontmost toast's height. The surface is a
   * neutral popover; the type colours only the glyph.
   */
  interface Props {
    /** The item, from a `ToastList` over the manager's `toasts`. */
    toast: ToastItem;
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { toast, class: className, children, ...rest }: Props = $props();

  const manager = getToastManager();

  let element = $state<HTMLElement | null>(null);
  const index = $derived(Math.max(0, manager.toasts.findIndex((item) => item.id === toast.id)));
  const offset = $derived(index * manager.frontmostHeight);

  // It enters from below (translateY 150%) on the transform transition: the
  // starting style is held for a frame, then released.
  let starting = $state(true);
  $effect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => (starting = false));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  });

  // Its own height, measured with the stack's clamp lifted: every toast behind
  // the frontmost is cut to `--toast-frontmost-height`, so the clamp has to come
  // off for the measurement to be its natural height. Base UI's `ToastRoot`
  // measures at mount and again whenever the content resizes or its text
  // changes (`ToastContent` observes it), so this does the same, and measures
  // once the webfonts have loaded, since the text can wrap differently before.
  function measure() {
    const node = element;
    if (!node) return;
    const previous = node.style.height;
    node.style.height = "auto";
    const height = node.offsetHeight;
    node.style.height = previous;
    if (height > 0) manager.setHeight(toast.id, height);
  }

  onMount(() => {
    measure();
    void document.fonts?.ready.then(measure);
    const node = element;
    if (!node || typeof ResizeObserver !== "function") return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(node);
    return () => observer.disconnect();
  });

  setToastItem({
    get toast() {
      return toast;
    },
    get index() {
      return index;
    },
    get titleId() {
      return `${toast.id}-title`;
    },
    get descriptionId() {
      return `${toast.id}-description`;
    },
  });

  const style = $derived(
    [
      "--toast-swipe-movement-x: 0px",
      "--toast-swipe-movement-y: 0px",
      `--toast-index: ${index}`,
      `--toast-offset-y: ${offset}px`,
      "z-index: calc(var(--z-toast) - var(--toast-index))",
      toast.height > 0 ? `--toast-height: ${toast.height}px` : null,
    ]
      .filter(Boolean)
      .join("; "),
  );
</script>

<div
  bind:this={element}
  data-type={toast.type}
  role="dialog"
  tabindex="0"
  aria-modal="false"
  data-slot="toast"
  aria-labelledby={toast.title ? `${toast.id}-title` : undefined}
  aria-describedby={toast.description ? `${toast.id}-description` : undefined}
  data-expanded={manager.expanded ? "" : undefined}
  data-starting-style={starting ? "" : undefined}
  {style}
  class={cn(
    "group/toast pointer-events-auto absolute right-0 bottom-0 w-full origin-bottom rounded-lg border border-border bg-popover text-foreground shadow-md will-change-transform outline-none select-none",
    "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
    "h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
    "[transition:transform_var(--duration-slow)_var(--ease-out-strong),opacity_var(--duration-slow)_var(--ease-out-strong),height_var(--duration-fast)_var(--ease-out-strong)]",
    "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
    "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
    "data-limited:opacity-0 data-starting-style:[transform:translateY(150%)]",
    "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
    "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
    "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
    "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
    "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
    "data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
    "data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
    "data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
    "data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
