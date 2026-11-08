<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * The right rail of attributes on a detail view. Hidden under xl. Ported from
   * `PropertiesPane` in `list-detail.tsx`.
   */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<aside
  data-slot="properties-pane"
  data-panel=""
  class={cn(
    "flex w-65 shrink-0 flex-col gap-4 overflow-y-auto border-l border-border-subtle p-3 max-xl:hidden",
    className,
  )}
>
  {@render children?.()}
</aside>
