<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { getToastItem } from "./toast-context";

  /**
   * The toast's title (port of Base UI's `Toast.Title`): the stack's item title
   * unless a snippet replaces it. It is what the toast announces, through the
   * root's `aria-labelledby`.
   */
  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const item = getToastItem();
</script>

{#if item.toast.title || children}
  <h2
    data-type={item.toast.type}
    data-slot="toast-title"
    id={item.titleId}
    class={cn("label text-foreground", className)}
    {...rest}
  >
    {#if children}
      {@render children()}
    {:else}
      {item.toast.title}
    {/if}
  </h2>
{/if}
