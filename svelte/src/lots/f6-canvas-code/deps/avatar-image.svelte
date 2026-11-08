<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * The photo face of an `Avatar`: drawn only once the image has loaded, so
   * the fallback shows while it loads or when it fails (Base UI's behaviour).
   */
  interface Props {
    src: string;
    alt: string;
    class?: string;
  }

  let { src, alt, class: className }: Props = $props();

  let loaded = $state(false);

  $effect(() => {
    loaded = false;
    const probe = new Image();
    probe.onload = () => (loaded = true);
    probe.src = src;
    return () => {
      probe.onload = null;
    };
  });
</script>

{#if loaded}
  <img
    data-slot="avatar-image"
    {src}
    {alt}
    class={cn("aspect-square size-full object-cover", className)}
  />
{/if}
