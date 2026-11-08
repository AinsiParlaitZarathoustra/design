<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import type { VariantProps } from "class-variance-authority";
  import { cn } from "../../lib/utils";
  import { linkVariants } from "./text-link-variants";

  /**
   * A standalone text link: no underline at rest, underlined on hover and on
   * keyboard focus. It renders a plain `<a href>`: the Svelte port has no link
   * provider (the React `LinkProvider` is the app's router hook-up).
   */
  interface Props extends Omit<HTMLAnchorAttributes, "class" | "children"> {
    href: string;
    tone?: VariantProps<typeof linkVariants>["tone"];
    class?: string;
    children?: Snippet;
  }

  let { tone, class: className, children, ...rest }: Props = $props();
</script>

<a data-slot="text-link" {...rest} class={cn(linkVariants({ tone }), className)}>
  {@render children?.()}
</a>
