import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ClaudeMark,
  CursorMark,
  GeminiMark,
  GitHubMark,
  OpenAIMark,
} from "../../../src/components/ui/brand-marks.tsx";
import { LogoMarquee, type Logo } from "../../../src/components/blocks/logo-marquee.tsx";

const LOGOS: Logo[] = [
  { name: "GitHub", mark: <GitHubMark className="h-5 w-auto" /> },
  { name: "OpenAI", mark: <OpenAIMark className="h-5 w-auto" /> },
  { name: "Cursor", mark: <CursorMark className="h-5 w-auto" /> },
  { name: "Claude", mark: <ClaudeMark className="h-5 w-auto" /> },
  { name: "Gemini", mark: <GeminiMark className="h-5 w-auto" /> },
];

/** Wordmarks drawn in the ink, as a customer's monochrome logo would be. */
const WORDMARKS: Logo[] = ["Northwind", "Globex", "Initech", "Umbrella", "Hooli", "Stark"].map(
  (name) => ({ name, mark: <span className="text-lg font-semibold">{name}</span> }),
);

const meta = {
  title: "Components/LogoMarquee",
  component: LogoMarquee,
  args: { logos: WORDMARKS, label: "Trusted by engineers at", className: "w-160 max-w-full" },
  argTypes: { logos: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "A logo cloud on an `InfiniteSlider`, its ends faded with a mask so it works on any surface. The marks are the caller's; the package ships none.",
      },
    },
  },
} satisfies Meta<typeof LogoMarquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Marks: Story = { args: { logos: LOGOS } };
export const NoLabel: Story = { args: { label: "" } };
export const ManyItems: Story = {
  args: {
    logos: [
      ...WORDMARKS,
      ...["Acme", "Soylent", "Tyrell", "Wonka", "Wayne"].map((name) => ({
        name,
        mark: <span className="text-lg font-semibold">{name}</span>,
      })),
    ],
  },
};
