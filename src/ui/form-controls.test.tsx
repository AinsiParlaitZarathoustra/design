// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Segmented, type SegmentedOption } from "./segmented.tsx";
import { Select } from "./select.tsx";
import { Switch } from "./switch.tsx";

afterEach(cleanup);

describe("Switch", () => {
  it("reports the next state", () => {
    const onCheckedChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={onCheckedChange} aria-label="Wrap" />);
    const control = screen.getByRole("switch", { name: "Wrap" });
    expect(control.getAttribute("aria-checked")).toBe("false");
    fireEvent.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("is mixed to assistive tech, and a click turns it on", () => {
    const onCheckedChange = vi.fn();
    render(<Switch checked mixed onCheckedChange={onCheckedChange} aria-label="Wrap" />);
    const control = screen.getByRole("switch", { name: "Wrap" });
    expect(control.getAttribute("aria-checked")).toBe("mixed");
    fireEvent.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("ignores clicks while disabled", () => {
    const onCheckedChange = vi.fn();
    render(<Switch checked disabled onCheckedChange={onCheckedChange} aria-label="Wrap" />);
    fireEvent.click(screen.getByRole("switch", { name: "Wrap" }));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  describe('appearance="check"', () => {
    it("is a switch row named by its children, with a check only when on", () => {
      const onCheckedChange = vi.fn();
      const { rerender } = render(
        <Switch appearance="check" checked={false} onCheckedChange={onCheckedChange}>
          Extended thinking
        </Switch>,
      );
      const row = screen.getByRole("switch", { name: "Extended thinking" });
      expect(row.querySelector('[data-slot="switch-check"]')).toBeNull();
      expect(row.querySelector('[data-slot="switch-thumb"]')).toBeNull();
      fireEvent.click(row);
      expect(onCheckedChange).toHaveBeenCalledWith(true);

      rerender(
        <Switch appearance="check" checked onCheckedChange={onCheckedChange}>
          Extended thinking
        </Switch>,
      );
      expect(row.getAttribute("aria-checked")).toBe("true");
      expect(row.querySelector('[data-slot="switch-check"]')).not.toBeNull();
    });

    it("keeps the mixed state and turns on from it", () => {
      const onCheckedChange = vi.fn();
      render(
        <Switch appearance="check" checked mixed onCheckedChange={onCheckedChange}>
          Wrap
        </Switch>,
      );
      const row = screen.getByRole("switch", { name: "Wrap" });
      expect(row.getAttribute("aria-checked")).toBe("mixed");
      expect(row.querySelector('[data-slot="switch-check"]')).toBeNull();
      fireEvent.click(row);
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
  });
});

const MODES = [
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
] as const;

describe("Select", () => {
  it("shows the selected option's label, not its value", () => {
    render(<Select value="dark" onValueChange={() => {}} options={MODES} aria-label="Mode" />);
    const trigger = screen.getByRole("combobox", { name: "Mode" });
    expect(trigger.textContent).toContain("Dark");
  });

  it("shows the placeholder while nothing is chosen", () => {
    render(
      <Select
        value={null}
        onValueChange={() => {}}
        options={MODES}
        placeholder="Mixed"
        aria-label="Mode"
      />,
    );
    expect(screen.getByRole("combobox", { name: "Mode" }).textContent).toContain("Mixed");
  });

  it("replaces the placeholder with the chosen option's label", () => {
    const { rerender } = render(
      <Select
        value={null}
        onValueChange={() => {}}
        options={MODES}
        placeholder="Choose a mode"
        aria-label="Mode"
      />,
    );
    rerender(
      <Select
        value="light"
        onValueChange={() => {}}
        options={MODES}
        placeholder="Choose a mode"
        aria-label="Mode"
      />,
    );
    const trigger = screen.getByRole("combobox", { name: "Mode" });
    expect(trigger.textContent).toContain("Light");
    expect(trigger.textContent).not.toContain("Choose a mode");
  });

  it("falls back to the placeholder when the value matches no option", () => {
    render(
      <Select
        value={"gone" as "dark"}
        onValueChange={() => {}}
        options={MODES}
        placeholder="Mixed"
        aria-label="Mode"
      />,
    );
    expect(screen.getByRole("combobox", { name: "Mode" }).textContent).toContain("Mixed");
  });

  it("puts id on the trigger, so a label's htmlFor names it", () => {
    render(
      <>
        <label htmlFor="mode">Appearance</label>
        <Select id="mode" value="dark" onValueChange={() => {}} options={MODES} />
      </>,
    );
    const trigger = screen.getByRole("combobox", { name: "Appearance" });
    expect(trigger.id).toBe("mode");
  });

  it("passes aria-describedby and aria-invalid to the trigger", () => {
    render(
      <Select
        value={null}
        onValueChange={() => {}}
        options={MODES}
        aria-label="Mode"
        aria-describedby="mode-error"
        aria-invalid
      />,
    );
    const trigger = screen.getByRole("combobox", { name: "Mode" });
    expect(trigger.getAttribute("aria-describedby")).toBe("mode-error");
    expect(trigger.getAttribute("aria-invalid")).toBe("true");
  });

  it("shows the empty slot when there are no options", async () => {
    render(
      <Select
        value={null}
        onValueChange={() => {}}
        options={[]}
        placeholder="Add someone"
        empty="Everyone is already here."
        aria-label="Person"
      />,
    );
    fireEvent.click(screen.getByRole("combobox", { name: "Person" }));
    expect(await screen.findByText("Everyone is already here.")).toBeTruthy();
  });
});

describe("Segmented", () => {
  it("is a radio group with one tab stop, and arrows move the selection", () => {
    const onValueChange = vi.fn();
    render(
      <Segmented value="system" onValueChange={onValueChange} options={MODES} aria-label="Mode" />,
    );
    expect(screen.getByRole("radiogroup", { name: "Mode" })).toBeTruthy();
    const radios = screen.getAllByRole("radio");
    expect(radios.map((radio) => radio.tabIndex)).toEqual([0, -1, -1]);
    expect(radios[0].getAttribute("aria-checked")).toBe("true");

    fireEvent.keyDown(radios[0], { key: "ArrowRight" });
    expect(onValueChange).toHaveBeenLastCalledWith("dark");
    fireEvent.keyDown(radios[0], { key: "ArrowLeft" });
    expect(onValueChange).toHaveBeenLastCalledWith("light");
    fireEvent.click(radios[2]);
    expect(onValueChange).toHaveBeenLastCalledWith("light");
  });

  it("makes the first option the tab stop when the value matches none", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Segmented
        value={"custom" as "dark"}
        onValueChange={onValueChange}
        options={MODES}
        aria-label="Mode"
      />,
    );
    const radios = screen.getAllByRole("radio");
    expect(radios.map((radio) => radio.tabIndex)).toEqual([0, -1, -1]);
    expect(radios.every((radio) => radio.getAttribute("aria-checked") === "false")).toBe(true);

    fireEvent.keyDown(radios[0], { key: "ArrowRight" });
    expect(onValueChange).toHaveBeenLastCalledWith("dark");
    expect(document.activeElement).toBe(radios[1]);
    fireEvent.keyDown(radios[0], { key: "Home" });
    expect(onValueChange).toHaveBeenLastCalledWith("system");
    fireEvent.keyDown(radios[0], { key: "End" });
    expect(onValueChange).toHaveBeenLastCalledWith("light");

    // Choosing a preset moves the tab stop to it.
    rerender(
      <Segmented value="light" onValueChange={onValueChange} options={MODES} aria-label="Mode" />,
    );
    expect(radios.map((radio) => radio.tabIndex)).toEqual([-1, -1, 0]);
  });

  it("does not re-select the active option", () => {
    const onValueChange = vi.fn();
    render(
      <Segmented value="system" onValueChange={onValueChange} options={MODES} aria-label="Mode" />,
    );
    fireEvent.click(screen.getAllByRole("radio")[0]);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("takes node labels and keeps every option's accessible name", () => {
    render(
      <Segmented
        value="split"
        onValueChange={() => {}}
        aria-label="Layout"
        options={[
          // Named by what it shows.
          { value: "split", label: <span>Split</span> },
          // Named explicitly, over text that would read badly.
          { value: "unified", label: <span>Unified · 2</span>, ariaLabel: "Unified" },
          // Shows nothing but its icon; the string label is its name.
          { value: "stacked", label: "Stacked", icon: <svg />, iconOnly: true },
          // Icon-only with a node label: `ariaLabel` is its name and tooltip.
          { value: "wide", label: <b>Wide</b>, ariaLabel: "Wide", icon: <svg />, iconOnly: true },
        ]}
      />,
    );
    for (const name of ["Split", "Unified", "Stacked", "Wide"]) {
      expect(screen.getByRole("radio", { name })).toBeTruthy();
    }
    expect(screen.getByRole("radio", { name: "Wide" }).getAttribute("title")).toBe("Wide");
    expect(screen.getByRole("radio", { name: "Split" }).getAttribute("aria-label")).toBeNull();
  });

  it("will not type an icon-only option that has no name", () => {
    // @ts-expect-error an icon-only option with a node label needs `ariaLabel`
    const unnamed: SegmentedOption<"a"> = {
      value: "a",
      label: <b>A</b>,
      icon: <svg />,
      iconOnly: true,
    };
    expect(unnamed.value).toBe("a");
  });
});
