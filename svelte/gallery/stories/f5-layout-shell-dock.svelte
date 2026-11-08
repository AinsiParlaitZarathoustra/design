<script lang="ts">
  import { X } from "lucide-svelte";
  import Button from "../../src/ui/button.svelte";
  import IconButton from "../../src/ui/icon-button.svelte";
  import SideDock from "../../src/lots/f5-layout-shell/layout/side-dock.svelte";
  import SideDockSizeToggle from "../../src/lots/f5-layout-shell/layout/side-dock-size-toggle.svelte";
  import {
    useSideDock,
    useSideDockRoom,
  } from "../../src/lots/f5-layout-shell/layout/app-frame";

  /**
   * The dock a screen fills, ported from `Dock` in
   * `stories/components/layout/app-frame.stories.tsx`: a header with the size
   * toggle, then the record, and two buttons that borrow room from the dock.
   */
  interface Props {
    row: { ref: string; title: string };
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
    <p class="body text-secondary-foreground">
      The dock is drawn {dock.mode}. Borrowing widens a compact dock without telling the app, so
      the size it remembers is still the one the person picked.
    </p>
    <div class="flex gap-2">
      <Button size="sm" variant="outline" onclick={() => room.expand()}>Borrow room</Button>
      <Button size="sm" variant="ghost" onclick={() => room.restore()}>Give it back</Button>
    </div>
  </div>
</SideDock>
