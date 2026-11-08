<script lang="ts">
  import { FileText } from "lucide-svelte";
  import TabStrip from "../../src/components/layout/tab-strip.svelte";
  import type { TabStripItem } from "../../src/components/layout/tab-strip-logic";

  interface Props {
    items?: TabStripItem[];
    activeId?: string | null;
    focused?: boolean;
    rovingFocus?: boolean;
    closeOnDelete?: boolean;
    closeOnMiddleClick?: boolean;
    optOut?: boolean;
    onSelect?: (id: string) => void;
    onClose?: (id: string) => void;
  }

  let {
    items = [
      { id: "app", title: "app-frame.tsx", icon: FileText, closable: true },
      { id: "readme", title: "README.md", icon: FileText, closable: true, dirty: true },
      { id: "home", title: "Home", icon: FileText, pinned: true },
    ],
    activeId = "app",
    focused = true,
    rovingFocus = true,
    closeOnDelete = true,
    closeOnMiddleClick = true,
    optOut = false,
    onSelect = () => {},
    onClose,
  }: Props = $props();
</script>

<TabStrip
  aria-label="Open files"
  {items}
  {activeId}
  {focused}
  rovingFocus={rovingFocus && !optOut}
  closeOnDelete={closeOnDelete && !optOut}
  closeOnMiddleClick={closeOnMiddleClick && !optOut}
  closeLabel={optOut ? () => "Close tab" : undefined}
  {onSelect}
  {onClose}
/>
