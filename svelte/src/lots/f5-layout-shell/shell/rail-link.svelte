<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import Link from "../deps/Link.svelte";
  import { getLinks, isAt } from "../deps/link";

  /**
   * A rail row, the sidebar's shape. The current page is `aria-current="page"`
   * and lit. Ported from `RailLink` in `settings-shell.tsx`.
   */
  interface Props {
    to: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: any;
    children?: Snippet;
  }

  let { to, icon, children }: Props = $props();
  const links = getLinks();
</script>

<Link
  href={to}
  aria-current={isAt(links.location, to) ? "page" : undefined}
  class={cn(
    "group/item flex h-7 items-center gap-2 rounded-md px-2 text-xs",
    "transition-colors duration-fast ease-out-strong",
    "text-muted-foreground hover:bg-element-hover hover:text-foreground",
    "aria-[current=page]:bg-element-selected aria-[current=page]:font-medium aria-[current=page]:text-foreground",
  )}
>
  {#if icon}
    <Icon {icon} size="sm" />
  {/if}
  <span class="truncate">{@render children?.()}</span>
</Link>
