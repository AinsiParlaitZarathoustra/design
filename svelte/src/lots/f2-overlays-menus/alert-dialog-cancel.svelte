<script lang="ts">
  import type { Snippet } from "svelte";
  import Button from "../../ui/button.svelte";
  import { getAlertDialog } from "./alert-dialog-context";

  /** Closes the dialog, as an outline button. */
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
  const api = getAlertDialog();
</script>

<Button data-slot="alert-dialog-cancel" variant="outline" onclick={() => api.setOpen(false)}>
  {@render children?.()}
</Button>
