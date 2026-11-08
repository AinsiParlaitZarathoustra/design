<script lang="ts">
  import UploadIcon, { type UploadIconHandle } from "../../../src/lots/f4-ui-second-half-patterns/upload-icon.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  let handle: UploadIconHandle | undefined = $state();
</script>

{#if story === "default"}
  <UploadIcon size={14} controlled={false} />
{:else if story === "sizes"}
  <div class="flex items-center gap-3 text-secondary-foreground">
    {#each [12, 14, 16, 20, 24] as size (size)}
      <UploadIcon {size} controlled={false} />
    {/each}
  </div>
{:else if story === "driven-by-parent"}
  <button
    type="button"
    class="label inline-flex h-control-md items-center gap-1.5 rounded border border-border px-2.5 transition-colors duration-fast ease-out-strong hover:bg-element-hover"
    onmouseenter={() => handle?.startAnimation()}
    onmouseleave={() => handle?.stopAnimation()}
  >
    <UploadIcon bind:ref={handle} controlled size={14} />
    Share
  </button>
{/if}
