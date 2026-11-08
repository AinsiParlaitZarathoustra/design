<script lang="ts">
  import { FileText, GitBranch, MessageSquare } from "lucide-svelte";
  import Tabs from "../../../src/lots/f4-ui-second-half-patterns/tabs/tabs.svelte";
  import TabsContent from "../../../src/lots/f4-ui-second-half-patterns/tabs/tabs-content.svelte";
  import TabsList from "../../../src/lots/f4-ui-second-half-patterns/tabs/tabs-list.svelte";
  import TabsTrigger from "../../../src/lots/f4-ui-second-half-patterns/tabs/tabs-trigger.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const ICONS = [MessageSquare, FileText, GitBranch];

  /** The scenario's arguments, as the oracle's `Demo` takes them. */
  const scenario = $derived.by(() => {
    switch (story) {
      case "small":
        return { variant: "segmented" as const, size: "sm" as const, tabs: ["All", "Open"], disabledTab: false, icons: false };
      case "segmented-with-icons":
        return { variant: "segmented" as const, size: undefined, tabs: ["Transcript", "Files", "Checkpoints"], disabledTab: false, icons: true };
      case "line":
        return { variant: "line" as const, size: undefined, tabs: ["Transcript", "Files", "Checkpoints"], disabledTab: false, icons: true };
      case "disabled":
        return { variant: "segmented" as const, size: undefined, tabs: ["1d", "7d", "30d"], disabledTab: true, icons: false };
      case "long-text":
        return { variant: "line" as const, size: undefined, tabs: ["Transcript", "Files changed in this session", "Checkpoints and restores"], disabledTab: false, icons: false };
      case "many-items":
        return { variant: "line" as const, size: undefined, tabs: ["Overview", "Sessions", "Projects", "Members", "Usage", "Billing", "Audit"], disabledTab: false, icons: false };
      default:
        return { variant: "segmented" as const, size: undefined, tabs: ["1d", "7d", "30d"], disabledTab: false, icons: false };
    }
  });
</script>

<Tabs defaultValue={scenario.tabs[0]} class="w-full max-w-md">
  <TabsList variant={scenario.variant} size={scenario.size} aria-label="Range">
    {#each scenario.tabs as t, i (t)}
      {@const Glyph = ICONS[i % ICONS.length]!}
      <TabsTrigger value={t} disabled={scenario.disabledTab && i === scenario.tabs.length - 1}>
        {#if scenario.icons}
          <Glyph />
        {/if}
        {t}
      </TabsTrigger>
    {/each}
  </TabsList>
  {#each scenario.tabs as t (t)}
    <TabsContent value={t}>
      <p class="caption">Showing {t}.</p>
    </TabsContent>
  {/each}
</Tabs>
