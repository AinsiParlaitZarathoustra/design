<script lang="ts">
  import { Bell, CreditCard, KeyRound, Palette, Shield, Users } from "lucide-svelte";
  import SettingCard from "../../../src/lots/f4-ui-second-half-patterns/setting-card.svelte";
  import SettingRow from "../../../src/lots/f4-ui-second-half-patterns/setting-row.svelte";
  import DrillInRow from "../../../src/lots/f4-ui-second-half-patterns/drill-in-row.svelte";
  import Switch from "../../../src/lots/f1-primitives-forms/switch.svelte";
  import Badge from "../../../src/ui/badge.svelte";
  import Button from "../../../src/ui/button.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const MANY = ["Keybindings", "Agents", "Models", "Memory", "Projects", "Billing"];

  // The two live switches of the card: each keeps its own state, as the oracle's `LiveSwitch` does.
  let notify = $state(true);
  let telemetry = $state(false);

  const disabled = $derived(story === "disabled");
  const longText = $derived(story === "long-text");
  const many = $derived(story === "many-items");
  const narrow = $derived(story === "narrow");
</script>

<div class={narrow ? "w-64" : "w-120"}>
  <SettingCard>
    <SettingRow
      icon={Bell}
      label="Notify when a session finishes"
      description={longText
        ? "Sends a system notification when an agent finishes a turn, fails, or stops to ask for approval, but only while the window is not focused, so you are not interrupted while you watch it work"
        : "Only while the window is not focused"}
    >
      {#snippet control()}
        <Switch
          checked={notify}
          onCheckedChange={(next) => (notify = next)}
          {disabled}
          aria-label="Notify"
        />
      {/snippet}
    </SettingRow>
    <SettingRow icon={Shield} label="Share telemetry" description="Coarse metadata only">
      {#snippet control()}
        <Switch
          checked={telemetry}
          onCheckedChange={(next) => (telemetry = next)}
          {disabled}
          aria-label="Telemetry"
        />
      {/snippet}
    </SettingRow>
    <SettingRow icon={KeyRound} label="API key">
      {#snippet control()}
        <Button variant="outline" size="sm" {disabled}>Replace</Button>
      {/snippet}
    </SettingRow>
    <SettingRow icon={CreditCard} label="Plan">
      {#snippet control()}
        <Badge>Team</Badge>
      {/snippet}
    </SettingRow>
    <DrillInRow icon={Palette} label="Theme" value="Atlas dark" {disabled} />
    <DrillInRow
      icon={Users}
      label="Members"
      description="Invite teammates and set roles"
      value="12"
      {disabled}
    />
    {#if many}
      {#each MANY as label (label)}
        <DrillInRow {label} {disabled} />
      {/each}
    {/if}
  </SettingCard>
</div>
