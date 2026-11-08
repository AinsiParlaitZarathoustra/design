<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../../../lib/utils";
  import { inputGroupAddonVariants } from "./input-group-variants";

  /**
   * An addon beside the control, ported from `InputGroupAddon`. A click on the
   * addon (not on one of its buttons) focuses the input of its group.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    align?: VariantProps<typeof inputGroupAddonVariants>["align"];
    children?: Snippet;
    [key: `data-${string}`]: unknown;
  }

  let { class: className, align = "inline-start", children, onclick, ...rest }: Props = $props();
</script>

<div
  role="group"
  data-slot="input-group-addon"
  data-align={align}
  class={cn(inputGroupAddonVariants({ align }), className)}
  onclick={(event) => {
    if ((event.target as HTMLElement).closest("button")) return;
    event.currentTarget.parentElement?.querySelector("input")?.focus();
    onclick?.(event);
  }}
  {...rest}
>
  {@render children?.()}
</div>
