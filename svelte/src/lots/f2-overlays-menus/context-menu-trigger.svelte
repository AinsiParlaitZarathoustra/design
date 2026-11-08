<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { getMenu } from "./menu-context";

  /**
   * The area that opens the context menu on a right-click, at the pointer. The
   * browser's own menu is suppressed here.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
  const menu = getMenu();
</script>

<div
  data-slot="context-menu-trigger"
  class={cn(className)}
  oncontextmenu={(event) => {
    event.preventDefault();
    menu.openAt(event.clientX, event.clientY);
  }}
  {...rest}
>
  {@render children?.()}
</div>
