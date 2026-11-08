<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import Hint from "../../../ui/hint.svelte";
  import type { HintGroupContext } from "./hint-group.svelte";

  /**
   * Adapter for `HintItem`: one control with its label in a tooltip, wrapped in
   * an `inline-flex` span as the React item is inside a group.
   */
  interface Props {
    label: string;
    class?: string;
    children: Snippet;
  }

  let { label, class: className, children }: Props = $props();

  const group = getContext<HintGroupContext | undefined>("hint-group");
</script>

<Hint {label} side={group?.side ?? "bottom"} wrap class={className}>
  {@render children()}
</Hint>
