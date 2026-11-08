<script lang="ts">
  import type { Snippet } from "svelte";
  import { Check } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import { menuRowMarkClass } from "./menu-row-mark";
  import { getRadioGroup } from "./menu-context";

  /** A row of a radio group. Choosing it selects its value and keeps the menu open. */
  interface Props {
    class?: string;
    value: string;
    disabled?: boolean;
    children?: Snippet;
  }

  let { class: className, value, disabled = false, children }: Props = $props();
  const group = getRadioGroup();
  const selected = $derived(group.value === value);

  function choose() {
    if (disabled) return;
    group.select(value);
  }
</script>

<div
  role="menuitemradio"
  tabindex="-1"
  aria-checked={selected}
  aria-disabled={disabled ? "true" : undefined}
  data-slot="dropdown-menu-radio-item"
  data-checked={selected ? "" : undefined}
  data-disabled={disabled ? "" : undefined}
  class={cn(menuRowMarkClass, className)}
  onclick={choose}
  onkeydown={(event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    choose();
  }}
  onpointermove={(event) => {
    const row = event.currentTarget as HTMLElement;
    if (!disabled && document.activeElement !== row) row.focus({ preventScroll: true });
  }}
>
  <span class="pointer-events-none absolute left-2 inline-flex size-3 items-center justify-center">
    {#if selected}
      <Check size={12} />
    {/if}
  </span>
  {@render children?.()}
</div>
