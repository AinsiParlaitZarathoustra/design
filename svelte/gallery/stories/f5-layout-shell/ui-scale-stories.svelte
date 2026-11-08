<script lang="ts">
  import { onMount } from "svelte";
  import UiScaleControl from "../../../src/lots/f5-layout-shell/shell/ui-scale-control.svelte";
  import UiScalePanel from "../../../src/lots/f5-layout-shell/shell/ui-scale-panel.svelte";
  import { UI_SCALE_MIN } from "../../../src/lots/f5-layout-shell/shell/ui-scale";

  /**
   * The interface-scale stories, ported from `stories/components/shell/ui-scale.stories.tsx`.
   * `story` names the scenario. The source's `play` functions open the control
   * (or hover the stepper's hint) after mount, here as real DOM events.
   */
  interface Props {
    story: string;
  }

  let { story }: Props = $props();

  const CONTROL: Record<string, { scale: number; iconOnly?: boolean; open?: boolean }> = {
    default: { scale: 1 },
    open: { scale: 1, open: true },
    "icon-only": { scale: 1, iconOnly: true },
    "at-minimum": { scale: UI_SCALE_MIN, open: true },
  };

  const control = $derived(CONTROL[story]);
  // The value the stepper holds, as the source's `Stateful` wrapper does: it
  // starts at the scenario's scale once mounted.
  let value = $state(1.15);
  let root = $state<HTMLElement | null>(null);

  onMount(() => {
    value = CONTROL[story]?.scale ?? 1.15;
    if (!root) return;
    if (control?.open) {
      root.querySelector<HTMLElement>("button[aria-label^='Interface scale']")?.click();
    }
    if (story === "with-shortcuts") {
      const larger = root.querySelector<HTMLElement>("button[aria-label='Larger']");
      larger?.parentElement?.dispatchEvent(new MouseEvent("mouseenter"));
    }
  });
</script>

{#if story === "panel"}
  <div bind:this={root} class="w-60 rounded-lg border border-border bg-popover p-1">
    <UiScalePanel scale={value} onScaleChange={(next) => (value = next)} />
  </div>
{:else if story === "with-shortcuts"}
  <div bind:this={root} class="flex min-h-72 items-start pt-12">
    <div class="w-60 rounded-lg border border-border bg-popover p-1">
      <UiScalePanel
        scale={value}
        onScaleChange={(next) => (value = next)}
        shortcuts={{ decrease: "⌘-", increase: "⌘+" }}
      />
    </div>
  </div>
{:else}
  <div bind:this={root} class="flex min-h-96 justify-end">
    <UiScaleControl
      scale={value}
      onScaleChange={(next) => (value = next)}
      iconOnly={control?.iconOnly ?? false}
    />
  </div>
{/if}
