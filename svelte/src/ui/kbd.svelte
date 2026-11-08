<script module lang="ts">
  import type { VariantProps } from "class-variance-authority";

  type KbdRecipe = typeof import("./kbd-variants").kbdVariants;
  export type KbdVariant = VariantProps<KbdRecipe>["variant"];
  export type KbdSize = VariantProps<KbdRecipe>["size"];
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../lib/utils";
  import { platformKey, detectKeyPlatform } from "../lib/combo";
  import { kbdVariants } from "./kbd-variants";

  /**
   * A keycap (decision 32), ported to Svelte.
   *
   * `text` draws a glyph string for the host's keyboard ("⌘⇧F" → Ctrl+Shift+F
   * on Windows and Linux); `platform` overrides the detection for a screenshot
   * or a settings page. A snippet child is drawn as given.
   */
  interface Props extends Omit<HTMLAttributes<HTMLElement>, "class"> {
    variant?: KbdVariant;
    size?: KbdSize;
    platform?: "mac" | "other";
    text?: string;
    class?: string;
    children?: Snippet;
  }

  let {
    variant = "default",
    size = "xs",
    platform,
    text,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const resolved = $derived(platform ?? detectKeyPlatform());
</script>

<kbd data-slot="kbd" class={cn(kbdVariants({ variant, size }), className)} {...rest}>
  {#if text !== undefined}{platformKey(text, resolved)}{:else}{@render children?.()}{/if}
</kbd>
