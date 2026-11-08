<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * Local adapter for `DiffStat` (`src/components/ui/code-block.tsx`, which
   * belongs to lot F3 and is not modified here). Only the inline layout the
   * tool call card uses: a `+n` and a `−n` pair in the theme's diff inks, the
   * minus U+2212 so it lines up with the plus.
   */
  interface Props {
    added: number;
    removed: number;
    class?: string;
  }

  let { added, removed, class: className }: Props = $props();
</script>

<span
  data-slot="diff-stat"
  class={cn("inline-flex items-center gap-1.5 text-2xs tabular-nums", className)}
>
  <span class="text-(--diff-added-text)">+{added}</span>
  <span class="text-(--diff-removed-text)">−{removed}</span>
</span>
