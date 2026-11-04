"use client";

import { useEffect, useRef } from "react";

import { Callout } from "../ui/callout.tsx";
import { Button } from "../../ui/button.tsx";

/**
 * The end of an infinite list: asks for the next page as it comes into view
 * (a little before, so scrolling rarely meets it), shows the list's own
 * skeleton rows while it loads, and a retry if it failed. Nothing at all
 * once there is no next page.
 *
 * It owns no data and no fetching: the app's query says whether there is a
 * next page and whether it is loading or failed, and `onNext` asks for it
 * (TanStack Query's `fetchNextPage`, a cursor in a store). A failed page
 * stops the automatic asking, so a broken endpoint is not hammered by a
 * scroll; "Try again" asks once more.
 *
 * While the end stays in view after a page lands, it asks again, which is
 * what fills a tall viewport. So a page must move the cursor: a server that
 * answers an empty page with the same cursor and `hasNext` still true is
 * asked forever. Set `hasNext` false on an empty page if yours can.
 *
 *   <NextPage
 *     root={scrollerRef}
 *     hasNext={query.hasNextPage}
 *     fetching={query.isFetchingNextPage}
 *     failed={query.isFetchNextPageError}
 *     onNext={query.fetchNextPage}
 *     skeleton={<SessionRowSkeleton count={3} />}
 *     failure="Couldn't load more sessions."
 *   />
 */
export interface NextPageProps {
  /** The scrolling element the list lives in. Omitted, the viewport. */
  root?: React.RefObject<HTMLElement | null>;
  hasNext: boolean;
  fetching: boolean;
  failed: boolean;
  /** Ask for the next page. Need not be stable. */
  onNext: () => void;
  /** Rows shaped like the list's, shown while the next page loads. */
  skeleton?: React.ReactNode;
  /** What failed, in the list's own words. */
  failure: React.ReactNode;
  /** The retry button's label. */
  retryLabel?: string;
  /** How far ahead of the end to ask, as an IntersectionObserver margin. */
  rootMargin?: string;
}

function NextPage({
  root,
  hasNext,
  fetching,
  failed,
  onNext,
  skeleton = null,
  failure,
  retryLabel = "Try again",
  rootMargin = "0px 0px 400px 0px",
}: NextPageProps) {
  const sentinel = useRef<HTMLDivElement>(null);
  // The latest `onNext`, so an inline arrow does not re-observe (and, while
  // the end is in view, re-ask) on every render.
  const next = useRef(onNext);
  useEffect(() => {
    next.current = onNext;
  }, [onNext]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || !hasNext || fetching || failed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) next.current();
      },
      { root: root?.current ?? null, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [root, rootMargin, hasNext, fetching, failed]);

  if (failed) {
    return (
      <Callout
        data-slot="next-page"
        tone="error"
        role="alert"
        action={
          <Button variant="secondary" size="sm" onClick={() => onNext()}>
            {retryLabel}
          </Button>
        }
      >
        {failure}
      </Callout>
    );
  }
  if (fetching) return <>{skeleton}</>;
  return hasNext ? (
    <div ref={sentinel} data-slot="next-page" aria-hidden="true" className="h-px" />
  ) : null;
}

export { NextPage };
