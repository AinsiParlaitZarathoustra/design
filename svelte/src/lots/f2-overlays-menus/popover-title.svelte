<script lang="ts">
  import type { Snippet } from "svelte";
  import { onDestroy } from "svelte";
  import { cn } from "../../lib/utils";
  import { getPopover } from "./popover-context";

  /** The popover's name. It labels the popup, and is registered so the popup names itself. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
  const popover = getPopover();
  popover.registerTitle(true);
  onDestroy(() => popover.registerTitle(false));
</script>

<h2
  id={popover.titleId}
  data-slot="popover-title"
  class={cn("label text-foreground", className)}
>
  {@render children?.()}
</h2>
