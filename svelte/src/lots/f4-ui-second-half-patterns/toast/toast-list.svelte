<script lang="ts">
  import { getToastManager } from "./toast-context";
  import Toast from "./toast.svelte";
  import ToastContent from "./toast-content.svelte";
  import ToastIcon from "./toast-icon.svelte";
  import ToastTitle from "./toast-title.svelte";
  import ToastDescription from "./toast-description.svelte";
  import ToastAction from "./toast-action.svelte";
  import ToastClose from "./toast-close.svelte";

  /**
   * The stack's rows, one `Toast` per item, in the manager's order (frontmost
   * first). This is the anatomy `Toaster` renders; a custom list composes the
   * same parts itself.
   */
  const manager = getToastManager();
</script>

{#each manager.toasts as item (item.id)}
  <Toast toast={item}>
    <ToastContent>
      <ToastIcon type={item.type} />
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <ToastTitle />
        <ToastDescription />
      </div>
      <ToastAction />
      <ToastClose />
    </ToastContent>
  </Toast>
{/each}
