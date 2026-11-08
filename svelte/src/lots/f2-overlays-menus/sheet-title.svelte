<script lang="ts">
  import type { Snippet } from "svelte";
  import { onDestroy } from "svelte";
  import { cn } from "../../lib/utils";
  import { getSheet } from "./sheet-context";

  /** The sheet's heading. It names the panel, and is registered so the panel points at it. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
  const api = getSheet();
  api.registerTitle(true);
  onDestroy(() => api.registerTitle(false));
</script>

<h2 id={api.titleId} data-slot="sheet-title" class={cn("heading text-foreground", className)}>
  {@render children?.()}
</h2>
