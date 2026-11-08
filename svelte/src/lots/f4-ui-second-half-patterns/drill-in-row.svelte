<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { ChevronRightIcon } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Icon from "../../ui/icon.svelte";

  /**
   * A row that navigates rather than sets. The whole row is the target, so the
   * chevron is decoration, never the only thing that is clickable.
   */
  interface Props extends Omit<HTMLButtonAttributes, "class" | "children" | "value"> {
    class?: string;
    label: string;
    description?: string;
    /** A Lucide Svelte component, as `Icon` takes it. */
    icon?: any;
    value?: string;
  }

  let { class: className, label, description, icon, value, ...rest }: Props = $props();
</script>

<button
  type="button"
  data-slot="drill-in-row"
  {...rest}
  class={cn(
    "flex min-h-9 w-full items-center gap-3 px-3 py-2 text-left",
    "transition-colors duration-fast ease-out-strong hover:bg-element-hover",
    // The same disabled look as `Button`: dimmed, and no hover to promise a click that will not land.
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
    className,
  )}
>
  {#if icon}
    <Icon {icon} size="sm" class="text-muted-foreground" />
  {/if}
  <div class="flex min-w-0 flex-1 flex-col gap-0.5">
    <span class="label">{label}</span>
    {#if description}
      <span class="caption">{description}</span>
    {/if}
  </div>
  {#if value}
    <span class="shrink-0 caption">{value}</span>
  {/if}
  <Icon icon={ChevronRightIcon} size="sm" class="shrink-0 text-muted-foreground" />
</button>
