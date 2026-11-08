<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  import { ArrowUpRight, SlidersHorizontal } from "lucide-svelte";
  import { EASE_PANEL } from "../../lib/motion";
  import { cn } from "../../lib/utils";
  import IconButton from "../../ui/icon-button.svelte";

  /**
   * The card of this system, ported from `src/components/patterns/panel.tsx`.
   *
   * `rounded-lg border border-element-selected bg-card`: desktop's card, a
   * hairline on a lighter step of the ramp, never a shadow. A panel may carry a
   * top-right action cluster (filter, expand) of round ghost icon buttons. Panels
   * enter with a small rise, and a page staggers them down with `delay`.
   *
   * The enter is `motion`'s `initial {opacity 0, y 8}` to `animate {opacity 1, y 0}`
   * over 0.28s on `EASE_PANEL`, after `delay`. It is a CSS transition here: the
   * inline start style is forced to paint, then the end style is set.
   */
  interface Props {
    title?: string;
    subtitle?: string;
    actions?: Snippet;
    onExpand?: () => void;
    onFilter?: () => void;
    class?: string;
    bodyClass?: string;
    children: Snippet;
    /** Seconds before the enter starts. */
    delay?: number;
  }

  let {
    title,
    subtitle,
    actions,
    onExpand,
    onFilter,
    class: className,
    bodyClass,
    children,
    delay = 0,
  }: Props = $props();

  let section: HTMLElement | undefined = $state();
  let entered = $state(false);

  onMount(() => {
    // Read a layout property so the hidden start style is computed before the change.
    if (section) void section.offsetHeight;
    entered = true;
  });

  const ease = `cubic-bezier(${EASE_PANEL.join(", ")})`;
  const enterStyle = $derived(
    `opacity: ${entered ? 1 : 0}; transform: ${entered ? "none" : "translateY(8px)"}; ` +
      `transition: opacity 0.28s ${ease} ${delay}s, transform 0.28s ${ease} ${delay}s;`,
  );
</script>

<section
  bind:this={section}
  data-slot="panel"
  style={enterStyle}
  class={cn(
    "flex min-w-0 flex-col overflow-hidden rounded-lg border border-element-selected bg-card",
    className,
  )}
>
  {#if title || actions || onExpand || onFilter}
    <header class="flex items-start justify-between gap-3 px-3.5 pt-3 pb-2">
      <div class="min-w-0">
        {#if title}
          <h3 class="truncate text-sm font-medium text-foreground">{title}</h3>
        {/if}
        {#if subtitle}
          <p class="mt-0.5 truncate caption">{subtitle}</p>
        {/if}
      </div>
      <div class="flex shrink-0 items-center gap-1.5">
        {@render actions?.()}
        {#if onFilter}
          <IconButton
            icon={SlidersHorizontal}
            label="Filter"
            size="sm"
            shape="round"
            onclick={onFilter}
          />
        {/if}
        {#if onExpand}
          <IconButton icon={ArrowUpRight} label="Open" size="sm" shape="round" onclick={onExpand} />
        {/if}
      </div>
    </header>
  {/if}
  <div class={cn("min-h-0 flex-1 px-3.5 pt-1 pb-3.5", bodyClass)}>
    {@render children()}
  </div>
</section>
