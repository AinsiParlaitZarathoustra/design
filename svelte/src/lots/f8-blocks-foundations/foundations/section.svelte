<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  interface Props {
    title: string;
    intro?: Snippet | string;
    children?: Snippet;
    class?: string;
  }

  let { title, intro, children, class: className }: Props = $props();
</script>

<section class={cn("flex flex-col gap-4", className)}>
  <div class="flex flex-col gap-1">
    <h2 class="eyebrow">{title}</h2>
    {#if intro}
      <p class="body max-w-2xl text-secondary-foreground">
        {#if typeof intro === "string"}{intro}{:else}{@render intro()}{/if}
      </p>
    {/if}
  </div>
  {@render children?.()}
</section>
