<script lang="ts">
  import type { Snippet } from "svelte";
  import { ChevronDown } from "lucide-svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import { RESPONSE_CLAMP_PX, RESPONSE_CLAMP_SLACK_PX } from "./turn-row-helpers";

  /**
   * Desktop's session-detail clamp: past 400px, an answer shows its first 340
   * and fades out (a mask, so it fades into whatever surface it sits on) under
   * a pill that hangs half over the edge. Expanded, the pill sits below as
   * "Show less". The slack keeps an answer only a little over from being cut by
   * a sliver. Measured on every resize, since a body that loads later grows.
   */
  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  let el = $state<HTMLElement | null>(null);
  let overflows = $state(false);
  let expanded = $state(false);

  $effect(() => {
    const node = el;
    if (!node) return;
    const measure = () => {
      // Zero is "not laid out yet", not "empty": it must not close an open clamp.
      if (node.scrollHeight === 0) return;
      overflows = node.scrollHeight > RESPONSE_CLAMP_PX + RESPONSE_CLAMP_SLACK_PX;
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  });

  const clamped = $derived(overflows && !expanded);
</script>

<div data-slot="response-clamp" class={cn("relative", clamped && "pb-3.5")}>
  <div
    bind:this={el}
    class={cn(clamped && "mask-b-from-[calc(100%-4rem)] overflow-hidden")}
    style:max-height={clamped ? `${RESPONSE_CLAMP_PX}px` : null}
  >
    {@render children()}
  </div>
  {#if overflows}
    <div
      class={cn("flex justify-center", expanded ? "mt-2" : "absolute inset-x-0 bottom-0")}
    >
      <button
        type="button"
        aria-expanded={expanded}
        onclick={() => (expanded = !expanded)}
        class="flex h-7 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-3 text-sm text-secondary-foreground shadow-md transition-colors hover:border-border-strong hover:text-foreground"
      >
        <Icon
          icon={ChevronDown}
          size="xs"
          class={cn("transition-transform duration-fast", expanded && "rotate-180")}
        />
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  {/if}
</div>
