import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import {
  AuthAsideCopy,
  AuthAsideNote,
  AuthSplit,
} from "../../../src/components/shell/auth-split.tsx";
import {
  ClaudeMark,
  GeminiMark,
  GitHubMark,
  GoogleMark,
  OpenAIMark,
} from "../../../src/components/ui/brand-marks.tsx";
import { LogoMarquee } from "../../../src/components/ui/logo-marquee.tsx";
import { ThemeProvider } from "../../../src/lib/theme.tsx";
import { Button } from "../../../src/ui/button.tsx";
import { Icon } from "../../../src/ui/icon.tsx";

interface DemoProps {
  heading?: string;
  copy?: string;
  note?: string;
  loading?: boolean;
  error?: string;
  proof?: boolean;
}

const LOGOS = [
  { name: "Claude", mark: <ClaudeMark className="size-5" /> },
  { name: "OpenAI", mark: <OpenAIMark className="size-5" /> },
  { name: "Gemini", mark: <GeminiMark className="size-5" /> },
  { name: "GitHub", mark: <GitHubMark className="size-5" /> },
];

function Demo({
  heading = "Sign in to Atlas",
  copy = "See what every agent on your team is doing, while it is doing it.",
  note = "Sessions, diffs and costs in one place, for every agent you already use.",
  loading = false,
  error,
  proof = true,
}: DemoProps) {
  return (
    <AuthSplit
      back={
        <Button variant="ghost" size="sm" render={<a href="#back" />}>
          <Icon icon={ArrowLeftIcon} size="sm" />
          Back
        </Button>
      }
      aside={
        <>
          <AuthAsideCopy>{copy}</AuthAsideCopy>
          <AuthAsideNote>{note}</AuthAsideNote>
        </>
      }
      proof={
        proof ? <LogoMarquee logos={LOGOS} label="Works with the agents you use" /> : undefined
      }
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">{heading}</h1>
        <p className="caption">Use the account your team signs in with.</p>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="outline" size="lg" disabled={loading}>
          {loading ? (
            <Icon icon={Loader2} size="sm" className="animate-spin" />
          ) : (
            <GitHubMark className="size-3.5" />
          )}
          Continue with GitHub
        </Button>
        <Button variant="outline" size="lg" disabled={loading}>
          <GoogleMark className="size-3.5" />
          Continue with Google
        </Button>
        {error && <p className="caption text-error">{error}</p>}
      </div>
    </AuthSplit>
  );
}

const meta = {
  title: "Shell/AuthSplit",
  component: Demo,
  args: { loading: false, proof: true },
  decorators: [
    // The aside's `Globe` reads the appearance from `ThemeProvider`, which
    // reads the stored setting; seed it from the toolbar so the two agree.
    (Story, context) => {
      const { theme = "atlas", appearance = "dark" } = context.globals as {
        theme?: string;
        appearance?: string;
      };
      localStorage.setItem("atlas-theme", appearance);
      return (
        <ThemeProvider key={appearance} theme={theme}>
          {Story()}
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The two-pane sign-in layout: the form alone in a dashed drafting box on the left, atmosphere on the right (a globe, `AuthAsideCopy`, `AuthAsideNote` and social proof). The aside collapses below lg.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const ErrorState: Story = {
  name: "Error",
  args: { error: "GitHub did not return an email address. Make one public and try again." },
};
export const WithoutProof: Story = { args: { proof: false } };
export const LongText: Story = {
  args: {
    heading: "Sign in to the Infrastructure and Developer Productivity Working Group",
    copy: "See what every agent on your team is doing, while it is doing it, across every project, branch and pull request you care about.",
    note: "Sessions, diffs, costs, checkpoints, memory and review threads in one place, for every agent you already use, on every machine your team works from.",
  },
};
