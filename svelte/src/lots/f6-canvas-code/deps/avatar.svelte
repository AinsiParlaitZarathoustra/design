<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * Adapter for `Avatar` (`src/components/ui/avatar.tsx`, lot f7). The root
   * sizes off the control ladder, with the same `data-size` hooks; `AvatarImage`
   * and `AvatarFallback` are the two faces, as in the source, the image shown
   * once it has loaded.
   */
  export type AvatarSize = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg";

  interface Props {
    size?: AvatarSize;
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { size = "md", class: className, children, ...rest }: Props = $props();
</script>

<span
  data-slot="avatar"
  data-size={size}
  class={cn(
    "group/avatar relative flex shrink-0 overflow-hidden rounded-full select-none",
    "ring-1 ring-border ring-inset",
    "data-[size=3xs]:size-[14px]",
    "data-[size=2xs]:size-[16px]",
    "data-[size=xs]:size-control-xs",
    "data-[size=sm]:size-control-sm",
    "data-[size=md]:size-control-md",
    "data-[size=lg]:size-control-lg",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</span>
