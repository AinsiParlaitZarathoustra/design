<script lang="ts">
  import CommandDialogRoot from "./command-dialog.svelte";
  import CommandDialogPopupRef from "./command-dialog-popup.svelte";
  import CommandPaletteStack from "./command-palette-stack.svelte";
  import type { CommandPaletteGroup, CommandPaletteItem } from "./command-list";

  /**
   * The palette: ⌘K, the dialog, the filter and the submenu stack. Escape goes back
   * out of a submenu before it closes the dialog; a press outside closes it.
   * Running a row asks to close (unless `keepOpen`), then calls `onRun` and the
   * row's own `onSelect`.
   */
  interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    groups: ReadonlyArray<CommandPaletteGroup>;
    title?: string;
    placeholder?: string;
    submenuPlaceholder?: string;
    emptyMessage?: string | ((query: string) => string);
    actionLabel?: string;
    filter?: boolean;
    onQueryChange?: (query: string) => void;
    loading?: boolean;
    onRun?: (item: CommandPaletteItem) => void;
    hints?: boolean;
    size?: "default" | "tall";
  }

  let {
    open,
    onOpenChange,
    groups,
    title = "Command palette",
    placeholder,
    submenuPlaceholder,
    emptyMessage,
    actionLabel,
    filter,
    onQueryChange,
    loading,
    onRun,
    hints,
    size,
  }: Props = $props();

  const backRef: { current: (() => void) | null } = { current: null };
</script>

<CommandDialogRoot
  {open}
  {onOpenChange}
  onBeforeDismiss={(reason) => {
    if (reason !== "escape" || !backRef.current) return false;
    backRef.current();
    return true;
  }}
>
  <CommandDialogPopupRef {title} dataSlot="command-palette">
    <CommandPaletteStack
      {groups}
      {placeholder}
      {submenuPlaceholder}
      {emptyMessage}
      {actionLabel}
      {filter}
      {onQueryChange}
      {loading}
      {onRun}
      {hints}
      {size}
      {backRef}
      onClose={() => onOpenChange(false)}
    />
  </CommandDialogPopupRef>
</CommandDialogRoot>
