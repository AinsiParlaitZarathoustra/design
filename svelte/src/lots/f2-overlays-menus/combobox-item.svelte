<script lang="ts">
  import type { Snippet } from "svelte";
  import { Check } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import { getComboboxStore } from "./combobox-store.svelte";

  /**
   * One choice in a combobox list, ported from `ComboboxItem`. It shows a check
   * when it is chosen, and takes the highlight of the pointer or the arrow keys.
   */
  interface Props {
    value: unknown;
    class?: string;
    children?: Snippet;
  }

  let { value, class: className, children }: Props = $props();

  const store = getComboboxStore();
  const selected = $derived(store.isSelected(value));
  const highlighted = $derived(store.isHighlighted(value));
</script>

<div
  role="option"
  tabindex={-1}
  aria-selected={selected}
  data-slot="combobox-item"
  data-selected={selected ? "" : undefined}
  data-highlighted={highlighted ? "" : undefined}
  onpointermove={() => store.highlight(value)}
  onclick={() => store.choose(value)}
  onkeydown={(event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    store.choose(value);
  }}
  class={cn(
    "relative flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1 pr-7 text-xs text-secondary-foreground outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-element-hover data-highlighted:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
    className,
  )}
>
  {@render children?.()}
  {#if selected}
    <span class="pointer-events-none absolute right-2 flex items-center justify-center">
      <Check class="pointer-events-none" />
    </span>
  {/if}
</div>
