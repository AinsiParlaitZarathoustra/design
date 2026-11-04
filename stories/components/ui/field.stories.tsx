import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../../../src/components/ui/checkbox.tsx";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "../../../src/components/ui/field.tsx";
import { Input } from "../../../src/ui/input.tsx";

interface DemoProps {
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal" | "responsive";
}

function Demo({
  label = "Session name",
  description = "Shows in the sidebar and in shared links.",
  error,
  disabled = false,
  orientation = "vertical",
}: DemoProps) {
  return (
    <div className="w-80">
      <Field orientation={orientation} data-invalid={!!error} data-disabled={disabled}>
        <FieldLabel htmlFor="name">{label}</FieldLabel>
        <Input
          id="name"
          defaultValue="Refactor settings"
          disabled={disabled}
          aria-invalid={!!error}
        />
        {description && <FieldDescription>{description}</FieldDescription>}
        <FieldError>{error}</FieldError>
      </Field>
    </div>
  );
}

const meta = {
  title: "Components/Field",
  component: Demo,
  args: { disabled: false, orientation: "vertical" },
  argTypes: {
    orientation: { control: "inline-radio", options: ["vertical", "horizontal", "responsive"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Form layout: `Field` pairs a `FieldLabel`, a control, a `FieldDescription` and a `FieldError`. `FieldSet` + `FieldLegend` group fields; `FieldGroup` stacks them; `FieldSeparator` divides; `FieldContent` + `FieldTitle` make a choice card.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const ErrorState: Story = {
  name: "Error",
  args: { error: "A session name can't be empty." },
};
export const LongText: Story = {
  args: {
    label: "The name everyone in the organisation sees for this session",
    description:
      "Shows in the sidebar, in shared links, in search, and in the weekly digest. Renaming a session does not break links that were already shared.",
    error: "A session with this name already exists in the project. Pick another name.",
  },
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-80">
      <Field orientation="horizontal">
        <Checkbox id="share" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="share">Share with the team</FieldLabel>
          <FieldDescription>Everyone in Acme can read it.</FieldDescription>
        </FieldContent>
      </Field>
    </div>
  ),
};

export const Form: Story = {
  render: () => (
    <form className="w-96" onSubmit={(e) => e.preventDefault()}>
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldDescription>How teammates see you.</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="f-name">Name</FieldLabel>
            <Input id="f-name" defaultValue="Ada Lovelace" />
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="f-email">Email</FieldLabel>
            <Input id="f-email" defaultValue="ada@" aria-invalid />
            <FieldError errors={[{ message: "Enter a full email address." }]} />
          </Field>
          <FieldSeparator>Notifications</FieldSeparator>
          <Field orientation="horizontal">
            <Checkbox id="f-mentions" defaultChecked />
            <FieldLabel htmlFor="f-mentions">Mentions</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="f-digest" />
            <FieldLabel htmlFor="f-digest">Weekly digest</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  ),
};

/** A choice card: a `FieldLabel` wrapping a whole `Field`, titled with `FieldTitle`. */
export const ChoiceCard: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-2">
      {[
        { id: "c-private", title: "Private", body: "Only you can open it.", checked: true },
        { id: "c-shared", title: "Shared", body: "Everyone in Acme can read it.", checked: false },
      ].map((c) => (
        <FieldLabel key={c.id} htmlFor={c.id}>
          <Field orientation="horizontal">
            <Checkbox id={c.id} defaultChecked={c.checked} />
            <FieldContent>
              <FieldTitle>{c.title}</FieldTitle>
              <FieldDescription>{c.body}</FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      ))}
    </div>
  ),
};

/** Several errors at once collapse into a list. */
export const ManyErrors: Story = {
  render: () => (
    <div className="w-80">
      <Field data-invalid>
        <FieldLabel htmlFor="pw">Key</FieldLabel>
        <Input id="pw" defaultValue="sk-" aria-invalid />
        <FieldError
          errors={[
            { message: "Keys are at least 40 characters." },
            { message: "This key was revoked." },
            { message: "Keys are at least 40 characters." },
          ]}
        />
      </Field>
    </div>
  ),
};
