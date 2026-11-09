<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { getToastItem, getToastManager } from "./toast-context";

  /**
   * The row inside a toast (port of Base UI's `Toast.Content`): the glyph, the
   * title and description, with the action and the close at the right end. A
   * toast that is not in front hides its content while the stack is collapsed.
   */
  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const item = getToastItem();
  const manager = getToastManager();
  const behind = $derived(item.index > 0 && !manager.expanded);

  let node = $state<HTMLDivElement>();

  // Base UI's `ToastContent` measures the toast at mount, then again whenever its
  // own box resizes or its text changes. Its box follows the toast's set height,
  // so text that rewraps inside it does not trigger a new measurement.
  onMount(() => {
    item.recalculateHeight();
    if (!node || typeof ResizeObserver !== "function" || typeof MutationObserver !== "function") return;
    const resizeObserver = new ResizeObserver(() => item.recalculateHeight());
    const mutationObserver = new MutationObserver(() => item.recalculateHeight());
    resizeObserver.observe(node);
    mutationObserver.observe(node, { childList: true, subtree: true, characterData: true });
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  });
</script>

<div
  bind:this={node}
  data-slot="toast-content"
  data-behind={behind ? "" : undefined}
  data-expanded={manager.expanded ? "" : undefined}
  class={cn(
    "flex h-full items-center gap-2.5 overflow-hidden px-3 py-2.5 transition-opacity duration-slow ease-out-strong data-behind:opacity-0 data-expanded:opacity-100",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
