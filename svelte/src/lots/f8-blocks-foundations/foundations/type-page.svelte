<script lang="ts">
  import { cn } from "../../../lib/utils";
  import Page from "./page.svelte";
  import Section from "./section.svelte";
  import TokenTable from "./token-table.svelte";
  import { cssVar } from "./css-var";

  const STEPS = [
    ["text-3xs", "--text-3xs", "a badge on a dense row"],
    ["text-2xs", "--text-2xs", "eyebrows, captions, keycaps"],
    ["text-xs", "--text-xs", "control text; the most common size"],
    ["text-sm", "--text-sm", "list rows, secondary chrome"],
    ["text-base", "--text-base", "body text, messages"],
    ["text-md", "--text-md", "panel and dialog titles"],
    ["text-lg", "--text-lg", "page headings"],
    ["text-xl", "--text-xl", "empty-state headlines"],
    ["text-2xl", "--text-2xl", "the largest thing in the app"],
  ] as const;

  const STYLES = [
    ["eyebrow", "Section header above a group of rows", "10px · 600 · uppercase · tracked · muted"],
    ["label", "Text on and beside a control", "11px · 500"],
    ["body", "Running prose: a description, a message", "13px · 500"],
    ["caption", "The dimmed second line under something", "10px · 500 · muted"],
    ["code", "Any monospace run: a path, a hash, a command", "12px · 500 · Geist Mono"],
    ["heading", "A panel or dialog title", "14px · 600 · -0.01em"],
  ] as const;
</script>

<Page
  title="Type"
  lede="Nine sizes, two weights, two families. Half-pixel sizes round up to the next step. Reach for a named text style before a size, a weight and a colour."
>
  <Section
    title="The scale"
    intro="Each size carries its own line height, and from 16px up its own tracking: Geist reads loose as it grows, so the display steps tighten."
  >
    <TokenTable
      columns={["Utility", "Size / line / tracking", "Use", "Sample"]}
      rows={STEPS.map(([utility, v, use]) => ({
        name: utility,
        value: [cssVar(v), cssVar(`${v}--line-height`), cssVar(`${v}--letter-spacing`) || "0"].join(" / "),
        use,
        data: utility,
      }))}
    >
      {#snippet sample(utility: string)}
        <span class={cn(utility, "font-medium")}>Session timeline</span>
      {/snippet}
    </TokenTable>
  </Section>
  <Section
    title="Two weights"
    intro="500 for text, 600 for emphasis. Nothing lighter: 400 disappears in a dense monochrome UI. Nothing heavier."
  >
    <div class="flex flex-col gap-1">
      <span class="text-lg font-medium">font-medium · 500 · The quick brown fox</span>
      <span class="text-lg font-semibold">font-semibold · 600 · The quick brown fox</span>
    </div>
  </Section>
  <Section title="Named text styles" intro="Six utilities that cover the panel chrome.">
    <TokenTable
      columns={["Utility", "Recipe", "Use", "Sample"]}
      rows={STYLES.map(([name, use, recipe]) => ({ name, value: recipe, use, data: name }))}
    >
      {#snippet sample(name: string)}
        <span class={name}>{name === "code" ? "src/ui/button.tsx" : "Recent sessions"}</span>
      {/snippet}
    </TokenTable>
  </Section>
  <Section title="Together" intro="A settings row, built only from the named styles.">
    <div class="flex max-w-md flex-col gap-3 rounded-md border border-border p-4">
      <span class="eyebrow">Telemetry</span>
      <div class="flex flex-col gap-0.5">
        <span class="heading">Share usage data</span>
        <span class="body text-secondary-foreground">
          Coarse counts of which features you use. Never prompts, paths or code.
        </span>
        <span class="caption">
          Written to <code class="code">config.toml</code> as share_telemetry.
        </span>
      </div>
    </div>
  </Section>
  <Section title="Families">
    <div class="flex flex-col gap-2">
      <span class="text-xl font-medium">Geist · {cssVar("--font-sans").split(",")[0]}</span>
      <span class="font-mono text-xl font-medium">Geist Mono · 0123456789 → {"{}"}</span>
    </div>
  </Section>
</Page>
