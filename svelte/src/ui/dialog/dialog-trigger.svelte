<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { getDialog } from "./context";

  interface Props extends Omit<HTMLButtonAttributes, "class" | "children"> {
    class?: string;
    /** Render another element (the Svelte form of Base UI's `render`). */
    child?: Snippet<[Record<string, unknown>]>;
    children?: Snippet;
  }

  let { class: className, child, children, onclick, ...rest }: Props = $props();
  const dialog = getDialog();

  const triggerProps: Record<string, unknown> = {
    ...rest,
    type: "button",
    class: className,
    "data-slot": "dialog-trigger",
    onclick: (event: MouseEvent) => {
      onclick?.(event as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
      if (event.defaultPrevented) return;
      dialog.open();
    },
  };
</script>

{#if child}
  {@render child(triggerProps)}
{:else}
  <button {...triggerProps}>{@render children?.()}</button>
{/if}
