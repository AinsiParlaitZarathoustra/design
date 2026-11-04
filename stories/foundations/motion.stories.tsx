import type { Meta, StoryObj } from "@storybook/react-vite";
import { motion } from "motion/react";
import { useState } from "react";
import { INFINITE_ANIMATIONS } from "../../src/lib/infinite-animations.ts";
import { cn } from "../../src/lib/utils.ts";
import {
  EASE_PANEL,
  SPRING_DOCK,
  SPRING_INDICATOR,
  SPRING_PILL,
  SPRING_RAIL,
} from "../../src/lib/motion.ts";
import { Button } from "../../src/ui/button.tsx";
import { Segmented } from "../../src/ui/segmented.tsx";
import { Page, Section, TokenTable, cssVar } from "./kit.tsx";

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

const SPRINGS = [
  ["SPRING_RAIL", SPRING_RAIL, "a rail changing width"],
  ["SPRING_DOCK", SPRING_DOCK, "the side dock sliding in"],
  ["SPRING_INDICATOR", SPRING_INDICATOR, "a segmented thumb or underline sliding"],
  ["SPRING_PILL", SPRING_PILL, "an active row sliding between destinations"],
] as const;

/** A dot that crosses its track when `on` flips. */
function Track({ on, className }: { on: boolean; className: string }) {
  return (
    <div className="relative h-control-sm w-48 rounded-full bg-muted">
      <span
        className={cn(
          "absolute top-1 left-1 size-4 rounded-full bg-primary transition-transform",
          on && "translate-x-[10.5rem]",
          className,
        )}
      />
    </div>
  );
}

function SpringTrack({ on, spring }: { on: boolean; spring: object }) {
  return (
    <div className="relative h-control-sm w-48 rounded-full bg-muted">
      <motion.span
        className="absolute top-1 left-1 size-4 rounded-full bg-primary"
        animate={{ x: on ? "10.5rem" : 0 }}
        transition={spring}
      />
    </div>
  );
}

function MotionPage() {
  const [on, setOn] = useState(false);
  const [mode, setMode] = useState("dark");
  const play = (
    <Button variant="outline" onClick={() => setOn((v) => !v)}>
      Play
    </Button>
  );
  return (
    <Page
      title="Motion"
      lede="Springs for things that move, a short ease for things that appear, and nothing at all for things opened hundreds of times a day. Four durations and three curves; a new curve needs a decision."
    >
      <Section title="Durations" intro={<>Each dot uses ease-out-strong. {play}</>}>
        <TokenTable
          columns={["Utility", "Value", "Use", "Demo"]}
          rows={DURATIONS.map(([utility, v, use]) => ({
            name: utility,
            value: cssVar(v),
            use,
            sample: <Track on={on} className={cn(utility, "ease-out-strong")} />,
          }))}
        />
      </Section>
      <Section
        title="Easings"
        intro={<>Each dot uses duration-slow, so the curve is visible. {play}</>}
      >
        <TokenTable
          columns={["Utility", "Curve", "Use", "Demo"]}
          rows={EASINGS.map(([utility, v, use]) => ({
            name: utility,
            value: cssVar(v) || v,
            use,
            sample: <Track on={on} className={cn(utility, "duration-slow")} />,
          }))}
        />
      </Section>
      <Section
        title="Springs"
        intro={
          <>
            From <code className="code">src/lib/motion.ts</code>, for{" "}
            <code className="code">motion</code>. No overshoot: they settle, they do not bounce.{" "}
            {play}
          </>
        }
      >
        <TokenTable
          columns={["Constant", "Stiffness / damping", "Use", "Demo"]}
          rows={SPRINGS.map(([name, spring, use]) => ({
            name,
            value: `${spring.stiffness} / ${spring.damping}`,
            use,
            sample: <SpringTrack on={on} spring={spring} />,
          }))}
        />
        <div className="flex items-center gap-4">
          <Segmented
            aria-label="Appearance"
            value={mode}
            onValueChange={setMode}
            options={[
              { value: "system", label: "System" },
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
          <span className="caption">
            SPRING_INDICATOR in use: the thumb slides between options.
          </span>
        </div>
        <p className="caption">
          EASE_PANEL [{EASE_PANEL.join(", ")}] is the panel entrance in motion, close to
          ease-out-strong.
        </p>
      </Section>
      <Section
        title="Endless animations"
        intro={
          <>
            Every animation in the package that never stops, exported as INFINITE_ANIMATIONS from
            @tryatlas/design/animations so an app can cap each one. A css row is capped with
            animation-timing-function: steps(n) on its selector; a js row reads
            --infinite-animation-fps. Desktop does both under html.platform-linux, where WebKitGTK
            pays for every frame.
          </>
        }
      >
        <TokenTable
          columns={["Id", "Cap with", "Components", "Steps"]}
          rows={INFINITE_ANIMATIONS.map((a) => ({
            name: a.id,
            value: a.driver === "css" ? a.selector : "--infinite-animation-fps",
            use: a.components.join(", "),
            sample:
              a.driver === "css" ? (
                <code className="code">
                  steps({a.steps}) / {a.duration}s
                </code>
              ) : (
                <span className="label text-muted-foreground">fps</span>
              ),
          }))}
        />
      </Section>
      <Section
        title="Restraint"
        intro="Motion explains a change; it does not decorate one. The command palette opens with no animation, because a scale-in on something opened all day reads as latency."
      ></Section>
    </Page>
  );
}

const meta = {
  title: "Foundations/Motion",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
export const Page_: StoryObj = { name: "Page", render: () => <MotionPage /> };
