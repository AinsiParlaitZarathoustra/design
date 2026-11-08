<script lang="ts">
  import type { Snippet } from "svelte";
  import DashedRails from "../../f8-blocks-foundations/blocks/dashed-rails.svelte";
  import Globe from "../../f8-blocks-foundations/blocks/globe.svelte";
  import PlusCorners from "../../f8-blocks-foundations/blocks/plus-corners.svelte";

  /**
   * The two-pane authentication layout. Left is the form and nothing else: a
   * single measured column, vertically centred, with a way back at the top.
   * Right is atmosphere and proof: a draggable globe, one line of copy and the
   * logo cloud anchored to the bottom. It collapses below `lg`. Ported from
   * `AuthSplit` in `src/components/shell/auth-split.tsx`.
   */
  interface Props {
    children: Snippet;
    /** The escape hatch, top-left of the form column. */
    back?: Snippet;
    /** Atmosphere copy, bottom of the aside. */
    aside: Snippet;
    /** Social proof, below the copy. */
    proof?: Snippet;
  }

  let { children, back, aside, proof }: Props = $props();
</script>

<div class="flex h-svh overflow-hidden bg-background">
  <div class="relative flex min-w-0 flex-1 flex-col px-6 py-8">
    <DashedRails fade />
    <div class="flex h-8 shrink-0 items-center">{@render back?.()}</div>

    <div class="flex w-full flex-1 items-center justify-center">
      <!-- The form sits in a dashed drafting box with cross-hair corners, the bento frame at sign-in scale. -->
      <div class="relative flex w-full max-w-88 flex-col gap-6 border border-dashed border-border px-8 py-10">
        <PlusCorners />
        {@render children()}
      </div>
    </div>

    <!-- Balances the back-link strip so the form sits on the true optical centre rather than 16px below it. -->
    <div aria-hidden="true" class="h-8 shrink-0"></div>
  </div>

  <aside
    class="relative hidden w-1/2 shrink-0 overflow-hidden border-l border-border-subtle bg-panel lg:block"
  >
    <!-- Oversized and offset past the corner, so only the northern hemisphere shows and it reads as a horizon. -->
    <Globe class="absolute -top-[28%] -right-[30%] w-[120%]" />

    <!-- Click-through, so the globe stays draggable everywhere but the copy and the logos. -->
    <div class="pointer-events-none absolute inset-0 flex flex-col justify-end p-10">
      <div class="pointer-events-auto flex flex-col gap-8">
        <div class="flex flex-col gap-2">{@render aside()}</div>
        {@render proof?.()}
      </div>
    </div>
  </aside>
</div>
