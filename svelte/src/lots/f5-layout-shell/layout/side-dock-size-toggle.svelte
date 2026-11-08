<script lang="ts">
  import { Columns2, PanelRight } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import IconButton from "../../../ui/icon-button.svelte";
  import SegmentedIconGroup from "../deps/segmented-icon-group.svelte";
  import { getSideDockState, type SideDockMode } from "./app-frame";

  /**
   * The two dock sizes as one segmented control, for a dock's header. Ported
   * from `SideDockSizeToggle` in `app-frame.tsx`.
   */
  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props();

  const frame = getSideDockState();

  const SIZES: Array<{ mode: SideDockMode; icon: typeof PanelRight; label: string }> = [
    { mode: "compact", icon: PanelRight, label: "Compact panel" },
    { mode: "half", icon: Columns2, label: "Half-width panel" },
  ];
</script>

<SegmentedIconGroup class={cn(className)}>
  {#each SIZES as size (size.mode)}
    <IconButton
      icon={size.icon}
      label={size.label}
      size="xs"
      aria-pressed={frame.mode === size.mode}
      onclick={() => frame.setMode(size.mode)}
    />
  {/each}
</SegmentedIconGroup>
