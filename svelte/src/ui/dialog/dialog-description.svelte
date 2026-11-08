<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import { getDialog } from "./context";

  interface Props extends Omit<HTMLAttributes<HTMLParagraphElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
  const api = getDialog();
  $effect(() => api.registerDescription());
</script>

<p
  data-slot="dialog-description"
  id={api.descriptionId}
  class={cn("body text-secondary-foreground", className)}
  {...rest}
>
  {@render children?.()}
</p>
