<script module lang="ts">
  /** What a parent drives the glyph with, through `bind:this`. */
  export type MailboxIconHandle = { startAnimation: () => void; stopAnimation: () => void };
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";
  import { SpringValue, type SpringConfig } from "./deps/spring.svelte";

  /**
   * A mailbox whose flag springs up: the Inbox's own mark. It animates on hover
   * by itself, or on command through the exported `startAnimation` /
   * `stopAnimation` (`bind:this`), so a larger target can drive it. The flag is
   * a critically damped spring: it swings up and stops, with no overshoot.
   */
  interface Props {
    /** Pixel size of the glyph. */
    size?: number;
    /** Line weight: 1.5, lighter than the system's 1.75, as the glyph is drawn larger. */
    strokeWidth?: number;
    /** When true, hover on the icon itself does nothing; the parent drives it. */
    controlled?: boolean;
    class?: string;
    onmouseenter?: (event: MouseEvent) => void;
    onmouseleave?: (event: MouseEvent) => void;
    [attribute: string]: unknown;
  }

  let {
    size = 20,
    strokeWidth = 1.5,
    controlled = false,
    class: className,
    onmouseenter,
    onmouseleave,
    ...rest
  }: Props = $props();

  const NORMAL: SpringConfig = { stiffness: 300, damping: 35 };
  const ANIMATE: SpringConfig = { stiffness: 280, damping: 34 };

  const flag = new SpringValue(0);
  $effect(() => () => flag.destroy());

  export function startAnimation() {
    flag.to(-90, ANIMATE);
  }

  export function stopAnimation() {
    flag.to(0, NORMAL);
  }
</script>

<span
  data-slot="mailbox-icon"
  aria-hidden="true"
  class={cn("inline-flex shrink-0", className)}
  onmouseenter={(event) => {
    if (!controlled) startAnimation();
    onmouseenter?.(event);
  }}
  onmouseleave={(event) => {
    if (!controlled) stopAnimation();
    onmouseleave?.(event);
  }}
  {...rest}
>
  <svg
    class="overflow-visible"
    fill="none"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
    <path
      d="M18 11V9H15"
      style="transform-origin: 18px 11px; transform: rotate({flag.current}deg);"
    />
    <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2" />
    <line x1="6" x2="7" y1="10" y2="10" />
  </svg>
</span>
