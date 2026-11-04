import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../src/components/ui/breadcrumb.tsx";

interface DemoProps {
  trail?: string[];
  collapse?: boolean;
}

function Demo({ trail = ["Acme", "Projects", "atlas"], collapse = false }: DemoProps) {
  const page = trail.at(-1) ?? "";
  const links = trail.slice(0, -1);
  const shown = collapse && links.length > 2 ? [links[0]!, null, links.at(-1)!] : links;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {shown.map((crumb, i) => (
          <BreadcrumbItem key={i}>
            {crumb === null ? (
              <BreadcrumbEllipsis />
            ) : (
              <BreadcrumbLink href="#" onClick={(e) => e.preventDefault()}>
                {crumb}
              </BreadcrumbLink>
            )}
            <BreadcrumbSeparator />
          </BreadcrumbItem>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const meta = {
  title: "Components/Breadcrumb",
  component: Demo,
  args: { trail: ["Acme", "Projects", "atlas"], collapse: false },
  parameters: {
    docs: {
      description: {
        component:
          "Where a page sits. `text-xs` in `muted-foreground`; the current page is `foreground`. `BreadcrumbEllipsis` stands in for the middle of a long trail.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Single: Story = { args: { trail: ["Settings"] } };
export const Collapsed: Story = {
  args: {
    collapse: true,
    trail: ["Acme", "Projects", "atlas", "Sessions", "Refactor settings"],
  },
};
export const ManyItems: Story = {
  args: {
    trail: ["Acme", "Projects", "atlas", "Sessions", "March", "Week 2", "Refactor settings"],
  },
};
export const LongText: Story = {
  args: {
    trail: [
      "Acme Corporation International",
      "Projects",
      "Refactor the settings panel so every section uses the shared card",
    ],
  },
  render: (args) => (
    <div className="w-80">
      <Demo {...args} />
    </div>
  ),
};
