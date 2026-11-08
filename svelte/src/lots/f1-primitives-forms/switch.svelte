<script lang="ts" module>
  let nextId = 0;

  /** A page-unique id for the name and description of a `check` row. */
  function nextSwitchId(prefix: string): string {
    nextId += 1;
    return `${prefix}-${nextId}`;
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { Check, Minus } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Icon from "../../ui/icon.svelte";

  /**
   * The house on/off control, ported from `Switch` in `src/ui/switch.tsx`
   * (`@base-ui/react/switch`). Off is the input fill, on is the primary ink,
   * and the `after:` inset widens the hit target past the 16px track.
   *
   * `mixed` is the indeterminate state: the thumb sits centred, the track
   * takes the input fill, and assistive tech hears `aria-checked="mixed"`.
   * Toggling a mixed switch turns it on.
   *
   * `appearance="check"` draws no track: the whole row is the switch, its name
   * with a check mark after it when on. `description` is the muted line under
   * the name (a string here, where React took a node).
   */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children" | "onclick" | "role"> {
    checked: boolean;
    onCheckedChange: (next: boolean) => void;
    disabled?: boolean;
    mixed?: boolean;
    size?: "sm" | "md";
    appearance?: "track" | "check";
    children?: Snippet;
    description?: string;
    class?: string;
    /** The switch element, for a caller that drives it (a story's `play`). */
    ref?: HTMLSpanElement | null;
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
    ref = $bindable(null),
    ...rest
  }: Props = $props();

  const nameId = nextSwitchId("switch-name");
  const descriptionId = nextSwitchId("switch-description");

  // A mixed switch reads as off to the control, so the next press turns it on.
  const isOn = $derived(mixed ? false : checked);
  const labelled = $derived(children !== undefined && !rest["aria-label"]);

  const TRACK =
    "group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-px transition-colors duration-fast ease-out-strong after:absolute after:-inset-2 data-[size=md]:h-4 data-[size=md]:w-7 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-checked:bg-primary data-unchecked:bg-input data-unchecked:ring-1 data-unchecked:ring-border data-unchecked:ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-50";
  const CHECK =
    "flex w-full min-w-0 cursor-pointer items-start rounded-md px-2 py-1.5 text-left transition-colors duration-fast ease-out-strong hover:bg-element-hover data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:hover:bg-transparent";
</script>

<span
  bind:this={ref}
  role="switch"
  tabindex={disabled ? -1 : 0}
  aria-disabled={disabled ? "true" : undefined}
  data-slot="switch"
  data-appearance={appearance === "check" ? "check" : undefined}
  data-size={appearance === "track" ? size : undefined}
  data-mixed={mixed ? "" : undefined}
  data-checked={isOn ? "" : undefined}
  data-unchecked={isOn ? undefined : ""}
  data-disabled={disabled ? "" : undefined}
  aria-checked={mixed ? "mixed" : isOn}
  aria-labelledby={appearance === "check" && labelled ? nameId : undefined}
  aria-describedby={appearance === "check" && description ? descriptionId : undefined}
  {...rest}
  onclick={() => {
    if (!disabled) onCheckedChange(!isOn);
  }}
  onkeydown={(event) => {
    // Enter presses, Space releases: the keys a native button answers to.
    if (event.key === " ") event.preventDefault();
    if (event.key === "Enter" && !disabled) {
      event.preventDefault();
      onCheckedChange(!isOn);
    }
  }}
  onkeyup={(event) => {
    if (event.key === " " && !disabled) onCheckedChange(!isOn);
  }}
  class={cn(appearance === "check" ? CHECK : TRACK, className)}
>
  {#if appearance === "check"}
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
          {description}
        </span>
      {/if}
    </span>
  {:else}
    <span
      data-slot="switch-thumb"
      data-checked={isOn ? "" : undefined}
      data-unchecked={isOn ? undefined : ""}
      class={cn(
        "pointer-events-none block rounded-full bg-background transition-transform duration-fast ease-out-strong",
        "group-data-[size=md]/switch:size-3.5 group-data-[size=sm]/switch:size-3",
        "data-unchecked:translate-x-0",
        "group-data-[size=md]/switch:data-checked:translate-x-3",
        "group-data-[size=sm]/switch:data-checked:translate-x-2.5",
        "group-data-[mixed]/switch:group-data-[size=md]/switch:translate-x-1.5",
        "group-data-[mixed]/switch:group-data-[size=sm]/switch:translate-x-1.25",
      )}
    ></span>
  {/if}
</span>
<input
  type="checkbox"
  tabindex="-1"
  aria-hidden="true"
  style="clip-path: inset(50%); overflow: hidden; white-space: nowrap; border: 0px; padding: 0px; width: 1px; height: 1px; margin: -1px; position: fixed; top: 0px; left: 0px;"
  checked={isOn}
  {disabled}
/>
