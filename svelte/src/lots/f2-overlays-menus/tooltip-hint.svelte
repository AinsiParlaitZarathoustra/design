<script lang="ts">
  import type { Snippet } from "svelte";
  import { splitGlyphCombo } from "../../lib/combo";
  import KbdKeys from "../../ui/kbd-keys.svelte";
  import type { Align, Side } from "./placement";
  import Tooltip from "./tooltip.svelte";
  import TooltipContent from "./tooltip-content.svelte";
  import TooltipTrigger from "./tooltip-trigger.svelte";

  /**
   * The tooltip for one icon-only control, ported from `Hint` in `tooltip.tsx`:
   *
   *   <Hint label="Refresh">{#snippet child(props)}<IconButton {...props} … />{/snippet}</Hint>
   *
   * The child receives the trigger's props, with the native `title` dropped and
   * the label as `aria-label` when the child names itself with nothing else. A
   * string `shortcut` draws as keycaps (`KbdKeys`, inheriting the tooltip's ink),
   * any other text is drawn dimmed.
   */
  interface Props {
    label: string;
    shortcut?: string;
    side?: Side;
    align?: Align;
    sideOffset?: number;
    /** Wrap the child in a span (the source does this for a disabled child). */
    wrap?: boolean;
    child: Snippet<[Record<string, unknown>]>;
  }

  let { label, shortcut, side = "bottom", align, sideOffset = 4, wrap = false, child }: Props =
    $props();

  /** A word combo ("Ctrl+Shift+B", "Ctrl++") splits on its plus signs; a glyph string ("⌘⇧B") splits as `KbdCombo` does. */
  function shortcutKeys(value: string): string[] {
    const words = value.split(/\+(?=.)/);
    return words.length > 1 && words.every(Boolean) ? words : splitGlyphCombo(value);
  }

  function hintProps(props: Record<string, unknown>): Record<string, unknown> {
    const named = props["aria-label"] !== undefined || props["aria-labelledby"] !== undefined;
    return { ...props, title: undefined, "aria-label": named ? props["aria-label"] : label };
  }
</script>

{#snippet hintTrigger(props: Record<string, unknown>)}
  {#if wrap}
    <span class="inline-flex [&>:disabled]:pointer-events-none">
      {@render child(hintProps(props))}
    </span>
  {:else}
    {@render child(hintProps(props))}
  {/if}
{/snippet}

<Tooltip>
  <TooltipTrigger child={hintTrigger} />
  <TooltipContent {side} {align} {sideOffset}>
    {label}{#if shortcut}<KbdKeys
        keys={shortcutKeys(shortcut)}
        variant="inherit"
        class="-my-0.5 ml-2 gap-0.5 align-middle"
      />{:else if shortcut != null}<span class="ml-1.5 text-muted-foreground">{shortcut}</span>{/if}
  </TooltipContent>
</Tooltip>
