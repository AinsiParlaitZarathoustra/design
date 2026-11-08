<script lang="ts">
  import { X } from "lucide-svelte";
  import PersonAvatar from "../../../src/lots/f4-ui-second-half-patterns/person-avatar.svelte";
  import SideDock from "../../../src/lots/f5-layout-shell/layout/side-dock.svelte";
  import SideDockSizeToggle from "../../../src/lots/f5-layout-shell/layout/side-dock-size-toggle.svelte";
  import {
    useSideDock,
    useSideDockRoom,
  } from "../../../src/lots/f5-layout-shell/layout/app-frame";
  import Button from "../../../src/ui/button.svelte";
  import IconButton from "../../../src/ui/icon-button.svelte";

  /**
   * The dock a screen fills in the app-shell stories, ported from `SessionDock`
   * in `stories/components/shell/app-shell.stories.tsx`.
   */
  interface Props {
    row: { ref: string; title: string; who: string; ago: string };
    onClose: () => void;
  }

  let { row, onClose }: Props = $props();

  const dock = useSideDock();
  const room = useSideDockRoom();
</script>

<SideDock>
  <div class="flex h-10 shrink-0 items-center gap-2 border-b border-border-subtle px-3">
    <span class="code text-muted-foreground">{row.ref}</span>
    <span class="flex-1"></span>
    <SideDockSizeToggle />
    <IconButton icon={X} label="Close" size="sm" onclick={onClose} />
  </div>
  <div class="flex flex-col gap-3 p-4">
    <h2 class="text-md font-semibold">{row.title}</h2>
    <div class="flex items-center gap-2">
      <PersonAvatar size="xs" name={row.who} />
      <span class="caption">{row.who} · {row.ago}</span>
    </div>
    <p class="body text-secondary-foreground">
      The dock is {dock.mode}. A panel that needs more room borrows it with `useSideDockRoom`.
    </p>
    <div class="flex gap-2">
      <Button size="sm" variant="outline" onclick={() => room.expand()}>Borrow room</Button>
      <Button size="sm" variant="ghost" onclick={() => room.restore()}>Give it back</Button>
    </div>
  </div>
</SideDock>
