<script lang="ts">
  import type { Snippet } from "svelte";

  /**
   * Moves the stack out of the page's flow and onto `document.body` (port of
   * Base UI's `Toast.Portal`), so no ancestor's `overflow` or `transform` can
   * clip or re-anchor a toast.
   */
  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return {
      destroy() {
        node.remove();
      },
    };
  }
</script>

<div use:portal data-slot="toast-portal" class={className} {...rest}>
  {@render children?.()}
</div>
