<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  /**
   * Stacked-paper: two ghost cards peeking out behind the real one, done
   * with pseudo-elements so it costs no
   * DOM — `before:` is the sheet directly behind, `after:` the one behind
   * that, each inset a little further and a little higher.
   *
   * Wrap the card; the wrapper must not clip. `mask-b-from-65%` fades the
   * stack out at the bottom so it reads as depth rather than three cards.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div
  data-slot="ghost-cards"
  class={cn(
    "group relative -mx-4 mask-b-from-65% px-4 pt-6",
    "before:absolute before:inset-x-6 before:top-4 before:bottom-0 before:z-1 before:rounded-xl before:border before:border-border before:bg-background",
    "after:absolute after:inset-x-9 after:top-2 after:bottom-0 after:rounded-xl after:border after:border-border after:bg-background/50",
    className,
  )}
  {...rest}
>
  <div class="relative z-2">
    {@render children?.()}
  </div>
</div>
