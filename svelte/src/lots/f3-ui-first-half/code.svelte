<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /**
   * A monospace run. `inline` for a path or a flag inside a sentence; `block`
   * for a snippet. Both use the `code` text style (slashed zero, disambiguated
   * glyphs).
   */
  interface Props {
    variant?: "inline" | "block";
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { variant = "inline", class: className, children, ...rest }: Props = $props();
</script>

<!-- A block scrolls sideways, so a keyboard has to be able to reach it. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<code
  data-slot="code"
  data-variant={variant}
  tabindex={variant === "block" ? 0 : undefined}
  class={cn(
    "code",
    variant === "inline" &&
      "rounded-sm border border-border-subtle bg-card px-1 py-px text-secondary-foreground",
    variant === "block" &&
      "block overflow-x-auto rounded-md border border-border bg-panel p-3 text-secondary-foreground",
    className,
  )}
  {...rest}>{@render children?.()}</code
>
