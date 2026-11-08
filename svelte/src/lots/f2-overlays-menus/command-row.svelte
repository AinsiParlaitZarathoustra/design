<script lang="ts">
  import type { CommandPaletteItem } from "./command-list";
  import CommandItem from "./command-item.svelte";
  import CommandItemIcon from "./command-item-icon.svelte";
  import CommandShortcut from "./command-shortcut.svelte";
  import CommandSubmenuChevron from "./command-submenu-chevron.svelte";

  /**
   * One row of a palette, ported from `CommandRow`: the icon, the title (and a
   * description under it), then the timestamp, the trailing content, the shortcut
   * and a submenu's chevron on the right. A press keeps focus in the field.
   */
  interface Props {
    id: string;
    item: CommandPaletteItem;
    active: boolean;
    onPoint?: (x: number, y: number) => void;
    onRun: (item: CommandPaletteItem) => void;
  }

  let { id, item, active, onPoint, onRun }: Props = $props();
</script>

<CommandItem
  {id}
  {active}
  disabled={item.disabled ?? false}
  onpointermove={onPoint ? (event: PointerEvent) => onPoint(event.clientX, event.clientY) : undefined}
  onmousedown={(event: MouseEvent) => event.preventDefault()}
  onclick={() => {
    if (!item.disabled) onRun(item);
  }}
>
  {#if item.icon}<CommandItemIcon>{@render item.icon()}</CommandItemIcon>{/if}
  {#if item.description}
    <span class="flex min-w-0 flex-1 flex-col">
      <span class="truncate text-foreground">{#if item.title}{@render item.title()}{:else}{item.label}{/if}</span>
      <span class="min-w-0 truncate text-sm text-muted-foreground">{@render item.description()}</span>
    </span>
  {:else}
    <span class="flex min-w-0 flex-1 items-center"><span class="truncate text-foreground">{#if item.title}{@render item.title()}{:else}{item.label}{/if}</span></span>
  {/if}
  {#if item.trailing}{@render item.trailing()}{/if}
  {#if item.timestamp}
    <span class="ms-auto min-w-12 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{item.timestamp}</span>
  {/if}
  {#if item.shortcut}<CommandShortcut>{item.shortcut}</CommandShortcut>{/if}
  {#if item.groups}<CommandSubmenuChevron />{/if}
</CommandItem>
