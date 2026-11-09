<script lang="ts">
  import { onMount } from "svelte";
  import type { Organisation } from "../../../src/lib/types";
  import OrgMark from "../../../src/lots/f5-layout-shell/shell/org-mark.svelte";
  import OrgSwitcher from "../../../src/lots/f5-layout-shell/shell/org-switcher.svelte";
  import StoryLinks from "./story-links.svelte";
  import { LONG_ORG, MANY_ORGS, ORGS, USER } from "../f5-layout-shell-fixtures";

  /**
   * The workspace switcher, ported from `stories/components/shell/org-switcher.stories.tsx`.
   * `story` names the scenario. The source's `play` functions open the menu, then
   * its "Switch workspace" submenu, here as DOM clicks after mount.
   */
  interface Props {
    story: string;
  }

  let { story }: Props = $props();

  const org = $derived(story === "long-text" ? LONG_ORG : ORGS[0]!);
  const orgs = $derived(
    story === "long-text" ? [LONG_ORG, ...ORGS] : story === "many-items" ? MANY_ORGS : ORGS,
  );
  const collapsed = $derived(story === "collapsed");
  // The org the switcher shows: switching changes it, as the source's `Demo` does.
  let active = $state<Organisation>(ORGS[0]!);
  let root = $state<HTMLElement | null>(null);

  function itemNamed(text: string): HTMLElement | undefined {
    return Array.from(document.querySelectorAll<HTMLElement>("[role='menuitem']")).find((el) =>
      el.textContent?.includes(text),
    );
  }

  /** The innermost element whose own text is `text`, as testing-library's `findByText` finds it. */
  function textNamed(text: string): HTMLElement | undefined {
    const item = itemNamed(text);
    if (!item) return undefined;
    const inner = Array.from(item.querySelectorAll<HTMLElement>("*")).find(
      (el) => el.children.length === 0 && el.textContent?.trim() === text,
    );
    return inner ?? item;
  }

  /**
   * testing-library's `userEvent.click`: the pointer moves onto the element, presses
   * and releases, and the press focuses the closest focusable ancestor. Base UI's
   * menu highlights (and focuses) the item under the pointer, which a bare `click()`
   * never does.
   */
  function userClick(el: HTMLElement) {
    const box = el.getBoundingClientRect();
    const point = { clientX: box.left + box.width / 2, clientY: box.top + box.height / 2 };
    const pointer = (type: string, buttons: number, bubbles = true) =>
      el.dispatchEvent(
        new PointerEvent(type, { bubbles, cancelable: true, button: 0, buttons, ...point, pointerId: 1, pointerType: "mouse", isPrimary: true }),
      );
    const mouse = (type: string, buttons: number, bubbles = true) =>
      el.dispatchEvent(new MouseEvent(type, { bubbles, cancelable: true, button: 0, buttons, detail: 1, ...point, view: window }));
    pointer("pointerover", 0);
    pointer("pointerenter", 0, false);
    mouse("mouseover", 0);
    mouse("mouseenter", 0, false);
    pointer("pointermove", 0);
    mouse("mousemove", 0);
    pointer("pointerdown", 1);
    mouse("mousedown", 1);
    el.closest<HTMLElement>("button, [tabindex], a[href], input, select, textarea")?.focus();
    pointer("pointerup", 0);
    mouse("mouseup", 0);
    mouse("click", 0);
  }

  onMount(() => {
    active = org;
    if (!root) return;
    const trigger = root.querySelector<HTMLElement>("button");
    if (trigger && (story === "open" || story === "switch-workspace" || story === "many-items")) {
      userClick(trigger);
    }
    if (story === "switch-workspace" || story === "many-items") {
      setTimeout(() => {
        const item = textNamed("Switch workspace");
        if (item) userClick(item);
      }, 60);
    }
  });
</script>

{#if story === "mark"}
  <div class="flex items-center gap-2">
    <OrgMark initials="AT" />
    <OrgMark initials="NL" class="size-6 rounded-md text-3xs" />
  </div>
{:else}
  <StoryLinks>
    <div bind:this={root} class="min-h-96 w-56 rounded-lg bg-sidebar p-2">
      <OrgSwitcher
        org={active}
        {orgs}
        email={USER.email}
        {collapsed}
        onOrgChange={(id) => {
          active = orgs.find((item) => item.id === id) ?? active;
        }}
        settingsHref="/settings"
        onLogOut={() => {}}
      />
    </div>
  </StoryLinks>
{/if}
