<script lang="ts">
  import type { Snippet } from "svelte";
  import { onDestroy } from "svelte";
  import { cn } from "../../lib/utils";
  import { getSheet } from "./sheet-context";

  /** The sheet's muted line. It is registered so the panel is described by it. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
  const api = getSheet();
  api.registerDescription(true);
  onDestroy(() => api.registerDescription(false));
</script>

<p
  id={api.descriptionId}
  data-slot="sheet-description"
  class={cn("body text-secondary-foreground", className)}
>
  {@render children?.()}
</p>
