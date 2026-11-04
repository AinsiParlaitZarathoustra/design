import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowUp, Copy, Search, X } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../../../src/components/ui/input-group.tsx";
import { Icon } from "../../../src/ui/icon.tsx";
import { Kbd } from "../../../src/ui/kbd.tsx";

interface DemoProps {
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  invalid?: boolean;
}

function Demo({ placeholder = "Search sessions", defaultValue, disabled, invalid }: DemoProps) {
  return (
    <div className="w-80">
      <InputGroup data-disabled={disabled || undefined}>
        <InputGroupAddon>
          <Icon icon={Search} size="sm" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          aria-invalid={invalid || undefined}
        />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

const meta = {
  title: "Components/InputGroup",
  component: Demo,
  args: { placeholder: "Search sessions", disabled: false, invalid: false },
  parameters: {
    docs: {
      description: {
        component:
          "An input with things attached: a leading glyph, a trailing shortcut or button, a block of text above or below. One border around the lot, which strengthens while the control inside has focus.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Error: Story = { args: { invalid: true, defaultValue: "status:unknown" } };
export const LongText: Story = {
  args: {
    defaultValue:
      "sessions where the agent touched src/features/settings and the run failed after a checkpoint",
  },
};

export const WithButton: Story = {
  render: () => (
    <div className="w-80">
      <InputGroup>
        <InputGroupInput readOnly defaultValue="https://atlas.dev/s/7f3a9c" aria-label="Link" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Copy">
            <Copy />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="w-80">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput defaultValue="atlas.dev" aria-label="Domain" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Clear">
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/** A composer: the textarea grows; the actions sit in a block-end addon. */
export const Textarea: Story = {
  render: () => (
    <div className="w-96">
      <InputGroup>
        <InputGroupTextarea placeholder="Ask the agent to…" aria-label="Message" />
        <InputGroupAddon align="block-end">
          <InputGroupText>Balanced · 3 projects</InputGroupText>
          <InputGroupButton variant="default" size="icon-xs" className="ml-auto" aria-label="Send">
            <ArrowUp />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
