<script lang="ts" module>
  let nextId = 0;

  function nextCheckboxId(): string {
    nextId += 1;
    return `checkbox-${nextId}`;
  }
</script>

<script lang="ts">
  import { untrack } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { Check, Minus } from "lucide-svelte";
  import { cn } from "../../lib/utils";

  /**
   * A checkbox, ported from `Checkbox` in `src/components/ui/checkbox.tsx`
   * (`@base-ui/react/checkbox`). The control is a `role="checkbox"` span, as
   * Base UI renders it, with a visually hidden native input beside it so a
   * wrapping `<label>` can activate it.
   *
   * `indeterminate` draws the dash for a partial selection and reads as
   * `aria-checked="mixed"`. `checked` makes it controlled; without it the box
   * keeps its own state, starting at `defaultChecked`.
   */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children" | "role"> {
    checked?: boolean;
    defaultChecked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    name?: string;
    value?: string;
    onCheckedChange?: (next: boolean) => void;
    class?: string;
  }

  let {
    checked: controlled = $bindable(undefined),
    defaultChecked = false,
    indeterminate = false,
    disabled = false,
    name,
    value,
    onCheckedChange,
    class: className,
    ...rest
  }: Props = $props();

  const id = nextCheckboxId();
  let uncontrolled = $state(untrack(() => defaultChecked));
  let el = $state<HTMLSpanElement | null>(null);
  let labelledBy = $state<string | undefined>(undefined);

  const isChecked = $derived(controlled ?? uncontrolled);

  // The wrapping label names the control, as Base UI links it.
  $effect(() => {
    const label = el?.closest("label");
    if (!label) return;
    if (!label.id) label.id = `${id}-label`;
    labelledBy = label.id;
  });

  function toggle() {
    if (disabled) return;
    const next = !isChecked;
    if (controlled === undefined) uncontrolled = next;
    else controlled = next;
    onCheckedChange?.(next);
  }
</script>

<span
  bind:this={el}
  role="checkbox"
  tabindex={disabled ? -1 : 0}
  id={id}
  aria-checked={indeterminate ? "mixed" : isChecked}
  aria-disabled={disabled ? "true" : undefined}
  aria-labelledby={labelledBy}
  data-slot="checkbox"
  data-checked={isChecked ? "" : undefined}
  data-unchecked={!isChecked && !indeterminate ? "" : undefined}
  data-indeterminate={indeterminate ? "" : undefined}
  data-disabled={disabled ? "" : undefined}
  {...rest}
  onclick={(event) => {
    // The span sits in a `<label>`: stop the label re-clicking the hidden input.
    event.preventDefault();
    toggle();
  }}
  onkeydown={(event) => {
    if (event.key === " ") event.preventDefault();
  }}
  onkeyup={(event) => {
    if (event.key === " ") toggle();
  }}
  class={cn(
    "peer relative flex size-3.5 shrink-0 items-center justify-center",
    "rounded-sm border border-border-strong bg-panel-input",
    "transition-colors duration-fast ease-out-strong",
    // Widen the hit target without widening the box.
    "after:absolute after:-inset-x-2 after:-inset-y-2",
    "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground",
    "data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "group-has-disabled/field:opacity-50",
    "aria-invalid:border-destructive",
    className,
  )}
>
  {#if isChecked || indeterminate}
    <span data-slot="checkbox-indicator" class="grid place-content-center text-current">
      {#if indeterminate}
        <Minus class="size-3" strokeWidth={2.5} />
      {:else}
        <Check class="size-3" strokeWidth={2.5} />
      {/if}
    </span>
  {/if}
</span>
<input
  type="checkbox"
  tabindex="-1"
  aria-hidden="true"
  style="clip-path: inset(50%); overflow: hidden; white-space: nowrap; border: 0px; padding: 0px; width: 1px; height: 1px; margin: -1px; position: fixed; top: 0px; left: 0px;"
  checked={isChecked}
  {disabled}
  {name}
  {value}
  onchange={toggle}
/>
