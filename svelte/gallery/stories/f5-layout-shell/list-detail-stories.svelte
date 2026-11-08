<script lang="ts">
  import { cn } from "../../../src/lib/utils";
  import Badge from "../../../src/ui/badge.svelte";
  import PersonAvatar from "../../../src/lots/f4-ui-second-half-patterns/person-avatar.svelte";
  import StatusIcon from "../../../src/lots/f4-ui-second-half-patterns/status-icon.svelte";
  import DetailPane from "../../../src/lots/f5-layout-shell/shell/detail-pane.svelte";
  import ListDetail from "../../../src/lots/f5-layout-shell/shell/list-detail.svelte";
  import ListPane from "../../../src/lots/f5-layout-shell/shell/list-pane.svelte";
  import PropertiesPane from "../../../src/lots/f5-layout-shell/shell/properties-pane.svelte";
  import PropertyRow from "../../../src/lots/f5-layout-shell/shell/property-row.svelte";
  import { MANY_SESSIONS, SESSIONS } from "../f5-layout-shell-fixtures";
  import Fullscreen from "./fullscreen.svelte";

  /**
   * The three-pane reading layout, ported from
   * `stories/components/shell/list-detail.stories.tsx`. `story` names the scenario.
   */
  interface Props {
    story: string;
  }

  let { story }: Props = $props();

  type Row = { ref: string; title: string; who: string; ago: string };

  const LONG: Row[] = [
    {
      ref: "ATL-1024",
      title:
        "Allow the agent to read every project attached to the session, including ones added later, without asking again",
      who: "Maximiliana Konstantinopoulou",
      ago: "just now",
    },
    ...SESSIONS,
  ];

  const SCENARIOS: Record<string, { rows: Row[]; width: "narrow" | "wide"; properties: boolean }> = {
    default: { rows: SESSIONS, width: "narrow", properties: true },
    wide: { rows: SESSIONS, width: "wide", properties: false },
    empty: { rows: [], width: "narrow", properties: true },
    "long-text": { rows: LONG, width: "narrow", properties: true },
    "many-items": { rows: MANY_SESSIONS, width: "narrow", properties: true },
  };

  const scenario = $derived(SCENARIOS[story] ?? SCENARIOS.default!);
  const rows = $derived(scenario.rows);
  const current = $derived(rows[0]);
</script>

<Fullscreen>
<div class="flex h-svh bg-sidebar p-2">
  <div class="flex min-w-0 flex-1 overflow-hidden rounded-xl border border-border bg-background">
    <ListDetail>
      <ListPane width={scenario.width} class="overflow-y-auto">
        <div class="flex h-10 shrink-0 items-center border-b border-border-subtle px-3">
          <span class="label">Sessions</span>
          <span class="caption ml-auto">{rows.length}</span>
        </div>
        {#if rows.length === 0}
          <p class="caption p-3">No sessions yet. Start one from ⌘K.</p>
        {:else}
          {#each rows as row, i (`${row.ref}-${i}`)}
            <button
              type="button"
              aria-current={i === 0 || undefined}
              class={cn(
                "flex w-full items-center gap-2 border-b border-border-subtle px-3 py-2 text-left",
                "transition-colors duration-fast ease-out-strong hover:bg-element-hover",
                i === 0 && "bg-element-selected",
              )}
            >
              <StatusIcon status={i === 0 ? "live" : "done"} />
              <span class="code shrink-0 text-muted-foreground">{row.ref}</span>
              <span class="label min-w-0 flex-1 truncate">{row.title}</span>
              <span class="caption shrink-0">{row.ago}</span>
            </button>
          {/each}
        {/if}
      </ListPane>

      <DetailPane width={scenario.width === "wide" ? "companion" : "fill"}>
        {#if current}
          <div class="flex flex-col gap-2 p-5">
            <span class="code text-muted-foreground">{current.ref}</span>
            <h2 class="text-lg font-semibold">{current.title}</h2>
            <p class="body text-secondary-foreground">
              The agent split each panel into a container that reads the store and a view that
              renders from props, then moved the tests to the views.
            </p>
          </div>
        {:else}
          <p class="caption m-auto">Select a session.</p>
        {/if}
      </DetailPane>

      {#if scenario.properties && current}
        <PropertiesPane>
          <span class="eyebrow">Properties</span>
          <div class="flex flex-col">
            <PropertyRow label="Status">
              <StatusIcon status="live" />
              Running
            </PropertyRow>
            <PropertyRow label="Author">
              <PersonAvatar size="xs" name={current.who} />
              {current.who}
            </PropertyRow>
            <PropertyRow label="Project">atlas</PropertyRow>
            <PropertyRow label="Branch">
              <span class="code truncate">uzayermasud/settings-split</span>
            </PropertyRow>
            <PropertyRow label="Labels">
              <Badge>refactor</Badge>
              <Badge>ui</Badge>
            </PropertyRow>
          </div>
        </PropertiesPane>
      {/if}
    </ListDetail>
  </div>
</div>
</Fullscreen>
