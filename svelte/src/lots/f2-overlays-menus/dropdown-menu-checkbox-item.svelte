<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { Check } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import { menuRowMarkClass } from "./menu-row-mark";

  /**
   * A checkable row, ported from `DropdownMenuCheckboxItem`. Choosing it toggles
   * the mark and keeps the menu open. Controlled with `checked`, or uncontrolled
   * with `defaultChecked`.
   */
  interface Props {
    class?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    children?: Snippet;
  }

  let {
    class: className,
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    children,
  }: Props = $props();

  let internal = $state(untrack(() => defaultChecked));
  const value = $derived(checked ?? internal);

  function toggle() {
    if (disabled) return;
    const next = !value;
    internal = next;
    onCheckedChange?.(next);
  }
</script>

<div
  role="menuitemcheckbox"
  tabindex="-1"
  aria-checked={value}
  aria-disabled={disabled ? "true" : undefined}
  data-slot="dropdown-menu-checkbox-item"
  data-checked={value ? "" : undefined}
  data-disabled={disabled ? "" : undefined}
  class={cn(menuRowMarkClass, className)}
  onclick={toggle}
  onkeydown={(event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggle();
  }}
  onpointermove={(event) => {
    const row = event.currentTarget as HTMLElement;
    if (!disabled && document.activeElement !== row) row.focus({ preventScroll: true });
  }}
>
  <span class="pointer-events-none absolute left-2 inline-flex size-3 items-center justify-center">
    {#if value}
      <Check size={12} />
    {/if}
  </span>
  {@render children?.()}
</div>
