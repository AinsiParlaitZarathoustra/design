<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /** The `muted label │ value ⌄` toolbar pill. */
  interface Props {
    label: string;
    class?: string;
    onclick?: () => void;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { label, class: className, onclick, children, ...rest }: Props = $props();
</script>

<button
  type="button"
  data-slot="compound-filter"
  {onclick}
  class={cn(
    "inline-flex h-control-sm shrink-0 items-center overflow-hidden rounded-full border border-border text-xs outline-none",
    "transition-colors duration-fast ease-out-strong hover:bg-element-hover",
    className,
  )}
  {...rest}
><span class="shrink-0 border-r border-border-subtle px-2 text-muted-foreground">{label}</span><span
    class="flex min-w-0 items-center gap-1 px-2 font-medium text-foreground [&_svg]:shrink-0"
    >{@render children?.()}</span
  ></button
>
