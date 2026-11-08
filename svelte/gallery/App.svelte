<script lang="ts">
  import { BUILT_IN_THEMES, isTheme } from "./themes";
  import { BY_ID, STORIES } from "./registry";
  import StoryRenderer from "./story-renderer.svelte";
  import "./gallery.css";

  const params = new URLSearchParams(location.search);
  const storyId = params.get("story") ?? "";
  const story = BY_ID.get(storyId);

  const theme = isTheme(params.get("theme") ?? "") ? params.get("theme")! : "atlas";
  const appearance = params.get("appearance") === "light" ? "light" : "dark";
  const scale = params.get("scale") ?? "1";

  $effect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.appearance = appearance;
    root.style.zoom = scale === "1" ? "" : scale;
    root.style.setProperty("--ui-zoom", scale);
    document.body.classList.toggle("story-mode", Boolean(story));
    return () => document.body.classList.remove("story-mode");
  });

  const groups = $derived(
    [...new Set(STORIES.map((entry) => entry.title))].map((title) => ({
      title,
      stories: STORIES.filter((entry) => entry.title === title),
    })),
  );

  function href(id: string, overrides: Record<string, string> = {}) {
    const next = new URLSearchParams({ story: id, theme, appearance, scale, ...overrides });
    return `?${next.toString()}`;
  }
</script>

{#if story}
  <div id="story-root" data-story={story.id}>
    <StoryRenderer component={story.component} props={{ ...story.props, appearance: story.appearance ?? appearance }} />
  </div>
{:else}
  <main class="mx-auto max-w-3xl p-8 text-foreground">
    <h1 class="heading mb-1">Atlas design · Svelte gallery</h1>
    <p class="body mb-6 text-secondary-foreground">
      {STORIES.length} stories ported. The source has 853; a story not listed here is marked
      <code class="text-xs">non porté</code> in <code class="text-xs">manifest.json</code>.
    </p>

    <div class="mb-6 flex flex-wrap items-center gap-2 text-xs">
      <span class="text-muted-foreground">Theme</span>
      {#each BUILT_IN_THEMES as option}
        <a
          class="rounded border border-border px-2 py-1"
          class:bg-element-selected={option.id === theme}
          href="?theme={option.id}&appearance={appearance}&scale={scale}">{option.name}</a
        >
      {/each}
    </div>

    {#each groups as group}
      <section class="mb-6">
        <h2 class="mb-2 text-sm font-medium">{group.title}</h2>
        <ul class="grid grid-cols-2 gap-1 text-xs">
          {#each group.stories as entry}
            <li>
              <a class="text-secondary-foreground hover:text-foreground" href={href(entry.id)}
                >{entry.name}</a
              >
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </main>
{/if}
