<script module lang="ts">
  export type SettingsNavItem = { label: string; to: string; icon: any };
  export type SettingsNavGroup = { label: string; items: Array<SettingsNavItem> };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { ArrowLeft } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import Link from "../deps/Link.svelte";
  import { getLinks, isAt } from "../deps/link";
  import { createScrollEdges } from "../deps/scroll-edges.svelte";
  import ScrollFade from "../deps/scroll-fade.svelte";
  import OrgMark from "./org-mark.svelte";

  /**
   * Settings is a MODE, not a page: you leave the app, with an explicit way back.
   * Same frame as the app shell: a curved nav panel on the canvas, eyebrow group
   * labels, the rail's rows. Ported from `src/components/shell/settings-shell.tsx`.
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

  const links = getLinks();

  let nav = $state<HTMLElement | null>(null);
  let page = $state<HTMLElement | null>(null);
  const navEdges = createScrollEdges(() => nav);
  const pageEdges = createScrollEdges(() => page);

  $effect(() => {
    const el = nav;
    if (!el) return;
    return navEdges.observe(el);
  });

  $effect(() => {
    const el = page;
    if (!el) return;
    return pageEdges.observe(el);
  });
</script>

{#snippet railLink(to: string, glyph: any, text: string)}
  <Link
    href={to}
    aria-current={isAt(links.location, to) ? "page" : undefined}
    class={cn(
      "group/item flex h-7 items-center gap-2 rounded-md px-2 text-xs",
      "transition-colors duration-fast ease-out-strong",
      "text-muted-foreground hover:bg-element-hover hover:text-foreground",
      "aria-[current=page]:bg-element-selected aria-[current=page]:font-medium aria-[current=page]:text-foreground",
    )}
  >
    {#if glyph}
      <Icon icon={glyph} size="sm" />
    {/if}
    <span class="truncate">{text}</span>
  </Link>
{/snippet}

<div class="flex h-svh w-full flex-col overflow-hidden bg-sidebar">
  <div class="flex min-h-0 flex-1 gap-2 p-2">
    <nav aria-label="Settings" data-panel="" class="flex w-56 shrink-0 flex-col">
      <div class="flex h-10 shrink-0 items-center pb-2">
        {@render railLink(backHref, ArrowLeft, "Back to app")}
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
              <div class="mb-3">
                <div class="px-2 pb-1.5 eyebrow">{group.label}</div>
                <ul class="space-y-px">
                  {#each group.items as item (item.to)}
                    <li>
                      {@render railLink(item.to, item.icon, item.label)}
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
          <ScrollFade at="top" visible={navEdges.edges.top} class="h-6 from-background" />
          <ScrollFade at="bottom" visible={navEdges.edges.bottom} class="h-6 from-background" />
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
      <ScrollFade at="top" visible={pageEdges.edges.top} class="from-background" />
      <ScrollFade at="bottom" visible={pageEdges.edges.bottom} class="from-background" />
    </div>
  </div>
</div>
