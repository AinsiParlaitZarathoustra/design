<script lang="ts">
  import { ChevronRightIcon, Trash2Icon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import IconButton from "../../../ui/icon-button.svelte";
  import Hint from "../../../ui/hint.svelte";
  import Avatar from "../deps/avatar.svelte";
  import AvatarFallback from "../deps/avatar-fallback.svelte";
  import AvatarImage from "../deps/avatar-image.svelte";
  import type { CanvasPageDropIndicator } from "./canvas-pages-panel.svelte";
  import type { CanvasPageRow, CanvasPageRowAction } from "./types";

  /** Buttons inside a row act alone: no open, no fold, no drag start. */
  const stop = (e: Event) => e.stopPropagation();
  const ownEvents = { onclick: stop, onpointerdown: stop, onkeydown: stop, ondblclick: stop };

  function firstName(name: string): string {
    return name.trim().split(/\s+/)[0] || "Unknown";
  }

  interface Props {
    row: CanvasPageRow;
    active: boolean;
    collapsed: boolean;
    lastPage: boolean;
    renaming: boolean;
    onOpen: (id: string) => void;
    onToggleFolder?: (id: string) => void;
    onStartRename?: () => void;
    onCommitRename: (name: string) => void;
    onCancelRename: () => void;
    onDelete?: (id: string) => void;
    onIconClick?: (id: string, rect: DOMRect) => void;
    drop: CanvasPageDropIndicator["where"] | null;
    rowProps?: Record<string, any>;
    actions: CanvasPageRowAction[];
    deleteMode: "hover" | "always";
    deleteLabel: string;
    lastPageLabel: string;
  }

  let {
    row,
    active,
    collapsed,
    lastPage,
    renaming,
    onOpen,
    onToggleFolder,
    onStartRename,
    onCommitRename,
    onCancelRename,
    onDelete,
    onIconClick,
    drop,
    rowProps,
    actions,
    deleteMode,
    deleteLabel,
    lastPageLabel,
  }: Props = $props();

  const folder = $derived(row.kind === "folder");
  const showDelete = $derived(!!onDelete && !renaming && (deleteMode === "always" || !lastPage));

  // The rename field takes the focus as it opens.
  const focusOnMount = (node: HTMLInputElement) => node.focus();

  // Escape cancels, and the blur that follows must not commit.
  let cancelled = false;

  function activate() {
    if (folder) onToggleFolder?.(row.id);
    else onOpen(row.id);
  }
</script>

<div data-page-id={row.id} {...rowProps} class={cn("relative", rowProps?.class as string | undefined)}>
  {#if drop && drop !== "into"}
    <div
      aria-hidden="true"
      class={cn(
        "pointer-events-none absolute inset-x-1 z-10 h-0.5 rounded-full bg-primary",
        drop === "before" ? "top-0" : "bottom-0",
      )}
    ></div>
  {/if}
  <!-- The row opens on a press, as the React row does; its keyboard path is the
       row's own button (Enter and Space), so the row itself needs no key handler. -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    onclick={renaming ? undefined : activate}
    class={cn(
      "group/row flex cursor-pointer items-center gap-1.5 rounded px-1.5 text-xs",
      row.subtitle ? "py-2" : "min-h-control-md",
      active ? "bg-element-selected text-foreground" : "text-secondary-foreground hover:bg-element-hover",
      drop === "into" && "ring-1 ring-primary",
    )}
    style={row.depth ? `padding-left: calc(0.375rem + ${row.depth * 12}px)` : undefined}
  >
    {#if folder}
      <Icon
        icon={ChevronRightIcon}
        size="xs"
        class={cn(
          "shrink-0 text-muted-foreground transition-transform duration-fast ease-out-strong",
          !collapsed && "rotate-90",
        )}
      />
    {/if}
    {#if row.icon}
      {#if onIconClick}
        <Hint label="Change icon">
          <button
            type="button"
            {...ownEvents}
            onclick={(e) => {
              e.stopPropagation();
              onIconClick(row.id, e.currentTarget.getBoundingClientRect());
            }}
            class="flex size-5 shrink-0 items-center justify-center rounded text-xs leading-none transition-colors duration-fast hover:bg-element-hover"
          >{row.icon}</button>
        </Hint>
      {:else}
        <span aria-hidden="true" class="flex size-5 shrink-0 items-center justify-center text-xs leading-none">{row.icon}</span>
      {/if}
    {/if}

    {#if renaming}
      <input
        {@attach focusOnMount}
        aria-label={folder ? "Folder name" : "Page name"}
        value={row.name}
        onfocus={(e) => e.currentTarget.select()}
        onclick={stop}
        onpointerdown={stop}
        onblur={(e) => {
          if (cancelled) {
            cancelled = false;
            return;
          }
          onCommitRename(e.currentTarget.value.trim());
        }}
        onkeydown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") e.currentTarget.blur();
          else if (e.key === "Escape") {
            cancelled = true;
            onCancelRename();
          }
        }}
        class="focus-ring-none h-6 w-full min-w-0 flex-1 rounded bg-panel-input px-1 text-xs text-foreground ring-1 ring-primary outline-none"
      />
    {:else}
      <div
        role="button"
        tabindex="0"
        aria-current={active ? "page" : undefined}
        aria-expanded={folder ? !collapsed : undefined}
        onkeydown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            activate();
          }
        }}
        ondblclick={onStartRename
          ? (e) => {
              e.stopPropagation();
              onStartRename();
            }
          : undefined}
        class="flex min-w-0 flex-1 items-center gap-1.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span class="min-w-0 flex-1">
          <span class={cn("block truncate", row.subtitle && "text-sm leading-snug font-medium")}>
            {row.name || "Untitled"}
          </span>
          {#if row.subtitle}
            <span class="block truncate text-2xs leading-snug text-muted-foreground">{row.subtitle}</span>
          {/if}
        </span>
        {#if row.author}
          <Hint label={`Created by ${row.author.name}`} side="top" sideOffset={4}>
            <span class="flex min-w-0 shrink-0 items-center gap-1">
              <Avatar size="xs" aria-hidden="true">
                {#if row.author.image}<AvatarImage src={row.author.image} alt="" />{/if}
                <AvatarFallback>{firstName(row.author.name).charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span class="max-w-16 truncate text-2xs text-muted-foreground">{firstName(row.author.name)}</span>
            </span>
          </Hint>
        {/if}
      </div>
    {/if}

    {#if !renaming && actions.length > 0}
      <span class="flex shrink-0 items-center gap-1">
        {#each actions as a (a.id)}
          <Hint label={a.label}>
            <IconButton
              icon={a.icon}
              label={a.label}
              variant="ghost"
              size="xs"
              {...ownEvents}
              onclick={(e) => {
                e.stopPropagation();
                a.onSelect(row.id);
              }}
              class="rounded-full border border-border opacity-0 group-focus-within/row:opacity-100 group-hover/row:opacity-100 focus-visible:opacity-100"
            />
          </Hint>
        {/each}
      </span>
    {/if}

    {#if showDelete}
      {#if deleteMode === "always"}
        <Hint label={lastPage ? lastPageLabel : deleteLabel} wrap>
          <IconButton
            icon={Trash2Icon}
            label={deleteLabel}
            variant="outline"
            shape="round"
            size="xs"
            disabled={lastPage}
            {...ownEvents}
            onclick={(e) => {
              e.stopPropagation();
              onDelete?.(row.id);
            }}
            class="shrink-0 text-muted-foreground hover:text-error"
          />
        </Hint>
      {:else}
        <Hint label={deleteLabel}>
          <IconButton
            icon={Trash2Icon}
            label={deleteLabel}
            variant="ghost-destructive"
            size="xs"
            {...ownEvents}
            onclick={(e) => {
              e.stopPropagation();
              onDelete?.(row.id);
            }}
            class="shrink-0 opacity-0 group-focus-within/row:opacity-100 group-hover/row:opacity-100 focus-visible:opacity-100"
          />
        </Hint>
      {/if}
    {/if}
  </div>
</div>
