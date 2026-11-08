<script module lang="ts">
  export interface CommandSuggestion {
    /** The completion: an entry's name, or a command's. */
    name: string;
    kind: "command" | "dir" | "file";
  }

  /** The option element's id, for the field's `aria-activedescendant`. */
  export function commandSuggestionId(id: string, index: number) {
    return `${id}-option-${index}`;
  }
</script>

<script lang="ts">
  import { FileTextIcon, FolderIcon, SquareTerminalIcon } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";

  /**
   * The terminal's completion list, floating above the command field (desktop's
   * `command-suggestions.tsx`). Controlled: the app owns the items and the
   * active row, which follows Tab. It never takes focus, and a press on a row
   * is cancelled, so typing carries on in the field; a press on the field itself
   * does not close it. It follows Tab and arrow keys, so it does not animate.
   *
   * The React popover is a Base UI portal; here the list is moved to <body> by
   * an attachment and placed above the anchor by hand (side top, start-aligned,
   * 6px clear), with the same width rule as the anchor.
   */
  interface Props {
    /** The listbox's id; options are `${id}-option-${index}`, for `aria-activedescendant`. */
    id: string;
    open: boolean;
    items: readonly CommandSuggestion[];
    activeIndex: number;
    /** What the list sits above: the command field. */
    anchor: Element | null;
    onSelect: (item: CommandSuggestion) => void;
    onOpenChange: (open: boolean) => void;
  }

  let { id, open, items, activeIndex, anchor, onSelect, onOpenChange }: Props = $props();

  const GLYPH = { dir: FolderIcon, command: SquareTerminalIcon, file: FileTextIcon } as const;

  let popup = $state<HTMLDivElement | null>(null);
  let box = $state({ left: 0, bottom: 0, width: 0 });

  const shown = $derived(open && items.length > 0 && anchor !== null);

  // Place the list above the anchor, and keep it there: the box is read every
  // frame, so a layout that settles after mount (the page's padding, a font)
  // moves the list with the field, as Base UI's positioner does.
  $effect(() => {
    if (!shown || !anchor) return;
    let frame = 0;
    let last = "";
    const place = () => {
      const r = anchor.getBoundingClientRect();
      const next = { left: r.left, bottom: window.innerHeight - r.top + 6, width: r.width };
      const key = `${next.left}|${next.bottom}|${next.width}`;
      if (key !== last) {
        last = key;
        box = next;
      }
      frame = requestAnimationFrame(place);
    };
    place();
    return () => cancelAnimationFrame(frame);
  });

  // Dismiss on a press outside both the list and the field; a press on the
  // field is left to the field.
  $effect(() => {
    if (!shown) return;
    const dismiss = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target || popup?.contains(target) || anchor?.contains(target)) return;
      onOpenChange(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  });

  // Keep the highlighted row in view as Tab cycles past the edge.
  $effect(() => {
    void activeIndex;
    if (shown) {
      popup?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView?.({
        block: "nearest",
      });
    }
  });

  function portal(node: HTMLDivElement) {
    document.body.append(node);
    popup = node;
    return () => {
      popup = null;
      node.remove();
    };
  }
</script>

{#if shown}
  <div
    {@attach portal}
    class="isolate z-popover fixed"
    style="left: {box.left}px; bottom: {box.bottom}px;"
  >
    <div
      role="dialog"
      tabindex="-1"
      aria-label="Completions"
      class="flex w-(--anchor-width) max-w-[460px] min-w-[260px] flex-col overflow-hidden rounded-md border border-border bg-popover shadow-md outline-none"
      style="--anchor-width: {box.width}px;"
      onmousedown={(e) => e.preventDefault()}
    >
      <div id={id} role="listbox" aria-label="Completions" class="max-h-[248px] overflow-y-auto py-1">
        {#each items as item, i (`${item.kind}:${item.name}`)}
          {@const active = i === activeIndex}
          <div
            id={commandSuggestionId(id, i)}
            role="option"
            tabindex="-1"
            aria-selected={active}
            onmousedown={(e) => {
              e.preventDefault();
              onSelect(item);
            }}
            class={cn(
              "flex h-control-sm cursor-pointer items-center gap-2 px-2.5 font-mono text-sm",
              active
                ? "bg-element-selected text-foreground"
                : "text-secondary-foreground hover:bg-element-hover",
            )}
          >
            <Icon
              icon={GLYPH[item.kind]}
              size="xs"
              class={item.kind === "dir" ? "text-primary" : "text-muted-foreground"}
            />
            <span class="truncate">
              {item.name}<span>{item.kind === "dir" ? "/" : ""}</span>
            </span>
          </div>
        {/each}
      </div>
      <div
        class="flex h-control-sm shrink-0 items-center justify-end border-t border-border px-2.5 text-3xs tracking-wider text-muted-foreground uppercase"
      >
        ⇥ ↑↓ cycle · ↵ run · ⎋
      </div>
    </div>
  </div>
{/if}
