<script lang="ts" module>
  /** Module-level, so every item in the page gets a distinct id. */
  let nextId = 0;

  export function nextHintItemId(): string {
    nextId += 1;
    return `hint-item-${nextId}`;
  }
</script>

<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import { getHintGroup } from "./context";

  /**
   * One control in a `HintGroup`, ported from `HintItem` in
   * `src/ui/hint-group.tsx`. The span around the control is what is measured
   * and hovered. Outside a group it renders the control unchanged.
   *
   * React cloned the child to put the hint label on it as `aria-label`. In
   * Svelte the control is not cloned: pass the same string to the control's
   * own `label`, as the stories do.
   */

  interface Props {
    label: string;
    /** Show the tooltip again whenever this value changes under the pointer (see `HintItem`). */
    reshowKey?: number;
    class?: string;
    children?: Snippet;
  }

  let { label, reshowKey, class: className, children }: Props = $props();

  const api = getHintGroup();
  const id = nextHintItemId();
  let el = $state<HTMLSpanElement | null>(null);
  let hovered = false;
  let prevReshowKey: number | undefined;

  function isFocusVisible(target: EventTarget | null) {
    try {
      return target instanceof Element && target.matches(":focus-visible");
    } catch {
      // Engines without the selector: treat every focus as keyboard focus.
      return true;
    }
  }

  $effect(() => {
    if (!api) return;
    const node = el;
    const text = label;
    const key = reshowKey;
    untrack(() => {
      api.register(id, { label: text, el: node });
      if (hovered && prevReshowKey !== undefined && prevReshowKey !== key) api.enter(id);
    });
    prevReshowKey = key;
  });

  $effect(() => {
    if (!api) return;
    const group = api;
    return () => untrack(() => group.unregister(id));
  });
</script>

{#if api}
  <!-- The span has no ARIA role, as in React: it only measures and forwards pointer and focus events. -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <span
    bind:this={el}
    class={cn("inline-flex [&>:disabled]:pointer-events-none", className)}
    onmouseenter={() => {
      hovered = true;
      api.enter(id);
    }}
    onmouseleave={() => {
      hovered = false;
      api.leave();
    }}
    onfocusin={(event) => {
      // Pointer focus comes with a hover already; only keyboard focus opens.
      if (isFocusVisible(event.target)) api.enter(id);
    }}
    onfocusout={() => api.leave()}
    onpointerdown={() => api.hide()}
    onkeydown={(event) => {
      if (event.key === "Escape") api.hide();
    }}
  >
    {@render children?.()}
  </span>
{:else}
  {@render children?.()}
{/if}
