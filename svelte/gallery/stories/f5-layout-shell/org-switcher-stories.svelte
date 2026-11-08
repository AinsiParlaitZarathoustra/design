<script lang="ts">
  import { onMount } from "svelte";
  import type { Organisation } from "../../../src/lib/types";
  import OrgMark from "../../../src/lots/f5-layout-shell/shell/org-mark.svelte";
  import OrgSwitcher from "../../../src/lots/f5-layout-shell/shell/org-switcher.svelte";
  import StoryLinks from "./story-links.svelte";
  import { LONG_ORG, MANY_ORGS, ORGS, USER } from "../f5-layout-shell-fixtures";

  /**
   * The workspace switcher, ported from `stories/components/shell/org-switcher.stories.tsx`.
   * `story` names the scenario. The source's `play` functions open the menu, then
   * its "Switch workspace" submenu, here as DOM clicks after mount.
   */
  interface Props {
    story: string;
  }

  let { story }: Props = $props();

  const org = $derived(story === "long-text" ? LONG_ORG : ORGS[0]!);
  const orgs = $derived(
    story === "long-text" ? [LONG_ORG, ...ORGS] : story === "many-items" ? MANY_ORGS : ORGS,
  );
  const collapsed = $derived(story === "collapsed");
  // The org the switcher shows: switching changes it, as the source's `Demo` does.
  let active = $state<Organisation>(ORGS[0]!);
  let root = $state<HTMLElement | null>(null);

  function itemNamed(text: string): HTMLElement | undefined {
    return Array.from(document.querySelectorAll<HTMLElement>("[role='menuitem']")).find((el) =>
      el.textContent?.includes(text),
    );
  }

  onMount(() => {
    active = org;
    if (!root) return;
    if (story === "open" || story === "switch-workspace" || story === "many-items") {
      root.querySelector<HTMLElement>("button")?.click();
    }
    if (story === "switch-workspace" || story === "many-items") {
      setTimeout(() => itemNamed("Switch workspace")?.click(), 60);
    }
  });
</script>

{#if story === "mark"}
  <div class="flex items-center gap-2">
    <OrgMark initials="AT" />
    <OrgMark initials="NL" class="size-6 rounded-md text-3xs" />
  </div>
{:else}
  <StoryLinks>
    <div bind:this={root} class="min-h-96 w-56 rounded-lg bg-sidebar p-2">
      <OrgSwitcher
        org={active}
        {orgs}
        email={USER.email}
        {collapsed}
        onOrgChange={(id) => {
          active = orgs.find((item) => item.id === id) ?? active;
        }}
        settingsHref="/settings"
        onLogOut={() => {}}
      />
    </div>
  </StoryLinks>
{/if}
