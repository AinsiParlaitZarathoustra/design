<script lang="ts">
  import { Copy, CornerDownRight, Ellipsis, Link, Pencil, Pin, PinOff, SmilePlus, Trash2 } from "lucide-svelte";
  import IconButton from "../../../ui/icon-button.svelte";
  import HintGroup from "../../f1-primitives-forms/hint-group/hint-group.svelte";
  import HintItem from "../../f1-primitives-forms/hint-group/hint-item.svelte";
  import { MENU_SEPARATOR } from "../deps/menu-classes";
  import Popover from "../deps/popover.svelte";
  import DropdownMenu from "../deps/dropdown-menu.svelte";
  import DropdownMenuItem from "../deps/dropdown-menu-item.svelte";
  import type { CommsMessageRowLabels, CommsMessageRowPermissions } from "./comms-message-labels";

  /**
   * The React / Reply / More strip on a message row (`Toolbar` in
   * `comms-message-row.tsx`). It mounts only while the row is hovered, focused
   * or has a menu open; `onOpenChange` tells the row a menu is open, because a
   * menu moves focus out of the row.
   */
  interface Props {
    pinned: boolean;
    reactionEmoji: readonly string[];
    can: CommsMessageRowPermissions;
    labels: CommsMessageRowLabels;
    onOpenChange: (open: boolean) => void;
    onReact?: (emoji: string, on: boolean) => void;
    onReply?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onTogglePin?: () => void;
    onCopyText?: () => void;
    onCopyLink?: () => void;
  }

  let {
    pinned,
    reactionEmoji,
    can,
    labels,
    onOpenChange,
    onReact,
    onReply,
    onEdit,
    onDelete,
    onTogglePin,
    onCopyText,
    onCopyLink,
  }: Props = $props();

  let pickerOpen = $state(false);
  let moreOpen = $state(false);

  function setPicker(open: boolean) {
    pickerOpen = open;
    onOpenChange(open || moreOpen);
  }

  function setMore(open: boolean) {
    moreOpen = open;
    onOpenChange(open || pickerOpen);
  }

  const canReact = $derived(Boolean(can.react && onReact && reactionEmoji.length > 0));
  const canReply = $derived(Boolean(can.reply && onReply));
  const pin = $derived(Boolean(can.pin && onTogglePin));
  const edit = $derived(Boolean(can.edit && onEdit));
  const remove = $derived(Boolean(can.delete && onDelete));
  const hasMenu = $derived(Boolean(onCopyText || onCopyLink || pin || edit || remove));
</script>

{#if canReact || canReply || hasMenu}
  <HintGroup side="top">
  <div
    data-slot="comms-message-toolbar"
    class="absolute -top-2.5 right-2 z-10 flex items-center gap-px rounded-md border border-border bg-popover p-0.5 shadow-md"
  >
    {#if canReact}
      <Popover
        bind:open={pickerOpen}
        onOpenChange={setPicker}
        side="top"
        align="end"
        sideOffset={6}
        class="w-auto p-1.5"
      >
        {#snippet trigger(props)}
          <HintItem label={labels.react}>
            <IconButton {...props} size="sm" icon={SmilePlus} label={labels.react} />
          </HintItem>
        {/snippet}
        {#snippet children()}
          <div class="grid grid-cols-7 gap-0.5">
            <!-- Built from the allowlist, so no button here can be refused. -->
            {#each reactionEmoji as emoji (emoji)}
              <button
                type="button"
                onclick={() => {
                  onReact?.(emoji, true);
                  setPicker(false);
                }}
                class="flex size-7 cursor-pointer items-center justify-center rounded text-md transition-colors hover:bg-element-hover"
                >{emoji}</button
              >
            {/each}
          </div>
        {/snippet}
      </Popover>
    {/if}

    {#if canReply}
      <HintItem label={labels.reply}>
        <IconButton size="sm" icon={CornerDownRight} label={labels.reply} onclick={onReply} />
      </HintItem>
    {/if}

    {#if hasMenu}
      <DropdownMenu
        bind:open={moreOpen}
        onOpenChange={setMore}
        side="top"
        align="end"
        sideOffset={6}
      >
        {#snippet trigger(props)}
          <HintItem label={labels.more}>
            <IconButton {...props} size="sm" icon={Ellipsis} label={labels.more} />
          </HintItem>
        {/snippet}
        {#snippet children(close)}
          {#if onCopyText}
            <DropdownMenuItem
              onclick={() => {
                close();
                onCopyText();
              }}
            >
              <Copy /> {labels.copyText}
            </DropdownMenuItem>
          {/if}
          {#if onCopyLink}
            <DropdownMenuItem
              onclick={() => {
                close();
                onCopyLink();
              }}
            >
              <Link /> {labels.copyLink}
            </DropdownMenuItem>
          {/if}
          <!-- Pins are shared, not personal: anyone's pin is everyone's. -->
          {#if pin}
            <DropdownMenuItem
              onclick={() => {
                close();
                onTogglePin?.();
              }}
            >
              {#if pinned}<PinOff /> {labels.unpin}{:else}<Pin /> {labels.pin}{/if}
            </DropdownMenuItem>
          {/if}
          {#if (onCopyText || onCopyLink || pin) && (edit || remove)}
            <div role="separator" data-slot="dropdown-menu-separator" class={MENU_SEPARATOR}></div>
          {/if}
          {#if edit}
            <DropdownMenuItem
              onclick={() => {
                close();
                onEdit?.();
              }}
            >
              <Pencil /> {labels.edit}
            </DropdownMenuItem>
          {/if}
          {#if remove}
            <DropdownMenuItem
              variant="destructive"
              onclick={() => {
                close();
                onDelete?.();
              }}
            >
              <Trash2 /> {labels.delete}
            </DropdownMenuItem>
          {/if}
        {/snippet}
      </DropdownMenu>
    {/if}
  </div>
  </HintGroup>
{/if}
