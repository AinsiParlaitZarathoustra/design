<script lang="ts">
  import { initialsOf } from "../../../lib/initials";
  import Avatar, { type AvatarSize } from "./avatar.svelte";
  import AvatarFallback from "./avatar-fallback.svelte";
  import AvatarImage from "./avatar-image.svelte";

  /**
   * Adapter for `PersonAvatar` (`src/components/patterns/person-avatar.tsx`,
   * lot f5): the photo when there is one, the initials when there is not.
   */
  interface Props {
    name: string;
    email?: string;
    image?: string;
    initials?: string;
    size?: AvatarSize;
    class?: string;
  }

  let { name, email, image, initials, size, class: className }: Props = $props();
</script>

<Avatar {size} class={className}>
  {#if image}<AvatarImage src={image} alt="" />{/if}
  <AvatarFallback>{initials ?? initialsOf(name, email)}</AvatarFallback>
</Avatar>
