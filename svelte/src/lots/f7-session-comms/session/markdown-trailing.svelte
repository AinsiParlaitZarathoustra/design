<script lang="ts">
  import { untrack } from "svelte";
  import type { PluggableList } from "unified";
  import MarkdownBlock from "./markdown-block.svelte";

  /** Below this the trailing block parses on every frame. The oracle's `INLINE_PARSE_LIMIT`. */
  const INLINE_PARSE_LIMIT = 2000;
  /** Parse cadence for a long trailing block. The oracle's `TRAILING_THROTTLE_MS`. */
  const TRAILING_THROTTLE_MS = 120;

  /**
   * The trailing block: every frame while short, throttled once long (its
   * growth is mostly invisible mid-word anyway).
   */
  interface Props {
    source: string;
    rehypePlugins?: PluggableList;
  }

  let { source, rehypePlugins }: Props = $props();

  const small = $derived(source.length <= INLINE_PARSE_LIMIT);
  // Only the timer moves it on: the value at mount, then the latest source each time it fires.
  let throttled = $state(untrack(() => source));
  let timer: ReturnType<typeof setTimeout> | null = null;

  $effect(() => {
    void source;
    if (small || timer !== null) return;
    timer = setTimeout(() => {
      timer = null;
      throttled = source;
    }, TRAILING_THROTTLE_MS);
  });

  // A remount (StrictMode in the oracle) must be able to schedule again.
  $effect(() => () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  });
</script>

<MarkdownBlock source={small ? source : throttled} {rehypePlugins} />
