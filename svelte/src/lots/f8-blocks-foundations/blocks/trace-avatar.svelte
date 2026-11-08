<script lang="ts" module>
  import type { LabelTone } from "../../../lib/types";

  /**
   * The tint per identity hue: the hue at 28% under the foreground ink. Hue
   * ink on its own tint falls under 4.5:1 in the light themes (yellow is
   * 3.3:1), so the initials are foreground ink, not the hue.
   */
  const FACE_TINT: Record<LabelTone, string> = {
    grey: "bg-hue-grey/28 text-foreground",
    red: "bg-hue-red/28 text-foreground",
    orange: "bg-hue-orange/28 text-foreground",
    yellow: "bg-hue-yellow/28 text-foreground",
    green: "bg-hue-green/28 text-foreground",
    cyan: "bg-hue-cyan/28 text-foreground",
    blue: "bg-hue-blue/28 text-foreground",
    purple: "bg-hue-purple/28 text-foreground",
    pink: "bg-hue-pink/28 text-foreground",
  };
</script>

<script lang="ts">
  import Avatar from "../../f3-ui-first-half/avatar.svelte";
  import AvatarImage from "../../f3-ui-first-half/avatar-image.svelte";
  import AvatarFallback from "../../f3-ui-first-half/avatar-fallback.svelte";
  import { actorHue } from "../../../lib/actor-hue";
  import { initialsOf } from "../../../lib/initials";
  import type { TraceAuthor } from "./checkpoint-trace-model";

  /**
   * The trace's default face: the photo, else initials in the person's own
   * hue. Ported from `TraceAvatar` in `checkpoint-trace.tsx`.
   *
   * `Avatar`'s own fallback is deliberately grey (a members table in eight
   * colours reads as eight categories). The trace is the other case: the
   * colour is the person, it matches the author rail under a bar, and it is
   * what lets you follow one person down a column of lanes without reading.
   *
   * The size is set in px, so it is exactly what the layout measured; `size`
   * only picks the initials' type step (10px from 22px up, 9px under).
   * Initials are `author.initials` when set, else drawn from the name.
   *
   * Exported so a host's `renderAvatar` can wrap it (a hover card, a link)
   * rather than redraw it.
   */
  interface Props {
    author: TraceAuthor;
    size: number;
  }

  let { author, size }: Props = $props();

  const sizeName = $derived(size >= 22 ? "md" : "xs");
  const tint = $derived(FACE_TINT[actorHue(author)]);
</script>

<Avatar size={sizeName} style="width: {size}px; height: {size}px;">
  {#if author.avatarUrl}
    <AvatarImage src={author.avatarUrl} alt="" />
  {/if}
  <AvatarFallback class={tint}>
    {author.initials?.trim() || initialsOf(author.name)}
  </AvatarFallback>
</Avatar>
