<script lang="ts">
  import type { Snippet } from "svelte";
  import { splitGlyphCombo } from "../lib/combo";
  import type { Align, Side } from "../lots/f2-overlays-menus/placement";
  import Tooltip from "../lots/f2-overlays-menus/tooltip.svelte";
  import TooltipContent from "../lots/f2-overlays-menus/tooltip-content.svelte";
  import TooltipTrigger from "../lots/f2-overlays-menus/tooltip-trigger.svelte";
  import { isFocusVisible } from "../lots/f2-overlays-menus/tooltip-context";
  import KbdKeys from "./kbd-keys.svelte";
  import { setHintLabel } from "./hint-context";

  /**
   * A hint on one control, ported from `Hint` in `src/ui/tooltip.tsx`: a
   * `Tooltip` whose content is the label, then the shortcut as keycaps.
   *
   * The source renders the child itself as the trigger. Here the child is a
   * plain snippet, so an `inline-flex` span carries the trigger's props, as the
   * source's own wrapper does for a disabled child. Focus does not bubble, so
   * the span forwards its children's keyboard focus to the trigger.
   */
  interface Props {
    label: string;
    shortcut?: string;
    side?: Side;
    align?: Align;
    sideOffset?: number;
    wrap?: boolean;
    class?: string;
    children: Snippet;
  }

  let {
    label,
    shortcut,
    side = "bottom",
    align,
    sideOffset = 4,
    wrap = false,
    class: className,
    children,
  }: Props = $props();

  /** A word combo ("Ctrl+Shift+B", "Ctrl++") splits on its plus signs; a glyph string ("⌘⇧B") splits as `KbdCombo` does. */
  function shortcutKeys(value: string): string[] {
    const words = value.split(/\+(?=.)/);
    return words.length > 1 && words.every(Boolean) ? words : splitGlyphCombo(value);
  }

  type Handler = (event: Event) => void;

  setHintLabel(() => label);

  // The source names its one child with the label (`hintTriggerProps`) unless it
  // already has a name. A button component claims the label itself (above); any
  // other child without a name takes it here.
  function nameChild(node: HTMLElement) {
    const child = node.firstElementChild;
    if (!child || child.hasAttribute("aria-label") || child.hasAttribute("aria-labelledby")) return;
    child.setAttribute("aria-label", label);
    return () => child.removeAttribute("aria-label");
  }
</script>

<Tooltip>
  <TooltipTrigger>
    {#snippet child(props)}
      <!-- The span only carries the trigger's pointer and focus events for its child, which is the control itself. -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span
        {...props}
        {@attach nameChild}
        class={wrap ? "inline-flex [&>:disabled]:pointer-events-none" : "inline-flex"}
        onfocusin={(event) => {
          if (isFocusVisible(event.target)) (props.onpointerenter as Handler)(event);
        }}
        onfocusout={(event) => (props.onblur as Handler)(event)}
      >
        {@render children()}
      </span>
    {/snippet}
  </TooltipTrigger>
  <TooltipContent {side} {align} {sideOffset} class={className}>
    {label}{#if shortcut}<KbdKeys
        keys={shortcutKeys(shortcut)}
        variant="inherit"
        class="-my-0.5 ml-2 gap-0.5 align-middle"
      />{/if}
  </TooltipContent>
</Tooltip>
