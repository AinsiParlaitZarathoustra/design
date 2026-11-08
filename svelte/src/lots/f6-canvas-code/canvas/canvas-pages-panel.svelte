<script module lang="ts">
  /** Where a dragged row would land: above, below, or inside a folder. */
  export interface CanvasPageDropIndicator {
    id: string;
    where: "before" | "after" | "into";
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { FilePlus2Icon, FolderPlusIcon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import IconButton from "../../../ui/icon-button.svelte";
  import HintGroup from "../deps/hint-group.svelte";
  import HintItem from "../deps/hint-item.svelte";
  import CanvasPageRowView from "./canvas-page-row.svelte";
  import type { CanvasPageRow, CanvasPageRowAction } from "./types";

  /**
   * The pages column beside a canvas: a quiet "Pages" header with create
   * buttons, then one row per page or folder, already flattened by the app
   * (collapsed folders' children left out, `depth` set).
   *
   * Presentational. Reordering is the app's: it spreads its pointer handlers
   * on each row through `getRowProps` (Svelte attribute names, `onpointerdown`)
   * and passes back `dropIndicator`. Rename is controlled when `renamingId` is
   * given, else the panel keeps it.
   */
  interface Props {
    rows: CanvasPageRow[];
    activeId: string | null;
    collapsedIds?: ReadonlySet<string>;
    onToggleFolder?: (id: string) => void;
    onOpen: (id: string) => void;
    onCreate?: (kind: "page" | "folder") => void;
    allowFolders?: boolean;
    /** Controlled rename: the row being renamed, or null. */
    renamingId?: string | null;
    onRenamingChange?: (id: string | null) => void;
    onRename?: (id: string, name: string) => void;
    onDelete?: (id: string) => void;
    /** The emoji is a button when set; `rect` anchors the app's picker. */
    onIconClick?: (id: string, rect: DOMRect) => void;
    dropIndicator?: CanvasPageDropIndicator | null;
    /** Spread on each row: the app's drag handlers and data attributes. */
    getRowProps?: (id: string) => Record<string, any>;
    /** Above the "Pages" header, e.g. the app's back link. */
    header?: Snippet;
    emptyLabel?: string;
    rowActions?: (row: CanvasPageRow) => CanvasPageRowAction[];
    /** `always` draws delete on every row (Spaces); `hover` reveals it. */
    deleteMode?: "hover" | "always";
    deleteLabel?: (row: CanvasPageRow) => string;
    /** The disabled delete's hint on the only page left (`deleteMode="always"`). */
    lastPageLabel?: string;
    /**
     * How many pages the whole tree holds, for "the last page cannot be
     * deleted". Pass it when a collapsed folder hides pages from `rows`.
     */
    pageCount?: number;
    class?: string;
  }

  let {
    rows,
    activeId,
    collapsedIds,
    onToggleFolder,
    onOpen,
    onCreate,
    allowFolders = false,
    renamingId: renamingIdProp,
    onRenamingChange,
    onRename,
    onDelete,
    onIconClick,
    dropIndicator,
    getRowProps,
    header,
    emptyLabel = "No pages yet.",
    rowActions,
    deleteMode = "hover",
    deleteLabel,
    lastPageLabel = "The last page cannot be deleted.",
    pageCount: pageCountProp,
    class: className,
  }: Props = $props();

  let ownRenaming = $state<string | null>(null);
  const renamingId = $derived(renamingIdProp !== undefined ? renamingIdProp : ownRenaming);

  function setRenaming(id: string | null) {
    if (renamingIdProp === undefined) ownRenaming = id;
    onRenamingChange?.(id);
  }

  const pageCount = $derived(pageCountProp ?? rows.filter((r) => r.kind === "page").length);
</script>

<div
  data-slot="canvas-pages-panel"
  class={cn("flex h-full w-80 shrink-0 flex-col border-r border-border bg-card", className)}
>
  {@render header?.()}
  <div class="flex h-8 shrink-0 items-center gap-1 pr-2 pl-3">
    <span class="eyebrow flex-1 leading-none">Pages</span>
    {#if onCreate}
      <HintGroup>
        <HintItem label="New page">
          <IconButton
            icon={FilePlus2Icon}
            label="New page"
            variant="outline"
            shape="round"
            size="xs"
            class="text-secondary-foreground"
            onclick={() => onCreate("page")}
          />
        </HintItem>
        {#if allowFolders}
          <HintItem label="New folder">
            <IconButton
              icon={FolderPlusIcon}
              label="New folder"
              variant="outline"
              shape="round"
              size="xs"
              class="text-secondary-foreground"
              onclick={() => onCreate("folder")}
            />
          </HintItem>
        {/if}
      </HintGroup>
    {/if}
  </div>

  <div class="min-h-0 flex-1 overflow-y-auto px-1.5 py-1 [scrollbar-width:none]">
    {#each rows as row (row.id)}
      <CanvasPageRowView
        {row}
        active={row.id === activeId}
        collapsed={collapsedIds?.has(row.id) ?? false}
        lastPage={row.kind === "page" && pageCount <= 1}
        renaming={renamingId === row.id}
        {onOpen}
        {onToggleFolder}
        onStartRename={onRename ? () => setRenaming(row.id) : undefined}
        onCommitRename={(name) => {
          setRenaming(null);
          if (name && name !== row.name) onRename?.(row.id, name);
        }}
        onCancelRename={() => setRenaming(null)}
        {onDelete}
        {onIconClick}
        drop={dropIndicator && dropIndicator.id === row.id ? dropIndicator.where : null}
        rowProps={getRowProps?.(row.id)}
        actions={rowActions?.(row) ?? []}
        {deleteMode}
        {lastPageLabel}
        deleteLabel={deleteLabel?.(row) ??
          (row.kind === "folder" ? `Delete folder “${row.name}”` : `Delete “${row.name}”`)}
      />
    {/each}
    {#if rows.length === 0}
      <div class="px-2 py-3 text-2xs text-muted-foreground">{emptyLabel}</div>
    {/if}
  </div>
</div>
