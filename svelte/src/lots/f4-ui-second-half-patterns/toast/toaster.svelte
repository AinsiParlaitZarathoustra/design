<script lang="ts">
  import type { Snippet } from "svelte";
  import { toast as defaultManager, type ToastManager } from "./toast-manager.svelte";
  import ToastProvider from "./toast-provider.svelte";
  import ToastPortal from "./toast-portal.svelte";
  import ToastViewport from "./toast-viewport.svelte";
  import ToastList from "./toast-list.svelte";

  /**
   * Transient notices, bottom right, on `z-toast` (port of `toast.tsx`'s
   * `Toaster`). Mount one, then `toast.add({ title, description, type })` — or
   * a manager of your own, so a story's seed never leaks into the next.
   */
  interface Props {
    toastManager?: ToastManager;
    children?: Snippet;
  }

  let { toastManager = defaultManager, children }: Props = $props();
</script>

<ToastProvider {toastManager}>
  {@render children?.()}
  <ToastPortal>
    <ToastViewport>
      <ToastList />
    </ToastViewport>
  </ToastPortal>
</ToastProvider>
