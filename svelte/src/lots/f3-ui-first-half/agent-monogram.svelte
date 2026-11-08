<script lang="ts">
  import { cn } from "../../lib/utils";
  import { monogramTextClass } from "./agent-icon";

  /**
   * The last-resort agent glyph: the label's initial, for an agent with no
   * icon. Decorative: the caller shows the agent's name as text.
   */
  interface Props {
    label: string;
    size?: number;
    class?: string;
  }

  let { label, size = 14, class: className }: Props = $props();

  const initial = $derived(([...label.trim()][0] ?? "?").toUpperCase());
</script>

<span
  aria-hidden="true"
  class={cn("font-mono font-semibold leading-none", monogramTextClass(size), className)}>{initial}</span
>
