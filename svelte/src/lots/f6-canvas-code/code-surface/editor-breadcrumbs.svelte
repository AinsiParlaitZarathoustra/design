<script lang="ts">
  import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import { collapseSegments } from "./code-surface";

  /**
   * The file view's path, desktop's `FileBreadcrumbs` in its looks: folders
   * muted, the file in the foreground, chevrons between. Each crumb truncates
   * on its own, and a long path keeps its first and last crumbs and folds the
   * middle into an ellipsis whose tooltip lists what it hides. The `nav`'s
   * tooltip is the whole path.
   *
   * The Breadcrumb primitive's markup is written out here (nav, ol, li, the
   * page and ellipsis roles), as `components/ui/breadcrumb.tsx` renders it.
   */
  interface Props {
    /** The path's parts, root first: `pathSegments(path, root)`. */
    segments: readonly string[];
    /** Crumbs shown before the middle collapses into one ellipsis. */
    maxVisible?: number;
    /** The file has unsaved edits: a dot after its name. */
    dirty?: boolean;
    /** Makes every crumb but the file a button; gets the crumb's index in `segments`. */
    onSelect?: (index: number) => void;
    class?: string;
  }

  let { segments, maxVisible = 4, dirty = false, onSelect, class: className }: Props = $props();

  const items = $derived(collapseSegments(segments, maxVisible));
  const last = $derived(segments.length - 1);
</script>

{#if segments.length > 0}
  <nav
    aria-label="File path"
    title={segments.join("/")}
    data-slot="editor-breadcrumbs"
    class={cn("min-w-0", className)}
  >
    <ol
      data-slot="breadcrumb-list"
      class="flex items-center text-xs wrap-break-word text-muted-foreground flex-nowrap gap-0 overflow-hidden"
    >
      {#each items as item, i (item.kind === "ellipsis" ? "ellipsis" : item.index)}
        {#if item.kind === "ellipsis"}
          <li data-slot="breadcrumb-item" class="inline-flex items-center gap-1 shrink-0" title={item.hidden.join("/")}>
            <span
              data-slot="breadcrumb-ellipsis"
              role="presentation"
              aria-hidden="true"
              class="flex size-4 items-center justify-center [&>svg]:size-3.5"
            >
              <MoreHorizontalIcon />
              <span class="sr-only">More</span>
            </span>
          </li>
        {:else if item.index === last}
          <li data-slot="breadcrumb-item" class="inline-flex items-center gap-1 min-w-0">
            <span
              data-slot="breadcrumb-page"
              role="link"
              aria-disabled="true"
              aria-current="page"
              class="block min-w-0 truncate px-0.5 font-medium text-foreground"
            >{item.label}</span>
            {#if dirty}
              <span
                role="img"
                aria-label="Unsaved changes"
                class="size-1.5 shrink-0 rounded-full bg-primary"
              ></span>
            {/if}
          </li>
        {:else}
          <li data-slot="breadcrumb-item" class="inline-flex items-center gap-1 shrink-0">
            {#if onSelect}
              <button
                type="button"
                data-slot="breadcrumb-link"
                class="transition-colors duration-fast ease-out-strong hover:text-foreground block max-w-40 cursor-pointer truncate rounded-sm px-0.5 text-left outline-none hover:bg-element-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                onclick={() => onSelect?.(item.index)}
              >
                {item.label}
              </button>
            {:else}
              <span class="block max-w-40 truncate px-0.5">{item.label}</span>
            {/if}
          </li>
        {/if}
        {#if i < items.length - 1}
          <li
            data-slot="breadcrumb-separator"
            role="presentation"
            aria-hidden="true"
            class="mx-0.5 shrink-0 text-muted-foreground [&>svg]:size-3.5"
          >
            <ChevronRightIcon />
          </li>
        {/if}
      {/each}
    </ol>
  </nav>
{/if}
