<script lang="ts">
  import { cn } from "../../../lib/utils";
  import { ANSI_BG_CLASS, ANSI_NAMES } from "./code-surface";

  /**
   * The theme's terminal colours on the terminal's own background: the sixteen
   * ANSI slots, normal over bright, then a line with the cursor and a selection.
   * A specimen for a theme page or a theme editor.
   */
  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props();

  const rows = [ANSI_NAMES.slice(0, 8), ANSI_NAMES.slice(8)];
</script>

<div
  data-slot="terminal-palette"
  class={cn(
    "flex flex-col gap-3 rounded-md border border-border bg-terminal-background p-3 font-mono text-2xs text-terminal-foreground",
    className,
  )}
>
  {#each rows as row, r (r)}
    <div class="grid grid-cols-4 gap-2 sm:grid-cols-8">
      {#each row as name, i (name)}
        {@const slot = r * 8 + i}
        <div class="flex min-w-0 flex-col gap-1">
          <span class={cn("h-6 rounded-sm", ANSI_BG_CLASS[slot])}></span>
          <span class="truncate opacity-70">{slot}{" "}<span>{name}</span></span>
        </div>
      {/each}
    </div>
  {/each}
  <div class="text-sm"><span class="text-terminal-ansi-green">~/atlas</span> <span class="bg-terminal-selection">git status</span><span aria-hidden="true" class="ml-px inline-block h-[1.1em] w-[0.6em] bg-terminal-cursor align-text-bottom"></span></div>
</div>
