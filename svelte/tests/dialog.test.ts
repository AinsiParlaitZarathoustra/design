import { fireEvent, render, waitFor, within } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import DialogDemo from "./fixtures/dialog-demo.svelte";

async function openDialog() {
  const view = render(DialogDemo, { props: {} });
  const trigger = view.getByRole("button", { name: "Open dialog" });
  trigger.focus();
  await fireEvent.click(trigger);
  const dialog = await view.findByRole("dialog");
  return { ...view, trigger, dialog };
}

describe("Dialog", () => {
  it("opens from its trigger with the title and description wired to the panel", async () => {
    const { dialog, getByRole } = await openDialog();
    const title = getByRole("heading", { name: "Rename session" });
    const description = getByRole("paragraph");
    expect(dialog).toHaveAttribute("aria-labelledby", title.id);
    expect(dialog).toHaveAttribute("aria-describedby", description.id);
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("data-slot", "dialog-content");
    expect(dialog.className).toContain("z-modal");
    expect(dialog.className).toContain("max-w-[min(32rem,calc(100vw-2rem))]");
    const scrim = document.querySelector('[data-slot="dialog-overlay"]')!;
    expect(scrim.className).toContain("scrim");
    expect(scrim.className).toContain("z-overlay");
  });

  it("focuses the first control and restores focus to the trigger on close", async () => {
    const { trigger, getByRole } = await openDialog();
    const input = getByRole("textbox", { name: "Name" });
    await waitFor(() => expect(input).toHaveFocus());
    await fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(document.querySelector('[role="dialog"]')).toBeNull(), {
      timeout: 1500,
    });
    expect(trigger).toHaveFocus();
  });

  it("closes on the scrim and on the close button, and traps Tab between the edges", async () => {
    await openDialog();
    const scrim = document.querySelector('[data-slot="dialog-overlay"]')!;
    await fireEvent.click(scrim);
    await waitFor(() => expect(document.querySelector('[role="dialog"]')).toBeNull(), {
      timeout: 1500,
    });

    const second = render(DialogDemo, { props: {} });
    // The panel is portalled to <body>, outside the render container; the
    // trigger is inside it. Only one dialog is open at this point.
    await fireEvent.click(within(second.container).getByRole("button", { name: "Open dialog" }));
    await within(document.body).findByRole("dialog");
    const close = within(document.body).getByRole("button", { name: "Close" });
    const input = within(document.body).getByRole("textbox", { name: "Name" });
    close.focus();
    await fireEvent.keyDown(close, { key: "Tab" });
    expect(input).toHaveFocus();
    await fireEvent.keyDown(input, { key: "Tab", shiftKey: true });
    expect(close).toHaveFocus();
    await fireEvent.click(close);
    await waitFor(() => expect(document.querySelector('[role="dialog"]')).toBeNull(), {
      timeout: 1500,
    });
  });

  it("shows the close square only when asked", async () => {
    const view = render(DialogDemo, { props: { defaultOpen: true, showCloseButton: false } });
    const dialog = await view.findByRole("dialog");
    expect(dialog).not.toBeNull();
    expect(view.queryByRole("button", { name: "Close" })).toBeNull();
  });

  it("carries size and blur onto the panel and the scrim", async () => {
    const view = render(DialogDemo, { props: { defaultOpen: true, size: "lg", blur: true } });
    const dialog = await view.findByRole("dialog");
    expect(dialog).toHaveAttribute("data-size", "lg");
    expect(dialog.className).toContain("max-w-[min(44rem,calc(100vw-2rem))]");
    const scrim = document.querySelector('[data-slot="dialog-overlay"]')!;
    expect(scrim.className).toContain("backdrop-blur-sm");
  });

  it("reports every open and close through onOpenChange", async () => {
    const onOpenChange = vi.fn();
    const view = render(DialogDemo, { props: { onOpenChange } });
    await fireEvent.click(view.getByRole("button", { name: "Open dialog" }));
    await view.findByRole("dialog");
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    await fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(onOpenChange).toHaveBeenLastCalledWith(false), { timeout: 1500 });
  });
});
