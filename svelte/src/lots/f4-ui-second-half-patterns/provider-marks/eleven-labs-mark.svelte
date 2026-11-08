<script lang="ts">
  import BrandMarkSvg from "../deps/brand-mark-svg.svelte";
  import type { BrandMarkProps } from "../deps/brand-mark-types";

  let { ...rest }: BrandMarkProps = $props();
</script>

<BrandMarkSvg defaultTitle="ElevenLabs" fill="currentColor" fill-rule="evenodd" {...rest}>
  <path d="M5 0h5v24H5V0zM14 0h5v24h-5V0z" />
</BrandMarkSvg>
