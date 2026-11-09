<script lang="ts">
  import type { Snippet } from "svelte";
  import { X } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import { buttonVariants } from "../../../ui/button-variants";
  import { getToastItem, getToastManager } from "./toast-context";

  /**
   * The toast's dismiss (port of Base UI's `Toast.Close`, rendered as a ghost
   * `Button` with the X at the icon ladder's `sm`). Its hit area is grown by
   * the `after` box, so the glyph stays 12px while the target is comfortable.
   */
  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const item = getToastItem();
  const manager = getToastManager();

  // Hidden from assistive tech while the stack is collapsed, unless it has focus,
  // as Base UI's `Toast.Close` is.
  let hasFocus = $state(false);
</script>

<button
  type="button"
  tabindex="0"
  data-slot="toast-close"
  data-type={item.toast.type}
  aria-hidden={!manager.expanded && !hasFocus}
  aria-label="Close toast"
  class={cn(
    buttonVariants({ variant: "ghost", size: "sm" }),
    "size-control-sm px-0",
    "relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground [&_svg:not([class*='size-'])]:size-3",
    className,
  )}
  onclick={() => manager.close(item.toast.id)}
  onfocus={() => (hasFocus = true)}
  onblur={() => (hasFocus = false)}
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    <X aria-hidden="true" />
  {/if}
</button>
