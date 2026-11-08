<script lang="ts">
  import { MousePointer2Icon } from "lucide-svelte";
  import { PEER_INK } from "../../../lib/actor-hue";
  import type { LabelTone } from "../../../lib/types";
  import { cn } from "../../../lib/utils";

  /**
   * A collaborator's cursor: the arrow in their hue, and their first name on a
   * label of the same hue. Static on purpose: an app eases the position by
   * writing `style` (a `translate3d`) through `ref`, with no re-render per frame.
   */
  interface Props {
    name: string;
    hue: LabelTone;
    ref?: HTMLDivElement | null;
    style?: string;
    class?: string;
  }

  let { name, hue, ref = $bindable(null), style, class: className }: Props = $props();

  // The node reaches `ref` through an attachment, so the parent can drive the
  // position without a render per frame, as the React ref does.
  const attach = (node: HTMLDivElement) => {
    ref = node;
    return () => {
      ref = null;
    };
  };

  const first = $derived(name.trim().split(/\s+/)[0] || name);
</script>

<div
  {@attach attach}
  data-slot="presence-cursor"
  class={cn("pointer-events-none absolute top-0 left-0", className)}
  {style}
>
  <MousePointer2Icon
    aria-hidden="true"
    class={cn("size-4", PEER_INK[hue].text)}
    fill="currentColor"
    strokeWidth={1.5}
  />
  <span
    class={cn(
      "mt-0.5 ml-3 block max-w-36 truncate rounded-full px-1.5 py-0.5",
      "text-3xs leading-none font-medium text-background",
      PEER_INK[hue].bg,
    )}
  >
    {first}
  </span>
</div>
