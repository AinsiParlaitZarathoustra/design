<script lang="ts">
  import { ChevronRight } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Icon from "../../ui/icon.svelte";

  /** The chevron on a row that drills into a submenu. */
  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props();
</script>

<Icon icon={ChevronRight} size="lg" class={cn("-me-0.5 ms-auto text-muted-foreground", className)} />
