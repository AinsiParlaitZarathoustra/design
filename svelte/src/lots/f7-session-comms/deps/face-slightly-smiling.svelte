<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * The glyph the React oracle draws as `SmileIcon`. lucide-react 1.67 aliases
   * `smile` to `face-slightly-smiling`, whose geometry differs from the
   * `smile` icon in lucide-svelte 1.0.1 (which has no `face-slightly-smiling`).
   * Same node list as lucide-react's `face-slightly-smiling`, same SVG
   * attributes as lucide-svelte's base icon, so the two draw the same pixels.
   */
  interface Props {
    size?: number;
    strokeWidth?: number;
    class?: string;
    [attribute: string]: unknown;
  }

  let { size = 24, strokeWidth = 2, class: className, ...rest }: Props = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={cn("lucide lucide-face-slightly-smiling", className)}
  {...rest}
>
  <path d="M15 10V9" />
  <path d="M16.472 15a6 6 0 01-8.943 0" />
  <path d="M9 10V9" />
  <circle cx="12" cy="12" r="10" />
</svg>
