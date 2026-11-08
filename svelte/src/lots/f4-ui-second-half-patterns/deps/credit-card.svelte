<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * Lucide's `credit-card`, drawn from the oracle's node data
   * (`lucide-react` 1.67.0): a rect, the magnetic stripe, and the short
   * card-number stroke `M6 14h2`. `lucide-svelte` 1.0.1's own `credit-card`
   * stopped at the stripe, which left the glyph six pixels short of the
   * source. Same markup as Lucide's Svelte `Icon`, so `Icon` takes it
   * unchanged (`<Icon icon={CreditCard} size="sm" />`).
   */
  interface Props {
    size?: number | string;
    strokeWidth?: number | string;
    color?: string;
    absoluteStrokeWidth?: boolean;
    /** Accessible name. Without one the glyph is decorative (`aria-hidden`). */
    label?: string;
    class?: string;
    [attribute: string]: unknown;
  }

  let {
    size = 24,
    strokeWidth = 2,
    color = "currentColor",
    absoluteStrokeWidth = false,
    label,
    class: className,
    ...rest
  }: Props = $props();

  const width = $derived(
    absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
  );
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width={width}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden={label ? undefined : "true"}
  aria-label={label}
  class={cn("lucide-icon", "lucide", "lucide-credit-card", className)}
  {...rest}
>
  <rect width="20" height="14" x="2" y="5" rx="2" />
  <line x1="2" x2="22" y1="10" y2="10" />
  <path d="M6 14h2" />
</svg>
