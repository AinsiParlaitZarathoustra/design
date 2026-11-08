<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../lib/utils";

  /**
   * A fenced block in running text: a message's fence, with its language named
   * in small caps inside the box, above the code. The box owns the surface and
   * the padding; the label is not selectable, so copying copies only the code.
   *
   * The markup of `<pre>` is written without whitespace: inside a preformatted
   * block a stray space is a text node that shows.
   */
  interface Props {
    /** "ts", "rust"… from the fence's info string. Unset, no label. */
    language?: string | null;
    class?: string;
    children?: Snippet;
    [attribute: string]: unknown;
  }

  let { language, class: className, children, ...rest }: Props = $props();
</script>

<!-- It scrolls sideways, so a keyboard has to be able to reach it. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<pre
  data-slot="code-fence"
  tabindex={0}
  class={cn(
    "overflow-x-auto rounded-md border border-border-subtle bg-card px-2.5 py-2",
    "font-mono text-xs leading-[1.55] text-secondary-foreground",
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    // `syntax.css` is unlayered, so only `!` outranks it.
    "[&_code.hljs]:overflow-visible! [&_code.hljs]:bg-transparent! [&_code.hljs]:p-0!",
    className,
  )}
  {...rest}
>{#if language}<span
      data-slot="code-fence-language"
      class="mb-1 block text-3xs tracking-wide uppercase opacity-45 select-none">{language}</span
    >{/if}{@render children?.()}</pre
>
