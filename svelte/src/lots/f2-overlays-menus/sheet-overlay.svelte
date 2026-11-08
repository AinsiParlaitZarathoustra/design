<script lang="ts">
  import { cn } from "../../lib/utils";
  import { getSheet } from "./sheet-context";

  /** The soft scrim behind the sheet. It fades with the panel. */
  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props();
  const api = getSheet();
</script>

<div
  data-slot="sheet-overlay"
  data-starting-style={api.starting ? "" : undefined}
  data-ending-style={api.ending ? "" : undefined}
  class={cn(
    "fixed inset-0 z-drawer scrim-soft transition-opacity duration-slow ease-drawer data-ending-style:opacity-0 data-starting-style:opacity-0",
    className,
  )}
></div>
