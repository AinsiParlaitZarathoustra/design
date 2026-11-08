<script lang="ts">
  import ExternalAgentMark from "../../src/lots/f3-ui-first-half/external-agent-mark.svelte";
  import AgentMonogram from "../../src/lots/f3-ui-first-half/agent-monogram.svelte";
  import Accordion from "../../src/lots/f3-ui-first-half/accordion.svelte";
  import AccordionItem from "../../src/lots/f3-ui-first-half/accordion-item.svelte";
  import AccordionTrigger from "../../src/lots/f3-ui-first-half/accordion-trigger.svelte";
  import AccordionContent from "../../src/lots/f3-ui-first-half/accordion-content.svelte";

  interface Props {
    story?: string;
  }

  let { story = "" }: Props = $props();

  interface DemoItem {
    value: string;
    title: string;
    body: string;
  }

  const ITEMS: DemoItem[] = [
    {
      value: "scope",
      title: "What can the agent read?",
      body: "Every project attached to the session, read-only. It asks before it writes.",
    },
    {
      value: "cost",
      title: "How is usage counted?",
      body: "Tokens in and out, per session, billed to the organisation that owns the project.",
    },
    {
      value: "share",
      title: "Who sees a shared session?",
      body: "Everyone in the organisation. Private sessions stay with you.",
    },
  ];

  function countedItems(count: number): DemoItem[] {
    return Array.from({ length: count }, (_, i) => ({
      value: `q${i}`,
      title: `Question ${i + 1}: how does this setting behave?`,
      body: `Answer ${i + 1}. It applies to every new session from now on.`,
    }));
  }

  const svgUrl = (svg: string) => `data:image/svg+xml;base64,${btoa(svg)}`;
  const GLYPH = "M3 3h18v18H3zM7 7v10h10V7z";
  /** A registry icon with no colour of its own: drawn as a mask in the ink around it. */
  const MONOCHROME = svgUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="${GLYPH}"/></svg>`,
  );
  /** One with its own colour: drawn as an image, untouched. */
  const COLOURED = svgUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="red" fill-rule="evenodd" d="${GLYPH}"/></svg>`,
  );
</script>

{#snippet accordionDemo(
  multiple: boolean,
  defaultValue: string[],
  disabledItem: boolean,
  longText: boolean,
  count: number,
)}
  {@const items = count ? countedItems(count) : ITEMS}
  <div class="w-96">
    <Accordion {multiple} {defaultValue}>
      {#each items as item, i (item.value)}
        <AccordionItem value={item.value} disabled={disabledItem && i === 2}>
          <AccordionTrigger>
            {longText && i === 0
              ? "What can the agent read when a project is attached to a shared session that other people in the organisation also use?"
              : item.title}
          </AccordionTrigger>
          <AccordionContent>
            <p>
              {longText && i === 0
                ? "Every project attached to the session, read-only, including projects attached later by someone else. The agent asks again before it writes anything, and access can be revoked from the session's project list at any time. Revoking it does not undo what the agent has already read."
                : item.body}
            </p>
          </AccordionContent>
        </AccordionItem>
      {/each}
    </Accordion>
  </div>
{/snippet}

{#if story === "components-agenticon--external-monochrome"}
  <span class="label inline-flex items-center gap-2 text-muted-foreground">
    <ExternalAgentMark dataUrl={MONOCHROME} size={16} />
    Registry agent
  </span>
{:else if story === "components-agenticon--external-colour"}
  <ExternalAgentMark dataUrl={COLOURED} size={16} />
{:else if story === "components-agenticon--monogram"}
  <div class="flex items-end gap-4">
    {#each [12, 14, 16, 20, 32] as size (size)}
      <span class="flex flex-col items-center gap-1">
        <AgentMonogram label="kilo" {size} />
        <span class="caption">{size}</span>
      </span>
    {/each}
  </div>
{:else if story === "components-accordion--default"}
  {@render accordionDemo(false, [], false, false, 0)}
{:else if story === "components-accordion--open"}
  {@render accordionDemo(false, ["scope"], false, false, 0)}
{:else if story === "components-accordion--multiple"}
  {@render accordionDemo(true, ["scope", "cost"], false, false, 0)}
{:else if story === "components-accordion--disabled"}
  {@render accordionDemo(false, [], true, false, 0)}
{:else if story === "components-accordion--long-text"}
  {@render accordionDemo(false, ["scope"], false, true, 0)}
{:else if story === "components-accordion--many-items"}
  {@render accordionDemo(false, ["q0"], false, false, 10)}
{/if}
