<script module lang="ts">
  import type { Snippet } from "svelte";

  export interface UnderlineTabOption<T extends string> {
    value: T;
    label: string;
    count?: number | string;
    icon?: Snippet;
  }
</script>

<script lang="ts" generics="T extends string">
  import { cn } from "../../lib/utils";
  import { SPRING_INDICATOR } from "../../lib/motion";
  import { SpringValue } from "./deps/spring.svelte";

  /**
   * Page-level tabs with a sliding underline. The active rule is ONE element
   * that slides between tabs on `SPRING_INDICATOR`, not two rules cross-fading.
   * It is drawn inside the active tab; when the active tab changes, the new rule
   * starts where the old one was and springs to its place (FLIP).
   */
  interface Props {
    options: UnderlineTabOption<T>[];
    value: T;
    onChange?: (value: T) => void;
    class?: string;
  }

  let { options, value = $bindable(), onChange, class: className }: Props = $props();

  let list: HTMLElement | undefined = $state();
  let previous: { left: number; width: number } | undefined;
  const offsetX = new SpringValue(0);
  const scaleX = new SpringValue(1);

  $effect(() => {
    // Runs once the DOM shows the new active tab.
    void value;
    const button = list?.querySelector<HTMLElement>("[data-indicator]")?.parentElement;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    if (previous) {
      offsetX.snap(previous.left - rect.left);
      scaleX.snap(previous.width / rect.width);
      offsetX.to(0, SPRING_INDICATOR);
      scaleX.to(1, SPRING_INDICATOR);
    }
    previous = { left: rect.left, width: rect.width };
  });

  $effect(() => () => {
    offsetX.destroy();
    scaleX.destroy();
  });

  function select(next: T) {
    value = next;
    onChange?.(next);
  }
</script>

<div
  bind:this={list}
  data-slot="underline-tabs"
  role="tablist"
  class={cn("flex items-center gap-4 border-b border-border-subtle", className)}
>
  {#each options as option (option.value)}
    {@const active = option.value === value}
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onclick={() => select(option.value)}
      class={cn(
        "relative flex h-control-lg items-center gap-1.5 text-xs font-medium outline-none",
        "transition-colors duration-fast ease-out-strong",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {#if option.icon}{@render option.icon()}{/if}{option.label}{#if option.count !== undefined}<span
          class="rounded-full bg-element-hover px-1 text-3xs tabular-nums">{option.count}</span
        >{/if}{#if active}<span
          data-indicator
          class="absolute inset-x-0 -bottom-px h-px bg-foreground"
          style="transform-origin: left; transform: translateX({offsetX.current}px) scaleX({scaleX.current});"
        ></span>{/if}
    </button>
  {/each}
</div>
