<script lang="ts">
  import { initialsOf } from "../../../lib/initials";
  import Avatar from "./avatar.svelte";

  /**
   * Local adapter for `PersonAvatar` (`src/components/patterns/person-avatar.tsx`):
   * the person's photo when there is one, their initials when there is not.
   */
  interface Props {
    name: string;
    email?: string;
    /** The photo URL; absent means initials. */
    image?: string;
    /** Fallback initials, when the caller already has them. */
    initials?: string;
    size?: "xs" | "sm" | "md" | "lg";
    class?: string;
  }

  let { name, email, image, initials, size, class: className }: Props = $props();
</script>

<Avatar {size} class={className} src={image}>{initials ?? initialsOf(name, email)}</Avatar>
