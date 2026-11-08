<script lang="ts">
  import { Search } from "lucide-svelte";
  import Icon from "../../src/ui/icon.svelte";
  import Input from "../../src/ui/input.svelte";

  interface Props {
    story?: string;
  }

  let { story = "default" }: Props = $props();

  const SIZES = ["xs", "sm", "md", "lg"] as const;
</script>

<div class="w-72">
  {#if story === "default"}
    <Input placeholder="Search sessions" />
  {:else if story === "filled"}
    <Input defaultValue="atlas/design" />
  {:else if story === "sizes"}
    <div class="flex flex-col gap-2">
      {#each SIZES as size}
        <Input {size} placeholder="Size {size}" />
      {/each}
    </div>
  {:else if story === "disabled"}
    <Input disabled defaultValue="Managed by your org" />
  {:else if story === "invalid"}
    <div class="flex flex-col gap-1">
      <Input aria-invalid="true" defaultValue="not a url" />
      <span class="caption text-error">Enter a full URL, starting with https://</span>
    </div>
  {:else if story === "long-text"}
    <Input
      defaultValue="/Users/someone/Developer/work/a-very-long-project-name/src/features/settings/components/index.tsx"
    />
  {:else if story === "with-icon"}
    <div class="relative">
      <Icon
        icon={Search}
        size="sm"
        class="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground"
      />
      <Input placeholder="Search sessions" class="pl-6" />
    </div>
  {/if}
</div>
