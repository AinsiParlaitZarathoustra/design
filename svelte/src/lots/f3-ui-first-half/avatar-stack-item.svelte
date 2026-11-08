<script lang="ts">
  import type { Snippet } from "svelte";
  import { getAvatarStack } from "./avatar-stack-context";
  import { SpringValue, type SpringConfig } from "./deps/spring.svelte";

  // Springs as in the React source: the lift is quick, the return softer, and
  // both critically damped (damping = 2·√stiffness), so nothing overshoots.
  const LIFT = -4;
  const FALLOFF = 0.45;
  const SCALE = 1.05;
  const LIFT_SPRING: SpringConfig = { stiffness: 520, damping: 46 };
  const SETTLE_SPRING: SpringConfig = { stiffness: 380, damping: 39 };

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  const stack = getAvatarStack();
  const index = stack.register();

  const y = new SpringValue(0);
  const scale = new SpringValue(1);

  const distance = $derived(stack.active === null ? null : Math.abs(index - stack.active));
  const targetY = $derived(stack.still || distance === null ? 0 : LIFT * Math.pow(FALLOFF, distance));
  const targetScale = $derived(!stack.still && distance === 0 ? SCALE : 1);
  const config = $derived(stack.active === null ? SETTLE_SPRING : LIFT_SPRING);

  $effect(() => {
    y.to(targetY, config);
    scale.to(targetScale, config);
  });

  $effect(() => () => {
    y.destroy();
    scale.destroy();
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  onmouseenter={() => stack.enter(index)}
  class="relative rounded-full ring-2 ring-background"
  style="transform: translateY({y.current}px) scale({scale.current});"
>
  {@render children?.()}
</div>
