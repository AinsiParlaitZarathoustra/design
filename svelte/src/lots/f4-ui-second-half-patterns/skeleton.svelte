<script module lang="ts">
  export type SkeletonRadius = "sm" | "md" | "lg" | "full";

  const RADIUS: Record<SkeletonRadius, string> = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /**
   * A loading placeholder. Animates opacity only (`animate-pulse`). `animated={false}`
   * holds it still, for a placeholder that stands in for a whole panel while its code
   * loads. `radius` takes the radius scale's steps.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
    class?: string;
    animated?: boolean;
    radius?: SkeletonRadius;
  }

  let { class: className, animated = true, radius = "sm", ...rest }: Props = $props();
</script>

<div
  data-slot="skeleton"
  data-static={animated ? undefined : ""}
  {...rest}
  class={cn(animated && "animate-pulse", RADIUS[radius], "bg-muted", className)}
></div>
