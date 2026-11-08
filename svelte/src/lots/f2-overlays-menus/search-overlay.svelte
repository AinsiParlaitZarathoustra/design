<script lang="ts">
  import type { Snippet } from "svelte";
  import CommandDialogRoot from "./command-dialog.svelte";
  import CommandDialogPopup from "./command-dialog-popup.svelte";
  import SearchOverlayBody from "./search-overlay-body.svelte";
  import type { SearchResult, SearchStatus } from "./search-overlay-types";

  /**
   * The search overlay, ported from `SearchOverlay`: search over something the host
   * searches, on the command shell. `mode="submit"` (find in files) runs the search
   * on Enter; `mode="live"` (find in a session) follows the query. The host owns the
   * query, the status, the results and the recent searches.
   */
  interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    placeholder?: string;
    query: string;
    onQueryChange: (query: string) => void;
    mode?: "live" | "submit";
    onSubmit?: (query: string) => void;
    status: SearchStatus;
    error?: string;
    results: ReadonlyArray<SearchResult>;
    onOpen: (result: SearchResult) => void;
    count?: string;
    recent?: ReadonlyArray<string>;
    onPickRecent?: (query: string) => void;
    onForgetRecent?: (query: string) => void;
    onClearRecent?: () => void;
    idleHint?: string;
    emptyMessage?: string;
    notice?: string;
    endAddon?: Snippet;
    hints?: boolean;
  }

  let { open, onOpenChange, title, ...rest }: Props = $props();
</script>

<CommandDialogRoot {open} {onOpenChange}>
  <CommandDialogPopup {title} dataSlot="search-overlay">
    <SearchOverlayBody {onOpenChange} {...rest} />
  </CommandDialogPopup>
</CommandDialogRoot>
