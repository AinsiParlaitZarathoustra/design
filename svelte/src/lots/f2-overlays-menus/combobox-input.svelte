<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { ChevronDown, X } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import { buttonVariants } from "../../ui/button-variants";
  import { inputVariants } from "../../ui/input-variants";
  import { InputGroup, InputGroupAddon } from "../f1-primitives-forms/input-group";
  import { inputGroupButtonVariants } from "../f1-primitives-forms/input-group/input-group-variants";
  import { getComboboxStore, isInsidePopup } from "./combobox-store.svelte";

  /**
   * The combobox's text field, ported from `ComboboxInput`: an input group with
   * the field, a trigger that opens the list, and (when there is a choice) a clear
   * button. The trigger is out of the tab order, as Base UI's is when the input
   * opens the list from the keyboard.
   */
  interface Props extends Omit<HTMLInputAttributes, "class" | "children" | "value" | "size"> {
    class?: string;
    showTrigger?: boolean;
    showClear?: boolean;
    children?: Snippet;
  }

  let {
    class: className,
    disabled = false,
    showTrigger = true,
    showClear = false,
    children,
    ...rest
  }: Props = $props();

  const store = getComboboxStore();
  store.setInputInsidePopup(isInsidePopup());
  const off = $derived(disabled || store.disabled);
  // While the list is open and the field is outside it, the rest of the group is hidden from
  // assistive tech, as Base UI's modal focus manager hides it; a visually hidden Dismiss button
  // sits before the field.
  const othersHidden = $derived(store.open && !store.inputInsidePopup);
</script>

<InputGroup class={cn("w-auto", className)}>
  {#if othersHidden}
    <!-- Base UI's internal Dismiss: a visually hidden, unfocusable span with a button role. -->
    <!-- svelte-ignore a11y_interactive_supports_focus, a11y_click_events_have_key_events -->
    <span role="button" aria-label="Dismiss" class="sr-only" onclick={() => store.setOpen(false)}></span>
  {/if}
  <input
    {@attach (node: HTMLInputElement) => {
      store.inputEl = node;
      return () => {
        if (store.inputEl === node) store.inputEl = null;
      };
    }}
    data-slot="input-group-control"
    role="combobox"
    type="text"
    autocomplete="off"
    aria-autocomplete="list"
    aria-expanded={store.open}
    value={store.inputValue}
    disabled={off}
    oninput={(event) => store.typeQuery(event.currentTarget.value)}
    onkeydown={(event) => store.keydown(event)}
    onclick={() => store.openFromInput()}
    onblur={(event) => store.blurInput(event)}
    {...rest}
    class={cn(
      inputVariants({ size: "md" }),
      "flex-1 rounded-none border-0 bg-transparent focus:border-0 focus-ring-none",
      className,
    )}
  />
  <InputGroupAddon align="inline-end" aria-hidden={othersHidden ? "true" : undefined}>
    {#if showTrigger}
      <button
        {@attach (node: HTMLElement) => {
          store.triggerEl = node;
          return () => {
            if (store.triggerEl === node) store.triggerEl = null;
          };
        }}
        type="button"
        data-slot="combobox-trigger"
        data-size="icon-xs"
        aria-label="Show options"
        aria-haspopup="listbox"
        aria-expanded={store.open}
        data-pressed={store.open ? "" : undefined}
        data-disabled={off ? "" : undefined}
        disabled={off}
        tabindex={-1}
        onclick={() => store.toggle()}
        class={cn(
          buttonVariants({ variant: "ghost", size: "md" }),
          inputGroupButtonVariants({ size: "icon-xs" }),
          "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent",
          "[&_svg:not([class*='size-'])]:size-3.5",
        )}
      >
        <ChevronDown class="pointer-events-none size-3.5 text-muted-foreground" />
      </button>
    {/if}
    {#if showClear && store.hasSelection}
      <button
        type="button"
        data-slot="combobox-clear"
        data-size="icon-xs"
        aria-label="Clear"
        disabled={off}
        onclick={() => store.clear()}
        class={cn(
          buttonVariants({ variant: "ghost", size: "md" }),
          inputGroupButtonVariants({ size: "icon-xs" }),
        )}
      >
        <X class="pointer-events-none" />
      </button>
    {/if}
  </InputGroupAddon>
  {@render children?.()}
</InputGroup>
