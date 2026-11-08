<script lang="ts">
  import { cn } from "../../lib/utils";
  import ModelMark from "./model-mark.svelte";
  import { familyOf, type ModelFamily } from "./model-family";

  /**
   * A model, as a chip with its family's mark. The marks are inline SVG, so
   * the badge needs no asset files. Pass `family` when the app knows it
   * (`null` draws no mark); omitted, it is guessed from `model`.
   */
  interface Props {
    model: string;
    family?: ModelFamily | null;
    /** `xs` (20px, the default) beside a control. `2xs` (18px) is the inline chip. */
    size?: "xs" | "2xs";
    class?: string;
  }

  let { model, family, size = "xs", class: className }: Props = $props();

  const shown = $derived(family !== undefined ? family : familyOf(model));
</script>

<span
  data-slot="model-badge"
  data-size={size === "2xs" ? size : undefined}
  class={cn(
    // Whole strings, not a 2xs override: tailwind-merge does not know the
    // `h-control-*` utilities conflict, so it would keep both heights.
    size === "2xs"
      ? "inline-flex h-control-2xs max-w-full items-center gap-1 rounded-full border border-border px-1.5 text-secondary-foreground"
      : "inline-flex h-control-xs max-w-full items-center gap-1.5 rounded-full border border-border px-2 text-secondary-foreground",
    className,
  )}
>
  {#if shown}
    <ModelMark family={shown} />
  {/if}
  <span class="truncate font-mono text-2xs">{model}</span>
</span>
