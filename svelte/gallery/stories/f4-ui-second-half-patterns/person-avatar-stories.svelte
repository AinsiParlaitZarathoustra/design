<script lang="ts">
  import PersonAvatar from "../../../src/lots/f4-ui-second-half-patterns/person-avatar.svelte";
  import type { AvatarSize } from "../../../src/lots/f3-ui-first-half/avatar-context";

  /** A photo as a data URI, so the story never reaches the network. */
  const PHOTO =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#6b7a8f"/><circle cx="20" cy="16" r="7" fill="#d9c7b0"/><rect x="8" y="26" width="24" height="14" rx="7" fill="#d9c7b0"/></svg>`,
    );

  const SIZES: AvatarSize[] = ["xs", "sm", "md", "lg"];

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();
</script>

{#if story === "default"}
  <PersonAvatar name="Maya Chen" email="maya@tryatlas.dev" size="md" />
{:else if story === "with-photo"}
  <PersonAvatar name="Maya Chen" email="maya@tryatlas.dev" size="md" image={PHOTO} />
{:else if story === "error"}
  <PersonAvatar name="Maya Chen" email="maya@tryatlas.dev" size="md" image="/does-not-exist.png" />
{:else if story === "email-only"}
  <PersonAvatar name="" email="sam.okafor@tryatlas.dev" size="md" />
{:else if story === "sizes"}
  <div class="flex items-center gap-2">
    {#each SIZES as size (size)}
      <PersonAvatar name="Maya Chen" email="maya@tryatlas.dev" {size} />
    {/each}
  </div>
{:else if story === "long-text"}
  <PersonAvatar
    name="Maximiliana Wolfeschlegelsteinhausenberger-Okonkwo"
    email="maya@tryatlas.dev"
    size="md"
  />
{/if}
