<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { XIcon } from "lucide-svelte";
  import { cn } from "../../lib/utils";
  import IconButton from "../icon-button.svelte";
  import { getDialog } from "./context";
  import DialogOverlay from "./dialog-overlay.svelte";

  /**
   * The dialog panel and its scrim, ported from `dialog.tsx`.
   *
   * No Positioner: a centred modal places itself. `variant="media"` is the
   * full-bleed viewer, centred with `inset-0 m-auto` so no transform is written
   * at rest; `size="lg"` widens the default to 44rem; `blur` frosts the page
   * behind the scrim.
   */
  interface Props extends Omit<HTMLAttributes<HTMLElement>, "class" | "children"> {
    class?: string;
    children?: Snippet;
    showCloseButton?: boolean;
    variant?: "default" | "media";
    size?: "default" | "lg";
    blur?: boolean;
  }

  let {
    class: className,
    children,
    showCloseButton = true,
    variant = "default",
    size = "default",
    blur = false,
    ...rest
  }: Props = $props();

  const api = getDialog();
  let popup = $state<HTMLElement | null>(null);

  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return {
      destroy() {
        node.remove();
      },
    };
  }

  function focusables(): HTMLElement[] {
    if (!popup) return [];
    // No `offsetParent` filter: the source's focus trap is Base UI's, and a
    // headless DOM (a unit test, SSR) has no layout to answer it. Elements
    // inside a closed dialog are not in the document in the first place.
    return Array.from(popup.querySelectorAll<HTMLElement>(FOCUSABLE));
  }

  function onKeydown(event: KeyboardEvent) {
    if (!api.visible) return;
    if (event.key === "Escape") {
      event.preventDefault();
      api.requestClose();
      return;
    }
    if (event.key !== "Tab" || !popup) return;
    const items = focusables();
    if (items.length === 0) {
      event.preventDefault();
      popup.focus();
      return;
    }
    const first = items[0]!;
    const last = items[items.length - 1]!;
    const active = document.activeElement;
    if (event.shiftKey && (active === first || !popup.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !popup.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  }

  let refocusing = false;
  function onFocusOutside(event: FocusEvent) {
    if (!popup || !api.visible || refocusing) return;
    const target = event.target as Node | null;
    if (!target || target === popup || popup.contains(target)) return;
    refocusing = true;
    popup.focus();
    queueMicrotask(() => {
      refocusing = false;
    });
  }

  // The panel's lifecycle follows `api.visible`, not the component's mount:
  // `DialogContent` stays mounted while the dialog is closed, so an `onMount`
  // cleanup would never run on close (focus would stay on <body> and the page
  // would stay scroll-locked). The effect's cleanup is the close path.
  $effect(() => {
    if (!api.visible) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeydown, true);
    document.addEventListener("focusin", onFocusOutside, true);
    const frame = requestAnimationFrame(() => {
      if (!popup) return;
      const target = popup.querySelector<HTMLElement>("[autofocus]") ?? focusables()[0] ?? popup;
      target.focus();
    });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeydown, true);
      document.removeEventListener("focusin", onFocusOutside, true);
      document.body.style.overflow = overflow;
      if (api.previousFocus instanceof HTMLElement) api.previousFocus.focus();
    };
  });
</script>

{#if api.visible}
  <div class="contents" use:portal>
    <DialogOverlay {blur} />
    <div
      bind:this={popup}
      role="dialog"
      aria-modal="true"
      aria-labelledby={api.titleId}
      aria-describedby={api.hasDescription ? api.descriptionId : undefined}
      data-slot="dialog-content"
      data-variant={variant === "media" ? variant : undefined}
      data-size={variant !== "media" && size !== "default" ? size : undefined}
      data-open={api.phase === "opening" || api.phase === "open" ? "" : undefined}
      data-closed={api.phase === "closing" ? "" : undefined}
      tabindex="-1"
      {...rest}
      class={cn(
        variant === "media"
          ? [
              "fixed inset-0 z-modal m-auto h-[min(82vh,860px)] w-[min(88vw,1180px)]",
              "flex flex-col overflow-hidden",
              "rounded-xl border border-border bg-background text-foreground shadow-lg",
            ]
          : [
              "fixed top-1/2 left-1/2 z-modal -translate-x-1/2 -translate-y-1/2",
              "flex w-full max-w-[min(32rem,calc(100vw-2rem))] flex-col gap-3 p-4",
              "rounded-xl border border-border bg-card text-foreground shadow-lg",
              size === "lg" && "max-w-[min(44rem,calc(100vw-2rem))]",
            ],
        "outline-none",
        "data-open:animate-scale-in data-closed:animate-scale-out",
        className,
      )}
    >
      {@render children?.()}
      {#if showCloseButton}
        <IconButton
          icon={XIcon}
          label="Close"
          size="sm"
          class="absolute top-2 right-2"
          onclick={() => api.requestClose()}
        />
      {/if}
    </div>
  </div>
{/if}
