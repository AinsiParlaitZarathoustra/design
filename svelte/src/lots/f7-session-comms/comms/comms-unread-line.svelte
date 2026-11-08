<script lang="ts">
  import { cn } from "../../../lib/utils";

  /** The line above the first message the person has not read (`CommsUnreadLine`). */
  interface Props {
    label?: string;
    class?: string;
  }

  let { label = "New", class: className }: Props = $props();
</script>

<div
  data-slot="comms-unread-line"
  role="separator"
  aria-label={label}
  class={cn("flex items-center gap-2 px-3 py-1 text-error", className)}
>
  <span aria-hidden="true" class="h-px flex-1 bg-current opacity-60"></span>
  <span aria-hidden="true" class="text-2xs font-semibold tracking-wide uppercase">{label}</span>
</div>
