<script lang="ts">
  import { SearchIcon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import RailTip from "./rail-tip.svelte";
  import { useSidebar } from "./sidebar";

  /**
   * The ⌘K affordance. Collapsed, it is just the glyph, in a circle. It opens
   * the command menu rather than filtering in place. Ported from
   * `SidebarSearch` in `sidebar.tsx`.
   */
  interface Props {
    onOpen: () => void;
  }

  let { onOpen }: Props = $props();
  const sidebar = useSidebar();
</script>

<div class="flex justify-center px-2 pb-3">
  <RailTip label="Jump to anything… ⌘K">
    {#snippet child(props)}
    <button
      {...props}
      type="button"
      onclick={onOpen}
      aria-keyshortcuts="Meta+K"
      aria-label="Jump to anything"
      class={cn(
        "flex h-7 shrink-0 items-center border border-border bg-panel text-xs text-disabled",
        "transition-colors duration-fast ease-out-strong hover:border-border-strong hover:text-muted-foreground",
        sidebar.collapsed
          ? "w-7 justify-center rounded-full"
          : "w-full gap-1.5 rounded-xl px-2.5",
      )}
    >
      <Icon icon={SearchIcon} size="xs" class="shrink-0" />
      {#if !sidebar.collapsed}
        <span class="flex-1 truncate text-left">Jump to anything…</span>
      {/if}
    </button>
    {/snippet}
  </RailTip>
</div>
