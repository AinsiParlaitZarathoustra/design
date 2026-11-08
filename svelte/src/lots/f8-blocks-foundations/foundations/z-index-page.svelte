<script lang="ts">
  import { cn } from "../../../lib/utils";
  import Page from "./page.svelte";
  import Section from "./section.svelte";
  import TokenTable from "./token-table.svelte";
  import { cssVar } from "./css-var";

  const LAYERS = [
    ["z-panel", "in-panel stacking: sticky headers, resize handles"],
    ["z-titlebar", "the titlebar and its dock"],
    ["z-drawer", "a panel sliding over the chrome: the sidebar, the notification drawer"],
    ["z-overlay", "a dialog's scrim"],
    ["z-modal", "the dialog itself"],
    ["z-popover", "menus, popovers, comboboxes — above modal, so a menu escapes a dialog"],
    ["z-toast", "toasts"],
    ["z-tooltip", "tooltips"],
    ["z-drag", "whatever is under the cursor mid-drag"],
  ] as const;
</script>

<Page
  title="Z-index"
  lede="Nine named layers. Nothing writes a number. popover sits above modal on purpose: a menu opened inside a dialog has to escape it."
>
  <Section title="The layers">
    <TokenTable
      columns={["Utility", "Value", "What sits there"]}
      rows={LAYERS.map(([utility, use]) => ({ name: utility, value: cssVar(`--${utility}`), use }))}
    />
  </Section>
  <Section title="The stack" intro="Each card is on its own layer; later layers sit on top.">
    <div class="relative h-80">
      {#each LAYERS as [utility], i (utility)}
        <div
          class={cn(
            utility,
            "label absolute flex h-14 w-44 items-start rounded-md border border-border bg-card p-2 shadow-sm",
          )}
          style:left="{i * 4.5}rem"
          style:top="{i * 1.75}rem"
        >
          {utility} · {cssVar(`--${utility}`)}
        </div>
      {/each}
    </div>
  </Section>
</Page>
