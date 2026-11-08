<script lang="ts">
  import { Circle, CircleCheck, CircleDashed } from "lucide-svelte";
  import Spinner from "../../../components/ui/spinner.svelte";
  import { cn } from "../../../lib/utils";
  import Icon from "../../../ui/icon.svelte";
  import type { PlanItem } from "./session-view";

  /** The agent's plan as a checklist: done is struck through, the current step turns. */
  interface Props {
    items: PlanItem[];
    class?: string;
  }

  let { items, class: className }: Props = $props();

  const PLAN_ICON: Record<PlanItem["status"], typeof Circle> = {
    completed: CircleCheck,
    in_progress: CircleDashed,
    pending: Circle,
  };
</script>

<ul data-slot="plan-list" class={cn("space-y-1", className)}>
  {#each items as item, i (i)}
    <li
      data-status={item.status}
      class={cn(
        "flex min-h-5.5 items-start gap-2 text-base",
        item.status === "completed" && "text-muted-foreground line-through opacity-60",
        item.status === "in_progress" && "text-foreground",
        item.status === "pending" && "text-secondary-foreground",
      )}
    >
      <span class="flex h-5.5 w-4 shrink-0 items-center justify-center">
        {#if item.status === "in_progress"}
          <Spinner size="md" label="In progress" class="text-foreground" />
        {:else}
          <Icon icon={PLAN_ICON[item.status]} size="md" class="text-muted-foreground" />
        {/if}
      </span>
      <span class="min-w-0 leading-5.5">{item.content}</span>
    </li>
  {/each}
</ul>
