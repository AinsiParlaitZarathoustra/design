<script module lang="ts">
  /**
   * `theme` (the default) inks the tile with the theme: dark on a light theme,
   * light on a dark one. `app-icon` is the app icon's tile, black with a white
   * mark in every theme, as desktop drew it from 32px up.
   */
  export type AtlasBadgeTone = "theme" | "app-icon";
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../lib/utils";
  import AtlasMark from "./atlas-mark.svelte";

  /**
   * The mark in its rounded container, as it appears above an auth form.
   * Where the badge stands for the app itself (a welcome screen, an about
   * box), `tone="app-icon"` makes it look like the icon in the Dock.
   */
  interface Props extends HTMLAttributes<HTMLDivElement> {
    tone?: AtlasBadgeTone;
    class?: string;
  }

  let { tone = "theme", class: className, ...rest }: Props = $props();
</script>

<div
  data-tone={tone === "theme" ? undefined : tone}
  class={cn(
    "flex size-8 items-center justify-center rounded-lg bg-foreground text-background",
    // ratchet-allow: the app icon's tile is black and its mark white in
    // every theme; it is the icon in the Dock, not a themed surface.
    tone === "app-icon" && "bg-black text-white",
    className,
  )}
  {...rest}
>
  <AtlasMark class="size-4" />
</div>
