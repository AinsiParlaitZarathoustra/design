import { cva } from "class-variance-authority";

/** The addon recipe, ported from `inputGroupAddonVariants` in `src/components/ui/input-group.tsx`. */
export const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-1 py-1.5 text-xs font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-2 has-[>button]:ml-[-0.275rem] has-[>kbd]:ml-[-0.275rem]",
        "inline-end": "order-last pr-2 has-[>button]:mr-[-0.275rem] has-[>kbd]:mr-[-0.275rem]",
        "block-start":
          "order-first w-full justify-start px-2 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

/** The button recipe, ported from `inputGroupButtonVariants` in `src/components/ui/input-group.tsx`. */
export const inputGroupButtonVariants = cva("flex items-center gap-2 rounded text-xs", {
  variants: {
    size: {
      xs: "h-control-xs gap-1 px-1 [&>svg:not([class*='size-'])]:size-3",
      sm: "gap-1",
      "icon-xs": "size-control-sm p-0 has-[>svg]:p-0",
      "icon-sm": "size-control-md p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});
