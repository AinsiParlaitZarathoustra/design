<script lang="ts">
  import { MoreHorizontalIcon } from "lucide-svelte";
  import { cn } from "../../lib/utils";

  /** Stands in for the middle of a long trail. */
  interface Props {
    class?: string;
    [attribute: string]: unknown;
  }

  let { class: className, ...rest }: Props = $props();
</script>

<span
  data-slot="breadcrumb-ellipsis"
  role="presentation"
  aria-hidden="true"
  class={cn("flex size-4 items-center justify-center [&>svg]:size-3.5", className)}
  {...rest}
>
  <MoreHorizontalIcon />
  <span class="sr-only">More</span>
</span>
