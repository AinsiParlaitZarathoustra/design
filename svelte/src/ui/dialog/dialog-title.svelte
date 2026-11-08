<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { getDialog } from "./context";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    variant?: "default" | "quiet";
    children?: Snippet;
  }

  let { class: className, variant = "default", children, ...rest }: Props = $props();
  const api = getDialog();
  $effect(() => api.registerTitle());
</script>

<h2
  data-slot="dialog-title"
  data-variant={variant === "quiet" ? variant : undefined}
  id={api.titleId}
  class={cn(
    variant === "quiet"
      ? "min-w-0 flex-1 truncate text-sm text-secondary-foreground"
      : "heading text-foreground",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</h2>
