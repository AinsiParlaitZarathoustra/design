import { cn } from "../../lib/utils.ts";
import { InfiniteSlider } from "./infinite-slider.tsx";

/**
 * A social-proof logo cloud: an `InfiniteSlider` whose ends fade out on a
 * plain linear mask, so marks slide in and out of transparency rather than
 * being sliced at the edge. A mask rather than a gradient overlay, so it
 * works on any surface without knowing its colour.
 *
 * The marks are the caller's. Customer logos are a marketing page's assets,
 * not the design system's, so the package ships none: pass each as a node —
 * an inline SVG, or an `<img>` from the app's own public folder. A mark whose
 * dark-theme file is white-only wants a light twin; the app swaps the two on
 * `[data-appearance]`, or draws the mark in `currentColor` and lets it
 * follow the ink.
 */

export type Logo = {
  /** The company, as the accessible name of its slot. */
  name: string;
  mark: React.ReactNode;
};

function LogoMarquee({
  logos,
  label = "Trusted by engineers at",
  className,
  trackClassName,
}: {
  logos: Array<Logo>;
  label?: string;
  className?: string;
  /**
   * On the moving strip only, so it can bleed past its container's padding
   * (`-mx-*`) and fade into the edge of the surface while the label stays
   * on the text column.
   */
  trackClassName?: string;
}) {
  return (
    <div data-slot="logo-marquee" className={cn("flex flex-col gap-4", className)}>
      {label && <p className="eyebrow">{label}</p>}
      <div className={cn("mask-x-from-[calc(100%-6rem)] mask-x-to-100%", trackClassName)}>
        <InfiniteSlider gap={56} speed={40} speedOnHover={12}>
          {logos.map((logo) => (
            <span
              key={logo.name}
              role="img"
              aria-label={logo.name}
              className={cn(
                "flex shrink-0 items-center text-muted-foreground",
                "opacity-90 transition-opacity duration-base ease-out-strong hover:opacity-100",
              )}
            >
              {logo.mark}
            </span>
          ))}
        </InfiniteSlider>
      </div>
    </div>
  );
}

export { LogoMarquee };
