<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import type { ComboboxAnchor } from "./combobox-store.svelte";

  /**
   * The field of a multiple combobox, ported from `ComboboxChips`: chips and the
   * typed text, in one bordered box. `ref` receives the box, which anchors the
   * popup (see `useComboboxAnchor`).
   */
  interface Props {
    ref?: ComboboxAnchor;
    class?: string;
    children?: Snippet;
  }

  let { ref, class: className, children }: Props = $props();
</script>

<div
  {@attach (node: HTMLElement) => {
    if (!ref) return;
    ref.current = node;
    return () => {
      if (ref.current === node) ref.current = null;
    };
  }}
  data-slot="combobox-chips"
  class={cn(
    "flex min-h-(--control-md) flex-wrap items-center gap-1 rounded-sm border border-border bg-transparent px-2 py-0.5 text-xs transition-colors duration-fast ease-out-strong focus-within:border-border-strong has-data-[slot=combobox-chip]:px-1 has-aria-invalid:border-destructive",
    className,
  )}
>
  {@render children?.()}
</div>
