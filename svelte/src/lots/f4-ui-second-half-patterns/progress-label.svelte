<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { getProgressContext, stateAttributes } from "./progress-context";

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> {
    class?: string;
    id?: string;
    children?: Snippet;
  }

  let { class: className, id: idProp, children, ...rest }: Props = $props();
  const progress = getProgressContext();
  const generatedId = $props.id();
  const id = $derived(idProp ?? generatedId);

  // The root names itself after this label (`aria-labelledby`) while it is mounted.
  $effect(() => {
    progress.label.id = id;
    return () => {
      progress.label.id = undefined;
    };
  });
</script>

<span
  {id}
  role="presentation"
  data-slot="progress-label"
  {...stateAttributes(progress.status)}
  {...rest}
  class={cn("text-xs font-medium", className)}
>
  {@render children?.()}
</span>
