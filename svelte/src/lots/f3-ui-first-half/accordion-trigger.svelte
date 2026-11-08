<script lang="ts">
  import type { Snippet } from "svelte";
  import { ChevronDownIcon } from "lucide-svelte";
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
</script>

<h3 class="flex">
  <button
    type="button"
    id={item.triggerId}
    aria-controls={item.panelId}
    aria-expanded={open}
    aria-disabled={item.disabled}
    data-slot="accordion-trigger"
    class={cn(
      "group/accordion-trigger relative flex flex-1 items-center justify-between gap-6 px-3 py-2 text-left text-xs font-medium text-secondary-foreground outline-none",
      "transition-colors duration-fast ease-out-strong hover:bg-element-hover hover:text-foreground aria-expanded:text-foreground",
      "aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
      className,
    )}
    onclick={() => {
      if (!item.disabled) root.toggle(item.value);
    }}
    {...rest}
  >
    {@render children?.()}
    <ChevronDownIcon
      data-slot="accordion-trigger-icon"
      aria-hidden="true"
      strokeWidth={1.75}
      class="pointer-events-none size-3.5 shrink-0 text-muted-foreground transition-transform duration-base ease-out-strong group-aria-expanded/accordion-trigger:rotate-180"
    />
  </button>
</h3>
