<script lang="ts">
  import RailLink from "./rail-link.svelte";
  import type { SettingsNavItem } from "./settings-nav";

  /**
   * A labelled run of rail links, the settings rail's section. Ported from
   * `RailGroup` in `settings-shell.tsx`.
   */
  interface Props {
    label: string;
    items: Array<SettingsNavItem>;
  }

  let { label, items }: Props = $props();
</script>

<div class="mb-3">
  <div class="px-2 pb-1.5 eyebrow">{label}</div>
  <ul class="space-y-px">
    {#each items as item (item.to)}
      <li>
        <RailLink to={item.to} icon={item.icon}>{item.label}</RailLink>
      </li>
    {/each}
  </ul>
</div>
