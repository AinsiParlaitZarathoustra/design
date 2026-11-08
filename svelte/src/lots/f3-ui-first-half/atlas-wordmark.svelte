<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import AtlasMark from "./atlas-mark.svelte";

  /** Mark plus name, for a footer or a nav. */
  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: string;
  }

  let { class: className, ...rest }: Props = $props();
</script>

<div class={cn("flex items-center gap-1.5 text-foreground", className)} {...rest}>
  <AtlasMark class="size-3.5" />
  <span class="text-xs font-semibold tracking-tight">Atlas</span>
</div>
