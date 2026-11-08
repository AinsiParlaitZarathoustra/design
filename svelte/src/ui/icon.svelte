<script module lang="ts">
  export const ICON_SIZES = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
  } as const;

  export type IconSize = keyof typeof ICON_SIZES;
  export const ICON_STROKE_WIDTH = 1.75;
</script>

<script lang="ts">
  import { cn } from "../lib/utils";

  /**
   * The one way to render an icon (decision 30), ported to Svelte.
   *
   * `icon` is a Lucide Svelte component (`icon={Search}`); a glyph that is not
   * a plain Lucide icon is passed through `children` instead. Sizes are the
   * five Atlas steps; the default stroke width is 1.75 because 2 reads heavy
   * at 10–14px.
   */
  interface Props {
    icon: any;
    size?: IconSize;
    strokeWidth?: number;
    class?: string;
    /** Accessible name. Without one the glyph is decorative (`aria-hidden`). */
    label?: string;
    [attribute: string]: unknown;
  }

  let {
    icon: Glyph,
    size = "md",
    strokeWidth = ICON_STROKE_WIDTH,
    class: className,
    label,
    ...rest
  }: Props = $props();
</script>

<Glyph
  size={ICON_SIZES[size]}
  {strokeWidth}
  class={cn("shrink-0", className)}
  aria-hidden={label ? undefined : "true"}
  aria-label={label}
  {...rest}
/>
