<script lang="ts">
  import type { Snippet } from "svelte";
  import Tooltip from "../../f2-overlays-menus/tooltip.svelte";
  import TooltipContent from "../../f2-overlays-menus/tooltip-content.svelte";
  import TooltipTrigger from "../../f2-overlays-menus/tooltip-trigger.svelte";
  import { useSidebar } from "./sidebar";

  /**
   * Collapsed, a row is only its glyph, so its name comes back as a tooltip off
   * the rail's edge. Expanded, the label is on screen and this is a
   * pass-through. Ported from `RailTip` in `sidebar.tsx`: the child is the
   * trigger itself (`TooltipTrigger render={children}`), so it takes the
   * trigger's props and no wrapper changes its layout.
   */
  interface Props {
    label: string;
    child: Snippet<[Record<string, unknown>]>;
  }

  let { label, child }: Props = $props();
  const sidebar = useSidebar();
</script>

{#if sidebar.collapsed}
  <Tooltip>
    <TooltipTrigger {child} />
    <TooltipContent side="right">{label}</TooltipContent>
  </Tooltip>
{:else}
  {@render child({})}
{/if}
