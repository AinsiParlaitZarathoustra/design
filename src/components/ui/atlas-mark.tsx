import { cn } from "../../lib/utils.ts";

/**
 * The Atlas mark: three rising strokes.
 *
 * `currentColor`, so it takes the ink of whatever it sits in — a rail item,
 * a login header, a workspace switcher trigger. Our own mark, unlike the
 * third-party ones in `brand-marks.tsx`, has no fixed colour.
 */
function AtlasMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M7.4 4h3.1L6.6 20H3.5zM13.2 4h3.1l-3.9 16H9.3zM19 4h3.1l-3.9 16h-3.1z" />
    </svg>
  );
}

/**
 * The mark in its rounded container, as it appears above an auth form.
 *
 * `tone="theme"` (the default) inks the tile with the theme: dark on a light
 * theme, light on a dark one. `tone="app-icon"` is the app icon's tile, black
 * with a white mark in every theme, as desktop drew it from 32px up (the
 * `atlas-icon.svg` tile): where the badge stands for the app itself (a
 * welcome screen, an about box), it should look like the icon in the Dock.
 */
type AtlasBadgeTone = "theme" | "app-icon";

function AtlasBadge({
  className,
  tone = "theme",
  ...props
}: React.ComponentProps<"div"> & { tone?: AtlasBadgeTone }) {
  return (
    <div
      data-tone={tone === "theme" ? undefined : tone}
      className={cn(
        "flex size-8 items-center justify-center rounded-lg bg-foreground text-background",
        // ratchet-allow: the app icon's tile is black and its mark white in
        // every theme; it is the icon in the Dock, not a themed surface.
        tone === "app-icon" && "bg-black text-white",
        className,
      )}
      {...props}
    >
      <AtlasMark className="size-4" />
    </div>
  );
}

/** Mark plus name, for a footer or a nav. */
function AtlasWordmark({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-1.5 text-foreground", className)} {...props}>
      <AtlasMark className="size-3.5" />
      <span className="text-xs font-semibold tracking-tight">Atlas</span>
    </div>
  );
}

export { AtlasBadge, AtlasMark, AtlasWordmark };
export type { AtlasBadgeTone };
