<script lang="ts">
  import { cn } from "../../../lib/utils";
  import { formatDayLabel } from "./comms-view-helpers";

  /** The centred hairline between two days of a transcript (`CommsDayDivider`). */
  interface Props {
    /** Any time on the day. */
    at: number;
    /** Today, for "Today" and "Yesterday". */
    now: number;
    class?: string;
  }

  let { at, now, class: className }: Props = $props();
  const label = $derived(formatDayLabel(at, now));
</script>

<div
  data-slot="comms-day-divider"
  role="separator"
  aria-label={label}
  class={cn("flex items-center gap-2 px-3 py-3", className)}
>
  <span aria-hidden="true" class="h-px flex-1 bg-border-subtle"></span>
  <span aria-hidden="true" class="text-2xs font-medium tracking-wide text-disabled uppercase"
    >{label}</span
  >
  <span aria-hidden="true" class="h-px flex-1 bg-border-subtle"></span>
</div>
