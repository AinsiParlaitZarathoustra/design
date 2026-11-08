<script lang="ts">
  import { cn } from "../lib/utils";
  import { splitGlyphCombo, platformKeys, detectKeyPlatform } from "../lib/combo";
  import Kbd from "./kbd.svelte";
  import type { KbdSize, KbdVariant } from "./kbd.svelte";

  /**
   * A glyph string ("⌘⇧F", "⌥Space") as keycaps: every modifier glyph is its
   * own cap, the remainder is one cap. Ported from `KbdCombo`.
   */
  interface Props {
    combo: string;
    platform?: "mac" | "other";
    variant?: KbdVariant;
    size?: KbdSize;
    class?: string;
  }

  let { combo, platform, variant = "default", size = "xs", class: className }: Props = $props();

  const resolved = $derived(platform ?? detectKeyPlatform());
  const keys = $derived(platformKeys(splitGlyphCombo(combo), resolved));
</script>

<div data-slot="kbd-group" class={cn("inline-flex items-center gap-1", className)}>
  {#each keys as key, index (index)}
    <Kbd {variant} {size} platform={resolved} text={key} />
  {/each}
</div>
