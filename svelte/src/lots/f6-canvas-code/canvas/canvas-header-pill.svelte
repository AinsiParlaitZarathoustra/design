<script module lang="ts">
  import type { CanvasLinkStatus } from "./types";

  /** What the dot says when the app gives no `statusLabel`. */
  const STATUS_WORDS: Record<CanvasLinkStatus, string> = {
    live: "Live",
    syncing: "Reconnecting",
    offline: "Offline",
    archived: "Archived, read-only",
    viewing: "Viewing, not sharing",
  };

  const STATUS_DOT: Record<Exclude<CanvasLinkStatus, "syncing">, string> = {
    live: "bg-success",
    offline: "bg-warning",
    archived: "bg-muted-foreground",
    viewing: "bg-info",
  };

  /** The offline dot's tones: see `offlineTone`. */
  const OFFLINE_DOT = { warning: "bg-warning", error: "bg-error" } as const;
</script>

<script lang="ts">
  import { ChevronDownIcon, CrosshairIcon, Maximize2Icon, Minimize2Icon, MinusIcon, PlusIcon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import { iconButtonVariants } from "../../../ui/icon-button-variants";
  import Hint from "../../../ui/hint.svelte";
  import Icon from "../../../ui/icon.svelte";
  import Spinner from "../../../components/ui/spinner.svelte";
  import RailGlyph from "../deps/rail-glyph.svelte";
  import DropdownMenu from "../../f2-overlays-menus/dropdown-menu.svelte";
  import DropdownMenuTrigger from "../../f2-overlays-menus/dropdown-menu-trigger.svelte";
  import DropdownMenuContent from "../../f2-overlays-menus/dropdown-menu-content.svelte";
  import DropdownMenuGroup from "../../f2-overlays-menus/dropdown-menu-group.svelte";
  import DropdownMenuLabel from "../../f2-overlays-menus/dropdown-menu-label.svelte";
  import DropdownMenuItem from "../../f2-overlays-menus/dropdown-menu-item.svelte";
  import DropdownMenuRadioGroup from "../../f2-overlays-menus/dropdown-menu-radio-group.svelte";
  import DropdownMenuRadioItem from "../../f2-overlays-menus/dropdown-menu-radio-item.svelte";
  import CanvasPill from "./canvas-pill.svelte";
  import CanvasPillDivider from "./canvas-pill-divider.svelte";
  import CanvasPillButton from "./canvas-pill-button.svelte";

  /**
   * The top-left pill: the pages toggle, where the canvas stands with the
   * room, the page you are on (also the shorthand page switcher, when `pages`
   * is given: a canvas is usually two clicks from another page), the zoom
   * readout, fit, and fullscreen. Each section renders only when its props
   * are given; `onFit` is the one control every canvas has.
   */
  interface Props {
    pageName: string;
    /** An emoji before the name. */
    pageIcon?: string;
    /** The pages to switch between; without it the name is plain text. */
    pages?: Array<{ id: string; name: string; icon?: string }>;
    activePageId?: string | null;
    onOpenPage?: (id: string) => void;
    /** What the page switcher says when `pages` is empty. */
    emptyPagesLabel?: string;
    status?: CanvasLinkStatus;
    /** What the status means in words, shown on hover. */
    statusLabel?: string;
    /**
     * The offline dot's tone. `warning` by default: offline here means edits
     * are held to send on reconnect. `error` for an app where being offline
     * loses work or blocks it.
     */
    offlineTone?: "warning" | "error";
    pagesOpen: boolean;
    onTogglePages: () => void;
    /** The current zoom, 1 = 100%. The readout renders only when set. */
    zoom?: number;
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    onZoomReset?: () => void;
    onFit: () => void;
    fullscreen?: boolean;
    onToggleFullscreen?: () => void;
    class?: string;
  }

  let {
    pageName,
    pageIcon,
    pages,
    activePageId,
    onOpenPage,
    emptyPagesLabel = "No pages yet.",
    status,
    statusLabel,
    offlineTone = "warning",
    pagesOpen,
    onTogglePages,
    zoom,
    onZoomIn,
    onZoomOut,
    onZoomReset,
    onFit,
    fullscreen = false,
    onToggleFullscreen,
    class: className,
  }: Props = $props();

  const shownName = $derived(pageName || "Untitled");
</script>

{#snippet nameText()}
  <span class="min-w-0 max-w-44 truncate text-sm font-semibold text-foreground">{#if pageIcon}<span class="mr-1.5">{pageIcon}</span>{/if}<span>{shownName}</span></span>
{/snippet}

{#snippet statusDot(current: CanvasLinkStatus, label: string | undefined)}
  {#snippet glyph()}
    <span
      data-status={current}
      role="img"
      aria-label={label ?? STATUS_WORDS[current]}
      class="flex size-4 shrink-0 items-center justify-center"
    >
      {#if current === "syncing"}
        <Spinner size="xs" label="" />
      {:else}
        <span
          class={cn(
            "size-1.5 rounded-full transition-colors duration-fast",
            current === "offline" ? OFFLINE_DOT[offlineTone] : STATUS_DOT[current],
          )}
        ></span>
      {/if}
    </span>
  {/snippet}
  {#if label}
    <Hint {label} side="bottom">
      {@render glyph()}
    </Hint>
  {:else}
    {@render glyph()}
  {/if}
{/snippet}

<CanvasPill corner="top-left" class={className}>
  <Hint label={pagesOpen ? "Hide pages" : "Show pages"}>
    <button
      type="button"
      aria-pressed={pagesOpen}
      onclick={onTogglePages}
      class={iconButtonVariants({ size: "sm" })}
    >
      <RailGlyph open={pagesOpen} size="md" />
    </button>
  </Hint>
  <CanvasPillDivider />

  {#if status}
    {@render statusDot(status, statusLabel)}
  {/if}

  {#if pages}
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet child(props)}
          <button
            type="button"
            {...props}
            aria-label={`${shownName}, switch page`}
            class="flex h-6 min-w-0 shrink items-center gap-1 rounded-md px-1 transition-colors duration-fast hover:bg-element-hover aria-expanded:bg-element-active"
          >
            {@render nameText()}
            <Icon icon={ChevronDownIcon} size="xs" class="shrink-0 text-muted-foreground" />
          </button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8} class="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Pages</DropdownMenuLabel>
          {#if pages.length === 0}
            <DropdownMenuItem disabled>{emptyPagesLabel}</DropdownMenuItem>
          {/if}
          <DropdownMenuRadioGroup value={activePageId ?? ""} onValueChange={(id) => onOpenPage?.(String(id))}>
            {#each pages as p (p.id)}
              <DropdownMenuRadioItem value={p.id}>
                <span class="min-w-0 flex-1 truncate">
                  {#if p.icon}<span class="mr-1.5">{p.icon}</span>{/if}
                  {p.name || "Untitled"}
                </span>
              </DropdownMenuRadioItem>
            {/each}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  {:else}
    <span class="flex min-w-0 px-1">{@render nameText()}</span>
  {/if}

  {#if zoom !== undefined}
    <CanvasPillDivider />
    {#if onZoomOut}<CanvasPillButton icon={MinusIcon} label="Zoom out" onClick={onZoomOut} />{/if}
    <Hint label="Reset zoom to 100%">
      <button
        type="button"
        onclick={onZoomReset}
        disabled={!onZoomReset}
        aria-label={`Zoom ${Math.round(zoom * 100)}%, reset to 100%`}
        class="flex h-6 min-w-10 items-center justify-center rounded-md px-1 text-xs text-secondary-foreground tabular-nums transition-colors duration-fast hover:bg-element-hover hover:text-foreground disabled:pointer-events-none"
      >{Math.round(zoom * 100)}%</button>
    </Hint>
    {#if onZoomIn}<CanvasPillButton icon={PlusIcon} label="Zoom in" onClick={onZoomIn} />{/if}
  {/if}

  <CanvasPillDivider />
  <CanvasPillButton icon={CrosshairIcon} label="Fit to view" onClick={onFit} />
  {#if onToggleFullscreen}
    <CanvasPillButton
      icon={fullscreen ? Minimize2Icon : Maximize2Icon}
      label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
      onClick={onToggleFullscreen}
    />
  {/if}
</CanvasPill>
