<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * Local adapter for `Avatar`, `AvatarImage` and `AvatarFallback` from
   * `src/components/ui/avatar.tsx` (lot f7 dependency, declared in the report).
   *
   * Sizes are the control ladder. The image is shown only once it has loaded;
   * until then, and when there is none, the fallback shows (Base UI's
   * contract). The fallback is initials on `bg-muted`, never a generated hue.
   */
  type AvatarSize = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg";

  interface Props {
    size?: AvatarSize;
    class?: string;
    /** The photo URL. Absent or not yet loaded: the fallback shows. */
    src?: string;
    children?: Snippet;
  }

  let { size = "md", class: className, src, children }: Props = $props();

  /** The URL that has finished loading; the image is shown only when it matches `src`. */
  let loadedSrc = $state<string | null>(null);
  const loaded = $derived(src !== undefined && loadedSrc === src);

  const SIZE: Record<AvatarSize, string> = {
    "3xs": "size-[14px]",
    "2xs": "size-[16px]",
    xs: "size-control-xs",
    sm: "size-control-sm",
    md: "size-control-md",
    lg: "size-control-lg",
  };
  const FALLBACK_TEXT: Record<AvatarSize, string> = {
    "3xs": "text-3xs",
    "2xs": "text-3xs",
    xs: "text-3xs",
    sm: "text-3xs",
    md: "text-2xs",
    lg: "text-xs",
  };
</script>

<span
  data-slot="avatar"
  data-size={size}
  class={cn(
    "group/avatar relative flex shrink-0 overflow-hidden rounded-full select-none ring-1 ring-border ring-inset",
    SIZE[size],
    className,
  )}
>
  {#if src}
    <img
      data-slot="avatar-image"
      {src}
      alt=""
      onload={() => (loadedSrc = src)}
      class={cn("aspect-square size-full object-cover", !loaded && "hidden")}
    />
  {/if}
  {#if !loaded}
    <span
      data-slot="avatar-fallback"
      class={cn(
        "flex size-full items-center justify-center bg-muted font-medium text-secondary-foreground uppercase",
        FALLBACK_TEXT[size],
      )}
    >
      {@render children?.()}
    </span>
  {/if}
</span>
