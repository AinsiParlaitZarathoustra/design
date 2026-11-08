<script lang="ts">
  import PlusDecorator from "../../src/lots/f8-blocks-foundations/blocks/plus-decorator.svelte";
  import PlusCorners from "../../src/lots/f8-blocks-foundations/blocks/plus-corners.svelte";
  import DashedRails from "../../src/lots/f8-blocks-foundations/blocks/dashed-rails.svelte";
  import GhostCards from "../../src/lots/f8-blocks-foundations/blocks/ghost-cards.svelte";
  import GradualBlur from "../../src/lots/f8-blocks-foundations/blocks/gradual-blur.svelte";
  import InfiniteSlider from "../../src/lots/f8-blocks-foundations/blocks/infinite-slider.svelte";
  import LogoMarquee, { type Logo } from "../../src/lots/f8-blocks-foundations/blocks/logo-marquee.svelte";
  import DitherField from "../../src/lots/f8-blocks-foundations/blocks/dither-field.svelte";
  import ScrollRail from "../../src/lots/f8-blocks-foundations/blocks/scroll-rail.svelte";
  import TimelineCalendar, {
    type CalendarItem,
  } from "../../src/lots/f8-blocks-foundations/blocks/timeline-calendar.svelte";
  import { cn } from "../../src/lib/utils";
  import { createRawSnippet } from "svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  let scroller: HTMLElement | undefined = $state();
  let timelineScroller: HTMLElement | undefined = $state();

  interface TimelineRow {
    id: string;
    title: string;
    author: string;
    meta: string;
  }
  const TITLES = [
    "Refactor the settings panel",
    "Fix the flaky terminal test",
    "Port the session timeline",
    "Add the ghost-destructive variant",
    "Wire up the PR surface",
    "Theme import from VS Code",
  ];
  const AUTHORS = ["Maya Chen", "Tomás Rivera", "Aiko Tanaka", "Sam Okafor"];
  const DAYS = [
    { date: "November 4", day: "Today" },
    { date: "November 3", day: "Yesterday" },
    { date: "November 2", day: "Sunday" },
    { date: "October 31", day: "Friday" },
    { date: "October 30", day: "Thursday" },
    { date: "October 29", day: "Wednesday" },
  ];

  function buildTimelineItems(
    perDay: number,
    days: number,
    longText: boolean,
  ): CalendarItem<TimelineRow>[] {
    const out: CalendarItem<TimelineRow>[] = [];
    DAYS.slice(0, days).forEach((d, di) => {
      out.push({
        kind: "day",
        key: `day-${di}`,
        id: `day-${di}`,
        ...d,
        meta: createRawSnippet(() => ({
          render: () => `<span class="caption tabular-nums">${perDay} sessions</span>`,
        })),
      });
      for (let i = 0; i < perDay; i++) {
        const n = di * perDay + i;
        out.push({
          kind: "row",
          key: `row-${n}`,
          dayId: `day-${di}`,
          data: {
            id: `row-${n}`,
            title:
              longText && i === 0
                ? "Rewrite the session sidebar so pinned, unread and snoozed sessions sort into one flat list with a project filter"
                : TITLES[n % TITLES.length]!,
            author: AUTHORS[n % AUTHORS.length]!,
            meta: `atlas · ${((n * 13_417) % 200_000).toLocaleString("en-US")} tokens`,
          },
        });
      }
    });
    return out;
  }

  // The timeline's rows, built once per scenario, not on every scroller update.
  const timelineItems = $derived(
    story.startsWith("timeline-calendar")
      ? buildTimelineItems(
          story === "timeline-calendar-many-items"
            ? 80
            : story === "timeline-calendar-scrolled-to-end" || story === "timeline-calendar-measured-end"
              ? 2
              : 4,
          story === "timeline-calendar-empty"
            ? 0
            : story === "timeline-calendar-many-items"
              ? 6
              : 4,
          story === "timeline-calendar-long-text",
        )
      : [],
  );

  // Scroll positions the source's `play` functions set after the story renders.
  $effect(() => {
    const el = timelineScroller;
    if (!el || !story.startsWith("timeline-calendar")) return;
    if (story === "timeline-calendar-scrolled") {
      el.scrollTop = 520;
    } else if (story === "timeline-calendar-scrolled-to-end") {
      const toEnd = () => {
        el.scrollTop = el.scrollHeight;
      };
      toEnd();
      const timer = setTimeout(toEnd, 300);
      return () => clearTimeout(timer);
    } else if (story === "timeline-calendar-measured-end") {
      // Re-jumped on each try: the first jump mounts rows that were only estimates.
      const timers = [0, 100, 300, 600].map((ms) =>
        setTimeout(() => {
          el.scrollTop = el.scrollHeight;
        }, ms),
      );
      return () => timers.forEach(clearTimeout);
    }
  });

  // Halfway: the source's `play` scrolls the article after it renders.
  $effect(() => {
    if (story === "scroll-rail-halfway" && scroller) {
      scroller.scrollTop = (scroller.scrollHeight - scroller.clientHeight) / 2;
    }
  });

  // "No canvas": a privacy mode that blocks 2D canvas. The field never paints,
  // so its static dot grid stays. The source story stubs getContext the same way,
  // and the stub is undone when the story is torn down.
  $effect.pre(() => {
    if (story !== "dither-no-canvas") return;
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = () => null;
    return () => {
      HTMLCanvasElement.prototype.getContext = original;
    };
  });

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

{#snippet timelineRow(row: TimelineRow)}
  <div
    class={cn(
      "flex flex-col gap-0.5 rounded-md px-2 py-2 transition-colors duration-fast ease-out-strong",
      row.id === "row-1" ? "bg-element-selected" : "hover:bg-element-hover",
    )}
  >
    <span class="label truncate">{row.title}</span>
    <span class="caption">{row.author}</span>
    <span class="caption tabular-nums">{row.meta}</span>
  </div>
{/snippet}

{#snippet timelineRowFlush(row: TimelineRow)}
  <div
    class={cn(
      "-mx-2 flex flex-col gap-0.5 rounded-md px-2 py-2 transition-colors duration-fast ease-out-strong",
      row.id === "row-1" ? "bg-element-selected" : "hover:bg-element-hover",
    )}
  >
    <span class="label truncate">{row.title}</span>
    <span class="caption">{row.author}</span>
    <span class="caption tabular-nums">{row.meta}</span>
  </div>
{/snippet}

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
        {#each NAMES as name (name)}{@render chip(name)}{/each}
      </InfiniteSlider>
    {:else if story === "infinite-slider-many-items"}
      <InfiniteSlider gap={16} speed={40} speedOnHover={10} class="w-120">
        {#each CHIP_NAMES_MANY as name (name)}{@render chip(name)}{/each}
      </InfiniteSlider>
    {:else}
      <InfiniteSlider
        gap={16}
        speed={40}
        speedOnHover={10}
        reverse={story === "infinite-slider-reverse"}
        class="w-120"
      >
        {#each NAMES as name (name)}{@render chip(name)}{/each}
      </InfiniteSlider>
    {/if}
  </div>
{:else if story === "logo-marquee-default"}
  <LogoMarquee logos={wordmarkLogos(WORDMARKS)} label="Trusted by engineers at" class="w-160 max-w-full" />
{:else if story === "logo-marquee-no-label"}
  <LogoMarquee logos={wordmarkLogos(WORDMARKS)} label="" class="w-160 max-w-full" />
{:else if story === "logo-marquee-many-items"}
  <LogoMarquee logos={wordmarkLogos(MANY_WORDMARKS)} label="Trusted by engineers at" class="w-160 max-w-full" />
{:else if story.startsWith("dither-")}
  {#if story === "dither-with-copy"}
    <div class="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-md border border-border">
      <DitherField hollow={[0.25, 0.35]} />
      <div class="relative flex flex-col items-center gap-1">
        <span class="heading">Sign in to Atlas</span>
        <span class="caption">Your sessions, your team, one place.</span>
      </div>
    </div>
  {:else}
    <div class="relative h-80 w-full overflow-hidden rounded-md border border-border">
      {#if story === "dither-dots"}
        <DitherField mode="dots" />
      {:else if story === "dither-recoloured"}
        <DitherField class="text-hue-blue" ink={1.5} />
      {:else}
        <DitherField />
      {/if}
    </div>
  {/if}
{:else if story.startsWith("scroll-rail")}
  {@const paragraphs = story === "scroll-rail-empty" ? 1 : 18}
  <div class="flex w-150 items-start gap-6">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      bind:this={scroller}
      role="region"
      aria-label="Article"
      tabindex="0"
      class="h-80 flex-1 overflow-y-auto rounded-lg border border-border p-4"
    >
      <div class="flex flex-col gap-3">
        {#each Array.from({ length: paragraphs }, (_, i) => i) as i (i)}
          <p class="body text-secondary-foreground">
            {i + 1}. The agent read the settings panel, moved each hand-rolled row onto SettingCard,
            and ran the typecheck after every file so a broken import surfaced next to the change
            that caused it.
          </p>
        {/each}
      </div>
    </div>
    <ScrollRail container={scroller} />
  </div>
{:else if story.startsWith("timeline-calendar")}
  {@const flush = story === "timeline-calendar-flush"}
  {@const trailing = story === "timeline-calendar-measured-end"}
  {@const endSpace = story === "timeline-calendar-measured-end" ? "measure" : true}
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    bind:this={timelineScroller}
    role="region"
    aria-label="Timeline"
    tabindex="0"
    class="h-120 w-120 overflow-y-auto px-4"
  >
    <div class={cn(trailing && "flex flex-col gap-6 pb-32")}>
      <TimelineCalendar items={timelineItems} root={timelineScroller} {flush} {endSpace} renderRow={flush ? timelineRowFlush : timelineRow} />
      {#if trailing}
        <p class="caption px-2">Sessions older than 30 days are in the archive.</p>
      {/if}
    </div>
    {#if timelineItems.length === 0}
      <div class="flex h-full items-center justify-center">
        <span class="caption">Nothing on the board yet</span>
      </div>
    {/if}
  </div>
{/if}
