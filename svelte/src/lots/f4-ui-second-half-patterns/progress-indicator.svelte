<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { getProgressContext, stateAttributes } from "./progress-context";
  import { TONE_CLASS, type ProgressTone } from "./progress-model";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    tone?: ProgressTone;
  }

  let { class: className, tone = "default", ...rest }: Props = $props();
  const progress = getProgressContext();

  // Indeterminate: no inline width, so the bar keeps its base layout.
  const indicatorStyle = $derived(
    progress.percentageValue == null
      ? undefined
      : `inset-inline-start: 0; height: inherit; width: ${progress.percentageValue}%;`,
  );
</script>

<div
  data-slot="progress-indicator"
  data-tone={tone === "default" ? undefined : tone}
  {...stateAttributes(progress.status)}
  style={indicatorStyle}
  {...rest}
  class={cn(
    "h-full bg-primary transition-[width] duration-base ease-out-strong",
    TONE_CLASS[tone],
    className,
  )}
></div>
