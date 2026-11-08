<script lang="ts">
  import Button from "../../../src/ui/button.svelte";
  import {
    createToastManager,
    useToastManager,
  } from "../../../src/lots/f4-ui-second-half-patterns/toast/toast-manager.svelte";
  import type { ToastSeed } from "../../../src/lots/f4-ui-second-half-patterns/toast/toast-types";
  import Toaster from "../../../src/lots/f4-ui-second-half-patterns/toast/toaster.svelte";
  import Toast from "../../../src/lots/f4-ui-second-half-patterns/toast/toast.svelte";
  import ToastAction from "../../../src/lots/f4-ui-second-half-patterns/toast/toast-action.svelte";
  import ToastClose from "../../../src/lots/f4-ui-second-half-patterns/toast/toast-close.svelte";
  import ToastContent from "../../../src/lots/f4-ui-second-half-patterns/toast/toast-content.svelte";
  import ToastDescription from "../../../src/lots/f4-ui-second-half-patterns/toast/toast-description.svelte";
  import ToastPortal from "../../../src/lots/f4-ui-second-half-patterns/toast/toast-portal.svelte";
  import ToastProvider from "../../../src/lots/f4-ui-second-half-patterns/toast/toast-provider.svelte";
  import ToastTitle from "../../../src/lots/f4-ui-second-half-patterns/toast/toast-title.svelte";
  import ToastViewport from "../../../src/lots/f4-ui-second-half-patterns/toast/toast-viewport.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  /**
   * The `Toaster` with its own manager, so each story starts empty and the
   * seeded toasts never leak into another story.
   */
  const manager = createToastManager();
  /** The `Composition` story drives the shared stack, as the source does. */
  const shared = useToastManager();

  const SEEDS: Record<string, ToastSeed[]> = {
    open: [{ title: "Session saved", description: "Refactor settings", type: "success" }],
    error: [
      {
        title: "Run failed",
        description: "The agent exited with code 1.",
        type: "error",
        action: "Retry",
      },
    ],
    loading: [{ title: "Indexing project…", type: "loading" }],
    "many-items": [
      { title: "Checkpoint saved", type: "info" },
      {
        title: "Rate limit close",
        description: "82% of this hour's budget used.",
        type: "warning",
      },
      { title: "Session shared", description: "Anyone in Atlas can open it.", type: "success" },
    ],
    "long-text": [
      {
        title: "The agent finished, but three of the checks it ran are still failing",
        description:
          "src/features/settings/components/settings-panel.tsx and two other files changed. Open the diff to review them before you share the session.",
        type: "warning",
        action: "Open diff",
      },
    ],
  };

  // Seeded at setup rather than from an effect: the stack is then in the very
  // first paint, exactly where the source's first layout measures it. (The
  // source seeds from an effect; a later mount would measure the webfont's
  // height instead of the fallback's and land the stack elsewhere.)
  // svelte-ignore state_referenced_locally: the scenario is fixed for the story instance.
  for (const seed of SEEDS[story] ?? []) manager.add({ ...seed, timeout: 0 });
  // svelte-ignore state_referenced_locally: the scenario is fixed for the story instance.
  if (story === "composition") {
    shared.add({ title: "Session archived", description: "Refactor settings", timeout: 0 });
  }
</script>

{#if story === "composition"}
  <!--
    The parts, composed by hand: `ToastProvider`, `ToastPortal`,
    `ToastViewport`, then a `Toast` per entry from `useToastManager`. This is
    what `Toaster` does; reach for it only to change the row's anatomy.
  -->
  <div class="min-h-64">
    <ToastProvider toastManager={shared}>
      <ToastPortal>
        <ToastViewport>
          {#each shared.toasts as item (item.id)}
            <Toast toast={item}>
              <ToastContent>
                <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                  <ToastTitle />
                  <ToastDescription />
                </div>
                <ToastAction>Undo</ToastAction>
                <ToastClose />
              </ToastContent>
            </Toast>
          {/each}
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  </div>
{:else}
  <div class="min-h-96">
    <Toaster toastManager={manager}>
      <Button
        variant="outline"
        onclick={() =>
          manager.add({
            title: "Session saved",
            description: "Refactor settings",
            type: "success",
          })}>Show a toast</Button
      >
    </Toaster>
  </div>
{/if}
