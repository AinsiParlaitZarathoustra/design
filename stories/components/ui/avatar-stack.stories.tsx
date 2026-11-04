import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarStack } from "../../../src/components/ui/avatar-stack.tsx";
import { Avatar, AvatarFallback } from "../../../src/components/ui/avatar.tsx";

const PEOPLE = ["AL", "GH", "AT", "KJ", "LP", "MC", "RF", "DK", "BL", "ES", "JM", "TB"];

function Demo({ count = 5, size = "md" }: { count?: number; size?: "xs" | "sm" | "md" | "lg" }) {
  return (
    <AvatarStack>
      {PEOPLE.slice(0, count).map((p) => (
        <Avatar key={p} size={size}>
          <AvatarFallback>{p}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarStack>
  );
}

const meta = {
  title: "Components/AvatarStack",
  component: Demo,
  args: { count: 5, size: "md" },
  argTypes: {
    count: { control: { type: "range", min: 0, max: 12 } },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Overlapping faces that ripple when the pointer moves across them: a spring lift that falls off with distance. Reduced motion holds every face still. Bring your own `Avatar`s.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { count: 0 } };
export const Single: Story = { args: { count: 1 } };
export const Large: Story = { args: { size: "lg" } };
export const ManyItems: Story = { args: { count: 12 } };
