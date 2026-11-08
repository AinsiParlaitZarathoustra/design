<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import { CircleCheck, TriangleAlert } from "lucide-svelte";

  /** One do or don't pair cell: the example on the page ground, with its verdict under it. */
  interface Props {
    kind: "do" | "dont";
    children?: Snippet;
  }

  let { kind, children }: Props = $props();
</script>

<figure class="flex min-w-0 flex-1 flex-col overflow-hidden rounded-md border border-border">
  <div class="flex min-h-36 items-center justify-center bg-background p-5">
    {@render children?.()}
  </div>
  <figcaption
    class={cn(
      "label flex items-center gap-1.5 border-t border-border bg-card px-3 py-1.5",
      kind === "do" ? "text-success" : "text-error",
    )}
  >
    <Icon icon={kind === "do" ? CircleCheck : TriangleAlert} size="sm" />
    {kind === "do" ? "Do" : "Don't"}
  </figcaption>
</figure>
