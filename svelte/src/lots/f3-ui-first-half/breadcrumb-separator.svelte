<script lang="ts">
  import type { Snippet } from "svelte";
  import { ChevronRightIcon } from "lucide-svelte";
  import { cn } from "../../lib/utils";

  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<li
  data-slot="breadcrumb-separator"
  role="presentation"
  aria-hidden="true"
  class={cn("[&>svg]:size-3.5", className)}
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronRightIcon />
  {/if}
</li>
