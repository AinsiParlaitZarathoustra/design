<script lang="ts">
  import type { Snippet } from "svelte";

  /**
   * A link to another foundations page, by its title ("Control heights").
   * The link targets the top window, so the page opens in the manager, as the
   * source does. The relative `./` keeps it working wherever the build is hosted.
   */
  interface Props {
    page: string;
    children?: Snippet;
  }

  let { page, children }: Props = $props();
  const id = $derived(`foundations-${page.toLowerCase().replace(/[^a-z0-9]+/g, "-")}--page`);
</script>

<a href={`./?path=/story/${id}`} target="_top" class="text-foreground underline underline-offset-2">
  {#if children}{@render children()}{:else}{page}{/if}
</a>
