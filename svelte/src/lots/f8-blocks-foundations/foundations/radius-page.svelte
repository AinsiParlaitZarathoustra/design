<script lang="ts">
  import { cn } from "../../../lib/utils";
  import Page from "./page.svelte";
  import Section from "./section.svelte";
  import TokenTable from "./token-table.svelte";
  import { cssVar } from "./css-var";

  const STEPS = [
    ["rounded-sm", "--radius-sm", "controls: buttons, inputs, keycaps (bare rounded is this)"],
    ["rounded-md", "--radius-md", "cards and rows"],
    ["rounded-lg", "--radius-lg", "popovers and menus"],
    ["rounded-xl", "--radius-xl", "dialogs"],
    ["rounded-full", "--radius-full", "pills, avatars, the segmented track"],
  ] as const;
</script>

{#snippet lede()}
  Derived from the theme's one <code class="code">--radius</code> (here {cssVar("--radius")}): sm
  = r − 4, md = r − 2, lg = r, xl = r + 4. A theme moves the whole scale at once.
{/snippet}

<Page title="Radius" {lede}>
  <Section title="The scale">
    <TokenTable
      columns={["Utility", "Value", "Use", "Sample"]}
      rows={STEPS.map(([utility, v, use]) => ({ name: utility, value: cssVar(v), use, data: utility }))}
    >
      {#snippet sample(utility: string)}
        <div class={cn(utility, "h-10 w-20 border border-border-strong bg-card")}></div>
      {/snippet}
    </TokenTable>
  </Section>
  <Section
    title="Nested"
    intro="Something inside a rounded container takes the next step down, so the curves stay parallel."
  >
    <div class="w-fit rounded-xl border border-border bg-card p-1.5">
      <div class="rounded-lg border border-border bg-popover p-1.5">
        <div class="label rounded-sm bg-element-selected px-2 py-1">rounded-sm in lg in xl</div>
      </div>
    </div>
  </Section>
</Page>
