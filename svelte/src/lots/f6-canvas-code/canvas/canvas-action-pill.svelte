<script module lang="ts">
  import { FileImageIcon, FileTextIcon, FileType2Icon } from "lucide-svelte";

  export interface CanvasExportFormat {
    id: string;
    label: string;
    icon: any;
  }

  /** The four formats both canvases export. */
  export const CANVAS_EXPORT_FORMATS: CanvasExportFormat[] = [
    { id: "png", label: "PNG", icon: FileImageIcon },
    { id: "jpeg", label: "JPEG", icon: FileImageIcon },
    { id: "svg", label: "SVG", icon: FileType2Icon },
    { id: "pdf", label: "PDF", icon: FileTextIcon },
  ];
</script>

<script lang="ts">
  import { DownloadIcon, ExternalLinkIcon, EyeIcon } from "lucide-svelte";
  import { PEER_INK } from "../../../lib/actor-hue";
  import { cn } from "../../../lib/utils";
  import Button from "../../../ui/button.svelte";
  import Icon from "../../../ui/icon.svelte";
  import IconButton from "../../../ui/icon-button.svelte";
  import Hint from "../../../ui/hint.svelte";
  import Spinner from "../../../components/ui/spinner.svelte";
  import PersonAvatar from "../deps/person-avatar.svelte";
  import DropdownMenu from "../deps/dropdown-menu.svelte";
  import DropdownMenuTrigger from "../deps/dropdown-menu-trigger.svelte";
  import DropdownMenuContent from "../deps/dropdown-menu-content.svelte";
  import DropdownMenuGroup from "../deps/dropdown-menu-group.svelte";
  import DropdownMenuLabel from "../deps/dropdown-menu-label.svelte";
  import DropdownMenuItem from "../deps/dropdown-menu-item.svelte";
  import CanvasPill from "./canvas-pill.svelte";
  import CanvasPillDivider from "./canvas-pill-divider.svelte";
  import CanvasPillButton from "./canvas-pill-button.svelte";
  import type { PresencePeer } from "./types";

  /**
   * The top-right pill: who is here, the link out, and export, divided rather
   * than scattered across the corner. Peers come first and you last: an empty
   * corner reads as "nobody is here", which is never true while you are. Each
   * peer's face is ringed in their hue, so the avatar and their cursor read as
   * the same person; with `onFollow` a face is also the follow toggle.
   *
   * Every section, and the divider before it, renders only when its props are
   * given, so the local canvas passes export alone.
   */
  interface Props {
    peers?: PresencePeer[];
    self?: { name: string; image?: string | null };
    /** Faces shown before the rest fold into "+N". */
    maxVisible?: number;
    /** The peer whose view you are riding. */
    following?: string | null;
    onFollow?: (id: string | null) => void;
    /** How many people are riding your view. */
    followers?: number;
    external?: { label: string; onOpen: () => void };
    exportFormats?: CanvasExportFormat[];
    onExport?: (formatId: string) => void;
    exporting?: boolean;
    /**
     * The export button's visible label ("Export"). Unset, it is an icon
     * alone, named by its tooltip. While exporting the label stays, after a
     * spinner in place of the icon, so the pill does not change width.
     */
    exportLabel?: string;
    class?: string;
  }

  let {
    peers,
    self,
    maxVisible = 4,
    following = null,
    onFollow,
    followers = 0,
    external,
    exportFormats,
    onExport,
    exporting = false,
    exportLabel,
    class: className,
  }: Props = $props();

  const visible = $derived(peers?.slice(0, maxVisible) ?? []);
  const hidden = $derived(peers?.slice(maxVisible) ?? []);
  const showPresence = $derived(visible.length > 0 || !!self || followers > 0);
  const showExport = $derived(!!exportFormats && exportFormats.length > 0 && !!onExport);
  const showExternal = $derived(!!external);
  const showDividerBeforeExternal = $derived(showPresence);
  const showDividerBeforeExport = $derived(showPresence || showExternal);
  const showPill = $derived(showPresence || showExternal || showExport);
</script>

{#snippet peerFace(peer: PresencePeer)}
  {@const riding = following === peer.id}
  {@const ring = cn(
    "relative inline-flex rounded-full ring-2",
    riding ? "z-10 scale-110 ring-primary ring-offset-2 ring-offset-card" : PEER_INK[peer.hue].ring,
  )}
  {#if !onFollow}
    <Hint label={peer.name}>
      <span role="img" class={ring}>
        <PersonAvatar name={peer.name} image={peer.image} size="xs" />
      </span>
    </Hint>
  {:else}
    <span
      class={cn(
        ring,
        "transition-transform duration-fast ease-out-strong hover:z-10 motion-safe:hover:scale-110 motion-safe:has-active:scale-95",
      )}
    >
      <PersonAvatar name={peer.name} image={peer.image} size="xs" />
      <Hint label={riding ? `Stop following ${peer.name}` : `Follow ${peer.name}`}>
        <button
          type="button"
          aria-pressed={riding}
          aria-label={`Follow ${peer.name}`}
          onclick={() => onFollow(riding ? null : peer.id)}
          class="absolute inset-0 cursor-pointer rounded-full"
        ></button>
      </Hint>
    </span>
  {/if}
{/snippet}

{#snippet presence()}
  <div class="flex items-center pr-0.5 pl-0.5">
    <div class="flex items-center -space-x-1">
      {#each visible as peer (peer.id)}
        {@render peerFace(peer)}
      {/each}
      {#if self}
        <Hint label={`${self.name} (you)`}>
          <span role="img" class="inline-flex rounded-full ring-2 ring-card">
            <PersonAvatar name={self.name} image={self.image ?? undefined} size="xs" />
          </span>
        </Hint>
      {/if}
    </div>
    {#if hidden.length > 0}
      <Hint label={`${hidden.length} more: ${hidden.map((p) => p.name).join(", ")}`}>
        <span role="img" class="pl-1.5 text-2xs text-muted-foreground tabular-nums">+{hidden.length}</span>
      </Hint>
    {/if}
    {#if followers > 0}
      <Hint
        label={followers === 1 ? "1 person is following your view" : `${followers} people are following your view`}
      >
        <span
          role="img"
          class="ml-1.5 flex h-5 items-center gap-1 rounded-full bg-primary/15 px-1.5 text-2xs font-medium text-primary tabular-nums"
        >
          <Icon icon={EyeIcon} size="xs" />
          {followers}
        </span>
      </Hint>
    {/if}
  </div>
{/snippet}

{#if showPill}
  <CanvasPill corner="top-right" class={cn("px-1.5", className)}>
    {#if showPresence}{@render presence()}{/if}
    {#if showExternal && external}
      {#if showDividerBeforeExternal}<CanvasPillDivider />{/if}
      <CanvasPillButton icon={ExternalLinkIcon} label={external.label} onClick={external.onOpen} />
    {/if}
    {#if showExport && exportFormats && onExport}
      {#if showDividerBeforeExport}<CanvasPillDivider />{/if}
      <DropdownMenu>
        <Hint label={exporting ? "Exporting…" : "Export canvas"}>
          <DropdownMenuTrigger disabled={exporting}>
            {#snippet child({ props })}
              {#if exportLabel}
                <!-- Named by its visible label, busy while exporting; the tooltip carries "Export canvas" / "Exporting…". -->
                <Button
                  {...props}
                  variant="ghost"
                  size="sm"
                  aria-label={exportLabel}
                  aria-busy={exporting || undefined}
                  class="gap-1.5 px-1.5"
                >
                  {#if exporting}<Spinner size="sm" label="" />{:else}<Icon icon={DownloadIcon} size="sm" />{/if}<span>{exportLabel}</span>
                </Button>
              {:else if exporting}
                <button
                  {...props}
                  type="button"
                  aria-label="Exporting…"
                  class="flex size-control-sm items-center justify-center rounded"
                >
                  <Spinner size="sm" label="" />
                </button>
              {:else}
                <IconButton
                  {...props}
                  icon={DownloadIcon}
                  label="Export canvas"
                  size="sm"
                />
              {/if}
            {/snippet}
          </DropdownMenuTrigger>
        </Hint>
        <DropdownMenuContent align="end" sideOffset={8} class="w-36">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Export as</DropdownMenuLabel>
            {#each exportFormats as f (f.id)}
              <DropdownMenuItem onclick={() => onExport(f.id)}>
                <Icon icon={f.icon} size="sm" class="text-muted-foreground" />
                {f.label}
              </DropdownMenuItem>
            {/each}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    {/if}
  </CanvasPill>
{/if}
