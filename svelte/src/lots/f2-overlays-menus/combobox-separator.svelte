<script lang="ts">
  import { cn } from "../../lib/utils";

  /** The rule between two groups of a combobox, ported from `ComboboxSeparator`. */
  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props();
</script>

<div role="presentation" data-slot="combobox-separator" class={cn("-mx-0.5 my-0.5 h-px bg-border", className)}></div>
