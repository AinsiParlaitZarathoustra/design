<script lang="ts">
  import { LogOut, Shield, User } from "lucide-svelte";
  import { initialsOf } from "../../../lib/initials";
  import Icon from "../../../ui/icon.svelte";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../f2-overlays-menus/index";
  import PersonAvatar from "../../f4-ui-second-half-patterns/person-avatar.svelte";
  import MenuLinkItem from "../deps/menu-link-item.svelte";

  /**
   * The sidebar footer's account menu: YOU, your face on the trigger and your
   * account inside. Ported from `ProfileMenu` in `src/components/shell/sidebar-controls.tsx`.
   */
  interface Props {
    user: { name: string; email: string; image?: string };
    accountHref: string;
    privacyHref?: string;
    onLogOut: () => void;
  }

  let { user, accountHref, privacyHref, onLogOut }: Props = $props();
  // The name starts with the initials the avatar shows, so a voice user can
  // say what they see (WCAG 2.5.3, label in name).
  const initials = $derived(initialsOf(user.name, user.email));
</script>

<DropdownMenu>
  <DropdownMenuTrigger>
    {#snippet child(props)}
      <button
        {...props}
        type="button"
        aria-label={`${initials}, account — ${user.name}`}
        class="rounded-full outline-offset-2 transition-opacity duration-fast hover:opacity-85"
      >
        <PersonAvatar size="sm" name={user.name} email={user.email} image={user.image} {initials} />
      </button>
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent side="top" align="start" class="w-60">
    <DropdownMenuGroup>
      <DropdownMenuLabel class="flex items-center gap-2 py-2 tracking-normal normal-case">
        <PersonAvatar size="md" name={user.name} email={user.email} image={user.image} />
        <span class="flex min-w-0 flex-col">
          <span class="truncate text-xs font-medium text-foreground">{user.name}</span>
          <span class="truncate text-2xs text-muted-foreground">{user.email}</span>
        </span>
      </DropdownMenuLabel>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <MenuLinkItem href={accountHref}>
      <Icon icon={User} size="sm" />
      Account settings
    </MenuLinkItem>
    {#if privacyHref}
      <MenuLinkItem href={privacyHref}>
        <Icon icon={Shield} size="sm" />
        Privacy
      </MenuLinkItem>
    {/if}
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive" onclick={onLogOut}>
      <Icon icon={LogOut} size="sm" />
      Log out
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
