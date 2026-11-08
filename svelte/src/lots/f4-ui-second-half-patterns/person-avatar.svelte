<script lang="ts">
  import Avatar from "../f3-ui-first-half/avatar.svelte";
  import AvatarFallback from "../f3-ui-first-half/avatar-fallback.svelte";
  import AvatarImage from "../f3-ui-first-half/avatar-image.svelte";
  import type { AvatarSize } from "../f3-ui-first-half/avatar-context";
  import { initialsOf } from "../../lib/initials";

  /**
   * A person's avatar, ported from
   * `src/components/patterns/person-avatar.tsx`: their photo when there is one,
   * their initials when there is not (or while it loads).
   *
   * Every screen that shows a person goes through this, so a face is the same
   * face everywhere. Pass the user's `image` (better-auth's `user.image`).
   */
  interface Props {
    name: string;
    email?: string;
    /** The photo URL; absent means initials. */
    image?: string;
    /** Fallback initials, when the caller already has them. */
    initials?: string;
    size?: AvatarSize;
    class?: string;
  }

  let { name, email, image, initials, size, class: className }: Props = $props();
</script>

<Avatar {size} class={className}>
  {#if image}
    <AvatarImage src={image} alt="" />
  {/if}
  <AvatarFallback>{initials ?? initialsOf(name, email)}</AvatarFallback>
</Avatar>
