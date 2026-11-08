<script lang="ts">
  import type { Snippet } from "svelte";
  import { XIcon } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import IconButton from "../../ui/icon-button.svelte";
  import SheetPortal from "./sheet-portal.svelte";
  import SheetOverlay from "./sheet-overlay.svelte";
  import { getSheet } from "./sheet-context";

  /**
   * The sheet panel, ported from `SheetContent`: an edge-anchored panel on the
   * drawer layer, sliding and fading in and out, with a close button in its corner
   * unless `showCloseButton` is off.
   */
  interface Props {
    class?: string;
    side?: "top" | "right" | "bottom" | "left";
    showCloseButton?: boolean;
    children?: Snippet;
  }

  let { class: className, side = "right", showCloseButton = true, children }: Props = $props();
  const api = getSheet();
  let popupEl = $state<HTMLElement | null>(null);

  $effect(() => {
    api.setPopup(popupEl);
    return () => api.setPopup(null);
  });
</script>

<SheetPortal>
  <SheetOverlay />
  <div
    bind:this={popupEl}
    data-slot="sheet-content"
    data-side={side}
    role="dialog"
    aria-modal="true"
    aria-labelledby={api.hasTitle ? api.titleId : undefined}
    aria-describedby={api.hasDescription ? api.descriptionId : undefined}
    id={api.contentId}
    tabindex="-1"
    data-starting-style={api.starting ? "" : undefined}
    data-ending-style={api.ending ? "" : undefined}
    class={cn(
      "fixed z-drawer flex flex-col border-border bg-card text-xs text-foreground shadow-lg transition duration-slow ease-drawer data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
      className,
    )}
  >
    {@render children?.()}
    {#if showCloseButton}
      <IconButton
        data-slot="sheet-close"
        icon={XIcon}
        label="Close"
        size="sm"
        class="absolute top-2 right-2"
        onclick={() => api.setOpen(false)}
      />
    {/if}
  </div>
</SheetPortal>
