<script lang="ts">
  import type { LucideIcon } from "./canvas-chrome";
  import Hint from "../../../ui/hint.svelte";
  import IconButton from "../../../ui/icon-button.svelte";

  /**
   * A 24px icon control in a pill, its label (and shortcut) in a tooltip.
   * `pressed`, when given, makes it a toggle (`aria-pressed`).
   */
  interface Props {
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
    pressed?: boolean;
    disabled?: boolean;
    shortcut?: string;
    side?: "top" | "bottom";
    class?: string;
  }

  let {
    icon,
    label,
    onClick,
    pressed,
    disabled = false,
    shortcut,
    side = "bottom",
    class: className,
  }: Props = $props();
</script>

<Hint {label} {shortcut} {side}>
  <IconButton
    {icon}
    {label}
    size="sm"
    onclick={onClick}
    {disabled}
    aria-pressed={pressed}
    class={className}
  />
</Hint>
