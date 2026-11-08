<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /**
   * A crumb you can go back to. The `render` prop of the React source (Base UI's
   * `useRender`) is not ported: no story renders a crumb as another element.
   */
  interface Props {
    href?: string;
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { href, class: className, children, ...rest }: Props = $props();
</script>

<a
  data-slot="breadcrumb-link"
  {href}
  class={cn("transition-colors duration-fast ease-out-strong hover:text-foreground", className)}
  {...rest}
>
  {@render children?.()}
</a>
