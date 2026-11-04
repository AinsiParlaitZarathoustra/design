import type { Meta, StoryObj } from "@storybook/react-vite";
import { useCallback, useRef, useState } from "react";
import { fn } from "storybook/test";
import { NextPage } from "../../../src/components/patterns/next-page.tsx";
import { Skeleton } from "../../../src/components/ui/skeleton.tsx";

const PAGE = 12;
const PAGES = 4;

function SkeletonRows() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-control-md w-full" />
      ))}
    </>
  );
}

/** A list in its own scroller that loads a page as the end comes into view. */
function InfiniteList({ failOn }: { failOn?: number }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [failed, setFailed] = useState(false);
  // The page `failOn` fails the first time it is asked for, then loads.
  const failedOnce = useRef(false);

  const onNext = useCallback(() => {
    setFailed(false);
    setFetching(true);
    setTimeout(() => {
      setFetching(false);
      if (pages === failOn && !failedOnce.current) {
        failedOnce.current = true;
        setFailed(true);
      } else setPages((p) => p + 1);
    }, 600);
  }, [failOn, pages]);

  return (
    <div
      ref={scroller}
      className="flex h-80 w-80 flex-col gap-1 overflow-y-auto rounded-md border border-border p-2"
    >
      {Array.from({ length: pages * PAGE }, (_, i) => (
        <div
          key={i}
          className="flex h-control-md shrink-0 items-center px-2 text-xs text-secondary-foreground"
        >
          Session {i + 1}
        </div>
      ))}
      <NextPage
        root={scroller}
        hasNext={pages < PAGES}
        fetching={fetching}
        failed={failed}
        onNext={onNext}
        skeleton={<SkeletonRows />}
        failure="Couldn't load more sessions."
      />
    </div>
  );
}

const meta = {
  title: "Patterns/NextPage",
  component: NextPage,
  args: {
    hasNext: true,
    fetching: false,
    failed: false,
    onNext: fn(),
    skeleton: <SkeletonRows />,
    failure: "Couldn't load more sessions.",
  },
  parameters: {
    docs: {
      description: {
        component:
          "The end of an infinite list: asks for the next page as it nears the viewport (or `root`), shows the list's own skeleton while loading, a retry when it failed, and nothing once there is no next page. It owns no data; the app's query drives it.",
      },
    },
  },
  decorators: [(Story) => <div className="flex w-80 flex-col gap-1">{Story()}</div>],
} satisfies Meta<typeof NextPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scrolling: Story = { render: () => <InfiniteList /> };
export const FailsOnce: Story = { render: () => <InfiniteList failOn={2} /> };
export const Loading: Story = { args: { fetching: true } };
export const Failed: Story = { args: { failed: true } };
