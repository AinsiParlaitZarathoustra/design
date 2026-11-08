<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../../lib/utils";

  interface Props extends Omit<HTMLAttributes<HTMLElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<caption data-slot="table-caption" {...rest} class={cn("mt-3 caption", className)}>
  {@render children?.()}
</caption>
