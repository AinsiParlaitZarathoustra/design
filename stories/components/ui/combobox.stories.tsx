import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "../../../src/components/ui/combobox.tsx";
import { Button } from "../../../src/ui/button.tsx";
import { expectPopupExit } from "../../lib/popup-exit.ts";

const PROJECTS = ["atlas", "design", "server", "docs", "mobile", "landing"];
const MANY = Array.from({ length: 40 }, (_, i) => `project-${String(i + 1).padStart(2, "0")}`);

interface DemoProps {
  defaultOpen?: boolean;
  items?: string[];
  disabled?: boolean;
  showClear?: boolean;
  placeholder?: string;
  defaultInputValue?: string;
}

function Demo({
  defaultOpen = false,
  items = PROJECTS,
  disabled = false,
  showClear = false,
  placeholder = "Pick a project",
  defaultInputValue,
}: DemoProps) {
  return (
    <div className="min-h-80 w-64">
      <Combobox
        items={items}
        defaultOpen={defaultOpen}
        disabled={disabled}
        defaultInputValue={defaultInputValue}
      >
        <ComboboxInput placeholder={placeholder} showClear={showClear} disabled={disabled} />
        <ComboboxContent>
          <ComboboxEmpty>No project matches</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

const meta = {
  title: "Components/Combobox",
  component: Demo,
  args: { defaultOpen: false, disabled: false, showClear: false },
  argTypes: { items: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "A filterable choice (Base UI's `Combobox`) in an `InputGroup`. The popup is the menu surface: `rounded-lg`, `shadow-md`, `z-popover`. `ComboboxChips` is the multi-select form.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = {
  args: { defaultOpen: true },
  tags: ["!autodocs"],
};
export const WithClear: Story = { args: { showClear: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Empty: Story = {
  args: { defaultOpen: true, defaultInputValue: "zzz" },
  tags: ["!autodocs"],
};
export const ManyItems: Story = {
  args: { defaultOpen: true, items: MANY },
  tags: ["!autodocs"],
};
export const LongText: Story = {
  args: {
    defaultOpen: true,
    items: ["A project name long enough to run past the edge of the popup", "atlas", "design"],
  },
  tags: ["!autodocs"],
};

const GROUPS = [
  { value: "Yours", items: ["atlas", "design"] },
  { value: "Shared with you", items: ["server", "docs"] },
];

/** Groups with labels and a separator, via `ComboboxGroup` and `ComboboxCollection`. */
export const Grouped: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="min-h-80 w-64">
      <Combobox items={GROUPS} defaultOpen>
        <ComboboxInput placeholder="Pick a project" />
        <ComboboxContent>
          <ComboboxEmpty>No project matches</ComboboxEmpty>
          <ComboboxList>
            {(group: (typeof GROUPS)[number], index: number) => (
              <ComboboxGroup key={group.value} items={group.items}>
                {index > 0 && <ComboboxSeparator />}
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};

/** A button trigger showing the current value, via `ComboboxTrigger` and `ComboboxValue`. */
export const ButtonTrigger: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="min-h-80 w-64">
      <Combobox items={PROJECTS} defaultValue="design" defaultOpen>
        <ComboboxTrigger aria-label="Project" render={<Button variant="outline" />}>
          <ComboboxValue />
        </ComboboxTrigger>
        <ComboboxContent aria-label="Projects">
          <ComboboxInput placeholder="Search" showTrigger={false} />
          <ComboboxEmpty>No project matches</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};

function ChipsDemo({ open }: { open?: boolean }) {
  const anchor = useComboboxAnchor();
  return (
    <div className="min-h-80 w-80">
      <Combobox items={PROJECTS} multiple defaultValue={["atlas", "design"]} defaultOpen={open}>
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(values: string[]) => (
              <>
                {values.map((v) => (
                  <ComboboxChip key={v}>{v}</ComboboxChip>
                ))}
                <ComboboxChipsInput
                  aria-label="Projects"
                  placeholder={values.length ? "" : "Attach projects"}
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No project matches</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

/** Multi-select: chips inside the field, the popup anchored to the whole field. */
export const Chips: Story = { render: () => <ChipsDemo /> };
export const ChipsOpen: Story = { render: () => <ChipsDemo open />, tags: ["!autodocs"] };
/** Closing plays the entrance backwards (`scale-out`, 120ms), then unmounts.
 *  Under reduced motion it only fades. */
export const Exit: Story = {
  args: { defaultOpen: true },
  tags: ["!autodocs"],
  play: () => expectPopupExit("combobox-content"),
};
