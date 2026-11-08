<script lang="ts">
  import Globe, { type GlobeMarker } from "../../../src/lots/f8-blocks-foundations/blocks/globe.svelte";

  interface Props {
    story?: string;
  }

  let { story = "globe-default" }: Props = $props();

  const ONE: GlobeMarker[] = [
    {
      id: "lisbon",
      location: [38.72, -9.14],
      delay: 0,
      status: { count: 1_204_118, unit: "tokens streaming through the Lisbon gateway" },
    },
  ];

  const PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  // NoWebgl: every getContext returns null, so the probe fails and cobe is never
  // fetched. Patched for this story's lifetime only.
  $effect(() => {
    if (story !== "globe-no-webgl") return;
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = () => null;
    return () => {
      HTMLCanvasElement.prototype.getContext = original;
    };
  });
</script>

{#snippet pixelFallback()}
  <img alt="" src={PIXEL} class="size-full rounded-full object-cover" />
{/snippet}

<div class="w-96">
  {#if story === "globe-empty"}
    <Globe markers={[]} />
  {:else if story === "globe-still"}
    <Globe speed={0} />
  {:else if story === "globe-long-text"}
    <Globe markers={ONE} speed={0} />
  {:else if story === "globe-custom-fallback"}
    <Globe fallback={pixelFallback} />
  {:else}
    <Globe />
  {/if}
</div>
