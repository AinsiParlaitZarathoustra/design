<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import { getPanelEmpty } from "./command-context";

  /** The centred line a list shows when it has no rows. While it is shown, its panel is not a listbox. */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
  const panel = getPanelEmpty();

  // Before paint, so the panel is never a listbox around this line.
  $effect.pre(() => {
    panel?.setEmpty(true);
    return () => panel?.setEmpty(false);
  });
</script>

<div data-slot="command-empty" class={cn("py-10 text-center text-sm text-muted-foreground", className)}>
  {@render children?.()}
</div>
