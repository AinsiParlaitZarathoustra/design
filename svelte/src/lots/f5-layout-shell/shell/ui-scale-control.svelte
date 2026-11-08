<script lang="ts">
  import { Type } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Button from "../../../ui/button.svelte";
  import Icon from "../../../ui/icon.svelte";
  import IconButton from "../../../ui/icon-button.svelte";
  import { Popover, PopoverContent, PopoverTrigger } from "../../f2-overlays-menus/index";
  import UiScalePanel from "./ui-scale-panel.svelte";
  import type { UiScaleShortcuts } from "./ui-scale";

  /**
   * The panel behind a trigger, for a toolbar or a rail footer. Ported from
   * `UiScaleControl` in `src/components/shell/ui-scale.tsx`.
   */
  interface Props {
    scale: number;
    onScaleChange: (next: number) => void;
    class?: string;
    /** Just the glyph, for a tight toolbar; the percentage stays in the label. */
    iconOnly?: boolean;
    shortcuts?: UiScaleShortcuts;
  }

  let { scale, onScaleChange, class: className, iconOnly = false, shortcuts }: Props = $props();

  const pct = $derived(Math.round(scale * 100));
</script>

<Popover>
  <PopoverTrigger>
    {#snippet child(props)}
      {#if iconOnly}
        <IconButton
          {...props}
          icon={Type}
          label={`Interface scale, ${pct}%`}
          size="sm"
          class={className}
        />
      {:else}
        <Button
          {...props}
          variant="ghost"
          size="sm"
          class={cn("gap-1.5 text-muted-foreground", className)}
          aria-label={`Interface scale, ${pct}%`}
        >
          <Icon icon={Type} size="sm" />
          <span class="text-2xs tabular-nums">{pct}%</span>
        </Button>
      {/if}
    {/snippet}
  </PopoverTrigger>
  <PopoverContent align="end" surface="tinted" class="w-60">
    <UiScalePanel {scale} {onScaleChange} {shortcuts} />
  </PopoverContent>
</Popover>
