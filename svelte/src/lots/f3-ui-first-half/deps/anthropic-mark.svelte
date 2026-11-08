<script lang="ts">
  import BrandMarkSvg, { type BrandMarkProps } from "./brand-mark-svg.svelte";

  /**
   * Anthropic's mark, drawn in `currentColor`. Local adapter of the React
   * `AnthropicMark` (`provider-marks.tsx`, lot f4), which this lot needs for the
   * empty state's custom-icon story. The f4 lot owns the canonical file.
   */
  let props: BrandMarkProps = $props();
</script>

<BrandMarkSvg defaultTitle="Anthropic" fill="currentColor" fill-rule="evenodd" {...props}>
  <path
    d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z"
  />
</BrandMarkSvg>
