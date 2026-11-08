<script lang="ts">
  import ExternalAgentMark from "../../src/lots/f3-ui-first-half/external-agent-mark.svelte";
  import AgentMonogram from "../../src/lots/f3-ui-first-half/agent-monogram.svelte";
  import Accordion from "../../src/lots/f3-ui-first-half/accordion.svelte";
  import AccordionItem from "../../src/lots/f3-ui-first-half/accordion-item.svelte";
  import AccordionTrigger from "../../src/lots/f3-ui-first-half/accordion-trigger.svelte";
  import AccordionContent from "../../src/lots/f3-ui-first-half/accordion-content.svelte";
  import AtlasMark from "../../src/lots/f3-ui-first-half/atlas-mark.svelte";
  import AtlasBadge from "../../src/lots/f3-ui-first-half/atlas-badge.svelte";
  import AtlasWordmark from "../../src/lots/f3-ui-first-half/atlas-wordmark.svelte";
  import Avatar from "../../src/lots/f3-ui-first-half/avatar.svelte";
  import AvatarImage from "../../src/lots/f3-ui-first-half/avatar-image.svelte";
  import AvatarFallback from "../../src/lots/f3-ui-first-half/avatar-fallback.svelte";
  import AvatarGroup from "../../src/lots/f3-ui-first-half/avatar-group.svelte";
  import AvatarGroupCount from "../../src/lots/f3-ui-first-half/avatar-group-count.svelte";
  import AvatarStack from "../../src/lots/f3-ui-first-half/avatar-stack.svelte";
  import AvatarStackItem from "../../src/lots/f3-ui-first-half/avatar-stack-item.svelte";

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

  const AVATAR_SIZES = ["3xs", "2xs", "xs", "sm", "md", "lg"] as const;
  const AVATAR_PEOPLE = ["Ada Lovelace", "Grace Hopper", "Alan Turing", "Katherine Johnson", "Linus Pauling"];
  const STACK_PEOPLE = ["AL", "GH", "AT", "KJ", "LP", "MC", "RF", "DK", "BL", "ES", "JM", "TB"];

  function initials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);
  }

  /** A data-URI face, so the story needs no network. */
  const PHOTO =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      // ratchet-allow: a stand-in photograph, so its pixels are image content rather than theme colour.
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#8a8f98"/><circle cx="16" cy="13" r="6" fill="#d9dce1"/><rect x="6" y="22" width="20" height="12" rx="6" fill="#d9dce1"/></svg>',
    );

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

{#snippet avatarDemo(size: (typeof AVATAR_SIZES)[number], name: string, src?: string)}
  <Avatar {size}>
    {#if src}
      <AvatarImage {src} alt={name} />
    {/if}
    <AvatarFallback>{initials(name)}</AvatarFallback>
  </Avatar>
{/snippet}

{#snippet avatarStackDemo(count: number, size: (typeof AVATAR_SIZES)[number])}
  <AvatarStack>
    {#each STACK_PEOPLE.slice(0, count) as person (person)}
      <AvatarStackItem>
        <Avatar {size}>
          <AvatarFallback>{person}</AvatarFallback>
        </Avatar>
      </AvatarStackItem>
    {/each}
  </AvatarStack>
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
{:else if story === "components-atlasmark--default"}
  <AtlasMark class="size-6" />
{:else if story === "components-atlasmark--sizes"}
  <div class="flex items-end gap-4 text-foreground">
    <AtlasMark class="size-3" />
    <AtlasMark class="size-4" />
    <AtlasMark class="size-6" />
    <AtlasMark class="size-10" />
  </div>
{:else if story === "components-atlasmark--inks"}
  <div class="flex items-center gap-4">
    <AtlasMark class="size-5 text-foreground" />
    <AtlasMark class="size-5 text-secondary-foreground" />
    <AtlasMark class="size-5 text-muted-foreground" />
  </div>
{:else if story === "components-atlasmark--badge"}
  <AtlasBadge />
{:else if story === "components-atlasmark--wordmark"}
  <AtlasWordmark />
{:else if story === "components-atlasmark--badge-tones"}
  <div class="flex items-center gap-4">
    <AtlasBadge data-testid="theme" />
    <AtlasBadge data-testid="app-icon" tone="app-icon" />
    <AtlasBadge tone="app-icon" class="size-12 [&_svg]:size-6" />
  </div>
{:else if story === "components-atlasmark--lockups"}
  <div class="flex flex-col items-start gap-4">
    <div class="flex flex-col items-center gap-3">
      <AtlasBadge />
      <span class="heading">Sign in to Atlas</span>
    </div>
    <AtlasWordmark />
  </div>
{:else if story === "components-avatar--default"}
  {@render avatarDemo("md", "Ada Lovelace")}
{:else if story === "components-avatar--with-image"}
  {@render avatarDemo("md", "Ada Lovelace", PHOTO)}
{:else if story === "components-avatar--error-state"}
  {@render avatarDemo("md", "Ada Lovelace", "data:image/png;base64,broken")}
{:else if story === "components-avatar--sizes"}
  <div class="flex items-center gap-3">
    {#each AVATAR_SIZES as size (size)}
      {@render avatarDemo(size, "Ada Lovelace")}
    {/each}
  </div>
{:else if story === "components-avatar--group"}
  <AvatarGroup>
    {#each AVATAR_PEOPLE.slice(0, 3) as name (name)}
      <Avatar>
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
    {/each}
    <AvatarGroupCount>+2</AvatarGroupCount>
  </AvatarGroup>
{:else if story === "components-avatar--many-items"}
  <AvatarGroup>
    {#each Array.from({ length: 12 }, (_, i) => AVATAR_PEOPLE[i % AVATAR_PEOPLE.length]) as name, i (i)}
      <Avatar>
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
    {/each}
    <AvatarGroupCount>+38</AvatarGroupCount>
  </AvatarGroup>
{:else if story === "components-avatarstack--default"}
  {@render avatarStackDemo(5, "md")}
{:else if story === "components-avatarstack--empty"}
  {@render avatarStackDemo(0, "md")}
{:else if story === "components-avatarstack--single"}
  {@render avatarStackDemo(1, "md")}
{:else if story === "components-avatarstack--large"}
  {@render avatarStackDemo(5, "lg")}
{:else if story === "components-avatarstack--many-items"}
  {@render avatarStackDemo(12, "md")}
{/if}
