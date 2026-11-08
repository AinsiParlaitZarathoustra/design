<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { Search } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Icon from "../../ui/icon.svelte";

  /**
   * The search field of the palette, ported from `CommandInput`. It is a combobox
   * over the list it controls. `startAddon` replaces the magnifier; `endAddon` sits
   * at its right end.
   */
  interface Props extends Omit<HTMLInputAttributes, "class" | "children"> {
    class?: string;
    startAddon?: Snippet;
    endAddon?: Snippet;
  }

  let { class: className, startAddon, endAddon, ...rest }: Props = $props();
</script>

<div data-slot="command-input" class="flex shrink-0 items-center gap-3 px-5 pt-4 pb-3">
  <span class="flex shrink-0 items-center text-muted-foreground">
    {#if startAddon}{@render startAddon()}{:else}<Icon icon={Search} size="lg" />{/if}
  </span>
  <input
    type="text"
    role="combobox"
    aria-autocomplete="list"
    aria-expanded="true"
    autocomplete="off"
    autocorrect="off"
    spellcheck={false}
    class={cn(
      "min-w-0 flex-1 bg-transparent text-md text-foreground outline-none focus-ring-none",
      "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...rest}
  />
  {@render endAddon?.()}
</div>
