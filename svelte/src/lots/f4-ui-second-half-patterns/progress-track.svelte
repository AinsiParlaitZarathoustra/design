<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { getProgressContext, stateAttributes } from "./progress-context";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
  const progress = getProgressContext();
</script>

<div
  data-slot="progress-track"
  {...stateAttributes(progress.status)}
  {...rest}
  class={cn(
    "relative flex h-1 w-full items-center overflow-x-hidden rounded-md bg-muted",
    className,
  )}
>
  {@render children?.()}
</div>
