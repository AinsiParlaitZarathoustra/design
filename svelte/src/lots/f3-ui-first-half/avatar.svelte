<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import { setAvatar, type AvatarImageStatus, type AvatarSize } from "./avatar-context";

  /**
   * An identity mark. Sizes are the control ladder, so an avatar in a 28px
   * row is exactly as tall as the button beside it. The fallback is initials
   * on `bg-muted`, never a generated hue.
   */
  interface Props {
    size?: AvatarSize;
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { size = "md", class: className, children, ...rest }: Props = $props();

  let imageStatus = $state<AvatarImageStatus>("idle");

  setAvatar({
    get size() {
      return size;
    },
    get imageStatus() {
      return imageStatus;
    },
    setImageStatus: (status) => {
      imageStatus = status;
    },
  });
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
