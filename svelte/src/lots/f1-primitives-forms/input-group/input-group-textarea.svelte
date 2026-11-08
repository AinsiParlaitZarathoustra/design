<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import Textarea from "../textarea.svelte";

  /** The textarea inside an input group, ported from `InputGroupTextarea`. */
  interface Props extends Omit<HTMLTextareaAttributes, "class"> {
    class?: string;
    value?: string;
    defaultValue?: string;
  }

  let { class: className, value = $bindable(undefined), defaultValue, ...rest }: Props = $props();
</script>

<Textarea
  data-slot="input-group-control"
  bind:value
  {defaultValue}
  {...rest}
  class={cn("flex-1 resize-none rounded-none border-0 bg-transparent py-1.5 focus-ring-none", className)}
/>
