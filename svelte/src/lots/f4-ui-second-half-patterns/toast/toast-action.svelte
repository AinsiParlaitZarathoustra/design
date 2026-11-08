<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { buttonVariants } from "../../../ui/button-variants";
  import { getToastItem } from "./toast-context";

  /**
   * The toast's action (port of Base UI's `Toast.Action`, rendered as
   * `Button variant="outline" size="sm"`): "Retry", "Undo", "Open diff". It
   * draws only when the stack's item carries one, or a snippet replaces it.
   */
  interface Props {
    class?: string;
    children?: Snippet;
    onclick?: (event: MouseEvent) => void;
    [attribute: string]: unknown;
  }

  let { class: className, children, onclick, ...rest }: Props = $props();

  const item = getToastItem();

  function press(event: MouseEvent) {
    item.toast.onAction?.();
    onclick?.(event);
  }
</script>

{#if item.toast.action || children}
  <button
    type="button"
    tabindex="0"
    data-slot="toast-action"
    data-type={item.toast.type}
    class={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0", className)}
    onclick={press}
    {...rest}
  >
    {#if children}
      {@render children()}
    {:else}
      {item.toast.action}
    {/if}
  </button>
{/if}
