<script lang="ts">
  import { untrack } from "svelte";
  import { Spring } from "svelte/motion";

  /** A dot that crosses its track on a spring when `on` flips. */
  interface Props {
    on: boolean;
    stiffness: number;
    damping: number;
  }

  let { on, stiffness, damping }: Props = $props();

  // The track's travel is 10.5rem; the spring runs 0 to 1 and the dot follows it.
  // The spring's constants are fixed per row, so they are read once.
  const progress = new Spring(0, untrack(() => ({ stiffness, damping })));

  $effect(() => {
    progress.target = on ? 1 : 0;
  });
</script>

<div class="relative h-control-sm w-48 rounded-full bg-muted">
  <span
    class="absolute top-1 left-1 size-4 rounded-full bg-primary"
    style:transform={`translateX(calc(10.5rem * ${progress.current}))`}
  ></span>
</div>
