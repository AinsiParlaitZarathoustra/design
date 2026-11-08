<script lang="ts">
  import type { Snippet } from "svelte";

  /** The furniture every foundations page shares: a title, a lede and the body. */
  interface Props {
    title: string;
    lede: Snippet | string;
    status?: Snippet;
    children?: Snippet;
  }

  let { title, lede, status, children }: Props = $props();
</script>

<main class="min-h-screen bg-background text-foreground">
  <div class="mx-auto flex max-w-5xl flex-col gap-10 px-8 py-10">
    <header class="flex flex-col gap-2 border-b border-border pb-6">
      {#if status}{@render status()}{/if}
      <h1 class="text-2xl font-semibold">{title}</h1>
      <p class="body max-w-2xl text-secondary-foreground">
        {#if typeof lede === "string"}{lede}{:else}{@render lede()}{/if}
      </p>
    </header>
    {@render children?.()}
  </div>
</main>
