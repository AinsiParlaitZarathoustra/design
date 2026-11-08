<script lang="ts">
  import type { Snippet } from "svelte";
  import { ArrowLeft } from "lucide-svelte";
  import { useScrollEdges, ScrollFade } from "../../f1-primitives-forms/index";
  import OrgMark from "./org-mark.svelte";
  import RailLink from "./rail-link.svelte";
  import RailGroup from "./rail-group.svelte";
  import type { SettingsNavGroup } from "./settings-nav";

  /**
   * Settings is a MODE, not a page: you leave the app, with an explicit way back.
   * Same frame as the app shell: a curved nav panel on the canvas, eyebrow group
   * labels, the rail's rows. The page is a curved panel beside it, capped at a
   * reading width. Ported from `src/components/shell/settings-shell.tsx`.
   */
  interface Props {
    org: { name: string; initials: string };
    /** The rail's sections, e.g. Workspace and Account. */
    groups: Array<SettingsNavGroup>;
    /** Where "Back to app" goes. */
    backHref: string;
    children?: Snippet;
  }

  let { org, groups, backHref, children }: Props = $props();

  let nav = $state<HTMLElement | null>(null);
  let page = $state<HTMLElement | null>(null);
  const navEdges = useScrollEdges(() => nav, () => groups);
  const pageEdges = useScrollEdges(() => page, () => children);
</script>

<div class="flex h-svh w-full flex-col overflow-hidden bg-sidebar">
  <div class="flex min-h-0 flex-1 gap-2 p-2">
    <nav aria-label="Settings" data-panel="" class="flex w-56 shrink-0 flex-col">
      <div class="flex h-10 shrink-0 items-center pb-2">
        <RailLink to={backHref} icon={ArrowLeft}>Back to app</RailLink>
      </div>
      <div
        class="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-background"
      >
        <div class="flex items-center gap-2 px-3 pt-3 pb-3">
          <OrgMark initials={org.initials} class="size-6 rounded-md text-3xs" />
          <span class="truncate text-xs font-medium">{org.name}</span>
        </div>
        <div class="relative flex min-h-0 flex-1 flex-col">
          <div bind:this={nav} class="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
            {#each groups as group (group.label)}
              <RailGroup label={group.label} items={group.items} />
            {/each}
          </div>
          <ScrollFade at="top" visible={navEdges.top} class="h-6 from-background" />
          <ScrollFade at="bottom" visible={navEdges.bottom} class="h-6 from-background" />
        </div>
      </div>
    </nav>

    <div
      class="relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-xl border border-border bg-background"
    >
      <div bind:this={page} class="h-full overflow-y-auto">
        <div class="mx-auto w-full max-w-160 px-5 py-6">
          {@render children?.()}
        </div>
      </div>
      <ScrollFade at="top" visible={pageEdges.top} class="from-background" />
      <ScrollFade at="bottom" visible={pageEdges.bottom} class="from-background" />
    </div>
  </div>
</div>
