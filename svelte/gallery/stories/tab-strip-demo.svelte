<script lang="ts">
  import { FileCode, FileText, GitCompare, Globe, Plus, Terminal } from "lucide-svelte";
  import TabStrip from "../../src/components/layout/tab-strip.svelte";
  import IconButton from "../../src/ui/icon-button.svelte";
  import type { TabStripItem } from "../../src/components/layout/tab-strip-logic";

  const TABS: TabStripItem[] = [
    { id: "app", title: "app-frame.tsx", icon: FileCode, closable: true },
    { id: "readme", title: "README.md", icon: FileText, closable: true, dirty: true },
    { id: "diff", title: "Changes", icon: GitCompare, closable: true },
    { id: "term", title: "bun run test", icon: Terminal, closable: true, busy: true },
    { id: "docs", title: "Base UI · Tabs", icon: Globe, closable: true },
  ];

  interface Props {
    items?: TabStripItem[];
    initialActive?: string | null;
    focused?: boolean;
    width?: "full" | "narrow";
    plus?: boolean;
    optOut?: boolean;
    reorder?: boolean;
    appearance?: string;
  }

  let {
    items = TABS,
    initialActive,
    focused = true,
    width = "full",
    plus = true,
    optOut = false,
    reorder = false,
  }: Props = $props();

  let tabs = $state<TabStripItem[]>([...items]);
  let active = $state<string | null>(
    initialActive === undefined ? (items[0]?.id ?? null) : initialActive,
  );
  let dragged = $state<string | null>(null);

  function close(id: string) {
    const index = tabs.findIndex((tab) => tab.id === id);
    const next = tabs.filter((tab) => tab.id !== id);
    tabs = next;
    if (id === active) active = next[Math.min(index, next.length - 1)]?.id ?? null;
  }

  function add() {
    const id = `new-${tabs.length}-${Date.now()}`;
    tabs = [...tabs, { id, title: "Untitled", icon: FileText, closable: true }];
    active = id;
  }

  function move(from: string, to: string) {
    const next = tabs.filter((tab) => tab.id !== from);
    const at = next.findIndex((tab) => tab.id === to);
    const tab = tabs.find((candidate) => candidate.id === from);
    if (!tab || at < 0) return;
    next.splice(
      tabs.findIndex((candidate) => candidate.id === from) <
        tabs.findIndex((candidate) => candidate.id === to)
        ? at + 1
        : at,
      0,
      tab,
    );
    tabs = next;
  }

  const dragProps = (item: TabStripItem): Record<string, unknown> =>
    reorder
      ? {
          draggable: true,
          dragging: dragged === item.id,
          ondragstart: (event: DragEvent) => {
            dragged = item.id;
            event.dataTransfer?.setData("text/plain", item.id);
          },
          ondragover: (event: DragEvent) => event.preventDefault(),
          ondrop: (event: DragEvent) => {
            event.preventDefault();
            if (dragged && dragged !== item.id) move(dragged, item.id);
            dragged = null;
          },
          ondragend: () => {
            dragged = null;
          },
        }
      : {};
</script>

<div
  class="flex h-9 items-center rounded-md border border-border bg-background px-1.5 {width ===
  'narrow'
    ? 'w-80'
    : 'w-full max-w-3xl'}"
>
  <TabStrip
    aria-label="Open files"
    items={tabs}
    activeId={active}
    {focused}
    onSelect={(id) => (active = id)}
    onClose={close}
    rovingFocus={!optOut}
    closeOnMiddleClick={!optOut}
    closeOnDelete={!optOut}
    closeLabel={optOut ? () => "Close tab" : undefined}
    tabProps={reorder ? dragProps : undefined}
  >
    {#snippet trailing()}
      {#if plus}
        <IconButton icon={Plus} label="New tab" size="xs" onclick={add} />
      {/if}
    {/snippet}
  </TabStrip>
</div>
