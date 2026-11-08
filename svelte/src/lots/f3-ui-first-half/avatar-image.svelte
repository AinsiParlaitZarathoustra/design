<script lang="ts">
  import { cn } from "../../lib/utils";
  import { getAvatar } from "./avatar-context";

  /**
   * The face. It is drawn only once the image has loaded: until then, or if
   * it fails, the fallback initials show instead.
   */
  interface Props {
    src: string;
    alt?: string;
    class?: string;
    [attribute: string]: unknown;
  }

  let { src, alt, class: className, ...rest }: Props = $props();

  const avatar = getAvatar();

  $effect(() => {
    const probe = new Image();
    avatar.setImageStatus("loading");
    probe.onload = () => avatar.setImageStatus("loaded");
    probe.onerror = () => avatar.setImageStatus("error");
    probe.src = src;
    return () => {
      probe.onload = null;
      probe.onerror = null;
    };
  });
</script>

{#if avatar.imageStatus === "loaded"}
  <img
    data-slot="avatar-image"
    {src}
    {alt}
    class={cn("aspect-square size-full object-cover", className)}
    {...rest}
  />
{/if}
