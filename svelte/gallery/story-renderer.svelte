<script lang="ts">
  import type { Component } from "svelte";

  interface Props {
    component: Component<any>;
    props?: Record<string, unknown>;
  }

  let { component: Story, props = {} }: Props = $props();
</script>

<Story {...props} />
