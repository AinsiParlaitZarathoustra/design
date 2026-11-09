<script lang="ts">
  import { untrack } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import { getRadioGroup } from "./context";

  /**
   * One radio, ported from `RadioGroupItem` in `src/components/ui/radio-group.tsx`.
   * Base UI renders it as a `role="radio"` span, with a hidden native radio beside
   * it so a wrapping `<label>` can select it.
   */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children" | "role"> {
    value: string;
    disabled?: boolean;
    class?: string;
  }

  let { value, disabled: ownDisabled = false, class: className, ...rest }: Props = $props();

  const group = getRadioGroup();
  let el = $state<HTMLSpanElement | null>(null);
  let labelledBy = $state<string | undefined>(undefined);
  const id = untrack(() => `radio-item-${Math.random().toString(36).slice(2, 8)}`);

  const checked = $derived(group.value === value);
  const disabled = $derived(group.disabled || ownDisabled);
  // A disabled group keeps its tab stop, as Base UI's does: the checked radio
  // stays reachable (and announced as disabled); arrows and Space do nothing.
  const isTabStop = $derived(
    checked || (group.value === undefined && group.firstItem === el && el !== null),
  );

  // The wrapping label names the item, as Base UI links it.
  $effect(() => {
    const node = el;
    if (!node) return;
    const label =
      node.closest("label") ??
      (node.id ? document.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(node.id)}"]`) : null);
    if (!label) return;
    if (!label.id) label.id = `${node.id || id}-label`;
    labelledBy = label.id;
  });

  function onKeyDown(event: KeyboardEvent) {
    if (!el) return;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      group.step(el, 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      group.step(el, -1);
    }
  }
</script>

<span
  bind:this={el}
  role="radio"
  id={id}
  tabindex={ownDisabled ? -1 : isTabStop ? 0 : -1}
  aria-checked={checked}
  aria-disabled={disabled ? "true" : undefined}
  aria-labelledby={labelledBy}
  data-slot="radio-group-item"
  data-checked={checked ? "" : undefined}
  data-unchecked={checked ? undefined : ""}
  data-disabled={disabled ? "" : undefined}
  {...rest}
  onclick={(event) => {
    event.preventDefault();
    if (!disabled) group.select(value);
  }}
  onkeydown={onKeyDown}
  onkeyup={(event) => {
    if (event.key === " " && !disabled) group.select(value);
  }}
  class={cn(
    "relative flex size-3.5 shrink-0 items-center justify-center",
    "rounded-full border border-border-strong bg-panel-input",
    "transition-colors duration-fast ease-out-strong",
    "after:absolute after:-inset-x-2 after:-inset-y-2",
    "data-checked:border-primary data-checked:bg-primary",
    "data-disabled:cursor-not-allowed data-disabled:opacity-50",
    "aria-invalid:border-destructive",
    className,
  )}
>
  {#if checked}
    <span data-slot="radio-group-indicator" data-checked="" class="size-1.5 rounded-full bg-primary-foreground"></span>
  {/if}
</span>
<input
  type="radio"
  tabindex="-1"
  aria-hidden="true"
  style="clip-path: inset(50%); overflow: hidden; white-space: nowrap; border: 0px; padding: 0px; width: 1px; height: 1px; margin: -1px; position: fixed; top: 0px; left: 0px;"
  name={group.name}
  {value}
  checked={checked}
  disabled={disabled}
  onchange={() => group.select(value)}
/>
