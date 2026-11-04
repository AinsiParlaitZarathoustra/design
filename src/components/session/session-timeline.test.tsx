// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  attachmentsTurn,
  cancelledSession,
  editRunTurn,
  erroredSession,
  hugeTurnsSession,
  longAnswerTurn,
  longSession,
  manyToolCallsSession,
  planSession,
  truncatedBodiesTurn,
  webShapedSession,
} from "../../../stories/components/session/fixtures.ts";
import { SessionPipeline } from "./session-pipeline.tsx";
import { SessionTimeline } from "./session-timeline.tsx";
import type { SessionPhase } from "./session-view.ts";
import { TurnRow } from "./turn-row.tsx";

afterEach(cleanup);

describe("SessionTimeline", () => {
  it.each<[SessionPhase, string]>([
    ["queued", "Session queued"],
    ["running", "Session running"],
    ["waiting", "Waiting for you"],
    ["done", "Session complete"],
    ["failed", "Session failed"],
    ["cancelled", "Session cancelled"],
  ])("heads a %s session with %s", (phase, heading) => {
    render(<SessionTimeline session={{ ...longSession(1), phase }} />);
    expect(screen.getByText(heading)).toBeTruthy();
  });

  it("renders a session error as an alert", () => {
    render(
      <SessionTimeline
        session={{
          ...longSession(1),
          error: { message: "Agent disconnected", kind: "disconnected" },
        }}
      />,
    );
    expect(screen.getByRole("alert").textContent).toContain("Agent disconnected");
  });

  it("leaves the head out with heading={false}, but keeps a session error", () => {
    render(
      <SessionTimeline
        heading={false}
        session={{
          ...longSession(1),
          meta: { title: "Sort pinned sessions" },
          error: { message: "Agent disconnected", kind: "disconnected" },
        }}
      />,
    );
    expect(screen.queryByText("Session complete")).toBeNull();
    expect(screen.queryByText("Sort pinned sessions")).toBeNull();
    expect(screen.getByRole("alert").textContent).toContain("Agent disconnected");
  });

  it("puts agentMark on the node of a turn the agent started, and only there", () => {
    const session = longSession(2);
    session.turns[1] = { ...session.turns[1]!, user: undefined };
    render(<SessionTimeline session={session} agentMark={<i data-testid="mark" />} />);
    expect(screen.getAllByTestId("mark")).toHaveLength(1);
  });

  it("renders a turn per TurnView, keyed", () => {
    const { container } = render(<SessionTimeline session={longSession(5)} />);
    const rows = container.querySelectorAll('[data-slot="turn-row"]');
    expect([...rows].map((r) => r.getAttribute("data-turn-key"))).toEqual([
      "t0",
      "t1",
      "t2",
      "t3",
      "t4",
    ]);
  });
});

describe("SessionTimeline forwarding", () => {
  it("passes TurnRow's opt-in props through to each row", () => {
    const onLoadBody = vi.fn();
    const footers: string[] = [];
    const session = { ...longSession(1), turns: [truncatedBodiesTurn()] };
    render(
      <SessionTimeline
        session={session}
        onLoadBody={onLoadBody}
        renderItemFooter={(item) => {
          footers.push(item.kind === "tool" ? item.call.id : item.id);
          return null;
        }}
      />,
    );
    fireEvent.click(screen.getAllByRole("button", { name: /^Read the rest/ })[1]!);
    expect(onLoadBody).toHaveBeenCalledWith("tb:answer");
    expect(footers).toEqual(expect.arrayContaining(["tb:prompt", "tb:answer"]));
  });

  it("draws renderCheckpointFooter under each checkpoint", () => {
    render(
      <SessionTimeline
        session={webShapedSession()}
        renderCheckpointFooter={(c) => <p>{`footer:${c.id}`}</p>}
      />,
    );
    expect(screen.getByText("footer:e6")).toBeTruthy();
    expect(screen.getByText("footer:e7")).toBeTruthy();
  });

  it("opens a folded run held in openToolRunIds", () => {
    const { container } = render(
      <SessionTimeline session={manyToolCallsSession(12)} openToolRunIds={new Set(["many:6"])} />,
    );
    expect(container.querySelectorAll('[data-slot="tool-call-card"]')).toHaveLength(12);
  });
});

describe("SessionTimeline revealItemId", () => {
  const deep = () => {
    const base = hugeTurnsSession(400);
    base.turns[300] = {
      ...base.turns[300]!,
      checkpoints: [{ id: "deep:cp", commitSha: "7c1e9a04b2d5", subject: "Deep commit" }],
    };
    return base;
  };
  const rows = (container: HTMLElement) =>
    container.querySelectorAll('[data-slot="turn-row"]').length;

  it("draws only the window without it", () => {
    const { container } = render(<SessionTimeline session={deep()} />);
    expect(rows(container)).toBeLessThan(300);
    expect(screen.queryByText("Deep commit")).toBeNull();
  });

  it.each([
    ["a checkpoint", "deep:cp"],
    ["a prompt", "h350:user"],
    ["an answer", "h399:answer"],
  ])("draws the turn holding %s past the window", (_, id) => {
    const { container } = render(<SessionTimeline session={deep()} revealItemId={id} />);
    expect(
      container.querySelector(`[data-comment-anchor="${id}"], [data-slot="checkpoint"]`),
    ).not.toBeNull();
    expect(rows(container)).toBeGreaterThan(300);
  });

  it("unfolds an uncontrolled run holding the revealed call", () => {
    const { container, rerender } = render(<SessionTimeline session={manyToolCallsSession(12)} />);
    expect(container.querySelector('[data-tool-call-id="many:9"]')).toBeNull();
    rerender(<SessionTimeline session={manyToolCallsSession(12)} revealItemId="many:9" />);
    expect(container.querySelector('[data-tool-call-id="many:9"]')).not.toBeNull();
  });

  it("draws a revealed call past its run's window", () => {
    const session = manyToolCallsSession(150);
    const open = new Set(["many:0"]);
    const { container, rerender } = render(
      <SessionTimeline session={session} openToolRunIds={open} />,
    );
    expect(container.querySelector('[data-tool-call-id="many:140"]')).toBeNull();
    rerender(<SessionTimeline session={session} openToolRunIds={open} revealItemId="many:140" />);
    expect(container.querySelector('[data-tool-call-id="many:140"]')).not.toBeNull();
  });
});

describe("TurnRow", () => {
  it("says Truncated without onLoadBody, as before", () => {
    render(<TurnRow turn={truncatedBodiesTurn()} />);
    expect(screen.getAllByText("Truncated")).toHaveLength(2);
    expect(screen.queryByRole("button", { name: /Read the rest/ })).toBeNull();
  });

  it("offers Read the rest on a truncated prompt and answer, with the size", () => {
    const onLoadBody = vi.fn();
    render(<TurnRow turn={truncatedBodiesTurn()} onLoadBody={onLoadBody} />);
    const [prompt, answer] = screen.getAllByRole("button", { name: /^Read the rest/ });
    expect(prompt!.textContent).toBe("Read the rest · 47.2 KB");
    fireEvent.click(prompt!);
    fireEvent.click(answer!);
    expect(onLoadBody.mock.calls).toEqual([["tb:prompt"], ["tb:answer"]]);
    expect(screen.queryByText("Truncated")).toBeNull();
  });

  it("disables Read the rest while loading and offers a retry after a failure", () => {
    const onLoadBody = vi.fn();
    render(
      <TurnRow
        turn={truncatedBodiesTurn({ user: "loading", answer: "failed" })}
        onLoadBody={onLoadBody}
      />,
    );
    const loading = screen.getByRole("button", { name: /^Read the rest/ });
    expect(loading.getAttribute("aria-disabled")).toBe("true");
    expect(loading.getAttribute("aria-busy")).toBe("true");
    fireEvent.click(loading);
    expect(onLoadBody).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Couldn't load the rest, retry" }));
    expect(onLoadBody).toHaveBeenCalledWith("tb:answer");
  });

  it("drops Read the rest once the body is whole", () => {
    const whole = truncatedBodiesTurn();
    whole.user = { ...whole.user!, truncated: false };
    whole.items = whole.items.map((i) => (i.kind === "text" ? { ...i, truncated: false } : i));
    render(<TurnRow turn={whole} onLoadBody={() => {}} />);
    expect(screen.queryByRole("button", { name: /Read the rest/ })).toBeNull();
  });

  it("leaves a run folded and closed to the host's set, and reports toggles", () => {
    const changes: string[][] = [];
    const turn = manyToolCallsSession(12).turns[0]!;
    const onChange = (next: ReadonlySet<string>) => changes.push([...next]);
    const { container, rerender } = render(
      <TurnRow turn={turn} openToolRunIds={new Set()} onOpenToolRunIdsChange={onChange} />,
    );
    const head = () => container.querySelector("button[aria-expanded]")!;
    expect(head().getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(head());
    // Controlled: nothing opens until the host passes the new set.
    expect(container.querySelectorAll('[data-slot="tool-call-card"]')).toHaveLength(0);
    expect(changes).toEqual([["many:0"]]);

    rerender(
      <TurnRow
        turn={turn}
        openToolRunIds={new Set(["many:6", "other"])}
        onOpenToolRunIdsChange={onChange}
      />,
    );
    expect(head().getAttribute("aria-expanded")).toBe("true");
    expect(container.querySelectorAll('[data-slot="tool-call-card"]')).toHaveLength(12);
    fireEvent.click(head());
    expect(changes[1]).toEqual(["other"]);
  });

  it("clamps a long answer only with clampResponses, and never a streaming one", () => {
    const spy = vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(900);
    try {
      const turn = longAnswerTurn();
      const { container, rerender } = render(<TurnRow turn={turn} />);
      expect(container.querySelector('[data-slot="response-clamp"]')).toBeNull();
      rerender(<TurnRow turn={turn} clampResponses />);
      const clampButtons = () =>
        container.querySelectorAll('[data-slot="response-clamp"] button[aria-expanded]');
      // The prompt has its own "Show more"; these are the answers'.
      expect(clampButtons()).toHaveLength(2);
      rerender(
        <TurnRow
          turn={{ ...turn, outcome: undefined }}
          clampResponses
          streaming={{ itemId: "la:answer" }}
        />,
      );
      expect(clampButtons()).toHaveLength(1);
    } finally {
      spy.mockRestore();
    }
  });

  it("sums a folded run's files and lines with toolRunSummary files", () => {
    const { container, rerender } = render(<TurnRow turn={editRunTurn()} />);
    const line = () => container.querySelector("button[aria-expanded]")!.textContent;
    expect(line()).toContain("4 edited · 3 read · 1 ran · 1 searched");
    rerender(<TurnRow turn={editRunTurn()} toolRunSummary="files" />);
    // The failed edit adds neither its file nor its lines.
    expect(line()).toContain("2 modified · 3 read");
    expect(line()).toContain("+27−9");
  });

  it("asks an expired sign-in to sign in again, with the app's action", () => {
    const turn = erroredSession().turns.at(-1)!;
    render(<TurnRow turn={turn} errorAction={<button type="button">Sign in</button>} />);
    expect(screen.getByRole("alert").textContent).toContain("Sign in again to continue");
    expect(screen.getByRole("button", { name: "Sign in" })).toBeTruthy();
  });

  it("marks a cancelled turn", () => {
    render(<TurnRow turn={cancelledSession().turns.at(-1)!} />);
    expect(screen.getByText("Cancelled")).toBeTruthy();
  });

  it("folds a run of more than three calls behind one line", () => {
    const { container } = render(<TurnRow turn={manyToolCallsSession(12).turns[0]!} />);
    expect(container.querySelectorAll('[data-slot="tool-call-card"]')).toHaveLength(0);
    fireEvent.click(container.querySelector('button[aria-expanded="false"]')!);
    expect(container.querySelectorAll('[data-slot="tool-call-card"]')).toHaveLength(12);
  });

  it("anchors comments to the prompt, the answers, the thinking, the calls and the checkpoints", () => {
    const anchors: string[] = [];
    render(
      <TurnRow
        turn={webShapedSession().turns[0]!}
        commentSlot={(anchor) => {
          anchors.push(`${anchor.kind}:${anchor.id}`);
          return null;
        }}
      />,
    );
    expect(new Set(anchors)).toEqual(
      new Set([
        "message:e1",
        // A thought is a message too, and takes comments beside its disclosure.
        "message:e2",
        "message:e5",
        "tool_call:e3",
        "tool_call:e4",
        "checkpoint:e6",
        "checkpoint:e7",
      ]),
    );
  });

  it("hides an orphaned checkpoint's branch and caps its files at 12", () => {
    const { container } = render(<TurnRow turn={webShapedSession().turns[0]!} />);
    const [linked, orphaned] = container.querySelectorAll('[data-slot="checkpoint"]');
    expect(linked!.textContent).toContain("+3 more");
    expect(linked!.textContent).toContain("uzayermasud/pinned-first");
    expect(orphaned!.textContent).toContain("Orphaned");
    expect(orphaned!.textContent).not.toContain("uzayermasud/pinned-first");
  });

  it("shows image attachments and file chips", () => {
    const { container } = render(<TurnRow turn={attachmentsTurn} />);
    expect(container.querySelectorAll("img")).toHaveLength(2);
    expect(screen.getByText("sidebar-spec.pdf")).toBeTruthy();
  });
});

describe("SessionPipeline", () => {
  it("uses the plan's steps when there is a plan", () => {
    const { container } = render(<SessionPipeline session={planSession()} />);
    expect(container.querySelectorAll("[data-state]")).toHaveLength(6);
    expect(
      screen
        .getByText("Write StreamingMarkdown")
        .closest("[data-state]")!
        .getAttribute("data-state"),
    ).toBe("running");
  });

  it("uses the tool calls when there is no plan", () => {
    const { container } = render(<SessionPipeline session={manyToolCallsSession(12)} />);
    expect(container.querySelectorAll("[data-state]")).toHaveLength(12);
    expect(container.querySelector('[data-state="failed"]')).not.toBeNull();
  });

  it("says when there are no steps", () => {
    render(<SessionPipeline session={{ meta: {}, phase: "queued", turns: [] }} />);
    expect(screen.getByText("No steps yet")).toBeTruthy();
  });
});
