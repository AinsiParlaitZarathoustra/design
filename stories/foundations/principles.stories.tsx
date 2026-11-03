import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheck, GitBranch, Sparkles, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../src/lib/utils.ts";
import { Badge } from "../../src/ui/badge.tsx";
import { Button } from "../../src/ui/button.tsx";
import { Icon } from "../../src/ui/icon.tsx";
import { Page } from "./kit.tsx";

/**
 * Atlas's design language, drafted from desktop's design-system reference,
 * its `src/ui` primitives and tokens, the session timeline and usage panels,
 * and the old standards README. Every do/don't pair is drawn with live tokens,
 * so it holds in every theme on the toolbar.
 */

interface Principle {
  title: string;
  rule: string;
  why: string;
  good: ReactNode;
  bad: ReactNode;
  roles: string[];
}

/** A small session card, the thing most principles are shown on. */
function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("flex w-56 flex-col gap-1 rounded-md p-3", className)}>{children}</div>;
}

const PRINCIPLES: Principle[] = [
  {
    title: "Achromatic surfaces",
    rule: "Surfaces are greys from the theme's own ground. Colour never fills a panel.",
    why: "Atlas shows other people's code, diffs and output all day. Neutral surfaces keep that content the loudest thing on screen, and let one theme seed recolour everything.",
    good: (
      <Card className="border border-border bg-card">
        <span className="label">Refactor settings</span>
        <span className="caption">atlas · 2h ago</span>
      </Card>
    ),
    bad: (
      <Card className="border border-info bg-info-muted">
        <span className="label text-info">Refactor settings</span>
        <span className="caption text-info">atlas · 2h ago</span>
      </Card>
    ),
    roles: ["background", "card", "popover", "muted", "sidebar", "panel.background"],
  },
  {
    title: "Hairline rules",
    rule: "Edges and dividers are one pixel, in the border roles. Never thicker.",
    why: "A dense UI has many edges. At 1px they group things without competing with the text inside them. Three strengths are enough: subtle, border, strong.",
    good: (
      <div className="w-56 rounded-md border border-border">
        {["Tokens", "Cost", "Sessions"].map((r) => (
          <div key={r} className="label border-b border-border-subtle px-3 py-1.5 last:border-b-0">
            {r}
          </div>
        ))}
      </div>
    ),
    bad: (
      <div className="w-56 rounded-md border-2 border-border-strong">
        {["Tokens", "Cost", "Sessions"].map((r) => (
          <div
            key={r}
            className="label border-b-2 border-border-strong px-3 py-1.5 last:border-b-0"
          >
            {r}
          </div>
        ))}
      </div>
    ),
    roles: ["border", "border.subtle", "border.strong", "sidebar-border"],
  },
  {
    title: "Rings instead of shadows",
    rule: "Something raised inside content gets a hairline. Only what floats over content casts a shadow.",
    why: "A shadow says 'this is above the page'. Spent on every card, it stops meaning anything, and on near-black it is invisible anyway. Menus and popovers cast shadow-md; dialogs and the command palette cast shadow-lg. shadow-sm is for small things that sit just off a surface, like a slider thumb.",
    good: (
      <Card className="border border-border bg-card">
        <span className="label">Checkpoint 3</span>
        <span className="caption">12 files changed</span>
      </Card>
    ),
    bad: (
      <Card className="bg-card shadow-lg">
        <span className="label">Checkpoint 3</span>
        <span className="caption">12 files changed</span>
      </Card>
    ),
    roles: [
      "border",
      "shadow-sm (raised)",
      "shadow-md (menu)",
      "shadow-lg (dialog)",
      "element.highlight",
    ],
  },
  {
    title: "Hue only where something has an identity",
    rule: "Colour carries status or identity: a failed run, a project, a chart series. Nothing else.",
    why: "If colour only ever means something, people learn to read it. The primary is the theme's ink unless a theme says otherwise, so the loudest button is still monochrome.",
    good: (
      <div className="flex flex-col items-start gap-2">
        <Badge variant="success">
          <Icon icon={CircleCheck} size="xs" />
          Passed
        </Badge>
        <span className="label inline-flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-chart-4" />
          design
        </span>
        <Button size="sm">Continue</Button>
      </div>
    ),
    bad: (
      <div className="flex flex-col items-start gap-2">
        <Badge variant="info">
          <Icon icon={Sparkles} size="xs" />
          New
        </Badge>
        <span className="label inline-flex items-center gap-1.5 text-chart-3">
          <Icon icon={GitBranch} size="sm" />
          main
        </span>
        <Button size="sm" variant="warning-outline">
          Continue
        </Button>
      </div>
    ),
    roles: ["status.*.foreground", "status.*.background", "chart-1…5", "primary", "destructive"],
  },
  {
    title: "Dense type in two weights",
    rule: "Text is small and set in 500 or 600. Controls are 11px; body is 13px.",
    why: "Atlas is a tool people keep open next to their work, so it fits a lot on screen. 400 vanishes at these sizes and 700 shouts; two weights give hierarchy without either.",
    good: (
      <div className="flex w-56 flex-col gap-0.5">
        <span className="text-sm font-semibold">Usage this week</span>
        <span className="text-xs font-medium text-secondary-foreground">
          1.2M tokens across 48 sessions
        </span>
      </div>
    ),
    bad: (
      <div className="flex w-56 flex-col gap-0.5">
        <span className="text-xl font-bold">Usage this week</span>
        <span className="text-md font-light text-secondary-foreground">
          1.2M tokens across 48 sessions
        </span>
      </div>
    ),
    roles: ["text-xs", "text-sm", "text-base", "font-medium (500)", "font-semibold (600)"],
  },
  {
    title: "Named text styles before ad-hoc combos",
    rule: "Reach for eyebrow, label, body, caption, code or heading before a size, a weight and a colour.",
    why: "Three classes picked at each call site is how an app ends up with a thousand slightly different labels. A name keeps the same thing looking the same everywhere.",
    good: (
      <div className="flex w-56 flex-col gap-1">
        <span className="eyebrow">Recent</span>
        <span className="label">Refactor settings</span>
        <span className="caption">atlas · 2h ago</span>
      </div>
    ),
    bad: (
      <div className="flex w-56 flex-col gap-1">
        <span className="text-xs font-semibold tracking-wide text-secondary-foreground">
          RECENT
        </span>
        <span className="text-sm font-semibold">Refactor settings</span>
        <span className="text-xs text-disabled">atlas · 2h ago</span>
      </div>
    ),
    roles: ["eyebrow", "label", "body", "caption", "code", "heading"],
  },
  {
    title: "Scales, never measurements",
    rule: "Write the step's name: h-control-md, rounded-lg, z-popover. The number lives in one file.",
    why: "A measurement typed at a call site drifts by a pixel at a time and cannot follow a theme. A named step moves with the system, and the ratchet can see it.",
    good: (
      <div className="flex flex-col items-start gap-2">
        <code className="code">h-control-md rounded-sm</code>
        <div className="flex h-control-md items-center rounded-sm border border-border px-2.5">
          <span className="label">26px control</span>
        </div>
      </div>
    ),
    bad: (
      <div className="flex flex-col items-start gap-2">
        {/* ratchet-allow: this is the don't half of a do/don't pair, so it spells out the arbitrary radius the rule forbids. */}
        <code className="code">h-[27px] rounded-[5px]</code>
        {/* ratchet-allow: the anti-pattern rendered on purpose, so a reader sees the one-pixel drift it causes. */}
        <div className="flex h-[27px] items-center rounded-[5px] border border-border px-[11px]">
          <span className="label">27px control</span>
        </div>
      </div>
    ),
    roles: ["--control-*", "--radius-*", "--z-*", "--text-*", "--duration-*"],
  },
  {
    title: "Motion by springs and restraint",
    rule: "Things that move use a spring. Things that appear use a short ease. The most frequent surface, the command palette, does not animate at all.",
    why: "Motion should explain where something came from, then get out of the way. Long or bouncy motion on frequent actions reads as latency, so menus get a short scale-in and nothing more.",
    good: (
      <div className="flex flex-col items-start gap-2">
        <button
          type="button"
          className="label rounded-sm border border-border px-2.5 py-1 transition-colors duration-fast ease-out-strong hover:bg-element-hover"
        >
          Hover me: 120ms
        </button>
        <span className="caption">Colour eases in. Nothing moves.</span>
      </div>
    ),
    bad: (
      <div className="flex flex-col items-start gap-2">
        <button
          type="button"
          className="label rounded-sm border border-border px-2.5 py-1 transition-transform duration-700 hover:scale-125 hover:-rotate-3"
        >
          Hover me: 700ms
        </button>
        <span className="caption">A hover that jumps and lingers.</span>
      </div>
    ),
    roles: ["duration-fast", "duration-base", "ease-out-strong", "SPRING_INDICATOR", "SPRING_RAIL"],
  },
];

function Example({ kind, children }: { kind: "do" | "dont"; children: ReactNode }) {
  return (
    <figure className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-md border border-border">
      <div className="flex min-h-36 items-center justify-center bg-background p-5">{children}</div>
      <figcaption
        className={cn(
          "label flex items-center gap-1.5 border-t border-border bg-card px-3 py-1.5",
          kind === "do" ? "text-success" : "text-error",
        )}
      >
        <Icon icon={kind === "do" ? CircleCheck : TriangleAlert} size="sm" />
        {kind === "do" ? "Do" : "Don't"}
      </figcaption>
    </figure>
  );
}

function PrinciplesPage() {
  return (
    <Page
      title="Principles"
      status={
        <span className="label inline-flex w-fit items-center gap-1.5 rounded-full border border-warning px-2.5 py-0.5 text-warning">
          <Icon icon={TriangleAlert} size="sm" />
          Draft — awaiting sign-off
        </span>
      }
      lede="How Atlas looks, in eight rules. Each has the reason behind it, an example of getting it right and wrong, and the tokens that carry it. The examples use live tokens, so try them in another theme from the toolbar."
    >
      <ol className="flex flex-col gap-12">
        {PRINCIPLES.map((p, i) => (
          <li key={p.title} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="eyebrow">Principle {i + 1}</span>
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-md font-medium">{p.rule}</p>
              <p className="body max-w-2xl text-secondary-foreground">{p.why}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Example kind="do">{p.good}</Example>
              <Example kind="dont">{p.bad}</Example>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="caption mr-1">Roles</span>
              {p.roles.map((r) => (
                <code
                  key={r}
                  className="code rounded-sm bg-muted px-1.5 py-0.5 text-secondary-foreground"
                >
                  {r}
                </code>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Page>
  );
}

const meta = {
  title: "Foundations/Principles",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
export const Page_: StoryObj = { name: "Page", render: () => <PrinciplesPage /> };
