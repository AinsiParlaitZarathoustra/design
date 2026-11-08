<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * One attribute: a dim label on the left, the value on the right. Ported from
   * `PropertyRow` in `list-detail.tsx`.
   */
  interface Props {
    label: string;
    class?: string;
    children?: Snippet;
  }

  let { label, class: className, children }: Props = $props();
</script>

<div data-slot="property-row" class={cn("flex min-h-(--control-sm) items-center gap-2", className)}>
  <span class="w-20 shrink-0 caption">{label}</span>
  <div class="flex min-w-0 flex-1 items-center gap-1.5 text-xs">
    {@render children?.()}
  </div>
</div>
