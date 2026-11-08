<script lang="ts">
  import type { Snippet } from "svelte";
  import { onDestroy } from "svelte";
  import { menuLabelVariants } from "./menu-variants";
  import { getMenuGroup } from "./menu-context";

  /** A group's heading. It names the group, and `inset` lines it up with inset rows. */
  interface Props {
    class?: string;
    inset?: boolean;
    children?: Snippet;
  }

  let { class: className, inset = false, children }: Props = $props();
  const group = getMenuGroup();
  group?.setLabelMounted(true);
  onDestroy(() => group?.setLabelMounted(false));
</script>

<div
  role="presentation"
  id={group?.labelId}
  data-slot="dropdown-menu-label"
  data-inset={inset ? "" : undefined}
  class={menuLabelVariants({ className })}
>
  {@render children?.()}
</div>
