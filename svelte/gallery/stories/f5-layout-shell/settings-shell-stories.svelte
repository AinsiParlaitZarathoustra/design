<script lang="ts">
  import { CreditCard, Key, Users } from "lucide-svelte";
  import Switch from "../../../src/lots/f1-primitives-forms/switch.svelte";
  import DrillInRow from "../../../src/lots/f4-ui-second-half-patterns/drill-in-row.svelte";
  import SectionHeader from "../../../src/lots/f4-ui-second-half-patterns/section-header.svelte";
  import SettingCard from "../../../src/lots/f4-ui-second-half-patterns/setting-card.svelte";
  import SettingRow from "../../../src/lots/f4-ui-second-half-patterns/setting-row.svelte";
  import PageHeader from "../../../src/lots/f5-layout-shell/deps/page-header.svelte";
  import RailGroup from "../../../src/lots/f5-layout-shell/shell/rail-group.svelte";
  import RailLink from "../../../src/lots/f5-layout-shell/shell/rail-link.svelte";
  import SettingsShell from "../../../src/lots/f5-layout-shell/shell/settings-shell.svelte";
  import type { SettingsNavGroup } from "../../../src/lots/f5-layout-shell/shell/settings-nav";
  import Input from "../../../src/ui/input.svelte";
  import Fullscreen from "./fullscreen.svelte";
  import StoryLinks from "./story-links.svelte";
  import { LONG_ORG, ORGS, SETTINGS_GROUPS } from "../f5-layout-shell-fixtures";

  /**
   * Settings as a mode, ported from `stories/components/shell/settings-shell.stories.tsx`.
   * `story` names the scenario; the rail's parts alone are the `rail` story.
   */
  interface Props {
    story: string;
  }

  let { story }: Props = $props();

  const WORKSPACE = SETTINGS_GROUPS[0]!;

  const MANY_GROUPS: SettingsNavGroup[] = [
    ...SETTINGS_GROUPS,
    ...["Agents", "Developer", "Danger zone"].map((label) => ({
      label,
      items: WORKSPACE.items.map((item) => ({ ...item, to: `${item.to}/${label}` })),
    })),
  ];

  const long = $derived(story === "long-text");
  const groups = $derived<SettingsNavGroup[]>(
    story === "empty" ? [] : story === "many-items" ? MANY_GROUPS : SETTINGS_GROUPS,
  );
  const pathname = $derived(story === "rail" ? "/settings/members" : "/settings");

  // The Toggle stories' initial state, as the source's `Toggle` seeds it.
  let shareByDefault = $state(true);
  let telemetry = $state(false);
</script>

{#snippet page()}
  <div class="flex flex-col gap-6">
    <PageHeader title="General" description="How the workspace looks to everyone in it." />
    <section>
      <SectionHeader title="Workspace" />
      <SettingCard>
        <SettingRow label="Name" description="Shown in the switcher and on invites.">
          {#snippet control()}
            <Input defaultValue={long ? LONG_ORG.name : "Atlas"} aria-label="Name" />
          {/snippet}
        </SettingRow>
        <SettingRow
          label="Share sessions with the team by default"
          description={long
            ? "New sessions are visible to every member of the workspace as soon as they start, including their transcript, tool calls, checkpoints and any files the agent reads. You can still make a single session private from its header."
            : "Members see new sessions as they start."}
        >
          {#snippet control()}
            <Switch
              checked={shareByDefault}
              onCheckedChange={(next) => (shareByDefault = next)}
              aria-label="Share by default"
            />
          {/snippet}
        </SettingRow>
        <SettingRow label="Share telemetry" description="Coarse usage metadata only.">
          {#snippet control()}
            <Switch
              checked={telemetry}
              onCheckedChange={(next) => (telemetry = next)}
              aria-label="Share telemetry"
            />
          {/snippet}
        </SettingRow>
      </SettingCard>
    </section>
    <section>
      <SectionHeader title="Manage" />
      <SettingCard>
        <DrillInRow icon={Users} label="Members" value="14" />
        <DrillInRow icon={Key} label="API keys" value="3 active" />
        <DrillInRow icon={CreditCard} label="Billing" description="Team plan, renews 1 Dec" />
      </SettingCard>
    </section>
  </div>
{/snippet}

{#if story === "rail"}
  <StoryLinks pathname="/settings/members">
    <div class="w-56">
      <RailLink to="/sessions">Back to app</RailLink>
      <RailGroup label={WORKSPACE.label} items={WORKSPACE.items} />
    </div>
  </StoryLinks>
{:else}
  <Fullscreen>
    <StoryLinks {pathname}>
      <SettingsShell org={long ? LONG_ORG : ORGS[0]!} groups={groups} backHref="/sessions">
        {@render page()}
      </SettingsShell>
    </StoryLinks>
  </Fullscreen>
{/if}
