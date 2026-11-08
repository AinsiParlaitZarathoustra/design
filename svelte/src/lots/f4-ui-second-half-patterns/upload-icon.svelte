<script module lang="ts">
  export type UploadIconHandle = {
    startAnimation: () => void;
    stopAnimation: () => void;
  };
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { ICON_STROKE_WIDTH } from "../../ui/icon.svelte";
  import { createArrowSpring } from "./upload-icon-spring.svelte";

  /**
   * A tray with an arrow that springs up out of it: "share" / "send out". The
   * arrow rides a critically damped spring, so it rises and stops with no
   * overshoot. It animates on hover by itself, or through `ref` when `controlled`
   * (the parent drives it).
   */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class"> {
    size?: number;
    strokeWidth?: number;
    /** When true, hover on the icon itself does nothing; the parent drives it. */
    controlled?: boolean;
    class?: string;
    ref?: UploadIconHandle | undefined;
  }

  let {
    size = 14,
    strokeWidth = ICON_STROKE_WIDTH,
    controlled = false,
    class: className,
    ref = $bindable(),
    onmouseenter,
    onmouseleave,
    ...rest
  }: Props = $props();

  const arrow = createArrowSpring();

  ref = {
    startAnimation: () => arrow.start("animate"),
    stopAnimation: () => arrow.start("normal"),
  };

  $effect(() => () => arrow.destroy());
</script>

<span
  data-slot="upload-icon"
  aria-hidden="true"
  class={cn("inline-flex shrink-0", className)}
  onmouseenter={(event) => {
    if (!controlled) arrow.start("animate");
    onmouseenter?.(event);
  }}
  onmouseleave={(event) => {
    if (!controlled) arrow.start("normal");
    onmouseleave?.(event);
  }}
  {...rest}
>
  <svg
    fill="none"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
    class="overflow-visible"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <g style="transform: translateY({arrow.y}px)">
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </g>
  </svg>
</span>
