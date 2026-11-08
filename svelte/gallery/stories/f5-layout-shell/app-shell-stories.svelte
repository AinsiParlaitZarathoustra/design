<script lang="ts">
  import { onMount } from "svelte";
  import { Folder, Plus } from "lucide-svelte";
  import { cn } from "../../../src/lib/utils";
  import StatusIcon from "../../../src/lots/f4-ui-second-half-patterns/status-icon.svelte";
  import type { SideDockMode } from "../../../src/lots/f5-layout-shell/layout/app-frame";
  import AppShell from "../../../src/lots/f5-layout-shell/shell/app-shell.svelte";
  import InfoMenu from "../../../src/lots/f5-layout-shell/shell/info-menu.svelte";
  import OrgSwitcher from "../../../src/lots/f5-layout-shell/shell/org-switcher.svelte";
  import ProfileMenu from "../../../src/lots/f5-layout-shell/shell/profile-menu.svelte";
  import SidebarGroup from "../../../src/lots/f5-layout-shell/shell/sidebar-group.svelte";
  import SidebarItem from "../../../src/lots/f5-layout-shell/shell/sidebar-item.svelte";
  import ThemeToggle from "../../../src/lots/f5-layout-shell/shell/theme-toggle.svelte";
  import UiScaleControl from "../../../src/lots/f5-layout-shell/shell/ui-scale-control.svelte";
  import PageHeader from "../../../src/lots/f5-layout-shell/deps/page-header.svelte";
  import StoryLinks from "./story-links.svelte";
  import SessionDock from "./app-shell-session-dock.svelte";
  import Button from "../../../src/ui/button.svelte";
  import Icon from "../../../src/ui/icon.svelte";
  import {
    ACTIONS,
    MANY_SESSIONS,
    NAV,
    ORGS,
    SESSIONS,
    USER,
  } from "../f5-layout-shell-fixtures";

  /**
   * The app frame, filled the way the Atlas apps fill it. Ported from
   * `stories/components/shell/app-shell.stories.tsx`. `story` names the scenario;
   * the rail's collapsed state and the dock's size are the app's, kept here as the
   * source's `Demo` keeps them.
   */
  interface Props {
    story: string;
  }

  let { story }: Props = $props();

  type Row = (typeof SESSIONS)[number];

  const rows = $derived<Row[]>(
    story === "empty" ? [] : story === "many-items" ? MANY_SESSIONS : SESSIONS,
  );
  const docked = $derived(story === "with-dock" || story === "light");

  // The app's state, which it would remember wherever it remembers things.
  // svelte-ignore state_referenced_locally
  let railCollapsed = $state(story === "collapsed");
  let dockMode = $state<SideDockMode>("compact");
  let scale = $state(1);
  let appearance = $state<"dark" | "light">("dark");

  // The Light story draws the light theme, as the source's `globals` does.
  onMount(() => {
    if (story === "light") {
      setTimeout(() => {
        document.documentElement.dataset.appearance = "light";
      }, 0);
    }
    if (story === "command-open") {
      // ⌘K, as the source's play presses it.
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }),
      );
    }
  });

  // The selected row: the dock opens on the first when the story docks it.
  // svelte-ignore state_referenced_locally
  let selected = $state<number | null>(docked ? 0 : null);
  const current = $derived(selected === null ? undefined : rows[selected]);
</script>

{#snippet header({ collapsed }: { collapsed: boolean })}
  <OrgSwitcher
    org={ORGS[0]!}
    orgs={ORGS}
    email={USER.email}
    onOrgChange={() => {}}
    settingsHref="/settings"
    {collapsed}
  />
{/snippet}

{#snippet nav()}
  <SidebarGroup label="Workspace">
    {#each NAV.workspace as item (item.to)}
      <SidebarItem {...item} />
    {/each}
  </SidebarGroup>
  <SidebarGroup label="Team">
    {#each NAV.team as item (item.to)}
      <SidebarItem {...item} />
    {/each}
    <SidebarItem icon={Folder} label="Projects" children={NAV.projects} />
  </SidebarGroup>
{/snippet}

{#snippet footer({ collapsed }: { collapsed: boolean })}
  <ProfileMenu user={USER} accountHref="/settings/profile" onLogOut={() => {}} />
  {#if !collapsed}
    <span class="flex-1"></span>
  {/if}
  <ThemeToggle
    {appearance}
    onToggle={() => (appearance = appearance === "dark" ? "light" : "dark")}
  />
  <UiScaleControl {scale} onScaleChange={(next) => (scale = next)} iconOnly />
  <InfoMenu links={{ docs: "#", github: "#", discord: "#" }} settingsHref="/settings" />
{/snippet}

{#snippet sessionsPage()}
  <div class="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-5">
    <PageHeader title="Sessions" description={`${rows.length} this week across 3 projects`}>
      {#snippet action()}
        <Button size="sm">
          <Icon icon={Plus} size="sm" />
          New session
        </Button>
      {/snippet}
    </PageHeader>
    {#if rows.length === 0}
      <div class="flex flex-1 flex-col items-center justify-center gap-1 py-16">
        <span class="label">No sessions yet</span>
        <span class="caption">Start one with ⌘N, or from ⌘K.</span>
      </div>
    {:else}
      <div class="overflow-hidden rounded-lg border border-border">
        {#each rows as row, i (`${row.ref}-${i}`)}
          <button
            type="button"
            onclick={() => (selected = i)}
            class={cn(
              "flex w-full items-center gap-2 border-b border-border-subtle px-3 py-2 text-left last:border-b-0",
              "transition-colors duration-fast ease-out-strong hover:bg-element-hover",
              selected === i && "bg-element-selected",
            )}
          >
            <StatusIcon status={i === 0 ? "live" : "done"} />
            <span class="code shrink-0 text-muted-foreground">{row.ref}</span>
            <span class="label min-w-0 flex-1 truncate">{row.title}</span>
            <span class="caption shrink-0">{row.who}</span>
            <span class="caption w-16 shrink-0 text-right">{row.ago}</span>
          </button>
        {/each}
      </div>
    {/if}
  </div>
  {#if current}
    <SessionDock row={current} onClose={() => (selected = null)} />
  {/if}
{/snippet}

<StoryLinks pathname="/sessions">
  <AppShell
    title="Sessions"
    actions={ACTIONS}
    collapsed={railCollapsed}
    onCollapsedChange={(next) => (railCollapsed = next)}
    {dockMode}
    onDockModeChange={(next) => (dockMode = next)}
    {header}
    {nav}
    {footer}
  >
    {@render sessionsPage()}
  </AppShell>
</StoryLinks>
