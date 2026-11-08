<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";
  import { setAvatarStack } from "./avatar-stack-context";

  /**
   * Overlapping faces that ripple when you move across them: on entering a
   * face, every face lifts by `LIFT × FALLOFF^distance` and the hovered one
   * grows a little. Bring your own faces: children are `AvatarStackItem`s.
   * Reduced motion holds every face still.
   */
  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();

  let active = $state<number | null>(null);
  const still = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let count = 0;

  setAvatarStack({
    get active() {
      return active;
    },
    get still() {
      return still;
    },
    enter: (index) => {
      active = index;
    },
    register: () => count++,
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  data-slot="avatar-stack"
  onmouseleave={() => (active = null)}
  class={cn("flex items-center -space-x-1.5", className)}
>
  {@render children?.()}
</div>
