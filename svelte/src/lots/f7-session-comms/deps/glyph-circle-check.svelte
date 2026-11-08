<script lang="ts">
  import LucideGlyph from "./lucide-glyph.svelte";

  /** `CheckCircle2Icon` as lucide-react 1.67 draws it (lucide-svelte's `circle-check` differs). */
  const NODE: [string, Record<string, string>][] = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m16 9-5.5 5.5L8 12" }],
  ];

  let props = $props();
</script>

<LucideGlyph node={NODE} {...props} />
