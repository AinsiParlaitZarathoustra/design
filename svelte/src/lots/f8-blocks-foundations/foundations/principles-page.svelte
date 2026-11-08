<script lang="ts">
  import { onMount } from "svelte";
  import { CircleCheck, GitBranch, Sparkles, TriangleAlert } from "lucide-svelte";
  import Badge from "../../../ui/badge.svelte";
  import Button from "../../../ui/button.svelte";
  import Icon from "../../../ui/icon.svelte";
  import Page from "./page.svelte";
  import Section from "./section.svelte";
  import FoundationLink from "./foundation-link.svelte";
  import Example from "./example.svelte";
  import PaletteDemo from "./palette-demo.svelte";
  import SwitchDemo from "./switch-demo.svelte";
  import BarDemo from "./bar-demo.svelte";

  // Storybook renders the page after the iframe has loaded, so the browser's
  // own jump to `#anchor` finds nothing; make it once the headings exist.
  onMount(() => {
    let hash = window.location.hash;
    try {
      hash ||= window.parent.location.hash;
    } catch {
      // A cross-origin embed: only the iframe's own hash is readable.
    }
    const id = decodeURIComponent(hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  });
</script>

{#snippet draft()}
  <span
    class="label inline-flex w-fit items-center gap-1.5 rounded-full border border-warning px-2.5 py-0.5 text-warning"
  >
    <Icon icon={TriangleAlert} size="sm" />
    Draft — awaiting sign-off
  </span>
{/snippet}

{#snippet usingIntro()}
  When a story or a redesign makes a judgment call, cite the principle it follows by its anchor, for
  example <code class="code">Principles#rings-not-shadows</code>. Every heading above links to its own
  anchor. Anchors never change, so a citation keeps working when a principle is reworded.
{/snippet}

<Page
  title="Principles"
  status={draft}
  lede="How Atlas looks and moves. Each rule has the reason behind it, an example of getting it right and wrong, and the tokens that carry it. The examples use live tokens, so try them in another theme from the toolbar."
>
  <ol class="flex flex-col gap-12">
    <li id="achromatic-surfaces" class="flex scroll-mt-6 flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="eyebrow">Principle 1</span>
        <h2 class="text-xl font-semibold">
          <a href="#achromatic-surfaces" class="hover:underline focus-visible:underline">Achromatic surfaces</a>
        </h2>
        <p class="text-md font-medium">Surfaces are greys from the theme's own ground. Colour never fills a panel.</p>
        <p class="body max-w-2xl text-secondary-foreground">
          Atlas shows other people's code, diffs and output all day. Neutral surfaces keep that content the loudest thing on screen, and let one theme seed recolour everything.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Example kind="do">
          <div class="flex w-56 flex-col gap-1 rounded-md border border-border bg-card p-3">
            <span class="label">Refactor settings</span>
            <span class="caption">atlas · 2h ago</span>
          </div>
        </Example>
        <Example kind="dont">
          <div class="flex w-56 flex-col gap-1 rounded-md border border-info bg-info-muted p-3">
            <span class="label text-info">Refactor settings</span>
            <span class="caption text-info">atlas · 2h ago</span>
          </div>
        </Example>
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="caption mr-1">Roles</span>
        {#each ["background", "card", "popover", "muted", "sidebar", "panel.background"] as role (role)}
          <code class="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground">{role}</code>
        {/each}
        <span class="caption ml-auto pl-2">See <FoundationLink page="Colour" /></span>
      </div>
    </li>

    <li id="hairline-rules" class="flex scroll-mt-6 flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="eyebrow">Principle 2</span>
        <h2 class="text-xl font-semibold">
          <a href="#hairline-rules" class="hover:underline focus-visible:underline">Hairline rules</a>
        </h2>
        <p class="text-md font-medium">Edges and dividers are one pixel, in the border roles. Never thicker.</p>
        <p class="body max-w-2xl text-secondary-foreground">
          A dense UI has many edges. At 1px they group things without competing with the text inside them. Three strengths are enough: subtle, border, strong.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Example kind="do">
          <div class="w-56 rounded-md border border-border">
            {#each ["Tokens", "Cost", "Sessions"] as r (r)}
              <div class="label border-b border-border-subtle px-3 py-1.5 last:border-b-0">{r}</div>
            {/each}
          </div>
        </Example>
        <Example kind="dont">
          <div class="w-56 rounded-md border-2 border-border-strong">
            {#each ["Tokens", "Cost", "Sessions"] as r (r)}
              <div class="label border-b-2 border-border-strong px-3 py-1.5 last:border-b-0">{r}</div>
            {/each}
          </div>
        </Example>
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="caption mr-1">Roles</span>
        {#each ["border", "border.subtle", "border.strong", "sidebar-border"] as role (role)}
          <code class="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground">{role}</code>
        {/each}
        <span class="caption ml-auto pl-2">See <FoundationLink page="Colour" /></span>
      </div>
    </li>

    <li id="rings-not-shadows" class="flex scroll-mt-6 flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="eyebrow">Principle 3</span>
        <h2 class="text-xl font-semibold">
          <a href="#rings-not-shadows" class="hover:underline focus-visible:underline">Rings instead of shadows</a>
        </h2>
        <p class="text-md font-medium">Something raised inside content gets a hairline. Only what floats over content casts a shadow.</p>
        <p class="body max-w-2xl text-secondary-foreground">
          A shadow says 'this is above the page'. Spent on every card, it stops meaning anything, and on near-black it is invisible anyway. Menus and popovers cast shadow-md; dialogs and the command palette cast shadow-lg. shadow-sm is for small things that sit just off a surface, like a slider thumb.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Example kind="do">
          <div class="flex w-56 flex-col gap-1 rounded-md border border-border bg-card p-3">
            <span class="label">Checkpoint 3</span>
            <span class="caption">12 files changed</span>
          </div>
        </Example>
        <Example kind="dont">
          <div class="flex w-56 flex-col gap-1 rounded-md bg-card p-3 shadow-lg">
            <span class="label">Checkpoint 3</span>
            <span class="caption">12 files changed</span>
          </div>
        </Example>
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="caption mr-1">Roles</span>
        {#each ["border", "shadow-sm (raised)", "shadow-md (menu)", "shadow-lg (dialog)", "element.highlight"] as role (role)}
          <code class="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground">{role}</code>
        {/each}
        <span class="caption ml-auto pl-2">See <FoundationLink page="Elevation" /></span>
      </div>
    </li>

    <li id="hue-means-identity" class="flex scroll-mt-6 flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="eyebrow">Principle 4</span>
        <h2 class="text-xl font-semibold">
          <a href="#hue-means-identity" class="hover:underline focus-visible:underline">Hue only where something has an identity</a>
        </h2>
        <p class="text-md font-medium">Colour carries status or identity: a failed run, a project, a chart series. Nothing else.</p>
        <p class="body max-w-2xl text-secondary-foreground">
          If colour only ever means something, people learn to read it. The primary is the theme's ink unless a theme says otherwise, so the loudest button is still monochrome.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Example kind="do">
          <div class="flex flex-col items-start gap-2">
            <Badge variant="success">
              <Icon icon={CircleCheck} size="xs" />
              Passed
            </Badge>
            <span class="label inline-flex items-center gap-1.5">
              <span aria-hidden="true" class="size-1.5 rounded-full bg-chart-4"></span>
              design
            </span>
            <Button size="sm">Continue</Button>
          </div>
        </Example>
        <Example kind="dont">
          <div class="flex flex-col items-start gap-2">
            <Badge variant="info">
              <Icon icon={Sparkles} size="xs" />
              New
            </Badge>
            <span class="label inline-flex items-center gap-1.5 text-chart-3">
              <Icon icon={GitBranch} size="sm" />
              main
            </span>
            <Button size="sm" variant="warning-outline">Continue</Button>
          </div>
        </Example>
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="caption mr-1">Roles</span>
        {#each ["status.*.foreground", "status.*.background", "chart-1…5", "primary", "destructive"] as role (role)}
          <code class="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground">{role}</code>
        {/each}
        <span class="caption ml-auto pl-2">See <FoundationLink page="Colour" /></span>
      </div>
    </li>

    <li id="dense-type" class="flex scroll-mt-6 flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="eyebrow">Principle 5</span>
        <h2 class="text-xl font-semibold">
          <a href="#dense-type" class="hover:underline focus-visible:underline">Dense type in two weights</a>
        </h2>
        <p class="text-md font-medium">Text is small and set in 500 or 600. Controls are 11px; body is 13px. Tracking follows size: headings tighten, eyebrows open up.</p>
        <p class="body max-w-2xl text-secondary-foreground">
          Atlas is a tool people keep open next to their work, so it fits a lot on screen. 400 vanishes at these sizes and 700 shouts; two weights give hierarchy without either. One letter-spacing can't be right at every size: large text reads loose unless it is tightened, small caps read cramped unless they are opened.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Example kind="do">
          <div class="flex w-56 flex-col gap-0.5">
            <span class="text-sm font-semibold">Usage this week</span>
            <span class="text-xs font-medium text-secondary-foreground">1.2M tokens across 48 sessions</span>
          </div>
        </Example>
        <Example kind="dont">
          <div class="flex w-56 flex-col gap-0.5">
            <span class="text-xl font-bold">Usage this week</span>
            <span class="text-md font-light text-secondary-foreground">1.2M tokens across 48 sessions</span>
          </div>
        </Example>
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="caption mr-1">Roles</span>
        {#each ["text-xs", "text-sm", "text-base", "font-medium (500)", "font-semibold (600)"] as role (role)}
          <code class="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground">{role}</code>
        {/each}
        <span class="caption ml-auto pl-2">See <FoundationLink page="Type" /></span>
      </div>
    </li>

    <li id="named-text-styles" class="flex scroll-mt-6 flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="eyebrow">Principle 6</span>
        <h2 class="text-xl font-semibold">
          <a href="#named-text-styles" class="hover:underline focus-visible:underline">Named text styles before ad-hoc combos</a>
        </h2>
        <p class="text-md font-medium">Reach for eyebrow, label, body, caption, code or heading before a size, a weight and a colour.</p>
        <p class="body max-w-2xl text-secondary-foreground">
          Three classes picked at each call site is how an app ends up with a thousand slightly different labels. A name keeps the same thing looking the same everywhere.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Example kind="do">
          <div class="flex w-56 flex-col gap-1">
            <span class="eyebrow">Recent</span>
            <span class="label">Refactor settings</span>
            <span class="caption">atlas · 2h ago</span>
          </div>
        </Example>
        <Example kind="dont">
          <div class="flex w-56 flex-col gap-1">
            <span class="text-xs font-semibold tracking-wide text-secondary-foreground">RECENT</span>
            <span class="text-sm font-semibold">Refactor settings</span>
            <span class="text-xs text-disabled">atlas · 2h ago</span>
          </div>
        </Example>
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="caption mr-1">Roles</span>
        {#each ["eyebrow", "label", "body", "caption", "code", "heading"] as role (role)}
          <code class="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground">{role}</code>
        {/each}
        <span class="caption ml-auto pl-2">See <FoundationLink page="Type" /></span>
      </div>
    </li>

    <li id="scales-not-measurements" class="flex scroll-mt-6 flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="eyebrow">Principle 7</span>
        <h2 class="text-xl font-semibold">
          <a href="#scales-not-measurements" class="hover:underline focus-visible:underline">Scales, never measurements</a>
        </h2>
        <p class="text-md font-medium">Write the step's name: h-control-md, rounded-lg, z-popover. The number lives in one file.</p>
        <p class="body max-w-2xl text-secondary-foreground">
          A measurement typed at a call site drifts by a pixel at a time and cannot follow a theme. A named step moves with the system, and the ratchet can see it.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Example kind="do">
          <div class="flex flex-col items-start gap-2">
            <code class="code">h-control-md rounded-sm</code>
            <div class="flex h-control-md items-center rounded-sm border border-border px-2.5">
              <span class="label">26px control</span>
            </div>
          </div>
        </Example>
        <Example kind="dont">
          <div class="flex flex-col items-start gap-2">
            <code class="code">h-[27px] rounded-[5px]</code>
            <div class="flex h-[27px] items-center rounded-[5px] border border-border px-[11px]">
              <span class="label">27px control</span>
            </div>
          </div>
        </Example>
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="caption mr-1">Roles</span>
        {#each ["--control-*", "--radius-*", "--z-*", "--text-*", "--duration-*"] as role (role)}
          <code class="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground">{role}</code>
        {/each}
        <span class="caption ml-auto pl-2">
          See <FoundationLink page="Control heights" />, <FoundationLink page="Spacing" />,
          <FoundationLink page="Type" />, <FoundationLink page="Radius" />,
          <FoundationLink page="Z-index" /> and <FoundationLink page="Motion" />
        </span>
      </div>
    </li>

    <li id="animate-by-frequency" class="flex scroll-mt-6 flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="eyebrow">Principle 8</span>
        <h2 class="text-xl font-semibold">
          <a href="#animate-by-frequency" class="hover:underline focus-visible:underline">Animate by how often it's seen</a>
        </h2>
        <p class="text-md font-medium">What people do many times a day doesn't move. What they see now and then gets a short ease-out, under 300ms. Nothing appears from nothing.</p>
        <p class="body max-w-2xl text-secondary-foreground">
          An animation on a frequent action stops reading as motion and starts reading as latency. The command palette and every keyboard-initiated action open instantly. Menus, popovers and dialogs scale in from 0.95 with opacity over 150ms, because something that grows out of scale(0) looks like it came from nowhere.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Example kind="do"><PaletteDemo instant /></Example>
        <Example kind="dont"><PaletteDemo /></Example>
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="caption mr-1">Roles</span>
        {#each ["duration-instant", "duration-fast", "duration-base", "ease-out-strong", "animate-scale-in"] as role (role)}
          <code class="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground">{role}</code>
        {/each}
        <span class="caption ml-auto pl-2">See <FoundationLink page="Motion" /></span>
      </div>
    </li>

    <li id="interruptible-motion" class="flex scroll-mt-6 flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="eyebrow">Principle 9</span>
        <h2 class="text-xl font-semibold">
          <a href="#interruptible-motion" class="hover:underline focus-visible:underline">Motion that can be interrupted</a>
        </h2>
        <p class="text-md font-medium">Anything that moves between positions can be caught mid-flight and sent back. It starts from where it is, never from where it was going.</p>
        <p class="body max-w-2xl text-secondary-foreground">
          People change their minds faster than an animation finishes. A transition or a spring retargets from the current value; a keyframe restarts from zero and jumps. Popovers grow out of their trigger and leave the way they came, so a menu always looks attached to what opened it. Springs settle without bouncing unless the user threw something.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Example kind="do"><SwitchDemo interruptible /></Example>
        <Example kind="dont"><SwitchDemo /></Example>
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="caption mr-1">Roles</span>
        {#each ["SPRING_INDICATOR", "SPRING_RAIL", "--transform-origin", "ease-drawer"] as role (role)}
          <code class="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground">{role}</code>
        {/each}
        <span class="caption ml-auto pl-2">See <FoundationLink page="Motion" /></span>
      </div>
    </li>

    <li id="transform-and-opacity" class="flex scroll-mt-6 flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="eyebrow">Principle 10</span>
        <h2 class="text-xl font-semibold">
          <a href="#transform-and-opacity" class="hover:underline focus-visible:underline">Only transform and opacity move</a>
        </h2>
        <!-- The source's ratchet-allow marks here name the anti-pattern this principle forbids. -->
        <p class="text-md font-medium">What moves, moves by transform; what appears, by opacity. Colour may ease on hover. Name each property you transition; never transition: all. Reduced motion swaps movement for a short crossfade. The one exception is an accordion, whose height has to push the rows below it: it animates height, briefly.</p>
        <p class="body max-w-2xl text-secondary-foreground">
          Those two properties skip layout and paint, so they hold the frame on a busy main thread, which Atlas often has while a session streams. Width or padding re-lay out the page every frame and push their neighbours around; a shadow repaints every frame. transition: all animates whatever changes next, including the layout property nobody meant to animate.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Example kind="do"><BarDemo cheap /></Example>
        <Example kind="dont"><BarDemo /></Example>
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="caption mr-1">Roles</span>
        {#each ["transition-[transform,opacity]", "transition-colors", "prefers-reduced-motion"] as role (role)}
          <code class="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground">{role}</code>
        {/each}
        <span class="caption ml-auto pl-2">See <FoundationLink page="Motion" /></span>
      </div>
    </li>

    <li id="respond-on-press" class="flex scroll-mt-6 flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="eyebrow">Principle 11</span>
        <h2 class="text-xl font-semibold">
          <a href="#respond-on-press" class="hover:underline focus-visible:underline">Respond on press</a>
        </h2>
        <p class="text-md font-medium">A control answers the moment it's pressed, not when it's released. Pressable things dip to scale(0.97) on press.</p>
        <p class="body max-w-2xl text-secondary-foreground">
          Feedback that waits for the click to finish feels dead, even when the work behind it is instant. A small dip on press tells people the app heard them, and it costs one composited transform.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Example kind="do"><Button size="sm">Press and hold</Button></Example>
        <!-- Button dips by default now, so the don't pins its scale to switch it off. -->
        <Example kind="dont"><Button size="sm" class="scale-100!">Press and hold</Button></Example>
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="caption mr-1">Roles</span>
        {#each ["active:scale-97", "duration-instant", "ease-out-strong"] as role (role)}
          <code class="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground">{role}</code>
        {/each}
      </div>
    </li>

    <li id="one-interface-scale" class="flex scroll-mt-6 flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="eyebrow">Principle 12</span>
        <h2 class="text-xl font-semibold">
          <a href="#one-interface-scale" class="hover:underline focus-visible:underline">One interface scale</a>
        </h2>
        <p class="text-md font-medium">The interface scale zooms the whole window. Type, controls, spacing and icons grow together; nothing scales on its own.</p>
        <p class="body max-w-2xl text-secondary-foreground">
          Atlas's type and control scales are in px, so scaling by the root font size would move only the rem-based spacing: the gaps and paddings would grow around text and controls that stay the same size. One zoom, the WebView's own, keeps every proportion the design was drawn at. The presets are Compact (0.9), Default (1), Large (1.15) and Larger (1.3). The one exception is desktop's window bar, which holds its height on screen because the macOS traffic lights it centres never zoom.
        </p>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <Example kind="do">
          <div class="flex flex-col items-center gap-3">
            <div class="flex items-center gap-2" style:zoom="1.3">
              <Button size="sm">Run</Button>
              <span class="label">Refactor settings</span>
            </div>
            <span class="caption">Larger, as a zoom: everything grew</span>
          </div>
        </Example>
        <Example kind="dont">
          <div class="flex flex-col items-center gap-3">
            <div class="flex items-center gap-2.5">
              <Button size="sm" class="px-2.5">Run</Button>
              <span class="label">Refactor settings</span>
            </div>
            <span class="caption">Larger, as a root font size: only the gaps grew</span>
          </div>
        </Example>
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="caption mr-1">Roles</span>
        {#each ["zoom", "--ui-zoom", "rem spacing", "px type and controls"] as role (role)}
          <code class="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground">{role}</code>
        {/each}
        <span class="caption ml-auto pl-2">
          See <FoundationLink page="Spacing" />, <FoundationLink page="Control heights" /> and <FoundationLink page="Type" />
        </span>
      </div>
    </li>
  </ol>

  <Section title="Using this" intro={usingIntro}></Section>
</Page>
