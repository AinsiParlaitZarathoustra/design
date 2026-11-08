<script lang="ts">
  import Hint from "../../../ui/hint.svelte";
  import IconButton from "../../../ui/icon-button.svelte";

  /**
   * One stepper button, behind a hint when the app gave its keys. Ported from
   * `Step` in `src/components/shell/ui-scale.tsx`.
   */
  interface Props {
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    shortcut?: string;
    hinted: boolean;
    disabled?: boolean;
    onclick: () => void;
  }

  let { label, icon, shortcut, hinted, disabled = false, onclick }: Props = $props();
</script>

{#if hinted}
  <Hint {label} {shortcut}>
    <IconButton {icon} {label} {disabled} {onclick} size="sm" variant="outline" shape="round" />
  </Hint>
{:else}
  <IconButton {icon} {label} {disabled} {onclick} size="sm" variant="outline" shape="round" />
{/if}
