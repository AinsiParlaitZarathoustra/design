<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import { getAvatar } from "./avatar-context";

  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const avatar = getAvatar();
</script>

{#if avatar.imageStatus !== "loaded"}
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
    {...rest}
  >
    {@render children?.()}
  </span>
{/if}
