<script lang="ts">
  import { BrainIcon, PencilIcon, TrashIcon } from "lucide-svelte";
  import Rail from "../../../src/lots/f4-ui-second-half-patterns/rail.svelte";
  import RailNode from "../../../src/lots/f4-ui-second-half-patterns/rail-node.svelte";
  import Icon from "../../../src/ui/icon.svelte";

  const ROWS = [
    { icon: BrainIcon, title: "Learned: the release branch is 0.4.1", when: "2m ago" },
    { icon: PencilIcon, title: "Updated: CI runs on aarch64 only", when: "1h ago" },
    { icon: TrashIcon, title: "Forgot: the old staging URL", when: "Yesterday" },
  ];
</script>

<div data-testid="history" class="w-96">
  {#each ROWS as row, i (row.title)}
    <Rail first={i === 0} last={i === ROWS.length - 1}>
      {#snippet node()}
        <RailNode>
          <Icon icon={row.icon} size="md" />
        </RailNode>
      {/snippet}
      <div class="flex min-h-8 flex-col justify-center">
        <span class="label">{row.title}</span>
        <span class="caption">{row.when}</span>
      </div>
    </Rail>
  {/each}
</div>
