import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../src/components/ui/accordion.tsx";

const ITEMS = [
  {
    value: "scope",
    title: "What can the agent read?",
    body: "Every project attached to the session, read-only. It asks before it writes.",
  },
  {
    value: "cost",
    title: "How is usage counted?",
    body: "Tokens in and out, per session, billed to the organisation that owns the project.",
  },
  {
    value: "share",
    title: "Who sees a shared session?",
    body: "Everyone in the organisation. Private sessions stay with you.",
  },
];

interface DemoProps {
  multiple?: boolean;
  defaultValue?: string[];
  disabledItem?: boolean;
  longText?: boolean;
  count?: number;
}

function Demo({ multiple = false, defaultValue = [], disabledItem, longText, count }: DemoProps) {
  const items = count
    ? Array.from({ length: count }, (_, i) => ({
        value: `q${i}`,
        title: `Question ${i + 1}: how does this setting behave?`,
        body: `Answer ${i + 1}. It applies to every new session from now on.`,
      }))
    : ITEMS;
  return (
    <div className="w-96">
      <Accordion multiple={multiple} defaultValue={defaultValue}>
        {items.map((item, i) => (
          <AccordionItem key={item.value} value={item.value} disabled={disabledItem && i === 2}>
            <AccordionTrigger>
              {longText && i === 0
                ? "What can the agent read when a project is attached to a shared session that other people in the organisation also use?"
                : item.title}
            </AccordionTrigger>
            <AccordionContent>
              <p>
                {longText && i === 0
                  ? "Every project attached to the session, read-only, including projects attached later by someone else. The agent asks again before it writes anything, and access can be revoked from the session's project list at any time. Revoking it does not undo what the agent has already read."
                  : item.body}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

const meta = {
  title: "Components/Accordion",
  component: Demo,
  args: { multiple: false, defaultValue: [], disabledItem: false, longText: false },
  argTypes: { defaultValue: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "Stacked disclosures inside one hairline box (Base UI's `Accordion`). Rows divide with `border-subtle`; the open row's trigger goes to `foreground`.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultValue: ["scope"] } };
export const Multiple: Story = { args: { multiple: true, defaultValue: ["scope", "cost"] } };
export const Disabled: Story = { args: { disabledItem: true } };
export const LongText: Story = { args: { longText: true, defaultValue: ["scope"] } };
export const ManyItems: Story = { args: { count: 10, defaultValue: ["q0"] } };
