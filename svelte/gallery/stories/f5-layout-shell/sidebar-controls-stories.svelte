<script lang="ts">
  import { onMount } from "svelte";
  import InfoMenu from "../../../src/lots/f5-layout-shell/shell/info-menu.svelte";
  import type { InfoLinks } from "../../../src/lots/f5-layout-shell/shell/info-menu.svelte";
  import ProfileMenu from "../../../src/lots/f5-layout-shell/shell/profile-menu.svelte";
  import StoryLinks from "./story-links.svelte";
  import { USER } from "../f5-layout-shell-fixtures";

  /**
   * The rail footer's two menus, ported from `stories/components/shell/sidebar-controls.stories.tsx`.
   * `story` names the scenario; the source's `play` opens a menu after mount.
   */
  interface Props {
    story: string;
  }

  let { story }: Props = $props();

  const ALL_LINKS: InfoLinks = {
    docs: "#",
    feedback: "#",
    github: "#",
    discord: "#",
    x: "#",
    download: "#",
    website: "#",
  };

  const LONG_USER = {
    name: "Maximiliana Alexandrovna Konstantinopoulou",
    email: "maximiliana.konstantinopoulou@infrastructure-working-group.example.com",
  };

  const fewLinks = $derived(story === "info-few-links");
  const links: InfoLinks = $derived(fewLinks ? { docs: "#", feedback: "#" } : ALL_LINKS);
  const user = $derived(story === "long-text" ? LONG_USER : USER);
  const shortcuts = $derived(!fewLinks);
  const opens: "profile" | "info" | null = $derived(
    story === "profile-open" || story === "long-text"
      ? "profile"
      : story === "info-open" || story === "info-few-links"
        ? "info"
        : null,
  );

  let root = $state<HTMLElement | null>(null);

  onMount(() => {
    if (!root || !opens) return;
    const trigger =
      opens === "profile"
        ? root.querySelector<HTMLElement>("button[aria-label*='account']")
        : root.querySelector<HTMLElement>("button[aria-label='Help and links']");
    trigger?.click();
  });
</script>

<StoryLinks>
  <div bind:this={root} class="flex min-h-96 items-end">
    <div class="flex w-56 items-center justify-between rounded-xl border border-border bg-background p-2">
      <ProfileMenu {user} accountHref="/settings/profile" privacyHref="/settings/privacy" onLogOut={() => {}} />
      <InfoMenu {links} settingsHref="/settings" onShortcuts={shortcuts ? () => {} : undefined} />
    </div>
  </div>
</StoryLinks>
