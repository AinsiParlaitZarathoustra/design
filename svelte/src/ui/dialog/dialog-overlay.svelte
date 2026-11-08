<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { SCRIM_BLUR } from "../scrim";
  import { getDialog } from "./context";

  /**
   * The dialog's scrim, ported from `DialogOverlay` in `dialog.tsx` (Base UI's
   * `Dialog.Backdrop`). `DialogContent` renders it; it is exported for layouts
   * that compose their own content. A click on it asks the dialog to close.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    blur?: boolean;
  }

  let { class: className, blur = false, ...rest }: Props = $props();

  const api = getDialog();
</script>

<div
  data-slot="dialog-overlay"
  data-open={api.phase === "opening" || api.phase === "open" ? "" : undefined}
  data-closed={api.phase === "closing" ? "" : undefined}
  onclick={() => api.requestClose()}
  {...rest}
  class={cn(
    "fixed inset-0 z-overlay scrim",
    blur && SCRIM_BLUR,
    "data-open:animate-fade-in data-closed:animate-fade-out",
    className,
  )}
></div>
