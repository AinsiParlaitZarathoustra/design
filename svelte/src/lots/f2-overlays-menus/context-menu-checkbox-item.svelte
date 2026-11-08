<script lang="ts">
  import type { Snippet } from "svelte";
  import { untrack } from "svelte";
  import { Check } from "lucide-svelte";
  import { cn } from "../../lib/utils";

  /**
   * A checkable row of the right-click menu, ported from `ContextMenuCheckboxItem`.
   * Choosing it toggles the mark and keeps the menu open.
   */
  interface Props {
    class?: string;
    inset?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    children?: Snippet;
  }

  let {
    class: className,
    inset = false,
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
  data-slot="context-menu-checkbox-item"
  data-inset={inset ? "" : undefined}
  data-checked={value ? "" : undefined}
  data-disabled={disabled ? "" : undefined}
  class={cn(
    "relative flex items-center gap-2 rounded-md py-1.5 pr-8 pl-7 text-sm",
    "cursor-default select-none outline-none",
    "text-secondary-foreground",
    "focus:bg-element-hover focus:text-foreground",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    className,
  )}
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
  <span class="pointer-events-none absolute left-2 inline-flex h-3 w-3 items-center justify-center">
    {#if value}
      <Check size={12} />
    {/if}
  </span>
  {@render children?.()}
</div>
