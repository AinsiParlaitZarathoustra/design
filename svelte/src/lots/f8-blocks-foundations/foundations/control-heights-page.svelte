<script lang="ts">
  import { Settings } from "lucide-svelte";
  import Button from "../../../ui/button.svelte";
  import IconButton from "../../../ui/icon-button.svelte";
  import Input from "../../../ui/input.svelte";
  import { ModelBadge } from "../deps/model-badge";
  import Page from "./page.svelte";
  import Section from "./section.svelte";
  import TokenTable from "./token-table.svelte";
  import { cssVar } from "./css-var";

  const STEPS = [
    ["2xs", "inline chip in text: the model chip, a count pill"],
    ["xs", "inline chip, keycap"],
    ["sm", "dense toolbar control"],
    ["md", "the default control"],
    ["lg", "primary action, search field"],
  ] as const;

  type Step = (typeof STEPS)[number][0];
</script>

{#snippet lede()}
  Four steps for anything you press or type into, and 2xs below them for a chip that sits in a
  line of text. The heights an audit found at 22, 28 and 30 snap to the nearest step. md is the
  default.
{/snippet}

{#snippet scaleIntro()}
  h-control-* sets the height; size-control-* sets both axes, for an icon-only control.
{/snippet}

<Page title="Control heights" {lede}>
  <Section title="The scale" intro={scaleIntro}>
    <TokenTable
      columns={["Utility", "Height", "Use", "Sample"]}
      rows={STEPS.map(([step, use]) => ({
        name: `h-control-${step}`,
        value: cssVar(`--control-${step}`),
        use,
        data: step as Step,
      }))}
    >
      {#snippet sample(step: Step)}
        {#if step === "2xs"}
          <!-- 2xs is a chip, not a control: nothing you press or type into comes that small, so its sample is the chip it exists for. -->
          <ModelBadge model="claude-opus-4" size="2xs" />
        {:else}
          <div class="flex items-center gap-2">
            <Button size={step} variant="outline">Button</Button>
            <IconButton size={step} icon={Settings} label="Settings" variant="outline" />
            <Input size={step} placeholder="Input" class="w-28" />
          </div>
        {/if}
      {/snippet}
    </TokenTable>
  </Section>
</Page>
