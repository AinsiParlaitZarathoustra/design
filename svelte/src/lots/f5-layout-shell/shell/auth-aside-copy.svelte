<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /** One line of atmosphere copy, sized to sit under the field. Ported from `AuthAsideCopy`. */
  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<p class={cn("max-w-md text-xl font-semibold tracking-tight text-balance", className)} {...rest}>
  {@render children?.()}
</p>
