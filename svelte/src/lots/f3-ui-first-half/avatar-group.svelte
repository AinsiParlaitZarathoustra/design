<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /**
   * Overlapping avatars. The gap is an outline in the page background, not a
   * border, so it reads as a gap rather than an outline.
   */
  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  data-slot="avatar-group"
  class={cn(
    "group/avatar-group flex -space-x-1.5",
    "*:data-[slot=avatar]:outline-2 *:data-[slot=avatar]:outline-background",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
