<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /**
   * One row of the palette. `active` is the keyboard highlight, which the caller
   * owns. `compact` rows are a control height (26px). `listbox={false}` drops the
   * `option` role and its `aria-selected` / `aria-disabled`, leaving `data-active`
   * and `data-disabled` for styling.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    active?: boolean;
    disabled?: boolean;
    size?: "default" | "compact";
    listbox?: boolean;
    children?: Snippet;
  }

  let {
    class: className,
    active = false,
    disabled = false,
    size = "default",
    listbox = true,
    children,
    ...rest
  }: Props = $props();
</script>

<div
  data-slot="command-item"
  data-size={size === "compact" ? size : undefined}
  role={listbox ? "option" : undefined}
  aria-selected={listbox ? active : undefined}
  aria-disabled={(listbox && disabled) || undefined}
  data-active={active || undefined}
  data-disabled={(!listbox && disabled) || undefined}
  class={cn(
    size === "compact"
      ? [
          "flex h-control-md w-full items-center gap-2 px-3 text-left text-sm select-none",
          active
            ? "bg-element-selected text-foreground"
            : cn("text-secondary-foreground", !disabled && "hover:bg-element-hover"),
        ]
      : "flex min-h-9 w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-md text-foreground select-none",
    disabled ? "disabled-look" : "cursor-pointer",
    size !== "compact" && active && "bg-element-selected",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</div>
