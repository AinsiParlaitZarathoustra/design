<script lang="ts">
  import Input from "../../src/ui/input.svelte";

  interface Props {
    initial?: string;
    size?: "xs" | "sm" | "md" | "lg";
  }

  let { initial = "", size = "md" }: Props = $props();
  let value = $state(initial);
</script>

<Input bind:value {size} aria-label="Field" />
<span data-testid="mirror">{value}</span>
