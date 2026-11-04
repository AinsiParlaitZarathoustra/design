import { DERIVED_VAR_REGISTRY, THEME_KEY_REGISTRY } from "../theme/theme-key-registry.ts";

/**
 * D23: the role names are the theme keys' names. Every colour variable the
 * package writes is a theme key's dotted name with `.` and `_` as `-`
 * (`border.subtle` → `--border-subtle`), and the Tailwind utilities are
 * bridged from those (`utilities.css`). What that renamed, as a map from the
 * old name to the new, for a consumer's guard test or a one-off codemod:
 *
 *   import { D23_RENAMES } from "@tryatlas/design";
 *   for (const [old, { variable, utility }] of Object.entries(D23_RENAMES)) …
 *
 * Two sources, both recorded in this repo:
 *
 * - **The roles the old `standards` stylesheets named differently** (the web
 *   app's copy of them; README, "Migrating from standards"). Listed by hand
 *   below; `tests/d23-renames.test.ts` holds each new name to a variable the
 *   package declares and each old one to a name it does not.
 * - **ADR-0027's prefix drop**: desktop's `--atlas-<key>` is `--<key>`.
 *   Generated from the key registry, so a key added to `keys.toml` is here
 *   without an edit.
 *
 * Keys and values are names without the leading `--`. A variable and its
 * utility did not always move together, so each entry carries both:
 *
 * - `variable`: the custom property that replaces `--<old>`.
 * - `utility`: the colour name that replaces `<prefix>-<old>` (`bg-`, `text-`,
 *   `border-`…). Equal to the old name when the package still bridges that
 *   utility (`text-success` works; only `--success` moved). `null` when there
 *   is no utility for the role: write `var(--<variable>)` in CSS, or use the
 *   component that draws it.
 */
export interface D23Rename {
  variable: string;
  utility: string | null;
}

const ROLE_RENAMES: Record<string, D23Rename> = {
  hairline: { variable: "border-subtle", utility: "border-subtle" },
  surface: { variable: "panel-background", utility: "panel" },
  "shell-canvas": { variable: "sidebar", utility: "sidebar" },
  "shell-edge": { variable: "sidebar-border", utility: "sidebar-border" },
  "segment-thumb": { variable: "element-active", utility: "element-active" },
  success: { variable: "status-success-foreground", utility: "success" },
  warning: { variable: "status-warning-foreground", utility: "warning" },
  error: { variable: "status-error-foreground", utility: "error" },
  info: { variable: "status-info-foreground", utility: "info" },
  "success-muted": { variable: "status-success-background", utility: "success-muted" },
  "warning-muted": { variable: "status-warning-background", utility: "warning-muted" },
  "error-muted": { variable: "status-error-background", utility: "error-muted" },
  "info-muted": { variable: "status-info-background", utility: "info-muted" },
  selection: { variable: "selection-background", utility: null },
  "scrollbar-thumb": { variable: "scrollbar-thumb-background", utility: null },
  "diff-added": { variable: "diff-added-background", utility: null },
  "diff-removed": { variable: "diff-removed-background", utility: null },
  "diff-added-foreground": { variable: "diff-added-text", utility: null },
  "diff-removed-foreground": { variable: "diff-removed-text", utility: null },
};

const PREFIX_DROPS: Record<string, D23Rename> = Object.fromEntries(
  [...THEME_KEY_REGISTRY, ...DERIVED_VAR_REGISTRY].map(({ cssVar }) => {
    const name = cssVar.slice(2);
    return [`atlas-${name}`, { variable: name, utility: null }];
  }),
);

export const D23_RENAMES: Readonly<Record<string, D23Rename>> = Object.freeze({
  ...ROLE_RENAMES,
  ...PREFIX_DROPS,
});
