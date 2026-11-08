<script lang="ts">
  import type { Snippet } from "svelte";
  import { setMenuGroup } from "./menu-context";

  /** A group of rows. Named by its label, when it has one. */
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
  const uid = $props.id();
  const labelId = `dropdown-menu-label-${uid}`;
  let labelled = $state(false);

  setMenuGroup({
    get labelId() {
      return labelId;
    },
    setLabelMounted(mounted: boolean) {
      labelled = mounted;
    },
  });
</script>

<div role="group" data-slot="dropdown-menu-group" aria-labelledby={labelled ? labelId : undefined}>
  {@render children?.()}
</div>
