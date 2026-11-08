<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /** A group's small muted header. `compact` is the inline pickers' eyebrow. */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    size?: "default" | "compact";
    children?: Snippet;
  }

  let { class: className, size = "default", children, ...rest }: Props = $props();
</script>

<div
  data-slot="command-group-label"
  data-size={size === "compact" ? size : undefined}
  role="presentation"
  class={cn(
    size === "compact"
      ? "eyebrow truncate px-3 pt-2 pb-1 select-none"
      : "px-2 pt-2 pb-1.5 text-xs font-medium text-muted-foreground select-none",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
