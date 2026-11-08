<script lang="ts">
  import type { Snippet } from "svelte";
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
</script>

<div
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
