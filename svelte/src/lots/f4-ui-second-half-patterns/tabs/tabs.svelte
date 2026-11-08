<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";
  import {
    setTabsContext,
    type TabActivationDirection,
    type TabsOrientation,
  } from "./tabs-context";

  /**
   * Tabs. `value` makes the selection controlled; otherwise `defaultValue` starts
   * it and the root keeps it. The list, triggers and panels read the selection
   * from context.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    value?: string | null;
    defaultValue?: string | null;
    onValueChange?: (value: string) => void;
    orientation?: TabsOrientation;
    class?: string;
    children?: Snippet;
  }

  let {
    value: valueProp,
    defaultValue = null,
    onValueChange,
    orientation = "horizontal",
    class: className,
    children,
    ...rest
  }: Props = $props();

  const rootId = $props.id();
  let internal = $state<string | null>(null);
  let direction = $state<TabActivationDirection>("none");
  const selected = $derived(valueProp !== undefined ? valueProp : internal ?? defaultValue);

  setTabsContext({
    get value() {
      return selected;
    },
    get orientation() {
      return orientation;
    },
    get activationDirection() {
      return direction;
    },
    get rootId() {
      return rootId;
    },
    select(next: string, nextDirection: TabActivationDirection) {
      onValueChange?.(next);
      if (valueProp !== undefined) return;
      direction = nextDirection;
      internal = next;
    },
  });
</script>

<div
  data-slot="tabs"
  data-orientation={orientation}
  data-activation-direction={direction}
  {...rest}
  class={cn("group/tabs flex gap-3 data-[orientation=horizontal]:flex-col", className)}
>
  {@render children?.()}
</div>
