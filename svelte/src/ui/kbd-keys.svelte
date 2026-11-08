<script lang="ts">
  import { cn } from "../lib/utils";
  import { platformKeys, detectKeyPlatform } from "../lib/combo";
  import Kbd from "./kbd.svelte";
  import type { KbdSize, KbdVariant } from "./kbd.svelte";

  /** A list of keys as keycaps, the form `displayKeys` produces. */
  interface Props {
    keys: readonly string[];
    platform?: "mac" | "other";
    variant?: KbdVariant;
    size?: KbdSize;
    class?: string;
  }

  let { keys, platform, variant = "default", size = "xs", class: className }: Props = $props();

  const resolved = $derived(platform ?? detectKeyPlatform());
  const caps = $derived(platformKeys(keys, resolved));
</script>

<div data-slot="kbd-group" class={cn("inline-flex items-center gap-1", className)}>
  {#each caps as key, index (index)}
    <Kbd {variant} {size} platform={resolved} text={key} />
  {/each}
</div>
