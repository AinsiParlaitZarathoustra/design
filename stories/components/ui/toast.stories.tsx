import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useMemo } from "react";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
  createToastManager,
  toast,
  useToastManager,
} from "../../../src/components/ui/toast.tsx";
import { Button } from "../../../src/ui/button.tsx";

type ToastType = "success" | "info" | "warning" | "error" | "loading" | undefined;

interface Seed {
  title: string;
  description?: string;
  type?: ToastType;
  action?: string;
}

interface DemoProps {
  /** Toasts added on load, so the stack shows without a click. */
  seed?: Seed[];
}

/**
 * The `Toaster` with its own manager, so each story starts empty and the
 * seeded toasts never leak into another story.
 */
function Demo({ seed = [] }: DemoProps) {
  const manager = useMemo(() => createToastManager(), []);
  useEffect(() => {
    for (const s of seed) {
      manager.add({
        title: s.title,
        description: s.description,
        type: s.type,
        timeout: 0,
        actionProps: s.action ? { children: s.action } : undefined,
      });
    }
  }, [manager, seed]);
  return (
    <div className="min-h-96">
      <Toaster toastManager={manager}>
        <Button
          variant="outline"
          onClick={() =>
            manager.add({
              title: "Session saved",
              description: "Refactor settings",
              type: "success",
            })
          }
        >
          Show a toast
        </Button>
      </Toaster>
    </div>
  );
}

const meta = {
  title: "Components/Toast",
  component: Demo,
  args: { seed: [] },
  argTypes: { seed: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "Transient notices, bottom right, on `z-toast`. Mount one `Toaster` and call `toast.add({ title, description, type })` (or a manager from `createToastManager`). The type's glyph carries the tone; the surface stays a neutral popover.",
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { seed: [{ title: "Session saved", description: "Refactor settings", type: "success" }] },
  tags: ["!autodocs"],
};

export const Error: Story = {
  args: {
    seed: [
      {
        title: "Run failed",
        description: "The agent exited with code 1.",
        type: "error",
        action: "Retry",
      },
    ],
  },
  tags: ["!autodocs"],
};

export const Loading: Story = {
  args: { seed: [{ title: "Indexing project…", type: "loading" }] },
  tags: ["!autodocs"],
};

export const ManyItems: Story = {
  args: {
    seed: [
      { title: "Checkpoint saved", type: "info" },
      {
        title: "Rate limit close",
        description: "82% of this hour's budget used.",
        type: "warning",
      },
      { title: "Session shared", description: "Anyone in Atlas can open it.", type: "success" },
    ],
  },
  tags: ["!autodocs"],
};

export const LongText: Story = {
  args: {
    seed: [
      {
        title: "The agent finished, but three of the checks it ran are still failing",
        description:
          "src/features/settings/components/settings-panel.tsx and two other files changed. Open the diff to review them before you share the session.",
        type: "warning",
        action: "Open diff",
      },
    ],
  },
  tags: ["!autodocs"],
};

/**
 * The parts, composed by hand: `ToastProvider`, `ToastPortal`,
 * `ToastViewport`, then a `Toast` per entry from `useToastManager`. This is
 * what `Toaster` does; reach for it only to change the row's anatomy.
 */
function CustomList() {
  const { toasts } = useToastManager();
  return toasts.map((t) => (
    <Toast key={t.id} toast={t}>
      <ToastContent>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction>Undo</ToastAction>
        <ToastClose />
      </ToastContent>
    </Toast>
  ));
}

function Composed() {
  useEffect(() => {
    toast.add({ title: "Session archived", description: "Refactor settings", timeout: 0 });
  }, []);
  return (
    <div className="min-h-64">
      <ToastProvider toastManager={toast}>
        <ToastPortal>
          <ToastViewport>
            <CustomList />
          </ToastViewport>
        </ToastPortal>
      </ToastProvider>
    </div>
  );
}

export const Composition: Story = { render: () => <Composed />, tags: ["!autodocs"] };
