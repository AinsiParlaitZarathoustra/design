<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import { setAccordionItem } from "./accordion-context";

  interface Props {
    value: string;
    disabled?: boolean;
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { value, disabled = false, class: className, children, ...rest }: Props = $props();

  const uid = $props.id();

  setAccordionItem({
    get value() {
      return value;
    },
    get disabled() {
      return disabled;
    },
    triggerId: `${uid}-trigger`,
    panelId: `${uid}-panel`,
  });
</script>

<div data-slot="accordion-item" class={cn("not-last:border-b not-last:border-border-subtle", className)} {...rest}>
  {@render children?.()}
</div>
