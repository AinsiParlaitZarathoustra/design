<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * The two-letter mark of a workspace. Ported from `OrgMark` in
   * `src/components/shell/org-switcher.tsx`.
   */
  interface Props {
    initials: string;
    class?: string;
  }

  let { initials, class: className }: Props = $props();
</script>

<span
  aria-hidden="true"
  class={cn(
    "flex size-5 shrink-0 items-center justify-center rounded-sm",
    "bg-(--element-emphasis) text-3xs font-semibold text-foreground",
    className,
  )}
>
  {initials}
</span>
