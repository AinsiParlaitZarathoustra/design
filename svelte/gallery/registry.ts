/// <reference types="vite/client" />
import type { Component } from "svelte";
import type { StoryEntry } from "./types";
  import ButtonStories from "./stories/button-stories.svelte";
  import InputStories from "./stories/input-stories.svelte";
  import DialogStories from "./stories/dialog-stories.svelte";
  import TabStripStories from "./stories/tab-strip-stories.svelte";
  import BadgeStories from "./stories/badge-stories.svelte";
  import KbdStories from "./stories/kbd-stories.svelte";
  import IconStories from "./stories/icon-stories.svelte";

  const button = (name: string) => ({
    component: ButtonStories as unknown as Component<Record<string, never>>,
    props: { story: name },
  });

  const WITNESS: StoryEntry[] = [
    { id: "primitives-button--default", title: "Primitives/Button", name: "Default", mode: "element", status: "porté", ...button("default") },
    { id: "primitives-button--variants", title: "Primitives/Button", name: "Variants", status: "porté", ...button("variants") },
    { id: "primitives-button--sizes", title: "Primitives/Button", name: "Sizes", status: "porté", ...button("sizes") },
    { id: "primitives-button--secondary", title: "Primitives/Button", name: "Secondary", status: "porté", ...button("secondary") },
    { id: "primitives-button--outline", title: "Primitives/Button", name: "Outline", status: "porté", ...button("outline") },
    { id: "primitives-button--ghost", title: "Primitives/Button", name: "Ghost", status: "porté", ...button("ghost") },
    { id: "primitives-button--destructive", title: "Primitives/Button", name: "Destructive", status: "porté", ...button("destructive") },
    { id: "primitives-button--ghost-destructive", title: "Primitives/Button", name: "Ghost Destructive", status: "porté", ...button("ghost-destructive") },
    { id: "primitives-button--disabled", title: "Primitives/Button", name: "Disabled", status: "porté", ...button("disabled") },
    { id: "primitives-button--loading", title: "Primitives/Button", name: "Loading", status: "porté", ...button("loading") },
    { id: "primitives-button--with-icon", title: "Primitives/Button", name: "With Icon", status: "porté", ...button("with-icon") },
    { id: "primitives-button--pressed", title: "Primitives/Button", name: "Pressed", status: "porté", ...button("pressed") },
    { id: "primitives-button--long-text", title: "Primitives/Button", name: "Long Text", status: "porté", ...button("long-text") },

    { id: "primitives-badge--default", title: "Primitives/Badge", name: "Default", status: "porté", component: BadgeStories as never, props: { story: "default" } },
    { id: "primitives-badge--variants", title: "Primitives/Badge", name: "Variants", status: "porté", component: BadgeStories as never, props: { story: "variants" } },
    { id: "primitives-badge--sizes", title: "Primitives/Badge", name: "Sizes", status: "porté", component: BadgeStories as never, props: { story: "sizes" } },
    { id: "primitives-badge--with-icon", title: "Primitives/Badge", name: "With Icon", status: "porté", component: BadgeStories as never, props: { story: "with-icon" } },
    { id: "primitives-badge--long-text", title: "Primitives/Badge", name: "Long Text", status: "porté", component: BadgeStories as never, props: { story: "long-text" } },
    { id: "primitives-badge--empty", title: "Primitives/Badge", name: "Empty", status: "porté", component: BadgeStories as never, props: { story: "empty" } },

    { id: "primitives-kbd--default", title: "Primitives/Kbd", name: "Default", status: "porté", component: KbdStories as never, props: { story: "default" } },
    { id: "primitives-kbd--sizes", title: "Primitives/Kbd", name: "Sizes", status: "porté", component: KbdStories as never, props: { story: "sizes" } },
    { id: "primitives-kbd--combo", title: "Primitives/Kbd", name: "Combo", status: "porté", component: KbdStories as never, props: { story: "combo" } },
    { id: "primitives-kbd--variants", title: "Primitives/Kbd", name: "Variants", status: "porté", component: KbdStories as never, props: { story: "variants" } },
    { id: "primitives-kbd--platforms", title: "Primitives/Kbd", name: "Platforms", status: "porté", component: KbdStories as never, props: { story: "platforms" } },
    { id: "primitives-kbd--long-text", title: "Primitives/Kbd", name: "Long Text", status: "porté", component: KbdStories as never, props: { story: "long-text" } },

    { id: "primitives-icon--default", title: "Primitives/Icon", name: "Default", status: "porté", component: IconStories as never, props: { story: "default" } },
    { id: "primitives-icon--sizes", title: "Primitives/Icon", name: "Sizes", status: "porté", component: IconStories as never, props: { story: "sizes" } },
    { id: "primitives-icon--muted", title: "Primitives/Icon", name: "Muted", status: "porté", component: IconStories as never, props: { story: "muted" } },
    { id: "primitives-icon--beside-text", title: "Primitives/Icon", name: "Beside Text", status: "porté", component: IconStories as never, props: { story: "beside-text" } },

    { id: "primitives-input--default", title: "Primitives/Input", name: "Default", status: "porté", component: InputStories as never, props: { story: "default" } },
    { id: "primitives-input--filled", title: "Primitives/Input", name: "Filled", status: "porté", component: InputStories as never, props: { story: "filled" } },
    { id: "primitives-input--sizes", title: "Primitives/Input", name: "Sizes", status: "porté", component: InputStories as never, props: { story: "sizes" } },
    { id: "primitives-input--disabled", title: "Primitives/Input", name: "Disabled", status: "porté", component: InputStories as never, props: { story: "disabled" } },
    { id: "primitives-input--invalid", title: "Primitives/Input", name: "Invalid", status: "porté", component: InputStories as never, props: { story: "invalid" } },
    { id: "primitives-input--long-text", title: "Primitives/Input", name: "Long Text", status: "porté", component: InputStories as never, props: { story: "long-text" } },
    { id: "primitives-input--with-icon", title: "Primitives/Input", name: "With Icon", status: "porté", component: InputStories as never, props: { story: "with-icon" } },

    { id: "primitives-dialog--default", title: "Primitives/Dialog", name: "Default", status: "porté", component: DialogStories as never, props: { story: "default" } },
    { id: "primitives-dialog--open", title: "Primitives/Dialog", name: "Open", mode: "page", status: "porté", component: DialogStories as never, props: { story: "open" } },
    { id: "primitives-dialog--destructive", title: "Primitives/Dialog", name: "Destructive", mode: "page", status: "porté", component: DialogStories as never, props: { story: "destructive" } },
    { id: "primitives-dialog--without-close-button", title: "Primitives/Dialog", name: "Without Close Button", mode: "page", status: "porté", component: DialogStories as never, props: { story: "without-close-button" } },
    { id: "primitives-dialog--long-text", title: "Primitives/Dialog", name: "Long Text", mode: "page", status: "porté", component: DialogStories as never, props: { story: "long-text" } },
    { id: "primitives-dialog--media", title: "Primitives/Dialog", name: "Media", mode: "page", status: "porté", component: DialogStories as never, props: { story: "media" } },
    { id: "primitives-dialog--large-blurred", title: "Primitives/Dialog", name: "Large Blurred", mode: "page", status: "porté", component: DialogStories as never, props: { story: "large-blurred" } },

    { id: "layout-tabstrip--default", title: "Layout/TabStrip", name: "Default", status: "porté", component: TabStripStories as never, props: { story: "default" } },
    { id: "layout-tabstrip--states", title: "Layout/TabStrip", name: "States", status: "porté", component: TabStripStories as never, props: { story: "states" } },
    { id: "layout-tabstrip--unfocused", title: "Layout/TabStrip", name: "Unfocused", status: "porté", component: TabStripStories as never, props: { story: "unfocused" } },
    { id: "layout-tabstrip--none-active", title: "Layout/TabStrip", name: "None Active", status: "porté", component: TabStripStories as never, props: { story: "none-active" } },
    { id: "layout-tabstrip--overflow", title: "Layout/TabStrip", name: "Overflow", status: "porté", component: TabStripStories as never, props: { story: "overflow" } },
    { id: "layout-tabstrip--empty", title: "Layout/TabStrip", name: "Empty", status: "porté", component: TabStripStories as never, props: { story: "empty" } },
    { id: "layout-tabstrip--behaviour-opt-outs", title: "Layout/TabStrip", name: "Behaviour Opt Outs", status: "porté", component: TabStripStories as never, props: { story: "behaviour-opt-outs" } },
    { id: "layout-tabstrip--drag-to-reorder", title: "Layout/TabStrip", name: "Drag To Reorder", status: "porté", component: TabStripStories as never, props: { story: "drag-to-reorder" } },
    { id: "layout-tabstrip--light", title: "Layout/TabStrip", name: "Light", appearance: "light", status: "porté", component: TabStripStories as never, props: { story: "light" } },
  ];

  // Lots add `gallery/stories/<lot>.entries.ts`; the gallery discovers them,
  // so a lot never edits this file. A duplicate id is a hard error: two lots
  // must not claim one source story.
  const modules = import.meta.glob<{ default: StoryEntry[] }>("./stories/*.entries.ts", {
    eager: true,
  });
  const DISCOVERED = Object.values(modules).flatMap((module) => module.default);

  export const STORIES: StoryEntry[] = [...WITNESS, ...DISCOVERED];

  const duplicates = STORIES.map((story) => story.id).filter(
    (id, index, ids) => ids.indexOf(id) !== index,
  );
  if (duplicates.length > 0) {
    throw new Error(`Duplicate story ids: ${[...new Set(duplicates)].join(", ")}`);
  }

  export const BY_ID = new Map(STORIES.map((story) => [story.id, story]));
