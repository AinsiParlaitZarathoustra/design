<script lang="ts">
  import type { Snippet } from "svelte";
  import { toast as defaultManager, type ToastManager } from "./toast-manager.svelte";
  import { setToastManager } from "./toast-context";

  /**
   * The stack's provider (port of Base UI's `Toast.Provider`): it hands the
   * manager down to the portal, the viewport and every toast. `Toaster` is
   * the whole composition; reach for the provider only to change the row.
   */
  interface Props {
    toastManager?: ToastManager;
    children?: Snippet;
  }

  let { toastManager = defaultManager, children }: Props = $props();

  setToastManager({
    get current() {
      return toastManager;
    },
  });
</script>

{@render children?.()}
