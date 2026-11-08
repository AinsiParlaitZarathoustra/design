<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /** A run of keycaps, ported from `KbdGroup` in `ui/kbd.tsx`. Declared here until the keycap lot lands it. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div data-slot="kbd-group" class={cn("inline-flex items-center gap-1", className)}>
  {@render children?.()}
</div>
