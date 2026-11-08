<script lang="ts">
  import { Folder, MessagesSquare } from "lucide-svelte";
  import StatusIcon from "../../../src/lots/f4-ui-second-half-patterns/status-icon.svelte";
  import OrgSwitcher from "../../../src/lots/f5-layout-shell/shell/org-switcher.svelte";
  import Sidebar from "../../../src/lots/f5-layout-shell/shell/sidebar.svelte";
  import SidebarBody from "../../../src/lots/f5-layout-shell/shell/sidebar-body.svelte";
  import SidebarFooter from "../../../src/lots/f5-layout-shell/shell/sidebar-footer.svelte";
  import SidebarGroup from "../../../src/lots/f5-layout-shell/shell/sidebar-group.svelte";
  import SidebarHeader from "../../../src/lots/f5-layout-shell/shell/sidebar-header.svelte";
  import SidebarItem from "../../../src/lots/f5-layout-shell/shell/sidebar-item.svelte";
  import SidebarPanel from "../../../src/lots/f5-layout-shell/shell/sidebar-panel.svelte";
  import SidebarSearch from "../../../src/lots/f5-layout-shell/shell/sidebar-search.svelte";
  import Fullscreen from "./fullscreen.svelte";
  import SidebarFooterTools from "./sidebar-footer-tools.svelte";
  import StoryLinks from "./story-links.svelte";
  import { LONG_ORG, NAV, ORGS, USER } from "../f5-layout-shell-fixtures";

  /**
   * The left rail, ported from `stories/components/shell/sidebar.stories.tsx`.
   * `story` names the scenario; the source's layout is fullscreen.
   */
  interface Props {
    story: string;
  }

  let { story }: Props = $props();

  const LONG_LABEL = "Sessions waiting on your review across every attached project";
  const EXTRA = Array.from({ length: 24 }, (_, i) => i);

  const collapsed = $derived(story === "collapsed");
  const empty = $derived(story === "empty");
  const long = $derived(story === "long-text");
  const many = $derived(story === "many-items");
  const pathname = $derived(
    story === "child-active" ? "/projects" : long ? "/inbox" : "/sessions",
  );
  const search = $derived(story === "child-active" ? "p=design" : undefined);
</script>

<Fullscreen>
  <StoryLinks {pathname} {search}>
    <div class="flex h-svh bg-sidebar p-2">
      <Sidebar {collapsed}>
        <SidebarHeader>
          <OrgSwitcher
            org={long ? LONG_ORG : ORGS[0]!}
            orgs={ORGS}
            email={USER.email}
            onOrgChange={() => {}}
            settingsHref="/settings"
            {collapsed}
          />
        </SidebarHeader>
        <SidebarPanel>
          <SidebarSearch onOpen={() => {}} />
          <SidebarBody>
            {#if empty}
              <p class="caption px-2 py-1">{collapsed ? "" : "Nothing here yet."}</p>
            {:else}
              <SidebarGroup label="Workspace">
                {#each NAV.workspace as item (item.to)}
                  <SidebarItem
                    {...item}
                    label={long && item.to === "/inbox" ? LONG_LABEL : item.label}
                    count={long && item.to === "/inbox" ? 128 : item.count}
                  />
                {/each}
              </SidebarGroup>
              <SidebarGroup label="Team">
                {#each NAV.team as item (item.to)}
                  <SidebarItem {...item} />
                {/each}
                <SidebarItem icon={Folder} label="Projects" to="/projects" children={NAV.projects} />
              </SidebarGroup>
              <SidebarGroup label="Running">
                <SidebarItem label="Port the session timeline" to="/sessions/971">
                  {#snippet mark()}
                    <StatusIcon status="live" />
                  {/snippet}
                </SidebarItem>
                <SidebarItem label="Fix flaky terminal test" to="/sessions/964">
                  {#snippet mark()}
                    <StatusIcon status="failed" />
                  {/snippet}
                </SidebarItem>
                {#if many}
                  {#each EXTRA as i (i)}
                    <SidebarItem
                      icon={MessagesSquare}
                      label={`Session ${i + 1}: follow-up work`}
                      to={`/sessions/x${i}`}
                    />
                  {/each}
                {/if}
              </SidebarGroup>
            {/if}
          </SidebarBody>
          <SidebarFooter class="justify-between">
            <SidebarFooterTools />
          </SidebarFooter>
        </SidebarPanel>
      </Sidebar>
      <main class="ml-2 flex-1 rounded-xl border border-border bg-background"></main>
    </div>
  </StoryLinks>
</Fullscreen>
