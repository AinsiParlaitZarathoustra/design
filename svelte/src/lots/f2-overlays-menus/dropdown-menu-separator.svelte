<script lang="ts">
  import { cn } from "../../lib/utils";

  /** The rule between two groups of rows. */
  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props();
</script>

<div
  role="separator"
  aria-orientation="horizontal"
  data-slot="dropdown-menu-separator"
  class={cn("-mx-1 my-1 h-px bg-border", className)}
></div>
