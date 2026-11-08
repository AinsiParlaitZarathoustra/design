<script lang="ts">
  import { untrack } from "svelte";
  import CheckpointTrace, {
    type TraceDensity,
  } from "../../../src/lots/f8-blocks-foundations/blocks/checkpoint-trace.svelte";
  import TraceAvatar from "../../../src/lots/f8-blocks-foundations/blocks/trace-avatar.svelte";
  import type {
    TraceAuthor,
    TraceGroupBy,
    TraceSession,
    TraceZoom,
  } from "../../../src/lots/f8-blocks-foundations/blocks/checkpoint-trace-model";
  import ClaudeCodeMark from "../../../src/lots/f3-ui-first-half/claude-code-mark.svelte";
  import CodexMark from "../../../src/lots/f3-ui-first-half/codex-mark.svelte";
  import AtlasMark from "../../../src/lots/f3-ui-first-half/atlas-mark.svelte";
  import Button from "../../../src/ui/button.svelte";
  import {
    denseSession,
    denseTitled,
    liveSessions,
    longTitles,
    mixedTitles,
    NOW,
    orgWeek,
    projectDay,
    teamWeek,
  } from "./checkpoint-trace-fixtures";

  interface Props {
    story?: string;
  }

  let { story = "org-week" }: Props = $props();

  interface Scenario {
    sessions: TraceSession[];
    zoom: TraceZoom;
    groupBy?: TraceGroupBy;
    density?: TraceDensity;
    loading?: boolean;
    error?: string;
    retry?: boolean;
    placeholder?: boolean;
  }

  const PLACEHOLDER: Record<string, Partial<TraceAuthor>> = {
    priya: { name: "You", initials: "ME" },
    sam: { name: "A member", initials: "?" },
  };
  const placeholder = (a: TraceAuthor): TraceAuthor => ({ ...a, ...PLACEHOLDER[a.id] });

  function scenarioOf(name: string): Scenario {
    switch (name) {
      case "keyboard":
        return { sessions: orgWeek(), zoom: "day" };
      case "pan-and-zoom":
        return { sessions: orgWeek(), zoom: "day" };
      case "project-day":
        return { sessions: projectDay(), zoom: "day" };
      case "live":
        return { sessions: liveSessions(), zoom: "hour" };
      case "dense-clustering":
        return { sessions: denseSession(), zoom: "day" };
      case "group-by-person":
        return { sessions: orgWeek(), zoom: "day", groupBy: "person" };
      case "group-by-project":
        return { sessions: orgWeek(), zoom: "week", groupBy: "project" };
      case "empty":
        return { sessions: [], zoom: "week" };
      case "loading":
        return { sessions: [], zoom: "week", loading: true };
      case "error-state":
        return {
          sessions: [],
          zoom: "week",
          error: "The server answered 503. Your sessions are safe; the trace will be back shortly.",
        };
      case "error-with-retry":
        return { sessions: [], zoom: "week", retry: true };
      case "long-titles":
        return { sessions: longTitles(), zoom: "week" };
      case "team-week":
        return { sessions: teamWeek(), zoom: "week", groupBy: "project" };
      case "dense-clusters-with-titles":
        return { sessions: denseTitled(), zoom: "week" };
      case "mixed-titles":
        return { sessions: mixedTitles(), zoom: "day" };
      case "compact":
        return {
          sessions: teamWeek(),
          zoom: "week",
          groupBy: "project",
          density: "compact",
        };
      case "many-sessions":
        return { sessions: orgWeek(400, 3), zoom: "week" };
      case "placeholder-initials":
        return {
          sessions: orgWeek().map((s) => ({
            ...s,
            participants: s.participants.map(placeholder),
            checkpoints: s.checkpoints.map((c) => ({ ...c, author: placeholder(c.author) })),
          })),
          zoom: "week",
          placeholder: true,
        };
      default:
        return { sessions: orgWeek(), zoom: "week" };
    }
  }

  const scenario = untrack(() => scenarioOf(story));
  let zoom = $state<TraceZoom>(scenario.zoom);
  const errorText = scenario.error;
  const retry = scenario.retry ?? false;
  const placeholderFace = scenario.placeholder ?? false;

  /**
   * The source's `play` functions run when Storybook renders the story, so
   * the captures show their end state. The port replays the same gestures on
   * the mounted trace, with the same selectors the plays use.
   */
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  function waitFor<T extends Element>(selector: string, timeout = 5000): Promise<T> {
    return new Promise((resolve, reject) => {
      const started = performance.now();
      const look = () => {
        const found = document.querySelector<T>(selector);
        if (found) resolve(found);
        else if (performance.now() - started > timeout) reject(new Error(`timeout: ${selector}`));
        else requestAnimationFrame(look);
      };
      look();
    });
  }

  function press(target: Element, key: string) {
    target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
  }

  function pointer(target: Element, type: string, x: number, y: number) {
    target.dispatchEvent(
      new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y,
        button: 0,
        buttons: type === "pointerup" ? 0 : 1,
        pointerId: 1,
        pointerType: "mouse",
      }),
    );
  }

  async function drag(
    field: Element,
    fromX: number,
    toX: number,
    y: number,
  ) {
    pointer(field, "pointerdown", fromX, y);
    pointer(field, "pointermove", (fromX + toX) / 2, y);
    pointer(field, "pointermove", toX, y);
    pointer(field, "pointerup", toX, y);
    await sleep(20);
  }

  let replayed = false;
  $effect(() => {
    const name = untrack(() => story);
    if (replayed) return;
    replayed = true;
    if (!["keyboard", "pan-and-zoom", "project-day", "dense-clustering", "dense-clusters-with-titles"].includes(name))
      return;
    void (async () => {
      const scroller = await waitFor<HTMLElement>('[data-slot="checkpoint-trace-scroller"]');
      // Let the first placement land before a play drives the view.
      await sleep(140);
      if (name === "keyboard") {
        const now = [...scroller.querySelectorAll("button")].find(
          (b) => b.textContent?.trim() === "Now",
        );
        now?.click();
        await sleep(60);
        const titles = [...scroller.querySelectorAll<HTMLElement>('[data-focus$="|:title"]')];
        const first = titles[0];
        if (!first) return;
        first.focus();
        await sleep(40);
        press(first, "ArrowDown");
        await sleep(80);
        const laneTitle = document.activeElement;
        if (laneTitle) press(laneTitle, "End");
        await sleep(200);
        // Enter opens the focused mark: a click, as the key's default action.
        (document.activeElement as HTMLElement | null)?.click();
        return;
      }
      if (name === "project-day") {
        const mark = scroller.querySelector<HTMLElement>("[data-mark]:not([data-handoff])");
        mark?.dispatchEvent(new PointerEvent("pointerover", { bubbles: true }));
        return;
      }
      if (name === "dense-clustering" || name === "dense-clusters-with-titles") {
        const wanted =
          name === "dense-clustering"
            ? /^\d+ checkpoints, .*Zoom in$/
            : /^\d+ checkpoints, /;
        const pill = [...scroller.querySelectorAll<HTMLElement>("[data-mark]")].find((b) =>
          wanted.test(b.querySelector(".sr-only")?.textContent?.trim() ?? ""),
        );
        pill?.click();
        await sleep(320);
        return;
      }
      // pan-and-zoom
      const field = scroller.querySelector<HTMLElement>(
        "[data-pan] [data-pan-layer]:not([aria-hidden])",
      );
      if (!field) return;
      const box = scroller.getBoundingClientRect();
      const y = box.top + 140;
      scroller.scrollLeft = 800;
      await sleep(30);
      await drag(field, box.left + 900, box.left + 700, y);
      await sleep(30);
      await drag(field, box.left + 600, box.left + 600, y);
      scroller.scrollLeft = 0;
      await sleep(30);
      await drag(field, box.left + 500, box.left + 900, y);
      await sleep(80);
      scroller.dispatchEvent(
        new WheelEvent("wheel", {
          deltaY: -120,
          ctrlKey: true,
          clientX: box.left + 700,
          clientY: y,
          bubbles: true,
          cancelable: true,
        }),
      );
    })().catch(() => {
      // The replay is best-effort: the story still shows its initial state.
    });
  });
</script>

{#snippet agentMark(session: TraceSession)}
  {#if session.agentLabel === "Claude Code"}
    <ClaudeCodeMark class="size-3" />
  {:else if session.agentLabel === "Codex"}
    <CodexMark class="size-3" />
  {:else if session.agentLabel === "Atlas"}
    <AtlasMark class="size-3" />
  {/if}
{/snippet}

{#snippet toolbar()}
  <span class="label px-1">Trace</span>
{/snippet}

{#snippet retryError()}
  <div class="flex flex-col items-center gap-2">
    <p class="label">Couldn't reach the server</p>
    <Button size="sm" variant="outline">Retry</Button>
  </div>
{/snippet}

{#snippet hostFace(author: TraceAuthor, size: number)}
  <span data-host-face={author.id} class="flex rounded-full">
    <TraceAvatar {author} {size} />
  </span>
{/snippet}

<div class="h-140 w-full overflow-hidden rounded-lg border border-border">
  <CheckpointTrace
    now={NOW}
    sessions={scenario.sessions}
    {zoom}
    groupBy={scenario.groupBy ?? "none"}
    density={scenario.density ?? "comfortable"}
    loading={scenario.loading ?? false}
    error={retry ? retryError : errorText}
    renderAgentMark={agentMark}
    renderAvatar={placeholderFace ? hostFace : undefined}
    toolbar={toolbar}
    onZoomChange={(next) => (zoom = next)}
  />
</div>
