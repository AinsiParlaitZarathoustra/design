<script lang="ts">
  import { cn } from "../../lib/utils";
  import BrandMarkSvg, { type BrandMarkProps } from "./deps/brand-mark-svg.svelte";

  /**
   * OpenCode's mark: a frame with a block set in its lower half. Drawn on theme
   * tokens, so it takes the right colouring in any theme. Taller than wide: the
   * height is fixed and the width follows (`width` is left unset on purpose).
   */
  let { class: className, ...rest }: BrandMarkProps = $props();
</script>

<BrandMarkSvg defaultTitle="OpenCode" viewBox="0 0 240 300" width={undefined} class={cn("w-auto", className)} {...rest}>
  <path d="M180 240H60V120H180V240Z" class="fill-foreground/25" />
  <path d="M180 60H60V240H180V60ZM240 300H0V0H240V300Z" class="fill-foreground" />
</BrandMarkSvg>
