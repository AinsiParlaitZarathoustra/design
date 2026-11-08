<script lang="ts">
  import type { PluggableList } from "unified";
  import type { BodyLoad, TurnView } from "../session/session-view";
  import TurnRow from "../session/turn-row.svelte";
  import { truncatedBodiesTurn } from "../fixtures/session-fixtures";

  /**
   * `ReadTheRest`: the app's side of "Read the rest", a fetch that takes a
   * moment, then fails or fills the body in. The story's play clicks one of the
   * two buttons (the prompt's or the answer's), which is done here on mount.
   */
  interface Props {
    rehypePlugins?: PluggableList;
    /** The fetch fails instead of filling the body in. */
    fail?: boolean;
    /** Which "Read the rest" the play clicks: the prompt's or the answer's. */
    click?: "first" | "second";
  }

  let { rehypePlugins, fail = false, click }: Props = $props();

  const REST =
    " the `byPinned` comparator ran after the date sort, so a pinned session from last week sank below today's. Second, the jump menu kept its own copy of the order. Both now read one `sortSessions`, and a test pins the order.";

  let load = $state<Record<string, BodyLoad | "done">>({});
  let root = $state<HTMLElement | null>(null);

  const base = truncatedBodiesTurn();
  const loadOf = (id: string) => load[id];

  const shown = $derived<TurnView>({
    ...base,
    user: base.user && {
      ...base.user,
      text: loadOf(base.user.id) === "done" ? base.user.text.replace(" …", REST) : base.user.text,
      truncated: loadOf(base.user.id) !== "done",
      load: loadOf(base.user.id) === "done" ? undefined : (loadOf(base.user.id) as BodyLoad | undefined),
    },
    items: base.items.map((item) =>
      item.kind === "text"
        ? {
            ...item,
            text: loadOf(item.id) === "done" ? item.text.replace(" …", REST) : item.text,
            truncated: loadOf(item.id) !== "done",
            load: loadOf(item.id) === "done" ? undefined : (loadOf(item.id) as BodyLoad | undefined),
          }
        : item,
    ),
  });

  function onLoadBody(id: string) {
    load = { ...load, [id]: "loading" };
    setTimeout(() => (load = { ...load, [id]: fail ? "failed" : "done" }), 600);
  }

  // The story's play: a real click on the named button, made on mount.
  $effect(() => {
    if (!click || !root) return;
    const buttons = Array.from(root.querySelectorAll("button")).filter((button) =>
      (button.textContent ?? "").trim().startsWith("Read the rest"),
    );
    const target = buttons[click === "first" ? 0 : 1];
    // The oracle's play is a real click: the pressed control keeps focus.
    target?.focus();
    target?.click();
  });
</script>

<div bind:this={root}>
  <TurnRow turn={shown} {rehypePlugins} class="max-w-3xl" {onLoadBody} />
</div>
