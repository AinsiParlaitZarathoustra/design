<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import Separator from "../deps/separator.svelte";

  /** A rule across a field group, with an optional caption. Ported from `FieldSeparator` in `src/components/ui/field.tsx`. */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  data-slot="field-separator"
  data-content={children ? true : false}
  class={cn(
    "relative -my-2 h-5 text-xs group-data-[variant=outline]/field-group:-mb-2",
    className,
  )}
  {...rest}
>
  <Separator class="absolute inset-0 top-1/2" />
  {#if children}
    <span
      class="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
      data-slot="field-separator-content"
    >
      {@render children()}
    </span>
  {/if}
</div>
