<script lang="ts" generics="T extends string">
  import { untrack } from "svelte";
  import { Check, ChevronDown } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Positioner from "./positioner.svelte";
  import { createPresence, useDismiss } from "./popup-presence.svelte";
  import { POPUP_EXIT } from "./popup-motion";
  import type { SelectOption, SelectProps } from "./select-types";

  /**
   * The house select, ported from `select.tsx` (`@base-ui/react/select`). A select
   * is a menu of one choice: the popup is the dropdown surface, its items share the
   * dropdown vocabulary, and it opens with the chosen item focused and highlighted.
   * `bordered` is a form field; `ghost` sits in a toolbar or settings row.
   * Options are data. A press outside the popup, Escape, or a choice closes it;
   * a choice or Escape returns focus to the trigger once the exit has run.
   */

  let {
    value,
    onValueChange,
    options,
    disabled = false,
    placeholder,
    empty,
    id,
    name,
    required = false,
    size = "md",
    variant = "bordered",
    class: className,
    indicator = true,
    shape = "default",
    leading,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    "aria-invalid": ariaInvalid,
  }: SelectProps<T> = $props();

  const POPUP = [
    "max-h-(--available-height) min-w-(--anchor-width) overflow-y-auto overflow-x-hidden",
    "rounded-lg p-0.5",
    "bg-popover border border-border text-foreground shadow-md",
    "origin-[var(--transform-origin)] animate-scale-in outline-none",
    POPUP_EXIT,
  ];
  const ITEM = [
    "relative flex cursor-pointer items-center gap-2 rounded py-1 pr-2 pl-7",
    "text-xs select-none outline-none",
    "text-secondary-foreground",
    "focus:bg-element-hover focus:text-foreground",
    "data-selected:text-foreground",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  ];

  const uid = $props.id();
  const popupId = `select-popup-${uid}`;
  const presence = createPresence();

  let open = $state(false);
  let trigger = $state<HTMLElement | null>(null);
  let popupEl = $state<HTMLElement | null>(null);
  let returnFocusOnUnmount = false;
  // How the list was opened: by ArrowUp (last row), by ArrowDown or a keyboard click (first row),
  // or by a pointer (null), which leaves focus on the popup when nothing is chosen.
  let openKey: "ArrowUp" | "ArrowDown" | null = null;
  // Set by Enter or Space on the trigger, read by the click they produce.
  let keyboardPress = false;

  const selected = $derived(
    value === null ? undefined : options.find((option) => option.value === value),
  );
  const shown = $derived(selected?.label ?? placeholder);

  function choose(next: SelectOption<T>) {
    onValueChange(next.value);
    setOpen(false);
  }

  function setOpen(next: boolean) {
    if (next === open) return;
    open = next;
  }

  function rows(): HTMLElement[] {
    if (!popupEl) return [];
    return Array.from(popupEl.querySelectorAll<HTMLElement>('[role="option"]')).filter(
      (row) => !row.hasAttribute("data-disabled"),
    );
  }

  $effect(() => {
    const isOpen = open;
    untrack(() => {
      if (isOpen) presence.show();
      else presence.hide();
    });
  });

  $effect(() => {
    if (!presence.mounted && returnFocusOnUnmount) {
      returnFocusOnUnmount = false;
      trigger?.focus({ preventScroll: true });
    }
  });

  // On opening, the chosen item takes focus (its highlight shows). With nothing chosen, a key
  // opens on the first row (the last for ArrowUp) and a pointer leaves focus on the popup.
  $effect(() => {
    if (!presence.mounted || !open) return;
    const frame = requestAnimationFrame(() => {
      const list = rows();
      const chosen = list.find((row) => row.getAttribute("aria-selected") === "true");
      const edge = openKey === "ArrowUp" ? list[list.length - 1] : list[0];
      (chosen ?? (openKey ? edge : undefined) ?? popupEl)?.focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(frame);
      if (popupEl?.contains(document.activeElement)) returnFocusOnUnmount = true;
    };
  });

  useDismiss({
    active: () => open,
    inside: (target) =>
      target instanceof Node && (!!trigger?.contains(target) || !!popupEl?.contains(target)),
    onDismiss: () => setOpen(false),
  });

  function handleTriggerKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") keyboardPress = true;
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    openKey = event.key;
    setOpen(true);
  }

  function handleListKeydown(event: KeyboardEvent) {
    const list = rows();
    const current = list.indexOf(document.activeElement as HTMLElement);
    // The list stops at its ends (no wrap), as Base UI's list does. From the popup itself,
    // before any row has focus, ArrowDown takes the first row and ArrowUp the last.
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        list[Math.min(current + 1, list.length - 1)]?.focus();
        return;
      case "ArrowUp":
        event.preventDefault();
        list[current < 0 ? list.length - 1 : Math.max(current - 1, 0)]?.focus();
        return;
      case "Home":
        event.preventDefault();
        list[0]?.focus();
        return;
      case "End":
        event.preventDefault();
        list[list.length - 1]?.focus();
        return;
      case "Tab":
        setOpen(false);
        return;
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const letter = event.key.toLowerCase();
      const ordered = [...list.slice(current + 1), ...list.slice(0, current + 1)];
      ordered.find((row) => row.textContent?.trim().toLowerCase().startsWith(letter))?.focus();
    }
  }

  function handleItemKeydown(event: KeyboardEvent, option: SelectOption<T>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    choose(option);
  }

  function hoverFocus(event: PointerEvent) {
    const row = event.currentTarget as HTMLElement;
    if (document.activeElement !== row) row.focus({ preventScroll: true });
  }

  const hiddenInput = $derived(name !== undefined || required);
</script>

<button
    {@attach (node: HTMLElement) => {
      trigger = node;
    }}
    {id}
    type="button"
    role="combobox"
    {disabled}
    aria-haspopup="listbox"
    aria-expanded={open}
    aria-controls={open ? popupId : undefined}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    aria-describedby={ariaDescribedby}
    aria-invalid={ariaInvalid}
    data-slot="select-trigger"
    data-size={size}
    data-variant={variant}
    data-shape={shape}
    data-popup-open={open ? "" : undefined}
    data-pressed={open ? "" : undefined}
    data-popup-side={open ? "bottom" : undefined}
    data-disabled={disabled ? "" : undefined}
    class={cn(
      "flex w-fit min-w-0 cursor-pointer items-center justify-between gap-1.5 rounded-md px-2",
      "data-[shape=pill]:rounded-full data-[shape=pill]:pr-2 data-[shape=pill]:pl-2.5",
      "text-xs whitespace-nowrap select-none outline-none",
      "transition-colors duration-fast ease-out-strong",
      "data-[size=md]:h-control-md data-[size=sm]:h-control-sm",
      "data-[variant=bordered]:border data-[variant=bordered]:border-border data-[variant=bordered]:bg-panel-input",
      "data-[variant=bordered]:text-foreground data-[variant=bordered]:hover:border-border-strong",
      "data-[variant=ghost]:text-secondary-foreground data-[variant=ghost]:hover:bg-element-hover data-[variant=ghost]:hover:text-foreground",
      "data-popup-open:bg-element-active",
      "data-disabled:cursor-not-allowed data-disabled:opacity-50",
      "aria-invalid:border-destructive",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      className,
    )}
    onclick={() => {
      // A keyboard click (Enter, Space) opens like ArrowDown; a pointer click does not.
      openKey = keyboardPress ? "ArrowDown" : null;
      keyboardPress = false;
      setOpen(!open);
    }}
    onkeydown={handleTriggerKeydown}
  >
    <span
      data-slot="select-value"
      class={cn(
        "flex min-w-0 items-center gap-1.5 truncate",
        !selected && "text-muted-foreground",
      )}
    >
      {#if leading}<span class="flex shrink-0 items-center text-muted-foreground">{@render leading()}</span>{/if}
      {#if selected?.icon}{@render selected.icon()}{/if}
      <span class="truncate">{shown}</span>
    </span>
    <ChevronDown class="size-3.5 text-muted-foreground" aria-hidden="true" />
  </button>
  {#if hiddenInput}
    <input type="hidden" {name} value={value ?? ""} {required} />
  {/if}

{#if presence.mounted}
  <Positioner anchor={trigger} side="bottom" align="start" sideOffset={4} class="isolate z-popover outline-none">
      <div
        bind:this={popupEl}
        id={popupId}
        data-slot="select-content"
        role={options.length === 0 ? "presentation" : "listbox"}
        tabindex="-1"
        data-ending-style={presence.ending ? "" : undefined}
        class={POPUP}
        onkeydown={handleListKeydown}
      >
        {#if options.length === 0 && empty !== undefined}
          <div data-slot="select-empty" class="px-2 py-1.5 text-xs text-muted-foreground">{empty}</div>
        {/if}
        {#each options as option (option.value)}
          {@const isSelected = option.value === value}
          <div
            role="option"
            tabindex={isSelected ? 0 : -1}
            aria-selected={isSelected}
            data-slot="select-item"
            data-selected={isSelected ? "" : undefined}
            class={cn(ITEM, !indicator && "pl-2")}
            onclick={() => choose(option)}
            onkeydown={(event) => handleItemKeydown(event, option)}
            onpointermove={hoverFocus}
          >
            {#if indicator}
              <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
                {#if isSelected}<Check class="size-3.5" />{/if}
              </span>
            {/if}
            {#if option.icon}{@render option.icon()}{/if}
            <span class="flex min-w-0 flex-col"><span>{option.label}</span>{#if option.description}<span class="caption text-muted-foreground">{option.description}</span>{/if}</span>
          </div>
        {/each}
      </div>
  </Positioner>
{/if}
