<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /**
   * An input with things attached, ported from `InputGroup` in
   * `src/components/ui/input-group.tsx`. One border around the lot; the group
   * draws the focus ring for the control inside it.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
    [key: `data-${string}`]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  data-slot="input-group"
  role="group"
  class={cn(
    "group/input-group relative flex h-control-md w-full min-w-0 items-center rounded border border-border bg-panel-input transition-colors duration-fast ease-out-strong outline-none in-data-[slot=combobox-content]:focus-within:border-inherit has-[[data-slot=input-group-control]:focus-visible]:outline-2 has-[[data-slot=input-group-control]:focus-visible]:outline-offset-1 has-[[data-slot=input-group-control]:focus-visible]:outline-ring has-[[data-slot=input-group-control]:focus-visible]:outline-solid has-[[data-slot][aria-invalid=true]]:border-destructive has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
