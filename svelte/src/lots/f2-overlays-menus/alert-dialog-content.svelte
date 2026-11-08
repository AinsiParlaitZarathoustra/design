<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import AlertDialogPortal from "./alert-dialog-portal.svelte";
  import AlertDialogOverlay from "./alert-dialog-overlay.svelte";
  import { getAlertDialog } from "./alert-dialog-context";

  /**
   * The dialog panel, ported from `AlertDialogContent`: a portal with the scrim
   * and the centred panel. `blur` frosts the page behind; `dismissOnBackdrop` puts
   * a transparent layer over the scrim that cancels on a click (a pointer path
   * only, hidden from assistive tech, which already has Cancel and Escape).
   */
  interface Props {
    class?: string;
    blur?: boolean;
    dismissOnBackdrop?: boolean;
    children?: Snippet;
  }

  let { class: className, blur = false, dismissOnBackdrop = false, children }: Props = $props();
  const api = getAlertDialog();
  let popupEl = $state<HTMLElement | null>(null);

  $effect(() => {
    api.setPopup(popupEl);
    return () => api.setPopup(null);
  });
</script>

<AlertDialogPortal>
  <AlertDialogOverlay {blur} />
  {#if dismissOnBackdrop}
    <div
      data-slot="alert-dialog-backdrop-close"
      aria-hidden="true"
      tabindex="-1"
      class="fixed inset-0 z-overlay cursor-default"
      onclick={() => api.setOpen(false)}
    ></div>
  {/if}
  <div
    bind:this={popupEl}
    data-slot="alert-dialog-content"
    role="alertdialog"
    aria-modal="true"
    aria-labelledby={api.hasTitle ? api.titleId : undefined}
    aria-describedby={api.hasDescription ? api.descriptionId : undefined}
    id={api.contentId}
    tabindex="-1"
    data-open={api.ending ? undefined : ""}
    data-closed={api.ending ? "" : undefined}
    class={cn(
      "fixed top-1/2 left-1/2 z-modal -translate-x-1/2 -translate-y-1/2",
      "flex w-full max-w-[min(26rem,calc(100vw-2rem))] flex-col gap-3 p-4",
      "rounded-xl border border-border bg-card text-foreground shadow-lg outline-none",
      "data-closed:animate-scale-out data-open:animate-scale-in",
      className,
    )}
  >
    {@render children?.()}
  </div>
</AlertDialogPortal>
