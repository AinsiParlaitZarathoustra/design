<script lang="ts">
  import { XIcon } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Hint from "../../ui/hint.svelte";
  import Icon from "../../ui/icon.svelte";
  import Spinner from "../ui/spinner.svelte";
  import type { TabStripItem } from "./tab-strip-logic";

  interface Props {
    item: TabStripItem;
    active: boolean;
    focused: boolean;
    tabStop: boolean;
    closable: boolean;
    middleClickCloses: boolean;
    closeLabel: string;
    dragging?: boolean;
    extra?: Record<string, unknown>;
    onSelect: (id: string) => void;
    onClose?: (id: string) => void;
  }

  let {
    item,
    active,
    focused,
    tabStop,
    closable,
    middleClickCloses,
    closeLabel,
    dragging = false,
    extra = {},
    onSelect,
    onClose,
  }: Props = $props();

  const { id, title, icon, dirty, busy, pinned } = $derived(item);

  const {
    class: extraClass,
    onclick: hostClick,
    onmousedown: hostMouseDown,
    onauxclick: hostAuxClick,
    ...restExtra
  } = $derived(extra as Record<string, unknown>);

  const hasSlot = $derived(icon != null || closable);
</script>

{#snippet chip()}
  <div
    {...restExtra}
    role="tab"
    aria-selected={active}
    aria-busy={busy || undefined}
    aria-label={dirty ? `${title}, unsaved` : title}
    tabindex={tabStop ? 0 : -1}
    data-tab-id={id}
    data-active={active || undefined}
    data-dirty={dirty || undefined}
    data-pinned={pinned || undefined}
    data-dragging={dragging || undefined}
    onclick={(event) => {
      (hostClick as ((e: MouseEvent) => void) | undefined)?.(event);
      onSelect(id);
    }}
    onmousedown={(event) => {
      (hostMouseDown as ((e: MouseEvent) => void) | undefined)?.(event);
      if (event.button === 1) event.preventDefault();
    }}
    onauxclick={(event) => {
      (hostAuxClick as ((e: MouseEvent) => void) | undefined)?.(event);
      if (event.button === 1 && closable && middleClickCloses) {
        event.preventDefault();
        onClose?.(id);
      }
    }}
    class={cn(
      "group/tab flex h-6 shrink-0 cursor-pointer items-center gap-1.5 rounded-md text-xs select-none",
      "transition-colors duration-fast ease-out-strong",
      "focus-visible:-outline-offset-2",
      pinned
        ? "w-6 justify-center"
        : cn("max-w-44", hasSlot ? "pr-2 pl-1" : "px-2"),
      active
        ? focused
          ? "bg-element-selected text-foreground"
          : "bg-element-hover text-secondary-foreground"
        : "text-muted-foreground hover:bg-element-hover hover:text-foreground",
      dragging && "relative z-10 bg-element-selected text-foreground",
      extraClass as string | undefined,
    )}
  >
    {#if hasSlot}
      <span class="relative flex size-4 shrink-0 items-center justify-center">
        <span
          class={cn(
            "flex items-center justify-center",
            closable && "group-hover/tab:invisible group-focus-visible/tab:invisible",
          )}
        >
          {#if busy}
            <Spinner size="md" label="" class="text-primary" />
          {:else if icon}
            <Icon icon={icon} size="md" />
          {/if}
        </span>
        {#if closable}
          <button
            type="button"
            tabindex="-1"
            aria-label={closeLabel}
            onclick={(event) => {
              event.stopPropagation();
              onClose?.(id);
            }}
            class={cn(
              "absolute inset-0 hidden items-center justify-center rounded-sm text-muted-foreground",
              "hover:bg-element-active hover:text-foreground",
              "group-hover/tab:flex group-focus-visible/tab:flex",
            )}
          >
            <Icon icon={XIcon} size="sm" />
          </button>
        {/if}
      </span>
    {/if}
    {#if !pinned}
      <span class={cn("truncate", dirty && "italic")}>{title}</span>
    {/if}
  </div>
{/snippet}

{#if pinned}
  <Hint label={title}>{@render chip()}</Hint>
{:else}
  {@render chip()}
{/if}
