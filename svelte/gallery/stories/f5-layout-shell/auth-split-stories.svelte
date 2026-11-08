<script lang="ts">
  import { ArrowLeft, Loader2 } from "lucide-svelte";
  import {
    ClaudeMark,
    GeminiMark,
    GitHubMark,
    GoogleMark,
    OpenAIMark,
  } from "../../../src/lots/f3-ui-first-half/index";
  import LogoMarquee from "../../../src/lots/f8-blocks-foundations/blocks/logo-marquee.svelte";
  import type { Logo } from "../../../src/lots/f8-blocks-foundations/blocks/logo-marquee.svelte";
  import AuthAsideCopy from "../../../src/lots/f5-layout-shell/shell/auth-aside-copy.svelte";
  import AuthAsideNote from "../../../src/lots/f5-layout-shell/shell/auth-aside-note.svelte";
  import AuthSplit from "../../../src/lots/f5-layout-shell/shell/auth-split.svelte";
  import { buttonVariants } from "../../../src/ui/button-variants";
  import Button from "../../../src/ui/button.svelte";
  import Icon from "../../../src/ui/icon.svelte";
  import Fullscreen from "./fullscreen.svelte";

  /**
   * The two-pane sign-in layout, ported from
   * `stories/components/shell/auth-split.stories.tsx`. `story` names the scenario.
   */
  interface Props {
    story: string;
  }

  let { story }: Props = $props();

  const long = $derived(story === "long-text");
  const loading = $derived(story === "loading");
  const error = $derived(
    story === "error"
      ? "GitHub did not return an email address. Make one public and try again."
      : undefined,
  );
  const showProof = $derived(story !== "without-proof");
  const heading = $derived(
    long
      ? "Sign in to the Infrastructure and Developer Productivity Working Group"
      : "Sign in to Atlas",
  );
  const copy = $derived(
    long
      ? "See what every agent on your team is doing, while it is doing it, across every project, branch and pull request you care about."
      : "See what every agent on your team is doing, while it is doing it.",
  );
  const note = $derived(
    long
      ? "Sessions, diffs, costs, checkpoints, memory and review threads in one place, for every agent you already use, on every machine your team works from."
      : "Sessions, diffs and costs in one place, for every agent you already use.",
  );

  // The company's marks, as the source's `LOGOS`. Snippets with no state of their own.
  const LOGOS: Logo[] = [
    { name: "Claude", mark: claudeMark },
    { name: "OpenAI", mark: openaiMark },
    { name: "Gemini", mark: geminiMark },
    { name: "GitHub", mark: githubMark },
  ];
</script>

{#snippet claudeMark()}
  <ClaudeMark class="size-5" />
{/snippet}

{#snippet openaiMark()}
  <OpenAIMark class="size-5" />
{/snippet}

{#snippet geminiMark()}
  <GeminiMark class="size-5" />
{/snippet}

{#snippet githubMark()}
  <GitHubMark class="size-5" />
{/snippet}

<Fullscreen>
  <AuthSplit>
    {#snippet back()}
      <a href="#back" data-slot="button" class={buttonVariants({ variant: "ghost", size: "sm" })}>
        <Icon icon={ArrowLeft} size="sm" />
        Back
      </a>
    {/snippet}

    {#snippet aside()}
      <AuthAsideCopy>{copy}</AuthAsideCopy>
      <AuthAsideNote>{note}</AuthAsideNote>
    {/snippet}

    {#snippet proof()}
      {#if showProof}
        <LogoMarquee logos={LOGOS} label="Works with the agents you use" />
      {/if}
    {/snippet}

    <div class="flex flex-col gap-1">
      <h1 class="text-lg font-semibold">{heading}</h1>
      <p class="caption">Use the account your team signs in with.</p>
    </div>
    <div class="flex flex-col gap-2">
      <Button variant="outline" size="lg" disabled={loading}>
        {#if loading}
          <Icon icon={Loader2} size="sm" class="animate-spin" />
        {:else}
          <GitHubMark class="size-3.5" />
        {/if}
        Continue with GitHub
      </Button>
      <Button variant="outline" size="lg" disabled={loading}>
        <GoogleMark class="size-3.5" />
        Continue with Google
      </Button>
      {#if error}
        <p class="caption text-error">{error}</p>
      {/if}
    </div>
  </AuthSplit>
</Fullscreen>
