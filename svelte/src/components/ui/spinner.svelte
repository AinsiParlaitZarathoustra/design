<script lang="ts">
  import { LoaderCircleIcon } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import { ICON_SIZES, ICON_STROKE_WIDTH, type IconSize } from "../../ui/icon.svelte";

  /** An indeterminate progress indicator, sized off the icon ladder. */
  interface Props {
    class?: string;
    size?: IconSize;
    /** Accessible name. Set to "" inside a control that already has one. */
    label?: string;
  }

  let { class: className, size = "md", label = "Loading" }: Props = $props();
</script>

<LoaderCircleIcon
  data-slot="spinner"
  role={label ? "status" : undefined}
  aria-label={label || undefined}
  aria-hidden={label ? undefined : "true"}
  size={ICON_SIZES[size]}
  strokeWidth={ICON_STROKE_WIDTH}
  class={cn("shrink-0 animate-spin text-muted-foreground", className)}
/>
