<script lang="ts">
  import { cn } from "../../../lib/utils";
  import { HUD } from "../deps/hud";
  import Kbd from "../../../ui/kbd.svelte";
  import Page from "./page.svelte";
  import Section from "./section.svelte";
  import TokenTable from "./token-table.svelte";

  const LEVELS = [
    ["shadow-sm", "--elevation-raised", "raised off the surface"],
    ["shadow-md", "--elevation-menu", "menus and popovers"],
    ["shadow-lg", "--elevation-dialog", "dialogs"],
  ] as const;

  const SCRIMS = ["scrim", "scrim-soft"];
</script>

{#snippet glassIntro()}
  <code class="code">inset-highlight</code> is the 1px top edge on raised glass.
  <code class="code">HUD</code> is the frosted recipe for keycaps floating over content.
{/snippet}

<Page
  title="Elevation"
  lede="Three levels, and they read as three. The shadow colour and weight come from the theme, so a light appearance gets a light shadow. Most raised things in content use a hairline, not a shadow; only what floats over content casts one."
>
  <Section title="The three levels">
    <TokenTable
      columns={["Utility", "Variable", "Use", "Sample"]}
      rows={LEVELS.map(([utility, v, use]) => ({ name: utility, value: v, use, data: utility }))}
    >
      {#snippet sample(utility: string)}
        <div class={cn(utility, "h-12 w-24 rounded-md border border-border bg-card")}></div>
      {/snippet}
    </TokenTable>
  </Section>
  <Section title="Side by side" intro="On the page's own ground.">
    <div class="flex flex-wrap gap-10 rounded-xl bg-muted p-10">
      {#each LEVELS as [utility] (utility)}
        <div
          class={cn(
            utility,
            "label flex h-24 w-40 items-center justify-center rounded-lg border border-border bg-popover",
          )}
        >
          {utility}
        </div>
      {/each}
    </div>
  </Section>
  <Section title="Glass" intro={glassIntro}>
    <div class="flex items-center gap-6 rounded-xl bg-gradient-to-br from-chart-2 via-chart-4 to-chart-5 p-10">
      <div class={cn(HUD, "flex items-center gap-1 rounded-lg p-1.5")}>
        <Kbd>⌘</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>Space</Kbd>
      </div>
      <div class="label inset-highlight rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        inset-highlight shadow-md
      </div>
    </div>
  </Section>
  <Section
    title="Scrim"
    intro="Not a theme key, on purpose: only darkening pushes the app away, in either appearance. scrim for a dialog, scrim-soft for an in-panel drawer."
  >
    <div class="flex gap-4">
      {#each SCRIMS as s (s)}
        <div class="relative h-28 w-56 overflow-hidden rounded-lg border border-border bg-card p-3">
          <span class="body">Content behind</span>
          <div class={cn(s, "absolute inset-0 flex items-center justify-center")}>
            <code class="code rounded-sm bg-popover px-2 py-1">{s}</code>
          </div>
        </div>
      {/each}
    </div>
  </Section>
</Page>
