import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import InputDemo from "./fixtures/input-demo.svelte";
import Input from "../src/ui/input.svelte";

describe("Input", () => {
  it("is one text input with the size recipe and the input surface token", () => {
    const { getByRole } = render(Input, { props: { placeholder: "Search sessions" } });
    const input = getByRole("textbox");
    expect(input).toHaveAttribute("data-slot", "input");
    expect(input).toHaveAttribute("type", "text");
    expect(input.className).toContain("bg-panel-input");
    expect(input.className).toContain("h-control-md");
    expect(input.className).toContain("aria-invalid:border-destructive");
  });

  it("lifts the border on focus through the shared ring and the strong border", () => {
    const { getByRole } = render(Input);
    const input = getByRole("textbox");
    expect(input.className).toContain("focus:border-border-strong");
  });

  it("seeds defaultValue once, and bind:value follows typing", async () => {
    const { getByRole, getByTestId } = render(InputDemo, { props: { initial: "atlas/design" } });
    const input = getByRole("textbox");
    expect((input as HTMLInputElement).value).toBe("atlas/design");
    await fireEvent.input(input, { target: { value: "atlas/design/svelte" } });
    expect((input as HTMLInputElement).value).toBe("atlas/design/svelte");
    expect(getByTestId("mirror")).toHaveTextContent("atlas/design/svelte");
  });

  it("keeps the native contract: invalid, disabled and named", () => {
    const { getByRole } = render(Input, {
      props: { "aria-invalid": "true", disabled: true, "aria-label": "Name", size: "lg" },
    });
    const input = getByRole("textbox", { name: "Name" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toBeDisabled();
    expect(input.className).toContain("h-control-lg");
  });
});
