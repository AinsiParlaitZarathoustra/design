import { cva } from "class-variance-authority";

/**
 * `TextLink`'s class recipe. The underline rule: a link that stands on its own
 * in the interface has no underline at rest and underlines on hover and on
 * keyboard focus. A link inside running text keeps its underline at rest (see
 * `.prose-session a`).
 *
 *   default  foreground ink: a link that is the point of its line
 *   muted    secondary ink, foreground on hover: a link beside the content
 */
export const linkVariants = cva(
  [
    "cursor-pointer rounded-sm no-underline underline-offset-2",
    "transition-colors duration-fast ease-out-strong",
    "hover:underline focus-visible:underline",
  ],
  {
    variants: {
      tone: {
        default: "text-foreground",
        muted: "text-secondary-foreground hover:text-foreground focus-visible:text-foreground",
      },
    },
    defaultVariants: { tone: "default" },
  },
);
