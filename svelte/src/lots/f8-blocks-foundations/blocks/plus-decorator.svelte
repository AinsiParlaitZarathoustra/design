<script lang="ts" module>
  export type PlusCorner = "tl" | "tr" | "bl" | "br";
</script>

<script lang="ts">
  import { cn } from "../../../lib/utils";

  /**
   * A corner cross-hair.
   *
   * Eight lines and no dependencies, and it is what makes a bordered panel
   * read as a technical drawing rather than a card. Place one at each corner
   * of a container; the `corner` prop nudges it onto the border by half a
   * pixel so the crossing sits exactly on the line.
   */
  interface Props {
    corner?: PlusCorner;
    class?: string;
  }

  let { corner = "tl", class: className }: Props = $props();
</script>

<div
  aria-hidden="true"
  data-slot="plus-decorator"
  class={cn(
    "pointer-events-none absolute size-3 mask-radial-from-15%",
    "before:absolute before:inset-0 before:m-auto before:h-px before:bg-foreground/25",
    "after:absolute after:inset-0 after:m-auto after:w-px after:bg-foreground/25",
    corner === "tl" && "top-0 left-0 -translate-x-[calc(50%-0.5px)] -translate-y-[calc(50%-0.5px)]",
    corner === "tr" && "top-0 right-0 translate-x-[calc(50%-0.5px)] -translate-y-[calc(50%-0.5px)]",
    corner === "bl" && "bottom-0 left-0 -translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]",
    corner === "br" && "right-0 bottom-0 translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]",
    className,
  )}
></div>
