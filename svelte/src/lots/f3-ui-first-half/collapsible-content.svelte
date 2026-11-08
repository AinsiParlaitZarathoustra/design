<script lang="ts">
  import type { Snippet } from "svelte";
  import { getCollapsible } from "./collapsible-context";

  /** The panel. Mounted only while open, as Base UI leaves it out of the DOM when closed. */
  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const state = getCollapsible();
</script>

{#if state.open}
  <div
    id={state.panelId}
    data-open=""
    data-slot="collapsible-content"
    style="--collapsible-panel-height: auto; --collapsible-panel-width: auto; animation-name: none;"
    class={className}
    {...rest}
  >
    {@render children?.()}
  </div>
{/if}
