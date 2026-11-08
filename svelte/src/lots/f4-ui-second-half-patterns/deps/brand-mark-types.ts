/**
 * Props every brand mark takes, as the React marks do: `title` names the mark
 * (`""` makes it decorative), `class` joins the frame's classes, and the rest
 * spread onto the `<svg>`.
 */
export type BrandMarkProps = {
  title?: string;
  class?: string;
  [attribute: string]: unknown;
};
