<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { getToastManager } from "./toast-context";

  /**
   * Where the stack sits: bottom right (full width on a phone), on the named
   * `toast` layer. It is the live region — one polite region for the whole
   * stack, so each notice is read once. Hovering or focusing the stack unfolds
   * it, which is what lets a back toast be read or dismissed.
   */
  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const manager = getToastManager();
  // Every toast other than the frontmost is cut to this height, so the stack
  // reads as one card with edges behind it.
  const frontmost = $derived(manager.frontmostHeight);
</script>

<div
  tabindex="-1"
  role="region"
  aria-live="polite"
  aria-atomic="false"
  aria-relevant="additions text"
  aria-label="Notifications"
  data-slot="toast-viewport"
  class={cn(
    "pointer-events-none fixed inset-x-4 bottom-4 z-toast mx-auto w-auto max-w-sm outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full",
    className,
  )}
  style={frontmost > 0 ? `--toast-frontmost-height: ${frontmost}px;` : undefined}
  onpointerenter={() => (manager.expanded = true)}
  onpointerleave={() => (manager.expanded = false)}
  onfocusin={() => (manager.expanded = true)}
  onfocusout={() => (manager.expanded = false)}
  {...rest}
>
  {@render children?.()}
</div>
