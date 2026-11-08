<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /** A small note under the atmosphere copy. Ported from `AuthAsideNote` in `src/components/shell/auth-split.tsx`. */
  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<p class={cn("max-w-sm text-xs text-secondary-foreground", className)} {...rest}>
  {@render children?.()}
</p>
