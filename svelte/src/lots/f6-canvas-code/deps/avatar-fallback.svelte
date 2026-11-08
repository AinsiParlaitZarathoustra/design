<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /** The initials face of an `Avatar`, on `bg-muted`, sized by the avatar's `data-size`. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<span
  data-slot="avatar-fallback"
  class={cn(
    "flex size-full items-center justify-center bg-muted font-medium text-secondary-foreground uppercase",
    "group-data-[size=3xs]/avatar:text-3xs",
    "group-data-[size=2xs]/avatar:text-3xs",
    "group-data-[size=xs]/avatar:text-3xs",
    "group-data-[size=sm]/avatar:text-3xs",
    "group-data-[size=md]/avatar:text-2xs",
    "group-data-[size=lg]/avatar:text-xs",
    className,
  )}
>
  {@render children?.()}
</span>
