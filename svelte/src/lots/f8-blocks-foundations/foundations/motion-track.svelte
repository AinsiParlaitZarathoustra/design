<script lang="ts">
  import { cn } from "../../../lib/utils";

  /** A dot that crosses its track when `on` flips. */
  interface Props {
    on: boolean;
    class: string;
  }

  let { on, class: className }: Props = $props();
</script>

<div class="relative h-control-sm w-48 rounded-full bg-muted">
  <span
    class={cn(
      "absolute top-1 left-1 size-4 rounded-full bg-primary transition-transform",
      on && "translate-x-[10.5rem]",
      className,
    )}
  ></span>
</div>
