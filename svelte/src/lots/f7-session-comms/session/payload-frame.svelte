<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import { FileCodeCorner } from "lucide-svelte";

  /** The bordered mono box every payload sits in, with its header (`Frame`). */
  interface Props {
    label: string;
    icon?: any;
    aside?: Snippet;
    terminal?: boolean;
    children: Snippet;
  }

  let { label, icon = FileCodeCorner, aside, terminal = false, children }: Props = $props();
</script>

<div
  class={cn(
    "overflow-hidden rounded-lg border border-border-subtle",
    terminal ? "bg-(--terminal-background) text-(--terminal-foreground)" : "bg-card",
  )}
>
  <div class="flex items-center gap-2 border-b border-border-subtle px-3 py-1.5">
    <Icon {icon} size="sm" class="shrink-0 opacity-70" />
    <span
      class={cn(
        "min-w-0 flex-1 truncate font-mono text-xs",
        !terminal && "text-secondary-foreground",
      )}
    >
      {label}
    </span>
    {@render aside?.()}
  </div>
  {@render children()}
</div>
