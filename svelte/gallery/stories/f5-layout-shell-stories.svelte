<script lang="ts">
  import { onMount } from "svelte";
  import { Menu } from "lucide-svelte";
  import AppFrame from "../../src/lots/f5-layout-shell/layout/app-frame.svelte";
  import type { AppFrameInset, SideDockMode } from "../../src/lots/f5-layout-shell/layout/app-frame";
  import ResizableSplit from "../../src/lots/f5-layout-shell/layout/resizable-split.svelte";
  import ResizablePane from "../../src/lots/f5-layout-shell/layout/resizable-pane.svelte";
  import ResizableHandle from "../../src/lots/f5-layout-shell/layout/resizable-handle.svelte";
  import type {
    ResizableLayout,
    ResizableOrientation,
    ResizablePanelHandle,
  } from "../../src/lots/f5-layout-shell/layout/resizable.svelte";
  import Sidebar from "../../src/lots/f5-layout-shell/shell/sidebar.svelte";
  import SidebarHeader from "../../src/lots/f5-layout-shell/shell/sidebar-header.svelte";
  import SidebarPanel from "../../src/lots/f5-layout-shell/shell/sidebar-panel.svelte";
  import SidebarBody from "../../src/lots/f5-layout-shell/shell/sidebar-body.svelte";
  import SidebarGroup from "../../src/lots/f5-layout-shell/shell/sidebar-group.svelte";
  import SidebarItem from "../../src/lots/f5-layout-shell/shell/sidebar-item.svelte";
  import PageHeader from "../../src/lots/f5-layout-shell/deps/page-header.svelte";
  import StoryLink from "../../src/lots/f5-layout-shell/deps/story-link.svelte";
  import { setLinks, type LinkLocation } from "../../src/lots/f5-layout-shell/deps/link";
  import Button from "../../src/ui/button.svelte";
  import IconButton from "../../src/ui/icon-button.svelte";
  import { cn } from "../../src/lib/utils";
  import { NAV, SESSIONS } from "./f5-layout-shell-fixtures";
  import SessionDock from "./f5-layout-shell-dock.svelte";

  /**
   * The layout stories' scenarios, ported from
   * `stories/components/layout/app-frame.stories.tsx` and
   * `resizable-split.stories.tsx`. One component backs a family; `story` names
   * the scenario, as the witness families do.
   */
  interface Props {
    story: string;
    appearance?: "dark" | "light";
  }

  let { story }: Props = $props();

  // The links the frame's rail and rows render: inert anchors, a fixed location.
  const location: LinkLocation = { pathname: "/sessions" };
  setLinks({ Link: StoryLink, location, navigate: () => {} });

  type FrameStory = {
    docked?: boolean;
    initialMode?: SideDockMode;
    topBar?: boolean;
    empty?: boolean;
    inset?: AppFrameInset;
  };

  const FRAMES: Record<string, FrameStory> = {
    "frame-default": {},
    "frame-with-dock": { docked: true },
    "frame-half-dock": { docked: true, initialMode: "half" },
    "frame-empty": { empty: true },
    "frame-light": { docked: true },
    "frame-titlebar-inset": { inset: "sides", docked: true },
    "frame-phone": { topBar: true },
  };

  const frame = $derived(FRAMES[story]);

  // The source stories are `layout: fullscreen`: Storybook draws them with no
  // body padding. The gallery pads every story body (its "padded" layout), so a
  // fullscreen frame drops that padding while it is mounted, and restores it.
  $effect(() => {
    if (!frame) return;
    const body = document.body;
    const before = body.style.padding;
    body.style.padding = "0";
    return () => {
      body.style.padding = before;
    };
  });
  // The app's state: the frame reports a pick and keeps nothing.
  // svelte-ignore state_referenced_locally
  let dockMode = $state<SideDockMode>(FRAMES[story]?.initialMode ?? "compact");
  // svelte-ignore state_referenced_locally
  let selected = $state<number | null>(FRAMES[story]?.docked ? 0 : null);
  const row = $derived(selected === null ? undefined : SESSIONS[selected]);
  const sides = $derived(frame?.inset === "sides");

  const SPLITS: Record<string, { orientation: ResizableOrientation; panes: number }> = {
    horizontal: { orientation: "horizontal", panes: 2 },
    vertical: { orientation: "vertical", panes: 2 },
    "many-panes": { orientation: "horizontal", panes: 4 },
    light: { orientation: "horizontal", panes: 2 },
  };

  const split = $derived(SPLITS[story]);
  const titles = $derived(["Sessions", "Transcript", "Files", "Diff"].slice(0, split?.panes ?? 2));
  let saved = $state<ResizableLayout | null>(null);

  function format(layout: ResizableLayout | null): string {
    return layout
      ? Object.entries(layout)
          .map(([id, size]) => `${id} ${size.toFixed(0)}%`)
          .join(" · ")
      : "nothing yet";
  }

  // The collapsible pane's handle, written by the pane itself.
  const panel: { current: ResizablePanelHandle | null } = { current: null };
  let open = $state(true);

  // The source's Light stories set the light appearance as a story global, whatever
  // the toolbar says. The gallery takes the appearance from the URL, so the story
  // draws the light theme itself, after the root has taken the URL's value.
  onMount(() => {
    if (story === "frame-light" || story === "light") {
      setTimeout(() => (document.documentElement.dataset.appearance = "light"), 0);
    }
  });
</script>

{#snippet titleRow(lights: boolean, title?: string)}
  <div
    data-testid={lights ? "title-row-lights" : "title-row"}
    class="flex h-9 shrink-0 items-center gap-2 border-b border-border-subtle px-3"
  >
    {#if lights}
      <span aria-hidden="true" class="flex gap-2">
        {#each [0, 1, 2] as i (i)}
          <span class="size-3 rounded-full bg-muted"></span>
        {/each}
      </span>
    {/if}
    {#if title}
      <span class="label truncate">{title}</span>
    {/if}
  </div>
{/snippet}

{#snippet bar()}
  <div class="flex h-10 shrink-0 items-center gap-1 px-2 lg:hidden">
    <IconButton icon={Menu} label="Open navigation" size="sm" />
    <span class="truncate text-xs font-medium">Sessions</span>
  </div>
{/snippet}

{#snippet rail()}
  <Sidebar class="lg:mr-2 max-lg:hidden">
    {#if sides}
      {@render titleRow(true)}
    {:else}
      <SidebarHeader>
        <span class="label px-2">Atlas</span>
      </SidebarHeader>
    {/if}
    <SidebarPanel class={sides ? "rounded-t-none border-t-0" : undefined}>
      <SidebarBody>
        <SidebarGroup label="Workspace">
          {#each NAV.workspace as item (item.to)}
            <SidebarItem {...item} />
          {/each}
        </SidebarGroup>
      </SidebarBody>
    </SidebarPanel>
  </Sidebar>
{/snippet}

{#snippet page()}
  {#if sides}
    {@render titleRow(false, "Sessions")}
  {/if}
  <div class="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-5">
    <PageHeader title="Sessions" description={`The app keeps the dock at ${dockMode}.`} />
    {#if frame?.empty}
      <p class="caption">Nothing here: the page is whatever the app renders.</p>
    {:else}
      <div class="overflow-hidden rounded-lg border border-border">
        {#each SESSIONS as s, i (s.ref)}
          <button
            type="button"
            onclick={() => (selected = i)}
            class={cn(
              "flex w-full items-center gap-2 border-b border-border-subtle px-3 py-2 text-left last:border-b-0",
              "transition-colors duration-fast ease-out-strong hover:bg-element-hover",
              selected === i && "bg-element-selected",
            )}
          >
            <span class="code shrink-0 text-muted-foreground">{s.ref}</span>
            <span class="label min-w-0 flex-1 truncate">{s.title}</span>
          </button>
        {/each}
      </div>
    {/if}
  </div>
  {#if row}
    <SessionDock {row} onClose={() => (selected = null)} />
  {/if}
{/snippet}

{#snippet pane(title: string, body: string)}
  <div class="flex h-full flex-col gap-1 p-3">
    <span class="eyebrow">{title}</span>
    <p class="caption">{body}</p>
  </div>
{/snippet}

{#if frame}
  <AppFrame
    {dockMode}
    onDockModeChange={(next: SideDockMode) => (dockMode = next)}
    inset={frame.inset ?? "all"}
    topBar={frame.topBar ? bar : undefined}
  >
    {#snippet sidebar()}
      {@render rail()}
    {/snippet}
    {@render page()}
  </AppFrame>
{:else if split && story !== "collapsed-pane" && story !== "nested"}
  <div class="flex w-full max-w-3xl flex-col gap-2">
    <div class="h-72 overflow-hidden rounded-md border border-border bg-background">
      <ResizableSplit
        id={`story-${split.orientation}-${split.panes}`}
        orientation={split.orientation}
        onLayoutCommit={(layout) => (saved = layout)}
      >
        {#each titles as title, i (title)}
          {#if i > 0}
            <ResizableHandle />
          {/if}
          <ResizablePane id={title.toLowerCase()} minSize="15">
            {@render pane(title, "Drag the rule between panes.")}
          </ResizablePane>
        {/each}
      </ResizableSplit>
    </div>
    <span class="caption">Committed: {format(saved)}</span>
  </div>
{:else if story === "collapsed-pane"}
  <div class="flex w-full max-w-3xl flex-col gap-2">
    <div class="h-72 overflow-hidden rounded-md border border-border bg-background">
      <ResizableSplit id="story-collapsible">
        <ResizablePane id="main" minSize="30">
          {@render pane("Session", "The main pane.")}
        </ResizablePane>
        <ResizableHandle hidden={!open} />
        <ResizablePane
          id="side"
          panelRef={panel}
          defaultSize="35"
          minSize="20"
          collapsible
          collapsedSize={0}
          onResize={(size) => (open = size.asPercentage > 0)}
        >
          {@render pane("Surfaces", "Collapsed, it stays mounted; so does its handle.")}
        </ResizablePane>
      </ResizableSplit>
    </div>
    <div>
      <Button
        size="sm"
        variant="outline"
        onclick={() => (open ? panel.current?.collapse() : panel.current?.expand())}
      >
        {open ? "Collapse" : "Expand"} the side pane
      </Button>
    </div>
  </div>
{:else if story === "nested"}
  <div class="h-80 w-full max-w-3xl overflow-hidden rounded-md border border-border bg-background">
    <ResizableSplit id="story-outer" orientation="vertical">
      <ResizablePane id="editor" minSize="20">
        {@render pane("Editor", "Above.")}
      </ResizablePane>
      <ResizableHandle />
      <ResizablePane id="bottom" defaultSize="40" minSize="20">
        <ResizableSplit id="story-inner">
          <ResizablePane id="terminal" minSize="20">
            {@render pane("Terminal", "Left.")}
          </ResizablePane>
          <ResizableHandle />
          <ResizablePane id="output" minSize="20">
            {@render pane("Output", "Right.")}
          </ResizablePane>
        </ResizableSplit>
      </ResizablePane>
    </ResizableSplit>
  </div>
{/if}
