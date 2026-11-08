<script lang="ts" module>
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  /**
   * Props of a `SplitButton` (`src/ui/split-button.tsx`): a primary action, its
   * alternatives on an attached ⌄, and the reason the primary may be off.
   */
  export interface SplitButtonProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "class" | "children" | "onclick"> {
    /** The group element, for a caller that anchors something to it. */
    ref?: HTMLDivElement | null;
    /** The group's accessible name: "Commit actions". */
    label: string;
    /** The primary action's label. */
    children: Snippet;
    /** A Lucide Svelte component, drawn beside the label. */
    icon?: any;
    onclick?: () => void;
    /** Why the primary cannot run; set, it is disabled and this is its tooltip. */
    disabledReason?: string | null;
    /** A run is going: a spinner on the primary, and both halves held. */
    busy?: boolean;
    /** What the primary says while busy ("Pushing…"). Defaults to its label. */
    busyLabel?: Snippet;
    /** The ⌄'s accessible name: "More commit actions". */
    menuLabel: string;
    /** The menu's rows. */
    menu: Snippet;
    /** The primary's look; the ⌄ is always `outline`. */
    variant?: "default" | "secondary" | "outline";
    size?: "xs" | "sm" | "md";
    /** Classes for the menu's popup, such as its width. */
    menuClassName?: string;
    class?: string;
  }
</script>

<script lang="ts">
  import { ChevronDown } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import Button from "../../ui/button.svelte";
  import Icon from "../../ui/icon.svelte";
  import Spinner from "../../components/ui/spinner.svelte";
  import MenuPopup from "./deps/menu-popup.svelte";
  import { setMenu } from "./deps/menu-context";

  /**
   * A primary action with its alternatives on an attached ⌄, ported from
   * `SplitButton` in `src/ui/split-button.tsx`: desktop's source-control ship
   * button ("Commit" beside a menu of "Commit & push", "Commit, push & PR").
   * Built from `Button` and a dropdown menu; the menu's rows are the caller's.
   *
   * The two halves sit in a `role="group"` named by `label`, a hairline apart.
   * The menu opens against the whole group, aligned to its end, so it lines up
   * with the button rather than the chevron.
   *
   * `busy` swaps the icon for a spinner and `busyLabel` for the label, and
   * holds both halves: nothing starts while one run is going. `disabledReason`
   * turns the primary off and says why: in its tooltip for a pointer, and as
   * its description for a keyboard and a screen reader (it stays focusable
   * while off, `aria-disabled`). The menu stays open to the other choices.
   */
  let {
    ref = $bindable(null),
    label,
    children,
    icon,
    onclick,
    disabledReason = null,
    busy = false,
    busyLabel,
    menuLabel,
    menu,
    variant = "default",
    size = "sm",
    menuClassName,
    class: className,
    ...rest
  }: SplitButtonProps = $props();

  const uid = $props.id();
  const reasonId = `${uid}-reason`;
  const menuId = `${uid}-menu`;

  let open = $state(false);

  const held = $derived(busy || disabledReason !== null);
  const trigger = $derived(ref?.querySelector<HTMLElement>('[data-slot="split-button-menu"]') ?? null);

  setMenu({
    close() {
      open = false;
    },
  });
</script>

<div
  bind:this={ref}
  role="group"
  aria-label={label}
  data-slot="split-button"
  data-busy={busy || undefined}
  class={cn("flex items-center gap-0.5", className)}
  {...rest}
>
  <Button
    data-slot="split-button-primary"
    {variant}
    {size}
    onclick={() => {
      if (!held) onclick?.();
    }}
    aria-disabled={held ? "true" : undefined}
    data-disabled={held ? "" : undefined}
    title={disabledReason ?? undefined}
    aria-describedby={disabledReason !== null ? reasonId : undefined}
    aria-busy={busy || undefined}
  >
    {#if busy}
      <Spinner size="sm" label="" />
      {#if busyLabel}{@render busyLabel()}{:else}{@render children()}{/if}
    {:else}
      {#if icon}<Icon {icon} size="sm" />{/if}
      {@render children()}
    {/if}
  </Button>
  {#if disabledReason !== null}
    <span id={reasonId} class="sr-only">{disabledReason}</span>
  {/if}
  <Button
    data-slot="split-button-menu"
    variant="outline"
    {size}
    aria-label={menuLabel}
    aria-haspopup="menu"
    aria-expanded={open}
    aria-controls={open ? menuId : undefined}
    data-popup-open={open ? "" : undefined}
    data-pressed={open ? "" : undefined}
    aria-disabled={busy ? "true" : undefined}
    data-disabled={busy ? "" : undefined}
    onclick={() => {
      if (!busy) open = !open;
    }}
    onkeydown={(event) => {
      if (event.key !== "ArrowDown" || busy) return;
      event.preventDefault();
      open = true;
    }}
  >
    <Icon icon={ChevronDown} size="sm" />
  </Button>
  <MenuPopup
    bind:open
    anchor={ref}
    {trigger}
    id={menuId}
    class={cn("min-w-56", menuClassName)}
  >
    {@render menu()}
  </MenuPopup>
</div>
