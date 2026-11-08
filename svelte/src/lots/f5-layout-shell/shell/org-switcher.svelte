<script lang="ts">
  import {
    ArrowLeftRight,
    Check,
    ChevronsUpDown,
    LogOut,
    Plus,
    Settings,
    UserPlus,
  } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import type { Organisation } from "../../../lib/types";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "../../f2-overlays-menus/index";
  import Icon from "../../../ui/icon.svelte";
  import { getLinks } from "../deps/link";
  import OrgMark from "./org-mark.svelte";

  /**
   * The workspace switcher, top-left of the rail. The menu carries Settings,
   * members and Log out; switching is a submenu headed by the account email.
   * Ported from `OrgSwitcher` in `src/components/shell/org-switcher.tsx`.
   *
   * Lot note: `DropdownMenuItem` has no `render` form, so the two link rows
   * (Settings, members) navigate through the link context on click rather than
   * rendering an anchor.
   */
  interface Props {
    /** The active workspace. */
    org: Organisation;
    orgs: Array<Organisation>;
    /** The signed-in account, heading the workspace list. */
    email: string;
    onOrgChange: (id: string) => void;
    settingsHref: string;
    membersHref?: string;
    onLogOut?: () => void;
    class?: string;
    collapsed?: boolean;
  }

  let {
    org,
    orgs,
    email,
    onOrgChange,
    settingsHref,
    membersHref,
    onLogOut,
    class: className,
    collapsed = false,
  }: Props = $props();

  const links = getLinks();
  const members = $derived(membersHref ?? settingsHref);
</script>

<DropdownMenu>
  <DropdownMenuTrigger>
    {#snippet child(props)}
      <button
        {...props}
        type="button"
        aria-label={collapsed ? `${org.initials}, ${org.name}` : undefined}
        class={cn(
          "flex h-8 w-full min-w-0 items-center gap-2 rounded-md px-1",
          "text-left select-none",
          "transition-colors duration-fast ease-out-strong",
          "hover:bg-sidebar-accent data-popup-open:bg-sidebar-accent",
          collapsed && "justify-center px-0",
          className,
        )}
      >
        <OrgMark initials={org.initials} class="size-6 rounded-md text-3xs" />
        {#if !collapsed}
          <span class="flex min-w-0 flex-1 flex-col">
            <span class="truncate text-xs font-medium text-foreground">{org.name}</span>
            <span class="truncate text-3xs text-muted-foreground">{org.memberCount} members</span>
          </span>
          <Icon icon={ChevronsUpDown} size="xs" class="text-muted-foreground" />
        {/if}
      </button>
    {/snippet}
  </DropdownMenuTrigger>

  <DropdownMenuContent class="w-64" sideOffset={4}>
    <DropdownMenuItem onclick={() => links.navigate(settingsHref)}>
      <Icon icon={Settings} size="sm" />
      Settings
      <DropdownMenuShortcut>G then S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem onclick={() => links.navigate(members)}>
      <Icon icon={UserPlus} size="sm" />
      Invite and manage members
    </DropdownMenuItem>

    <DropdownMenuSeparator />

    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Icon icon={ArrowLeftRight} size="sm" />
        Switch workspace
        <DropdownMenuShortcut>O then W</DropdownMenuShortcut>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent class="w-64">
        <!-- Which login this list belongs to, before which workspace. -->
        <DropdownMenuGroup>
          <DropdownMenuLabel class="tracking-normal normal-case">{email}</DropdownMenuLabel>
          {#each orgs as o, i (o.id)}
            <DropdownMenuItem onclick={() => onOrgChange(o.id)}>
              <OrgMark initials={o.initials} />
              <span class="flex-1 truncate">{o.name}</span>
              {#if o.id === org.id}
                <Icon icon={Check} size="sm" class="text-foreground" />
              {/if}
              <span class="tnum w-3 text-right text-2xs text-disabled">{i + 1}</span>
            </DropdownMenuItem>
          {/each}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <Icon icon={Plus} size="sm" />
            Create or join a workspace…
          </DropdownMenuItem>
          <DropdownMenuItem>Add an account…</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>

    <DropdownMenuSeparator />

    <DropdownMenuItem variant="destructive" onclick={() => onLogOut?.()}>
      <Icon icon={LogOut} size="sm" />
      Log out
      <DropdownMenuShortcut>⌥ ⇧ Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
