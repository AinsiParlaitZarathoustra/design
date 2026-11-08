<script lang="ts">
  import type { Snippet } from "svelte";
  import { onDestroy } from "svelte";
  import { cn } from "../../lib/utils";
  import { getAlertDialog } from "./alert-dialog-context";

  /** The dialog's heading. It names the dialog, and is registered so the panel points at it. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
  const api = getAlertDialog();
  api.registerTitle(true);
  onDestroy(() => api.registerTitle(false));
</script>

<h2 id={api.titleId} data-slot="alert-dialog-title" class={cn("heading", className)}>
  {@render children?.()}
</h2>
