<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import { getTabsContext, panelIdOf, tabIdOf } from "./tabs-context";

  /** A tab's panel. Only the selected one is rendered (Base UI's `TabsPanel` without `keepMounted`). */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    value: string;
    class?: string;
    children?: Snippet;
  }

  let { value, class: className, children, ...rest }: Props = $props();
  const tabs = getTabsContext();
  const open = $derived(tabs.value === value);
</script>

{#if open}
  <div
    role="tabpanel"
    id={panelIdOf(tabs.rootId, value)}
    aria-labelledby={tabIdOf(tabs.rootId, value)}
    tabindex={0}
    data-slot="tabs-content"
    data-activation-direction={tabs.activationDirection}
    {...rest}
    class={cn("flex-1 outline-none", className)}
  >
    {@render children?.()}
  </div>
{/if}
