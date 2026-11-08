<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** The "+3" cap at the end of a group. */
  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  data-slot="avatar-group-count"
  class={cn(
    "relative flex size-control-md shrink-0 items-center justify-center",
    "rounded-full bg-muted text-2xs font-medium text-secondary-foreground",
    "ring-2 ring-background",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
