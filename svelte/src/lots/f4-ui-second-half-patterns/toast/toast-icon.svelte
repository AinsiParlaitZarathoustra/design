<script lang="ts">
  import { CircleCheck, Info, LoaderCircle, OctagonX, TriangleAlert } from "lucide-svelte";

  /**
   * The toast's glyph, chosen by its type (port of `toast.tsx`'s `ToastIcon`):
   * the tone lives here, on ink, while the surface stays a neutral popover.
   * Nothing is drawn for a toast with no type.
   */
  interface Props {
    type: string | undefined;
  }

  let { type }: Props = $props();
</script>

{#if type === "success"}
  <span
    data-slot="toast-icon"
    class="shrink-0 text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5"
  >
    <CircleCheck class="text-success" aria-hidden="true" />
  </span>
{:else if type === "info"}
  <span
    data-slot="toast-icon"
    class="shrink-0 text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5"
  >
    <Info aria-hidden="true" />
  </span>
{:else if type === "warning"}
  <span
    data-slot="toast-icon"
    class="shrink-0 text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5"
  >
    <TriangleAlert class="text-warning" aria-hidden="true" />
  </span>
{:else if type === "error"}
  <span
    data-slot="toast-icon"
    class="shrink-0 text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5"
  >
    <OctagonX class="text-error" aria-hidden="true" />
  </span>
{:else if type === "loading"}
  <span
    data-slot="toast-icon"
    class="shrink-0 text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5"
  >
    <LoaderCircle class="animate-spin" aria-hidden="true" />
  </span>
{/if}
