<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";

  /**
   * The three-pane reading layout: list, detail, properties. Ported from
   * `src/components/shell/list-detail.tsx`. The list pane is a fixed 20rem
   * (`w-80`) when narrow; the detail hides below lg, the properties below xl.
   */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<div data-slot="list-detail" class={cn("flex min-h-0 flex-1", className)}>
  {@render children?.()}
</div>
