<script lang="ts">
  import { ImageOffIcon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import Spinner from "../../../components/ui/spinner.svelte";

  /**
   * An image or video, with its loading and failed states. `loadingLabel`
   * ("Loading image…") is shown under the spinner, as a status line that
   * assistive tech reads in the spinner's place; without it the spinner stands
   * alone, named "Loading".
   */
  interface Props {
    state: "loading" | "error" | "ready";
    src?: string;
    kind: "image" | "video";
    alt: string;
    loadingLabel?: string;
    class?: string;
  }

  let { state, src, kind, alt, loadingLabel, class: className }: Props = $props();
</script>

<div
  data-slot="canvas-media"
  class={cn(
    "size-full overflow-hidden rounded-xl border border-border-subtle bg-card transition-colors duration-fast",
    "group-data-selected/node:border-primary/60",
    className,
  )}
>
  {#if state === "error" || (state === "ready" && !src)}
    <div class="flex size-full flex-col items-center justify-center gap-1 text-muted-foreground">
      <Icon icon={ImageOffIcon} size="lg" />
      <span class="text-2xs">Media unavailable</span>
    </div>
  {:else if state === "loading"}
    <div class="flex size-full flex-col items-center justify-center gap-1 text-muted-foreground">
      {#if loadingLabel}
        <Spinner size="lg" label="" />
        <span role="status" class="text-2xs">{loadingLabel}</span>
      {:else}
        <Spinner size="lg" />
      {/if}
    </div>
  {:else if kind === "video"}
    <video src={src} controls aria-label={alt} class="size-full object-contain"></video>
  {:else}
    <img
      {src}
      {alt}
      draggable={false}
      class="size-full object-contain select-none [-webkit-user-drag:none]"
    />
  {/if}
</div>
