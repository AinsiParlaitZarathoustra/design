<script lang="ts">
  import InfoMenu from "../../../src/lots/f5-layout-shell/shell/info-menu.svelte";
  import ProfileMenu from "../../../src/lots/f5-layout-shell/shell/profile-menu.svelte";
  import { useSidebar } from "../../../src/lots/f5-layout-shell/shell/sidebar";
  import { USER } from "../f5-layout-shell-fixtures";

  /**
   * The footer reads the rail's collapsed state, the way an app's tools do.
   * Ported from `Footer` in `stories/components/shell/sidebar.stories.tsx`.
   */
  const sidebar = useSidebar();
</script>

<ProfileMenu user={USER} accountHref="/settings/profile" onLogOut={() => {}} />
{#if !sidebar.collapsed}
  <span class="flex-1"></span>
{/if}
<InfoMenu links={{ docs: "#", github: "#", discord: "#" }} settingsHref="/settings" />
