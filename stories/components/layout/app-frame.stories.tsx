import type { Meta, StoryObj } from "@storybook/react-vite";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import {
  AppFrame,
  SideDock,
  SideDockSizeToggle,
  useSideDock,
  useSideDockRoom,
} from "../../../src/components/layout/app-frame.tsx";
import type { SideDockMode } from "../../../src/components/layout/app-frame.tsx";
import { PageHeader } from "../../../src/components/patterns/section-header.tsx";
import {
  Sidebar,
  SidebarBody,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarPanel,
} from "../../../src/components/shell/sidebar.tsx";
import { cn } from "../../../src/lib/utils.ts";
import { Button } from "../../../src/ui/button.tsx";
import { IconButton } from "../../../src/ui/icon-button.tsx";
import { NAV, SESSIONS, StoryLinks } from "../shell/fixtures.tsx";

type Row = (typeof SESSIONS)[number];

function Dock({ row, onClose }: { row: Row; onClose: () => void }) {
  const { mode } = useSideDock();
  const { expand, restore } = useSideDockRoom();
  return (
    <SideDock>
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border-subtle px-3">
        <span className="code text-muted-foreground">{row.ref}</span>
        <span className="flex-1" />
        <SideDockSizeToggle />
        <IconButton icon={XIcon} label="Close" size="sm" onClick={onClose} />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <h2 className="text-md font-semibold">{row.title}</h2>
        <p className="body text-secondary-foreground">
          The dock is drawn {mode}. Borrowing widens a compact dock without telling the app, so the
          size it remembers is still the one the person picked.
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => expand()}>
            Borrow room
          </Button>
          <Button size="sm" variant="ghost" onClick={restore}>
            Give it back
          </Button>
        </div>
      </div>
    </SideDock>
  );
}

interface DemoProps {
  docked?: boolean;
  initialMode?: SideDockMode;
  topBar?: boolean;
  empty?: boolean;
}

function Demo({
  docked = false,
  initialMode = "compact",
  topBar = false,
  empty = false,
}: DemoProps) {
  // The app's state: the frame reports a pick and keeps nothing.
  const [dockMode, setDockMode] = useState<SideDockMode>(initialMode);
  const [selected, setSelected] = useState<number | null>(docked ? 0 : null);
  const row = selected === null ? undefined : SESSIONS[selected];

  return (
    <StoryLinks pathname="/sessions">
      <AppFrame
        dockMode={dockMode}
        onDockModeChange={setDockMode}
        topBar={
          topBar ? (
            <div className="flex h-10 shrink-0 items-center gap-1 px-2 lg:hidden">
              <IconButton icon={MenuIcon} label="Open navigation" size="sm" />
              <span className="truncate text-xs font-medium">Sessions</span>
            </div>
          ) : undefined
        }
        sidebar={
          <Sidebar className="lg:mr-2 max-lg:hidden">
            <SidebarHeader>
              <span className="label px-2">Atlas</span>
            </SidebarHeader>
            <SidebarPanel>
              <SidebarBody>
                <SidebarGroup label="Workspace">
                  {NAV.workspace.map((item) => (
                    <SidebarItem key={item.to} {...item} />
                  ))}
                </SidebarGroup>
              </SidebarBody>
            </SidebarPanel>
          </Sidebar>
        }
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-5">
          <PageHeader title="Sessions" description={`The app keeps the dock at ${dockMode}.`} />
          {empty ? (
            <p className="caption">Nothing here: the page is whatever the app renders.</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-border">
              {SESSIONS.map((s, i) => (
                <button
                  key={s.ref}
                  type="button"
                  onClick={() => setSelected(i)}
                  className={cn(
                    "flex w-full items-center gap-2 border-b border-border-subtle px-3 py-2 text-left last:border-b-0",
                    "transition-colors duration-fast ease-out-strong hover:bg-element-hover",
                    selected === i && "bg-element-selected",
                  )}
                >
                  <span className="code shrink-0 text-muted-foreground">{s.ref}</span>
                  <span className="label min-w-0 flex-1 truncate">{s.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {row && <Dock row={row} onClose={() => setSelected(null)} />}
      </AppFrame>
    </StoryLinks>
  );
}

const meta = {
  title: "Layout/AppFrame",
  component: Demo,
  args: { docked: false, initialMode: "compact", topBar: false, empty: false },
  argTypes: { initialMode: { control: "inline-radio", options: ["compact", "half"] } },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The application frame as slots: `sidebar`, an optional `topBar` (below lg) and `overlay`, and the page. It reads no storage and listens to no keys. The dock's size is controlled (`dockMode`, `onDockModeChange`); a screen fills `SideDock` from anywhere inside the frame, `SideDockSizeToggle` picks a size, `useSideDock` reads it and `useSideDockRoom` borrows room without changing the remembered pick. `AppShell` is this frame filled the way the Atlas apps fill it.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** A record selected: the dock slides in beside the page. */
export const WithDock: Story = { args: { docked: true } };
/** The dock at half the work area. */
export const HalfDock: Story = { args: { docked: true, initialMode: "half" } };
export const Empty: Story = { args: { empty: true } };
export const Light: Story = { args: { docked: true }, globals: { appearance: "light" } };
/** Below lg: the caller's top bar, no rail and no dock. */
export const Phone: Story = {
  args: { topBar: true },
  globals: { viewport: { value: "phone" } },
};
