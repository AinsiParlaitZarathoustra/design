<script lang="ts">
  import CommsMessageRow from "../comms/comms-message-row.svelte";

  /**
   * The `ToolbarOnFocus` story's play tabs into the row: the first control in it
   * (its first reaction chip) takes focus, which mounts the toolbar. Focus is
   * taken on mount here, as the play does.
   */
  let props = $props();
  let wrap = $state<HTMLElement | null>(null);

  $effect(() => {
    wrap?.querySelector<HTMLElement>('[data-slot="comms-reaction"]')?.focus();
  });
</script>

<div bind:this={wrap}>
  <CommsMessageRow {...props} />
</div>
