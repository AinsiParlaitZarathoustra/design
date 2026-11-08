<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { setPanelEmpty } from "./command-context";

  /**
   * The scroll area under the field: a listbox of `CommandItem`s. While a
   * `CommandEmpty` sits inside it, it is a plain region instead, since a listbox
   * may hold only options and the empty line is not one. `tall` is the ⌘P list:
   * the same width, more rows.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    size?: "default" | "tall";
    children?: Snippet;
  }

  let { class: className, size = "default", children, ...rest }: Props = $props();
  let empty = $state(false);

  setPanelEmpty({
    setEmpty(next: boolean) {
      empty = next;
    },
  });
</script>

<div
  data-slot="command-panel"
  role={empty ? undefined : "listbox"}
  class={cn(
    "relative min-h-0 overflow-y-auto overscroll-contain px-2 pb-2",
    size === "tall" ? "max-h-[min(42rem,64vh)]" : "max-h-[min(34rem,58vh)]",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
