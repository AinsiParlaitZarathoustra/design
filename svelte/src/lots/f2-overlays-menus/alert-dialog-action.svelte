<script lang="ts">
  import type { Snippet } from "svelte";
  import Button from "../../ui/button.svelte";

  /** The action that answers the dialog. The solid destructive fill by default: a dialog that must be answered is nearly always confirming something destructive. */
  interface Props {
    variant?: "default" | "destructive" | "outline" | "ghost" | "secondary" | "link";
    onclick?: (event: MouseEvent) => void;
    children?: Snippet;
  }

  let { variant = "destructive", onclick, children }: Props = $props();
</script>

<Button data-slot="alert-dialog-action" {variant} {onclick}>
  {@render children?.()}
</Button>
