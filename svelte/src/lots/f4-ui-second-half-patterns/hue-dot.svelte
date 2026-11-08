<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { HUE_BG } from "../../lib/hue";
  import type { LabelTone } from "../../lib/types";

  /** The bare dot, for a rail item or a legend where the word is already there. */
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    hue: LabelTone;
    class?: string;
  }

  let { hue, class: className, ...rest }: Props = $props();
</script>

<span
  data-slot="hue-dot"
  aria-hidden="true"
  {...rest}
  class={cn("size-1.5 shrink-0 rounded-full", HUE_BG[hue], className)}
></span>
