<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";

  /**
   * Multi-line text, ported from `Textarea` in `src/components/ui/textarea.tsx`.
   * The same border and focus language as `Input`; it grows with its content
   * from a 4rem floor. `defaultValue` seeds the text once, as React's does.
   */
  interface Props extends Omit<HTMLTextareaAttributes, "class"> {
    class?: string;
    value?: string;
    defaultValue?: string;
  }

  let { class: className, value = $bindable(undefined), defaultValue, ...rest }: Props = $props();

  function seed(node: HTMLTextAreaElement, initial: string | undefined) {
    if (initial !== undefined && value === undefined) node.value = initial;
    return {
      update(next: string | undefined) {
        if (next !== undefined) node.value = next;
      },
    };
  }
</script>

<textarea
  data-slot="textarea"
  bind:value
  use:seed={defaultValue}
  {...rest}
  class={cn(
    "w-full min-w-0 rounded border border-border bg-panel-input px-2 py-1.5 text-xs text-foreground",
    "field-sizing-content min-h-16",
    "transition-colors duration-fast ease-out-strong",
    "placeholder:text-muted-foreground",
    "focus:border-border-strong",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-destructive",
    className,
  )}
></textarea>
