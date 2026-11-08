<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import Icon from "../../ui/icon.svelte";

  /**
   * One row of a `SettingCard`: a label, an optional description, and exactly one
   * control hard-right. Rows are `min-h`, and a narrow row wraps the control under
   * its label rather than crushing it.
   */
  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> {
    class?: string;
    label: string;
    description?: string;
    /** The control. Goes hard-right, vertically centred against the label. */
    control?: Snippet;
    /** A Lucide Svelte component, as `Icon` takes it. */
    icon?: any;
    children?: Snippet;
  }

  let { class: className, label, description, control, icon, children, ...rest }: Props = $props();
</script>

<div
  data-slot="setting-row"
  {...rest}
  class={cn("flex min-h-9 flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2", className)}
>
  {#if icon}
    <Icon {icon} size="sm" class="text-muted-foreground" />
  {/if}
  <div class="flex min-w-0 flex-1 basis-48 flex-col gap-0.5">
    <span class="label">{label}</span>
    {#if description}
      <span class="caption">{description}</span>
    {/if}
  </div>
  {#if control}
    <div class="shrink-0">{@render control()}</div>
  {/if}
  {@render children?.()}
</div>
