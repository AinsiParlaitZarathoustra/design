<script lang="ts" module>
  import type { Snippet } from "svelte";

  /**
   * One option of a `Segmented`. `label` is text, or a snippet (an icon beside
   * a word, a styled fragment); its text is the accessible name unless
   * `ariaLabel` is given. `iconOnly` draws only the icon; the label stays the
   * name and the tooltip.
   */
  export interface SegmentedOption<T extends string> {
    value: T;
    label?: string | Snippet;
    icon?: Snippet;
    count?: number | string;
    iconOnly?: boolean;
    ariaLabel?: string;
  }
</script>

<script lang="ts" generics="T extends string">
  import { tick } from "svelte";
  import { cn } from "../../lib/utils";

  /**
   * A segmented control, ported from `Segmented` in `src/ui/segmented.tsx`.
   * The options sit in one track with a hairline edge; the active one is a
   * thumb inside it. Radio-group semantics: one tab stop (the selected option,
   * or the first when `value` matches none), arrow keys move the selection,
   * Home and End jump to the ends.
   *
   * The thumb slides between options with a CSS transition on its box, where
   * React used a shared `motion` layout animation on a spring; the end state
   * is the same.
   */
  interface Props {
    value: T;
    onValueChange: (next: T) => void;
    options: readonly SegmentedOption<T>[];
    disabled?: boolean;
    size?: "sm" | "md";
    "aria-label": string;
    class?: string;
  }

  let {
    value,
    onValueChange,
    options,
    disabled = false,
    size = "md",
    class: className,
    "aria-label": ariaLabel,
  }: Props = $props();

  let track = $state<HTMLDivElement | null>(null);
  let buttons: (HTMLButtonElement | null)[] = [];
  let thumb = $state<{ left: number; top: number; width: number; height: number } | null>(null);
  let animated = $state(false);

  const selected = $derived(options.findIndex((option) => option.value === value));
  const tabStop = $derived(selected === -1 ? 0 : selected);

  // Place the thumb over the selected option, measured after the DOM settles.
  $effect(() => {
    void size;
    const current = selected;
    const element = track;
    const button = buttons[current];
    if (!element || !button || current === -1) {
      thumb = null;
      return;
    }
    const frame = element.getBoundingClientRect();
    const box = button.getBoundingClientRect();
    thumb = {
      left: box.left - frame.left - element.clientLeft,
      top: box.top - frame.top - element.clientTop,
      width: box.width,
      height: box.height,
    };
    if (!animated) void tick().then(() => (animated = true));
  });

  function move(from: number, to: number) {
    if (options.length === 0) return;
    const index = (to + options.length) % options.length;
    // Staying put on the selected option is a no-op; staying put with
    // nothing selected (Home on the first) selects it.
    if (index === from && index === selected) return;
    onValueChange(options[index].value);
    buttons[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent, index: number) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        move(index, index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        move(index, index - 1);
        break;
      case "Home":
        event.preventDefault();
        move(index, 0);
        break;
      case "End":
        event.preventDefault();
        move(index, options.length - 1);
        break;
    }
  }
</script>

<div
  bind:this={track}
  data-slot="segmented"
  role="radiogroup"
  aria-label={ariaLabel}
  aria-disabled={disabled || undefined}
  class={cn(
    "relative flex w-fit max-w-full items-center gap-0.5 rounded-full border border-border p-0.5",
    disabled && "cursor-not-allowed opacity-50",
    className,
  )}
>
  {#if thumb}
    <span
      aria-hidden="true"
      class={cn(
        "pointer-events-none absolute rounded-full bg-element-selected",
        animated && "transition-[left,top,width,height] duration-base ease-out-strong",
      )}
      style="left: {thumb.left}px; top: {thumb.top}px; width: {thumb.width}px; height: {thumb.height}px;"
    ></span>
  {/if}
  {#each options as option, index (option.value)}
    {@const active = option.value === value}
    {@const name =
      option.ariaLabel ??
      (option.iconOnly && typeof option.label === "string" ? option.label : undefined)}
    <button
      bind:this={buttons[index]}
      type="button"
      role="radio"
      aria-checked={active}
      aria-label={name}
      title={option.iconOnly ? name : undefined}
      tabindex={index === tabStop ? 0 : -1}
      {disabled}
      onclick={() => {
        if (!active) onValueChange(option.value);
      }}
      onkeydown={(event) => onKeyDown(event, index)}
      class={cn(
        "relative shrink-0 cursor-pointer rounded-full font-medium whitespace-nowrap outline-none",
        "transition-colors duration-fast ease-out-strong",
        "disabled:cursor-not-allowed",
        size === "sm" ? "h-control-xs text-2xs" : "h-control-sm text-xs",
        option.iconOnly
          ? size === "sm"
            ? "px-1"
            : "px-1.5"
          : size === "sm"
            ? "px-2"
            : "px-2.5",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <span class="relative flex items-center gap-1.5">
        {#if option.icon}{@render option.icon()}{/if}
        {#if !option.iconOnly && option.label !== undefined}
          {#if typeof option.label === "string"}{option.label}{:else}{@render option.label()}{/if}
        {/if}
        {#if !option.iconOnly && option.count !== undefined}
          <span
            class={cn(
              "rounded-full px-1 text-3xs tabular-nums",
              active ? "bg-element-active" : "bg-element-hover",
            )}
          >
            {option.count}
          </span>
        {/if}
      </span>
    </button>
  {/each}
</div>
