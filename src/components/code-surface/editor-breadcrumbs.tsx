"use client";

import { Fragment } from "react";
import { cn } from "../../lib/utils.ts";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb.tsx";
import { collapseSegments } from "./code-surface.ts";

export interface EditorBreadcrumbsProps {
  /** The path's parts, root first: `pathSegments(path, root)`. */
  segments: readonly string[];
  /** Crumbs shown before the middle collapses into one ellipsis. */
  maxVisible?: number;
  /** The file has unsaved edits: a dot after its name. */
  dirty?: boolean;
  /** Makes every crumb but the file a button; gets the crumb's index in `segments`. */
  onSelect?: (index: number) => void;
  className?: string;
}

/**
 * The file view's path, desktop's `FileBreadcrumbs` in its looks: folders
 * muted, the file in the foreground, chevrons between. Each crumb truncates
 * on its own, and a long path keeps its first and last crumbs and folds the
 * middle into an ellipsis whose tooltip lists what it hides. The `nav`'s
 * tooltip is the whole path.
 *
 * Desktop's folder menus (the chevron that lists a folder's entries) read the
 * filesystem, so they stay in the app.
 */
export function EditorBreadcrumbs({
  segments,
  maxVisible = 4,
  dirty,
  onSelect,
  className,
}: EditorBreadcrumbsProps) {
  if (segments.length === 0) return null;
  const items = collapseSegments(segments, maxVisible);
  const last = segments.length - 1;

  return (
    <Breadcrumb
      aria-label="File path"
      title={segments.join("/")}
      data-slot="editor-breadcrumbs"
      className={cn("min-w-0", className)}
    >
      <BreadcrumbList className="flex-nowrap gap-0 overflow-hidden">
        {items.map((item, i) => {
          const separator = i < items.length - 1 && (
            <BreadcrumbSeparator className="mx-0.5 shrink-0 text-muted-foreground" />
          );
          if (item.kind === "ellipsis") {
            return (
              <Fragment key="ellipsis">
                <BreadcrumbItem className="shrink-0" title={item.hidden.join("/")}>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                {separator}
              </Fragment>
            );
          }
          const crumb =
            item.index === last ? (
              <BreadcrumbItem className="min-w-0">
                <BreadcrumbPage className="block min-w-0 truncate px-0.5">
                  {item.label}
                </BreadcrumbPage>
                {dirty && (
                  <span
                    role="img"
                    aria-label="Unsaved changes"
                    className="size-1.5 shrink-0 rounded-full bg-primary"
                  />
                )}
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem className="shrink-0">
                {onSelect ? (
                  <BreadcrumbLink
                    render={<button type="button" onClick={() => onSelect(item.index)} />}
                    className="block max-w-40 cursor-pointer truncate rounded-sm px-0.5 text-left outline-none hover:bg-element-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <span className="block max-w-40 truncate px-0.5">{item.label}</span>
                )}
              </BreadcrumbItem>
            );
          return (
            <Fragment key={item.index}>
              {crumb}
              {separator}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
