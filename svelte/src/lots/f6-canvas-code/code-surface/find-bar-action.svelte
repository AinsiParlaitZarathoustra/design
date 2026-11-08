<script lang="ts">
  import type { LucideIcon } from "../canvas/canvas-chrome";
  import Hint from "../../../ui/hint.svelte";
  import IconButton from "../../../ui/icon-button.svelte";

  /** One icon control in the find bar, named by its tooltip. */
  interface Props {
    label: string;
    icon: LucideIcon;
    onclick: () => void;
    disabled?: boolean;
    pressed?: boolean;
  }

  let { label, icon, onclick, disabled = false, pressed }: Props = $props();
</script>

<Hint {label}>
  <IconButton
    size="sm"
    {icon}
    {label}
    {onclick}
    {disabled}
    aria-pressed={pressed}
  />
</Hint>
