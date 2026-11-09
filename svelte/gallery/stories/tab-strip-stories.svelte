<script lang="ts">
  import { onMount } from "svelte";
  import TabStripDemo from "./tab-strip-demo.svelte";
  import { FileCode, FileText, GitCompare, Globe, Home, Terminal } from "lucide-svelte";
  import type { TabStripItem } from "../../src/components/layout/tab-strip-logic";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  // The source's Light story sets the light appearance as a story global, whatever
  // the toolbar says. The gallery takes the appearance from the URL, so the story
  // draws the light theme itself, after the root has taken the URL's value.
  onMount(() => {
    if (story === "light") {
      setTimeout(() => (document.documentElement.dataset.appearance = "light"), 0);
    }
  });

  const TABS: TabStripItem[] = [
    { id: "app", title: "app-frame.tsx", icon: FileCode, closable: true },
    { id: "readme", title: "README.md", icon: FileText, closable: true, dirty: true },
    { id: "diff", title: "Changes", icon: GitCompare, closable: true },
    { id: "term", title: "bun run test", icon: Terminal, closable: true, busy: true },
    { id: "docs", title: "Base UI · Tabs", icon: Globe, closable: true },
  ];

  const HOME: TabStripItem = { id: "home", title: "Home", icon: Home, pinned: true };

  const LONG: TabStripItem = {
    id: "long",
    title: "a-file-name-long-enough-to-truncate-in-the-strip.test.tsx",
    icon: FileCode,
    closable: true,
  };

  const MANY: TabStripItem[] = Array.from({ length: 16 }, (_, index) => ({
    ...TABS[index % TABS.length]!,
    id: `tab-${index}`,
    busy: false,
  }));
</script>

{#if story === "default"}
  <TabStripDemo />
{:else if story === "states"}
  <TabStripDemo items={[HOME, ...TABS, LONG]} />
{:else if story === "unfocused"}
  <TabStripDemo focused={false} />
{:else if story === "none-active"}
  <TabStripDemo initialActive={null} />
{:else if story === "overflow"}
  <TabStripDemo items={MANY} initialActive="tab-12" width="narrow" />
{:else if story === "empty"}
  <TabStripDemo items={[]} />
{:else if story === "behaviour-opt-outs"}
  <TabStripDemo optOut />
{:else if story === "drag-to-reorder"}
  <!-- The source's play function drags app-frame.tsx over Changes before the
       capture; the gallery has no play runner, so it starts in that settled
       order, with the same active tab. -->
  <TabStripDemo
    reorder
    plus={false}
    items={[TABS[1]!, TABS[2]!, TABS[0]!, TABS[3]!, TABS[4]!]}
    initialActive="app"
  />
{:else if story === "light"}
  <TabStripDemo items={[HOME, ...TABS]} />
{/if}
