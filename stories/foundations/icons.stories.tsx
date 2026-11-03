import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bell,
  Check,
  ChevronRight,
  Copy,
  FileText,
  Folder,
  GitBranch,
  GitPullRequest,
  MessageSquare,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Terminal,
  Trash2,
  X,
} from "lucide-react";
import { ICON_SIZES, ICON_STROKE_WIDTH, Icon, type IconSize } from "../../src/ui/icon.tsx";
import { Page, Section, TokenTable } from "./kit.tsx";

const USES: Record<IconSize, string> = {
  xs: "inside an xs control, a badge",
  sm: "inside sm and md controls; beside label text",
  md: "the default; inside an lg control",
  lg: "the palette, row icons in a list",
  xl: "empty states",
};

const SET = {
  Search,
  Plus,
  X,
  Check,
  ChevronRight,
  MoreHorizontal,
  Settings,
  Bell,
  Copy,
  Trash2,
  RefreshCw,
  FileText,
  Folder,
  Terminal,
  GitBranch,
  GitPullRequest,
  MessageSquare,
};

function IconsPage() {
  return (
    <Page
      title="Icons"
      lede={
        <>
          Lucide, through one wrapper:{" "}
          <code className="code">{'<Icon icon={Search} size="sm" />'}</code>. Five sizes and one
          stroke width, {ICON_STROKE_WIDTH}. Lucide&apos;s default of 2 reads heavy at these sizes.
          Icons take the text colour; they never carry their own.
        </>
      }
    >
      <Section title="Sizes">
        <TokenTable
          columns={["Size", "px", "Use", "Sample"]}
          rows={(Object.keys(ICON_SIZES) as IconSize[]).map((size) => ({
            name: size,
            value: ICON_SIZES[size],
            use: USES[size],
            sample: (
              <div className="flex items-center gap-2">
                <Icon icon={Search} size={size} />
                <Icon icon={GitBranch} size={size} />
                <Icon icon={Settings} size={size} />
              </div>
            ),
          }))}
        />
      </Section>
      <Section title="The common set" intro="Shown at md, in muted ink, as they sit in the chrome.">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-6">
          {Object.entries(SET).map(([name, glyph]) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 rounded-md border border-border-subtle p-3 text-muted-foreground"
            >
              <Icon icon={glyph} />
              <span className="caption">{name}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section
        title="Animated glyphs"
        intro="A few controls want the glyph itself to carry the state: copy, trash, send, the rail. See Primitives / AnimatedIcon."
      ></Section>
    </Page>
  );
}

const meta = {
  title: "Foundations/Icons",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
export const Page_: StoryObj = { name: "Page", render: () => <IconsPage /> };
