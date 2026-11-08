<script lang="ts">
  import type { Snippet } from "svelte";
  import { getCollapsible } from "./collapsible-context";

  /**
   * The row that opens the panel. A disabled trigger keeps focus but ignores
   * the click (`aria-disabled`, as Base UI draws it, rather than a native
   * `disabled` button).
   */
  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const state = getCollapsible();
</script>

<button
  type="button"
  tabindex={0}
  aria-disabled={state.disabled}
  aria-expanded={state.open}
  aria-controls={state.open ? state.panelId : undefined}
  data-panel-open={state.open ? "" : undefined}
  data-disabled={state.disabled ? "" : undefined}
  data-slot="collapsible-trigger"
  class={className}
  onclick={() => state.toggle()}
  {...rest}
>
  {@render children?.()}
</button>
