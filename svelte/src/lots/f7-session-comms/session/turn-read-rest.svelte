<script lang="ts">
  import Spinner from "../../../components/ui/spinner.svelte";
  import type { BodyLoad } from "./session-view";
  import { formatBytes } from "./session-view-helpers";

  /**
   * A truncated body's "Read the rest": web's reader button, in the quiet type
   * of the prompt's "Show more". The app fetches; `load` is how that is going,
   * and clicking again retries a failed one.
   */
  interface Props {
    id: string;
    bytes?: number;
    load?: BodyLoad;
    onLoad: (id: string) => void;
  }

  let { id, bytes, load, onLoad }: Props = $props();

  const loading = $derived(load === "loading");
</script>

<button
  type="button"
  data-slot="read-the-rest"
  data-load={load}
  aria-disabled={loading || undefined}
  aria-busy={loading || undefined}
  onclick={() => {
    if (!loading) onLoad(id);
  }}
  class="flex h-4.5 cursor-pointer items-center gap-1 transition-colors hover:text-secondary-foreground aria-disabled:cursor-default aria-disabled:hover:text-current"
>
  {#if loading}<Spinner size="xs" label="" />{/if}{load === "failed"
    ? "Couldn't load the rest, retry"
    : `Read the rest${bytes !== undefined ? ` · ${formatBytes(bytes)}` : ""}`}
</button>
