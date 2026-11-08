<script lang="ts" module>
  import type { Snippet } from "svelte";

  /**
   * One option of a `Segmented`. `label` is what it shows: text, or a snippet
   * (an icon beside a word, a styled fragment), whose text is its accessible
   * name unless `ariaLabel` is given. `ariaLabel` is the name (and an
   * `iconOnly` option's tooltip) when the label is not plain text or would read
   * badly aloud.
   *
   * `iconOnly` draws only the icon; the label stays the option's accessible
   * name and its tooltip. An icon-only option shows no text, so it needs a
   * name: a string `label`, or an `ariaLabel`.
   */
  export interface SegmentedOption<T extends string> {
    value: T;
    label?: string | Snippet;
    icon?: Snippet;
    /** A small tally after the label ("Unread 3"), on a quiet chip that lifts
     *  with the option when it is chosen. */
    count?: number | string;
    iconOnly?: boolean;
    ariaLabel?: string;
  }

  /** Props of a `Segmented` (`src/ui/segmented.tsx`). */
  export interface SegmentedProps<T extends string> {
    value: T;
    onValueChange: (next: T) => void;
    options: readonly SegmentedOption<T>[];
    disabled?: boolean;
    size?: "sm" | "md";
    "aria-label": string;
    class?: string;
  }
</script>

<script lang="ts" generics="T extends string">
  import { cn } from "../../lib/utils";

  /**
   * A segmented control, ported from `Segmented` in `src/ui/segmented.tsx`:
   * one choice among a few, all visible at once (theme mode, a density). The
   * options sit in ONE track with a hairline edge, and the active one is a
   * thumb that fills it.
   *
   * Radio-group semantics: one tab stop, arrow keys move the selection,
   * Home/End jump to the ends. The tab stop is the selected option, or the
   * first option when `value` matches none (a "Custom" range the track has no
   * preset for), so the group is always reachable by Tab.
   *
   * The source slides the thumb between options with a shared `motion`
   * `layoutId`; the port draws it in place, on the chosen option's own box, so
   * the end state is the source's without the spring.
   */
  let {
    value,
    onValueChange,
    options,
    disabled = false,
    size = "md",
    class: className,
    "aria-label": ariaLabel,
  }: SegmentedProps<T> = $props();

  let buttons: (HTMLButtonElement | null)[] = [];

  const selected = $derived(options.findIndex((option) => option.value === value));
  const tabStop = $derived(selected === -1 ? 0 : selected);

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
  data-slot="segmented"
  role="radiogroup"
  aria-label={ariaLabel}
  aria-disabled={disabled || undefined}
  class={cn(
    "flex w-fit max-w-full items-center gap-0.5 rounded-full border border-border p-0.5",
    disabled && "cursor-not-allowed opacity-50",
    className,
  )}
>
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
      disabled={disabled}
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
      {#if active}
        <span
          class="absolute inset-0 rounded-full bg-element-selected"
          style="opacity: 1;"
        ></span>
      {/if}
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
