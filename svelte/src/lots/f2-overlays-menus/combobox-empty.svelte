<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /**
   * The message for a combobox with no matching choice, ported from `ComboboxEmpty`.
   * It is hidden until the popup is marked `data-empty`.
   */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div
  data-slot="combobox-empty"
  class={cn(
    "hidden w-full justify-center py-2 text-center text-xs text-muted-foreground group-data-empty/combobox-content:flex",
    className,
  )}
>
  {@render children?.()}
</div>
