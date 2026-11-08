<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /** The key legend along the bottom. `compact` is the inline pickers' footer. */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    size?: "default" | "compact";
    children?: Snippet;
  }

  let { class: className, size = "default", children, ...rest }: Props = $props();
</script>

<div
  data-slot="command-footer"
  data-size={size === "compact" ? size : undefined}
  class={cn(
    size === "compact"
      ? "flex min-h-control-sm shrink-0 items-center justify-between gap-2 border-t border-border px-3 py-1 text-3xs text-muted-foreground"
      : "flex shrink-0 items-center justify-between gap-2 bg-element-hover px-5 py-2.5 text-sm font-medium text-muted-foreground",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
