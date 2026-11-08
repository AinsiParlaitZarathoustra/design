<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { ChevronRight } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import Link from "../deps/Link.svelte";
  import { hrefOf, isAt } from "../deps/link";
  import RailTip from "./rail-tip.svelte";
  import { useSidebar, type SidebarChild } from "./sidebar";

  /**
   * One row of the rail, ported from `SidebarItem` in `sidebar.tsx`. A row
   * with children is a disclosure, not a destination: its children hang off a
   * rail with L-connectors and arrive by opacity and a short slide, staggered.
   * Closing is instant, as in the source.
   */
  interface Props {
    icon?: any;
    /** A rendered glyph, where a Lucide icon does not fit. */
    mark?: Snippet;
    label: string;
    to?: string;
    search?: Record<string, string>;
    /** Right-aligned count. Hidden at 0. */
    count?: number;
    /** A one-glyph marker: "AI", a live dot, a beta mark. */
    badge?: "ai" | "live" | "beta";
    /** Makes the row a disclosure. */
    children?: Array<SidebarChild>;
    /** A disclosure that starts open. It still opens itself for an active child. */
    defaultOpen?: boolean;
    /** Considered active when the pathname matches; defaults to `to`. */
    match?: (pathname: string) => boolean;
    class?: string;
  }

  let {
    icon,
    mark,
    label,
    to,
    search,
    count,
    badge,
    children,
    defaultOpen = false,
    match,
    class: className,
  }: Props = $props();

  const sidebar = useSidebar();
  const pathname = $derived(sidebar.location.pathname);
  const hasChildren = $derived(!!children?.length);
  const isChildActive = (child: SidebarChild) => isAt(sidebar.location, child.to, child.search);
  const childActive = $derived(hasChildren && (children ?? []).some(isChildActive));

  // The disclosure's open state starts from its props, then belongs to the row.
  // svelte-ignore state_referenced_locally
  let open = $state(defaultOpen || childActive);

  const selfActive = $derived(match ? match(pathname) : to !== undefined && pathname === to);
  // Parents are disclosures, not destinations. Only light the branch when it is
  // closed, so the parent and its child never highlight together.
  const highlighted = $derived(
    hasChildren ? (childActive || selfActive) && (!open || sidebar.collapsed) : selfActive,
  );

  let row = $state<HTMLElement | null>(null);

  // The rail moves its one pill behind the highlighted row.
  $effect(() => {
    const element = row;
    if (!highlighted || !element) return;
    sidebar.setActive(element, label);
    return () => sidebar.setActive(null, label);
  });

  function childIn(_node: Element, { index }: { index: number }) {
    const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const offset = still ? 0 : 4;
    return {
      delay: index * 30,
      duration: 180,
      easing: (t: number) => cubicOut(t),
      css: (t: number) => `opacity: ${t}; transform: translateX(${(t - 1) * offset}px);`,
    };
  }
</script>

{#snippet rowFace()}
  <span
    bind:this={row}
    class={cn(
      "relative flex h-7 w-full items-center gap-2 rounded-md px-2 text-xs",
      "transition-colors duration-fast ease-out-strong",
      sidebar.collapsed && "justify-center px-0",
      highlighted
        ? "font-medium text-foreground"
        : "text-muted-foreground hover:bg-element-hover hover:text-foreground",
      className,
    )}
  >
    {#if icon}
      <Icon {icon} size="sm" class="relative z-10" />
    {:else}
      <span class="relative z-10 flex size-3.5 shrink-0 items-center justify-center">
        {@render mark?.()}
      </span>
    {/if}
    {#if !sidebar.collapsed}
      <span
        class="relative z-10 flex min-w-0 flex-1 items-center gap-2"
        in:fade={{ duration: 120, easing: cubicOut }}
        out:fade={{ duration: 120, easing: cubicOut }}
      >
        <span class="flex-1 truncate text-left">{label}</span>
        {#if badge}
          <span
            class={cn(
              "rounded-full px-1 text-3xs font-medium",
              badge === "ai" && "bg-element-active text-foreground",
              badge === "live" && "bg-success-muted text-success",
              badge === "beta" && "bg-element-hover text-muted-foreground",
            )}
          >
            {badge === "ai" ? "AI" : badge === "live" ? "●" : "β"}
          </span>
        {/if}
        {#if count !== undefined && count > 0}
          <span
            class="flex h-4 min-w-4 tabular-nums items-center justify-center rounded-full bg-destructive px-1 text-3xs font-semibold text-destructive-foreground"
          >
            {count}
          </span>
        {/if}
        {#if hasChildren}
          <span
            class="text-muted-foreground"
            style:transform="rotate({open ? 90 : 0}deg)"
            style:transition="transform 180ms ease"
          >
            <Icon icon={ChevronRight} size="xs" />
          </span>
        {/if}
      </span>
    {/if}
  </span>
{/snippet}

<li>
  {#if hasChildren && !sidebar.collapsed}
    <button
      type="button"
      onclick={() => (open = !open)}
      aria-expanded={open}
      class="w-full text-left outline-none"
    >
      {@render rowFace()}
    </button>
  {:else if to}
    <RailTip {label}>
      <!-- Collapsed, the row is only its glyph and the tooltip is not a name, so the link carries the label itself. -->
      <Link
        href={hrefOf(to, search)}
        aria-label={sidebar.collapsed ? label : undefined}
        class="block outline-none"
      >
        {@render rowFace()}
      </Link>
    </RailTip>
  {:else}
    <RailTip {label}>
      {@render rowFace()}
    </RailTip>
  {/if}

  {#if hasChildren && open && !sidebar.collapsed}
    <ul
      class="relative pl-3.75 before:absolute before:top-0 before:bottom-3 before:left-3.75 before:w-px before:bg-sidebar-border"
    >
      {#each children ?? [] as child, index (`${child.to}#${child.label}`)}
        {@const active = isChildActive(child)}
        <li in:childIn={{ index }} class="relative">
          <span
            aria-hidden="true"
            class={cn(
              "absolute top-1/2 left-0 h-px w-2.5 transition-colors",
              active ? "bg-foreground" : "bg-sidebar-border",
            )}
          ></span>
          {#if active}
            <span class="absolute top-1 bottom-1 left-0 w-px bg-foreground"></span>
          {/if}
          <Link
            href={hrefOf(child.to, child.search)}
            class={cn(
              "ml-3.5 flex h-7 items-center gap-2 rounded-md px-2 text-xs",
              "transition-colors duration-fast ease-out-strong",
              active
                ? "bg-element-selected font-medium text-foreground"
                : "text-muted-foreground hover:bg-element-hover hover:text-foreground",
            )}
          >
            <Icon icon={child.icon} size="sm" />
            <span class="truncate">{child.label}</span>
          </Link>
        </li>
      {/each}
    </ul>
  {/if}
</li>
