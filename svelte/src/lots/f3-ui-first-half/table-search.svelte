<script lang="ts">
  import { SearchIcon } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Icon from "../../ui/icon.svelte";

  /** The toolbar search: a recessed well, with the magnifier inside its left edge. */
  interface Props {
    value?: string;
    class?: string;
    [attribute: string]: unknown;
  }

  let { value = $bindable(""), class: className, ...rest }: Props = $props();
</script>

<div class={cn("relative", className)}>
  <Icon
    icon={SearchIcon}
    size="xs"
    class="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground"
  />
  <input
    type="search"
    bind:value
    class="h-control-md w-50 rounded-md border border-border bg-background pr-2 pl-6 text-xs text-foreground outline-none focus-ring-none placeholder:text-muted-foreground focus:border-border-strong"
    {...rest}
  />
</div>
