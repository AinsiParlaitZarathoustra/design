<script lang="ts">
  import type { Snippet } from "svelte";
  import Hint from "../../../ui/hint.svelte";
  import { useSidebar } from "./sidebar";

  /**
   * Collapsed, a row is only its glyph, so its name comes back as a tooltip off
   * the rail's edge. Expanded, the label is on screen and this is a
   * pass-through. Ported from `RailTip` in `sidebar.tsx`. The house `Hint` opens
   * below its trigger; the React tooltip opens to the right (see the report).
   */
  interface Props {
    label: string;
    children: Snippet;
  }

  let { label, children }: Props = $props();
  const sidebar = useSidebar();
</script>

{#if sidebar.collapsed}
  <Hint {label}>
    {@render children()}
  </Hint>
{:else}
  {@render children()}
{/if}
