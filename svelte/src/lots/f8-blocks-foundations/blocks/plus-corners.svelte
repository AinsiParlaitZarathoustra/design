<script lang="ts">
  import PlusDecorator from "./plus-decorator.svelte";

  /** All four corners at once. The parent must be `relative`. */
  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props();
</script>

<PlusDecorator corner="tl" class={className} />
<PlusDecorator corner="tr" class={className} />
<PlusDecorator corner="bl" class={className} />
<PlusDecorator corner="br" class={className} />
