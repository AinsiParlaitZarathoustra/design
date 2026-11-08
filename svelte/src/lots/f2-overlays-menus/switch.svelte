<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { Check, Minus } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Icon from "../../ui/icon.svelte";

  /**
   * The house on/off control, ported from `switch.tsx` (`@base-ui/react/switch`).
   *
   * Off is the input fill, on is the primary ink, and the `after:` inset widens
   * the hit target past the 16px track. `mixed` is the indeterminate state a
   * setting has across a selection: the thumb sits centred, the track takes the
   * input fill, and assistive tech hears `aria-checked="mixed"`. Toggling a mixed
   * switch turns it on. `appearance="check"` draws no track: the whole row is the
   * control, with a check mark after its name when on.
   */
  interface Props extends Omit<HTMLButtonAttributes, "class" | "children" | "onclick"> {
    checked: boolean;
    onCheckedChange: (next: boolean) => void;
    disabled?: boolean;
    /** Indeterminate: settings that differ across a selection. */
    mixed?: boolean;
    size?: "sm" | "md";
    /** `track` (the default) is the sliding switch; `check` is the option row. */
    appearance?: "track" | "check";
    /** `check` only: the row's name, also the accessible name. */
    children?: Snippet;
    /** `check` only: a muted line under the name. */
    description?: Snippet;
    class?: string;
  }

  let {
    checked,
    onCheckedChange,
    disabled = false,
    mixed = false,
    size = "md",
    appearance = "track",
    children,
    description,
    class: className,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const nameId = `switch-name-${uid}`;
  const descriptionId = `switch-description-${uid}`;
  const labelled = $derived(appearance === "check" && children !== undefined && !rest["aria-label"]);

  function toggle() {
    onCheckedChange(mixed ? true : !checked);
  }
</script>

{#if appearance === "check"}
  <button
    type="button"
    role="switch"
    {disabled}
    aria-checked={mixed ? "mixed" : checked}
    aria-labelledby={labelled ? nameId : undefined}
    aria-describedby={description ? descriptionId : undefined}
    data-slot="switch"
    data-appearance="check"
    data-checked={!mixed && checked ? "" : undefined}
    data-unchecked={!mixed && !checked ? "" : undefined}
    data-mixed={mixed ? "" : undefined}
    data-disabled={disabled ? "" : undefined}
    class={cn(
      // Desktop's option row: the whole row is the control.
      "flex w-full min-w-0 cursor-pointer items-start rounded-md px-2 py-1.5 text-left",
      "transition-colors duration-fast ease-out-strong hover:bg-element-hover",
      "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:hover:bg-transparent",
      className,
    )}
    onclick={toggle}
    {...rest}
  >
    <span class="min-w-0 flex-1">
      <span class="flex items-center gap-1.5 text-xs font-medium text-foreground">
        <span id={nameId}>{@render children?.()}</span>
        {#if mixed}
          <Icon icon={Minus} size="xs" class="text-muted-foreground" />
        {:else if checked}
          <Icon icon={Check} size="xs" data-slot="switch-check" class="text-primary" />
        {/if}
      </span>
      {#if description}
        <span id={descriptionId} class="mt-0.5 block text-3xs leading-snug text-muted-foreground">
          {@render description()}
        </span>
      {/if}
    </span>
  </button>
{:else}
  <button
    type="button"
    role="switch"
    {disabled}
    aria-checked={mixed ? "mixed" : checked}
    data-slot="switch"
    data-size={size}
    data-checked={!mixed && checked ? "" : undefined}
    data-unchecked={!mixed && !checked ? "" : undefined}
    data-mixed={mixed ? "" : undefined}
    data-disabled={disabled ? "" : undefined}
    class={cn(
      "group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-px",
      "transition-colors duration-fast ease-out-strong",
      "after:absolute after:-inset-2",
      "data-[size=md]:h-4 data-[size=md]:w-7",
      "data-[size=sm]:h-3.5 data-[size=sm]:w-6",
      // Off also gets an inset hairline: on a popover in a dark theme the input
      // fill alone is nearly the surface colour, and the track disappears.
      "data-checked:bg-primary data-unchecked:bg-input data-unchecked:ring-1 data-unchecked:ring-border data-unchecked:ring-inset",
      "data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    onclick={toggle}
    {...rest}
  >
    <span
      data-slot="switch-thumb"
      data-checked={!mixed && checked ? "" : undefined}
      data-unchecked={!mixed && !checked ? "" : undefined}
      class={cn(
        "pointer-events-none block rounded-full bg-background",
        "transition-transform duration-fast ease-out-strong",
        "group-data-[size=md]/switch:size-3.5 group-data-[size=sm]/switch:size-3",
        "data-unchecked:translate-x-0",
        "group-data-[size=md]/switch:data-checked:translate-x-3",
        "group-data-[size=sm]/switch:data-checked:translate-x-2.5",
        // Centred: half the travel of the checked position.
        "group-data-[mixed]/switch:group-data-[size=md]/switch:translate-x-1.5",
        "group-data-[mixed]/switch:group-data-[size=sm]/switch:translate-x-1.25",
      )}
    ></span>
  </button>
{/if}
