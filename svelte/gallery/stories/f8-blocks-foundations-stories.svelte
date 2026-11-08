<script lang="ts">
  import PlusDecorator from "../../src/lots/f8-blocks-foundations/blocks/plus-decorator.svelte";
  import PlusCorners from "../../src/lots/f8-blocks-foundations/blocks/plus-corners.svelte";
  import DashedRails from "../../src/lots/f8-blocks-foundations/blocks/dashed-rails.svelte";
  import GhostCards from "../../src/lots/f8-blocks-foundations/blocks/ghost-cards.svelte";
  import GradualBlur from "../../src/lots/f8-blocks-foundations/blocks/gradual-blur.svelte";
  import InfiniteSlider from "../../src/lots/f8-blocks-foundations/blocks/infinite-slider.svelte";
  import LogoMarquee, { type Logo } from "../../src/lots/f8-blocks-foundations/blocks/logo-marquee.svelte";
  import { createRawSnippet } from "svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const NAMES = ["Claude", "Codex", "Gemini", "OpenCode", "Cursor", "Goose", "Amp", "Aider"];
  const CHIP_NAMES_MANY = [...NAMES, ...NAMES].map((n, i) => `${n} ${i + 1}`);

  const WORDMARKS = ["Northwind", "Globex", "Initech", "Umbrella", "Hooli", "Stark"];
  const MANY_WORDMARKS = [
    ...WORDMARKS,
    "Acme",
    "Soylent",
    "Tyrell",
    "Wonka",
    "Wayne",
  ];

  const LINES = Array.from(
    { length: 24 },
    (_, i) =>
      [
        "Read src/features/settings/components/settings-panel.tsx",
        "The panel renders its rows by hand; moving them onto SettingCard keeps one right edge.",
        "Edited settings-panel.tsx (+84 −61)",
        "Ran bun run typecheck: no errors",
      ][i % 4]!,
  );

  // A wordmark drawn in the ink, as a customer's monochrome logo would be.
  const wordmarkLogos = (names: string[]): Logo[] =>
    names.map((name) => ({
      name,
      mark: createRawSnippet(() => ({
        render: () => `<span class="text-lg font-semibold">${name}</span>`,
      })),
    }));
</script>

{#snippet chip(name: string)}
  <span class="label inline-flex h-control-lg items-center rounded-md border border-border bg-card px-3 whitespace-nowrap">
    {name}
  </span>
{/snippet}

{#snippet sessionCard(title: string, meta: string)}
  <div class="flex flex-col gap-1 rounded-xl border border-border bg-card p-4">
    <span class="label">{title}</span>
    <span class="caption">{meta}</span>
    <div class="mt-3 flex flex-col gap-1.5">
      <div class="h-2 w-3/4 rounded-full bg-muted"></div>
      <div class="h-2 w-1/2 rounded-full bg-muted"></div>
    </div>
  </div>
{/snippet}

{#if story === "plus-default"}
  <div class="p-6">
    <div class="relative flex h-40 w-72 items-center justify-center border border-border">
      <PlusDecorator corner="tl" />
      <span class="caption">corner: tl</span>
    </div>
  </div>
{:else if story === "plus-all-corners"}
  <div class="p-6">
    <div class="relative flex h-40 w-72 flex-col items-center justify-center gap-1 border border-border">
      <PlusCorners />
      <span class="eyebrow">Checkpoint 3</span>
      <span class="label">12 files changed</span>
    </div>
  </div>
{:else if story.startsWith("dashed-rails")}
  <!-- The source story is `layout: fullscreen`: it sits edge to edge, so the
       gallery's body padding is cancelled here. -->
  <div class="-m-4">
    <section class="relative flex h-72 flex-col items-center justify-center gap-1 border-y border-border-subtle">
      <DashedRails
        fade={story === "dashed-rails-faded"}
        offset={story === "dashed-rails-fixed-offset" ? "2rem" : undefined}
      />
      <span class="eyebrow">Section</span>
      <span class="text-lg font-semibold">Every session, on one board</span>
      <span class="caption">The rails sit in the gutter at every width.</span>
    </section>
  </div>
{:else if story === "ghost-default"}
  <div class="w-96 p-6">
    <GhostCards>
      {@render sessionCard("Refactor the settings panel", "atlas · Maya Chen · 2h ago")}
    </GhostCards>
  </div>
{:else if story === "ghost-long-text"}
  <div class="w-96 p-6">
    <GhostCards>
      {@render sessionCard(
        "Rewrite the session sidebar so pinned, unread and snoozed sessions sort into one flat list with a project filter",
        "atlas-desktop · Maximiliana Wolfeschlegelsteinhausenberger · 2h ago",
      )}
    </GhostCards>
  </div>
{:else if story.startsWith("gradual-blur")}
  <div class="relative h-64 w-120 overflow-hidden rounded-lg border border-border bg-background">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <!-- A scrollable region is focusable by keyboard, as in the source. -->
    <div role="region" aria-label="Article" tabindex="0" class="h-full overflow-y-auto">
      <div class="flex flex-col gap-2 p-4">
        {#each LINES as line, i (i)}
          <p class="body">{line}</p>
        {/each}
      </div>
    </div>
    <GradualBlur
      position={story === "gradual-blur-top" ? "top" : "bottom"}
      height="5rem"
      strength={2}
      layers={story === "gradual-blur-off" ? 0 : 5}
      curve="bezier"
      exponential={true}
      tint={story === "gradual-blur-tinted" ? "var(--background)" : undefined}
    />
  </div>
{:else if story.startsWith("infinite-slider")}
  <div style:--infinite-animation-fps={story === "infinite-slider-capped" ? "12" : undefined}>
    {#if story === "infinite-slider-vertical"}
      <InfiniteSlider gap={16} speed={40} speedOnHover={10} direction="vertical" class="h-48 w-40">
        {#snippet children()}
          {#each NAMES as name (name)}{@render chip(name)}{/each}
        {/snippet}
      </InfiniteSlider>
    {:else if story === "infinite-slider-many-items"}
      <InfiniteSlider gap={16} speed={40} speedOnHover={10} class="w-120">
        {#snippet children()}
          {#each CHIP_NAMES_MANY as name (name)}{@render chip(name)}{/each}
        {/snippet}
      </InfiniteSlider>
    {:else}
      <InfiniteSlider
        gap={16}
        speed={40}
        speedOnHover={10}
        reverse={story === "infinite-slider-reverse"}
        class="w-120"
      >
        {#snippet children()}
          {#each NAMES as name (name)}{@render chip(name)}{/each}
        {/snippet}
      </InfiniteSlider>
    {/if}
  </div>
{:else if story === "logo-marquee-default"}
  <LogoMarquee logos={wordmarkLogos(WORDMARKS)} label="Trusted by engineers at" class="w-160 max-w-full" />
{:else if story === "logo-marquee-no-label"}
  <LogoMarquee logos={wordmarkLogos(WORDMARKS)} label="" class="w-160 max-w-full" />
{:else if story === "logo-marquee-many-items"}
  <LogoMarquee logos={wordmarkLogos(MANY_WORDMARKS)} label="Trusted by engineers at" class="w-160 max-w-full" />
{/if}
