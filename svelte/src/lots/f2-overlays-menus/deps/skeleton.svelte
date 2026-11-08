<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * A loading placeholder, ported from `components/ui/skeleton.tsx`. It pulses in
   * opacity only; `animated={false}` holds it still; `radius` takes the radius
   * scale's steps. Declared here because the lot needs it and its own lot has not
   * landed it yet: replace this file with the shared one when it does.
   */
  interface Props {
    class?: string;
    animated?: boolean;
    radius?: "sm" | "md" | "lg" | "full";
  }

  let { class: className, animated = true, radius = "sm" }: Props = $props();

  const RADIUS = { sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg", full: "rounded-full" };
</script>

<div
  data-slot="skeleton"
  data-static={animated ? undefined : ""}
  class={cn(animated && "animate-pulse", RADIUS[radius], "bg-muted", className)}
></div>
