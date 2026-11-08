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
    /** A CSS selector for the control, when neither its label nor its text identifies it. */
    query?: string;
    /**
     * Focus the control before clicking (the default). `false` where the
     * oracle's play only clicks: focusing scrolls the page to the control,
     * which the capture would then show.
     */
    focus?: boolean;
    children: Snippet;
  }

  let { ariaLabel, text, query, focus = true, children }: Props = $props();
  let wrap = $state<HTMLElement | null>(null);

  $effect(() => {
    const buttons = Array.from(wrap?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    const target = query
      ? (wrap?.querySelector<HTMLButtonElement>(query) ?? undefined)
      : buttons.find(
          (b) => (ariaLabel !== undefined && b.getAttribute("aria-label") === ariaLabel) ||
            (text !== undefined && (b.textContent ?? "").includes(text)),
        );
    if (focus) target?.focus();
    target?.click();
  });
</script>

<div bind:this={wrap}>
  {@render children()}
</div>
