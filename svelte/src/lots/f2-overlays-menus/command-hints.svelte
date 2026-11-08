<script lang="ts">
  import type { Snippet } from "svelte";
  import { ArrowDown, ArrowUp } from "lucide-svelte";
  import Icon from "../../ui/icon.svelte";
  import Kbd from "../../ui/kbd.svelte";
  import KbdGroup from "./deps/kbd-group.svelte";
  import CommandFooter from "./command-footer.svelte";
  import CommandFooterHint from "./command-footer-hint.svelte";

  /**
   * The key legend of a palette, ported from `CommandHints`: Navigate, then Enter,
   * Backspace and Esc as they apply, and `trailing` at the far end.
   */
  interface Props {
    actionLabel?: string;
    backLabel?: string;
    escapeLabel?: string;
    extra?: Snippet;
    trailing?: Snippet;
  }

  let { actionLabel, backLabel, escapeLabel = "Close", extra, trailing }: Props = $props();
</script>

<CommandFooter>
  <div class="flex items-center gap-4">
    <CommandFooterHint>
      <KbdGroup>
        <Kbd variant="soft" size="sm"><Icon icon={ArrowUp} size="sm" /></Kbd>
        <Kbd variant="soft" size="sm"><Icon icon={ArrowDown} size="sm" /></Kbd>
      </KbdGroup>
      <span>Navigate</span>
    </CommandFooterHint>
    {#if actionLabel !== undefined}
      <CommandFooterHint>
        <Kbd variant="soft" size="sm">Enter</Kbd>
        <span>{actionLabel}</span>
      </CommandFooterHint>
    {/if}
    {#if backLabel !== undefined}
      <CommandFooterHint>
        <Kbd variant="soft" size="sm">Backspace</Kbd>
        <span>{backLabel}</span>
      </CommandFooterHint>
    {/if}
    {@render extra?.()}
    <CommandFooterHint>
      <Kbd variant="soft" size="sm">Esc</Kbd>
      <span>{escapeLabel}</span>
    </CommandFooterHint>
  </div>
  {@render trailing?.()}
</CommandFooter>
