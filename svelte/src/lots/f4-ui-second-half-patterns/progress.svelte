<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { setProgressContext, stateAttributes } from "./progress-context";
  import { progressModel, type ProgressTone } from "./progress-model";
  import ProgressIndicator from "./progress-indicator.svelte";
  import ProgressTrack from "./progress-track.svelte";

  /**
   * A determinate or indeterminate bar. The root draws its children, then the
   * track with its indicator, as the React `Progress` does. `value={null}` is
   * Base UI's indeterminate state.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children" | "role"> {
    value: number | null | undefined;
    min?: number;
    max?: number;
    locale?: string | string[];
    format?: Intl.NumberFormatOptions;
    getAriaValueText?: (formattedValue: string, value: number | null | undefined) => string;
    tone?: ProgressTone;
    class?: string;
    children?: Snippet;
  }

  let {
    value,
    min = 0,
    max = 100,
    locale,
    format,
    getAriaValueText,
    tone = "default",
    class: className,
    children,
    ...rest
  }: Props = $props();

  const model = $derived(progressModel(value, min, max, format, locale));
  const label = $state<{ id: string | undefined }>({ id: undefined });

  setProgressContext({
    get status() {
      return model.status;
    },
    get percentageValue() {
      return model.percentageValue;
    },
    get formattedValue() {
      return model.formattedValue;
    },
    get value() {
      return value;
    },
    get label() {
      return label;
    },
  });
</script>

<div
  data-slot="progress"
  role="progressbar"
  aria-labelledby={label.id}
  aria-valuemax={max}
  aria-valuemin={min}
  aria-valuenow={model.clampedValue ?? undefined}
  aria-valuetext={getAriaValueText
    ? getAriaValueText(model.formattedValue, value)
    : model.defaultAriaValueText}
  {...stateAttributes(model.status)}
  {...rest}
  class={cn("flex flex-wrap gap-3", className)}
>
  {@render children?.()}
  <ProgressTrack>
    <ProgressIndicator {tone} />
  </ProgressTrack>
  <span
    role="presentation"
    style="clip-path: inset(50%); overflow: hidden; white-space: nowrap; border: 0; padding: 0; width: 1px; height: 1px; margin: -1px; position: fixed; top: 0; left: 0;"
    >x</span
  >
</div>
