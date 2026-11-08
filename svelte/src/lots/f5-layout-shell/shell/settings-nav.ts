// The settings rail's shape, ported from `settings-shell.tsx`.

// Lucide Svelte components are typed loosely at the seam, as `Icon` is.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SettingsNavIcon = any;

export type SettingsNavItem = { label: string; to: string; icon: SettingsNavIcon };

export type SettingsNavGroup = { label: string; items: Array<SettingsNavItem> };
