<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { getToastItem } from "./toast-context";

  /**
   * The toast's second line (port of Base UI's `Toast.Description`): what
   * happened, in a sentence. It is what the root's `aria-describedby` points at.
   */
  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const item = getToastItem();
</script>

{#if item.toast.description || children}
  <p
    data-type={item.toast.type}
    data-slot="toast-description"
    id={item.descriptionId}
    class={cn("text-xs text-secondary-foreground", className)}
    {...rest}
  >
    {#if children}
      {@render children()}
    {:else}
      {item.toast.description}
    {/if}
  </p>
{/if}
