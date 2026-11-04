// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { SCRIM_BLUR } from "../../ui/scrim.ts";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "./alert-dialog.tsx";

afterEach(cleanup);

function open(props: React.ComponentProps<typeof AlertDialogContent>) {
  render(
    <AlertDialog defaultOpen>
      <AlertDialogContent {...props}>
        <AlertDialogTitle>Discard changes?</AlertDialogTitle>
        <AlertDialogCancel>Keep editing</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>,
  );
  return {
    scrim: document.querySelector<HTMLElement>('[data-slot="alert-dialog-overlay"]')!,
    layer: document.querySelector<HTMLElement>('[data-slot="alert-dialog-backdrop-close"]'),
  };
}

describe("AlertDialogContent blur and dismissOnBackdrop", () => {
  it("by default: a clear scrim and no backdrop close", () => {
    const { scrim, layer } = open({});
    expect(scrim.className).not.toContain("backdrop-blur");
    expect(layer).toBeNull();
  });

  it("blur frosts the scrim with the class Dialog uses", () => {
    const { scrim } = open({ blur: true });
    expect(scrim.className).toContain(SCRIM_BLUR);
  });

  it("dismissOnBackdrop adds a hidden, untabbable close layer that closes the dialog", async () => {
    const { layer } = open({ dismissOnBackdrop: true });
    expect(layer).not.toBeNull();
    expect(layer!.getAttribute("aria-hidden")).toBe("true");
    expect(layer!.tabIndex).toBe(-1);
    expect(screen.getByRole("alertdialog")).toBeTruthy();
    fireEvent.click(layer!);
    await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
  });
});
