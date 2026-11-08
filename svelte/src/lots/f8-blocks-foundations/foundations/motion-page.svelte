<script lang="ts">
  import { INFINITE_ANIMATIONS, type InfiniteAnimation } from "../../../lib/infinite-animations";
  import { EASE_PANEL, SPRING_DOCK, SPRING_INDICATOR, SPRING_PILL, SPRING_RAIL } from "../../../lib/motion";
  import { cn } from "../../../lib/utils";
  import Button from "../../../ui/button.svelte";
  import { Segmented } from "../deps/segmented";
  import MotionSpringTrack from "./motion-spring-track.svelte";
  import MotionTrack from "./motion-track.svelte";
  import Page from "./page.svelte";
  import Section from "./section.svelte";
  import TokenTable from "./token-table.svelte";
  import { cssVar } from "./css-var";

  type Spring = { stiffness: number; damping: number };
  type Mode = "system" | "light" | "dark";

  const DURATIONS = [
    ["duration-instant", "--duration-instant", "a state flip the user should not see as motion"],
    ["duration-fast", "--duration-fast", "hover and focus"],
    ["duration-base", "--duration-base", "the default: menus, popovers, tabs"],
    ["duration-slow", "--duration-slow", "panels and drawers travelling a long way"],
  ] as const;

  const EASINGS = [
    ["ease-out-strong", "--ease-out-strong", "entrances; the default"],
    ["ease-in-out-strong", "--ease-in-out-strong", "two-way state changes"],
    ["ease-drawer", "--ease-drawer", "panels and drawers sliding in"],
  ] as const;

  const SPRINGS: ReadonlyArray<readonly [string, Spring, string]> = [
    ["SPRING_RAIL", SPRING_RAIL, "a rail changing width"],
    ["SPRING_DOCK", SPRING_DOCK, "the side dock sliding in"],
    ["SPRING_INDICATOR", SPRING_INDICATOR, "a segmented thumb or underline sliding"],
    ["SPRING_PILL", SPRING_PILL, "an active row sliding between destinations"],
  ];

  let on = $state(false);
  let mode = $state<Mode>("dark");
</script>

{#snippet play()}
  <Button variant="outline" onclick={() => (on = !on)}>Play</Button>
{/snippet}

{#snippet durationsIntro()}
  Each dot uses ease-out-strong. {@render play()}
{/snippet}

{#snippet easingsIntro()}
  Each dot uses duration-slow, so the curve is visible. {@render play()}
{/snippet}

{#snippet springsIntro()}
  From <code class="code">src/lib/motion.ts</code>, for <code class="code">motion</code>. No
  overshoot: they settle, they do not bounce. {@render play()}
{/snippet}

{#snippet endlessIntro()}
  Every animation in the package that never stops, exported as INFINITE_ANIMATIONS from
  @tryatlas/design/animations so an app can cap each one. A css row is capped with
  animation-timing-function: steps(n) on its selector; a js row reads --infinite-animation-fps.
  Desktop does both under html.platform-linux, where WebKitGTK pays for every frame.
{/snippet}

<Page
  title="Motion"
  lede="Springs for things that move, a short ease for things that appear, and nothing at all for things opened hundreds of times a day. Four durations and three curves; a new curve needs a decision."
>
  <Section title="Durations" intro={durationsIntro}>
    <TokenTable
      columns={["Utility", "Value", "Use", "Demo"]}
      rows={DURATIONS.map(([utility, v, use]) => ({
        name: utility,
        value: cssVar(v),
        use,
        data: utility,
      }))}
    >
      {#snippet sample(utility: string)}
        <MotionTrack {on} class={cn(utility, "ease-out-strong")} />
      {/snippet}
    </TokenTable>
  </Section>
  <Section title="Easings" intro={easingsIntro}>
    <TokenTable
      columns={["Utility", "Curve", "Use", "Demo"]}
      rows={EASINGS.map(([utility, v, use]) => ({
        name: utility,
        value: cssVar(v) || v,
        use,
        data: utility,
      }))}
    >
      {#snippet sample(utility: string)}
        <MotionTrack {on} class={cn(utility, "duration-slow")} />
      {/snippet}
    </TokenTable>
  </Section>
  <Section title="Springs" intro={springsIntro}>
    <TokenTable
      columns={["Constant", "Stiffness / damping", "Use", "Demo"]}
      rows={SPRINGS.map(([name, spring, use]) => ({
        name,
        value: `${spring.stiffness} / ${spring.damping}`,
        use,
        data: spring,
      }))}
    >
      {#snippet sample(spring: Spring)}
        <MotionSpringTrack {on} stiffness={spring.stiffness} damping={spring.damping} />
      {/snippet}
    </TokenTable>
    <div class="flex items-center gap-4">
      <Segmented
        aria-label="Appearance"
        value={mode}
        onValueChange={(next) => (mode = next)}
        options={[
          { value: "system", label: "System" },
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" },
        ]}
      />
      <span class="caption">SPRING_INDICATOR in use: the thumb slides between options.</span>
    </div>
    <p class="caption">
      EASE_PANEL [{EASE_PANEL.join(", ")}] is the panel entrance in motion, close to
      ease-out-strong.
    </p>
  </Section>
  <Section title="Endless animations" intro={endlessIntro}>
    <TokenTable
      columns={["Id", "Cap with", "Components", "Steps"]}
      rows={INFINITE_ANIMATIONS.map((a) => ({
        name: a.id,
        value: a.driver === "css" ? a.selector : "--infinite-animation-fps",
        use: a.components.join(", "),
        data: a,
      }))}
    >
      {#snippet sample(a: InfiniteAnimation)}
        {#if a.driver === "css"}
          <code class="code">steps({a.steps}) / {a.duration}s</code>
        {:else}
          <span class="label text-muted-foreground">fps</span>
        {/if}
      {/snippet}
    </TokenTable>
  </Section>
  <Section
    title="Restraint"
    intro="Motion explains a change; it does not decorate one. The command palette opens with no animation, because a scale-in on something opened all day reads as latency."
  ></Section>
</Page>
