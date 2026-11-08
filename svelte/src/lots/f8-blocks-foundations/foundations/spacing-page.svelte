<script lang="ts">
  import Button from "../../../ui/button.svelte";
  import Page from "./page.svelte";
  import Section from "./section.svelte";
  import TokenTable from "./token-table.svelte";
  import FoundationLink from "./foundation-link.svelte";
  import { cssVar } from "./css-var";

  /** The steps desktop's own components use, smallest to largest. */
  const STEPS = [
    ["0.5", "w-0.5", "rows stacked inside a popover"],
    ["1", "w-1", "a menu item's and a tooltip's vertical padding; an xs button's icon gap"],
    ["1.5", "w-1.5", "the icon-to-label gap in a button; an xs button's side padding"],
    ["2", "w-2", "a menu item's side padding and icon gap; an sm button's side padding"],
    ["2.5", "w-2.5", "an md button's and a tooltip's side padding"],
    ["3", "w-3", "an lg button's side padding; the gap between a dialog's parts"],
    ["4", "w-4", "a dialog's padding; a settings row's side padding"],
    ["6", "w-6", "the space around a loading, empty or error line in a list"],
    ["8", "w-8", "the gap between settings sections; an empty state's side margins"],
  ] as const;

  const BUTTON_PADDING = [
    ["xs", "px-1.5 gap-1"],
    ["sm", "px-2 gap-1.5"],
    ["md", "px-2.5 gap-1.5"],
    ["lg", "px-3 gap-1.5"],
  ] as const;

  /** One step in px, from the live `--spacing` and the root's font size. */
  function stepPx(): number {
    const spacing = cssVar("--spacing");
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const n = parseFloat(spacing);
    if (spacing.endsWith("rem")) return n * root;
    return n;
  }

  function px(value: number): string {
    return `${Number(value.toFixed(2))}px`;
  }

  const step = stepPx();
</script>

{#snippet lede()}
  Spacing is Tailwind's <code class="code">--spacing</code> multiplier (here {cssVar("--spacing")}).
  Atlas's root is 13px, so one step is {px(step)}: <code class="code">p-2</code> is two steps,
  <code class="code">gap-4</code> is four. There is no separate spacing ladder.
{/snippet}

<Page title="Spacing" {lede}>
  <Section title="The steps in use" intro={useIntro}>
    <TokenTable
      columns={["Utility", "At 1×", "Use", "Sample"]}
      rows={STEPS.map(([n, width, use]) => ({
        name: `p-${n} · gap-${n}`,
        value: px(Number(n) * step),
        use,
        data: width,
      }))}
    >
      {#snippet sample(width: string)}
        <div class={`${width} h-4 rounded-sm bg-foreground`}></div>
      {/snippet}
    </TokenTable>
  </Section>
  <Section
    title="Inside a control"
    intro="A control's height comes from the control scale, not from padding. Spacing sets only its sides and the gap between its icon and label."
  >
    <div class="flex flex-wrap items-end gap-6">
      {#each BUTTON_PADDING as [size, classes] (size)}
        <div class="flex flex-col items-start gap-2">
          <Button {size} variant="outline">Button {size}</Button>
          <code class="code text-muted-foreground">{classes}</code>
        </div>
      {/each}
    </div>
  </Section>
  <Section title="With the interface scale" intro={scaleIntro}></Section>
</Page>

{#snippet useIntro()}
  Any multiple works, but these are the ones desktop's components are built from. Write the step; a
  measurement like <code class="code">py-[5px]</code> cannot follow the unit when it moves.
{/snippet}

{#snippet scaleIntro()}
  Steps are in <code class="code">rem</code>, and the interface scale is a zoom of the whole window,
  so spacing grows with the type and the controls and the proportions hold. Try the Scale menu in
  the toolbar. A theme can restate <code class="code">--spacing</code>, and the whole scale moves
  with it. See the <FoundationLink page="Principles" /> page for why steps are named, and
  <FoundationLink page="Control heights" /> for the heights spacing never sets.
{/snippet}
