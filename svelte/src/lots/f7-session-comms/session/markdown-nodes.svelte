<script lang="ts">
  import type { HastChild, HastProperties } from "./markdown-tree";

  /**
   * Draws a hast tree from `markdown-tree.ts` as elements. This is the part of
   * react-markdown that turns a tree into output; here it is a recursive Svelte
   * component, so no React renderer is needed.
   */
  interface Props {
    nodes: HastChild[];
  }

  let { nodes }: Props = $props();

  /** A hast property as an HTML attribute: `className` is `class`, `tabIndex` is `tabindex`. */
  function attributes(properties: HastProperties): Record<string, string | true> {
    const out: Record<string, string | true> = {};
    for (const [key, value] of Object.entries(properties)) {
      if (value === false || value === undefined) continue;
      const name = key === "className" ? "class" : key === "tabIndex" ? "tabindex" : key;
      out[name] = value === true ? true : Array.isArray(value) ? value.join(" ") : String(value);
    }
    return out;
  }
</script>

{#each nodes as node, index (index)}
  {#if node.type === "text"}{node.value}{:else}<svelte:element this={node.tagName} {...attributes(node.properties)}>{#if node.children.length > 0}<MarkdownNodes nodes={node.children} />{/if}</svelte:element>{/if}
{/each}
