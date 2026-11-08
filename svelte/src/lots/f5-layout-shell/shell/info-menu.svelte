<script module lang="ts">
  /** Where the help menu's entries go. Each one left out is not shown. */
  export type InfoLinks = {
    docs?: string;
    feedback?: string;
    github?: string;
    discord?: string;
    x?: string;
    download?: string;
    website?: string;
  };
</script>

<script lang="ts">
  import {
    BookOpen,
    CircleHelp,
    Download,
    Globe as GlobeIcon,
    Keyboard,
    MessageCircle,
    Settings,
  } from "lucide-svelte";
  import Icon from "../../../ui/icon.svelte";
  import IconButton from "../../../ui/icon-button.svelte";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "../../f2-overlays-menus/index";
  import DiscordMark from "../../f3-ui-first-half/discord-mark.svelte";
  import GitHubMark from "../../f3-ui-first-half/github-mark.svelte";
  import XMark from "../../f3-ui-first-half/x-mark.svelte";
  import MenuLinkItem from "../deps/menu-link-item.svelte";

  /**
   * The help menu: docs, the community, and the way out to settings and the
   * website. External destinations open in a new tab, and a link the caller
   * leaves out is left out of the menu. Ported from `InfoMenu` in
   * `src/components/shell/sidebar-controls.tsx`.
   */
  interface Props {
    links: InfoLinks;
    settingsHref?: string;
    onShortcuts?: () => void;
  }

  let { links, settingsHref, onShortcuts }: Props = $props();
</script>

<DropdownMenu>
  <DropdownMenuTrigger>
    {#snippet child(props)}
      <IconButton {...props} icon={CircleHelp} label="Help and links" size="sm" />
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent side="top" align="end" class="w-56">
    {#if links.docs}
      <MenuLinkItem href={links.docs} external>
        <Icon icon={BookOpen} size="sm" />
        Docs
      </MenuLinkItem>
    {/if}
    {#if links.feedback}
      <MenuLinkItem href={links.feedback} external>
        <Icon icon={MessageCircle} size="sm" />
        Send feedback
      </MenuLinkItem>
    {/if}
    {#if onShortcuts}
      <DropdownMenuItem onclick={onShortcuts}>
        <Icon icon={Keyboard} size="sm" />
        Keyboard shortcuts
        <DropdownMenuShortcut>⌘ /</DropdownMenuShortcut>
      </DropdownMenuItem>
    {/if}
    <DropdownMenuSeparator />
    {#if links.github}
      <MenuLinkItem href={links.github} external>
        <GitHubMark class="size-3.5" />
        GitHub repo
      </MenuLinkItem>
    {/if}
    {#if links.discord}
      <MenuLinkItem href={links.discord} external>
        <DiscordMark class="size-3.5" />
        Discord community
      </MenuLinkItem>
    {/if}
    {#if links.x}
      <MenuLinkItem href={links.x} external>
        <XMark class="size-3.5" />
        Follow on X
      </MenuLinkItem>
    {/if}
    <DropdownMenuSeparator />
    {#if links.download}
      <MenuLinkItem href={links.download} external>
        <Icon icon={Download} size="sm" />
        Download desktop
      </MenuLinkItem>
    {/if}
    {#if settingsHref}
      <MenuLinkItem href={settingsHref}>
        <Icon icon={Settings} size="sm" />
        Settings
      </MenuLinkItem>
    {/if}
    {#if links.website}
      <MenuLinkItem href={links.website} external>
        <Icon icon={GlobeIcon} size="sm" />
        Our website
      </MenuLinkItem>
    {/if}
  </DropdownMenuContent>
</DropdownMenu>
