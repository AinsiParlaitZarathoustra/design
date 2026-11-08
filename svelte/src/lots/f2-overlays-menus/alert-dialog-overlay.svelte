<script lang="ts">
  import { cn } from "../../lib/utils";
  import { SCRIM_BLUR } from "../../ui/scrim";
  import { getAlertDialog } from "./alert-dialog-context";

  /** The scrim behind the dialog. `blur` frosts what is behind it, as `DialogOverlay blur` does. */
  interface Props {
    class?: string;
    blur?: boolean;
  }

  let { class: className, blur = false }: Props = $props();
  const api = getAlertDialog();
</script>

<div
  data-slot="alert-dialog-overlay"
  data-open={api.ending ? undefined : ""}
  data-closed={api.ending ? "" : undefined}
  class={cn(
    "fixed inset-0 z-overlay scrim",
    blur && SCRIM_BLUR,
    "data-closed:animate-fade-out data-open:animate-fade-in",
    className,
  )}
></div>
