"use client";

import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.ts";
import { platformKey, platformKeys, splitGlyphCombo, detectKeyPlatform } from "../lib/combo.ts";
import type { KeyPlatform } from "../lib/combo.ts";
import { kbdVariants } from "./kbd-variants.ts";

/**
 * A keycap (decision 32).
 *
 * shadcn's base-style `Kbd` in shape, moved onto the Foundations scales: the
 * cap is `--control-xs` tall rather than a hand-written 18px, its corner is
 * `rounded` (the control radius) rather than a literal 4px, and its text is
 * `text-2xs`.
 *
 * `KbdKeys` and `KbdCombo` are the two ways the app actually uses it — from a
 * `displayKeys` array, or from a glyph string like "⌘⇧F".
 *
 * All three draw for the host's keyboard: on Windows and Linux a modifier
 * glyph becomes its word (⌘ → Ctrl, ⌥ → Alt; `platformKeys`). `platform`
 * overrides the detection, for a screenshot or a settings page that shows
 * another platform's keys.
 */
export interface KbdProps extends React.ComponentProps<"kbd">, VariantProps<typeof kbdVariants> {
  /** Unset, detected from the user agent (a server render draws `"mac"`). */
  platform?: KeyPlatform;
}

const subscribeNever = () => () => {};
const serverPlatform = (): KeyPlatform => "mac";

/** `platform`, else the host's. Server and first client render agree on
 *  `"mac"`, then the client settles on its own without a hydration error. */
function useKeyPlatform(platform: KeyPlatform | undefined): KeyPlatform {
  const detected = React.useSyncExternalStore(subscribeNever, detectKeyPlatform, serverPlatform);
  return platform ?? detected;
}

function Kbd({ className, variant, size, platform, children, ...props }: KbdProps) {
  const resolved = useKeyPlatform(platform);
  return (
    <kbd data-slot="kbd" className={cn(kbdVariants({ variant, size }), className)} {...props}>
      {typeof children === "string" ? platformKey(children, resolved) : children}
    </kbd>
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

interface KbdKeysProps extends VariantProps<typeof kbdVariants> {
  keys: readonly string[];
  className?: string;
  /** Unset, detected from the user agent. */
  platform?: KeyPlatform;
}

/** Render a list of keycaps (["⌘", "⇧", "B"]) — the form `displayKeys` produces. */
function KbdKeys({ keys, className, platform, variant, size }: KbdKeysProps) {
  const resolved = useKeyPlatform(platform);
  return (
    <KbdGroup className={className}>
      {platformKeys(keys, resolved).map((k, i) => (
        <Kbd key={`${k}-${i}`} platform={resolved} variant={variant} size={size}>
          {k}
        </Kbd>
      ))}
    </KbdGroup>
  );
}

/** Convenience: render a glyph string ("⌘⇧F", "⌥Space") as a KbdGroup. Every
 *  modifier glyph is its own cap; the remainder ("F", "Space") is one cap. */
function KbdCombo({ combo, ...props }: Omit<KbdKeysProps, "keys"> & { combo: string }) {
  return <KbdKeys keys={splitGlyphCombo(combo)} {...props} />;
}

export { Kbd, KbdGroup, KbdKeys, KbdCombo, kbdVariants };
export type { KbdKeysProps };
