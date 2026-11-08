<script lang="ts">
  import { cn } from "../../../lib/utils";
  import type { IconSize } from "../../../ui/icon.svelte";
  import { svgProps } from "./svg-props";

  /**
   * Send arrow, ported from `SendGlyph` in `src/ui/animated-icon.tsx`. `sending`
   * is a pulse, not a state: the caller raises it on submit and lowers it from
   * `onAnimationEnd`, so the animation tracks the actual send.
   */
  interface Props {
    sending: boolean;
    size?: IconSize;
    class?: string;
    onAnimationEnd?: () => void;
  }

  let { sending, size = "md", class: className, onAnimationEnd }: Props = $props();
</script>

<span class={cn("inline-grid shrink-0 place-items-center overflow-hidden", className)}>
  <svg
    {...svgProps(size)}
    class={cn("shrink-0", sending && "animate-icon-send")}
    onanimationend={onAnimationEnd}
  >
    <path
      d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"
    />
    <path d="M6 12h16" />
  </svg>
</span>
