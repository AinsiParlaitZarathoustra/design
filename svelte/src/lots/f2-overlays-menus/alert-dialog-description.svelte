<script lang="ts">
  import type { Snippet } from "svelte";
  import { onDestroy } from "svelte";
  import { cn } from "../../lib/utils";
  import { getAlertDialog } from "./alert-dialog-context";

  /** The dialog's explanation. It is registered so the panel is described by it. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
  const api = getAlertDialog();
  api.registerDescription(true);
  onDestroy(() => api.registerDescription(false));
</script>

<p
  id={api.descriptionId}
  data-slot="alert-dialog-description"
  class={cn("body text-secondary-foreground", className)}
>
  {@render children?.()}
</p>
