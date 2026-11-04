import type { Meta, StoryObj } from "@storybook/react-vite";
import { PersonAvatar } from "../../../src/components/patterns/person-avatar.tsx";
import {
  DetailPane,
  ListDetail,
  ListPane,
  PropertiesPane,
  PropertyRow,
} from "../../../src/components/shell/list-detail.tsx";
import { StatusIcon } from "../../../src/components/ui/status-icon.tsx";
import { Badge } from "../../../src/ui/badge.tsx";
import { cn } from "../../../src/lib/utils.ts";
import { SESSIONS } from "./fixtures.tsx";

type Row = (typeof SESSIONS)[number];

interface DemoProps {
  rows: Row[];
  width?: "narrow" | "wide";
  properties?: boolean;
}

function ListRow({ row, active }: { row: Row; active: boolean }) {
  return (
    <button
      type="button"
      aria-current={active || undefined}
      className={cn(
        "flex w-full items-center gap-2 border-b border-border-subtle px-3 py-2 text-left",
        "transition-colors duration-fast ease-out-strong hover:bg-element-hover",
        active && "bg-element-selected",
      )}
    >
      <StatusIcon status={active ? "live" : "done"} />
      <span className="code shrink-0 text-muted-foreground">{row.ref}</span>
      <span className="label min-w-0 flex-1 truncate">{row.title}</span>
      <span className="caption shrink-0">{row.ago}</span>
    </button>
  );
}

function Demo({ rows, width = "narrow", properties = true }: DemoProps) {
  const current = rows[0];
  return (
    <div className="flex h-svh bg-sidebar p-2">
      <div className="flex min-w-0 flex-1 overflow-hidden rounded-xl border border-border bg-background">
        <ListDetail>
          <ListPane width={width} className="overflow-y-auto">
            <div className="flex h-10 shrink-0 items-center border-b border-border-subtle px-3">
              <span className="label">Sessions</span>
              <span className="caption ml-auto">{rows.length}</span>
            </div>
            {rows.length === 0 ? (
              <p className="caption p-3">No sessions yet. Start one from ⌘K.</p>
            ) : (
              rows.map((row, i) => <ListRow key={`${row.ref}-${i}`} row={row} active={i === 0} />)
            )}
          </ListPane>
          <DetailPane width={width === "wide" ? "companion" : "fill"}>
            {current ? (
              <div className="flex flex-col gap-2 p-5">
                <span className="code text-muted-foreground">{current.ref}</span>
                <h2 className="text-lg font-semibold">{current.title}</h2>
                <p className="body text-secondary-foreground">
                  The agent split each panel into a container that reads the store and a view that
                  renders from props, then moved the tests to the views.
                </p>
              </div>
            ) : (
              <p className="caption m-auto">Select a session.</p>
            )}
          </DetailPane>
          {properties && current && (
            <PropertiesPane>
              <span className="eyebrow">Properties</span>
              <div className="flex flex-col">
                <PropertyRow label="Status">
                  <StatusIcon status="live" />
                  Running
                </PropertyRow>
                <PropertyRow label="Author">
                  <PersonAvatar size="xs" name={current.who} />
                  {current.who}
                </PropertyRow>
                <PropertyRow label="Project">atlas</PropertyRow>
                <PropertyRow label="Branch">
                  <span className="code truncate">uzayermasud/settings-split</span>
                </PropertyRow>
                <PropertyRow label="Labels">
                  <Badge>refactor</Badge>
                  <Badge>ui</Badge>
                </PropertyRow>
              </div>
            </PropertiesPane>
          )}
        </ListDetail>
      </div>
    </div>
  );
}

const MANY = Array.from({ length: 40 }, (_, i) => SESSIONS[i % SESSIONS.length]!);
const LONG: Row[] = [
  {
    ref: "ATL-1024",
    title:
      "Allow the agent to read every project attached to the session, including ones added later, without asking again",
    who: "Maximiliana Konstantinopoulou",
    ago: "just now",
  },
  ...SESSIONS,
];

const meta = {
  title: "Shell/ListDetail",
  component: Demo,
  args: { rows: SESSIONS, width: "narrow", properties: true },
  argTypes: {
    rows: { control: false },
    width: { control: "inline-radio", options: ["narrow", "wide"] },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The three-pane reading layout: `ListPane`, `DetailPane`, `PropertiesPane` of `PropertyRow`s inside `ListDetail`. `narrow` is the inbox shape (a 20rem index beside a read pane); `wide` is the issues shape (the list is the screen, the detail a companion). The detail hides below lg, the properties below xl.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Wide: Story = { args: { width: "wide", properties: false } };
export const Empty: Story = { args: { rows: [] } };
export const LongText: Story = { args: { rows: LONG } };
export const ManyItems: Story = { args: { rows: MANY } };
