<script lang="ts">
  import { cn } from "../../lib/utils";
  import { splitHighlights } from "./command-list";
  import type { SearchResult } from "./search-overlay-types";
  import CommandItem from "./command-item.svelte";
  import CommandItemIcon from "./command-item-icon.svelte";

  /**
   * One result, ported from `SearchResultRow`: the icon, the title and meta on the
   * first line, and the matching text on the second, with its matches in the
   * foreground colour. Colour alone marks a match, as in desktop's file search.
   */
  interface Props {
    id: string;
    result: SearchResult;
    active: boolean;
    onPoint?: (x: number, y: number) => void;
    onOpen: (result: SearchResult) => void;
  }

  let { id, result, active, onPoint, onOpen }: Props = $props();
  const segments = $derived(splitHighlights(result.detail ?? "", result.highlights));
</script>

<CommandItem
  {id}
  {active}
  onpointermove={onPoint ? (event: PointerEvent) => onPoint(event.clientX, event.clientY) : undefined}
  onmousedown={(event: MouseEvent) => event.preventDefault()}
  onclick={() => onOpen(result)}
>
  {#if result.icon}<CommandItemIcon>{@render result.icon()}</CommandItemIcon>{/if}
  <span class="flex min-w-0 flex-1 flex-col">
    <span class="flex min-w-0 items-baseline gap-2">
      <span class={cn("min-w-0 truncate", result.mono && "font-mono text-sm")}>{result.title}</span>
      {#if result.meta}
        <span class="shrink-0 text-xs tabular-nums text-muted-foreground">{result.meta}</span>
      {/if}
    </span>
    {#if result.detail}
      <span class={cn("min-w-0 truncate text-sm text-muted-foreground", result.mono && "font-mono")}>
        {#each segments as segment, i (i)}{#if segment.match}<mark data-match="" class="bg-transparent text-foreground">{segment.text}</mark>{:else}{segment.text}{/if}{/each}
      </span>
    {/if}
  </span>
</CommandItem>
