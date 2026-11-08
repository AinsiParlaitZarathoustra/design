<script lang="ts">
  import type { Snippet } from "svelte";
  import { onDestroy } from "svelte";
  import { cn } from "../../lib/utils";
  import { getPopover } from "./popover-context";

  /** The popover's muted line. It describes the popup, and is registered so the popup points at it. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
  const popover = getPopover();
  popover.registerDescription(true);
  onDestroy(() => popover.registerDescription(false));
</script>

<p
  id={popover.descriptionId}
  data-slot="popover-description"
  class={cn("caption", className)}
>
  {@render children?.()}
</p>
