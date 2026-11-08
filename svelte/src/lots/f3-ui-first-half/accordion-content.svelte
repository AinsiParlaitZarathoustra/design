<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import { getAccordionItem, getAccordionRoot } from "./accordion-context";

  interface Props {
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const root = getAccordionRoot();
  const item = getAccordionItem();
  const open = $derived(root.isOpen(item.value));

  // Mounted while open, and for the close (`duration-fast`, 120ms) before it
  // unmounts. Base UI measures the panel into `--accordion-panel-height`; the
  // height transition is the open. Reduced motion opens it at once.
  let mounted = $state(false);
  let ending = $state(false);
  let starting = $state(false);
  let height = $state<number | undefined>(undefined);
  let inner: HTMLDivElement | undefined = $state();

  $effect(() => {
    if (open) {
      ending = false;
      mounted = true;
      starting = true;
      const frame = requestAnimationFrame(() => {
        starting = false;
      });
      return () => cancelAnimationFrame(frame);
    }
    if (mounted) {
      ending = true;
      const timer = setTimeout(() => {
        mounted = false;
        ending = false;
      }, 120);
      return () => clearTimeout(timer);
    }
  });

  $effect(() => {
    if (mounted && inner) height = inner.getBoundingClientRect().height;
  });
</script>

{#if mounted}
  <div
    role="region"
    id={item.panelId}
    aria-labelledby={item.triggerId}
    data-slot="accordion-content"
    data-starting-style={starting ? "" : undefined}
    data-ending-style={ending ? "" : undefined}
    style={height === undefined ? undefined : `--accordion-panel-height: ${height}px`}
    class={cn(
      "h-(--accordion-panel-height) overflow-hidden text-xs text-secondary-foreground",
      "transition-[height] duration-fast ease-out-strong motion-reduce:transition-none",
      "data-ending-style:h-0 data-starting-style:h-0",
    )}
    {...rest}
  >
    <div
      bind:this={inner}
      class={cn(
        "px-3 pt-0 pb-3 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-3",
        className,
      )}
    >
      {@render children?.()}
    </div>
  </div>
{/if}
