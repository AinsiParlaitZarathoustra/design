<script lang="ts">
  import type { Snippet } from "svelte";

  /**
   * A story whose play function clicks one control (`Load full output`, `Show
   * 2,000 more lines`, `Copy`): the same real click, made on mount, so the
   * gallery shows the state the play leaves. Matches a button by its accessible
   * name or by its visible text.
   */
  interface Props {
    ariaLabel?: string;
    text?: string;
    children: Snippet;
  }

  let { ariaLabel, text, children }: Props = $props();
  let wrap = $state<HTMLElement | null>(null);

  $effect(() => {
    const buttons = Array.from(wrap?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    const target = buttons.find(
      (b) => (ariaLabel !== undefined && b.getAttribute("aria-label") === ariaLabel) ||
        (text !== undefined && (b.textContent ?? "").includes(text)),
    );
    target?.focus();
    target?.click();
  });
</script>

<div bind:this={wrap}>
  {@render children()}
</div>
