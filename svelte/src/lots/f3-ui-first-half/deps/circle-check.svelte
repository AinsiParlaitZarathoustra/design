<script lang="ts">
  import { Icon as LucideBase } from "lucide-svelte";

  /**
   * The `circle-check` glyph as the React source draws it (lucide-react 1.67,
   * where `CheckCircle2Icon` is an alias of it). lucide-svelte 1.0.1 ships an
   * older geometry for the same name, so the node is carried here.
   */
  const iconNode: [string, Record<string, string>][] = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m16 9-5.5 5.5L8 12" }],
  ];

  let props: Record<string, unknown> = $props();
</script>

<LucideBase name="circle-check" {iconNode} {...props} />
