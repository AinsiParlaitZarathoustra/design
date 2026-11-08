<script lang="ts">
  /**
   * The editor slot of the composer stories: desktop's Tiptap field or web's
   * textarea. A plain textarea stands in (`Editor` in the source stories).
   */
  interface Props {
    value?: string;
    /** The story's play function clicks the field: focus it on mount. */
    autofocus?: boolean;
  }

  let { value = "", autofocus = false }: Props = $props();

  let field = $state<HTMLTextAreaElement | null>(null);

  $effect(() => {
    if (autofocus) field?.focus();
  });
</script>

<textarea
  bind:this={field}
  aria-label="Message"
  rows={1}
  {value}
  placeholder="Message #design-system"
  class="block w-full resize-none bg-transparent px-[10px] py-[8px] text-base leading-[18px] text-foreground outline-none placeholder:text-disabled"
></textarea>
