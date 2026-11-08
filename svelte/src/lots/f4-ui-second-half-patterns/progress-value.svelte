<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { getProgressContext, stateAttributes } from "./progress-context";

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    class?: string;
  }

  let { class: className, ...rest }: Props = $props();
  const progress = getProgressContext();
</script>

<span
  aria-hidden="true"
  data-slot="progress-value"
  {...stateAttributes(progress.status)}
  {...rest}
  class={cn("ml-auto text-xs text-muted-foreground tabular-nums", className)}
>
  {progress.status === "indeterminate" ? "" : progress.formattedValue}
</span>
