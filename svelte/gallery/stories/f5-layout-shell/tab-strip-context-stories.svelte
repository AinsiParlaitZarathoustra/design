<script lang="ts">
  import { FileCode, FileText, GitCompare, Globe, Plus, Terminal } from "lucide-svelte";
  import TabStrip from "../../../src/components/layout/tab-strip.svelte";
  import type { TabStripItem } from "../../../src/components/layout/tab-strip-logic";
  import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "../../../src/lots/f2-overlays-menus/index";
  import IconButton from "../../../src/ui/icon-button.svelte";

  /**
   * The tab strip with a context menu on each tab, ported from `ContextMenuOnTabs`
   * (the `Demo` with `menu`) in `stories/components/layout/tab-strip.stories.tsx`.
   */
  const TABS: TabStripItem[] = [
    { id: "app", title: "app-frame.tsx", icon: FileCode, closable: true },
    { id: "readme", title: "README.md", icon: FileText, closable: true, dirty: true },
    { id: "diff", title: "Changes", icon: GitCompare, closable: true },
    { id: "term", title: "bun run test", icon: Terminal, closable: true, busy: true },
    { id: "docs", title: "Base UI · Tabs", icon: Globe, closable: true },
  ];

  // The order and the active tab are the app's, as the source's `Demo` keeps them.
  let tabs = $state<TabStripItem[]>([...TABS]);
  let active = $state<string | null>(TABS[0]!.id);

  function close(id: string) {
    const index = tabs.findIndex((tab) => tab.id === id);
    const next = tabs.filter((tab) => tab.id !== id);
    tabs = next;
    if (id === active) active = next[Math.min(index, next.length - 1)]?.id ?? null;
  }

  function closeOthers(item: TabStripItem) {
    tabs = tabs.filter((tab) => tab.id === item.id || !tab.closable);
    active = item.id;
  }

  function add() {
    const id = `new-${tabs.length}-${Date.now()}`;
    tabs = [...tabs, { id, title: "Untitled", icon: FileText, closable: true }];
    active = id;
  }
</script>

<div
  class="flex h-9 w-full max-w-3xl items-center rounded-md border border-border bg-background px-1.5"
>
  <TabStrip
    aria-label="Open files"
    items={tabs}
    activeId={active}
    focused={true}
    onSelect={(id) => (active = id)}
    onClose={close}
    class="flex-1"
  >
    {#snippet trailing()}
      <IconButton icon={Plus} label="New tab" size="xs" onclick={add} />
    {/snippet}
    {#snippet renderTab(item, tab)}
      <ContextMenu>
        <ContextMenuTrigger class="contents">
          {@render tab()}
        </ContextMenuTrigger>
        <ContextMenuContent class="min-w-44">
          <ContextMenuItem disabled={!item.closable} onclick={() => close(item.id)}>
            Close
          </ContextMenuItem>
          <ContextMenuItem onclick={() => closeOthers(item)}>Close others</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    {/snippet}
  </TabStrip>
</div>
