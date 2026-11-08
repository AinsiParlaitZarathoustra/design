<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import Input from "../../../ui/input.svelte";

  /**
   * The text field inside an input group, ported from `InputGroupInput`. The
   * group draws the one focus ring, so the control opts out of its own.
   */
  interface Props extends Omit<HTMLInputAttributes, "class" | "size"> {
    class?: string;
    value?: string;
    defaultValue?: string;
  }

  let { class: className, value = $bindable(undefined), defaultValue, ...rest }: Props = $props();
</script>

<Input
  data-slot="input-group-control"
  bind:value
  {defaultValue}
  {...rest}
  class={cn("flex-1 rounded-none border-0 bg-transparent focus:border-0 focus-ring-none", className)}
/>
